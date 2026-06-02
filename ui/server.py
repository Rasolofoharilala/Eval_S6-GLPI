#!/usr/bin/env python3

import json
import subprocess
import tempfile
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT_DIR = Path(__file__).resolve().parent.parent
UI_DIR = ROOT_DIR / "ui"
JSON_DIR = ROOT_DIR / "JSON"
COMMAND_DIR = ROOT_DIR / "command"
ENDPOINT_FILE = ROOT_DIR / "endpointDOC.json"
HOST = "127.0.0.1"
PORT = 8765


def json_response(handler, payload, status=HTTPStatus.OK):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(data)))
    handler.end_headers()
    handler.wfile.write(data)


def text_response(handler, text, status=HTTPStatus.OK, content_type="text/plain; charset=utf-8"):
    data = text.encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", content_type)
    handler.send_header("Content-Length", str(len(data)))
    handler.end_headers()
    handler.wfile.write(data)


def run_script(script_path, *args):
    command = [str(script_path), *args]
    return subprocess.run(command, cwd=ROOT_DIR, text=True, capture_output=True)


def normalize_endpoint(endpoint):
    endpoint = (endpoint or "").strip()
    if not endpoint:
        return "/Administration/User/Me"
    if not endpoint.startswith("/"):
        endpoint = f"/{endpoint}"
    return endpoint


def safe_name(endpoint):
    cleaned = endpoint.strip("/")
    if not cleaned:
        return "root"

    result = []
    for char in cleaned:
      if char.isalnum() or char in {"-", "_"}:
        result.append(char)
      else:
        result.append("_")
    return "".join(result)


def parse_http_status(stdout):
    for line in reversed(stdout.splitlines()):
        if line.startswith("HTTP_STATUS="):
            return line.split("=", 1)[1].strip()
    return ""


def run_endpoint_test(endpoint, method="GET", payload=None):
    payload_path = None

    try:
        if payload not in (None, "", {}):
            with tempfile.NamedTemporaryFile("w", delete=False, suffix=".json", dir="/tmp", encoding="utf-8") as tmp:
                json.dump(payload, tmp, ensure_ascii=False, indent=2)
                payload_path = tmp.name

        args = [endpoint, method]
        if payload_path:
            args.append(payload_path)

        test_result = run_script(COMMAND_DIR / "testAPI.sh", *args)
        output_file = JSON_DIR / f"test_{method.upper()}_{safe_name(endpoint)}.json"
        response_data = {}

        if output_file.exists():
            try:
                response_data = json.loads(output_file.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                response_data = {"raw": output_file.read_text(encoding="utf-8")}

        return {
            "ok": test_result.returncode == 0,
            "endpoint": endpoint,
            "method": method.upper(),
            "stdout": test_result.stdout,
            "stderr": test_result.stderr,
            "http_status": parse_http_status(test_result.stdout),
            "output_file": str(output_file),
            "response": response_data,
        }, test_result.returncode
    finally:
        if payload_path:
            Path(payload_path).unlink(missing_ok=True)


class ApiUiHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/":
            index_file = UI_DIR / "index.html"
            text_response(self, index_file.read_text(encoding="utf-8"), content_type="text/html; charset=utf-8")
            return

        if parsed.path == "/styles.css":
            css_file = UI_DIR / "styles.css"
            text_response(self, css_file.read_text(encoding="utf-8"), content_type="text/css; charset=utf-8")
            return

        if parsed.path == "/app.js":
            js_file = UI_DIR / "app.js"
            text_response(self, js_file.read_text(encoding="utf-8"), content_type="application/javascript; charset=utf-8")
            return

        if parsed.path == "/api/endpoints":
            endpoints = json.loads(ENDPOINT_FILE.read_text(encoding="utf-8"))
            json_response(self, {"endpoints": endpoints})
            return

        json_response(self, {"error": "Route introuvable"}, status=HTTPStatus.NOT_FOUND)

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length) if content_length else b"{}"

        try:
            payload = json.loads(raw_body.decode("utf-8"))
        except json.JSONDecodeError:
            json_response(self, {"error": "JSON invalide"}, status=HTTPStatus.BAD_REQUEST)
            return

        if parsed.path == "/api/token":
            result = run_script(COMMAND_DIR / "getToken.sh")
            token_file = JSON_DIR / "getToken.json"
            token_data = json.loads(token_file.read_text(encoding="utf-8")) if token_file.exists() else {}
            json_response(
                self,
                {
                    "ok": result.returncode == 0,
                    "stdout": result.stdout,
                    "stderr": result.stderr,
                    "token": token_data,
                },
                status=HTTPStatus.OK if result.returncode == 0 else HTTPStatus.INTERNAL_SERVER_ERROR,
            )
            return

        if parsed.path == "/api/test":
            endpoint = normalize_endpoint(payload.get("endpoint"))
            method = (payload.get("method") or "GET").upper()
            request_payload = payload.get("payload")
            refresh_token = bool(payload.get("refresh_token", True))

            if refresh_token:
                token_result = run_script(COMMAND_DIR / "getToken.sh")
                if token_result.returncode != 0:
                    json_response(
                        self,
                        {"ok": False, "step": "token", "stdout": token_result.stdout, "stderr": token_result.stderr},
                        status=HTTPStatus.INTERNAL_SERVER_ERROR,
                    )
                    return

            result_payload, return_code = run_endpoint_test(endpoint, method, request_payload)
            json_response(
                self,
                result_payload,
                status=HTTPStatus.OK if return_code == 0 else HTTPStatus.INTERNAL_SERVER_ERROR,
            )
            return

        if parsed.path == "/api/test-batch":
            endpoints = payload.get("endpoints") or []
            refresh_token = bool(payload.get("refresh_token", True))
            normalized = [normalize_endpoint(endpoint) for endpoint in endpoints if str(endpoint).strip()]

            if not normalized:
                json_response(self, {"error": "Aucun endpoint fourni"}, status=HTTPStatus.BAD_REQUEST)
                return

            if refresh_token:
                token_result = run_script(COMMAND_DIR / "getToken.sh")
                if token_result.returncode != 0:
                    json_response(
                        self,
                        {"ok": False, "step": "token", "stdout": token_result.stdout, "stderr": token_result.stderr},
                        status=HTTPStatus.INTERNAL_SERVER_ERROR,
                    )
                    return

            results = []
            failed = False
            for endpoint in normalized:
                result_payload, return_code = run_endpoint_test(endpoint, "GET", None)
                if return_code != 0:
                    failed = True
                results.append(result_payload)

            json_response(
                self,
                {"ok": not failed, "results": results},
                status=HTTPStatus.OK if not failed else HTTPStatus.INTERNAL_SERVER_ERROR,
            )
            return

        json_response(self, {"error": "Route introuvable"}, status=HTTPStatus.NOT_FOUND)

    def log_message(self, format, *args):
        return


def main():
    server = ThreadingHTTPServer((HOST, PORT), ApiUiHandler)
    print(f"Interface disponible sur http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()

#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TOKEN_FILE="$PROJECT_DIR/JSON/getToken.json"
DEFAULT_ENDPOINT="/Administration/User/Me"
DEFAULT_METHOD="GET"
tmp_file="$(mktemp)"

ENDPOINT="${1:-$DEFAULT_ENDPOINT}"
METHOD="${2:-$DEFAULT_METHOD}"
PAYLOAD_FILE="${3:-}"

if [[ "$ENDPOINT" != /* ]]; then
  ENDPOINT="/$ENDPOINT"
fi

METHOD="$(printf '%s' "$METHOD" | tr '[:lower:]' '[:upper:]')"
SAFE_NAME="$(printf '%s' "$ENDPOINT" | sed 's#^/##; s#[/{]#_#g; s#}##g; s#[^A-Za-z0-9_-]#_#g')"
OUTPUT_FILE="$PROJECT_DIR/JSON/test_${METHOD}_${SAFE_NAME}.json"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Fichier token introuvable: $TOKEN_FILE" >&2
  exit 1
fi

TOKEN="$(jq -r '.access_token // empty' "$TOKEN_FILE")"

if [[ -z "$TOKEN" ]]; then
  echo "Aucun access_token valide trouve dans $TOKEN_FILE" >&2
  exit 1
fi

curl_args=(
  -sS
  -X "$METHOD"
  "http://localhost/api.php/v2.3$ENDPOINT"
  -H "Authorization: Bearer $TOKEN"
)

if [[ -n "$PAYLOAD_FILE" && -f "$PAYLOAD_FILE" && -s "$PAYLOAD_FILE" ]]; then
  curl_args+=(
    -H "Content-Type: application/json"
    --data "@$PAYLOAD_FILE"
  )
fi

http_status="$(curl "${curl_args[@]}" -o "$tmp_file" -w "%{http_code}")"

if jq . "$tmp_file" > "$OUTPUT_FILE"; then
  echo "JSON reformate dans $OUTPUT_FILE"
  echo "HTTP_STATUS=$http_status"
else
  mv "$tmp_file" "$OUTPUT_FILE"
  echo "Reponse enregistree dans $OUTPUT_FILE, mais le JSON n'a pas pu etre reformate." >&2
  echo "HTTP_STATUS=$http_status"
  exit 1
fi

rm -f "$tmp_file"

if [[ "$http_status" =~ ^[0-9]+$ ]] && (( http_status >= 400 )); then
  exit 1
fi

import json
import sys
from pathlib import Path


def load_swagger(file_path: str) -> dict:
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"Fichier introuvable : {file_path}")

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def find_path(swagger: dict, endpoint: str) -> dict | None:
    paths = swagger.get("paths", {})
    return paths.get(endpoint)


def find_schema(swagger: dict, schema_name: str) -> dict | None:
    schemas = swagger.get("components", {}).get("schemas", {})
    return schemas.get(schema_name)


def extract_request_body_schema(path_data: dict, method: str) -> str | None:
    method_data = path_data.get(method.lower())

    if not method_data:
        return None

    request_body = method_data.get("requestBody", {})
    content = request_body.get("content", {})
    json_content = content.get("application/json", {})
    schema = json_content.get("schema", {})

    if not isinstance(schema, dict):
        return None

    ref = schema.get("$ref")

    if not ref:
        return None

    return ref.split("/")[-1]


def collect_refs(value) -> list[str]:
    refs: list[str] = []

    if isinstance(value, dict):
        ref = value.get("$ref")

        if isinstance(ref, str):
            refs.append(ref)

        for child_value in value.values():
            refs.extend(collect_refs(child_value))

    elif isinstance(value, list):
        for item in value:
            refs.extend(collect_refs(item))

    return refs


def print_endpoint_info(swagger: dict, endpoint: str, method: str) -> None:
    path_data = find_path(swagger, endpoint)

    if not path_data:
        print(f"Endpoint introuvable : {endpoint}")
        return

    method_data = path_data.get(method.lower())

    if not method_data:
        print(f"Méthode {method.upper()} introuvable pour {endpoint}")
        return

    print("=" * 80)
    print(f"ENDPOINT : {method.upper()} {endpoint}")
    print("=" * 80)

    print("\nDESCRIPTION :")
    print(method_data.get("description", "Aucune description"))

    print("\nPARAMETERS :")
    parameters = method_data.get("parameters", [])

    if not parameters:
        print("Aucun paramètre.")
    else:
        for param in parameters:
            name = param.get("name", "")
            location = param.get("in", "")
            required = param.get("required", False)
            description = param.get("description", "")
            schema = param.get("schema", {})
            schema_type = schema.get("type", "unknown") if isinstance(schema, dict) else "unknown"

            print(f"- {name}")
            print(f"  in          : {location}")
            print(f"  required    : {required}")
            print(f"  type        : {schema_type}")
            print(f"  description : {description}")

    schema_name = extract_request_body_schema(path_data, method)

    print("\nREQUEST BODY SCHEMA :")
    if schema_name:
        print(schema_name)
    else:
        print("Aucun requestBody trouvé.")
        return

    schema = find_schema(swagger, schema_name)

    if not schema:
        print(f"Schema introuvable : {schema_name}")
        return

    print("\nSCHEMA PROPERTIES :")
    properties = schema.get("properties", {})

    if not properties:
        print("Aucune propriété trouvée.")
        return

    for prop_name, prop_data in properties.items():
        if not isinstance(prop_data, dict):
            continue

        prop_type = prop_data.get("type", "unknown")
        itemtype = prop_data.get("x-itemtype", "")
        readonly = prop_data.get("readOnly", False)

        print(f"- {prop_name}")
        print(f"  type      : {prop_type}")

        if itemtype:
            print(f"  itemtype  : {itemtype}")

        if readonly:
            print(f"  readOnly  : {readonly}")


def search_paths(swagger: dict, keyword: str) -> None:
    paths = swagger.get("paths", {})
    keyword_lower = keyword.lower()

    found = []

    for path, path_data in paths.items():
        if keyword_lower in path.lower():
            found.append(path)
            continue

        if not isinstance(path_data, dict):
            continue

        for method, method_data in path_data.items():
            if not isinstance(method_data, dict):
                continue

            description = method_data.get("description", "")

            if isinstance(description, str) and keyword_lower in description.lower():
                found.append(path)
                break

            refs = collect_refs(method_data)

            if any(keyword_lower in ref.lower() for ref in refs):
                found.append(path)
                break

    found = sorted(set(found))

    if not found:
        print(f"Aucun endpoint trouvé pour : {keyword}")
        return

    print("=" * 80)
    print(f"ENDPOINTS TROUVÉS POUR : {keyword}")
    print("=" * 80)

    for path in found:
        methods = ", ".join(paths[path].keys()).upper()
        print(f"{path}  [{methods}]")


def main():
    if len(sys.argv) < 3:
        print("Utilisation :")
        print("python3 find_schema.py swagger.json /Assets/Monitor post")
        print("python3 find_schema.py swagger.json /Assets/Computer post")
        print("python3 find_schema.py swagger.json search State")
        sys.exit(1)

    swagger_file = sys.argv[1]
    swagger = load_swagger(swagger_file)

    if sys.argv[2] == "search":
        if len(sys.argv) < 4:
            print("Utilisation :")
            print("python3 find_schema.py swagger.json search State")
            sys.exit(1)

        keyword = sys.argv[3]
        search_paths(swagger, keyword)
        return

    if len(sys.argv) < 4:
        print("Utilisation :")
        print("python3 find_schema.py swagger.json /Assets/Monitor post")
        print("python3 find_schema.py swagger.json /Assets/Computer post")
        sys.exit(1)

    endpoint = sys.argv[2]
    method = sys.argv[3]

    print_endpoint_info(swagger, endpoint, method)


if __name__ == "__main__":
    main()
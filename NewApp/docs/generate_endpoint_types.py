from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from find_schema import extract_request_body_schema, find_schema, load_swagger


ROOT_DIR = Path(__file__).resolve().parents[1]
SWAGGER_PATH = ROOT_DIR / "docs" / "swagger.json"
OUTPUT_DIR = ROOT_DIR / "src" / "types" / "generated"

HEADER = """// Auto-generated file. Do not edit manually.
// Generated from GLPI swagger schemas using docs/find_schema.py.
"""

SCALAR_TYPES = {
    "string": "string",
    "integer": "number",
    "number": "number",
    "boolean": "boolean",
}


def schema_to_pascal_case(name: str) -> str:
    cleaned = []

    for char in name:
        if char.isalnum():
            cleaned.append(char)
        else:
            cleaned.append(" ")

    words = "".join(cleaned).split()
    return "".join(word[:1].upper() + word[1:] for word in words) or "AnonymousSchema"


def endpoint_to_pascal_case(endpoint: str) -> str:
    parts = []

    for raw_part in endpoint.strip("/").split("/"):
        if not raw_part:
            continue

        if raw_part.startswith("{") and raw_part.endswith("}"):
            param_name = raw_part[1:-1]
            parts.append("By" + schema_to_pascal_case(param_name))
            continue

        parts.append(schema_to_pascal_case(raw_part))

    return "".join(parts) or "Root"


def literal_type(value: Any) -> str:
    if isinstance(value, str):
        return json.dumps(value)

    if value is None:
        return "null"

    if isinstance(value, bool):
        return "true" if value else "false"

    return str(value)


def indent(text: str, level: int = 1) -> str:
    prefix = "  " * level
    return "\n".join(prefix + line if line else line for line in text.splitlines())


def get_object_target_name(
    prop_schema: dict[str, Any],
    current_schema_name: str | None,
    available_type_names: set[str],
) -> str | None:
    full_schema_name = prop_schema.get("x-full-schema")

    if isinstance(full_schema_name, str):
        target_name = schema_to_pascal_case(full_schema_name)

        if target_name != current_schema_name and target_name in available_type_names:
            return target_name

    item_type = prop_schema.get("x-itemtype")

    if isinstance(item_type, str):
        target_name = schema_to_pascal_case(item_type)

        if target_name != current_schema_name and target_name in available_type_names:
            return target_name

    ref = prop_schema.get("$ref")

    if isinstance(ref, str):
        target_name = schema_to_pascal_case(ref.split("/")[-1])

        if target_name != current_schema_name and target_name in available_type_names:
            return target_name

    if current_schema_name and prop_schema.get("properties"):
        return None

    return None


def schema_to_ts(
    schema: dict[str, Any],
    *,
    schema_mode: str,
    available_type_names: set[str],
    current_schema_name: str | None = None,
    resolve_named_object: bool = True,
) -> str:
    ref = schema.get("$ref")

    if isinstance(ref, str):
        ref_name = schema_to_pascal_case(ref.split("/")[-1])
        return f"{ref_name}{'Input' if schema_mode == 'input' else ''}"

    enum_values = schema.get("enum")

    if isinstance(enum_values, list) and enum_values:
        return " | ".join(literal_type(value) for value in enum_values)

    one_of = schema.get("oneOf")
    if isinstance(one_of, list) and one_of:
        return " | ".join(
            schema_to_ts(
                item,
                schema_mode=schema_mode,
                available_type_names=available_type_names,
                current_schema_name=current_schema_name,
                resolve_named_object=True,
            )
            for item in one_of
            if isinstance(item, dict)
        )

    any_of = schema.get("anyOf")
    if isinstance(any_of, list) and any_of:
        return " | ".join(
            schema_to_ts(
                item,
                schema_mode=schema_mode,
                available_type_names=available_type_names,
                current_schema_name=current_schema_name,
                resolve_named_object=True,
            )
            for item in any_of
            if isinstance(item, dict)
        )

    all_of = schema.get("allOf")
    if isinstance(all_of, list) and all_of:
        return " & ".join(
            schema_to_ts(
                item,
                schema_mode=schema_mode,
                available_type_names=available_type_names,
                current_schema_name=current_schema_name,
                resolve_named_object=True,
            )
            for item in all_of
            if isinstance(item, dict)
        )

    schema_type = schema.get("type")

    if schema_type == "array":
        items = schema.get("items", {})

        if not isinstance(items, dict):
            return "unknown[]"

        item_type = schema_to_ts(
            items,
            schema_mode=schema_mode,
            available_type_names=available_type_names,
            current_schema_name=current_schema_name,
            resolve_named_object=True,
        )
        return f"({item_type})[]"

    if schema_type == "object" or "properties" in schema:
        target_name = (
            get_object_target_name(
                schema,
                current_schema_name,
                available_type_names,
            )
            if resolve_named_object
            else None
        )

        if target_name:
            return f"{target_name}{'Input' if schema_mode == 'input' else ''}"

        properties = schema.get("properties", {})

        if isinstance(properties, dict) and properties:
            lines: list[str] = ["{"]
            required_properties = set(schema.get("required", []))

            for prop_name, prop_schema in properties.items():
                if not isinstance(prop_schema, dict):
                    continue

                if schema_mode == "input" and prop_schema.get("readOnly") is True:
                    continue

                if schema_mode == "schema" and prop_schema.get("writeOnly") is True:
                    continue

                prop_type = schema_to_ts(
                    prop_schema,
                    schema_mode=schema_mode,
                    available_type_names=available_type_names,
                    current_schema_name=current_schema_name,
                    resolve_named_object=True,
                )
                optional = "" if prop_name in required_properties else "?"
                readonly = (
                    "readonly "
                    if schema_mode == "schema" and prop_schema.get("readOnly") is True
                    else ""
                )
                lines.append(f"  {readonly}{prop_name}{optional}: {prop_type}")

            lines.append("}")
            return "\n".join(lines)

        additional_properties = schema.get("additionalProperties")

        if isinstance(additional_properties, dict):
            value_type = schema_to_ts(
                additional_properties,
                schema_mode=schema_mode,
                available_type_names=available_type_names,
                current_schema_name=current_schema_name,
                resolve_named_object=True,
            )
            return f"Record<string, {value_type}>"

        return "Record<string, unknown>"

    if isinstance(schema_type, list) and schema_type:
        return " | ".join(SCALAR_TYPES.get(item, "unknown") for item in schema_type)

    if isinstance(schema_type, str):
        return SCALAR_TYPES.get(schema_type, "unknown")

    return "unknown"


def render_schema_exports(swagger: dict[str, Any]) -> str:
    schemas = swagger.get("components", {}).get("schemas", {})
    available_type_names = {
        schema_to_pascal_case(schema_name)
        for schema_name, schema in schemas.items()
        if isinstance(schema, dict)
    }
    lines = [HEADER.rstrip(), "", "export type JsonPrimitive = string | number | boolean | null", ""]

    for schema_name in sorted(schemas):
        raw_schema = schemas[schema_name]

        if not isinstance(raw_schema, dict):
            continue

        type_name = schema_to_pascal_case(schema_name)
        schema_body = schema_to_ts(
            raw_schema,
            schema_mode="schema",
            available_type_names=available_type_names,
            current_schema_name=type_name,
            resolve_named_object=False,
        )
        input_body = schema_to_ts(
            raw_schema,
            schema_mode="input",
            available_type_names=available_type_names,
            current_schema_name=type_name,
            resolve_named_object=False,
        )

        lines.append(f"export type {type_name} = {schema_body}")
        lines.append("")
        lines.append(f"export type {type_name}Input = {input_body}")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def render_endpoint_payload_exports(swagger: dict[str, Any]) -> str:
    paths = swagger.get("paths", {})
    alias_lines = [
        HEADER.rstrip(),
        "",
        "import type * as Schemas from './schemas'",
        "",
        "export interface EndpointRequestBodyMap {",
    ]
    exported_aliases: list[str] = []

    for endpoint in sorted(paths):
        path_data = paths[endpoint]

        if not isinstance(path_data, dict):
            continue

        for method in sorted(path_data):
            schema_name = extract_request_body_schema(path_data, method)

            if not schema_name:
                continue

            schema = find_schema(swagger, schema_name)

            if not isinstance(schema, dict):
                continue

            alias_name = f"{schema_to_pascal_case(method)}{endpoint_to_pascal_case(endpoint)}Body"
            input_type_name = f"{schema_to_pascal_case(schema_name)}Input"

            exported_aliases.append(
                f"export type {alias_name} = Schemas.{input_type_name}"
            )
            alias_lines.append(f"  '{method.upper()} {endpoint}': {alias_name}")

    alias_lines.append("}")
    alias_lines.append("")
    alias_lines.extend(exported_aliases)
    alias_lines.append("")

    return "\n".join(alias_lines)


def render_index_file() -> str:
    return HEADER + "\nexport * from './schemas'\nexport * from './endpointPayloads'\n"


def main() -> None:
    swagger = load_swagger(str(SWAGGER_PATH))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    (OUTPUT_DIR / "schemas.ts").write_text(render_schema_exports(swagger), encoding="utf-8")
    (OUTPUT_DIR / "endpointPayloads.ts").write_text(
        render_endpoint_payload_exports(swagger),
        encoding="utf-8",
    )
    (OUTPUT_DIR / "index.ts").write_text(render_index_file(), encoding="utf-8")

    print(f"Types generated in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

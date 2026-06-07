from __future__ import annotations

import sys
from pathlib import Path

from find_schema import load_swagger
from generate_endpoint_types import (
    OUTPUT_DIR,
    SWAGGER_PATH,
    render_endpoint_payload_exports,
    render_index_file,
    render_schema_exports,
)


def generate_types(swagger_path: Path, output_dir: Path) -> None:
    swagger = load_swagger(str(swagger_path))
    output_dir.mkdir(parents=True, exist_ok=True)

    (output_dir / "schemas.ts").write_text(
        render_schema_exports(swagger),
        encoding="utf-8",
    )
    (output_dir / "endpointPayloads.ts").write_text(
        render_endpoint_payload_exports(swagger),
        encoding="utf-8",
    )
    (output_dir / "index.ts").write_text(
        render_index_file(),
        encoding="utf-8",
    )

    schema_count = len(swagger.get("components", {}).get("schemas", {}))
    print(f"Types generated in: {output_dir}")
    print(f"Schema types generated: {schema_count}")


def main() -> None:
    swagger_path = Path(sys.argv[1]).resolve() if len(sys.argv) >= 2 else SWAGGER_PATH
    output_dir = Path(sys.argv[2]).resolve() if len(sys.argv) >= 3 else OUTPUT_DIR

    generate_types(swagger_path, output_dir)


if __name__ == "__main__":
    main()

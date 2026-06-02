#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$PROJECT_DIR/JSON/getToken.json"
SCOPE="api user email status graphql"
tmp_file="$(mktemp)"

curl -X POST http://localhost/api.php/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=e208ddaefc055f01d6f46aaf97383adb340b660e0dc990fe63b01abfd1a02af8" \
  -d "client_secret=3d9f0b7fbfd59bc87d8ed72e6c05e2b692e57c304b454055f895a11ec45b9ecf" \
  -d "username=glpi" \
  -d "password=glpi" \
  -d "scope=$SCOPE" > "$tmp_file"

if jq . "$tmp_file" > "$OUTPUT_FILE"; then
  echo "JSON reformate dans $OUTPUT_FILE"
else
  mv "$tmp_file" "$OUTPUT_FILE"
  echo "Reponse enregistree dans $OUTPUT_FILE, mais le JSON n'a pas pu etre reformate." >&2
  exit 1
fi

rm -f "$tmp_file"

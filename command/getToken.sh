#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$PROJECT_DIR/JSON/getToken.json"
SCOPE=
tmp_file="$(mktemp)"

curl -X POST http://localhost/api.php/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=" \
  -d "client_secret=" \
  -d "username=glpi" \
  -d "password=glpi" \
  -d "scope=api user email status graphql" > "$tmp_file"

if jq . "$tmp_file" > "$OUTPUT_FILE"; then
  echo "JSON reformate dans $OUTPUT_FILE"
else
  mv "$tmp_file" "$OUTPUT_FILE"
  echo "Reponse enregistree dans $OUTPUT_FILE, mais le JSON n'a pas pu etre reformate." >&2
  exit 1
fi

rm -f "$tmp_file"

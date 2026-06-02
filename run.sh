#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENDPOINT_FILE="$SCRIPT_DIR/endpointDOC.json"
DEFAULT_ENDPOINT="/Administration/User/Me"
UI_SERVER="$SCRIPT_DIR/ui/server.py"
COMMON_ENDPOINTS=(
  "/status"
  "/Administration/User/Me"
  "/Assistance/Ticket"
)

generate_token() {
  "$SCRIPT_DIR/command/getToken.sh"
}

test_endpoint() {
  local endpoint="$1"
  "$SCRIPT_DIR/command/testAPI.sh" "$endpoint"
}

launch_ui() {
  python3 "$UI_SERVER"
}

resolve_placeholders() {
  local endpoint="$1"
  local placeholder
  local value

  while [[ "$endpoint" =~ \{([^}]+)\} ]]; do
    placeholder="${BASH_REMATCH[1]}"
    read -r -p "Valeur pour ${placeholder}: " value
    endpoint="${endpoint//\{$placeholder\}/$value}"
  done

  printf '%s\n' "$endpoint"
}

run_single_test() {
  local endpoint="${1:-$DEFAULT_ENDPOINT}"
  endpoint="$(resolve_placeholders "$endpoint")"
  generate_token
  test_endpoint "$endpoint"
}

run_batch_tests() {
  local endpoint

  generate_token

  for endpoint in "$@"; do
    endpoint="$(resolve_placeholders "$endpoint")"
    test_endpoint "$endpoint"
  done
}

search_endpoints() {
  local query="$1"

  if [[ ! -f "$ENDPOINT_FILE" ]]; then
    echo "Fichier introuvable: $ENDPOINT_FILE" >&2
    return 1
  fi

  jq -r '.[]' "$ENDPOINT_FILE" | grep -i -- "$query" || true
}

choose_endpoint_from_search() {
  local query="$1"
  local -a matches=()
  local index=1
  local choice

  mapfile -t matches < <(search_endpoints "$query")

  if [[ "${#matches[@]}" -eq 0 ]]; then
    echo "Aucun endpoint trouve pour: $query"
    return 1
  fi

  echo "Endpoints trouves:"
  for endpoint in "${matches[@]:0:20}"; do
    printf '%2d. %s\n' "$index" "$endpoint"
    index=$((index + 1))
  done

  read -r -p "Choisis un numero: " choice

  if [[ ! "$choice" =~ ^[0-9]+$ ]] || (( choice < 1 || choice > ${#matches[@]} || choice > 20 )); then
    echo "Choix invalide."
    return 1
  fi

  printf '%s\n' "${matches[$((choice - 1))]}"
}

show_menu() {
  echo
  echo "Interface de test API"
  echo "1. Regenerer le token"
  echo "2. Tester un endpoint saisi manuellement"
  echo "3. Rechercher un endpoint dans endpointDOC.json"
  echo "4. Tester une liste d'endpoints communs"
  echo "5. Quitter"
}

interactive_mode() {
  local choice
  local endpoint
  local query

  while true; do
    show_menu
    read -r -p "Ton choix: " choice

    case "$choice" in
      1)
        generate_token
        ;;
      2)
        read -r -p "Endpoint a tester: " endpoint
        run_single_test "$endpoint"
        ;;
      3)
        read -r -p "Recherche: " query
        endpoint="$(choose_endpoint_from_search "$query")" || continue
        echo "Endpoint selectionne: $endpoint"
        run_single_test "$endpoint"
        ;;
      4)
        run_batch_tests "${COMMON_ENDPOINTS[@]}"
        ;;
      5)
        exit 0
        ;;
      *)
        echo "Choix invalide."
        ;;
    esac
  done
}

case "${1:-}" in
  "")
    interactive_mode
    ;;
  --ui)
    launch_ui
    ;;
  --batch)
    shift
    if [[ "$#" -eq 0 ]]; then
      echo "Utilisation: bash run.sh --batch /status /Administration/User/Me" >&2
      exit 1
    fi
    run_batch_tests "$@"
    ;;
  --common)
    run_batch_tests "${COMMON_ENDPOINTS[@]}"
    ;;
  *)
    run_single_test "$1"
    ;;
esac

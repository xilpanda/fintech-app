#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   scripts/setup-telegram-alerting.sh <BOT_TOKEN> [CHAT_ID] [--test]
# or:
#   TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... scripts/setup-telegram-alerting.sh [--test]

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_PATH="$ROOT_DIR/k8s/alertmanager-telegram-config.tmpl.yaml"
RENDERED_PATH="/tmp/alertmanager-telegram-config.yaml"

BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
CHAT_ID="${TELEGRAM_CHAT_ID:-}"
RUN_TEST=0
TEST_DOWN_SECONDS="${TEST_DOWN_SECONDS:-190}"

for arg in "$@"; do
  case "$arg" in
    --test)
      RUN_TEST=1
      ;;
    *)
      if [[ -z "$BOT_TOKEN" ]]; then
        BOT_TOKEN="$arg"
      elif [[ -z "$CHAT_ID" ]]; then
        CHAT_ID="$arg"
      fi
      ;;
  esac
done

if [[ -z "$BOT_TOKEN" ]]; then
  echo "ERROR: Missing BOT_TOKEN."
  echo "Provide as first arg or TELEGRAM_BOT_TOKEN env."
  exit 1
fi

if [[ -z "$CHAT_ID" ]]; then
  echo "CHAT_ID not provided, trying auto-discovery via Telegram getUpdates..."
  CHAT_ID="$(
    python3 - "$BOT_TOKEN" <<'PY'
import json, sys, urllib.request
token = sys.argv[1]
url = f"https://api.telegram.org/bot{token}/getUpdates"
data = json.load(urllib.request.urlopen(url, timeout=15))
results = data.get("result", [])
for item in reversed(results):
    msg = item.get("message") or item.get("channel_post") or {}
    chat = msg.get("chat") or {}
    cid = chat.get("id")
    if cid is not None:
        print(cid)
        break
PY
  )"
fi

if [[ -z "$CHAT_ID" ]]; then
  echo "ERROR: Could not auto-discover CHAT_ID."
  echo "Send any message to your bot, then run this script again with CHAT_ID."
  exit 1
fi

if ! [[ "$CHAT_ID" =~ ^-?[0-9]+$ ]]; then
  echo "ERROR: CHAT_ID must be numeric (Telegram id), got: $CHAT_ID"
  exit 1
fi

if [[ ! -f "$TEMPLATE_PATH" ]]; then
  echo "ERROR: Missing template: $TEMPLATE_PATH"
  exit 1
fi

echo "Applying telegram bot token secret in default namespace..."
kubectl -n default create secret generic telegram-bot-token \
  --from-literal=token="$BOT_TOKEN" \
  --dry-run=client -o yaml | kubectl apply -f -

echo "Rendering AlertmanagerConfig with CHAT_ID=$CHAT_ID ..."
sed "s/__TELEGRAM_CHAT_ID__/$CHAT_ID/g" "$TEMPLATE_PATH" > "$RENDERED_PATH"

echo "Applying AlertmanagerConfig..."
kubectl apply -f "$RENDERED_PATH"

echo "Cleaning old monitoring-scoped config (if present)..."
kubectl delete alertmanagerconfig -n monitoring telegram-notifications --ignore-not-found=true

echo "Waiting for AlertmanagerConfig to be registered..."
kubectl get alertmanagerconfig -n default telegram-notifications >/dev/null
kubectl get alertmanagerconfig -n default telegram-notifications -o name

echo "Telegram alerting setup completed."

if [[ "$RUN_TEST" -eq 1 ]]; then
  echo "Running test alert: scale backend to 0 for ${TEST_DOWN_SECONDS}s, then restore to 1..."
  kubectl scale deployment linuxspec-backend --replicas=0
  sleep "$TEST_DOWN_SECONDS"
  kubectl scale deployment linuxspec-backend --replicas=1
  echo "Test executed. Check Telegram for LinuxspecBackendDown firing/resolved alerts."
fi

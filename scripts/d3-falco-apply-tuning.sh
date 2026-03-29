#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FALCO_VALUES="$ROOT_DIR/k8s/security/falco/values.yaml"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd helm
require_cmd kubectl

echo "[1/4] Upgrading Falco with D3 custom rules"
helm repo add falcosecurity "https://falcosecurity.github.io/charts" >/dev/null
helm repo update >/dev/null
helm upgrade --install falco falcosecurity/falco \
  --namespace falco \
  --create-namespace \
  -f "$FALCO_VALUES"

echo "[2/4] Waiting for Falco DaemonSet rollout"
kubectl rollout status daemonset/falco -n falco --timeout=300s

echo "[3/4] Runtime status checks"
kubectl get pods -n falco -o wide
kubectl get pods -n falco -l app.kubernetes.io/name=falco-sidekick -o wide || true

echo "[4/4] D3 Falco tuning applied"
echo "Done."

#!/usr/bin/env bash
set -euo pipefail

# Safety guardrails for D2 pilot:
# - run only in explicitly selected pilot context
# - never run on active production context by mistake
PILOT_CONTEXT="${PILOT_CONTEXT:-}"
ALLOW_CNI_CHANGE="${ALLOW_CNI_CHANGE:-false}"
CILIUM_VERSION="${CILIUM_VERSION:-v1.17.4}"
KUBE_PROXY_REPLACEMENT="${KUBE_PROXY_REPLACEMENT:-false}"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl
require_cmd curl

if [[ -z "$PILOT_CONTEXT" ]]; then
  echo "ERROR: PILOT_CONTEXT is required."
  echo "Example: PILOT_CONTEXT=my-pilot-cluster ALLOW_CNI_CHANGE=true bash scripts/d2-cilium-pilot-install.sh"
  exit 1
fi

if [[ "$ALLOW_CNI_CHANGE" != "true" ]]; then
  echo "ERROR: ALLOW_CNI_CHANGE must be 'true' to continue."
  exit 1
fi

CURRENT_CONTEXT="$(kubectl config current-context)"
if [[ "$CURRENT_CONTEXT" != "$PILOT_CONTEXT" ]]; then
  echo "ERROR: current kubectl context ($CURRENT_CONTEXT) does not match PILOT_CONTEXT ($PILOT_CONTEXT)."
  exit 1
fi

if [[ "$CURRENT_CONTEXT" == *"prod"* ]] || [[ "$CURRENT_CONTEXT" == *"production"* ]]; then
  echo "ERROR: refusing to run on production-like context name: $CURRENT_CONTEXT"
  exit 1
fi

if ! command -v cilium >/dev/null 2>&1; then
  echo "[0/7] Installing Cilium CLI (${CILIUM_VERSION})"
  CILIUM_CLI_VERSION="$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)"
  CLI_ARCH=amd64
  case "$(uname -m)" in
    aarch64) CLI_ARCH=arm64 ;;
    x86_64) CLI_ARCH=amd64 ;;
  esac
  curl -L --fail --remote-name-all \
    "https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz"{,.sha256sum}
  sha256sum --check "cilium-linux-${CLI_ARCH}.tar.gz.sha256sum"
  sudo tar xzvfC "cilium-linux-${CLI_ARCH}.tar.gz" /usr/local/bin
  rm "cilium-linux-${CLI_ARCH}.tar.gz" "cilium-linux-${CLI_ARCH}.tar.gz.sha256sum"
else
  echo "[0/7] Cilium CLI already present"
fi

echo "[1/7] Confirming target context"
echo "Current context: $CURRENT_CONTEXT"

echo "[2/7] Running Cilium preflight checks"
cilium version

echo "[3/7] Installing Cilium in pilot cluster"
cilium install \
  --version "$CILIUM_VERSION" \
  --set kubeProxyReplacement="$KUBE_PROXY_REPLACEMENT" \
  --set hubble.enabled=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true

echo "[4/7] Waiting for Cilium readiness"
cilium status --wait

echo "[5/7] Running Cilium connectivity smoke test"
cilium connectivity test --request-timeout 10s

echo "[6/7] Enabling Hubble CLI access"
cilium hubble port-forward >/tmp/hubble-port-forward.log 2>&1 &
HUBBLE_PF_PID=$!
sleep 3
cilium hubble status || true
cilium hubble observe --last 20 || true
kill "$HUBBLE_PF_PID" >/dev/null 2>&1 || true

echo "[7/7] Pilot installation completed"
echo "D2 pilot install finished for context: $CURRENT_CONTEXT"

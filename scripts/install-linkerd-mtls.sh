#!/usr/bin/env bash
set -euo pipefail

LINKERD_VERSION="${LINKERD_VERSION:-stable-2.15.5}"
INSTALL_VIZ="${INSTALL_VIZ:-true}"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl
require_cmd curl

if ! command -v linkerd >/dev/null 2>&1; then
  echo "[0/7] Installing Linkerd CLI (${LINKERD_VERSION})"
  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "$tmp_dir"' EXIT
  curl -sSfL "https://run.linkerd.io/install" | sh -s -- "--version=${LINKERD_VERSION}"
  export PATH="$HOME/.linkerd2/bin:$PATH"
else
  echo "[0/7] Linkerd CLI already present"
fi

echo "[1/7] Linkerd CLI version"
linkerd version --client

echo "[2/7] Preflight checks"
linkerd check --pre

echo "[3/7] Installing Linkerd CRDs"
linkerd install --crds | kubectl apply -f -

echo "[4/7] Installing Linkerd control plane"
linkerd install | kubectl apply -f -

echo "[5/7] Waiting for Linkerd control plane rollout"
kubectl rollout status deployment/linkerd-controller -n linkerd --timeout=240s
kubectl rollout status deployment/linkerd-destination -n linkerd --timeout=240s
kubectl rollout status deployment/linkerd-identity -n linkerd --timeout=240s
kubectl rollout status deployment/linkerd-proxy-injector -n linkerd --timeout=240s

if [[ "$INSTALL_VIZ" == "true" ]]; then
  echo "[6/7] Installing Linkerd viz extension"
  linkerd viz install | kubectl apply -f -
  kubectl rollout status deployment/web -n linkerd-viz --timeout=240s
  kubectl rollout status deployment/metrics-api -n linkerd-viz --timeout=240s
else
  echo "[6/7] Skipping Linkerd viz extension (INSTALL_VIZ=false)"
fi

echo "[7/7] Final health checks"
linkerd check
if [[ "$INSTALL_VIZ" == "true" ]]; then
  linkerd viz check
fi

echo "Done. Linkerd mTLS control plane is installed."

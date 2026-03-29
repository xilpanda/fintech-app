#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${NAMESPACE:-linuxspec-prod}"
DEPLOYMENTS=("linuxspec-backend" "linuxspec-frontend")

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl
require_cmd linkerd

echo "[1/5] Ensuring namespace exists"
kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

echo "[2/5] Enabling Linkerd proxy injection on namespace"
kubectl annotate namespace "$NAMESPACE" linkerd.io/inject=enabled --overwrite

echo "[3/5] Restarting application deployments to inject sidecars"
for deploy in "${DEPLOYMENTS[@]}"; do
  if kubectl get deployment "$deploy" -n "$NAMESPACE" >/dev/null 2>&1; then
    kubectl rollout restart deployment/"$deploy" -n "$NAMESPACE"
  else
    echo "WARN: deployment/$deploy not found in $NAMESPACE (skipping)"
  fi
done

echo "[4/5] Waiting for rollouts"
for deploy in "${DEPLOYMENTS[@]}"; do
  if kubectl get deployment "$deploy" -n "$NAMESPACE" >/dev/null 2>&1; then
    kubectl rollout status deployment/"$deploy" -n "$NAMESPACE" --timeout=240s
  fi
done

echo "[5/5] Checking Linkerd data plane health for namespace"
linkerd -n "$NAMESPACE" check --proxy
linkerd -n "$NAMESPACE" viz stat deploy || true

echo "Done. Namespace $NAMESPACE is onboarded to Linkerd mTLS."

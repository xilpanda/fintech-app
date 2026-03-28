#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GATEKEEPER_DIR="$ROOT_DIR/k8s/security/gatekeeper"
FALCO_VALUES="$ROOT_DIR/k8s/security/falco/values.yaml"

echo "[1/5] Installing OPA Gatekeeper"
kubectl apply -f "https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.15/deploy/gatekeeper.yaml"
kubectl rollout status deployment/gatekeeper-controller-manager -n gatekeeper-system --timeout=180s

echo "[2/5] Applying Gatekeeper policies from repo"
kubectl apply -k "$GATEKEEPER_DIR"

echo "[3/5] Installing Falco Helm chart"
helm repo add falcosecurity "https://falcosecurity.github.io/charts" >/dev/null
helm repo update >/dev/null
helm upgrade --install falco falcosecurity/falco \
  --namespace falco \
  --create-namespace \
  -f "$FALCO_VALUES"

echo "[4/5] Waiting for Falco rollout"
kubectl rollout status daemonset/falco -n falco --timeout=240s

echo "[5/5] Runtime security components ready"
kubectl get pods -n gatekeeper-system
kubectl get pods -n falco

echo "Done. DevSecOps runtime layer is installed."

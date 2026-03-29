#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SIGNING_DIR="$ROOT_DIR/k8s/security/image-signing"
POLICY_FILE="$SIGNING_DIR/clusterpolicy-verify-signed-images.yaml"

echo "[1/5] Installing Sigstore policy-controller"
helm repo add sigstore "https://sigstore.github.io/helm-charts" >/dev/null
helm repo update >/dev/null
helm upgrade --install policy-controller sigstore/policy-controller \
  --namespace cosign-system \
  --create-namespace \
  --set installCRDs=true

echo "[2/5] Waiting for policy-controller rollout"
kubectl rollout status deployment/policy-controller-webhook -n cosign-system --timeout=240s

echo "[3/5] Enforcing Sigstore include label only on linuxspec-prod"
kubectl create namespace linuxspec-prod --dry-run=client -o yaml | kubectl apply -f -
kubectl label namespace linuxspec-prod policy.sigstore.dev/include=true --overwrite
kubectl label namespace default policy.sigstore.dev/include- || true

echo "[4/5] Applying image signature verification policy"
kubectl apply -k "$SIGNING_DIR"

echo "[5/5] Verifying policy"
kubectl get clusterimagepolicy linuxspec-signed-images
kubectl get pods -n cosign-system

echo "Done. Sigstore signed-image admission policy is active."

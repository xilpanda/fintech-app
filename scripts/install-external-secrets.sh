#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ESO_DIR="$ROOT_DIR/k8s/security/external-secrets"

echo "[1/4] Installing External Secrets Operator"
helm repo add external-secrets "https://charts.external-secrets.io" >/dev/null
helm repo update >/dev/null
helm upgrade --install external-secrets external-secrets/external-secrets \
  --namespace external-secrets \
  --create-namespace

echo "[2/4] Waiting for operator rollout"
kubectl rollout status deployment/external-secrets -n external-secrets --timeout=180s

echo "[3/4] Applying SecretStore and ExternalSecret manifests"
kubectl apply -k "$ESO_DIR"

echo "[4/4] Verifying resources"
kubectl get pods -n external-secrets
kubectl get clustersecretstore kubernetes-seed-store
kubectl get externalsecret backend-secret -n linuxspec-prod

echo "Done. External Secrets integration is installed."

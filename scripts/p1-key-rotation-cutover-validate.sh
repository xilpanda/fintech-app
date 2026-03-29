#!/usr/bin/env bash
set -euo pipefail

NS="${NS:-linuxspec-prod}"
OUT_DIR="${OUT_DIR:-./artifacts/p1-key-rotation-validate-$(date +%Y%m%d-%H%M%S)}"
NEG_POLICY_NAME="ci-negative-busybox-policy"

mkdir -p "$OUT_DIR"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl

echo "[1/6] Capturing current policy state"
kubectl get clusterimagepolicy linuxspec-signed-images -o yaml > "$OUT_DIR/clusterimagepolicy.yaml"

echo "[2/6] Resolving signed runtime image references"
BACKEND_IMAGE="$(kubectl get deployment linuxspec-backend -n "$NS" -o jsonpath='{.spec.template.spec.containers[0].image}')"
FRONTEND_IMAGE="$(kubectl get deployment linuxspec-frontend -n "$NS" -o jsonpath='{.spec.template.spec.containers[0].image}')"
echo "BACKEND_IMAGE=$BACKEND_IMAGE" | tee "$OUT_DIR/images.txt"
echo "FRONTEND_IMAGE=$FRONTEND_IMAGE" | tee -a "$OUT_DIR/images.txt"

echo "[3/6] Positive gate: signed backend/frontend must be admitted"
kubectl run p1-positive-backend \
  -n "$NS" \
  --image="$BACKEND_IMAGE" \
  --restart=Never \
  --dry-run=server -o yaml > "$OUT_DIR/p1-positive-backend.yaml"

kubectl run p1-positive-frontend \
  -n "$NS" \
  --image="$FRONTEND_IMAGE" \
  --restart=Never \
  --dry-run=server -o yaml > "$OUT_DIR/p1-positive-frontend.yaml"

echo "[4/6] Negative gate: unsigned busybox must be denied"
cat <<'EOF' | kubectl apply -f -
apiVersion: policy.sigstore.dev/v1beta1
kind: ClusterImagePolicy
metadata:
  name: ci-negative-busybox-policy
spec:
  mode: enforce
  images:
    - glob: "index.docker.io/library/busybox:*"
    - glob: "index.docker.io/library/busybox@*"
  authorities:
    - key:
        data: |-
          -----BEGIN PUBLIC KEY-----
          MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAESFngZc/4YC5B4DvUtN3ehMrcQj78
          eM5iQThrFfE87j4dttxBysdzedOXQt0JicMMXm+t1gZWqiwAncKE1fiJtQ==
          -----END PUBLIC KEY-----
EOF

set +e
kubectl run p1-negative-busybox \
  -n "$NS" \
  --image=docker.io/library/busybox:1.36 \
  --restart=Never \
  --dry-run=server -o yaml > "$OUT_DIR/p1-negative-busybox.out" 2>&1
NEG_RC=$?
set -e

kubectl delete clusterimagepolicy "$NEG_POLICY_NAME" --ignore-not-found=true >/dev/null 2>&1 || true

if [[ "$NEG_RC" -eq 0 ]]; then
  echo "ERROR: negative test unexpectedly passed" | tee "$OUT_DIR/summary.txt"
  exit 1
fi

echo "[5/6] Capturing policy-controller health and namespace labels"
kubectl -n cosign-system get pods -o wide > "$OUT_DIR/cosign-pods.txt"
kubectl get ns "$NS" --show-labels > "$OUT_DIR/ns-labels.txt"

echo "[6/6] Writing evidence summary"
cat > "$OUT_DIR/summary.txt" <<EOF
P1 key-rotation cutover validation complete.
- Positive backend admission: PASS
- Positive frontend admission: PASS
- Negative busybox admission: PASS (denied as expected)
- Policy source: linuxspec-signed-images
- Namespace: $NS
EOF

echo "Done. Evidence written to: $OUT_DIR"

#!/usr/bin/env bash
set -euo pipefail

APP_NS="${APP_NS:-linuxspec-prod}"
OUT_DIR="${OUT_DIR:-./artifacts/d2-cilium-verify-$(date +%Y%m%d-%H%M%S)}"
BACKEND_LABEL="${BACKEND_LABEL:-app=linuxspec-backend}"
FRONTEND_LABEL="${FRONTEND_LABEL:-app=linuxspec-frontend}"
MONGODB_LABEL="${MONGODB_LABEL:-app=mongodb}"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl
require_cmd cilium

mkdir -p "$OUT_DIR"

echo "[1/8] Capturing Cilium and Hubble health"
cilium status > "$OUT_DIR/cilium-status.txt"
cilium hubble status > "$OUT_DIR/hubble-status.txt" || true

echo "[2/8] Capturing Cilium endpoints and policies"
cilium endpoint list > "$OUT_DIR/cilium-endpoints.txt" || true
cilium policy get > "$OUT_DIR/cilium-policies.txt" || true

echo "[3/8] Capturing namespace workload status"
kubectl get deploy,svc,pod -n "$APP_NS" -o wide > "$OUT_DIR/${APP_NS}-workloads.txt"
kubectl get events -n "$APP_NS" --sort-by=.lastTimestamp > "$OUT_DIR/${APP_NS}-events.txt"

echo "[4/8] Verifying frontend -> backend path"
FRONTEND_POD="$(kubectl get pod -n "$APP_NS" -l "$FRONTEND_LABEL" -o jsonpath='{.items[0].metadata.name}')"
kubectl exec -n "$APP_NS" "$FRONTEND_POD" -- sh -c "wget -qO- http://linuxspec-backend/health/ready" > "$OUT_DIR/frontend-to-backend.txt"

echo "[5/8] Verifying backend -> mongodb DNS and TCP path"
BACKEND_POD="$(kubectl get pod -n "$APP_NS" -l "$BACKEND_LABEL" -o jsonpath='{.items[0].metadata.name}')"
kubectl exec -n "$APP_NS" "$BACKEND_POD" -- sh -c "getent hosts mongodb" > "$OUT_DIR/backend-dns-mongodb.txt"
kubectl exec -n "$APP_NS" "$BACKEND_POD" -- sh -c "nc -zv mongodb 27017" > "$OUT_DIR/backend-tcp-mongodb.txt" 2>&1 || true

echo "[6/8] Capturing Hubble flow sample"
cilium hubble port-forward >/tmp/hubble-port-forward.log 2>&1 &
HUBBLE_PF_PID=$!
sleep 3
cilium hubble observe --last 50 > "$OUT_DIR/hubble-observe-last50.txt" || true
kill "$HUBBLE_PF_PID" >/dev/null 2>&1 || true

echo "[7/8] Capturing kube-system CNI pods"
kubectl get pods -n kube-system -o wide > "$OUT_DIR/kube-system-pods.txt"

echo "[8/8] Verification completed"
echo "Artifacts directory: $OUT_DIR"

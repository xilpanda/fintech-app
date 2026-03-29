#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${OUT_DIR:-./artifacts/d3-falco-validate-$(date +%Y%m%d-%H%M%S)}"
TEST_NS="${TEST_NS:-linuxspec-prod}"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl

mkdir -p "$OUT_DIR"

echo "[1/6] Capturing Falco runtime status"
kubectl get pods -n falco -o wide > "$OUT_DIR/falco-pods.txt"

echo "[2/6] Triggering reverse-shell-like command pattern (safe dry test pod)"
kubectl run d3-falco-reverse-shell-test \
  -n "$TEST_NS" \
  --image=alpine:3.20 \
  --restart=Never \
  --command -- sh -c "sh -i >/dev/null 2>&1 || true; sleep 5" >/dev/null 2>&1 || true

echo "[3/6] Triggering sensitive file-read pattern in test pod"
kubectl run d3-falco-file-read-test \
  -n "$TEST_NS" \
  --image=alpine:3.20 \
  --restart=Never \
  --command -- sh -c "cat /etc/passwd >/dev/null 2>&1 || true; sleep 5" >/dev/null 2>&1 || true

echo "[4/6] Waiting briefly for Falco events"
sleep 15

echo "[5/6] Collecting recent Falco logs"
kubectl logs -n falco -l app.kubernetes.io/name=falco --since=3m > "$OUT_DIR/falco-logs.txt" || true
kubectl logs -n falco -l app.kubernetes.io/name=falco-sidekick --since=3m > "$OUT_DIR/falco-sidekick-logs.txt" || true

echo "[6/6] Cleaning test pods and writing summary"
kubectl delete pod d3-falco-reverse-shell-test -n "$TEST_NS" --ignore-not-found=true >/dev/null 2>&1 || true
kubectl delete pod d3-falco-file-read-test -n "$TEST_NS" --ignore-not-found=true >/dev/null 2>&1 || true

{
  echo "Look for D3 rule hits in:"
  echo " - $OUT_DIR/falco-logs.txt"
  echo " - $OUT_DIR/falco-sidekick-logs.txt"
  echo
  echo "Expected rule names:"
  echo " - Linuxspec Reverse Shell Pattern"
  echo " - Linuxspec Suspicious Sensitive File Read"
  echo " - Linuxspec Crypto Miner Binary Execution"
} > "$OUT_DIR/README.txt"

echo "Done. Artifacts: $OUT_DIR"

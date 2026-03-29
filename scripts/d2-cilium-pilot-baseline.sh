#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${OUT_DIR:-./artifacts/d2-cilium-baseline-$(date +%Y%m%d-%H%M%S)}"
APP_NS="${APP_NS:-linuxspec-prod}"

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: missing required command: $cmd"
    exit 1
  fi
}

require_cmd kubectl

mkdir -p "$OUT_DIR"

echo "[1/8] Capturing current context and cluster info"
kubectl config current-context > "$OUT_DIR/current-context.txt"
kubectl cluster-info > "$OUT_DIR/cluster-info.txt"

echo "[2/8] Capturing node and namespace state"
kubectl get nodes -o wide > "$OUT_DIR/nodes.txt"
kubectl get ns --show-labels > "$OUT_DIR/namespaces.txt"

echo "[3/8] Capturing app namespace workloads"
kubectl get deploy,ds,sts,svc,ingress,pod -n "$APP_NS" -o wide > "$OUT_DIR/${APP_NS}-workloads.txt"
kubectl get events -n "$APP_NS" --sort-by=.lastTimestamp > "$OUT_DIR/${APP_NS}-events.txt"

echo "[4/8] Capturing network and security policies"
kubectl get networkpolicy -A -o wide > "$OUT_DIR/networkpolicy.txt"
kubectl get clusterimagepolicy -o yaml > "$OUT_DIR/clusterimagepolicy.yaml" || true

echo "[5/8] Capturing Linkerd and Sigstore runtime health"
kubectl get pods -n linkerd -o wide > "$OUT_DIR/linkerd-pods.txt" || true
kubectl get pods -n linkerd-viz -o wide > "$OUT_DIR/linkerd-viz-pods.txt" || true
kubectl get pods -n cosign-system -o wide > "$OUT_DIR/cosign-pods.txt" || true
kubectl get ns "$APP_NS" --show-labels > "$OUT_DIR/${APP_NS}-labels.txt" || true

echo "[6/8] Capturing observability stack status"
kubectl get pods -n monitoring -o wide > "$OUT_DIR/monitoring-pods.txt" || true
kubectl get servicemonitor,prometheusrule -A > "$OUT_DIR/monitoring-crs.txt" || true

echo "[7/8] Capturing CNI-related daemonsets"
kubectl get ds -A -o wide > "$OUT_DIR/daemonsets.txt"

echo "[8/8] Baseline capture completed"
echo "Artifacts directory: $OUT_DIR"

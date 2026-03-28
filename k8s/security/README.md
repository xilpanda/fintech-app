# Runtime Security Manifests

This directory contains Kubernetes runtime security assets for the DevSecOps phase.

## Contents

- `gatekeeper/`:
  - OPA Gatekeeper policy template and constraint to deny `:latest` image tags.
- `falco/values.yaml`:
  - Falco Helm values for runtime threat detection.

## Apply Gatekeeper policies

Prerequisite: Gatekeeper controller installed in cluster.

```bash
kubectl apply -k k8s/security/gatekeeper
```

## Install runtime layer (Gatekeeper + Falco)

```bash
bash scripts/install-devsecops-runtime.sh
```

## Verify

```bash
kubectl get constrainttemplates
kubectl get k8sdenylatesttag.constraints.gatekeeper.sh
kubectl get pods -n gatekeeper-system
kubectl get pods -n falco
```

# Runtime Security Manifests

This directory contains Kubernetes runtime security assets for the DevSecOps phase.

## Contents

- `gatekeeper/`:
  - OPA Gatekeeper policy templates and constraints for:
    - deny `:latest` tags,
    - require resource requests/limits,
    - deny privileged containers,
    - require `runAsNonRoot`.
- `falco/values.yaml`:
  - Falco Helm values for runtime threat detection and FalcoSidekick -> Alertmanager forwarding.

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
kubectl get k8srequireresources.constraints.gatekeeper.sh
kubectl get k8sdenyprivileged.constraints.gatekeeper.sh
kubectl get k8srequirerunasnonroot.constraints.gatekeeper.sh
kubectl get pods -n gatekeeper-system
kubectl get pods -n falco
```

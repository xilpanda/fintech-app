# PROJECT_PROGRESS

## Scope

This document summarizes all major work completed so far on the `linuxspec` migration and deployment path, including repository cleanup, CI/CD alignment, Kubernetes cutovers, and TLS enablement.

## High-level outcome

- The project has been migrated to `linuxspec-backend` + `linuxspec-frontend`.
- Production hosts now serve the new frontend and backend services.
- Legacy app directories and legacy Kubernetes resources were removed.
- GitHub Actions self-hosted runner is installed and running as a persistent systemd service.
- HTTPS is active with Let's Encrypt certificates via cert-manager.

## What was completed

### 1) Repository cleanup and merge stabilization

- Resolved `.gitignore` merge conflict.
- Removed old planning documents from remote repository:
  - `IMPLEMENTATION_PLAN.md`
  - `LINUXSPEC_IMPLEMENTATION_PLAN.md`
- Added and translated `README.md` to English.
- Removed legacy source directories from GitHub:
  - `backend/`
  - `frontend/`

### 2) Backend migration and deployment alignment

- Aligned CI/CD and Kubernetes manifests with `linuxspec-backend`.
- Added backend Dockerfile at `linuxspec-backend/Dockerfile`.
- Added health endpoints required by probes:
  - `/health`
  - `/health/live`
  - `/health/ready`
- Switched backend database dependency in manifests to MongoDB service (`mongodb:27017`).
- Performed API ingress cutover:
  - `api.linuxspec.com` now routes to `linuxspec-backend`.

### 3) Frontend migration and production cutover

- Added frontend Dockerfile at `linuxspec-frontend/Dockerfile`.
- Added frontend Kubernetes resources:
  - `k8s/frontend-deployment.yaml`
  - `k8s/frontend-service.yaml`
- Added test route for safe validation:
  - `web-test.linuxspec.com`
- Verified new frontend content via test host.
- Cut over production web hosts to `linuxspec-frontend`:
  - `linuxspec.com`
  - `www.linuxspec.com`
  - `frontend.linuxspec.com`

### 4) Legacy Kubernetes cleanup

- Removed old legacy resources:
  - Deployments: `backend`, `postgres`
  - Services: `backend`, `postgres`
  - Ingresses: `frontend-ingress`, `backend-ingress`
- Kept active resources only for linuxspec stack:
  - `linuxspec-backend`, `linuxspec-frontend`, `mongodb`, `nginx`

### 5) GitHub Actions runner

- Confirmed no runner on `k8s-master`.
- Runner configured on Debian machine under `~/actions-runner`.
- Installed as systemd service and enabled at boot:
  - `actions.runner.xilpanda-fintech-app.debian.service`
- Verified service is active and connected to GitHub.
- Queued workflows were consumed after runner was online.

### 6) HTTPS / TLS enablement

- Enabled cert-manager ingress-shim annotations on ingress manifests.
- Added TLS blocks and secrets for:
  - `linuxspec-web-tls` (web hosts)
  - `api-linuxspec-tls` (API host)
- Verified certificates were issued by Let's Encrypt (`R12`).
- Verified HTTP to HTTPS redirect for `linuxspec.com`.
- Verified HTTPS responses for production hosts.

## Current production routing

- Web ingress (`fintech-ingress`):
  - `linuxspec.com` -> `linuxspec-frontend`
  - `www.linuxspec.com` -> `linuxspec-frontend`
  - `frontend.linuxspec.com` -> `linuxspec-frontend`
- API ingress (`linuxspec-ingress`):
  - `api.linuxspec.com` -> `linuxspec-backend`
  - `web-test.linuxspec.com` -> `linuxspec-frontend` (test host)

## Verification snapshots completed

- Kubernetes:
  - frontend deployment ready
  - backend deployment ready
  - mongodb deployment ready
- Host checks:
  - `linuxspec.com` content returns new linuxspec headline
  - `www.linuxspec.com` content returns new linuxspec headline
  - `frontend.linuxspec.com` content returns new linuxspec headline
  - `api.linuxspec.com/health/ready` returns ready status
- TLS checks:
  - valid certificate for `linuxspec.com`
  - HTTP 308 redirect to HTTPS enabled

## Recent key commits (main)

- `eef5add` create clean source-only snapshot without local dependency caches
- `33f935c` remove local implementation plan documents from repository
- `635d3a5` align CI and Kubernetes manifests with linuxspec backend
- `6134b06` set valid backend image and use non-conflicting test ingress host
- `0f6750a` cut over API ingress host to linuxspec backend
- `9bb9b8f` remove legacy backend and frontend directories
- `691c49b` deploy linuxspec frontend and cut over website hosts

## Remaining recommendations

- Remove `web-test.linuxspec.com` route when no longer needed.
- Replace manual image tags (`manual-20260324a`) with CI-generated SHA tags only.
- Add Kubernetes manifests for runner health or external monitoring alerts.
- Add smoke test job in CI after deploy (web + API health check).

## Runbook: ArgoCD ApplicationSet controller restart loop

### Incident

- `argocd-applicationset-controller` had high and continuously increasing restarts.
- Controller logs showed:
  - `no matches for kind "ApplicationSet" in version "argoproj.io/v1alpha1"`
- Root cause: missing CRD `applicationsets.argoproj.io`.

### Fix applied

1. Confirmed CRD was missing:
   - `kubectl get crd applicationsets.argoproj.io`
2. Installed CRD using server-side apply (avoids annotation size limit on large CRDs):
   - `kubectl apply --server-side -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.4/manifests/crds/applicationset-crd.yaml`
3. Restarted ApplicationSet controller:
   - `kubectl rollout restart deployment/argocd-applicationset-controller -n argocd`
4. Waited for successful rollout:
   - `kubectl rollout status deployment/argocd-applicationset-controller -n argocd`

### Verification commands

```bash
# CRD exists
kubectl get crd applicationsets.argoproj.io

# Controller pod healthy and restarts stable
kubectl get pods -n argocd

# No "no matches for kind ApplicationSet" errors
kubectl logs -n argocd deploy/argocd-applicationset-controller --since=5m

# GitOps app status remains healthy
kubectl get applications -n argocd
```

Expected healthy state:
- `applicationsets.argoproj.io` is present.
- `argocd-applicationset-controller` is `Running` and no new crash loop pattern.
- Argo app shows `Synced` and `Healthy` (e.g. `fintech-app`).

## Runtime security phase completed (DevSecOps)

### Completed

- Installed OPA Gatekeeper runtime admission layer in cluster.
- Applied Gatekeeper policy set:
  - deny mutable image tag `:latest`,
  - require `resources.requests/limits` (cpu + memory),
  - deny privileged containers,
  - require `runAsNonRoot: true` at container or pod level.
- Installed Falco daemonset on all nodes with custom rule pack.
- Enabled FalcoSidekick forwarding to Alertmanager endpoint for existing alerting channel integration.

### Verification

- Policy enforcement validated:
  - test pod with `nginx:latest` was blocked by Gatekeeper webhook.
- Runtime components healthy:
  - Gatekeeper controller and audit pods `Running`.
  - Falco daemonset pods `Running` on cluster nodes.

### Operational command set

```bash
kubectl get pods -n gatekeeper-system
kubectl get pods -n falco
kubectl get constrainttemplates
kubectl get k8sdenylatesttag.constraints.gatekeeper.sh
kubectl get k8srequireresources.constraints.gatekeeper.sh
kubectl get k8sdenyprivileged.constraints.gatekeeper.sh
kubectl get k8srequirerunasnonroot.constraints.gatekeeper.sh
```

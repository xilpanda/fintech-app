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

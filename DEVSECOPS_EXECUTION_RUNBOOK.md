# DevSecOps Execution Runbook

## Purpose

This document defines the next execution phase of the project: moving from advanced DevOps/GitOps to a complete **DevSecOps** operating model.

It is written as an actionable implementation guide with:
- clear responsibility split (local machine, GitHub CI, `k8s-master`),
- security gate sequence,
- push/deploy flow,
- phased rollout plan with verification commands.

---

## 1) Current Baseline (Already Implemented)

The platform already has:
- Kubernetes cluster (homelab runtime),
- GitHub Actions CI pipeline,
- ArgoCD GitOps deployment,
- ArgoCD Image Updater,
- Ingress + TLS (cert-manager),
- Prometheus + Grafana + Alerting,
- Registry-based image distribution (currently GHCR in this repo).

This means the foundation is strong; the next step is embedding security checks into both CI and runtime.

---

## 2) Operating Model: Where Things Run

## Developer / Local Workstation (Debian/Windows)

Use for:
- code changes,
- `git add/commit/push`,
- local functional testing,
- preparing PRs and release changes.

Why:
- fastest feedback loop,
- developer productivity.

## GitHub Actions (CI Security + Build)

Use for:
- unit/integration tests,
- SAST/dependency/secret/container scans,
- image build and push,
- security gate enforcement (fail pipeline on high-risk findings).

Why:
- reproducible and isolated build environment,
- fail early before deployment,
- auditable CI results.

## Kubernetes (`k8s-master`) / Cluster Runtime

Use for:
- ArgoCD reconciliation and runtime deployment,
- secrets management (Kubernetes Secrets/Vault),
- policy enforcement (OPA Gatekeeper/Kyverno),
- runtime security detection (Falco),
- runtime observability and alerting.

Why:
- this is where workloads actually run and need real-time protection.

---

## 3) Golden Delivery Flow (Target)

```text
Developer (local) -> git push -> GitHub Actions (CI security gates + build)
-> Container Registry (GHCR) -> ArgoCD sync -> Kubernetes runtime
-> OPA policy admission -> Falco runtime detection -> Monitoring/Alerting
```

Security must exist in both layers:
- **CI layer**: prevent vulnerable artifacts from being shipped.
- **Runtime layer**: prevent/detect unsafe behavior in the cluster.

---

## 4) Push and Deploy Rules (Critical)

1. `git push` is always done from local development environment.
2. Build/scan/push images are done in GitHub Actions, not on `k8s-master`.
3. Deployment is driven by ArgoCD from Git desired state.
4. No manual runtime drift unless emergency incident mitigation is required.
5. Emergency manual changes must be back-ported to Git immediately.

---

## 5) Why We Do Not Build in Kubernetes

Builds should not run inside production cluster nodes.

Reasons:
- stronger isolation and supply-chain control,
- deterministic and reproducible builds,
- reduced attack surface in runtime environment,
- cleaner separation of CI concerns vs runtime concerns.

---

## 6) DevSecOps Implementation Phases

## Phase 1 - CI Security Gates (GitHub)

Objective: block insecure code/artifacts before image push.

Implement in CI:
- Secret scanning (Gitleaks),
- Dependency + filesystem vulnerability scanning (Trivy),
- Image scanning (Trivy image),
- Optional SAST quality gate (SonarQube/Semgrep),
- Optional dependency policy gate (Snyk).

Gate policy:
- fail pipeline on `HIGH`/`CRITICAL` findings (initially),
- allow only reviewed exceptions.

Minimum verification:
- intentionally introduce a known vulnerable package in a branch,
- confirm workflow fails before push/deploy stages.

## Phase 2 - Secrets Hardening (Kubernetes)

Objective: remove plaintext secret usage from manifests and code.

Implement:
- Kubernetes Secrets (or Vault later),
- secret references via `env.valueFrom.secretKeyRef`,
- ensure no hardcoded credentials in repo.

Minimum verification:
- deployment uses secret refs,
- secret values are not present in Git.

## Phase 3 - Admission Policy Enforcement (OPA Gatekeeper)

Objective: block insecure manifests at admission time.

Initial policy set:
- deny `:latest` image tags,
- require resource requests/limits,
- require non-root and read-only root filesystem where possible.

Minimum verification:
- apply intentionally non-compliant manifest and confirm deny.

## Phase 4 - Runtime Threat Detection (Falco)

Objective: detect suspicious runtime behavior.

Implement:
- Falco installation in dedicated namespace,
- route Falco alerts to existing alerting path (Alertmanager/Telegram),
- baseline and tune noisy rules.

Minimum verification:
- execute known suspicious activity test in non-production pod,
- confirm alert firing and notification path.

## Phase 5 - Compliance and Audit Readiness

Objective: make controls auditable and repeatable.

Implement:
- documented policy list and owners,
- CI gate results retained per run,
- runtime security alert triage procedure,
- periodic security posture review cadence.

---

## 7) Execution Matrix: Activity vs Location

| Activity | Where it runs | Why |
|---|---|---|
| `git push` | Local dev machine | Development workflow source |
| CI tests/scans | GitHub Actions | Reproducible fail-fast security gates |
| Docker/OCI build | GitHub Actions | Controlled isolated build |
| Image push to registry | GitHub Actions | Centralized artifact publication |
| ArgoCD sync/deploy | Kubernetes cluster | GitOps runtime reconciliation |
| Secrets consumption | Kubernetes | Secure runtime injection |
| Policy enforcement | Kubernetes admission | Block insecure deploys |
| Runtime threat detection | Kubernetes | Detect live threats in workloads |

---

## 8) Security Controls by Layer

## CI Controls
- Gitleaks (secret leakage),
- Trivy filesystem/dependency scan,
- Trivy image scan,
- SAST (SonarQube/Semgrep),
- dependency policy (Snyk optional).

## Runtime Controls
- Kubernetes Secrets / Vault,
- RBAC least privilege,
- OPA Gatekeeper constraints,
- NetworkPolicy segmentation,
- Falco runtime detection,
- Prometheus/Grafana + alert routing.

---

## 9) Suggested Priority Order (Enterprise-ready)

1. Trivy + Gitleaks in CI with hard fail gates.
2. OPA Gatekeeper with deny-latest and baseline pod security constraints.
3. Falco runtime detection integrated with existing alerts.
4. Secret scanning and secret management standardization.

This order gives fastest risk reduction with lowest migration friction.

---

## 10) Operational Checks (Quick Commands)

## CI Gate Validation

```bash
# verify workflow status after push
gh run list --limit 5
```

## ArgoCD Health

```bash
kubectl get applications -n argocd
kubectl get pods -n argocd
```

## Runtime Security Components

```bash
# Gatekeeper
kubectl get pods -n gatekeeper-system

# Falco
kubectl get pods -n falco
```

---

## 11) Definition of Done for DevSecOps Phase

This phase is complete when all are true:
- CI fails on secret leaks and high/critical vulnerabilities.
- Insecure manifests are blocked by admission policy.
- Runtime suspicious activity produces actionable alerts.
- Secrets are consumed from managed stores, not plaintext.
- ArgoCD remains the single deployment reconciler from Git.

---

## 12) Guardrails

- Do not bypass security gates in CI except explicit emergency with documented approval.
- Do not deploy mutable tags (`latest`) to production workloads.
- Do not perform permanent manual cluster changes outside GitOps.
- Keep cluster and CI tool versions aligned and documented.

---

## Final Direction

The project moves from:
- DevOps + GitOps foundation

to:
- **DevSecOps with enforceable gates, runtime protection, and continuous compliance**.

Security is now a delivery primitive, not a post-deployment add-on.

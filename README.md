# DevOps Homelab Platform - Kubernetes, CI/CD, GitOps

## Overview

This project is a production-like DevOps platform built in a local homelab environment to simulate real infrastructure and delivery workflows.

Technology baseline:
- Proxmox virtualization
- Kubernetes kubeadm cluster
- Dockerized frontend and backend applications
- Stateful database workload with persistent storage
- CI/CD pipeline using GitHub Actions with a self-hosted runner
- NGINX Ingress for traffic routing
- TLS management with cert-manager
- Monitoring stack with Prometheus and Grafana
- GitOps-ready operating model with ArgoCD

Goal:
- Run the application and validate how infrastructure, deployment, and operations behave under production-style conditions.

## Architecture (High-Level)

```text
                +----------------------------+
                |        Git Repository      |
                |   Source of Truth: Code    |
                +-------------+--------------+
                              |
                              | git push
                              v
                +----------------------------+
                |   GitHub Actions (CI/CD)   |
                |     Self-hosted Runner     |
                +-------------+--------------+
                              |
                              | build/push/apply
                              v
        +--------------------------------------------+
        |            Kubernetes Cluster              |
        |                                            |
        |  +--------------+      +----------------+  |
        |  | Frontend     |      | Backend API    |  |
        |  | Deployment   |      | Deployment     |  |
        |  +------+-------+      +--------+-------+  |
        |         |                       |          |
        |         v                       v          |
        |      Service                Service        |
        |         +-----------+-----------+          |
        |                     |                      |
        |                     v                      |
        |        NGINX Ingress Controller            |
        |                     |                      |
        |                     v                      |
        |             HTTP / HTTPS Traffic           |
        |                                            |
        |      Stateful DB + PVC + Secrets           |
        +--------------------------------------------+
```

## Infrastructure Layer

### Virtualization

- Cluster runs on virtual machines provisioned in Proxmox
- Multi-node topology for realistic scheduling and failover behavior
- Container runtime: containerd
- Linux-based worker and control plane nodes

### Cluster Foundation

- Kubernetes installed with kubeadm
- Standard control plane and node components
- Namespace-scoped application workloads with declarative manifests

## Kubernetes Layer

### Core Components

- kube-apiserver
- scheduler
- controller-manager
- kubelet

### Workloads

- Frontend (stateless web workload)
- Backend API (service workload)
- Database (stateful workload with persistent volumes)

## Deployment Model

Kubernetes is operated declaratively:

- Missing resource: created
- Existing resource with change: reconciled
- Existing resource without change: unchanged

This supports idempotent deployments and repeatable CI/CD runs.

## Networking and Exposure

### Internal Communication

- `ClusterIP` services
- DNS-based service discovery inside the cluster

### External Exposure

- Initial stage: `NodePort` for controlled testing
- Production path: NGINX Ingress Controller

Ingress responsibilities:
- Layer 7 routing
- Host-based traffic separation
- TLS termination

## Security Layer

### Secrets Management

- Sensitive values are stored in Kubernetes Secrets
- No hardcoded credentials in manifests
- Rotation can be done without rebuilding images

### Transport Security

- Certificates issued and renewed through cert-manager
- HTTPS termination at ingress layer
- Security headers and traffic policy managed through ingress annotations

## Data Layer (Stateful)

### Persistent Workload

- Database runs as a stateful workload in the cluster
- Data persistence is provided through:
  - PersistentVolume (PV)
  - PersistentVolumeClaim (PVC)

This design protects data through pod restarts and rolling updates.

## Scalability

### Horizontal Pod Autoscaler

- Scale decisions can be driven by CPU or custom metrics
- Backend workload can scale out under increased load
- Scale-in behavior is controlled to avoid instability

## Traffic Protection

### Ingress Rate Limiting

- Request rate limiting can be enforced via NGINX annotations
- Burst and sustained limits protect backend endpoints
- Reduces abuse risk and improves service stability

## Observability

### Monitoring Stack

- Prometheus for metrics collection
- Grafana for dashboards and visualization

Operational visibility typically includes:
- CPU and memory utilization
- pod health and restarts
- deployment and cluster status

## CI/CD Pipeline

### Delivery Flow

```text
git push -> GitHub Actions -> self-hosted runner -> kubectl -> Kubernetes
```

### Pipeline Characteristics

- Automated image build and publish
- Declarative manifest apply
- Rollout status verification
- Post-deploy smoke checks
- Safe re-deploy behavior due to idempotent model

## Deployment Strategy

### Rolling Updates

- Controlled rollout with minimal disruption
- Health probes gate traffic readiness

### Rollback

```bash
kubectl rollout undo deployment/<name>
```

Rollback enables fast recovery when a deployment fails validation.

## Debug and Operations

Common operational commands:

```bash
kubectl get pods
kubectl get deploy,svc,ingress
kubectl logs <pod-name>
kubectl describe pod <pod-name>
kubectl rollout status deployment/<name>
```

This reflects a standard SRE troubleshooting workflow.

## GitOps Direction

Operating model transition:

```text
manual apply -> GitOps reconciliation
```

Target state with ArgoCD:
- Git as the single source of truth
- automated sync to cluster state
- drift detection and self-healing behavior

## Key Learnings

- Infrastructure includes virtualization, networking, and platform layers
- Declarative systems require strong verification discipline
- CI/CD should be idempotent, observable, and rollback-safe
- Production readiness depends on persistence, security, monitoring, and controlled rollouts

## Conclusion

This repository demonstrates a production-grade DevOps environment simulation:

- Multi-node Kubernetes operations
- CI/CD with a self-hosted runner
- Ingress-based exposure with TLS
- Stateful workloads with persistent storage
- Monitoring, scaling, and GitOps-ready architecture


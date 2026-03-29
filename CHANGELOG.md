# Changelog

## v1.0.0-devsecops-pass

- Stabilized CI pipeline on self-hosted runner by hardening tool installation and failure handling.
- Added backend runtime security controls (HTTP hardening, safer input handling, and dependency security updates).
- Added frontend security headers to satisfy baseline web security checks (including HSTS).
- Refined deploy workflow behavior so security checks continue while deploy-specific steps are safely gated when signing prerequisites are missing.
- Improved reliability of artifact/report handling and rollback logic to prevent false-negative pipeline failures.

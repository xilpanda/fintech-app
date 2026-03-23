# Mini Fintech Wallet - Implementation Plan

Ovaj dokument je radni blueprint za razvoj projekta **Mini Fintech Wallet (DevOps Playground)**.
Koristi se kao jedinstven izvor istine za redosled rada, standarde implementacije i kriterijume zavrsetka.

## 1) Cilj projekta

Napraviti jednostavan fintech wallet sistem kroz faze:
- **Faza 1:** Backend (FastAPI) + Postgres + Kubernetes deploy
- **Faza 2:** Ingress i Frontend
- **Faza 3:** CI/CD
- **Faza 4:** Monitoring

Fokus je na postepenom prelazu od demo koda ka **production-grade** postavci.

## 2) Predlozena struktura projekta

```text
fintech-app/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   ├── config.py
│   │   ├── logging_config.py
│   │   ├── health.py
│   │   └── routes/
│   │      ├── users.py
│   │      └── transactions.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── k8s/
│   ├── postgres.yaml
│   ├── backend-deployment.yaml
│   ├── backend-ingress.yaml         # Faza 2
│   └── configmap-secret.yaml        # Faza 1/2
├── frontend/                        # Faza 2
├── .github/workflows/               # Faza 3
└── IMPLEMENTATION_PLAN.md
```

Napomena: `schemas.py`, `config.py`, `logging_config.py` i `health.py` su dodati za production-grade refactor.

## 3) Faza 1 - Backend + Postgres + K8s (MVP)

## 3.1 Backend (FastAPI)

Obavezni moduli:
- `database.py`: SQLAlchemy engine/session/Base
- `models.py`: `User` model (`id`, `name`, `balance`)
- `routes/users.py`: kreiranje korisnika
- `routes/transactions.py`: transfer izmedju korisnika
- `main.py`: app inicijalizacija i router include

Minimalni `requirements.txt`:
- `fastapi`
- `uvicorn`
- `psycopg2-binary`
- `sqlalchemy`

## 3.2 Kljucni funkcionalni zahtevi (MVP)

- Endpoint za kreiranje korisnika sa pocetnim stanjem (`balance=100.0`)
- Endpoint za transfer (`from_id`, `to_id`, `amount`)
- Validacija nedovoljnih sredstava
- Health endpoint (`/`) vraca status aplikacije

## 3.3 Docker

Backend image:
- baziran na `python:3.11`
- instalira dependencies iz `requirements.txt`
- pokrece `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## 3.4 Kubernetes resursi

- `postgres.yaml`:
  - `Service` + `Deployment` za Postgres
  - env: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `backend-deployment.yaml`:
  - `Deployment` + `Service` za backend
  - backend kontejner iz buildovane Docker slike

## 3.5 Runbook za Fazu 1

Lokalno (opciono):
```bash
docker build -t fintech-backend .
docker run -p 8000:8000 fintech-backend
```

K8s deploy:
```bash
kubectl apply -f postgres.yaml
kubectl apply -f backend-deployment.yaml
```

Test:
```bash
kubectl port-forward svc/backend 8000:80
```

Provera u browser-u:
- `http://localhost:8000`

## 4) Production-grade refactor zahtevi (kriticno pre Faze 2)

Ovo je direktan checklist za Cursor prompt:

`Refactor this into production-grade code with proper error handling, transactions (atomic), logging, health checks, environment variables.`

Razrada zahteva:

### 4.1 Proper error handling
- koristiti `HTTPException` sa smislenim status kodovima (`400`, `404`, `409`, `500`)
- validirati ulazne parametre (npr. `amount > 0`, `from_id != to_id`)
- hendlovati slucajeve kada korisnik ne postoji
- izbegavati vracanje "raw" exception poruka klijentu

### 4.2 Atomic transactions
- transfer mora biti atomican (rollback ako bilo sta padne)
- koristiti SQLAlchemy transakcioni kontekst (`session.begin()`)
- pozeljno zakljucavanje redova pri transferu (`SELECT ... FOR UPDATE`) radi konkurentnih upita

### 4.3 Logging
- centralizovan logger (`logging_config.py`)
- logovati kljucne dogadjaje:
  - create user
  - transfer success/failure
  - db/connectivity greske
- uvodjenje request-level logova (metoda, path, status, duration)

### 4.4 Health checks
- `/health/live` (aplikacija ziva)
- `/health/ready` (db konekcija dostupna)
- readiness treba da proveri `SELECT 1` prema bazi

### 4.5 Environment variables
- izbaciti hardkodovan `DATABASE_URL`
- koristiti `.env` / env vars i `config.py`
- primer:
  - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
  - ili direktno `DATABASE_URL`

## 5) Faza 2 - Ingress + Frontend

Cilj:
- izlaganje backend servisa preko Ingress-a (realan URL)
- osnovni frontend za:
  - kreiranje korisnika
  - prikaz balansa
  - slanje transfera

Minimum:
- `backend-ingress.yaml`
- frontend koji poziva backend API kroz Ingress host

## 6) Faza 3 - CI/CD

Predlog pipeline-a:
- lint + test backend
- build Docker image
- push image u registry
- deploy na K8s (staging/prod zavisno od branch-a)

Primeri tooling-a:
- GitHub Actions
- Docker Hub ili GHCR

## 7) Faza 4 - Monitoring

Minimum observability setup:
- Prometheus metrics endpoint (`/metrics`)
- Grafana dashboard (request count, latency, error rate)
- osnovni alerting (pod down, db unreachable, high error rate)

## 8) Definition of Done po fazama

### Faza 1 Done
- backend API radi lokalno i u K8s
- Postgres povezan i stabilan
- create user + transfer rade
- health endpoint-i postoje

### Faza 2 Done
- Ingress izlozen i dostupan
- frontend radi osnovne wallet akcije

### Faza 3 Done
- automatski build/test/deploy pipeline aktivan

### Faza 4 Done
- osnovni dashboard + alerting aktivni

## 9) Rizici i mitigacije

- **Race conditions kod transfera** -> row lock + atomic transakcije
- **Hardcoded credentials** -> Secret/ConfigMap + env vars
- **Nedostatak observability** -> health + metrics + log standard
- **Manual deploy greske** -> CI/CD automatizacija

## 10) Predlog redosleda implementacije (operativni plan)

1. Bootstrap backend skeleton (`main`, `db`, `models`, `routes`)
2. Dodati `schemas.py` (request/response modeli)
3. Refactor transfer logike na atomic transakciju
4. Dodati health/live i health/ready endpoint-e
5. Uvesti env-based config
6. Dodati logging middleware + app logger
7. Docker build/test
8. K8s deploy (postgres pa backend)
9. Verifikacija kroz port-forward i API testove
10. Tek onda prelaz na Fazu 2

## 11) SRE Test Scenarios (operativni testovi)

Ovi testovi su obavezni pre prelaska na Fazu 2 jer pokazuju kako se sistem ponasa pod greskom i opterecenjem.

### 11.1 DB pod restart test
- Akcija:
  - restartovati/obrisati postgres pod
- Komande:
  - `kubectl get pods`
  - `kubectl delete pod <postgres-pod-name>`
  - `kubectl logs deployment/backend`
- Ocekivanje:
  - `/health/ready` privremeno pada na `503`, pa se vraca na `200` kada se DB oporavi
  - backend ne puca trajno i nastavlja obradu nakon oporavka

### 11.2 Backend crash test
- Akcija:
  - obrisati backend pod dok servis prima zahteve
- Komande:
  - `kubectl delete pod <backend-pod-name>`
  - `kubectl get pods -w`
- Ocekivanje:
  - Kubernetes podize novi pod
  - servis ostaje dostupan uz kratki prekid
  - liveness/readiness probe rade po planu

### 11.3 Scaling test
- Akcija:
  - skalirati backend na vise replika
- Komanda:
  - `kubectl scale deployment backend --replicas=3`
- Ocekivanje:
  - 3 backend poda su `Running`
  - servis pravilno rutira ka svim replikama
  - nema regresije u transfer endpoint-u

### 11.4 Rollback test
- Akcija:
  - deploy neispravne image verzije, zatim rollback
- Komande:
  - `kubectl set image deployment/backend backend=<broken-image>`
  - `kubectl rollout status deployment/backend`
  - `kubectl rollout undo deployment/backend`
- Ocekivanje:
  - rollback vraca prethodnu stabilnu verziju
  - health endpoint-i ponovo prolaze

### 11.5 Concurrent transfer test (race condition)
- Akcija:
  - poslati veci broj paralelnih transfer zahteva
- Primer:
  - vise istovremenih POST zahteva na `/transactions/transfer`
- Ocekivanje:
  - nema negativnih balansa usled race condition-a
  - atomicka transakcija i row lock cuvaju konzistentnost

### 11.6 Operativni evidencioni artefakti
- Nakon svakog testa sacuvati:
  - izlaz `kubectl get pods`
  - izlaz `kubectl get svc`
  - relevantne backend logove
  - kratak zapis: "sta se desilo", "zasto", "kako je reseno"

## 12) Git Push Runbook (za kasnije)

Ovo je standardni postupak za push koda na GitHub za ovaj projekat.

### 12.1 Preporuceno: SSH push

1. Provera da SSH ka GitHub radi:
   - `ssh -T git@github.com`
   - Ocekivan odgovor: `Hi <username>! You've successfully authenticated...`

2. Podesavanje remote-a na SSH:
   - `git remote set-url origin git@github.com:xilpanda/fintech-app.git`
   - `git remote -v`

3. Push:
   - `git push -u origin main`

### 12.2 Ako SSH ne radi

- Provera kljuceva:
  - `ls -la ~/.ssh`
  - `cat ~/.ssh/id_ed25519.pub`
- Dodati public key na GitHub:
  - <https://github.com/settings/keys>
- Ponovo test:
  - `ssh -T git@github.com`

### 12.3 Fallback: HTTPS + PAT

Ako se koristi HTTPS remote i dobijes `401`:
- kreirati PAT token:
  - <https://github.com/settings/tokens>
- push komanda:
  - `git push -u origin main`
- username: GitHub username
- password: PAT token (ne lozinka naloga)

### 12.4 Najcesce greske i brzo resenje

- `Missing or invalid credentials` / `401`:
  - koristi SSH remote ili HTTPS+PAT
- `No anonymous write access`:
  - autentikacija nije prosla
- `non-fast-forward`:
  - povuci promene sa remote-a pa resi conflict pre push-a

### 12.5 Minimalni workflow pre push-a

1. `git status`
2. `git add .`
3. `git commit -m "short clear message"`
4. `git push -u origin main`

---

Ako pratimo ovaj dokument, projekat ostaje jasan, iterativan i spreman za prelaz sa MVP-a na production-grade standard.

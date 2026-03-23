# linuxspec

`linuxspec` is a full-stack application for lead generation and lead qualification for FinOps and fintech engineering services.

The application includes:
- a landing page with a clear service offering
- an ROI calculator for estimating potential cloud savings
- a multi-step lead form
- a backend API for storing and managing leads
- basic anti-spam and rate-limit protection

## What the application does

The frontend provides:
- a value proposition focused on reducing cloud costs and building fintech systems
- an ROI calculator that estimates monthly and yearly savings ranges
- a two-step lead form (cloud cost -> contact details)

The backend handles:
- lead creation (`POST /api/leads`)
- lead listing (`GET /api/leads`)
- lead statistics (`GET /api/leads/stats`)
- lead status updates (`PATCH /api/leads/:id/status`)
- health check (`GET /health`)

After a successful lead submission:
- the lead is stored in MongoDB
- the backend attempts to send admin and auto-reply emails (if SMTP is configured)

## Technologies

- Frontend: Next.js 14, React 18, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Integrations: Nodemailer (email), Express Rate Limit (anti-abuse)
- Operations: GitHub Actions and Kubernetes for CI/CD and deployment

## Project structure

```text
linuxspec-frontend/   Next.js landing page + lead form + ROI calculator
linuxspec-backend/    Express API + Mongo models + email service
```

## Local development

### 1) Backend

```bash
cd linuxspec-backend
npm install
cp .env.example .env
npm run dev
```

Default URL: `http://localhost:5000`

Required backend environment variables:
- `PORT`
- `FRONTEND_ORIGIN`
- `MONGO_URI`
- `ADMIN_API_KEY` (for admin routes)

Optional email environment variables:
- `EMAIL`
- `EMAIL_PASS`

### 2) Frontend

```bash
cd linuxspec-frontend
npm install
cp .env.example .env.local
npm run dev
```

Default URL: `http://localhost:3000`

Client environment variables:
- `NEXT_PUBLIC_API_BASE_URL` (for example `http://localhost:5000`)
- `NEXT_PUBLIC_CALENDLY_URL` (optional)

## API overview

- `POST /api/leads`
  - input: `name`, `company`, `email`, `message`, `monthlyCost`, `honeypot`
  - output: `{ success: true, id }`

- `GET /api/leads`
  - query: `limit`, `status`, `q`
  - header: `x-admin-key` (if `ADMIN_API_KEY` is defined)

- `GET /api/leads/stats`
  - returns lead counts grouped by status

- `PATCH /api/leads/:id/status`
  - input: `{ status: "new" | "contacted" | "won" | "lost" }`

- `GET /health`
  - output: `{ status: "OK" }`

## Production note

This repository is intended to keep source code while build and deployment are handled through GitHub Actions and Kubernetes.
Local runtime artifacts and dependency directories (`node_modules`, `.venv`, `__pycache__`) should not be versioned.

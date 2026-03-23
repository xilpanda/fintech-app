# linuxspec - New App Implementation Plan

Ovaj dokument je novi izvor istine za razvoj aplikacije `linuxspec`.
Postojeca fintech wallet aplikacija se gasi nakon sto nova aplikacija prodje MVP i deploy verifikaciju.

## 1) Pozicioniranje (hero poruka)

Primarna poruka:
- **Reduce cloud costs. Build secure fintech systems. Scale without waste.**

Alternativna:
- **We optimize, build and scale fintech systems on Linux infrastructure.**

## 2) Core ponude (business model)

### A) FinOps (glavni fokus)

Prodaja:
- cloud cost optimization (AWS / DigitalOcean / Azure)
- real-time cost monitoring
- scaling strategije bez overprovisioninga

Tehnicki rad:
- idle resource analiza
- rightsizing VM-ova i servisa
- autoscaling tuning
- storage optimizacija
- reserved instances / savings plans

Use-case:
- startup trosi `2000 EUR/mesec` -> optimizacija na `900 EUR/mesec`

### B) Custom Fintech Development

Prodaja:
- wallet sistemi (user balance + ledger + transaction log)
- transaction sistemi (audit + retry + failure handling)
- interni alati (admin dashboard + basic fraud checks + reporting)

## 3) Produktizacija (paketi)

- **Paket 1: FinOps Audit** -> `EUR 300 - EUR 800`
  - infra analiza, report, preporuke
- **Paket 2: FinOps Optimization** -> `EUR 800 - EUR 3000`
  - implementacija optimizacije i smanjenje troskova
- **Paket 3: Fintech System Build** -> `EUR 2000 - EUR 8000`
  - wallet + API + dashboard
- **Paket 4: Monthly Optimization** -> `EUR 200 - EUR 1000/mesec`
  - kontinuirano pracenje i optimizacija

## 4) Struktura sajta (landing page)

### HERO
- Headline: `Reduce Cloud Costs. Build Secure Fintech Systems. Scale Smart.`
- Subheadline: pomoc fintech timovima da smanje waste i izgrade stabilne sisteme na Linux-u
- CTA:
  - `Get Free FinOps Audit`
  - `Book a Call`

### Section 0 - Problem-first (obavezno odmah ispod hero)
- Naslov: `Are you overpaying for cloud?`
- Bullet:
  - Your cloud bill keeps growing every month
  - You do not know where the waste is
  - Systems scale, but costs explode
  - Team is afraid to optimize due to downtime risk
- Cilj: psiholoski "pain match" pre nudjenja resenja

### Section 1 - ROI Kalkulator (killer feature)
- Input:
  - monthly cloud cost (EUR)
- Output:
  - potential savings range (30% - 60%)
  - money saved per month i per year
- Primer:
  - `EUR 1000/month` -> `EUR 300 - EUR 600` ustedjeno mesecno
- CTA: `Get Your Cost Analysis`

### Section 2 - FinOps
- Naslov: `Cut Your Cloud Costs Without Breaking Your System`
- Bullet:
  - Identify unused and overprovisioned resources
  - Optimize autoscaling and infrastructure usage
  - Reduce monthly cloud bills by up to 60%
  - Improve performance while lowering cost
- CTA: `Get Your Cost Analysis`

### Section 3 - Fintech Development
- Naslov: `Build Reliable Fintech Systems That Actually Scale`
- Ponuda:
  - Wallet systems (ledger-based architecture)
  - Transaction engines with audit logs
  - Internal dashboards and admin tools
  - Secure APIs and backend systems
- CTA: `Request a Custom Solution`

### Section 4 - How it works
1. Audit
2. Optimization
3. Build & Scale

### Section 5 - Case study
- primer:
  - cloud cost `EUR 1200 -> EUR 500/mesec`
  - wallet sistem sa full transaction logging
- rezultat:
  - `58%` cost reduction + stabilan sistem

### Section 6 - Pricing
- 4 paketa iz sekcije 3, transparentno prikazani

### Section 7 - Why us (trust layer)
- Linux-first expertise
- cost-first mindset
- real fintech engineering iskustvo
- security + performance fokus
- trust copy:
  - `Built and optimized production systems on Linux infrastructure`
  - `Experience in Linux, DevOps, and Security`

### Final CTA + Footer
- CTA: `Get Free Audit` + `Book a Call`
- Footer: Email, LinkedIn, GitHub, copyright

## 5) Diferencijacija

- cost-first mindset (ne samo "scale")
- kombinacija FinOps + Fintech dev (retko na trzistu)
- Linux fokus: performanse, kontrola, sigurnost

## 6) Tehnicki stack (nova aplikacija)

### Frontend
- Next.js 13+ (App Router)
- Tailwind CSS
- dark fintech UI (plava + tamna)
- cards + minimalizam

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- lead capture API

### Integracije
- Calendly (Book a Call)
- Analytics (Google Analytics ili Plausible)
- SEO metadata + keyword setup

## 7) Frontend implementacija (MVP)

Obavezni fajlovi:
- `app/page.tsx` (landing sekcije)
- `app/components/LeadForm.tsx`
- `app/components/RoiCalculator.tsx`
- `app/globals.css`
- `tailwind.config.js`

Lead forma mora biti multi-step:
- Step 1: `What is your monthly cloud cost?`
- Step 2: `Email + optional message`
- cilj: veca konverzija nego jedna duga forma

Tailwind setup:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

`globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 8) Backend implementacija (MVP)

Struktura:
```text
backend/
├── server.js
├── db.js
├── routes/
│   └── leads.js
├── models/
│   └── Lead.js
└── package.json
```

Install:
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv mongoose nodemailer express-rate-limit
```

API endpoints:
- `POST /api/leads` -> create lead
- `GET /api/leads` -> admin list leads
- `GET /health` -> service status

Validation i anti-spam (obavezno):
- email regex validacija
- rate limit po IP
- honeypot field (`company` npr. mora ostati prazan)
- input sanitation + max length

Minimalna validacija:
```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: "Invalid email" });
}
```

Rate limit primer:
```js
import rateLimit from "express-rate-limit";

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});
app.use("/api/leads", leadLimiter);
```

Email automacija (obavezno):
- nakon uspesnog lead submit-a poslati:
  - admin notifikaciju (`New Lead`)
  - auto-reply korisniku (`Thanks, we will analyze your setup`)

Env:
```env
MONGO_URI=mongodb://localhost:27017/linuxspec
PORT=5000
EMAIL=your@email.com
EMAIL_PASS=app_password
```

## 9) Lead capture flow (production)

1. Posetilac prolazi multi-step formu (cost -> email -> submit)
2. Frontend salje `POST /api/leads`
3. Backend radi validation + rate-limit + honeypot check
4. Lead se snima u MongoDB
5. Trigeruje se:
   - admin email alert
   - auto-reply email lead-u
6. Frontend prikazuje status (`Saved`/`Error`)

Next upgrades:
- admin dashboard leadova (status: new/contacted/won/lost)
- advanced spam zastita (captcha)
- CRM sync (HubSpot/Pipedrive)

## 10) Deploy plan

- frontend: Vercel
- backend: DigitalOcean App Platform ili Railway
- baza: MongoDB Atlas ili managed Mongo

Koraci:
1. Deploy frontend
2. Deploy backend
3. Povezati frontend na backend URL kroz env
4. Smoke test:
   - hero render
   - ROI calculator radi ispravno
   - lead submit
   - email automation (admin + autoreply)
   - health endpoint

## 11) Go-to-market (operativno)

### LinkedIn outreach
- poruka:
  - `I help fintech teams reduce cloud costs by 30-60%. Want a free audit?`

### Communities
- Reddit:
  - `r/devops`
  - `r/startups`
- tehnicke zajednice i founder grupe

### Cold email
- target:
  - fintech startupi
  - SaaS firme sa rastucim cloud troskom
- CTA:
  - free FinOps audit call

## 12) Definition of Done (production-ready lead machine)

Sistem je spreman za realne klijente kada:
- landing ima sve definisane sekcije i CTA-e
- problem-first i trust layer su vidljivi iznad preklopa
- ROI kalkulator radi i vodi na lead CTA
- lead forma snima podatke u bazu
- multi-step forma i anti-spam zastita rade
- email automation radi posle submit-a
- backend ima health endpoint
- analytics i SEO osnovno podeseni
- deploy radi na javnom URL-u

## 13) Decommission plan (stara aplikacija)

Stara `fintech-app` aplikacija se brise tek kada je nova verifikovana:
1. Nova aplikacija deployovana i testirana
2. Lead capture radi end-to-end
3. DNS/primary link prebacen na novu aplikaciju
4. Tek tada:
   - arhivirati stari kod (po potrebi)
   - ukloniti stare deployment resurse

---

Fokus novog projekta: **linuxspec kao FinOps + Custom Fintech Engineering firma**.
Nije demo app, nije blog, vec realan lead-generation, trust-building i sales-funnel sistem.


NOTE: projekat ne smije imati sigile, emotikone i sl.
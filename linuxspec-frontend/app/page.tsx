import LeadForm from "./components/LeadForm";
import RoiCalculator from "./components/RoiCalculator";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/linuxspec/intro-call";

export default function Home() {
  return (
    <main className="min-h-screen bg-page text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">
          Reduce Cloud Costs. Build Secure Fintech Systems. Scale Smart.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
          We help fintech teams cut infrastructure waste, optimize cloud spending, and build
          reliable wallet and transaction systems on Linux.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#lead-form"
            className="rounded-xl bg-accent px-6 py-3 font-semibold transition hover:scale-105 hover:bg-blue-500"
          >
            Get Your Free Cost Analysis (24h)
          </a>
          <a
            href={calendlyUrl}
            target="_blank"
            className="rounded-xl border border-gray-600 px-6 py-3 transition hover:scale-105 hover:bg-gray-800"
          >
            Book a Call
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-300">Free audit. No commitment. Results in 24h.</p>
        <p className="mt-1 text-sm text-gray-400">Typical savings: 30-60%. Takes 30 seconds.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card">
          <p className="text-sm uppercase tracking-wider text-red-300">
            Most fintech teams are wasting money without knowing it.
          </p>
          <h2 className="text-3xl font-bold">Are you overpaying for cloud?</h2>
          <ul className="mt-4 grid gap-2 text-gray-300 md:grid-cols-2">
            <li>- Your AWS bill keeps growing every month</li>
            <li>- You do not know where your money goes</li>
            <li>- Your system scales but costs explode</li>
            <li>- You fear optimization because of downtime risk</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <RoiCalculator />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card">
          <h2 className="text-3xl font-bold">Cut Your Cloud Costs Without Breaking Your System</h2>
          <p className="mt-4 text-gray-400">
            We analyze your infrastructure, identify waste, and optimize cost without sacrificing
            reliability.
          </p>
          <ul className="mt-6 grid gap-2 text-gray-300 md:grid-cols-2">
            <li>- Identify unused and overprovisioned resources</li>
            <li>- Optimize autoscaling and infra usage</li>
            <li>- Reduce monthly cloud bills by up to 60%</li>
            <li>- Improve performance while lowering cost</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#111827] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">Build Reliable Fintech Systems That Actually Scale</h2>
          <p className="mt-4 text-gray-400">
            We build secure production-ready systems for startups and growth-stage teams.
          </p>
          <div className="mt-6 grid gap-3 text-gray-300 md:grid-cols-2">
            <div className="card">Wallet systems (ledger-based architecture)</div>
            <div className="card">Transaction engines with audit logs</div>
            <div className="card">Internal dashboards and admin tools</div>
            <div className="card">Secure APIs and backend systems</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Simple Process. Real Results.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="text-xl font-semibold">1. Audit</h3>
            <p className="mt-2 text-gray-400">Analyze infrastructure and identify inefficiencies.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">2. Optimization</h3>
            <p className="mt-2 text-gray-400">Implement cost-saving and scaling improvements.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">3. Build & Scale</h3>
            <p className="mt-2 text-gray-400">Build and harden fintech systems for growth.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#111827] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">Real Results</h2>
          <p className="mt-4 text-gray-300">Reduced cloud cost from EUR 1200 to EUR 500/month.</p>
          <p className="mt-2 text-gray-300">
            Built wallet system with full transaction logging and audit trail.
          </p>
          <p className="mt-2 text-green-400">Result: 58% cost reduction + stable system.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Simple, Transparent Pricing</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["FinOps Audit", "EUR 300 - EUR 800", "Infrastructure analysis + report"],
            ["FinOps Optimization", "EUR 800 - EUR 3000", "Implementation + cost reduction"],
            ["Fintech Development", "EUR 2000 - EUR 8000", "Wallet + transaction + dashboard"],
            ["Monthly Optimization", "EUR 200 - EUR 1000/mo", "Continuous monitoring and tuning"]
          ].map((item) => (
            <div key={item[0]} className="card">
              <h3 className="text-xl font-semibold">{item[0]}</h3>
              <p className="mt-2 text-blue-400">{item[1]}</p>
              <p className="mt-2 text-gray-400">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card">
          <h2 className="text-3xl font-bold">Why linuxspec?</h2>
          <ul className="mt-4 grid gap-2 text-gray-300 md:grid-cols-2">
            <li>- Linux-first infrastructure expertise</li>
            <li>- Cost efficiency focus, not wasteful scaling</li>
            <li>- Real fintech system engineering experience</li>
            <li>- Security and performance combined</li>
          </ul>
          <div className="mt-6 rounded-xl border border-gray-700 bg-[#0f172a] p-4 text-sm text-gray-300">
            Experience in Linux infrastructure, fintech systems, and cost optimization. Built and
            optimized production systems running on Linux.
          </div>
        </div>
      </section>

      <section id="lead-form" className="px-6 py-16">
        <LeadForm />
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-500">
        <p>contact@linuxspec.com | LinkedIn | GitHub</p>
        <p className="mt-2">© {new Date().getFullYear()} linuxspec</p>
      </footer>
    </main>
  );
}

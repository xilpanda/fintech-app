import LeadForm from "./components/LeadForm";
import RoiCalculator from "./components/RoiCalculator";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/linuxspec/intro-call";

export default function Home() {
  return (
    <main className="min-h-screen bg-page text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Stop Overpaying for Cloud Infrastructure.</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
          Most fintech teams waste 30-60% of their cloud budget without knowing it. We find it,
          fix it, and reduce your costs in days, not months.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-base text-gray-300">
          Linux-based infrastructure optimization plus fintech system engineering.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#lead-form"
            className="rounded-xl bg-accent px-6 py-3 font-semibold transition duration-200 hover:scale-105 hover:bg-blue-500"
          >
            Get Your Free Cost Analysis (24h)
          </a>
          <a
            href={calendlyUrl}
            target="_blank"
            className="rounded-xl border border-gray-600 px-6 py-3 transition duration-200 hover:scale-105 hover:bg-gray-800"
          >
            Book a Call
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-300">Free audit. No commitment. Results in 24h.</p>
        <p className="mt-1 text-sm text-gray-400">Typical savings: 30-60%. Takes 30 seconds.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card border border-red-400/30">
          <h2 className="text-2xl font-bold md:text-3xl">
            Fintech teams are overpaying for cloud by 30-60%.
          </h2>
          <p className="mt-4 text-lg text-gray-300">We find and eliminate that waste.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card">
          <p className="text-sm uppercase tracking-wider text-red-300">Most teams are losing money every month.</p>
          <h2 className="text-3xl font-bold">Are you overpaying for cloud?</h2>
          <ul className="mt-4 grid gap-2 text-gray-300 md:grid-cols-2">
            <li>- Your AWS bill keeps growing every month</li>
            <li>- You do not know what is causing the cost</li>
            <li>- Your system scales but costs explode</li>
            <li>- You avoid optimization because of downtime risk</li>
          </ul>
          <p className="mt-5 text-sm text-red-200">
            Every month you delay optimization, you lose money that could be reinvested into growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 card">
          <h2 className="text-3xl font-bold">How much money are you wasting?</h2>
          <p className="mt-3 text-gray-300">
            If you are spending EUR 1000/month, you are likely wasting EUR 300-EUR 600 every month.
            That is EUR 3600-EUR 7200 per year lost.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Most teams do not realize this until it is too late.
          </p>
        </div>
        <RoiCalculator />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="card">
          <h2 className="text-3xl font-bold">We reduce your cloud costs without breaking your system.</h2>
          <p className="mt-4 text-gray-400">
            We analyze your infrastructure, find waste, and optimize everything safely.
          </p>
          <ul className="mt-6 grid gap-2 text-gray-300 md:grid-cols-2">
            <li>- Identify unused and overprovisioned resources</li>
            <li>- Optimize autoscaling and infrastructure usage</li>
            <li>- Reduce monthly cloud bills by up to 60%</li>
            <li>- Improve performance at the same time</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#111827] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">We build fintech systems that do not break under pressure.</h2>
          <p className="mt-4 text-gray-400">
            Secure. Scalable. Audit-ready.
          </p>
          <div className="mt-6 grid gap-3 text-gray-300 md:grid-cols-2">
            <div className="card">Wallet systems (ledger-based architecture)</div>
            <div className="card">Transaction engines with full audit logs</div>
            <div className="card">Internal dashboards and admin tools</div>
            <div className="card">Secure APIs and backend systems</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Simple process. Fast results.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="text-xl font-semibold">1. Audit</h3>
            <p className="mt-2 text-gray-400">We analyze your system and identify cost leaks.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">2. Optimization</h3>
            <p className="mt-2 text-gray-400">We implement improvements safely.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold">3. Build & Scale</h3>
            <p className="mt-2 text-gray-400">
              We upgrade your fintech system for performance and reliability.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#111827] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">Real result</h2>
          <p className="mt-4 text-gray-300">Cloud cost reduced from EUR 1200 to EUR 500/month.</p>
          <p className="mt-2 text-gray-300">
            Built wallet system with full transaction logging and audit trail.
          </p>
          <p className="mt-2 text-green-400">58% cost reduction + stable system.</p>
          <p className="mt-2 text-sm text-gray-400">No downtime. Improved performance.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-center text-sm uppercase tracking-wide text-gray-400">
          Clear pricing. No surprises.
        </p>
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
            Trusted by engineers working with Linux infrastructure, fintech systems, and cloud
            environments. Built and optimized production systems running on Linux.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8 text-center">
        <div className="card border border-red-400/30">
          <h2 className="text-3xl font-bold">Every month you delay equals money lost.</h2>
          <p className="mt-3 text-gray-300">Get your free cost analysis today.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#lead-form"
              className="rounded-xl bg-accent px-6 py-3 font-semibold transition duration-200 hover:scale-105 hover:bg-blue-500"
            >
              Get Your Free Cost Analysis
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              className="rounded-xl border border-gray-600 px-6 py-3 transition duration-200 hover:scale-105 hover:bg-gray-800"
            >
              Book a Call
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">Takes 30 seconds. Results in 24h.</p>
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

import LeadForm from "./components/LeadForm";
import AnimatedMetrics from "./components/AnimatedMetrics";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/linuxspec/intro-call";

export default function Home() {
  const serviceCards = [
    {
      title: "FinOps Intelligence",
      benefit: "Stop wasting money on cloud infrastructure.",
      points: [
        "Cost allocation per service and team",
        "Waste detection for idle and overprovisioned resources",
        "Rightsizing and autoscaling optimization strategies",
        "Real-time spend dashboards, budgets, and forecasting"
      ],
      result: "Typical savings: 30-40%"
    },
    {
      title: "Platform Engineering for High-Scale Systems",
      benefit: "Build internal platforms for faster, safer delivery.",
      points: [
        "Production Kubernetes clusters and release automation",
        "CI/CD pipelines with GitOps-ready workflows",
        "Infrastructure as Code foundations and self-service environments",
        "Zero-downtime deployment and failover patterns"
      ],
      result: "Deploy faster with fewer incidents"
    },
    {
      title: "FinTech Security and Compliance",
      benefit: "Security is designed in from day one.",
      points: [
        "OWASP Top 10 and API security controls",
        "Secrets management with Kubernetes and vault-ready patterns",
        "IAM and least privilege access design",
        "Secure CI/CD and infrastructure hardening"
      ],
      result: "Reduce attack surface before production"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Assess",
      text: "Review costs, system risks, and scalability bottlenecks."
    },
    {
      step: "02",
      title: "Design",
      text: "Create a secure and cost-efficient platform architecture."
    },
    {
      step: "03",
      title: "Build",
      text: "Implement infrastructure, pipelines, and fintech workloads."
    },
    {
      step: "04",
      title: "Optimize",
      text: "Continuously improve performance, reliability, and spend."
    }
  ];

  const caseStudies = [
    {
      title: "Cloud Cost Optimization",
      badge: "+37% cost reduction",
      result: "37% monthly cost reduction",
      details:
        "Implemented rightsizing, autoscaling policy tuning, and cost visibility dashboards for finance and engineering teams."
    },
    {
      title: "Transaction Platform Delivery",
      badge: "0 downtime releases",
      result: "10k+ requests per second capacity",
      details:
        "Built a resilient Kubernetes-based backend with controlled CI/CD releases and zero-downtime rollout patterns."
    },
    {
      title: "FinTech Security Hardening",
      badge: "Critical issues eliminated",
      result: "Critical exposure reduced to zero",
      details:
        "Introduced API hardening, secret management controls, and runtime monitoring across production workloads."
    }
  ];

  const architectureLayers = [
    {
      id: "01",
      title: "CI/CD and Security Gates",
      text: "Build, scan, sign, and release with guardrails."
    },
    {
      id: "02",
      title: "HA Kubernetes Runtime",
      text: "Resilient workloads and controlled rollout behavior."
    },
    {
      id: "03",
      title: "Observability Layer",
      text: "Metrics, alerts, and incident workflows in one stack."
    },
    {
      id: "04",
      title: "FinOps Intelligence",
      text: "Spend ownership, forecasting, and optimization loops."
    },
    {
      id: "05",
      title: "Secure Access Model",
      text: "Least privilege IAM, secrets, and policy controls."
    }
  ];

  const observabilityItems = [
    "Prometheus metrics",
    "Grafana dashboards",
    "Alerting and incident response",
    "SLA and SLO tracking",
    "Logs roadmap (Loki or ELK)"
  ];

  const targetProfiles = [
    "FinTech startups scaling fast",
    "SaaS platforms with high cloud costs",
    "Teams blocked by DevOps and delivery complexity",
    "Companies requiring secure and compliant infrastructure"
  ];

  const engagementModels = [
    {
      title: "FinOps Audit",
      text: "One-time cost, performance, and risk baseline."
    },
    {
      title: "Infrastructure Setup",
      text: "Project-based delivery for production platform buildout."
    },
    {
      title: "Ongoing Operations",
      text: "Monthly optimization, monitoring, and incident support."
    }
  ];

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-[#1a1f36]">
      <header className="sticky top-0 z-20 border-b border-[#dfe7f4]/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <a href="#" className="text-lg font-bold text-[#0a2540]">
            linuxspec
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#3d4f7c] md:flex">
            <a href="#services" className="hover:text-[#635bff]">
              Services
            </a>
            <a href="#architecture" className="hover:text-[#635bff]">
              Architecture
            </a>
            <a href="#observability" className="hover:text-[#635bff]">
              Observability
            </a>
            <a href="#engagement" className="hover:text-[#635bff]">
              Engagement
            </a>
          </nav>
          <a
            href="#lead-form"
            className="rounded-xl bg-[#635bff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
          >
            Request Free Audit
          </a>
        </div>
        <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-6 pb-3 md:hidden">
          {[
            ["Services", "#services"],
            ["Architecture", "#architecture"],
            ["Observability", "#observability"],
            ["Engagement", "#engagement"]
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="whitespace-nowrap rounded-full border border-[#d6e1f2] bg-white px-3 py-1.5 text-xs font-semibold text-[#455782]"
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#dfe7f4]">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#635bff]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#0a2540]/10 blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 md:py-20 lg:px-16">
          <div>
            <p className="inline-flex rounded-full border border-[#d3ddf0] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#334e7f]">
              FinOps. Platform Engineering. Security.
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0a2540] md:text-6xl">
              FinTech Infrastructure That Scales - Without Wasting Money.
            </h1>
            <p className="mt-5 max-w-xl text-base text-[#42507a] md:text-lg">
              Reduce cloud costs, improve system performance, and secure your platform with
              production-grade FinOps, Platform Engineering, and Security practices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead-form"
                className="rounded-xl bg-[#635bff] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f46e5]"
              >
                Request Free Audit
              </a>
              <a
                href={calendlyUrl}
                target="_blank"
                className="rounded-xl border border-[#c6d3ea] bg-white px-6 py-3 font-semibold text-[#0a2540] transition hover:-translate-y-0.5 hover:border-[#a9bbdd]"
              >
                Book a Call
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-[#4f5f8d]">
              {[
                "Cut cloud spend by up to 40%",
                "99.99% availability target",
                "Scale to 10k+ requests/sec"
              ].map((item) => (
                <span key={item} className="rounded-full border border-[#d4deef] bg-white px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium text-[#5e6f9a]">
              No commitment. Actionable results within 24h.
            </p>
          </div>
          <div className="relative rounded-3xl border border-[#d7e1f1] bg-[#0a2540] p-5 text-white shadow-xl md:p-6">
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold text-[#c5d5ef]">
              {[
                ["\u2601", "Cloud cost control"],
                ["\u25b2", "Performance tracking"],
                ["\u26e8", "Secure delivery"]
              ].map(([icon, label]) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1"
                >
                  <span aria-hidden>{icon}</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a7bcdf]">Problem to solution</p>
            <h2 className="mt-3 text-xl font-bold md:text-2xl">Most teams struggle with the same issues</h2>
            <ul className="mt-5 space-y-2 text-sm text-[#d9e4f6]">
              <li>- Cloud costs increase without clear ownership or optimization.</li>
              <li>- Deployments are slow, risky, and difficult to standardize.</li>
              <li>- Security controls are added too late in the delivery cycle.</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b5c8e7]">Solution</p>
              <p className="mt-2 text-sm text-white">
                We combine FinOps, Platform Engineering, and Security into one production operating
                model focused on cost, velocity, and resilience.
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Lower cost", "FinOps-led optimization"],
                ["Faster delivery", "Platform standardization"],
                ["Secure systems", "Built-in controls"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="text-xs text-[#9bb0d0]">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
              <div className="flex items-center justify-between text-xs text-[#b5c8e7]">
                <p className="font-semibold uppercase tracking-wide">Performance trend</p>
                <p>Last 30 days</p>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                {[42, 48, 51, 57, 61, 66, 72].map((height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className="w-full rounded-t bg-gradient-to-t from-[#635bff] to-[#8f89ff]"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#9bb0d0]">
                <span>Stability +12%</span>
                <span>Latency -18%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Services</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            Core services for cost, delivery, and security outcomes.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-[#dbe4f3] bg-white p-6 shadow-[0_16px_36px_rgba(10,37,64,0.10)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(10,37,64,0.14)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#5f6f9a]">{service.benefit}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#0a2540]">{service.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#4b5984]">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#635bff]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 inline-flex rounded-full border border-[#cdd9ee] bg-[#f5f8ff] px-3 py-1 text-xs font-semibold text-[#2e4f80]">
                {service.result}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AnimatedMetrics />

      <section id="architecture" className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-[#0f1f3d] p-8 text-white shadow-[0_16px_40px_rgba(10,37,64,0.28)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#9bb0d0]">
                Reference architecture
              </p>
              <h2 className="mt-2 text-3xl font-bold">Production-ready architecture for fintech workloads</h2>
              <p className="mt-3 max-w-2xl text-sm text-[#c0cee6]">
                Designed for secure delivery, high availability operations, and continuous cost
                control from commit to production.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {architectureLayers.map((item, index) => (
              <div key={item.id} className="relative rounded-2xl border border-white/10 bg-[#132a4f] p-4">
                <p className="text-xs uppercase tracking-wide text-[#9bb0d0]">{item.id}</p>
                <p className="mt-2 text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-xs text-[#c0cee6]">{item.text}</p>
                {index < architectureLayers.length - 1 ? (
                  <span className="mt-3 hidden text-xs text-[#8fa7cd] md:inline-block">-&gt;</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="observability" className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-white p-8 shadow-[0_14px_32px_rgba(10,37,64,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Observability</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            You cannot optimize what you cannot see.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-[#5a6c97]">
            Real-time infrastructure visibility across performance, reliability, and incident response.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {observabilityItems.map((item) => (
              <div key={item} className="rounded-xl border border-[#d6e2f3] bg-[#f8fbff] p-4 text-sm text-[#475786]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-4 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-white p-8 shadow-[0_14px_32px_rgba(10,37,64,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Who we work with</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">Built for teams under delivery pressure</h2>
          <div className="mt-6 grid gap-3 text-sm text-[#4b5984] md:grid-cols-2">
            {targetProfiles.map((item) => (
              <p key={item} className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Case Studies</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            Proven outcomes with measurable business impact.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#dbe4f3] bg-white p-6 shadow-[0_10px_26px_rgba(10,37,64,0.07)]"
            >
              <p className="inline-flex rounded-full border border-[#d3def0] bg-[#f5f8ff] px-3 py-1 text-xs font-semibold text-[#2e4f80]">
                {item.badge}
              </p>
              <h3 className="text-xl font-semibold text-[#0a2540]">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-[#1f6f5d]">{item.result}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#4e5e8b]">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-white p-8 shadow-[0_14px_32px_rgba(10,37,64,0.08)]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">How we work</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
              Structured delivery from assessment to optimization.
            </h2>
          </div>
          <div className="mt-10">
            <div className="grid gap-4 md:grid-cols-4">
              {processSteps.map((item, index) => (
                <div
                  key={item.step}
                  className="timeline-card rounded-2xl border border-[#e0e8f4] bg-[#f8fbff] p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#cfdcf3] hover:shadow-[0_14px_30px_rgba(10,37,64,0.10)]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#635bff] text-sm font-bold text-white">
                      {item.step}
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#6f7fa7]">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-sm text-[#53638f]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="engagement" className="mx-auto w-full max-w-7xl px-6 py-4 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-white p-8 shadow-[0_14px_32px_rgba(10,37,64,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Engagement Models</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            Flexible delivery aligned to your stage and scope.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {engagementModels.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dbe4f3] bg-[#f8fbff] p-5">
                <h3 className="text-lg font-semibold text-[#0a2540]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#53638f]">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#5f6f99]">Custom pricing based on scope and system complexity.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a2540] to-[#635bff] p-10 text-center text-white shadow-[0_20px_40px_rgba(10,37,64,0.25)]">
          <h2 className="text-3xl font-bold md:text-4xl">
            Stop Overpaying for Cloud Infrastructure.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#d8e0f2]">
            Start scaling your fintech platform today with measurable cost and reliability outcomes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#lead-form"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[#0a2540] transition hover:-translate-y-0.5"
            >
              Request Free Audit
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-white p-8 shadow-[0_14px_36px_rgba(10,37,64,0.10)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Free Audit</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            Get your free FinOps and Security Audit (24h)
          </h2>
          <div className="mt-6 grid gap-3 text-sm text-[#4b5984] md:grid-cols-3">
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Cloud cost breakdown
            </p>
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Security gap analysis
            </p>
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Performance bottleneck insights
            </p>
          </div>
          <p className="mt-4 text-sm text-[#5f6f99]">No commitment. Actionable results.</p>
        </div>
      </section>

      <section id="lead-form" className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <LeadForm />
      </section>

      <footer className="border-t border-[#dbe4f3] bg-white px-6 py-10 text-center text-[#5a6b95]">
        <p className="font-semibold text-[#0a2540]">linuxspec</p>
        <p className="mt-2 text-sm">FinOps • Platform Engineering • Security for FinTech systems</p>
        <p className="mt-2 text-sm">linuxsecops@proton.me</p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} linuxspec</p>
      </footer>
    </main>
  );
}

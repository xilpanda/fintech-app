import LeadForm from "./components/LeadForm";
import AnimatedMetrics from "./components/AnimatedMetrics";
import Image from "next/image";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/linuxspec/intro-call";

export default function Home() {
  const serviceCards = [
    {
      title: "Cut Cloud Costs Without Breaking Performance",
      benefit: "FinOps and Cost Optimization",
      points: [
        "Identify infrastructure waste and overspending patterns",
        "Optimize scaling and resource allocation safely",
        "Gain real-time cost visibility for finance and engineering"
      ],
      result: "Typical savings: 30-40%"
    },
    {
      title: "Ship FinTech Systems Built for Throughput and Accuracy",
      benefit: "FinTech Systems Engineering",
      points: [
        "Digital wallet and ledger-oriented architecture",
        "Payment gateway and transaction pipeline integration",
        "Low-latency and high-throughput API-first systems"
      ],
      result: "Validated for 10k+ req/sec patterns"
    },
    {
      title: "Deploy Production Infrastructure with Zero-Downtime Releases",
      benefit: "Infrastructure and Platform Delivery",
      points: [
        "Production Kubernetes and container platform setup",
        "CI/CD automation with controlled release workflows",
        "High availability, failover, and reliability engineering"
      ],
      result: "99.99% uptime target architecture"
    },
    {
      title: "Harden APIs and Platform Layers from Day One",
      benefit: "Security and Compliance Readiness",
      points: [
        "API and infrastructure hardening practices",
        "Secret lifecycle and access control patterns",
        "Security-first delivery for fintech workloads"
      ],
      result: "Reduced attack surface and compliance readiness"
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

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-[#1a1f36]">
      <section className="relative overflow-hidden border-b border-[#dfe7f4]">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#635bff]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#0a2540]/10 blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:px-10 lg:px-16">
          <div>
            <p className="inline-flex rounded-full border border-[#d3ddf0] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#334e7f]">
              FinTech Infrastructure and FinOps
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0a2540] md:text-6xl">
              Reduce Cloud Costs. Scale FinTech Infrastructure. Eliminate Downtime.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[#42507a]">
              We design and operate high-performance fintech systems with production-grade DevOps and
              measurable cost optimization.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lead-form"
                className="rounded-xl bg-[#635bff] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f46e5]"
              >
                Request Free Assessment
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
                "Trusted architecture patterns",
                "Production-ready Kubernetes",
                "FinOps-driven optimization"
              ].map((item) => (
                <span key={item} className="rounded-full border border-[#d4deef] bg-white px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl border border-[#d7e1f1] bg-[#0a2540] p-5 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-[#635bff]/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-6 -bottom-6 h-40 w-40 rounded-full bg-[#00d4a7]/20 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/fintech-dashboard.png"
                alt="Fintech platform dashboard interface"
                width={1280}
                height={720}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-xl border border-white/15 bg-[#10264a]/95 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-[#9bb0d0]">Live operations</p>
              <p className="mt-1 text-sm font-semibold">Latency, spend, and health in one view</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["40%", "Cloud Cost Reduction"],
                ["99.99%", "SLA Availability"],
                ["10k+ req/sec", "Transaction Capacity"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="text-xs text-[#9bb0d0]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4e5b89]">Services</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0a2540] md:text-4xl">
            Enterprise execution across FinOps, FinTech, Ops, and Security.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
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

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-[#dbe4f3] bg-[#0f1f3d] p-8 text-white shadow-[0_16px_40px_rgba(10,37,64,0.28)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#9bb0d0]">
                Platform visibility
              </p>
              <h2 className="mt-2 text-3xl font-bold">Operations dashboard preview</h2>
              <p className="mt-3 max-w-2xl text-sm text-[#c0cee6]">
                Real-time visibility into your infrastructure. Monitor latency, throughput, cost,
                and system health in one place.
              </p>
            </div>
            <p className="text-sm text-[#b7c7e3]">
              Prometheus, Grafana, alerts, latency, throughput, and spend tracking
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#132a4f]">
              <Image
                src="/images/prometheus-metrics.png"
                alt="Prometheus metrics dashboard"
                width={1024}
                height={597}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#132a4f]">
              <Image
                src="/images/grafana-home.png"
                alt="Grafana monitoring dashboard home"
                width={1024}
                height={577}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#132a4f] md:col-span-2">
              <Image
                src="/images/k8s-observability.png"
                alt="Kubernetes observability dashboard"
                width={1365}
                height={768}
                className="h-auto w-full"
              />
            </div>
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
              Request Free Assessment
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
            Get your free FinOps and Infrastructure Audit (24h)
          </h2>
          <div className="mt-6 grid gap-3 text-sm text-[#4b5984] md:grid-cols-3">
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Identify wasted cloud spend
            </p>
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Detect performance bottlenecks
            </p>
            <p className="rounded-xl border border-[#d7e2f2] bg-[#f8fbff] p-3">
              Get an actionable optimization plan
            </p>
          </div>
          <p className="mt-4 text-sm text-[#5f6f99]">No commitment. Real results.</p>
        </div>
      </section>

      <section id="lead-form" className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <LeadForm />
      </section>

      <footer className="border-t border-[#dbe4f3] bg-white px-6 py-10 text-center text-[#5a6b95]">
        <p className="font-semibold text-[#0a2540]">linuxspec</p>
        <p className="mt-2 text-sm">FinTech Infrastructure and FinOps Engineering</p>
        <p className="mt-2 text-sm">linuxsecops@proton.me</p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} linuxspec</p>
      </footer>
    </main>
  );
}

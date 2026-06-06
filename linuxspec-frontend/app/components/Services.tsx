import ServiceIcon from "./ServiceIcon";

const services = [
  {
    title: "Vulnerability Analysis",
    description:
      "Website, IoT, and IT network testing across many different areas. Automated and manual assessment to uncover weaknesses before attackers do.",
    icon: "search" as const
  },
  {
    title: "Penetration Testing",
    description:
      "Complete IT security mapping from an ethical hacker's perspective - from Internet footprint detection to exploiting detected vulnerabilities.",
    icon: "shield" as const
  },
  {
    title: "Security Trainings",
    description:
      "IT security and awareness training for programmers, administrators, and key colleagues. Practical exercises with expert instructors.",
    icon: "training" as const
  },
  {
    title: "Compliance & NIS2",
    description:
      "Full security assessment aligned with NIS2 directive requirements - in-depth monitoring, automated testing, and Red Team exercises.",
    icon: "compliance" as const
  },
  {
    title: "AI System Penetration Testing",
    description:
      "Security testing for machine learning models, LLM-based chatbots, and autonomous agents across complex, multi-layered architectures.",
    icon: "ai" as const
  },
  {
    title: "Source Code Analysis",
    description:
      "Static Application Security Testing (SAST) as a foundational pillar of secure software development. Find flaws before deployment.",
    icon: "code" as const
  },
  {
    title: "TLPT & Red Teaming",
    description:
      "Threat Led Penetration Testing and Red Teaming simulate targeted attacks on live systems based on real-world threat scenarios.",
    icon: "target" as const
  },
  {
    title: "AS/400 (IBM i) Testing",
    description:
      "Specialized penetration testing for IBM i systems widely used in banking, healthcare, and government critical business operations.",
    icon: "server" as const
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-section-gradient py-20 md:py-28">
      <div className="section-container">
        <div className="text-center">
          <p className="section-subtitle">Services</p>
          <h2 className="section-title mt-3">
            Comprehensive IT Security Solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            From vulnerability analysis to advanced Red Team exercises - we protect your
            organization with industry-leading penetration testing expertise.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border/80 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col bg-card p-7 transition duration-300 hover:bg-panel"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-page text-accent transition group-hover:border-accent/30">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-heading">{service.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

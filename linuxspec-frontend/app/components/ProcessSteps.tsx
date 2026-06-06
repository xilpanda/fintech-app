const steps = [
  {
    step: "01",
    title: "Scoping",
    text: "Define targets, rules of engagement, and compliance requirements with your team."
  },
  {
    step: "02",
    title: "Testing",
    text: "Execute manual and automated penetration tests across all agreed attack surfaces."
  },
  {
    step: "03",
    title: "Reporting",
    text: "Deliver executive and technical reports with clear remediation guidance."
  },
  {
    step: "04",
    title: "Retest",
    text: "Verify fixes and confirm vulnerabilities are properly eliminated."
  }
];

export default function ProcessSteps() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="section-container">
        <div className="text-center">
          <p className="section-subtitle">Methodology</p>
          <h2 className="section-title mt-3">How We Work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Structured delivery from scoping to retest - aligned with PTES, OWASP, and
            industry best practices.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="timeline-card card-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-heading">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

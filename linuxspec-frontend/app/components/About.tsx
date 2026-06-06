const certifications = ["OSCP", "OSWP", "CEH", "ISO 27001"];

const highlights = [
  { value: "15+", label: "Years combined experience" },
  { value: "500+", label: "Assessments delivered" },
  { value: "24h", label: "Urgent response time" },
  { value: "100%", label: "Confidential reporting" }
];

const sectors = [
  "Finance & Banking",
  "Insurance",
  "Technology",
  "Pharmaceutical",
  "Automotive",
  "Telecommunications"
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="card-surface p-8">
            <p className="section-subtitle">About us</p>
            <h2 className="section-title mt-3">
              Your Trusted Partner for Penetration Testing
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                We are information technology professionals with a strong background in
                cyber security assessments, complemented by security consulting and
                professional training services.
              </p>
              <p>
                linuxspec was created to support companies in identifying and addressing IT
                security challenges, revealing potential vulnerabilities before they can be
                exploited. Our pentesting service focuses on realistic attack simulations
                and practical, actionable results.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-sm border border-border bg-page px-4 py-3">
                  <p className="text-2xl font-bold text-accent">{item.value}</p>
                  <p className="mt-1 text-xs text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-heading">
                Team Qualifications
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-sm border border-border bg-panel px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-heading"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                Certified ethical hackers with internationally recognized credentials
                and hands-on experience across enterprise environments.
              </p>
            </div>

            <div className="card-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-heading">
                Industry Experience
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {sectors.map((sector) => (
                  <li
                    key={sector}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

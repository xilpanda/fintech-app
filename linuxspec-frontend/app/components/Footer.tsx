export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-container py-14">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-lg font-bold tracking-tight text-heading">
              linux<span className="text-accent">spec</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              IT Security and Consulting Ltd.
            </p>
            <a
              href="mailto:linuxsecops@proton.me"
              className="mt-4 inline-block text-sm text-muted transition hover:text-heading"
            >
              linuxsecops@proton.me
            </a>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-heading">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li><a href="#services" className="transition hover:text-heading">Penetration Testing</a></li>
              <li><a href="#services" className="transition hover:text-heading">Vulnerability Analysis</a></li>
              <li><a href="#services" className="transition hover:text-heading">Compliance &amp; NIS2</a></li>
              <li><a href="#services" className="transition hover:text-heading">Security Training</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-heading">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li><a href="#about" className="transition hover:text-heading">About us</a></li>
              <li><a href="#references" className="transition hover:text-heading">References</a></li>
              <li><a href="#blog" className="transition hover:text-heading">Blog</a></li>
              <li><a href="#contact" className="transition hover:text-heading">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-heading">
              Certifications
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["OSCP", "OSWP", "CEH", "ISO 27001"].map((cert) => (
                <span
                  key={cert}
                  className="rounded-sm border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} linuxspec IT Security and Consulting. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition hover:text-heading">Privacy Policy</a>
            <a href="#" className="transition hover:text-heading">Data Handling</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

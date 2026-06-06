const items = [
  "OSCP Certified",
  "ISO 27001 Aligned",
  "NIS2 Compliance",
  "OWASP Methodology",
  "24h Response SLA"
];

export default function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-surface">
      <div className="section-container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4 md:justify-between">
        {items.map((label) => (
          <span
            key={label}
            className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

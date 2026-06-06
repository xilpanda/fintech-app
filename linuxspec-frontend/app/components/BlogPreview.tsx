const articles = [
  {
    title: "Website Security Testing: How to Find Out If Your Website Can Be Hacked",
    excerpt:
      "Most businesses believe their website is secure. They have SSL, passwords, and some protection. But the reality is: most websites are hackable - it's only a matter of time.",
    tag: "Web Security"
  },
  {
    title: "How to Start Practicing Ethical Hacking – A Practical Beginner's Guide",
    excerpt:
      "Ethical hacking is becoming an increasingly popular career path. More and more people want to become pentesters, security professionals, or bug bounty hunters.",
    tag: "Career"
  },
  {
    title: "Inside a NeoBank: Real Penetration Testing in Modern Fintech Platforms",
    excerpt:
      "We take you inside a real-world NeoBank security program to show what penetration testing actually looks like at scale and why continuous testing is the new standard.",
    tag: "FinTech"
  }
];

export default function BlogPreview() {
  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="section-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-subtitle">Blog</p>
            <h2 className="section-title mt-3">Security Insights & Resources</h2>
          </div>
          <a href="#" className="btn-secondary text-sm">
            View All Articles
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group card-surface flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30"
            >
              <span className="inline-flex w-fit rounded-full border border-border bg-panel px-3 py-1 text-xs font-semibold text-teal">
                {article.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-heading transition group-hover:text-accent">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {article.excerpt}
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:gap-2"
              >
                Read more
                <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

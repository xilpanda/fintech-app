"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    company: "KPMG",
    role: "Security Manager",
    quote:
      "We are working with linuxspec almost constantly on various projects. We have already tested mobile applications, websites and even thick client applications. Our continuous work makes cooperation much easier."
  },
  {
    company: "BARE International",
    role: "Business Manager",
    quote:
      "Our business is heavily focused on data of both our clients and independent contractors. We're happy to work with linuxspec, who support us with their knowledge to ensure we have the highest safety measures in place."
  },
  {
    company: "BioTech USA",
    role: "IT Leader",
    quote:
      "If you want fast and accurate results from a professional team, work with linuxspec. They not only point out shortcomings, but also suggest solutions. They are flexible, fair and reliable."
  },
  {
    company: "Coinmixed",
    role: "CEO",
    quote:
      "There will be a large amount of cryptocurrency movements on our site, which is why we decided to test our site even at the start. linuxspec provided us with a detailed report and we fixed everything right away."
  },
  {
    company: "MELÓ-DIÁK",
    role: "Executive",
    quote:
      "The cooperation with linuxspec has been great. The contact was super-fast, and they were flexible to all of our needs and gave us exactly what we had agreed on - or maybe even a little bit more."
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];

  return (
    <section id="references" className="bg-surface py-20 md:py-28">
      <div className="section-container">
        <div className="text-center">
          <p className="section-subtitle">References</p>
          <h2 className="section-title mt-3">Trusted by Industry Leaders</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            As a pentesting company, we always approach our clients discreetly. We are
            proud of their feedback across finance, insurance, technology, and
            pharmaceutical sectors.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="card-surface relative p-8 md:p-12">
            <svg
              className="absolute left-8 top-8 h-8 w-8 text-accent/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <blockquote className="relative pt-8 text-center">
              <p className="text-lg leading-relaxed text-heading md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <p className="font-semibold text-heading">{current.company}</p>
                <p className="mt-1 text-sm text-muted">{current.role}</p>
              </footer>
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-1">
              {testimonials.map((t, i) => (
                <button
                  key={t.company}
                  type="button"
                  aria-label={`Show testimonial from ${t.company}`}
                  onClick={() => setActive(i)}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "h-2.5 w-10 bg-accent"
                        : "h-2.5 w-2.5 bg-border hover:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60">
          {["KPMG", "BARE International", "BioTech USA", "UBS", "Coinmixed"].map(
            (name) => (
              <span key={name} className="text-sm font-semibold uppercase tracking-wider text-muted">
                {name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

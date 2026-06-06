"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MatrixRain from "./MatrixRain";

const slides = [
  {
    headline: "Test your website before hackers do it!",
    description:
      "We discover vulnerabilities that could be exploited by a hacker, threat actor, or disgruntled employee. Gain deeper insight into the security state of your IT systems.",
    highlight: "website"
  },
  {
    headline: "Test your technology before hackers do it!",
    description:
      "Every business needs regular quality penetration testing and IT security awareness. Audits required by regulations are qualitatively and independently necessary.",
    highlight: "technology"
  },
  {
    headline: "Test your network before hackers do it!",
    description:
      "From Internet footprint detection to exploiting vulnerabilities - we provide complete IT security mapping from an ethical hacker's perspective.",
    highlight: "network"
  }
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const slideNum = String(active + 1).padStart(2, "0");

  const goTo = (index: number) => {
    if (index === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTransitioning(false);
    }, 400);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Hacker background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-hacker.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Matrix rain - right panel */}
      <div className="absolute bottom-0 right-0 top-0 hidden w-28 border-l border-red-900/20 md:block lg:w-36">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
      </div>

      {/* Subtle matrix overlay across hero */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <MatrixRain />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center pb-24 pt-[7.5rem] transition-[padding] duration-500 md:pr-36">
        <div className="section-container">
          <div
            className={`max-w-2xl transition-all duration-500 ${
              transitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <p className="section-eyebrow text-white/50">Penetration Testing &amp; IT Security</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {slide.headline.split(slide.highlight).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-accent">{slide.highlight}</span>
                  )}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-sm bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Request Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-sm border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicator - right side */}
      <div className="absolute bottom-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex lg:right-10">
        <button
          type="button"
          onClick={() => goTo((active - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-sm text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className="font-mono text-3xl font-light tracking-wider text-white">
          {slideNum}
        </span>
        <div className="h-8 w-px bg-white/20" />
        <button
          type="button"
          onClick={() => goTo((active + 1) % slides.length)}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-sm text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                i === active ? "h-2.5 w-10 bg-accent" : "h-2.5 w-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll down"
        className="absolute bottom-8 left-6 z-20 text-white/50 transition hover:text-white md:left-10"
      >
        <svg className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </a>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About us" },
  { href: "#references", label: "References" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" }
];

const certifications = ["OSCP", "CEH", "ISO 27001"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-in-out ${
        scrolled
          ? "border-border/80 bg-page/95 shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border-white/10 bg-black/90 backdrop-blur-sm"
      }`}
    >
      {/* Utility bar - samo se sakrije, ostalo ostaje isto */}
      <div
        className={`overflow-hidden border-b transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-h-0 border-transparent opacity-0"
            : "max-h-10 border-white/5 opacity-100"
        }`}
      >
        <div className="section-container flex h-10 items-center justify-between text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
          <div className="hidden items-center md:flex">
            {certifications.map((cert, i) => (
              <span key={cert} className="flex items-center whitespace-nowrap">
                {i > 0 && <span className="mx-4 text-white/20">|</span>}
                {cert}
              </span>
            ))}
          </div>
          <a
            href="mailto:linuxsecops@proton.me"
            className="hidden whitespace-nowrap transition hover:text-white/80 md:block"
          >
            linuxsecops@proton.me
          </a>
          <span className="md:hidden">IT Security &amp; Consulting</span>
        </div>
      </div>

      {/* Jedan meni - ista struktura pri skrolu i bez */}
      <div
        className={`section-container flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            LS
          </span>
          <span className="text-lg font-bold tracking-tight text-heading">
            linux<span className="text-accent">spec</span>
          </span>
        </Link>

        <nav className="hidden items-center md:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 lg:px-5 ${
                scrolled
                  ? "text-muted hover:text-heading"
                  : "text-white/75 hover:text-white"
              } ${i < navLinks.length - 1 ? "border-r border-white/10" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`ml-5 whitespace-nowrap rounded-sm border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-500 ${
              scrolled
                ? "border-accent/60 bg-accent text-white hover:bg-accent-hover"
                : "border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5"
            }`}
          >
            Request Consultation
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className={`flex h-10 w-10 items-center justify-center rounded-sm border md:hidden ${
            scrolled ? "border-border text-heading" : "border-white/30 text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-page px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-border/50 py-3 text-sm font-medium uppercase tracking-wider text-muted transition hover:text-heading"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-4 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Request Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

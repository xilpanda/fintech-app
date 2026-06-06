"use client";

import { FormEvent, useState } from "react";

type Step = 1 | 2;

const serviceOptions = [
  "Penetration Testing",
  "Vulnerability Analysis",
  "Compliance & NIS2",
  "Security Training",
  "AI System Testing",
  "Red Team / TLPT",
  "Other"
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export default function LeadForm() {
  const [step, setStep] = useState<Step>(1);
  const [serviceType, setServiceType] = useState("Penetration Testing");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("Please accept the privacy consent to continue.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          message: `[${serviceType}] ${phone ? `Phone: ${phone}. ` : ""}${message}`,
          monthlyCost: 0,
          honeypot
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Submit failed");
      }
      setStatus("Thank you! We will contact you shortly.");
      setStep(1);
      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setMessage("");
      setConsent(false);
      setServiceType("Penetration Testing");
      setHoneypot("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl rounded-sm border border-border/80 bg-card p-8 md:p-10">
      <h3 className="text-2xl font-semibold text-heading">Contact Us</h3>
      <p className="mt-2 text-sm text-muted">
        Step {step}/2 - tell us what you need and we will get back to you promptly.
      </p>

      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted">
              What service are you interested in?
            </label>
            <select
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="btn-primary w-full"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <input
            required
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
          />
          <input
            required
            type="tel"
            placeholder="Phone *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
          />
          <input
            required
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-28 w-full rounded-lg border border-border bg-panel px-4 py-3 text-heading outline-none transition focus:border-accent"
          />
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
          />

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-accent"
            />
            <span>
              I consent to linuxspec handling my personal data to respond to my inquiry.
              I have read and understood the Privacy Statement and give my consent voluntarily.
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary flex-1"
            >
              Back
            </button>
            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}

      {status ? (
        <p className={`mt-4 text-sm ${status.includes("Thank") ? "text-teal" : "text-accent"}`}>
          {status}
        </p>
      ) : null}
    </form>
  );
}

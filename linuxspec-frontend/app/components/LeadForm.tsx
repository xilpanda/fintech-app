"use client";

import { FormEvent, useState } from "react";

type Step = 1 | 2;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export default function LeadForm() {
  const [step, setStep] = useState<Step>(1);
  const [monthlyCost, setMonthlyCost] = useState("1000");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // hidden anti-spam field
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          message,
          monthlyCost: Number(monthlyCost),
          honeypot
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Submit failed");
      }
      setStatus("Saved. We will contact you shortly.");
      setStep(1);
      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
      setMonthlyCost("1000");
      setHoneypot("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-[#dbe4f3] bg-white p-6 shadow-[0_12px_30px_rgba(10,37,64,0.08)]"
    >
      <h3 className="text-2xl font-semibold text-[#0a2540]">
        Get Your Free FinOps and Infrastructure Audit (24h)
      </h3>
      <p className="mt-2 text-[#5b6c96]">
        Step {step}/2 - takes 30 seconds. No commitment.
      </p>

      {step === 1 ? (
        <div className="mt-6 space-y-3">
          <label className="block text-sm text-[#44527f]">What is your monthly cloud cost (EUR)?</label>
          <input
            required
            min={100}
            step={50}
            type="number"
            value={monthlyCost}
            onChange={(e) => setMonthlyCost(e.target.value)}
            className="w-full rounded-xl border border-[#ccdaee] bg-[#f8fbff] px-4 py-3 text-[#1a1f36]"
          />
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-xl bg-[#635bff] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f46e5]"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <label className="block text-sm text-[#44527f]">Where should we send your report?</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#ccdaee] bg-[#f8fbff] px-4 py-3 text-[#1a1f36]"
          />
          <input
            type="text"
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-[#ccdaee] bg-[#f8fbff] px-4 py-3 text-[#1a1f36]"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#ccdaee] bg-[#f8fbff] px-4 py-3 text-[#1a1f36]"
          />
          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-28 w-full rounded-xl border border-[#ccdaee] bg-[#f8fbff] px-4 py-3 text-[#1a1f36]"
          />
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-[#c5d3ea] bg-white px-5 py-3 text-[#0a2540] transition hover:-translate-y-0.5"
            >
              Back
            </button>
            <button
              disabled={loading}
              type="submit"
              className="rounded-xl bg-[#635bff] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f46e5] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {status ? <p className="mt-4 text-sm text-[#4a5b89]">{status}</p> : null}
    </form>
  );
}

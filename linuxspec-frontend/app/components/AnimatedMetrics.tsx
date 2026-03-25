"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Metric = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
};

const metrics: Metric[] = [
  { value: 40, label: "Cloud cost optimization target", suffix: "%" },
  { value: 99.99, label: "Uptime and reliability objective", suffix: "%", decimals: 2 },
  { value: 10, label: "Transaction request capacity model", suffix: "k+" },
  { value: 24, label: "Monitoring and alerting operations", suffix: "/7" }
];

function formatMetric(value: number, decimals = 0) {
  return value.toFixed(decimals);
}

export default function AnimatedMetrics() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const durationMs = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(metrics.map((metric) => metric.value * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [started]);

  const renderedMetrics = useMemo(
    () =>
      metrics.map((metric, index) => {
        const value = animatedValues[index] ?? 0;
        const decimals = metric.decimals ?? 0;
        return {
          ...metric,
          rendered: `${formatMetric(value, decimals)}${metric.suffix || ""}`
        };
      }),
    [animatedValues]
  );

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 lg:px-16">
      <div className="grid gap-4 rounded-3xl border border-[#dbe4f3] bg-white p-8 text-center shadow-[0_14px_34px_rgba(10,37,64,0.08)] md:grid-cols-4">
        {renderedMetrics.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-transparent p-2 transition hover:-translate-y-1 hover:border-[#dbe4f3] hover:shadow-[0_14px_30px_rgba(10,37,64,0.10)]"
          >
            <p className="text-4xl font-bold text-[#0a2540]">{item.rendered}</p>
            <p className="mt-1 text-sm text-[#586791]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

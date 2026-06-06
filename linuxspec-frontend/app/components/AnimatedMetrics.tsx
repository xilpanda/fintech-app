"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Metric = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
};

const metrics: Metric[] = [
  { value: 500, label: "Security assessments delivered", suffix: "+" },
  { value: 100, label: "Client retention rate", suffix: "%" },
  { value: 15, label: "Years of combined experience", suffix: "+" },
  { value: 24, label: "Response time for urgent requests", suffix: "h" }
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
    <section ref={containerRef} className="section-container py-12">
      <div className="grid gap-px overflow-hidden rounded-sm border border-border/80 bg-border/40 text-center md:grid-cols-4">
        {renderedMetrics.map((item) => (
          <div
            key={item.label}
            className="bg-panel p-8 transition hover:bg-card"
          >
            <p className="text-4xl font-bold tracking-tight text-accent">{item.rendered}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

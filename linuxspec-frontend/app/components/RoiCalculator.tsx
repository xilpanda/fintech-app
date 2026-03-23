"use client";

import { useEffect, useMemo, useState } from "react";

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const start = value;
    const delta = target - start;
    const durationMs = 350;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(start + delta * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export default function RoiCalculator() {
  const [monthlyCost, setMonthlyCost] = useState(1000);

  const result = useMemo(() => {
    const low = monthlyCost * 0.3;
    const high = monthlyCost * 0.6;
    return {
      lowMonthly: low,
      highMonthly: high,
      lowYearly: low * 12,
      highYearly: high * 12
    };
  }, [monthlyCost]);

  const lowMonthly = useAnimatedNumber(result.lowMonthly);
  const highMonthly = useAnimatedNumber(result.highMonthly);
  const lowYearly = useAnimatedNumber(result.lowYearly);
  const highYearly = useAnimatedNumber(result.highYearly);

  return (
    <div className="card">
      <h3 className="text-2xl font-semibold">Potential Savings Calculator</h3>
      <p className="mt-2 text-gray-400">
        Enter your monthly cloud cost to estimate potential savings.
      </p>
      <p className="mt-3 text-gray-200">
        If you are spending <span className="font-semibold">EUR {monthlyCost}/month</span>, you are
        likely wasting <span className="font-semibold text-red-300">EUR {lowMonthly.toFixed(0)} - EUR {highMonthly.toFixed(0)} every month</span>.
      </p>
      <p className="mt-1 text-gray-300">
        That is <span className="font-semibold text-red-300">EUR {lowYearly.toFixed(0)} - EUR {highYearly.toFixed(0)} per year</span>.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm text-gray-300">Monthly cloud cost (EUR)</label>
        <input
          type="number"
          min={100}
          step={50}
          value={monthlyCost}
          onChange={(e) => setMonthlyCost(Number(e.target.value || 0))}
          className="w-full rounded-xl border border-gray-700 bg-[#0f172a] px-4 py-3"
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">Estimated monthly savings</p>
          <p className="mt-1 text-xl font-semibold text-green-400">
            EUR {lowMonthly.toFixed(0)} - EUR {highMonthly.toFixed(0)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">Estimated yearly savings</p>
          <p className="mt-1 text-xl font-semibold text-green-400">
            EUR {lowYearly.toFixed(0)} - EUR {highYearly.toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { PLANS, type Tier } from "@/lib/stripe/plans";

export function PricingTable() {
  const [cadence, setCadence] = useState<"monthly" | "yearly">("yearly");
  const [loading, setLoading] = useState<Tier | null>(null);

  async function subscribe(tier: Tier) {
    if (tier === "free") {
      window.location.href = "/signup";
      return;
    }
    setLoading(tier);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, cadence }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (res.status === 401) window.location.href = "/signup?next=/service/metabolic-health-tracker";
      else alert(data.error ?? "Could not start checkout.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          {(["monthly", "yearly"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCadence(c)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium ${
                cadence === c ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              {c === "yearly" ? "Yearly (save ~34%)" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => {
          const price = cadence === "yearly" ? p.priceYearly : p.priceMonthly;
          const featured = p.tier === "plus";
          return (
            <div
              key={p.tier}
              className={`flex flex-col rounded-2xl border p-6 ${
                featured ? "border-blue-600 shadow-lg" : "border-gray-200"
              }`}
            >
              {featured && (
                <span className="mb-2 inline-block w-fit rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-extrabold">${price}</span>
                <span className="text-gray-500">
                  {p.tier === "free" ? "" : cadence === "yearly" ? "/yr" : "/mo"}
                </span>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-700">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-blue-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(p.tier)}
                disabled={loading === p.tier}
                className={`mt-6 rounded-lg px-4 py-2.5 font-semibold ${
                  featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 hover:bg-gray-50"
                } disabled:opacity-60`}
              >
                {loading === p.tier ? "Redirecting…" : p.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

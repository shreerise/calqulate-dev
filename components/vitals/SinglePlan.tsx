"use client";
import { useState } from "react";
import { Check } from "lucide-react";

/**
 * One simple plan (annual-first), mapped to the existing "plus" Stripe tier.
 * Research shows a single, outcome-framed, annual-first plan converts better
 * than a 3-tier ladder for this category.
 */
const FEATURES = [
  "Metabolic Health Score + Longevity Index (0–1000) & biological age",
  "“Future You” simulator - Monte-Carlo projection of your next 6–60 months",
  "Personal trajectory engine - separates real progress from daily noise",
  "Your single highest-impact 'next lever', quantified in your own risk",
  "Heart age, 10-yr heart-attack & diabetes risk, trended month over month",
  "GLP-1 lean-mass protection: track muscle, not just the scale",
  "Doctor-shareable PDF report + full lab tracking (kg/lb · cm/in)",
  "Weekly progress email + optional mobile notifications",
  "Private by design · export or delete your data anytime",
];

export function SinglePlan() {
  const [cadence, setCadence] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(false);

  const price = cadence === "yearly" ? "$79" : "$9.99";
  const unit = cadence === "yearly" ? "/year" : "/month";
  const sub = cadence === "yearly" ? "Billed annually - about $6.58/mo. Save ~34%." : "Billed monthly. Switch to yearly anytime.";

  async function subscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "plus", cadence }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (res.status === 401) window.location.href = "/signup?next=/how-it-works";
      else alert(data.error ?? "Could not start checkout. Payments are being configured.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border-2 border-emerald-600 bg-white shadow-xl overflow-hidden">
      <div className="bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white">
        One plan. Everything included.
      </div>
      <div className="p-7">
        <div className="mb-5 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            {(["yearly", "monthly"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCadence(c)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  cadence === c ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {c === "yearly" ? "Yearly" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Calqulate Vitals</div>
          <div className="mt-2">
            <span className="text-5xl font-extrabold text-gray-900">{price}</span>
            <span className="text-gray-500">{unit}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">{sub}</p>
        </div>

        <ul className="mt-6 space-y-2.5">
          {FEATURES.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-gray-700">
              <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={subscribe}
          disabled={loading}
          className="mt-7 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Start Calqulate Vitals"}
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          Free snapshot first - no card needed. Cancel anytime. Not medical advice.
        </p>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { GatewayPicker } from "@/components/payment/GatewayPicker";
import { useCheckout } from "@/hooks/useCheckout";
import { displayPrice, displayUnit, displaySub } from "@/lib/payment/types/index";
import type { Gateway } from "@/lib/payment/types/index";

const FEATURES = [
  "Metabolic Health Score + Longevity Index (0–1000) & biological age",
  "\u201cFuture You\u201d simulator - Monte-Carlo projection of your next 6\u201360 months",
  "Personal trajectory engine - separates real progress from daily noise",
  "Your single highest-impact 'next lever', quantified in your own risk",
  "Heart age, 10-yr heart-attack & diabetes risk, trended month over month",
  "GLP-1 lean-mass protection: track muscle, not just the scale",
  "Doctor-shareable PDF report + full lab tracking (kg/lb \u00b7 cm/in)",
  "Weekly progress email + optional mobile notifications",
  "Private by design \u00b7 export or delete your data anytime",
];

export function SinglePlan({ paid }: { paid?: boolean }) {
  const [cadence, setCadence] = useState<"yearly" | "monthly">("yearly");
  const [gateway, setGateway] = useState<Gateway>("paypal");
  const { loading, error, checkout, retry } = useCheckout();

  const price = displayPrice("plus", cadence);
  const unit = displayUnit("plus", cadence);
  const sub = displaySub(cadence);

  async function subscribe() {
    await checkout(gateway, "plus", cadence);
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border-2 border-emerald-600 bg-white shadow-xl overflow-hidden">
      <div className={`px-6 py-3 text-center text-sm font-semibold text-white ${paid ? "bg-emerald-700" : "bg-emerald-600"}`}>
        {paid ? "You already have Vitals Pro" : "One plan. Everything included."}
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

        {paid ? (
          <Link
            href="/dashboard"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 transition-colors"
          >
            Go to dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="mt-6 space-y-3">
            <GatewayPicker gateway={gateway} onChange={setGateway} disabled={loading} />
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-sm text-red-600">{error}</p>
                <button onClick={retry} className="mt-1 text-xs font-semibold text-red-700 hover:underline">
                  Try again
                </button>
              </div>
            )}
            <button
              onClick={subscribe}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {loading ? "Redirecting\u2026" : "Start Calqulate Vitals"}
            </button>
            <p className="text-center text-xs text-gray-400">
              Create your account, then pay securely. Cancel anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Loader2, Sparkles, Dumbbell, ShieldCheck } from "lucide-react";
import { GatewayPicker } from "@/components/payment/GatewayPicker";
import { useCheckout } from "@/hooks/useCheckout";
import { getPrice, formatPrice, displaySubtitle } from "@/lib/payment/pricing";

const FEATURES = [
  "GLP-1 dose & side-effect tracking for Ozempic, Wegovy & Mounjaro",
  "Protein targets & resistance-training reminders to protect lean mass",
  "Body-composition tracking - fat vs. muscle, not just the scale",
  "Metabolic Health Score + Longevity Index (0–1000) & biological age",
  "\u201cFuture You\u201d simulator - Monte-Carlo projection of your next 6\u201360 months",
  "Personal trajectory engine - separates real progress from daily noise",
  "Your single highest-impact 'next lever', quantified in your own risk",
  "Heart age, 10-yr heart-attack & diabetes risk, trended month over month",
  "Doctor-shareable PDF report + full lab tracking (kg/lb \u00b7 cm/in)",
  "Weekly progress email + optional mobile notifications",
  "Private by design \u00b7 export or delete your data anytime",
];

const HIGHLIGHTS = [
  {
    icon: Dumbbell,
    title: "Fat-loss vs. muscle-loss detection",
    body: "Know exactly what you\u2019re burning on a GLP-1 \u2014 so you never end up \u201cskinny-fat\u201d.",
  },
  {
    icon: ShieldCheck,
    title: "Your history is never lost",
    body: "Switch or replace your device and your full health timeline follows you, securely.",
  },
];

export function SinglePlan({ paid }: { paid?: boolean }) {
  const [cadence, setCadence] = useState<"yearly" | "monthly">("yearly");
  const { loading, error, checkout, retry } = useCheckout();

  const currency = "USD";
  const price = getPrice("pro", cadence, currency);
  const formatted = formatPrice(price, currency);
  const unit = cadence === "yearly" ? "/year" : "/month";
  const sub = displaySubtitle(currency, cadence);

  async function subscribe(usePaypal?: boolean) {
    await checkout("pro", cadence, usePaypal);
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
            <span className="text-5xl font-extrabold text-gray-900">{formatted}</span>
            <span className="text-gray-500">{unit}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">{sub}</p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold-light/15 via-white to-gold/10 p-4 shadow-[0_4px_20px_rgba(245,158,11,0.12)]">
          <span className="gold-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light to-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-ink shadow-sm">
              <Sparkles className="h-3 w-3" /> Members-only
            </span>
            <ul className="mt-3 space-y-2.5">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-2.5">
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold" />
                  <span className="text-sm leading-snug text-gray-800">
                    <span className="font-bold">{title}.</span> {body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
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
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-sm text-red-600">{error}</p>
                <button onClick={() => retry()} className="mt-1 text-xs font-semibold text-red-700 hover:underline">
                  Try again
                </button>
              </div>
            )}
            <button
              onClick={() => subscribe(true)}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-light to-gold px-4 py-3 font-bold text-gold-ink shadow-[0_8px_20px_rgba(245,158,11,.35)] transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {loading ? "Redirecting\u2026" : "Start Calqulate Vitals"}
            </button>
            <GatewayPicker />
            <div className="text-center">
              <button
                onClick={() => subscribe(false)}
                disabled={loading}
                className="text-xs text-gray-400 underline-offset-2 hover:text-emerald-600 hover:underline"
              >
                or pay with your card
              </button>
            </div>
            <p className="text-center text-xs text-gray-400">
              Create your account, then pay securely. Cancel anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

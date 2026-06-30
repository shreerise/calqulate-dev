import type { Metadata } from "next"
import GLP1DoseCalculator from "@/components/calculators/glp-1-dose-calculator"
import { EmbedHeightReporter } from "@/components/embed/EmbedHeightReporter"
import { HeartPulse, ArrowRight } from "lucide-react"

// Canonical tool the embed credits + funnels to. UTM tags let you measure
// referral traffic from sites that embed the widget.
const CANONICAL = "https://calqulate.net/health/glp-1-dose-calculator?utm_source=embed&utm_medium=widget&utm_campaign=dose-widget"
const VITALS = "https://calqulate.net/product/glp1-progress-tracker?utm_source=embed&utm_medium=widget&utm_campaign=dose-widget"

export const metadata: Metadata = {
  title: "GLP-1 Dose Calculator — embeddable widget | Calqulate.net",
  description:
    "Free embeddable GLP-1 dose calculator: convert a prescribed semaglutide or tirzepatide dose into exact insulin-syringe units.",
  // noindex so this stripped-down embed never competes with the canonical page
  // for rankings — but follow so the outbound credit link still passes equity.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://calqulate.net/health/glp-1-dose-calculator" },
}

export default function GLP1DoseCalculatorEmbed() {
  return (
    <div className="min-h-screen bg-white px-3 py-4">
      <EmbedHeightReporter />

      <GLP1DoseCalculator />

      {/* Soft CTA — non-intrusive, free tool stays fully usable without it */}
      <div className="mx-auto mt-4 max-w-2xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-center">
        <a
          href={VITALS}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
        >
          Track your dose &amp; muscle over time with Calqulate Vitals
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Visible dofollow attribution — this is the backlink */}
      <div className="mx-auto mt-3 max-w-2xl text-center">
        <a
          href={CANONICAL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-emerald-700"
        >
          <HeartPulse className="h-3.5 w-3.5 text-emerald-600" />
          Powered by <span className="font-semibold">Calqulate.net</span>
        </a>
        <p className="mt-1 text-[10px] leading-snug text-gray-400">
          Educational decision-support — not medical advice. Confirm every dose with your prescriber.
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SinglePlan } from "@/components/vitals/SinglePlan";
import { SocialProof } from "@/components/marketing/SocialProof";
import { Check, X, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Calqulate Vitals — one simple plan, everything included",
  description:
    "Calqulate Vitals is one simple plan. Free to start, then save your history, track your Longevity Index and heart risk over time, run the Future You simulator, and get your GLP-1 Autopilot protocol. Cancel anytime.",
  alternates: { canonical: "https://calqulate.net/pricing" },
};

const INCLUDED = [
  "Saved measurement history and trend dashboard",
  "Metabolic Health Score, tracked with a trajectory engine that tells real progress from daily noise",
  "Longevity Index (0 to 1000) and biological age, with the exact levers to improve them",
  "Future You simulator, a Monte-Carlo projection of your next 6 to 60 months",
  "Heart age, 10-year heart-attack and diabetes risk, trended month over month",
  "GLP-1 Autopilot: adaptive titration schedule, weekly missions, protein targets and training",
  "Lean-mass protection so you lose fat, not muscle, on a GLP-1",
  "Your single highest-impact next lever, quantified in your own numbers",
  "Doctor-shareable PDF report and full lab tracking",
  "Weekly progress email and optional mobile notifications",
  "USA units (lb and inches) or metric, your choice",
  "Private by design, export or delete your data anytime",
];

const FAQS = [
  { q: "Is it really free to start?", a: "Yes. Every calculator and your first metabolic snapshot are free with no account and nothing saved. You only pay when you want to save your history, track the trend, and unlock the protocol, simulator and reports." },
  { q: "Can I cancel anytime?", a: "Yes, one click in your account, no phone call, no retention maze. You keep access until the end of the period you paid for, and you can export or permanently delete your data whenever you want." },
  { q: "Is this medical advice?", a: "No. Calqulate is educational decision-support built on validated, published clinical models. It helps you understand and track your risk and bring better questions to your doctor. It does not diagnose, treat or prescribe." },
  { q: "Do you sell my health data?", a: "No. Your data is yours. We do not sell it. You can export everything as JSON or delete your account and all health rows permanently, anytime, from settings." },
  { q: "Does the GLP-1 Autopilot prescribe doses?", a: "No. It organizes a schedule from standard published dose ladders and adapts it to the side-effects you log, but every dose change must be confirmed with your prescriber." },
  { q: "What devices does it work on?", a: "Any modern browser on phone, tablet or desktop. You can add it to your home screen as an app and turn on optional notifications." },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Calqulate Vitals",
        description: "Metabolic and cardiovascular risk-reversal service with longevity tracking and a GLP-1 protocol builder.",
        brand: { "@type": "Brand", name: "Calqulate" },
        offers: {
          "@type": "Offer",
          price: "79",
          priceCurrency: "USD",
          url: "https://calqulate.net/pricing",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-12-31",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-50 to-white py-12 sm:py-16">
          <div className="container mx-auto px-3 sm:px-4 max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">Pricing</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">One plan. Everything included.</h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              No tiers to decode, no upsells. Start free, and when you want to actually track and reverse your numbers,
              one plan unlocks the whole platform. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Plan */}
        <section className="py-10 sm:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <SinglePlan />
          </div>
        </section>

        {/* Free vs paid */}
        <section className="py-10 sm:py-12 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8">What is free vs what you pay for</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <h3 className="font-bold text-gray-900">Free, no account</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {["All 50+ calculators", "One-time metabolic snapshot", "Your score, heart age and risk, once", "No saved history"].map((f) => (
                    <li key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-emerald-600 bg-white p-5 sm:p-6">
                <h3 className="font-bold text-gray-900">Calqulate Vitals members</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {["Everything in free, plus saved history and trends", "Longevity Index, Future You, GLP-1 Autopilot", "Weekly email and mobile notifications", "Doctor PDF and full lab tracking"].map((f) => (
                    <li key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Everything included */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Everything you get when you subscribe</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">One plan, the full platform. Here is the whole list.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SocialProof />

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8">Questions people ask before paying</h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
                  <summary className="cursor-pointer font-semibold text-gray-900">{f.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-gradient-to-br from-emerald-950 to-emerald-900 text-center">
          <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Start free, upgrade when you want the trend</h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/80">Get your free score first. No card needed.</p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/service/metabolic-health-tracker" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 sm:px-6 py-3 min-h-[44px] font-semibold text-gray-950 hover:bg-emerald-400">
                Get my free score <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/how-it-works" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 px-5 sm:px-6 py-3 min-h-[44px] font-semibold text-emerald-200 hover:bg-emerald-800/50">
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

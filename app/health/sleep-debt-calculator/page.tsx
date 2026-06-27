import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import SleepDebtCalculator from "@/components/calculators/sleep-debt-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Calculator,
  AlertTriangle,
  BatteryCharging,
  TrendingUp,
  CheckCircle2,
  Info,
  Clock,
  ArrowRight,
  ShieldAlert,
  Table,
  Activity,
  Zap,
  Stethoscope,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthorSection } from "@/components/seo/author-section"
import { RelatedCalculators } from "@/components/calculators/related-calculators"

export const metadata: Metadata = {
  title: "Sleep Debt Calculator: Calculate Your Sleep Deficit | Free Tool",
  description:
    "Feeling tired despite sleeping? Calculate your sleep debt accurately. Find your sleep deficit by age and get a science-backed recovery plan to restore your energy.",
  keywords:
    "sleep debt calculator, sleep deficit calculator, calculate sleep debt, sleep debt symptoms, sleep debt recovery plan, catch up on sleep myth, sleep debt by age",
  alternates: {
    canonical: "https://calqulate.net/health/sleep-debt-calculator",
  },
  openGraph: {
    title: "Sleep Debt Calculator: Calculate Your Sleep Deficit | Free Tool",
    description: "Feeling tired despite sleeping? Calculate your sleep debt accurately. Find your sleep deficit by age and get a science-backed recovery plan to restore your energy.",
    url: "https://calqulate.net/health/sleep-debt-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Debt Calculator: Calculate Your Sleep Deficit | Free Tool",
    description: "Feeling tired despite sleeping? Calculate your sleep debt accurately. Find your sleep deficit by age and get a science-backed recovery plan to restore your energy.",
  },
}

const faqs = [
  {
    question: "How to calculate sleep debt?",
    answer:
      "Subtract your actual sleep hours from your recommended sleep hours and multiply by the number of days. Formula: (Recommended − Actual) × Days.",
  },
  {
    question: "How much sleep debt do I have?",
    answer:
      "You can find this by comparing your nightly requirement (usually 7-9 hours for adults) against what you actually slept over the last week.",
  },
  {
    question: "Is sleep debt real?",
    answer:
      "Yes. Multiple clinical studies confirm that cumulative sleep restriction affects metabolic, cardiovascular, and neurological function over time.",
  },
  {
    question: "Can sleep debt kill you?",
    answer:
      "While rarely directly fatal, chronic sleep deprivation significantly increases risk factors for cardiovascular disease, obesity, and fatal accidents.",
  },
  {
    question: "How long does sleep debt take to recover?",
    answer:
      "Mild cases take a few days, while chronic deficits (20+ hours) may require several weeks of a consistent, structured recovery plan.",
  },
]

export default function SleepDebtCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Sleep Debt Calculator"
        description="Find out how much sleep debt you have accumulated and get a personalized recovery plan."
        url="https://calqulate.net/health/sleep-debt-calculator"
      />
      <FAQSchema faqs={faqs} />
      <MedicalReviewerSchema />

      <Header />

      <main id="main" className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              Free · Instant · No sign-up required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
              Sleep Debt Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Are you sleeping 6 hours but feeling like you slept 3? You may be carrying sleep debt — a hidden deficit that builds quietly and affects your brain, mood, and health.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Try the Calculator ↓
              </a>
            </div>
          </div>
        </section>

        {/* USP SUMMARY (TOFU) */}
        <section className="border-b border-emerald-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Calqulate.net totals your accumulated sleep deficit, calibrated to age-based sleep needs. You get your debt in hours plus a realistic recovery schedule.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "Weekly", label: "Sleep debt" },
              { value: "Free", label: "Price" },
              { value: "No", label: "Sign-up" },
              { value: "Instant", label: "Results" },
              { value: "Private", label: "In-browser" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <SleepDebtCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Definition Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is Sleep Debt?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sleep debt is the difference between the amount of sleep your body needs and the amount of sleep you actually get. That missing sleep doesn’t disappear; it accumulates and impairs attention, memory, and hormonal balance.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <Brain className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-[10px] uppercase">Memory Loss</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <Zap className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-[10px] uppercase">Slow Reactions</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <ShieldAlert className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-[10px] uppercase">Immune Risk</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <Activity className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-[10px] uppercase">Mood Swings</p>
                  </div>
                </div>
              </section>

              {/* Calculation Formula Card */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Calculator className="w-5 h-5" />
                      How to Calculate Sleep Debt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-white border-2 border-green-600 border-dashed p-6 rounded-xl text-center mb-6">
                      <p className="text-2xl font-bold text-green-700">Sleep Debt = (Recommended − Actual) × Days</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-sm">
                      <p className="font-bold mb-2">Example Calculation:</p>
                      <p>Recommended: 8 hours | Actual: 6.5 hours | Days: 7</p>
                      <p className="font-bold text-green-700 mt-1">Total: 10.5 hours of accumulated sleep debt.</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Age Based Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  Sleep Debt Calculator by Age
                </h2>
                <p className="text-gray-700 mb-6">Your age determines your optimal sleep requirement. A proper calculation adjusts this baseline first.</p>
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Age Group</th>
                        <th className="px-6 py-4 text-left font-bold">Recommended Sleep</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4">Teenagers (14–17)</td><td className="px-6 py-4">8–10 hours</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-4">Adults (18–64)</td><td className="px-6 py-4">7–9 hours</td></tr>
                      <tr><td className="px-6 py-4">Seniors (65+)</td><td className="px-6 py-4">7–8 hours</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Severity Levels */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-green-600" />
                  Severity Levels & Impact
                </h2>
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Total Debt</th>
                        <th className="px-6 py-4 text-left font-bold">Severity</th>
                        <th className="px-6 py-4 text-left font-bold">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4">1–5 hours</td><td className="px-6 py-4 font-medium text-blue-600">Mild</td><td className="px-6 py-4">Reduced focus</td></tr>
                      <tr><td className="px-6 py-4">5–10 hours</td><td className="px-6 py-4 font-medium text-yellow-600">Moderate</td><td className="px-6 py-4">Mood swings, fatigue</td></tr>
                      <tr><td className="px-6 py-4">10–20 hours</td><td className="px-6 py-4 font-medium text-orange-600">High</td><td className="px-6 py-4">Hormonal disruption</td></tr>
                      <tr><td className="px-6 py-4">20+ hours</td><td className="px-6 py-4 font-medium text-red-600">Chronic</td><td className="px-6 py-4">Health risk zone</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Symptoms Grid */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep Debt Symptoms You Should Not Ignore</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Brain fog & Poor memory</span>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Sugar cravings</span>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Constant irritability</span>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Weakened immunity</span>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Low workout performance</span>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-1" />
                    <span className="text-sm text-gray-700">Frequent headaches</span>
                  </div>
                </div>
              </section>

              {/* The Myth Section */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6" />
                  The Sleep Debt Myth: Can You "Catch Up"?
                </h2>
                <p className="mb-6 opacity-90">Many believe a 12-hour Sunday sleep reverses a week of debt. Research shows this is a myth. Weekend oversleep does not fully reverse metabolic disruption or stabilize your circadian rhythm.</p>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <h4 className="font-bold text-green-200 mb-2">Science-Backed Recovery Plan:</h4>
                  <ul className="text-sm space-y-2 list-none pl-0">
                    <li className="flex gap-2"><span>1.</span> Add 30–60 minutes nightly (gradual recovery).</li>
                    <li className="flex gap-2"><span>2.</span> Maintain a fixed wake-up time.</li>
                    <li className="flex gap-2"><span>3.</span> Reduce afternoon caffeine & evening blue light.</li>
                    <li className="flex gap-2"><span>4.</span> Use a Sleep Cycle Calculator for wake timing.</li>
                  </ul>
                </div>
              </section>

              {/* Recovery Timeline Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Recovery Timeline Estimation
                </h2>
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-50 text-green-800">
                        <th className="px-6 py-4 text-left font-bold">Total Sleep Debt</th>
                        <th className="px-6 py-4 text-left font-bold">Estimated Recovery Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4">2–4 hours</td><td className="px-6 py-4">2–3 days</td></tr>
                      <tr><td className="px-6 py-4">5–10 hours</td><td className="px-6 py-4">1 week</td></tr>
                      <tr><td className="px-6 py-4">10–20 hours</td><td className="px-6 py-4">1–2 weeks</td></tr>
                      <tr><td className="px-6 py-4">Chronic (20+ hrs)</td><td className="px-6 py-4">2–4 weeks (structured)</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Neurological Impact Section */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Brain className="text-green-600 w-5 h-5" /> Impact on the Brain
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Sleep is not passive rest. During sleep, the brain clears metabolic waste and consolidates memory. Sleep debt disrupts the <strong>prefrontal cortex</strong> (decision-making) and <strong>amygdala regulation</strong> (emotional control). 17 hours awake is cognitively similar to 0.05% blood alcohol.
                  </p>
                </div>
                <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Table className="text-green-600 w-5 h-5" /> Why Track Debt?
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">Monitoring accumulated loss helps you:</p>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-gray-600">
                    <li>Identify work stress or screen patterns.</li>
                    <li>Measure the effectiveness of recovery.</li>
                    <li>Avoid reaching the 20-hour "danger zone."</li>
                  </ul>
                </div>
              </section>

              {/* Optimization Plan */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Sleep Optimization Plan</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-green-800 mb-2">Morning & Afternoon</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• Get 10–20 min of sunlight immediately.</li>
                      <li>• Avoid the snooze button at all costs.</li>
                      <li>• Limit caffeine intake after 2 PM.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-green-800 mb-2">Evening & Bedtime</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• Reduce bright overhead lights.</li>
                      <li>• Avoid "doom scrolling" 60 min before bed.</li>
                      <li>• Keep your bedroom temperature cool.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <BatteryCharging className="w-6 h-6 text-green-600" />
                  Final Takeaway
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  "Unlike financial debt, sleep debt does not charge interest — but it compounds biologically. Consistency reduces future accumulation and preserves your long-term health."
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Optimize your wake-up time?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you've calculated your debt, use our Sleep Cycle tool to wake up refreshed between cycles.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/sleep-cycle-calculator">
                      Sleep Cycle Tool <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>
            <RelatedCalculators slug="sleep-debt-calculator" />

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
            <MedicalReviewerSection />
            <AuthorSection />
          </div>
        </div>
      </main>

      {/* Author Schema */}
      <AuthorSchema />

      <Footer />
    </div>
  )
}
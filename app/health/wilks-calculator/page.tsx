import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import WilksCalculator from "@/components/calculators/wilks-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { RelatedCalculators } from "@/components/calculators/related-calculators"

export const metadata: Metadata = {
  title: "Wilks Calculator (Powerlifting Score Explained Clearly)",
  description:
    "Coach-level explanation for lifters in India, UK & USA — accurate, transparent, and competition-aware. Learn how to calculate Wilks score and compare strength.",
  keywords:
    "Wilks calculator, how to calculate Wilks score, Wilks score calculator, powerlifting calculator, Wilks vs IPF calculator, DOT calculator, Wilks formula, powerlifting score, strength standards",
  alternates: {
    canonical: "https://calqulate.net/health/wilks-calculator",
  },
  openGraph: {
    title: "Wilks Calculator (Powerlifting Score Explained Clearly)",
    description: "Coach-level explanation for lifters in India, UK & USA — accurate, transparent, and competition-aware. Learn how to calculate Wilks score and compare strength.",
    url: "https://calqulate.net/health/wilks-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilks Calculator (Powerlifting Score Explained Clearly)",
    description: "Coach-level explanation for lifters in India, UK & USA — accurate, transparent, and competition-aware. Learn how to calculate Wilks score and compare strength.",
  },
}

const faqs = [
  {
    question: "What is a good Wilks score?",
    answer:
      "A Wilks score above 300 is generally considered strong for competitive lifters. Scores between 250–300 are typical for intermediate lifters, while 350+ is entering elite territory.",
  },
  {
    question: "Is Wilks still used in competitions?",
    answer:
      "Some local and legacy federations still use it, but major international bodies like the IPF have transitioned to GL Points (IPF Points).",
  },
  {
    question: "Should I use Wilks or DOTS?",
    answer:
      "You should use the system your federation officially adopts. DOTS is currently very popular in US-based non-IPF federations, while Wilks is often used for historical comparisons.",
  },
  {
    question: "Can beginners use a Wilks calculator?",
    answer:
      "Yes, but it’s most meaningful once you train seriously and have established a one-rep max for the squat, bench, and deadlift.",
  },
  {
    question: "Why is my Wilks score lower than expected?",
    answer:
      "Bodyweight scaling in the Wilks formula often penalizes heavier lifters relative to their absolute totals, as it is designed to measure relative strength rather than raw power.",
  },
]

export default function WilksCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Wilks Calculator"
        description="A Wilks score calculator compares powerlifting strength across different bodyweights to determine relative strength."
        url="https://calqulate.net/health/wilks-calculator"
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
              Wilks Calculator (Powerlifting Score Explained Clearly)
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Coach-level explanation for lifters in India, UK & USA — accurate, transparent, and competition-aware.
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
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Calqulate.net calculates your Wilks score from your lift and bodyweight using the recognised
                competition formula. You get a fair cross-bodyweight comparison and your percentile.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "Wilks", label: "Score" },
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
            <WilksCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* Introduction */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Wilks Calculator (What It Does)
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  A Wilks score calculator compares powerlifting strength across different bodyweights. Instead of asking “Who lifted more weight?”, Wilks asks: Who lifted more relative to their bodyweight? 
                </p>
                <p className="text-gray-700 leading-relaxed">
                  That’s why Wilks is used to rank lifters fairly in many competitions. 
                  Higher Wilks = stronger{" "}
                  <Link
                    href="/health/one-rep-max-calculator"
                    className="no-underline hover:underline hover:text-blue-700 font-medium"
                  >
                    relative performance
                  </Link>
                  .
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-gray-800">
                      What Is the Wilks Score?
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      The Wilks score is a coefficient-based formula that adjusts a lifter’s total lift based on bodyweight.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <p className="mb-4">It allows:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Lightweight lifters to compete fairly with heavyweights</li>
                        <li>Rankings across weight classes</li>
                        <li>Objective comparison without bias</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Formula Section */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  Wilks Formula Explained :
                </h2>
                <p className="mb-4">The Wilks formula uses:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Bodyweight (kg)</li>
                  <li>Gender-specific coefficients</li>
                  <li>Total lifted weight (kg)</li>
                </ul>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-gray-900 mb-2">Simplified logic:</h3>
                  <p className="text-gray-700">1️⃣ Calculate a coefficient from bodyweight</p>
                  <p className="text-gray-700">2️⃣ Multiply coefficient × total lifted</p>
                  <p className="mt-4 text-sm italic">You never calculate this manually — a wilks calculator does it instantly.</p>
                </div>
              </section>

              {/* How to Calculate */}
              <section>
                <h2 className="mb-2 font-semibold text-2xl">
                  How to Calculate Wilks Score (Step-by-Step)
                </h2>
                <p className="mb-4">To calculate Wilks score, you need: Bodyweight (kg) and your best squat, bench, deadlift (kg).</p>
                <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                  <p><strong>Step 1:</strong> Add your three lifts = Total</p>
                  <p><strong>Step 2:</strong> Enter bodyweight + total into a Wilks calculator</p>
                  <p><strong>Step 3:</strong> Get your Wilks score</p>
                </div>
              </section>

              {/* Comparison Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Wilks vs IPF Calculator vs DOT Calculator</h2>
                <p className="mb-6">This is where most websites completely fail. If you’re lifting today, Wilks is historical context — not always competition standard.</p>
                
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="border rounded-xl p-4 border-red-200 bg-red-50">
                    <h3 className="font-bold text-red-700">Wilks</h3>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Older formula</li>
                      <li>• Widely known</li>
                      <li>• No longer used by IPF</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl p-4 border-blue-200 bg-blue-50">
                    <h3 className="font-bold text-blue-700">IPF (GL Points)</h3>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Official IPF standard</li>
                      <li>• Updated coefficients</li>
                      <li>• Better fairness</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl p-4 border-green-200 bg-green-50">
                    <h3 className="font-bold text-green-700">DOTS</h3>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Modern alternative</li>
                      <li>• Popular in US federations</li>
                      <li>• Smoother scaling</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Calculator Usage Table */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Powerlifting Calculator: Which One Should You Use?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-2 text-left">Goal</th>
                            <th className="border px-4 py-2 text-left">Best Calculator</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2">IPF competition</td>
                            <td className="border px-4 py-2 font-medium">IPF calculator</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2">US meets</td>
                            <td className="border px-4 py-2 font-medium">DOT calculator</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2">Legacy comparison</td>
                            <td className="border px-4 py-2 font-medium">Wilks calculator</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2">Online rankings</td>
                            <td className="border px-4 py-2 font-medium">Depends on federation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Benchmarks */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Wilks Score Benchmarks </h2>
                <p className="mb-4">While standards vary, rough references:</p>
                <ul className="grid md:grid-cols-3 gap-4 list-none pl-0">
                  <li className="bg-slate-100 p-4 rounded-lg text-center font-medium">250–300 → Intermediate</li>
                  <li className="bg-slate-100 p-4 rounded-lg text-center font-medium">300–350 → Advanced</li>
                  <li className="bg-slate-100 p-4 rounded-lg text-center font-medium">350+ → Elite</li>
                </ul>
                <p className="mt-4 text-sm italic">These are contextual, not absolute.</p>
              </section>

              {/* Common Misunderstandings */}
              <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h2 className="text-2xl font-bold mb-4 text-red-900">Common Misunderstandings</h2>
                <div className="grid md:grid-cols-2 gap-4 text-red-800">
                  <p>❌ Wilks is NOT a medical or fitness score</p>
                  <p>❌ Higher bodyweight does NOT guarantee higher Wilks</p>
                  <p>❌ Wilks ≠ DOTS ≠ IPF</p>
                  <p>❌ Gym totals ≠ competition totals</p>
                </div>
                <p className="mt-4 text-sm">Most calculator pages never clarify this — leading to confusion.</p>
              </section>

              {/* Federation Reality Check */}
              <section>
                <h2 className="text-2xl font-bold mb-4">India, UK & USA – Federation Reality Check</h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <Card>
                    <CardHeader className="p-4"><CardTitle className="text-base">India</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">Mixed federations. Wilks still seen in local meets.</CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4"><CardTitle className="text-base">UK</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">IPF-affiliated federations dominate. GL Points preferred.</CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4"><CardTitle className="text-base">USA</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">DOTS widely used. Wilks mostly for legacy comparison.</CardContent>
                  </Card>
                </div>
              </section>

              {/* Statistics Clarification */}
              <section className="border-l-4 border-l-blue-500 pl-6 py-2">
                <h2 className="text-xl font-bold mb-2">Wilks vs Shapiro-Wilk Calculator</h2>
                <p className="text-sm text-gray-700 mb-2">Many users confuse: Wilks calculator (powerlifting) and Shapiro-Wilk calculator (statistics test). They are completely unrelated.</p>
                <p className="text-sm font-medium">Wilks → strength comparison</p>
                <p className="text-sm font-medium">Shapiro-Wilk test → data normality</p>
              </section>

              {/* Final Verdict */}
              <section className="bg-slate-900 text-white p-8 rounded-3xl">
                <h2 className="text-2xl font-bold mb-6">Final Verdict: Is the Wilks Calculator Still Useful?</h2>
                <p className="mb-4">Yes — with context. A Wilks calculator is best used for:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span>•</span> Historical comparison</li>
                  <li className="flex items-start gap-3"><span>•</span> Cross-weight-class analysis</li>
                  <li className="flex items-start gap-3"><span>•</span> Training benchmarks</li>
                </ul>
                <p className="mt-6 border-t border-white/20 pt-6">But for official rankings, always defer to your federation’s standard.</p>
              </section>

            </div>

            <RelatedCalculators slug="wilks-calculator" />

            {/* FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
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
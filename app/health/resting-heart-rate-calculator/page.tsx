import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import RestingHeartRateCalculator from "@/components/calculators/resting-heart-rate-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { HeartPulse, Activity, Info, ShieldAlert, Timer, TrendingUp, Users , Stethoscope, Sparkles } from "lucide-react"
import Link from "next/link"
import { RelatedCalculators } from "@/components/calculators/related-calculators"

export const metadata: Metadata = {
  title: "Resting Heart Rate Calculator: Check Your Heart Health Instantly",
  description: "Calculate your resting heart rate (RHR) and see how you compare to health standards. Use our interactive tap-to-measure tool for accurate results and personalized health insights.",
  keywords: "resting heart rate calculator, normal resting heart rate by age, how to measure RHR, heart health tool, pulse calculator, bradycardia, tachycardia, fitness level heart rate",
  alternates: {
    canonical: "https://calqulate.net/health/resting-heart-rate-calculator",
  },
  openGraph: {
    title: "Resting Heart Rate Calculator: Check Your Heart Health Instantly",
    description: "Calculate your resting heart rate (RHR) and see how you compare to health standards. Use our interactive tap-to-measure tool for accurate results and personalized health insights.",
    url: "https://calqulate.net/health/resting-heart-rate-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resting Heart Rate Calculator: Check Your Heart Health Instantly",
    description: "Calculate your resting heart rate (RHR) and see how you compare to health standards. Use our interactive tap-to-measure tool for accurate results and personalized health insights.",
  },
}

const faqs = [
  {
    question: "What is a normal resting heart rate for my age?",
    answer: "For most adults, a normal resting heart rate ranges from 60 to 100 beats per minute (BPM). However, highly trained athletes may have RHRs as low as 40 BPM. As you age, your RHR generally remains stable, but your maximum heart rate decreases.",
  },
  {
    question: "When is the best time to measure resting heart rate?",
    answer: "The most accurate time to measure your RHR is first thing in the morning, right after you wake up naturally and before you get out of bed or consume caffeine.",
  },
  {
    question: "What does a high resting heart rate mean?",
    answer: "A consistently high RHR (above 100 BPM), known as tachycardia, can be caused by stress, smoking, high caffeine intake, or underlying heart conditions. It is often a sign that the heart muscle is working harder than it should be.",
  },
  {
    question: "Can stress affect my resting heart rate result?",
    answer: "Yes, acute stress or anxiety triggers the release of adrenaline, which temporarily increases your heart rate. To get an accurate reading, ensure you are in a calm, seated position for at least 5 minutes before measuring.",
  }
]

export default function HeartRatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Resting Heart Rate Calculator"
        description="An interactive tool to measure and analyze your resting heart rate with personalized health categories."
        url="https://calqulate.net/health/resting-heart-rate-calculator"
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
              Resting Heart Rate Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Your resting heart rate is a powerful indicator of your{" "} <Link href="/health/vo2-max-calculator" className="font-medium hover:underline hover:text-green-700 transition-colors" > cardiovascular fitness </Link>{" "} and overall health. Use our professional-grade calculator to measure your pulse, interpret your results, and see where you stand compared to global health standards.
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
                Calqulate.net measures your resting heart rate with a simple tap tracker, compared against age and sex bands. You get an accurate reading and what it signals.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "RHR", label: "bpm" },
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
            <RestingHeartRateCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Informative Content Sections */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <Info className="w-6 h-6 text-red-500" />
                  What is Resting Heart Rate (RHR)?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Resting Heart Rate (RHR) is the number of times your heart beats per minute (BPM) while you are at complete rest. It is a vital sign that reflects your heart muscle's efficiency and your cardiovascular system's health. A lower RHR generally implies more efficient heart function and better cardiovascular fitness.
                </p>
              </section>

              <section className="grid md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                      Why It Matters
                    </CardTitle>  
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    Studies show that a higher resting heart rate is linked to a higher risk of cardiovascular disease. Monitoring your RHR over time can help you track fitness gains or identify potential health issues early.
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Athlete vs. Average
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    While 60–100 BPM is "normal," elite athletes often have a "Bradycardia" (low heart rate) of 40–50 BPM. This is because their heart is so strong it pumps more blood with every single beat.
                  </CardContent>
                </Card>
              </section>

              {/* RHR Chart Table */}
              <section>
                <h2 className="text-2xl font-semibold mb-6">Adult Resting Heart Rate Chart</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border p-3 text-left">Category</th>
                        <th className="border p-3 text-left">RHR Range (BPM)</th>
                        <th className="border p-3 text-left">Health Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border p-3 font-medium">Athlete</td><td className="border p-3">40 – 60</td><td className="border p-3 text-blue-600">Excellent / Highly Fit</td></tr>
                      <tr><td className="border p-3 font-medium">Excellent</td><td className="border p-3">61 – 70</td><td className="border p-3 text-green-600">Great Cardiovascular Health</td></tr>
                      <tr><td className="border p-3 font-medium">Good</td><td className="border p-3">71 – 80</td><td className="border p-3 text-green-500">Above Average</td></tr>
                      <tr><td className="border p-3 font-medium">Average</td><td className="border p-3">81 – 90</td><td className="border p-3 text-yellow-600">Fair / Standard</td></tr>
                      <tr><td className="border p-3 font-medium">Poor</td><td className="border p-3">91 – 100</td><td className="border p-3 text-orange-600">Below Average</td></tr>
                      <tr><td className="border p-3 font-medium">Tachycardia</td><td className="border p-3">100+</td><td className="border p-3 text-red-600">High (Consult a Doctor)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section className="bg-gray-900 text-white p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-yellow-400" />
                  Medical Disclaimer
                </h3>
                <p className="text-gray-300 text-sm">
                  This calculator is for educational and fitness tracking purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. If your resting heart rate is consistently over 100 BPM or under 60 BPM (and you are not an athlete), or if you experience palpitations, chest pain, or dizziness, please consult a healthcare professional immediately.
                </p>
              </section>
            </div>

            <RelatedCalculators slug="resting-heart-rate-calculator" />

            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
            <MedicalReviewerSection />
            <AuthorSection />
          </div>
        </div>
      </main>
      <AuthorSchema />
      <Footer />
    </div>
  )
}
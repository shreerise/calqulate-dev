import type { Metadata } from "next"
import Image from "next/image"
import { ClickableImage } from "@/components/ui/image-lightbox"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import HeartAgeCalculator from "@/components/calculators/heart-age-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { ServiceCTA } from "@/components/seo/service-cta"
import { SourcesSection } from "@/components/seo/sources-section"
import { RelatedCalculators } from "@/components/seo/related-calculators"
import { RelatedCalculators as RelatedCalculatorsCatalog } from "@/components/calculators/related-calculators"
import {
  Heart,
  Activity,
  Stethoscope,
  TrendingDown,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Info,
  Zap,
  User,
  ShieldCheck,
  Cigarette,
  Scale,
  ArrowDownCircle,
  Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "Heart Age Calculator: Estimate Your Cardiovascular Risk Age",
  description:
    "Find out if your heart is older or younger than your actual age. Use our heart age calculator based on blood pressure, cholesterol, and lifestyle factors to assess cardiovascular risk.",
  keywords:
    "heart age calculator, cardiac age calculator, cardiovascular age, heart health test, ASCVD risk, calculate heart age, heart rate by age, reduce heart age",
  alternates: {
    canonical: "https://calqulate.net/health/heart-age-calculator",
  },
  openGraph: {
    title: "Heart Age Calculator: Estimate Your Cardiovascular Risk Age",
    description: "Find out if your heart is older or younger than your actual age. Use our heart age calculator based on blood pressure, cholesterol, and lifestyle factors to assess cardiovascular risk.",
    url: "https://calqulate.net/health/heart-age-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart Age Calculator: Estimate Your Cardiovascular Risk Age",
    description: "Find out if your heart is older or younger than your actual age. Use our heart age calculator based on blood pressure, cholesterol, and lifestyle factors to assess cardiovascular risk.",
  },
}

const faqs = [
  {
    question: "What is a heart age calculator?",
    answer:
      "It estimates how old your heart is based on cardiovascular risk factors like blood pressure, cholesterol, and lifestyle habits compared to a healthy person of your same chronological age.",
  },
  {
    question: "Is heart age scientifically accurate?",
    answer:
      "Yes. It is based on validated clinical models like the ASCVD (Atherosclerotic Cardiovascular Disease) and Framingham risk scores used by medical professionals globally.",
  },
  {
    question: "Can heart age be lower than real age?",
    answer:
      "Yes—and that indicates excellent heart health. It means your risk factors are lower than the average person of your age.",
  },
  {
    question: "How often should I calculate my heart age?",
    answer:
      "It is recommended to check once a year or after making major lifestyle changes, such as quitting smoking or improving your diet and exercise routine.",
  },
  {
    question: "Is this the same as the CDC heart age calculator?",
    answer:
      "Conceptually yes. Most reliable heart age tools, including ours, use similar population datasets and risk models to provide an estimate of cardiovascular health.",
  },
  {
    question: "Does heart age predict heart attacks?",
    answer:
      "It estimates your statistical risk over a period of time (usually 10 years). It is a screening tool for awareness and prevention, not a certain prediction of a medical event.",
  },
]

export default function HeartAgeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Heart Age Calculator"
        description="Estimate your cardiovascular age based on risk factors like blood pressure, BMI, and cholesterol. Understand your heart health risk today."
        url="https://calqulate.net/health/heart-age-calculator"
      />
      <FAQSchema faqs={faqs} />
      <MedicalReviewerSchema />

      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              Free · Instant · No sign-up required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
              Heart Age Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Your heart age estimates how old your cardiovascular system is compared to your actual age. It is a powerful way to understand your future risk of heart disease or stroke.
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
                Calqulate.net estimates your heart&apos;s true age from blood pressure, cholesterol and habits using
                validated risk factors. You get a memorable heart-age figure and the change that lowers it most.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "Heart", label: "Age" },
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
            <HeartAgeCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Why it matters */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-red-600" />
                  Why Heart Age Matters More Than Your Chronological Age
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  You can be 35 years old with a heart age of 50, or 55 years old with a heart age of 40. 
                  Unlike your real age, your heart age is a reflection of your biological health. It helps answer:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Vessel Health', icon: Activity },
                    { label: 'Stroke Risk', icon: Zap },
                    { label: 'Longevity', icon: Timer },
                    { label: 'Prevention', icon: ShieldCheck }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
                      <item.icon className="w-6 h-6 text-red-600 mb-2" />
                      <span className="text-xs font-bold text-red-900">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-700 font-bold text-center">
                  👉 Heart age is often more motivating for lifestyle change than a simple risk percentage.
                </p>
              </section>

              {/* How It Works Section */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <Heart className="w-5 h-5" />
                      How the Heart Age Calculation Works
                    </CardTitle>
                    <CardDescription className="text-green-50">Based on validated cardiovascular risk models (ASCVD/CDC).</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 bg-white space-y-6">
                    <p className="text-gray-700">
                      The calculator compares your cardiovascular risk profile to a &quot;healthy reference person&quot; of the same age and gender. It analyzes several key accelerators:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3">

                        {/* Blood Pressure (Already Linked) */}
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>
                              <Link
                                href="/health/blood-pressure-calculator"
                                className="hover:underline hover:text-red-700 transition-colors"
                              >
                                Blood Pressure
                              </Link>
                              :
                            </strong>{" "}
                            Higher pressure strains the heart and arteries.
                          </span>
                        </li>

                        {/* Cholesterol */}
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>
                              <Link
                                href="/health/cholesterol-calculator"
                                className="hover:underline hover:text-red-700 transition-colors"
                              >
                                Cholesterol
                              </Link>
                              :
                            </strong>{" "}
                            High LDL or low HDL contributes to plaque buildup.
                          </span>
                        </li>

                        {/* Diabetes */}
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>
                              <Link
                                href="/health/diabetes-risk-calculator"
                                className="hover:underline hover:text-red-700 transition-colors"
                              >
                                Diabetes
                              </Link>
                              :
                            </strong>{" "}
                            High blood sugar damages blood vessels over time.
                          </span>
                        </li>

                      </ul>

                      <ul className="space-y-3">

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>Smoking Status:</strong> Smoking is the fastest way to increase heart age.
                          </span>
                        </li>

                        {/* BMI */}
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>
                              <Link
                                href="/health/bmi-calculator"
                                className="hover:underline hover:text-red-700 transition-colors"
                              >
                                BMI
                              </Link>
                              :
                            </strong>{" "}
                            Excess weight increases the workload on your heart.
                          </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span>
                            <strong>History:</strong> Family history and physical activity levels.
                          </span>
                        </li>

                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Interpretation Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Interpreting Your Heart Age Result</h2>
                <div className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Heart Age Result</th>
                        <th className="px-4 py-3 text-left">What It Means</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-green-50/30">
                        <td className="px-4 py-3 font-bold">Lower than real age</td>
                        <td className="px-4 py-3">Excellent heart health; low risk.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">Same as real age</td>
                        <td className="px-4 py-3">Normal, average risk for your demographic.</td>
                      </tr>
                      <tr className="bg-yellow-50/30">
                        <td className="px-4 py-3 font-bold">+5 years</td>
                        <td className="px-4 py-3 text-yellow-800">Moderate risk; lifestyle changes recommended.</td>
                      </tr>
                      <tr className="bg-red-50/50">
                        <td className="px-4 py-3 font-bold text-red-600">+10 years or more</td>
                        <td className="px-4 py-3 text-red-700">High cardiovascular risk; consult a physician.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Note: A high heart age is not a diagnosis of heart failure—it is a marker for preventable risk.
                </p>
              </section>

              {/* Comparison Matrix */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <ArrowDownCircle className="w-5 h-5 text-red-600" />
                      <Link
                        href="/health/ascvd-risk-calculator"
                        className="hover:underline hover:text-red-700 transition-colors"
                      >
                        ASCVD
                      </Link>{" "}
                      vs. Heart Age
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Both tools use the same data but present it differently:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">ASCVD Risk Score</span>
                        <span className="text-red-700 font-bold">% Chance of heart attack/stroke</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">Heart Age</span>
                        <span className="text-red-700 font-bold">Biological &quot;mileage&quot; of your heart</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <Link
                        href="/health/heart-rate-calculator"
                        className="hover:underline hover:text-red-700 transition-colors"
                      >
                        Max Heart Rate
                      </Link>{" "}
                      Formula
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 text-pretty">
                      Don&apos;t confuse <strong>Heart Age</strong> with <strong>Maximum Heart Rate</strong>.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                      <p className="text-xs uppercase text-gray-400 mb-1">Max HR Calculation</p>
                      <p className="text-lg font-mono font-bold text-red-600">220 − Your Age</p>
                      <p className="text-[10px] text-gray-500 mt-2 italic">Example: Age 40 → Max HR ≈ 180 bpm</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Checklist Section */}
                      <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                          Is Your Heart Healthy? (Checklist)
                        </h2>

                        {/* Image */}
                        <div className="mb-8 flex justify-center">
                          <ClickableImage
                            src="/heart-age-calculator.png"
                            alt="Heart health checklist illustration showing blood pressure, resting heart rate, non-smoking and active lifestyle"
                            width={800}
                            height={450}
                            className="rounded-2xl shadow-lg border border-red-100"
                            priority
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              If you can check most of these boxes, your heart age is likely younger than your birthday:
                            </p>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Blood pressure &lt; 120/80
                              </li>
                              <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Resting heart rate 60–80 bpm
                              </li>
                              <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Non-smoker
                              </li>
                              <li className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Active most days of the week
                              </li>
                            </ul>
                          </div>

                          <div className="not-prose grid grid-cols-1 gap-3">
                            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                              <p className="text-sm font-bold text-orange-900 flex items-center gap-2">
                                <Cigarette className="w-4 h-4" /> Smoking Impact
                              </p>
                              <p className="text-xs text-orange-800 mt-1">
                                Smoking is the #1 heart age accelerator. Quitting can reduce your heart age by years in just 6–12 months.
                              </p>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                                <Scale className="w-4 h-4" /> Abdominal Fat
                              </p>
                              <p className="text-xs text-blue-800 mt-1">
                                Waist circumference is often a better predictor of heart age than total weight or BMI.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
              {/* Reductions Section */}
              <section className="bg-green-500 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Can Heart Age Be Reduced?</h2>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Unlike your chronological age, your heart age is reversible. By addressing your risk factors, you can literally &quot;de-age&quot; your cardiovascular system.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Lower BP</p>
                    <p className="text-sm opacity-90">Reducing systolic by 10 mmHg helps significantly.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Movement</p>
                    <p className="text-sm opacity-90">30 mins of daily walking lowers risk scores.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Sleep</p>
                    <p className="text-sm opacity-90">7–8 hours of sleep regulates heart pressure.</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm font-bold">📉 Many people reduce their heart age by 5–10 years within one year of lifestyle changes.</p>
              </section>

              {/* Paid service CTA */}
              <ServiceCTA
                eyebrow="Track it over time"
                title="See your heart age fall, month after month"
                body="A single result is a snapshot. The value shows up when you track it, because you can tell whether your changes are working instead of guessing. Calqulate Vitals follows your heart age, blood pressure and cholesterol over time and shows the one change that lowers it most for you."
                bullets={[
                  "Heart age trended month over month",
                  "Your single highest-impact next change",
                  "10-year heart and diabetes risk in one place",
                  "Doctor-shareable PDF report",
                ]}
                href="/service/heart-age-tracker"
                cta="Start the Heart Age Tracker"
              />

              {/* In-depth, practical guide */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-gray-900">What your heart age actually tells you</h2>
                <p className="text-gray-600 leading-relaxed">
                  Heart age compares your cardiovascular risk to the risk of an average person at a given age. If you are
                  45 and your result comes back as 55, your risk profile looks like a typical 55 year old. The gap matters
                  more than the exact number, because it shows how much of your risk comes from things you can change.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Most of that gap traces back to four inputs: blood pressure, cholesterol, smoking status, and blood
                  sugar. Each one shifts the result in a predictable direction. Lower your systolic blood pressure or quit
                  smoking, and the number responds, sometimes within a few months. That is why heart age works well as a
                  motivator. You can watch it move.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">How to use the result this week</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start with the single factor that sits furthest from its target. For a lot of people that is blood
                  pressure, and getting systolic toward 120 mmHg tends to move heart age faster than anything else. If you
                  smoke, stopping does more than any supplement or pill. Pick one lever, give it a few weeks, then check
                  again with the same inputs so the comparison is fair.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  A one-time number can mislead you on a bad reading day. Blood pressure swings with stress, sleep and
                  salt, so a single high cuff reading can add years that are not really there. Tracking the trend smooths
                  that out and tells you what is signal and what is noise.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">Where this calculator fits, and where it does not</h3>
                <p className="text-gray-600 leading-relaxed">
                  This tool estimates risk from validated population models like Framingham and the Pooled Cohort
                  Equations. It does not replace a coronary calcium scan, a full lipid panel, or your doctor's judgment.
                  Treat the number as a prompt. Use it to decide which labs to ask for and which questions to bring to
                  your next appointment. If your result is high or you have a family history of early heart disease, book
                  that visit rather than waiting.
                </p>
              </section>

              <RelatedCalculators
                items={[
                  { label: "ASCVD Risk Calculator", href: "/health/ascvd-risk-calculator" },
                  { label: "Framingham Risk Score", href: "/health/framingham-risk-score-calculator" },
                  { label: "Blood Pressure Calculator", href: "/health/blood-pressure-calculator" },
                  { label: "Cholesterol Ratio Calculator", href: "/health/cholesterol-ratio-calculator" },
                  { label: "Diabetes Risk Calculator", href: "/health/diabetes-risk-calculator" },
                  { label: "Heart Age Tracker (paid)", href: "/service/heart-age-tracker" },
                ]}
              />

              <SourcesSection
                items={[
                  { label: "American Heart Association: Understanding your risk", href: "https://www.heart.org/en/health-topics/heart-attack/understand-your-risks-to-prevent-a-heart-attack" },
                  { label: "CDC: Heart disease risk factors", href: "https://www.cdc.gov/heart-disease/risk-factors/" },
                  { label: "Framingham Heart Study", href: "https://www.framinghamheartstudy.org/" },
                  { label: "NHLBI (NIH): Heart-healthy living", href: "https://www.nhlbi.nih.gov/health/heart-healthy-living" },
                  { label: "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease", href: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000678" },
                ]}
              />

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Take Control of Your Heart Health</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  The heart age calculator is a starting point, not a diagnosis. Use these insights to have a more informed conversation with your doctor and prioritize the habits that keep your heart young.
                </p>
              </section>

            </div>

            <RelatedCalculatorsCatalog slug="heart-age-calculator" />

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
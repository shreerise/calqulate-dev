import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import VO2MaxCalculator from "@/components/calculators/vo2-max-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Wind, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  BookOpen, 
  Calculator as CalculatorIcon, 
  AlertCircle, 
  Globe, 
  Dumbbell,
  Timer,
  TrendingUp,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "VO2 Max Calculator: Accurate Estimates & Real-World Interpretation",
  description:
    "Estimate your VO2 max using the Cooper or Rockport tests. Learn how to calculate VO2 max, interpret your score, and improve your cardiovascular fitness.",
  keywords:
    "VO2 max calculator, how to calculate VO2 max, calculate VO2 max, estimate VO2 max, Garmin VO2 max calculation, Cooper test formula, Rockport walk test, aerobic capacity calculator, fitness level calculator",
}

const faqs = [
  {
    question: "How accurate is a VO₂ max calculator?",
    answer:
      "Most calculators are within 5–15% of lab values when input data (like heart rate and distance) is accurate. While not as precise as a metabolic cart test, they are excellent for tracking fitness trends over time.",
  },
  {
    question: "How often should I calculate VO₂ max?",
    answer:
      "Every 4–8 weeks is sufficient. VO₂ max is a physiological adaptation that changes slowly in response to consistent training, so daily or weekly checks won't show meaningful progress.",
  },
  {
    question: "Why does my Garmin VO₂ max change?",
    answer:
      "Garmin calculates VO₂ max based on heart rate, pace, and HRV. Changes reflect your recent training load, heart-rate accuracy (chest straps are better than wrist sensors), and recovery status. Heat or stress can also temporarily lower the estimate.",
  },
  {
    question: "Can beginners calculate VO₂ max?",
    answer:
      "Yes. Beginners should typically use walking-based tests like the Rockport 1-mile walk test rather than high-intensity running tests to ensure safety and accuracy.",
  },
  {
    question: "Is VO₂ max linked to fat loss?",
    answer:
      "Indirectly. A higher VO₂ max improves your endurance and ability to perform higher-intensity workouts, which can lead to higher calorie burn. However, the number itself doesn't directly dictate fat loss.",
  },
]

export default function VO2MaxCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="VO2 Max Calculator"
        description="Estimate your maximum oxygen consumption (VO2 max) using performance-based field tests and understand your aerobic fitness level."
        url="https://calqulate.net/health/vo2-max-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                VO₂ Max Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Use our VO2 max calculator to estimate how efficiently your body uses oxygen during intense exercise. 
                Since lab testing is expensive and inaccessible, calculators provide a practical, safe alternative.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                A good calculator estimates VO₂ max using age, sex, resting/max heart rate, exercise performance, and body weight. 
                <strong> Important:</strong> VO₂ max calculators provide estimates, not clinical diagnoses.
              </p>
            </div>

            {/* Calculator Component */}
            <VO2MaxCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What Is VO₂ Max? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What Is VO₂ Max?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  VO₂ max is the maximum amount of oxygen your body can use per minute per kilogram of body weight (ml/kg/min) during maximal effort. 
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <p className="font-bold text-gray-900 mb-2">In simple terms:</p>
                  <p className="text-gray-700 mb-4">It’s a measure of your cardiorespiratory fitness. Higher VO₂ max generally means:</p>
                  <ul className="grid md:grid-cols-3 gap-4 list-none pl-0">
                    <li className="flex items-center gap-2 text-sm font-medium"><TrendingUp className="text-blue-600 w-4 h-4" /> Better endurance</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><Heart className="text-red-600 w-4 h-4" /> More efficient heart/lungs</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><Wind className="text-green-600 w-4 h-4" /> Higher aerobic capacity</li>
                  </ul>
                </div>
              </section>

              {/* How Is VO₂ Max Calculated? */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  How Is VO₂ Max Calculated?
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold">1️⃣ Laboratory Testing (Gold Standard)</h3>
                    <p className="text-gray-700">Uses metabolic carts to measure oxygen & carbon dioxide directly. It is very accurate but very expensive.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">2️⃣ Field Tests (Most Practical)</h3>
                    <p className="text-gray-700">Used by most tools to calculate VO2 max: Cooper 12‑minute run test, Rockport 1‑mile walk test, or Step tests.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">3️⃣ Algorithm-Based Estimates (Wearables)</h3>
                    <p className="text-gray-700">Used by smartwatches. When people ask “how is VO2 max calculated?”, the answer depends on the method—not all numbers are equal.</p>
                  </div>
                </div>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-blue-500" />
                      Popular Formulas to Calculate VO₂ Max
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Field formulas used by online tools to estimate your aerobic capacity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <h3 className="font-bold text-gray-900 mb-2">🏃 Cooper Test Formula:</h3>
                      <p className="bg-gray-100 p-3 rounded-lg font-mono mb-4 text-center">
                        VO₂ max = (Distance in meters − 504.9) ÷ 44.73
                      </p>
                      <h3 className="font-bold text-gray-900 mb-2">🚶 Rockport Walk Test:</h3>
                      <p className="text-gray-600 italic mb-2">Uses a complex regression including:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Time to walk 1 mile</li>
                        <li>Heart rate at finish</li>
                        <li>Age, Weight, and Gender</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-blue-800 font-bold text-center mb-2">Why use formulas?</p>
                      <p className="text-blue-700 text-sm text-center">
                        Field tests are accessible, cost-free, and provide a benchmark that correlates strongly with clinical results when performed under consistent conditions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Wearables Comparison */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <h2 className="text-2xl font-bold mb-4">VO₂ Max Calculator vs Wearables</h2>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">How Does Garmin Calculate VO₂ Max?</h3>
                <p className="mb-4">Garmin does not measure oxygen directly. It estimates VO₂ max using heart rate variability, running speed or cycling power, historical training data, and Firstbeat algorithms.</p>
                <p className="mb-4 font-medium">That’s why:</p>
                <ul className="grid md:grid-cols-2 gap-4 list-none pl-0 text-sm">
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">✓ Values change over time based on training load</li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">✓ Indoor vs outdoor runs differ due to GPS/air resistance</li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">✓ Poor heart-rate data (wrist vs strap) reduces accuracy</li>
                  <li className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">✓ Environment (Heat/Altitude) affects the algorithm</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">So when asking “how does Garmin calculate VO2 max”, remember—it’s an evolving estimate, not a lab test.</p>
              </section>

              {/* Interpreting Results Table */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>What Is a “Good” VO₂ Max?</CardTitle>
                    <CardDescription>
                      General Reference Ranges for Adults (ml/kg/min).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-2 text-left">Category</th>
                            <th className="border px-4 py-2 text-left">Range (ml/kg/min)</th>
                            <th className="border px-4 py-2 text-left">Fitness Context</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium text-red-600">Low</td>
                            <td className="border px-4 py-2">&lt; 30</td>
                            <td className="border px-4 py-2">Sedentary; potential cardiovascular health risks.</td>
                          </tr>
                          <tr className="bg-blue-50/30">
                            <td className="border px-4 py-2 font-medium text-blue-600">Average</td>
                            <td className="border px-4 py-2">30 – 45</td>
                            <td className="border px-4 py-2">Moderate activity level; standard for most healthy adults.</td>
                          </tr>
                          <tr className="bg-green-50/30">
                            <td className="border px-4 py-2 font-medium text-green-600">Good</td>
                            <td className="border px-4 py-2">45 – 55</td>
                            <td className="border px-4 py-2">Active individual; regular aerobic training.</td>
                          </tr>
                          <tr className="bg-orange-50/30">
                            <td className="border px-4 py-2 font-medium text-orange-600">Excellent</td>
                            <td className="border px-4 py-2">55+</td>
                            <td className="border px-4 py-2">High-level athletes or highly trained endurance runners.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground italic">Note: Age, gender, and activity level matter more than direct comparisons. Context beats comparison.</p>
                  </CardContent>
                </Card>
              </section>

              {/* Content Gaps & Reality Check */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="text-orange-500" /> What the Number Is (and Isn't)
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><b>Your calculated max VO₂ is:</b></p>
                    <ul className="list-none pl-0 space-y-1">
                      <li>✔ A performance benchmark</li>
                      <li>✔ A training progress indicator</li>
                      <li>✔ A cardiovascular health proxy</li>
                    </ul>
                    <p className="pt-2"><b>It is not:</b></p>
                    <ul className="list-none pl-0 space-y-1">
                      <li>❌ A medical diagnosis</li>
                      <li>❌ A fat-loss guarantee</li>
                      <li>❌ A competition ranking</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <BookOpen className="text-blue-500" /> Common Content Gaps
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">Most VO₂ max pages fail to explain why your numbers might fluctuate:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li><b>Daily Variability:</b> Sleep, stress, and hydration.</li>
                    <li><b>Temporary Drops:</b> Overtraining or minor illness.</li>
                    <li><b>Surface Matters:</b> Treadmill scores are often higher than outdoor trails.</li>
                    <li><b>Specificity:</b> A high cyclist VO2 max doesn't always transfer to running.</li>
                  </ul>
                </div>
              </section>

              {/* Regional Factors */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-green-600" /> VO₂ Max in Real Life (Regional)
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">USA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      Heavy wearable-driven tracking. Running and cycling are the dominant metrics for aerobic assessment.
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">UK</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      Mixed indoor/outdoor training. Walking-based estimates are common due to the popularity of recreational hiking/walking.
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">India</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      Heat & humidity significantly affect results. Walking tests are often more reliable than high-intensity running tests in local climates.
                    </CardContent>
                  </Card>
                  </div>
                </section>

              {/* How to Improve */}
              <section>
                <Card className="not-prose border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-green-600" />
                      How to Improve VO₂ Max (Evidence-Based)
                    </CardTitle>
                    <CardDescription>
                      No calculator improves VO₂ max — training does.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">1</div>
                        <p><b>Interval Training (HIIT):</b> High-intensity bursts push the heart to its maximum capacity.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">2</div>
                        <p><b>Progressive Endurance:</b> Gradually increasing weekly volume builds the aerobic base.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">3</div>
                        <p><b>Adequate Recovery:</b> Oxygen processing capacity improves during rest, not during the workout.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">4</div>
                        <p><b>Consistency:</b> Aerobic gains take weeks to build but can decline quickly with inactivity.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Summary Checklist */}
              <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Final Takeaway: VO₂ Max Calculator</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Use it as a Trend Tracker:</b> Monitor progress every 2 months.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Motivation Tool:</b> Use the score to set new fitness goals.</p>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Performance Reference:</b> Compare against your own historical data.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Expectation:</b> Use it as an estimate, not a clinical health judgment.</p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Final Note */}
              <section className="text-center pb-12">
                <h2 className="text-3xl font-bold mb-4">Master Your Aerobic Potential</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A universal VO2 max calculator must consider environment and training specificity, not just simple formulas. 
                  By understanding what the number means and how it is calculated, you can better tailor your training for long-term cardiovascular health.
                </p>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
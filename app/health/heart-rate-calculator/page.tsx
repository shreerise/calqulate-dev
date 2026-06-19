import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import HeartRateCalculator from "@/components/calculators/heart-rate-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Heart,
  Activity,
  Zap,
  Timer,
  Target,
  TrendingUp,
  Flame,
  ShieldCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Gauge,
  Clock,
  User,
  Users,
  Dumbbell,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Target & Max Heart Rate Calculator | Find Your Training Zones",
  description:
    "Estimate maximum heart rate and find your target training zones. Use our calculator to determine optimal beats per minute for fat loss, endurance, and cardio.",
  keywords:
    "max heart rate calculator, target heart rate calculator, beats per minute, exercise intensity, resting heart rate rhr, target heart rates chart, maximum heart rate",
  alternates: {
    canonical: "https://calqulate.net/health/heart-rate-calculator",
  },
  openGraph: {
    title: "Target & Max Heart Rate Calculator | Find Your Training Zones",
    description: "Estimate maximum heart rate and find your target training zones. Use our calculator to determine optimal beats per minute for fat loss, endurance, and cardio.",
    url: "https://calqulate.net/health/heart-rate-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Target & Max Heart Rate Calculator | Find Your Training Zones",
    description: "Estimate maximum heart rate and find your target training zones. Use our calculator to determine optimal beats per minute for fat loss, endurance, and cardio.",
  },
}

const faqs = [
  {
    question: "How do I estimate maximum heart rate accurately?",
    answer:
      "The most common method is the standard formula of 220 minus your age. For a 40-year-old, this equals 180 beats per minute. The Tanaka formula (208 minus 0.7 times age) provides more accuracy for adults over 40. A 40-year-old using Tanaka would calculate 208 minus 28 to get 180 beats per minute.",
  },
  {
    question: "What is the Karvonen formula and how does it calculate heart rate reserve?",
    answer:
      "The Karvonen formula determines your target training zone using your Heart Rate Reserve (HRR). You find your HRR by subtracting your resting heart rate from your maximum heart rate. You then multiply the HRR by your desired intensity percentage and add the resting heart rate back in.",
  },
  {
    question: "What is a normal resting heart rate (RHR)?",
    answer:
      "A normal resting heart rate for adults ranges from 60 to 100 beats per minute. People who are physically active often have resting rates between 40 and 60 beats per minute. Regular exercise conditions the heart to pump more blood with fewer beats.",
  },
  {
    question: "What is Zone 2 heart rate and why is it important?",
    answer:
      "Zone 2 represents 60 to 70 percent of your maximum heart rate. Your body efficiently burns fat for fuel and clears lactate at this moderate intensity. Endurance athletes spend most of their training time in Zone 2 to build cardiovascular stamina without overtraining.",
  },
  {
    question: "How accurate are mathematical formulas compared to a clinical stress test?",
    answer:
      "Age-based formulas have a standard deviation of about 10 to 12 beats per minute. Your true maximum could be slightly higher or lower than the calculated number. A clinical stress test on a treadmill supervised by a doctor provides the exact maximum limit of your cardiovascular system.",
  },
  {
    question: "What is the difference between maximum heart rate and target heart rate?",
    answer:
      "Maximum heart rate is the absolute highest number of heart beats your body can sustain during severe physical exertion. Target heart rate is a specific percentage of that maximum. Exercising within your target zone ensures you meet specific fitness goals safely.",
  },
  {
    question: "How do I calculate my heart rate reserve (HRR)?",
    answer:
      "You calculate Heart Rate Reserve by subtracting your resting heart rate from your maximum heart rate. If your maximum is 180 and your resting rate is 65, your HRR is 115. This number represents the functional range your heart operates within during exercise.",
  },
]

export default function HeartRateCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <CalculatorSchema
        name="Target Heart Rate Calculator"
        description="Estimate maximum heart rate and calculate specific target zones for cardiovascular training. Measure your optimal beats per minute for moderate intensity and high intensity workouts."
        url="https://calqulate.net/health/heart-rate-calculator"
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
              Target & Max Heart Rate Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Use our max heart rate calculator to estimate your cardiovascular ceiling. Find your exact training zones to optimize fat burning and endurance.
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

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "5", label: "Training zones" },
              { value: "Karvonen", label: "Method" },
              { value: "Free", label: "Price" },
              { value: "No", label: "Sign-up" },
              { value: "Instant", label: "Results" },
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
            <HeartRateCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-green-600" />
                  How to Estimate Maximum Heart Rate
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Your maximum heart rate acts as the foundation for all training zone calculations. It represents the highest number of heart beats you can sustain during maximum physical effort. We use two widely studied formulas to estimate maximum heart rate.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 overflow-hidden">
                    <CardHeader className="bg-blue-50 pb-3">
                      <CardTitle className="text-lg text-blue-800">Standard Formula</CardTitle>
                      <CardDescription className="text-blue-600">Best for quick baseline estimates</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-mono font-bold text-blue-700 text-center py-4 bg-white rounded-lg border-2 border-blue-200 mb-4">
                        Max HR = 220 - Age
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800"><strong>Example:</strong> Age 40</p>
                        <p className="text-sm text-blue-700">220 - 40 = <strong>180 beats per minute</strong></p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 overflow-hidden">
                    <CardHeader className="bg-green-50 pb-3">
                      <CardTitle className="text-lg text-green-800">Tanaka Formula</CardTitle>
                      <CardDescription className="text-green-600">More precise for adults over 40</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-mono font-bold text-green-700 text-center py-4 bg-white rounded-lg border-2 border-green-200 mb-4">
                        Max HR = 208 - (0.7 × Age)
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800"><strong>Example:</strong> Age 40</p>
                        <p className="text-sm text-green-700">208 - 28 = <strong>180 beats per minute</strong></p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>💡 Why use the Tanaka method?</strong> Clinical research indicates that the standard 220-age formula frequently underestimates maximum heart capacity in healthy adults over 40. Exercise physiologists now prefer the Tanaka equation for older demographics.
                  </p>
                </div>
              </section>

              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Calculator className="w-5 h-5" />
                      The Karvonen Formula and Heart Rate Reserve
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      Accounting for your current fitness level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-6">
                      Generic calculators ignore your current cardiovascular condition. A trained athlete and a sedentary office worker of the same age have distinct metabolic profiles. The Karvonen Method factors in your Resting Heart Rate (RHR) to provide a personalized exercise target.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Measure Your Resting Pulse</p>
                          <p className="text-sm text-gray-600">Count your beats per minute for 60 seconds immediately upon waking. Normal averages fall between 60 and 100.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Find Heart Rate Reserve</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg font-mono text-rose-700">
                            HRR = Max HR - Resting HR
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Calculate Target Heart Rate</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg font-mono text-rose-700">
                            Target HR = (HRR × Intensity %) + Resting HR
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="font-bold text-green-800 mb-2">📊 Practical Example:</p>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>Age: 40 years. Resting HR: 60 bpm.</p>
                        <p>Max HR: 180 bpm.</p>
                        <p>Heart Rate Reserve: 180 - 60 = <strong>120 bpm</strong>.</p>
                        <p>Zone 2 Target (60% intensity): (120 × 0.60) + 60 = <strong>132 bpm</strong>.</p>
                      </div>
                      <p className="text-xs text-green-600 mt-3 italic">
                        Note: Without factoring in resting rate, basic 60% intensity equals 108 bpm. That pace is too slow to trigger cardiovascular adaptation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" />
                  Exercising Within Your Target Zones
                </h2>
                <p className="mb-6 text-gray-700">
                  Exercising within your target zone produces distinct physical changes. Tracking your exercise intensity ensures you build stamina, lose fat, and improve your overall fitness level systematically.
                </p>

                <div className="space-y-4 not-prose">
                  <div className="p-5 bg-gray-50 rounded-2xl border-l-4 border-gray-400">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        Zone 1: Active Recovery
                      </h3>
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700">50-60% Max HR</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2"><strong>Feeling:</strong> Very light effort. You can maintain a full conversation.</p>
                    <p className="text-sm text-gray-600"><strong>Purpose:</strong> Warm-ups, cool-downs, and promoting blood flow to muscles.</p>
                  </div>

                  <div className="p-5 bg-green-50 rounded-2xl border-l-4 border-green-500 ring-2 ring-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-green-800 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-green-600" />
                        Zone 2: Aerobic Base & Fat Burning
                      </h3>
                      <span className="px-3 py-1 bg-green-200 rounded-full text-sm font-semibold text-green-700">60-70% Max HR</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2"><strong>Feeling:</strong> Comfortable effort. You can speak in complete sentences.</p>
                    <p className="text-sm text-green-700 mb-3"><strong>Purpose:</strong> Building endurance and prioritizing fat metabolism.</p>
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>⭐ The Endurance Sweet Spot:</strong> Long-distance runners spend 80 percent of their training in Zone 2. This moderate intensity conditions the body to use fat as a primary fuel source while clearing lactate efficiently.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-blue-800 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-blue-600" />
                        Zone 3: Moderate to Hard Cardio
                      </h3>
                      <span className="px-3 py-1 bg-blue-200 rounded-full text-sm font-semibold text-blue-700">70-80% Max HR</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2"><strong>Feeling:</strong> Breathing becomes noticeably heavier. Speaking requires effort.</p>
                    <p className="text-sm text-blue-700"><strong>Purpose:</strong> Enhancing overall cardiovascular capacity and total calorie burn.</p>
                  </div>

                  <div className="p-5 bg-orange-50 rounded-2xl border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-orange-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        Zone 4: High Intensity Threshold
                      </h3>
                      <span className="px-3 py-1 bg-orange-200 rounded-full text-sm font-semibold text-orange-700">80-90% Max HR</span>
                    </div>
                    <p className="text-sm text-orange-700 mb-2"><strong>Feeling:</strong> Difficult. Muscles start burning. Conversation is limited to single words.</p>
                    <p className="text-sm text-orange-700"><strong>Purpose:</strong> Elevating the lactate threshold and performing interval training.</p>
                  </div>

                  <div className="p-5 bg-red-50 rounded-2xl border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-red-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        Zone 5: Maximum Effort
                      </h3>
                      <span className="px-3 py-1 bg-red-200 rounded-full text-sm font-semibold text-red-700">90-100% Max HR</span>
                    </div>
                    <p className="text-sm text-red-700 mb-2"><strong>Feeling:</strong> Exhausting. You can only sustain this pace for short bursts.</p>
                    <p className="text-sm text-red-700"><strong>Purpose:</strong> Improving peak sprint performance and absolute athletic power.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-600" />
                  Target Heart Rates Chart by Age
                </h2>
                <p className="mb-4 text-gray-700">Use this target heart rates chart as a quick reference guide. These numbers derive from the standard calculation method.</p>
                
                <Card className="not-prose overflow-hidden border-green-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-green-600 text-white">
                          <th className="px-4 py-3 text-left font-bold">Age</th>
                          <th className="px-4 py-3 text-left font-bold">Zone 2 (Fat Burn)</th>
                          <th className="px-4 py-3 text-left font-bold">Zone 3 (Cardio)</th>
                          <th className="px-4 py-3 text-left font-bold">Zone 4 (HIIT)</th>
                          <th className="px-4 py-3 text-left font-bold">Max HR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-semibold">20</td>
                          <td className="px-4 py-3 text-green-700">120-140 bpm</td>
                          <td className="px-4 py-3 text-blue-700">140-160 bpm</td>
                          <td className="px-4 py-3 text-orange-700">160-180 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">200 bpm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-semibold">30</td>
                          <td className="px-4 py-3 text-green-700">114-133 bpm</td>
                          <td className="px-4 py-3 text-blue-700">133-152 bpm</td>
                          <td className="px-4 py-3 text-orange-700">152-171 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">190 bpm</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold">40</td>
                          <td className="px-4 py-3 text-green-700">108-126 bpm</td>
                          <td className="px-4 py-3 text-blue-700">126-144 bpm</td>
                          <td className="px-4 py-3 text-orange-700">144-162 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">180 bpm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-semibold">50</td>
                          <td className="px-4 py-3 text-green-700">102-119 bpm</td>
                          <td className="px-4 py-3 text-blue-700">119-136 bpm</td>
                          <td className="px-4 py-3 text-orange-700">136-153 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">170 bpm</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold">60</td>
                          <td className="px-4 py-3 text-green-700">96-112 bpm</td>
                          <td className="px-4 py-3 text-blue-700">112-128 bpm</td>
                          <td className="px-4 py-3 text-orange-700">128-144 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">160 bpm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-semibold">70</td>
                          <td className="px-4 py-3 text-green-700">90-105 bpm</td>
                          <td className="px-4 py-3 text-blue-700">105-120 bpm</td>
                          <td className="px-4 py-3 text-orange-700">120-135 bpm</td>
                          <td className="px-4 py-3 font-bold text-green-700">150 bpm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <p className="mt-4 text-sm text-gray-600 italic">
                  Note: If you want personalized training brackets based on your fitness level, use the interactive calculator tool above.
                </p>
              </section>

              <section className="py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Timer className="w-6 h-6 text-green-600" />
                  Understanding Your Resting Heart Rate
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Individuals who are physically active generally maintain a lower resting heart rate. Engaging in regular exercise strengthens the heart muscle. This conditioning allows the heart to pump more blood per contraction, reducing the total number of beats per minute required while resting.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 not-prose">
                  <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-green-700 mb-1">40-60</p>
                    <p className="font-semibold text-green-800">bpm</p>
                    <p className="text-sm text-green-600 mt-2">Highly Active</p>
                  </div>
                  <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-blue-700 mb-1">60-80</p>
                    <p className="font-semibold text-blue-800">bpm</p>
                    <p className="text-sm text-blue-600 mt-2">Normal Range</p>
                  </div>
                  <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-amber-700 mb-1">80-100</p>
                    <p className="font-semibold text-amber-800">bpm</p>
                    <p className="text-sm text-amber-600 mt-2">Elevated Resting</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  Comparing Formulas vs. Clinical Tests
                </h2>
                
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Method</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Accuracy Profile</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-700">Medical Stress Test</td>
                        <td className="px-6 py-4">Exact Measurement</td>
                        <td className="px-6 py-4">Clinical assessments, professional athletes</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-blue-700">Tanaka Equation</td>
                        <td className="px-6 py-4">Reliable within 7 bpm</td>
                        <td className="px-6 py-4">Individuals aged 40 and older</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-700">Standard Equation</td>
                        <td className="px-6 py-4">Varies by 10-12 bpm</td>
                        <td className="px-6 py-4">General population baseline</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-rose-700">Karvonen Method</td>
                        <td className="px-6 py-4">Highly personalized</td>
                        <td className="px-6 py-4">Establishing target training zones</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <p className="mt-4 text-gray-700">
                  Mathematical models provide a convenient starting point. If you require absolute clinical precision, a physician can perform a graded stress test. During tests like the Bruce Protocol, medical staff monitor your blood pressure and heart function on a treadmill as the incline and speed increase. Since most people lack access to a laboratory stress test, our calculator offers the most practical alternative for guiding daily workouts.
                </p>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                  Practical Training Guidelines
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 bg-white border border-green-200 rounded-2xl">
                    <Flame className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Fat Loss</h4>
                    <p className="text-sm text-gray-600 mb-3">Keep most of your cardio in Zone 2. Integrate occasional high-intensity sessions to elevate your resting metabolism.</p>
                    <p className="text-xs text-green-600 font-semibold">Primary Focus: Moderate Intensity</p>
                  </div>
                  <div className="p-5 bg-white border border-blue-200 rounded-2xl">
                    <Heart className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-bold text-blue-800 mb-2">Endurance</h4>
                    <p className="text-sm text-gray-600 mb-3">Establish an aerobic base with sustained Zone 2 workouts. Gradually increase your session duration to prevent injury.</p>
                    <p className="text-xs text-blue-600 font-semibold">Primary Focus: Sustained Duration</p>
                  </div>
                  <div className="p-5 bg-white border border-orange-200 rounded-2xl">
                    <Zap className="w-8 h-8 text-orange-600 mb-3" />
                    <h4 className="font-bold text-orange-800 mb-2">Performance</h4>
                    <p className="text-sm text-gray-600 mb-3">Alternate between your baseline aerobic work and brief, maximum effort sprints in Zone 5.</p>
                    <p className="text-xs text-orange-600 font-semibold">Primary Focus: Variable Intervals</p>
                  </div>
                </div>
              </section>

              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  Calculator Methodology
                </h2>
                <p className="mb-6 opacity-90">We programmed this specific tool following peer-reviewed mathematical guidelines.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Calculates using standard and Tanaka models</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Applies Karvonen logic for specific zones</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Maintains complete user privacy</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Requires zero mandatory logins</span>
                  </div>
                </div>
              </section>

              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5" /> Medical Notice
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  These metrics serve an educational purpose. Genetics, prescribed medications, and pre-existing health conditions influence cardiovascular behavior. Always consult a physician before initiating a rigorous fitness routine. People with a history of abnormal blood pressure or those taking beta blockers must receive direct medical clearance.
                </p>
              </section>

              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-500 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Track Your Physical Progress</h3>
                    <p className="text-green-100 max-w-md">
                      Measure how your cardiovascular work affects your physical composition using our dedicated body fat assessment tool.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/body-fat-calculator">
                      Calculate Body Fat <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

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
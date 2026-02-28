import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import RunningPaceCalculator from "@/components/calculators/running-pace-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
  Timer,
  Footprints,
  Trophy,
  ArrowLeftRight,
  Info,
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  Table,
  LineChart,
  History,
  Activity,
  TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Running Pace Calculator: Accurate Run Pace, Split & Finish Time Estimator",
  description:
    "Plan your race strategy with our running pace calculator. Convert pace between km and miles, estimate finish times for 5K, 10K, and Marathons, and track performance.",
  keywords:
    "running pace calculator, calculate running pace, marathon pace chart, 10k pace calculator, pace conversion km to miles, run walk pace calculator, finish time estimator",
}

const faqs = [
  {
    question: "How to calculate running pace?",
    answer:
      "To calculate your pace, divide your total running time by the total distance covered. Formula: Pace = Time ÷ Distance.",
  },
  {
    question: "How do you calculate running pace manually?",
    answer:
      "Take your total minutes and divide them by your distance in kilometers or miles. For example, 30 minutes divided by 5 km equals a 6 min/km pace.",
  },
  {
    question: "How do I calculate my running pace?",
    answer:
      "You can use an online running pace calculator like this one, or a simple division formula using your run duration and distance.",
  },
  {
    question: "What is a good running pace?",
    answer:
      "It varies by experience. Beginners typically aim for 6–8 min/km, while intermediate runners often hit 5–6 min/km, and advanced athletes run at 3–5 min/km.",
  },
  {
    question: "How accurate are online pace calculators?",
    answer:
      "Mathematically, they are 100% exact. However, real-world performance predictions depend on external conditions like elevation, wind, and fatigue.",
  },
]

export default function RunningPaceCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Running Pace Calculator"
        description="Estimate your running pace, finish times, and race splits for 5K, 10K, Half Marathon, and Full Marathon."
        url="https://calqulate.net/health/running-pace-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Running Pace Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Accurate Run Pace, Split & Finish Time Estimator (Updated 2026). Whether you’re training for a 5K, 10K, or a full marathon, understanding your pace is essential for success.
              </p>
            </div>

            {/* Calculator Component */}
            <RunningPaceCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Definition Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is a Running Pace Calculator?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A running pace calculator determines how fast you are running based on distance and time. It helps answer: <strong>How fast am I running? What pace do I need for my target time? How long will I take to finish?</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <Timer className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-xs uppercase">Pace Tracking</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <Trophy className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-xs uppercase">Finish Estimator</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <LineChart className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="font-bold text-green-800 text-xs uppercase">Race Strategy</p>
                  </div>
                </div>
              </section>

              {/* Formula Card */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="text-lg font-bold text-green-800 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> How to Calculate Running Pace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-white border-2 border-green-600 border-dashed p-6 rounded-xl text-center mb-6">
                      <p className="text-2xl md:text-3xl font-bold text-green-700">Pace = Time ÷ Distance</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Example:</strong> If you run 5 km in 30 minutes, your calculation is 30 ÷ 5 = <strong>6 minutes per km pace.</strong>
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Pace Conversion Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ArrowLeftRight className="w-6 h-6 text-green-600" />
                  Pace Conversion (Min/Km ↔ Min/Mile)
                </h2>
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Min/km</th>
                        <th className="px-6 py-4 text-left font-bold">Min/mile</th>
                        <th className="px-6 py-4 text-left font-bold">Approx Speed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-3">4:00</td><td className="px-6 py-3">6:26</td><td className="px-6 py-3">15.0 km/h</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-3">5:00</td><td className="px-6 py-3">8:03</td><td className="px-6 py-3">12.0 km/h</td></tr>
                      <tr><td className="px-6 py-3">6:00</td><td className="px-6 py-3">9:39</td><td className="px-6 py-3">10.0 km/h</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-3">7:00</td><td className="px-6 py-3">11:16</td><td className="px-6 py-3">8.6 km/h</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Marathon Pace Chart */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Table className="w-6 h-6 text-green-600" />
                  Marathon Pace Chart (Race Strategy)
                </h2>
                <p className="mb-6 text-gray-700">For longer races, pacing discipline is vital to prevent early burnout. Use these targets to plan your next full marathon.</p>
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Target Finish</th>
                        <th className="px-6 py-4 text-left font-bold">Required Pace (per km)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 font-medium">3:00:00</td><td className="px-6 py-4">4:16 min/km</td></tr>
                      <tr><td className="px-6 py-4 font-medium">3:30:00</td><td className="px-6 py-4">4:59 min/km</td></tr>
                      <tr><td className="px-6 py-4 font-medium">4:00:00</td><td className="px-6 py-4">5:41 min/km</td></tr>
                      <tr><td className="px-6 py-4 font-medium">4:30:00</td><td className="px-6 py-4">6:24 min/km</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Run Walk & Negative Splits */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-green-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Footprints className="text-green-600 w-5 h-5" /> Run Walk Strategy
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    A run-walk pace calculator is useful for beginners. For example, if you run 5 mins at 5:30 pace and walk 1 min at 10:00 pace, your blended pace will improve endurance without overtraining.
                  </p>
                </div>
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" /> Negative Splits
                  </h3>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Advanced runners often use <strong>negative splits</strong>—running the second half of a race faster than the first. This strategy improves overall performance and reduces mid-race burnout.
                  </p>
                </div>
              </section>

              {/* Factors for Accuracy */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Real-World Performance Factors
                </h2>
                <p className="mb-6 opacity-90">While pace calculation is mathematically exact, these real-world factors can affect your actual race day performance:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Elevation & Hills</div>
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Wind Resistance</div>
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Temperature/Heat</div>
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Race Fatigue</div>
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Proper Hydration</div>
                  <div className="bg-white/10 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-200" /> Terrain Type</div>
                </div>
              </section>

              {/* How to Improve Pace */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Improve Your Running Pace</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-green-800 mb-2">Training Techniques</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• <strong>Interval Training:</strong> Short bursts at a much faster pace.</li>
                      <li>• <strong>Tempo Runs:</strong> Sustained challenging efforts to build threshold.</li>
                      <li>• <strong>Strength Training:</strong> Improves muscle efficiency and drive.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-green-800 mb-2">Consistency & Recovery</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• <strong>Consistency:</strong> Aim for at least 3–4 runs per week.</li>
                      <li>• <strong>Sleep:</strong> Essential for muscle repair and metabolic health.</li>
                      <li>• <strong>Rest Days:</strong> Prevents injury and overtraining plateaus.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Pace vs Calories */}
              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-800 uppercase tracking-tight">
                  <Flame className="w-5 h-5" /> Running Pace for Weight Loss
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  A faster pace results in a higher calorie burn. For a 70 kg person: <br />
                  • <strong>5:00 min/km pace:</strong> ~700 calories/hour <br />
                  • <strong>6:30 min/km pace:</strong> ~550 calories/hour <br />
                  Pace directly impacts energy expenditure and metabolic results.
                </p>
              </section>

              {/* Comparison Section */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <History className="text-green-600 w-5 h-5" /> Legacy vs. Modern Tools
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Many runners search for a "cool running pace calculator." Modern tools improve on legacy versions by including elevation correction, fatigue modeling, and specific split strategy calculations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <ArrowLeftRight className="text-green-600 w-5 h-5" /> Pace vs. Speed
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    While related, <strong>Speed</strong> is distance per unit time (mph/kph), whereas <strong>Pace</strong> is time per unit distance (min/km). Runners track pace to stay consistent during races.
                  </p>
                </div>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-green-600" />
                  Final Takeaway
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  "Whether you are tracking splits for a 5K or a marathon, consistency and smart pacing are the keys to long-term athletic success. Use this calculator as a tool to guide your training and race day strategy."
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Burning calories through running?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you've calculated your pace, find out exactly how many calories you're burning during your runs.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/calories-burned-calculator">
                      Calories Burned Tool <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
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
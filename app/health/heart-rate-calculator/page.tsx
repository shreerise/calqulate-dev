import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import HeartRateCalculator from "@/components/calculators/heart-rate-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
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
  Dumbbell
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Heart Rate Calculator: Find Your Max HR, Target Zones & HRR | Free Tool",
  description:
    "Calculate your maximum heart rate, target heart rate zones, and heart rate reserve (HRR) using the Karvonen formula. Find your Zone 2 fat-burning and cardio training zones instantly.",
  keywords:
    "heart rate calculator, maximum heart rate calculator, max heart rate calculator, target heart rate calculator, resting heart rate calculator, karvonen formula calculator, hrr calculator, heart rate reserve calculator, heart rate formula",
}

// Long-tail GSC queries converted to FAQs
const faqs = [
  {
    question: "How do I calculate my maximum heart rate?",
    answer:
      "The simplest method is the standard formula: 220 minus your age. For a 40-year-old, that's 220 - 40 = 180 bpm. However, the Tanaka formula (208 - 0.7 × age) is more accurate for adults over 40. For example, a 40-year-old using Tanaka: 208 - 28 = 180 bpm. For the most accurate result, use a graded exercise test supervised by a medical professional.",
  },
  {
    question: "What is the Karvonen formula and how does it calculate heart rate reserve?",
    answer:
      "The Karvonen formula calculates target heart rate using your Heart Rate Reserve (HRR). First, find your HRR: Maximum Heart Rate minus Resting Heart Rate. Then calculate target zone: (HRR × intensity percentage) + Resting Heart Rate. Example: If your max HR is 180 and resting HR is 60, your HRR is 120. For Zone 2 (60% intensity): (120 × 0.60) + 60 = 132 bpm.",
  },
  {
    question: "What is a normal resting heart rate?",
    answer:
      "A normal resting heart rate for adults ranges from 60 to 100 bpm. Well-trained athletes often have resting heart rates between 40-60 bpm due to improved cardiovascular efficiency. To measure accurately, check your pulse first thing in the morning before getting out of bed, counting beats for 60 seconds.",
  },
  {
    question: "What is Zone 2 heart rate and why is it important?",
    answer:
      "Zone 2 is 60-70% of your maximum heart rate. It's called the 'aerobic base' zone because your body efficiently burns fat for fuel and clears lactate at this intensity. Elite endurance athletes spend approximately 80% of their training in Zone 2. It builds cardiovascular endurance without causing burnout or overtraining.",
  },
  {
    question: "How accurate are heart rate calculator formulas compared to lab tests?",
    answer:
      "Age-based formulas like '220 minus age' have a standard deviation of about 10-12 bpm, meaning your actual max HR could be 10-12 beats higher or lower than calculated. The Tanaka formula is slightly more accurate for adults over 40. For precise measurements, a VO2 max test or graded exercise test provides the most accurate maximum heart rate.",
  },
  {
    question: "What is the difference between maximum heart rate and target heart rate?",
    answer:
      "Maximum heart rate (MHR) is the highest number of beats per minute your heart can achieve during all-out effort. Target heart rate is a specific zone (percentage of MHR) you aim to maintain during exercise based on your goals. For fat burning, target 60-70% of MHR. For cardio improvement, target 70-80% of MHR.",
  },
  {
    question: "How do I calculate my heart rate reserve (HRR)?",
    answer:
      "Heart Rate Reserve is calculated by subtracting your resting heart rate from your maximum heart rate: HRR = Max HR - Resting HR. For example, if your max HR is 180 bpm and your resting HR is 65 bpm, your HRR is 115 bpm. This reserve represents the range your heart can work within during exercise.",
  },
  {
    question: "What heart rate zone should I train in for fat loss?",
    answer:
      "For optimal fat burning, train in Zone 2 (60-70% of max HR) or Zone 3 (70-80% of max HR). Zone 2 burns a higher percentage of calories from fat, while Zone 3 burns more total calories. For sustainable fat loss, spend most of your training time in Zone 2 with occasional Zone 4 intervals for metabolic boost.",
  },
]

export default function HeartRateCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <CalculatorSchema
        name="Heart Rate Calculator"
        description="Calculate your maximum heart rate, target heart rate zones, and heart rate reserve using the Karvonen formula. Find optimal training zones for fat loss, endurance, and cardio."
        url="https://calqulate.net/health/heart-rate-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero - Primary keywords in H1 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
                <Activity className="w-4 h-4" />
                Karvonen Method • Zone 2 Included
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Heart Rate Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your maximum heart rate, target heart rate zones, and heart rate reserve (HRR) using proven formulas. Find your optimal Zone 2 for fat burning and cardio zones for performance.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you're training for endurance, fat loss, or cardiovascular health, knowing your precise heart rate zones transforms random exercise into strategic training.
              </p>
            </div>

            {/* Calculator Component - Above the fold */}
            <HeartRateCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Max HR Section - Addresses 100+ impressions cluster */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-green-600" />
                  How to Calculate Maximum Heart Rate (MHR)
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Your maximum heart rate is the ceiling for all training zone calculations. There are two widely used formulas to calculate max heart rate, each with different accuracy profiles.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Standard Formula */}
                  <Card className="border-blue-200 overflow-hidden">
                    <CardHeader className="bg-blue-50 pb-3">
                      <CardTitle className="text-lg text-blue-800">Standard Formula</CardTitle>
                      <CardDescription className="text-blue-600">Good for beginners & quick estimates</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-mono font-bold text-blue-700 text-center py-4 bg-white rounded-lg border-2 border-blue-200 mb-4">
                        Max HR = 220 - Age
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800"><strong>Example:</strong> Age 40</p>
                        <p className="text-sm text-blue-700">220 - 40 = <strong>180 bpm</strong></p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tanaka Formula */}
                  <Card className="border-green-200 overflow-hidden">
                    <CardHeader className="bg-green-50 pb-3">
                      <CardTitle className="text-lg text-green-800">Tanaka Formula</CardTitle>
                      <CardDescription className="text-green-600">More accurate for adults 40+</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-mono font-bold text-green-700 text-center py-4 bg-white rounded-lg border-2 border-green-200 mb-4">
                        Max HR = 208 - (0.7 × Age)
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800"><strong>Example:</strong> Age 40</p>
                        <p className="text-sm text-green-700">208 - 28 = <strong>180 bpm</strong></p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>💡 Why Tanaka?</strong> Research shows the standard "220 minus age" formula often underestimates max HR for healthy adults, especially those over 40. The Tanaka formula was validated in a study of 514 subjects and is now preferred by exercise physiologists.
                  </p>
                </div>
              </section>

              {/* Karvonen / HRR Section - Addresses hrr calculator queries */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Calculator className="w-5 h-5" />
                      The Karvonen Formula: Calculate Heart Rate Reserve (HRR)
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      The pro method that accounts for your fitness level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-6">
                      Basic calculators ignore where you're starting from. A fit 40-year-old and a sedentary 40-year-old have very different heart profiles. The Karvonen Method uses your <strong>Resting Heart Rate (RHR)</strong> to personalize your zones.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Step 1 */}
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Find Your Resting Heart Rate</p>
                          <p className="text-sm text-gray-600">Measure your pulse for 60 seconds immediately upon waking. Normal: 60-100 bpm. Athletic: 40-60 bpm.</p>
                        </div>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">Calculate Heart Rate Reserve (HRR)</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg font-mono text-rose-700">
                            HRR = Max HR - Resting HR
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 3 */}
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

                    {/* Worked Example */}
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="font-bold text-green-800 mb-2">📊 Example Calculation:</p>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• Age: 40 years | Resting HR: 60 bpm</p>
                        <p>• Max HR: 180 bpm (using standard formula)</p>
                        <p>• HRR: 180 - 60 = <strong>120 bpm</strong></p>
                        <p>• Zone 2 Target (60%): (120 × 0.60) + 60 = <strong>132 bpm</strong></p>
                      </div>
                      <p className="text-xs text-green-600 mt-3 italic">
                        Note: Without Karvonen, basic Zone 2 would be 108 bpm (60% of 180) — too low for effective training!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Training Zones Section - Core content for "target heart rate" queries */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" />
                  Target Heart Rate Zones Explained
                </h2>
                <p className="mb-6 text-gray-700">
                  Each heart rate zone produces different physiological adaptations. Understanding these zones helps you train smarter, not just harder.
                </p>

                <div className="space-y-4 not-prose">
                  {/* Zone 1 */}
                  <div className="p-5 bg-gray-50 rounded-2xl border-l-4 border-gray-400">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        Zone 1: Recovery
                      </h3>
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700">50-60% Max HR</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2"><strong>Feeling:</strong> Very easy. Full conversation possible.</p>
                    <p className="text-sm text-gray-600"><strong>Purpose:</strong> Active recovery, warm-up, cool-down, blood flow promotion.</p>
                  </div>

                  {/* Zone 2 - Highlighted */}
                  <div className="p-5 bg-green-50 rounded-2xl border-l-4 border-green-500 ring-2 ring-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-green-800 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-green-600" />
                        Zone 2: Fat Burning / Aerobic Base
                      </h3>
                      <span className="px-3 py-1 bg-green-200 rounded-full text-sm font-semibold text-green-700">60-70% Max HR</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2"><strong>Feeling:</strong> Comfortable. Can talk in sentences but not sing.</p>
                    <p className="text-sm text-green-700 mb-3"><strong>Purpose:</strong> Fat metabolism, lactate clearance, endurance building.</p>
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>⭐ The "Magic" Zone:</strong> Elite endurance athletes spend ~80% of training here. Zone 2 builds your aerobic engine without causing burnout or overtraining. It's where your body becomes efficient at using fat as fuel.
                      </p>
                    </div>
                  </div>

                  {/* Zone 3 */}
                  <div className="p-5 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-blue-800 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-blue-600" />
                        Zone 3: Aerobic / Cardio
                      </h3>
                      <span className="px-3 py-1 bg-blue-200 rounded-full text-sm font-semibold text-blue-700">70-80% Max HR</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2"><strong>Feeling:</strong> Moderate. Breathing heavier, can speak in phrases.</p>
                    <p className="text-sm text-blue-700"><strong>Purpose:</strong> Cardiovascular capacity, calorie burning (mix of fat and carbs).</p>
                  </div>

                  {/* Zone 4 */}
                  <div className="p-5 bg-orange-50 rounded-2xl border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-orange-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        Zone 4: Threshold / HIIT
                      </h3>
                      <span className="px-3 py-1 bg-orange-200 rounded-full text-sm font-semibold text-orange-700">80-90% Max HR</span>
                    </div>
                    <p className="text-sm text-orange-700 mb-2"><strong>Feeling:</strong> Hard. Muscles burning. Only 1-2 words at a time.</p>
                    <p className="text-sm text-orange-700"><strong>Purpose:</strong> Lactate threshold training, speed improvement, HIIT intervals.</p>
                  </div>

                  {/* Zone 5 */}
                  <div className="p-5 bg-red-50 rounded-2xl border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-red-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        Zone 5: Redline / VO2 Max
                      </h3>
                      <span className="px-3 py-1 bg-red-200 rounded-full text-sm font-semibold text-red-700">90-100% Max HR</span>
                    </div>
                    <p className="text-sm text-red-700 mb-2"><strong>Feeling:</strong> All-out effort. Sustainable for seconds to minutes only.</p>
                    <p className="text-sm text-red-700"><strong>Purpose:</strong> Maximum sprint performance, VO2 max improvement.</p>
                  </div>
                </div>
              </section>

              {/* Heart Rate Zone Chart by Age - Quick reference table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-600" />
                  Heart Rate Zone Chart by Age
                </h2>
                <p className="mb-4 text-gray-700">Quick reference for target heart rate zones based on the standard formula (220 - age):</p>
                
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
                  Note: These are estimates based on the standard formula. For more personalized zones, use the Karvonen calculator above with your resting heart rate.
                </p>
              </section>

              {/* Resting Heart Rate Section - Addresses 13+ impressions */}
              <section className="py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Timer className="w-6 h-6 text-green-600" />
                  What is a Normal Resting Heart Rate?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your resting heart rate (RHR) is a key indicator of cardiovascular fitness. A lower RHR generally indicates a more efficient heart.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 not-prose">
                  <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-green-700 mb-1">40-60</p>
                    <p className="font-semibold text-green-800">bpm</p>
                    <p className="text-sm text-green-600 mt-2">Athletic / Well-Trained</p>
                  </div>
                  <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-blue-700 mb-1">60-80</p>
                    <p className="font-semibold text-blue-800">bpm</p>
                    <p className="text-sm text-blue-600 mt-2">Healthy / Normal</p>
                  </div>
                  <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                    <p className="text-3xl font-bold text-amber-700 mb-1">80-100</p>
                    <p className="font-semibold text-amber-800">bpm</p>
                    <p className="text-sm text-amber-600 mt-2">Higher End of Normal</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-2">How to Measure Your Resting Heart Rate:</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Measure first thing in the morning, before getting out of bed</li>
                    <li>Place two fingers on your wrist (radial artery) or neck (carotid artery)</li>
                    <li>Count the beats for 60 seconds (or 30 seconds × 2)</li>
                    <li>Repeat for 3-5 days and take the average for accuracy</li>
                  </ol>
                </div>
              </section>

              {/* Formula Accuracy Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  How Accurate Are Heart Rate Formulas?
                </h2>
                
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Method</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Accuracy</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-700">VO2 Max / Lab Test</td>
                        <td className="px-6 py-4">Gold Standard</td>
                        <td className="px-6 py-4">Athletes, medical assessment</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-blue-700">Tanaka Formula</td>
                        <td className="px-6 py-4">Good (±7 bpm)</td>
                        <td className="px-6 py-4">Adults over 40</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-700">Standard (220-Age)</td>
                        <td className="px-6 py-4">Fair (±10-12 bpm)</td>
                        <td className="px-6 py-4">Quick estimates, younger adults</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-rose-700">Karvonen + RHR</td>
                        <td className="px-6 py-4">Good</td>
                        <td className="px-6 py-4">Personalized zone calculation</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <p className="mt-4 text-gray-700">
                  <strong>Key insight:</strong> Age-based formulas have a standard deviation of 10-12 bpm. Your actual max HR could be 10-12 beats higher or lower than calculated. If you find workouts too easy or too hard at calculated zones, adjust by 5-10 bpm based on perceived exertion.
                </p>
              </section>

              {/* Training Tips Section */}
              <section className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                  Training Zone Tips by Goal
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 bg-white border border-green-200 rounded-2xl">
                    <Flame className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Fat Loss</h4>
                    <p className="text-sm text-gray-600 mb-3">Spend 80% of cardio in Zone 2. Add 1-2 HIIT sessions (Zone 4) per week for metabolic boost.</p>
                    <p className="text-xs text-green-600 font-semibold">Primary: Zone 2 | Secondary: Zone 4</p>
                  </div>
                  <div className="p-5 bg-white border border-blue-200 rounded-2xl">
                    <Heart className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-bold text-blue-800 mb-2">Endurance</h4>
                    <p className="text-sm text-gray-600 mb-3">Build your aerobic base with long Zone 2 sessions. Progress slowly to avoid overtraining.</p>
                    <p className="text-xs text-blue-600 font-semibold">Primary: Zone 2 | Long duration</p>
                  </div>
                  <div className="p-5 bg-white border border-orange-200 rounded-2xl">
                    <Zap className="w-8 h-8 text-orange-600 mb-3" />
                    <h4 className="font-bold text-orange-800 mb-2">Performance</h4>
                    <p className="text-sm text-gray-600 mb-3">Mix Zone 2 base training with threshold (Zone 4) and VO2 max (Zone 5) intervals.</p>
                    <p className="text-xs text-orange-600 font-semibold">Mix: Zone 2 + Zone 4/5 intervals</p>
                  </div>
                </div>
              </section>

              {/* Trust Section */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  Why Trust This Heart Rate Calculator?
                </h2>
                <p className="mb-6 opacity-90">We built this calculator using evidence-based formulas and clear methodology:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Both Standard and Tanaka formulas included</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Karvonen method for personalized zones</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>No data stored or tracked</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Clear explanations of methodology</span>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5" /> Medical Disclaimer
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This heart rate calculator provides estimates for educational purposes only. Individual heart rates vary based on genetics, fitness level, medications, and health conditions. Always consult a physician before starting a new exercise program, especially if you have a history of heart conditions, high blood pressure, or are taking medications that affect heart rate (beta blockers, etc.).
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-500 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Complete Your Fitness Assessment</h3>
                    <p className="text-green-100 max-w-md">
                      Now that you know your heart rate zones, check your body composition with our Body Fat Calculator.
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

            {/* FAQ Section - Long-tail keyword capture */}
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

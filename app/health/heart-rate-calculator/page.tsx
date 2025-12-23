import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import HeartRateCalculator from "@/components/calculators/heart-rate-calculator" // Assumed import path based on previous context
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  HeartPulse, 
  Activity, 
  Zap, 
  Timer, 
  TrendingUp, 
  Calculator as CalculatorIcon, 
  AlertCircle,
  BarChart3
} from "lucide-react"

export const metadata: Metadata = {
  title: "Heart Rate Calculator - Find Your Max & Target Heart Rate Instantly",
  description:
    "Instantly calculate your target heart rate zones, including Zone 2 for fat burning and your maximum heart rate. Use our pro Karvonen formula tool for accuracy.",
  keywords:
    "max heart rate calculator, target heart rate calculator, finding maximum heart rate calculator, heart rate zone calculator, how to calculate heart rate, heart rate calculator, how to calculate max heart rate, maximum heart rate calculator, zone 2 heart rate calculator, calculate max heart rate",
}

// Extracted from your content's "Frequently Asked Questions" section for Schema/SEO
const faqs = [
  {
    question: "What is my maximum heart rate calculator, considering I am on medication?",
    answer:
      "Beta-blockers and other medications can artificially lower your heart rate. If you're on medication, the standard formulas don't apply. Rely on RPE, or Rate of Perceived Exertion, a 1-10 scale that describes how hard you feel you're working, rather than a BPM number.",
  },
  {
    question: "How accurate are the wrist-based trackers?",
    answer:
      "Smartwatches are good for resting heart rate trends, but they can lag during high-intensity intervals. For best results with a target heart rate calculator, consider a chest strap monitor, or use the manual “finger on the neck” check for 15 seconds and multiply by 4.",
  },
  {
    question: "What is my fat burning heart rate zone calculator best setting?",
    answer:
      "Technically, you would burn the highest fat percentage in Zone 1 and 2, but you would burn more total calories in Zones 3 and 4. Pure Weight Loss: Combine long Zone 2 sessions with short intervals in Zone 4. For beginner fat loss, stick strictly to Zone 2 in order to build a base without injury.",
  },
]

export default function HeartRateCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Target Heart Rate Calculator"
        description="Calculate your optimal heart rate zones for fat burning, cardio, and peak performance using the Karvonen method."
        url="https://calqulate.net/health/heart-rate-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                The Smart Heart Rate Calculator: Instantly find your Zone 2 and Max HR
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Are you putting all your will into your workouts and simply not seeing what you would expect? 
                You might be training in the wrong zone. Whether you are looking to shed pounds, build marathon 
                endurance, or simply keep your heart in health, the answer is in your data.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                A precision heart rate calculator is the link between simple exercise and meaningful training. 
                This guide goes further than basic math to help you find your target heart rate, including the 
                elusive Zone 2 and your maximum burn limits.
              </p>
            </div>

            {/* Calculator Component */}
            <HeartRateCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Basics vs Science Section */}
              <section className="py-4">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What Is My Max Heart Rate Calculator: The Basics versus The Science
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  To determine your training zones, we first need to find the ceiling: the Maximum Heart Rate.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-lg">The Standard Method</CardTitle>
                      <CardDescription>Good for Beginners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2 text-sm">The basic formula has been straightforward for decades:</p>
                      <div className="bg-slate-100 p-3 rounded-md font-mono text-center mb-2">
                        Formula: 220 - your age = MHR
                      </div>
                      <p className="text-sm">Example: if you are 40, your MHR is about 180 beats per minute (bpm).</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">The "Tanaka" Method</CardTitle>
                      <CardDescription>Better for Accuracy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2 text-sm">
                        Recent studies indicate that the standard formula commonly underestimates MHR for healthy adults. 
                        Tanaka formula is more widely accepted by sporting scientists.
                      </p>
                      <div className="bg-slate-100 p-3 rounded-md font-mono text-center mb-2">
                        Formula: 208 - (0.7 × Age) = MHR
                      </div>
                      <p className="text-sm">
                        <strong>Why it matters:</strong> A more accurate max means your heart rate zone calculator results will be personalized to your actual fitness level.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Zones Section */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  The "Fat Burning" versus "Performance" Zones
                </h2>
                <p className="mb-6">
                  Once you have your MHR, you are able to calculate your zones. This means you will answer the 
                  important question: <strong>what is my fat burning heart rate zone calculator result?</strong>
                </p>

                <div className="space-y-4 not-prose">
                  {/* Zone 1 */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="min-w-[120px]">
                      <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs font-bold uppercase">Zone 1</span>
                      <h3 className="font-bold text-lg text-gray-700">Warm Up & Recovery</h3>
                      <p className="text-sm font-mono text-gray-500">50–60% of Max</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>Feeling:</strong> Very easy. You can carry on a conversation without any difficulty.</p>
                      <p><strong>Goals:</strong> Recovery, blood flow, and warm-up.</p>
                    </div>
                  </div>

                  {/* Zone 2 */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="min-w-[120px]">
                      <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-bold uppercase">Zone 2</span>
                      <h3 className="font-bold text-lg text-blue-700">The "Magic" Zone</h3>
                      <p className="text-sm font-mono text-blue-600">60–70% of Max</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>The Science:</strong> This is the base zone. This is where your body becomes efficient at using fat as fuel and clearing lactate.</p>
                      <p><strong>Why You Need It:</strong> Elite athletes spend about 80% of their training here. Want to build endurance without burnout? Calculate this number and stay in it.</p>
                    </div>
                  </div>

                  {/* Zone 3 */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="min-w-[120px]">
                      <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold uppercase">Zone 3</span>
                      <h3 className="font-bold text-lg text-green-700">Aerobic / Cardio</h3>
                      <p className="text-sm font-mono text-green-600">70–80% of Max</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>Feeling:</strong> Moderate. Breathing gets heavier; conversation is possible but a bit choppy.</p>
                      <p><strong>Objective:</strong> To enhance cardiovascular capacity with calorie burning involving a mix of fat and carbohydrates.</p>
                    </div>
                  </div>

                  {/* Zone 4 */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <div className="min-w-[120px]">
                      <span className="inline-block px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-bold uppercase">Zone 4</span>
                      <h3 className="font-bold text-lg text-orange-700">Threshold</h3>
                      <p className="text-sm font-mono text-orange-600">80–90% of Max</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>Feeling:</strong> Hard. Muscles burn. You can only say a word or two.</p>
                      <p><strong>Objective:</strong> For high-intensity interval training, increasing speed and lactate tolerance.</p>
                    </div>
                  </div>

                  {/* Zone 5 */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-red-50 border-red-200">
                    <div className="min-w-[120px]">
                      <span className="inline-block px-3 py-1 bg-red-200 text-red-800 rounded-full text-xs font-bold uppercase">Zone 5</span>
                      <h3 className="font-bold text-lg text-red-700">Redline</h3>
                      <p className="text-sm font-mono text-red-600">90–100% of Max</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><strong>Feeling:</strong> All-out effort. Sustainable only for seconds to minutes.</p>
                      <p><strong>Objective:</strong> Maximum sprint performance.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Pro Method (Karvonen) */}
              <section>
                <Card className="not-prose bg-slate-50 border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalculatorIcon className="w-5 h-5 text-indigo-600" />
                      The Pro Method: The Karvonen Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-700">
                    <p>
                      Many calculators don't take into account the important detail of where you are starting: 
                      A 40-year-old fit person has a very different heart profile than a 40-year-old sedentary person.
                      To rectify this, we apply the Karvonen Method, which uses your Resting Heart Rate.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-white rounded border">
                        <h4 className="font-bold text-indigo-600 mb-1">Step 1: Find your RHR</h4>
                        <p className="text-xs mb-2"><strong>What should my resting heart rate be calculator</strong></p>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                          <li>Normal: 60-100 bpm</li>
                          <li>Athletic: 40–60 bpm</li>
                        </ul>
                        <p className="text-xs mt-2 italic">Action: Take a measurement of your pulse at your wrist for 60 seconds immediately upon waking.</p>
                      </div>

                      <div className="p-3 bg-white rounded border">
                        <h4 className="font-bold text-indigo-600 mb-1">Step 2: Calculate Reserve</h4>
                        <p className="text-xs mb-2">Heart Rate Reserve (HRR) Calculation:</p>
                        <div className="bg-indigo-50 p-2 rounded text-center font-mono font-bold">
                          MHR - RHR = HRR
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded border">
                        <h4 className="font-bold text-indigo-600 mb-1">Step 3: Calculate Target</h4>
                        <p className="text-xs mb-2">Target Zone Calculation:</p>
                        <div className="bg-indigo-50 p-2 rounded text-center font-mono font-bold text-xs">
                          (HRR × Intensity %) + RHR
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded border border-l-4 border-l-indigo-500">
                      <h4 className="font-bold mb-2">Example Calculation:</h4>
                      <p className="mb-2">You are 40 years old and your resting heart rate is 60.</p>
                      <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>MHR: 180</li>
                        <li>HRR: 120 (180 − 60)</li>
                        <li>Goal: Zone 2, 60% effort</li>
                        <li><strong>Math: (120 × 0.60) + 60 = 132 bpm.</strong></li>
                      </ul>
                      <p className="text-xs text-gray-500 italic">
                        Note: If you used the basic method, your target would be 108 bpm—far too low to be effective! That is why the Karvonen method is considered superior.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Chart Section */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Quick Reference: Heart Rate Zone Chart (Based on Age)
                    </CardTitle>
                    <CardDescription>
                      Averages based on the standard linear formula.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Age</th>
                            <th className="border px-4 py-2 text-left text-blue-600">Zone 2 (Fat Burn)</th>
                            <th className="border px-4 py-2 text-left text-orange-600">Zone 4 (Cardio/HIIT)</th>
                            <th className="border px-4 py-2 text-left">Approx Max HR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-bold">20</td>
                            <td className="border px-4 py-2">120 - 140 bpm</td>
                            <td className="border px-4 py-2">160 - 180 bpm</td>
                            <td className="border px-4 py-2">200 bpm</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold">30</td>
                            <td className="border px-4 py-2">114 - 133 bpm</td>
                            <td className="border px-4 py-2">152 - 171 bpm</td>
                            <td className="border px-4 py-2">190 bpm</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold">40</td>
                            <td className="border px-4 py-2">108 - 126 bpm</td>
                            <td className="border px-4 py-2">144 - 162 bpm</td>
                            <td className="border px-4 py-2">180 bpm</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold">50</td>
                            <td className="border px-4 py-2">102 - 119 bpm</td>
                            <td className="border px-4 py-2">136 - 153 bpm</td>
                            <td className="border px-4 py-2">170 bpm</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold">60</td>
                            <td className="border px-4 py-2">96 - 112 bpm</td>
                            <td className="border px-4 py-2">128 - 144 bpm</td>
                            <td className="border px-4 py-2">160 bpm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimer */}
              <section className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800 flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>
                  <strong>Disclaimer:</strong> Any maximum heart rate calculator only provides estimates in terms of numbers. 
                  Always consult a physician before initiating any new exercise program, especially if you have any history of heart conditions.
                </p>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
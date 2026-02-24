import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import RunningPaceCalculator from "@/components/calculators/running-pace-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Timer, Activity, FastForward, Medal, ArrowRight, Calculator as CalculatorIcon, Route } from "lucide-react"

export const metadata: Metadata = {
  title: "Running Pace Calculator: Race Predictor & Split Times",
  description:
    "Calculate your running pace, time, or distance. Our advanced Running Pace Calculator includes a race time predictor, split times, and personalized training pace zones.",
  keywords:
    "running pace calculator, marathon pace calculator, half marathon pace calculator, 5k pace calculator, 10k pace calculator, calculate running pace, race time predictor, running splits calculator, min per km, min per mile",
}

const faqs = [
  {
    question: "How do I calculate my running pace?",
    answer:
      "To calculate your running pace, you need two values: the distance you ran (or plan to run) and the total time it took. You simply divide the time by the distance. For example, if you run 5 kilometers in 25 minutes, your pace is 25 ÷ 5 = 5:00 minutes per kilometer. Our calculator does this instantly for you.",
  },
  {
    question: "What is the difference between pace and speed?",
    answer:
      "Speed is measured in distance per time (e.g., miles per hour or kilometers per hour). Pace is the inverse—it measures time per distance (e.g., minutes per mile or minutes per kilometer). Runners typically use pace because it makes it easier to track split times and manage energy during a race.",
  },
  {
    question: "How does the Race Time Predictor work?",
    answer:
      "Our calculator uses Peter Riegel's highly regarded formula (T2 = T1 x (D2/D1)^1.06). It takes your calculated pace from a specific distance and predicts how fast you could finish other standard race distances (like a 5K, 10K, Half Marathon, or Marathon) assuming you maintain proper endurance training.",
  },
  {
    question: "What are Training Paces (Easy, Tempo, Interval)?",
    answer:
      "If you run every run at your race pace, you will burn out or get injured. Training paces guide your daily runs. 'Easy Pace' builds aerobic base and should feel conversational. 'Tempo Pace' is comfortably hard and increases your lactate threshold. 'Interval Pace' is very hard, meant for short bursts to increase your VO2 Max.",
  },
  {
    question: "What is a good pace for a beginner?",
    answer:
      "A good running pace for beginners varies greatly based on age, fitness level, and genetics. Generally, an average beginner's pace is between 6:30 to 8:00 minutes per kilometer (10:30 to 12:50 minutes per mile). The most important thing is to run at a pace where you can comfortably hold a conversation.",
  },
  {
    question: "How do I use this calculator for a Marathon or Half Marathon?",
    answer:
      "Select 'Calculate Pace', choose 'Marathon' or 'Half Marathon' using our quick-select distance buttons, and enter your target finish time. The calculator will instantly tell you the exact pace per km or mile you need to maintain, along with kilometer-by-kilometer split times to write on your hand or pace band.",
  },
]

export default function RunningPaceCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Running Pace Calculator"
        description="Calculate running pace, finish times, and race distances. Get custom split times, training zones, and marathon race predictions."
        url="https://calqulate.net/health/running-pace-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Running Pace Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Take the guesswork out of your training. Calculate your running pace, predict race times, 
                and discover your optimal training zones for your next 5K, 10K, Half Marathon, or Full Marathon.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you're aiming for a personal best or just tracking your morning jog, our advanced tool gives you the exact metrics you need.
              </p>
            </div>

            {/* Calculator Component */}
            <RunningPaceCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is a pace calculator? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What makes this Running Pace Calculator different?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Most calculators simply divide time by distance. While that’s helpful, it’s not enough for 
                  real runners. We built this <b>Running Pace Calculator</b> to be a complete training companion. 
                  By entering your target race time or recent run data, you don't just get your pace—you unlock 
                  a suite of analytics.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Our algorithm goes beyond basic math. It provides <b>split times</b> so you know exactly when 
                  you should hit every mile marker, generates a <b>race predictor</b> based on Riegel’s formula 
                  to estimate your finish times for other distances, and gives you actionable <b>training paces</b> 
                  to help structure your weekly workouts safely.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <Medal className="w-5 h-5 text-blue-500" />
                      Everything You Need For Race Day
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Here is what you can discover by using our all-in-one running tool:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><b>Calculate Pace:</b> Enter distance and time to find your precise min/km or min/mi.</li>
                        <li><b>Calculate Time:</b> Enter your pace and distance to predict your exact finish time.</li>
                        <li><b>Race Time Predictor:</b> See what your current fitness means for a 5K, 10K, or Marathon.</li>
                        <li><b>Training Zones:</b> Discover your ideal Easy, Tempo, and VO2 Max Interval paces.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                       <Timer className="w-12 h-12 text-blue-400" />
                       <p className="text-sm font-medium text-center text-slate-600">
                         Stop guessing your splits.<br/>Start pacing perfectly.
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Standard Race Distances Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="w-5 h-5" />
                      Standard Race Distances Quick Reference
                    </CardTitle>
                    <CardDescription>
                      Use this quick cheat sheet to understand exact official race distances.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="border px-4 py-2 text-left">Event Name</th>
                            <th className="border px-4 py-2 text-left">Kilometers (km)</th>
                            <th className="border px-4 py-2 text-left">Miles (mi)</th>
                            <th className="border px-4 py-2 text-left">Meters (m)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium">5K</td>
                            <td className="border px-4 py-2">5.0 km</td>
                            <td className="border px-4 py-2">3.11 mi</td>
                            <td className="border px-4 py-2">5,000 m</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">10K</td>
                            <td className="border px-4 py-2">10.0 km</td>
                            <td className="border px-4 py-2">6.21 mi</td>
                            <td className="border px-4 py-2">10,000 m</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Half Marathon</td>
                            <td className="border px-4 py-2">21.0975 km</td>
                            <td className="border px-4 py-2">13.1094 mi</td>
                            <td className="border px-4 py-2">21,097.5 m</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Marathon</td>
                            <td className="border px-4 py-2">42.195 km</td>
                            <td className="border px-4 py-2">26.2188 mi</td>
                            <td className="border px-4 py-2">42,195 m</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cross Promotion / Referral to Body Shape */}
              <section className="my-10">
                <Link href="/health/body-shape-calculator" className="no-underline">
                  <Card className="border-2 border-primary/20 hover:border-primary/60 transition-colors bg-gradient-to-br from-blue-50 to-indigo-50 cursor-pointer">
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-blue-600 mb-2">
                          Track Your Fitness Journey
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 m-0">Running Changing Your Physique?</h3>
                        <p className="text-gray-600 text-sm m-0 leading-relaxed">
                          As you run more, your body composition and shape will naturally change. 
                          Discover your exact proportions, fat distribution, and get custom health insights 
                          using our highly accurate <b>Body Shape Calculator</b>.
                        </p>
                      </div>
                      <div className="bg-white rounded-full p-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </section>

              {/* How to Improve Your Pace */}
              <section>
                <h2 className="mb-2">
                  <b>How to Improve Your Running Pace</b>
                </h2>
                <p>
                  Hitting a plateau in your running speed is incredibly common. The secret to getting faster 
                  isn't just running hard every day—it requires structured variability. Our calculator gives you 
                  your <b>Training Paces</b> for a reason:
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-green-500" />1. Run Slow to Run Fast</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>
                        80% of your weekly miles should be run at an <b>Easy Pace</b>. This builds capillary density, 
                        strengthens your heart, and allows your muscles to recover. If you run your easy days too fast, 
                        you won't have the energy for speed workouts.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><FastForward className="w-5 h-5 text-orange-500" />2. Incorporate Tempo Runs</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>
                        A <b>Tempo Pace</b> is often described as "comfortably hard." Running 20-30 minutes at this pace 
                        pushes your lactate threshold higher, meaning your body learns to clear lactic acid faster, 
                        allowing you to sustain faster speeds for longer periods.
                      </p>
                    </CardContent>
                  </Card>
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
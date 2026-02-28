import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import StressLevelCalculator from "@/components/calculators/stress-level-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Brain, Shield, Zap, BatteryWarning, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Stress Level Calculator: Clinically Validated PSS Test Online",
  description:
    "Measure your mental load with our clinically validated Stress Level Calculator. Based on the Perceived Stress Scale (PSS), discover your burnout risk, psychological sub-scores, and actionable health insights.",
  keywords:
    "stress level calculator, perceived stress scale calculator, online stress test, measure stress levels, PSS-10 test, how stressed am I, stress test online, burnout calculator, emotional stress test",
}

const faqs = [
  {
    question: "How does the Stress Level Calculator work?",
    answer:
      "Our calculator uses the Perceived Stress Scale (PSS-10), the most widely used psychological instrument for measuring the perception of stress. It asks you 10 specific questions about your feelings and thoughts over the last month to determine how unpredictable, uncontrollable, and overloaded you find your life.",
  },
  {
    question: "What is a normal stress level score?",
    answer:
      "Scores ranging from 0 to 13 are considered low stress. Scores between 14 and 26 indicate moderate stress, which is common but should be monitored. Scores from 27 to 40 indicate high perceived stress, suggesting that you may be at risk for burnout or stress-related health issues.",
  },
  {
    question: "Is this stress test clinically accurate?",
    answer:
      "Yes, the questions are based on the globally recognized Perceived Stress Scale (PSS) developed by Dr. Sheldon Cohen. While this tool is highly accurate for educational and self-awareness purposes, it is not a substitute for a professional psychiatric or medical diagnosis.",
  },
  {
    question: "Can high stress affect my physical body shape?",
    answer:
      "Absolutely. High stress leads to elevated cortisol levels. Chronic cortisol exposure is scientifically proven to cause your body to store visceral fat, particularly around the midsection, which can shift your body shape to an 'Apple' shape. You can use our Body Shape Calculator to see how your current measurements align.",
  },
  {
    question: "What is the difference between Perceived Helplessness and Self-Efficacy?",
    answer:
      "Our unique calculator breaks your stress into two sub-categories. 'Perceived Helplessness' measures how out of control and overwhelmed you feel. 'Perceived Self-Efficacy' measures your confidence in handling problems. Understanding which area is struggling helps you apply the right coping mechanisms.",
  },
  {
    question: "How often should I take this stress test?",
    answer:
      "Because the Perceived Stress Scale measures your feelings over the past 30 days, we recommend taking this test once a month. This allows you to track whether your stress management strategies—like meditation, exercise, or therapy—are working over time.",
  },
]

export default function StressLevelCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Stress Level Calculator"
        description="Evaluate your perceived stress levels using the clinically validated PSS-10 scale and receive personalized burnout and health insights."
        url="https://calqulate.net/health/stress-level-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Stress Level Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Are you feeling overwhelmed, or just experiencing normal daily pressure? 
                Our clinically backed Stress Level Calculator uses the Perceived Stress Scale (PSS-10) 
                to evaluate your mental load, calculate your burnout risk, and provide tailored coping strategies.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Answer the 10 simple questions below based on how you have felt over the <b>past month</b> to get your personalized psychological profile instantly.
              </p>
            </div>

            {/* Calculator Component */}
            <StressLevelCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is the Stress Calculator? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is a Stress Level Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  A Stress Level Calculator is a digital tool designed to quantify your emotional and mental tension. 
                  Unlike generic quizzes, our calculator is strictly based on the <b>Perceived Stress Scale (PSS-10)</b>, 
                  the gold standard in psychological research for measuring how unpredictable, uncontrollable, and overloaded 
                  respondents find their lives.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We don't just give you a number. Our tool breaks down your mental state into specific categories, 
                  giving you a deeper understanding of whether your stress stems from a lack of control (Helplessness) 
                  or a temporary dip in confidence (Self-Efficacy).
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <Brain className="w-5 h-5 text-indigo-500" />
                      More Than Just a Number
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      What makes our stress calculator a step above the rest.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><b>Clinically Validated:</b> Uses the exact 10-item questionnaire trusted by therapists worldwide.</li>
                        <li><b>Sub-Factor Analysis:</b> Differentiates between feelings of helplessness and your internal coping ability.</li>
                        <li><b>Physical Impact Linking:</b> Explains how your score correlates to real physical changes, like cortisol-induced weight gain.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
                       <Zap className="w-10 h-10 text-indigo-400" />
                      <p className="text-center text-sm font-medium text-indigo-800 dark:text-indigo-300">
                        Stress isn't just in your head. It changes your biology,{" "}
                        <Link
                          href="/health/bmr-calculator"
                          className="underline hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors"
                        >
                          metabolism
                        </Link>
                        , and behavior.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Stress Categories Table */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Understanding Your PSS Stress Score</CardTitle>
                    <CardDescription>
                      The standard PSS-10 test yields a score between 0 and 40. Here is what those ranges mean for your health.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border px-4 py-3 text-left">Score Range</th>
                            <th className="border px-4 py-3 text-left">Stress Level</th>
                            <th className="border px-4 py-3 text-left">Physical & Mental Symptoms</th>
                            <th className="border px-4 py-3 text-left">Recommended Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-green-600">0 – 13</td>
                            <td className="border px-4 py-3">Low Stress</td>
                            <td className="border px-4 py-3">Stable mood, good sleep quality, healthy immune response.</td>
                            <td className="border px-4 py-3">Maintain current healthy habits, diet, and exercise routine.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-yellow-600">14 – 26</td>
                            <td className="border px-4 py-3">Moderate Stress</td>
                            <td className="border px-4 py-3">Occasional anxiety, muscle tension, disrupted sleep, minor irritability.</td>
                            <td className="border px-4 py-3">Implement daily mindfulness, prioritize sleep, and evaluate boundaries.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-red-600">27 – 40</td>
                            <td className="border px-4 py-3">High Stress (Burnout Risk)</td>
                            <td className="border px-4 py-3">
                              Chronic fatigue,{" "}
                              <Link
                                href="/health/body-fat-calculator"
                                className="font-medium hover:underline hover:text-green-700 transition-colors"
                              >
                                weight changes
                              </Link>
                              , brain fog, digestive issues, high cortisol.
                            </td>
                            <td className="border px-4 py-3">Seek professional support, take time off, restructure daily stressors immediately.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cross Referral - Stress & Abdominal Fat */}
              <section>
                <Card className="not-prose border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/10 dark:border-indigo-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                      <Activity className="w-5 h-5" />
                      The Stress & Abdominal Fat Connection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      Chronic stress doesn’t just affect your mood — it changes your biology. 
                      When stress remains elevated, your body releases higher levels of <b>cortisol</b>, 
                      a hormone that directly influences fat storage.
                    </p>
                    <p>
                      Persistently high cortisol promotes the accumulation of <b>visceral fat in the abdominal region</b>. 
                      This type of fat increases your Waist-to-Height Ratio (WHtR) and is strongly linked to heart disease and metabolic disorders.
                    </p>
                    <Link 
                      href="/health/waist-to-height-ratio-calculator" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-indigo-600 text-white shadow hover:bg-indigo-700 h-9 px-4 py-2 mt-2"
                    >
                      Check Your Waist-to-Height Ratio <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </section>

              {/* Sub-factors explained */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Our Unique Insight: The Two Pillars of Stress</b>
                </h2>
                <p className="mb-2">
                  While most calculators stop at a final score, psychological research shows that perceived stress is actually made up of two distinct feelings. We calculate both for you:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>
                    <b>Perceived Helplessness:</b> This measures your reaction to things outside of your control. If this score is high, you are likely dealing with external chaos (a demanding boss, sudden life changes, financial unpredictability). Coping strategies should focus on boundary setting and radical acceptance.
                  </li>
                  <li>
                    <b>Perceived Self-Efficacy:</b> This measures how capable you feel at handling problems. If this score is low, your stress is stemming from internal doubt or burnout. Coping strategies should focus on building quick, small wins, self-care, and asking for help to rebuild your confidence.
                  </li>
                </ul>
              </section>

              {/* Warning Signs */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BatteryWarning className="w-5 h-5 text-orange-500" />
                      Warning Signs of High Perceived Stress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>Stress isn't just a feeling; it manifests physically and cognitively. Watch out for these symptoms if your calculator result was in the "High" range:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-semibold mb-1 text-slate-800 dark:text-slate-200">Physical Symptoms</h4>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          <li>Tension headaches or migraines</li>
                          <li>Teeth grinding (Bruxism)</li>
                          <li>Digestive issues or stomach aches</li>
                          <li>Rapid heartbeat or chest tightness</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-slate-800 dark:text-slate-200">Behavioral Symptoms</h4>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          <li>Procrastination or avoidance</li>
                          <li>Changes in appetite (overeating or skipping meals)</li>
                          <li>Increased use of alcohol or nicotine</li>
                          <li>Social withdrawal and isolation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
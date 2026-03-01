import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PeriodCalculator from "@/components/calculators/period-cycle-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Calendar,
  Droplets,
  RotateCcw,
  Clock,
  Heart,
  Info,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ListChecks,
  Table
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Period Cycle Calculator: Track Your Menstrual Cycle Accurately",
  description:
    "Predict your next period, estimate ovulation, and find your fertile window with our accurate period cycle calculator. Perfect for regular and irregular cycles.",
  keywords:
    "period cycle calculator, menstrual cycle tracker, calculate period length, ovulation predictor, irregular period calculator, fertile days after period, LMP calculator",
}

const faqs = [
  {
    question: "How to calculate period cycle days?",
    answer:
      "To calculate your cycle length, count from Day 1 of one period (the first day of full bleeding) to Day 1 of your next period.",
  },
  {
    question: "What is the average period cycle length?",
    answer:
      "The average cycle is 28 days, but anything between 26 and 32 days is considered normal for most women.",
  },
  {
    question: "How to calculate the ovulation window?",
    answer:
      "Ovulation typically occurs 14 days before your next period begins. Your fertile window includes the 5 days before ovulation and the day of ovulation itself.",
  },
  {
    question: "Can I calculate ovulation with irregular periods?",
    answer:
      "Yes, but the results will be a range of dates rather than a single specific day. You subtract 18 from your shortest cycle and 11 from your longest cycle to find your fertile range.",
  },
  {
    question: "If my period lasts 5 days, when do I ovulate?",
    answer:
      "Ovulation timing depends on your total cycle length (e.g., 28 or 30 days), not on how many days you bleed during your period.",
  },
]

export default function PeriodCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Period Cycle Calculator"
        description="Accurately track your menstrual cycle, predict your next period, and estimate your most fertile window."
        url="https://calqulate.net/health/period-cycle-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Period Cycle Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Track your menstrual cycle accurately. Predict your next period, estimate your ovulation date, and identify your most fertile days with ease.
              </p>
            </div>

            {/* Calculator Component */}
            <PeriodCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Definition Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is a Period Cycle Calculator?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A period cycle calculator (also called a menstrual cycle calculator) estimates your next period date, ovulation date, and fertile window using the first day of your last menstrual period (LMP) and your average cycle length.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
                    <Calendar className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-bold text-green-800 uppercase">Next Period</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
                    <Sparkles className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-bold text-green-800 uppercase">Ovulation</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
                    <Heart className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-bold text-green-800 uppercase">Fertility</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
                    <RotateCcw className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-bold text-green-800 uppercase">Cycle Tracking</p>
                  </div>
                </div>
              </section>

              {/* Step by Step Guide */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Calculate Period Cycle (Step-by-Step)</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                    <p className="text-gray-700"><strong>Identify Day 1:</strong> This is the first day of full bleeding (not spotting).</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                    <p className="text-gray-700"><strong>Count Until Next Period:</strong> Count the days from Day 1 of your last period until the day before your next period starts. This number is your <strong>Cycle Length</strong>.</p>
                  </div>
                </div>

                <Card className="mt-8 border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <ListChecks className="w-5 h-5" />
                      Period Cycle Length Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg font-mono font-bold text-green-700 bg-gray-50 p-4 rounded-xl border-2 border-dashed border-green-200 text-center">
                      Cycle Length = First day of current period to first day of next period
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                      <strong>Note:</strong> The average cycle length is 26–32 days. Most calculators assume 28 days unless you specify otherwise.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Cycle Phases */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  Understanding Your Cycle Phases
                </h2>
                <div className="grid md:grid-cols-4 gap-4 not-prose">
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <h4 className="font-bold text-green-800 text-sm mb-1">Menstrual</h4>
                    <p className="text-xs text-gray-500">Day 1–5: Bleeding begins.</p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <h4 className="font-bold text-green-800 text-sm mb-1">Follicular</h4>
                    <p className="text-xs text-gray-500">Day 1–13: Egg preparation.</p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <h4 className="font-bold text-green-800 text-sm mb-1">Ovulation</h4>
                    <p className="text-xs text-gray-500">Day 14: Release of the egg.</p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <h4 className="font-bold text-green-800 text-sm mb-1">Luteal</h4>
                    <p className="text-xs text-gray-500">Day 15–28: Post-ovulation.</p>
                  </div>
                </div>
              </section>

              {/* Ovulation Calculation */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  How to Calculate Ovulation Date
                </h2>
                <p className="mb-6 opacity-90">Ovulation happens about 14 days before your next period, not necessarily 14 days after it starts. Use this logic:</p>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-6">
                  <p className="text-xl font-bold text-center">Ovulation Day = Cycle Length − 14</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-green-200 mb-2">Example: 30 Day Cycle</h4>
                    <p>30 − 14 = Day 16. Ovulation is approximately on Day 16. Your fertile window is roughly Day 11–16.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-200 mb-2">Fertile Window Explained</h4>
                    <p>Includes 5 days before ovulation + ovulation day. Sperm survive up to 5 days; the egg survives 12–24 hours.</p>
                  </div>
                </div>
              </section>

              {/* Fertile Days After Period */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Droplets className="text-green-600 w-5 h-5" /> Fertile Days After Period
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If your cycle is 28 days and your period lasts 5 days, your fertile window starts around Day 9. Fertile days usually begin 3–5 days after bleeding stops. 
                    <strong> Note:</strong> Ovulation timing depends on total cycle length, not the number of days you bleed.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Calendar className="text-green-600 w-5 h-5" /> LMP & Missed Periods
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>
                      <Link
                        href="/health/pregnancy-weight-gain-calculator"
                        className="hover:underline hover:text-green-700 transition-colors"
                      >
                        LMP (Last Menstrual Period)
                      </Link>
                      :
                    </strong>{" "}
                    The starting point for all tracking. If your period is late, consider stress, illness, or travel. 
                    A pregnancy test is recommended if you are 5–7 days late.
                  </p>
                </div>
              </section>

              {/* Irregular Periods Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  Calculating Irregular Cycles
                </h2>
                <p className="text-gray-700 mb-6">If your cycles vary, track them for 6 months, find your shortest and longest cycles, and use this formula:</p>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm">
                    <p className="text-xs font-bold text-red-800 uppercase mb-1">First Fertile Day</p>
                    <p className="text-sm font-bold text-gray-800">Shortest cycle length − 18</p>
                  </div>
                  <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm">
                    <p className="text-xs font-bold text-red-800 uppercase mb-1">Last Fertile Day</p>
                    <p className="text-sm font-bold text-gray-800">Longest cycle length − 11</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">Accuracy for irregular periods improves when combined with Basal Body Temperature (BBT) and ovulation predictor kits.</p>
              </section>

              {/* Safe Period Note */}
              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800">
                  <AlertCircle className="w-5 h-5" /> Safe Period Calculator Warning
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  No calculator is 100% safe. Ovulation can shift due to{" "}
                  <Link
                    href="/health/stress-level-calculator"
                    className="font-medium hover:underline hover:text-green-700 transition-colors"
                  >
                    stress
                  </Link>
                  , hormonal imbalance, or{" "}
                  <Link
                    href="/health/sleep-debt-calculator"
                    className="font-medium hover:underline hover:text-green-700 transition-colors"
                  >
                    sleep disruption
                  </Link>
                  . If avoiding pregnancy, always use reliable contraception rather than relying solely on cycle calculations.
                </p>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Final Takeaway
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  "Your cycle is a health signal, not just a calendar event. Consistently tracking for 3–6 months helps you understand your body, plan or avoid pregnancy, and detect hormonal irregularities early."
                </p>
              </section>

              {/* Internal Link CTA */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to find your fertile days?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you know your cycle, find the exact dates for your next ovulation window.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/ovulation-calculator">
                      Ovulation Calculator <ArrowRight className="ml-2 w-4 h-4" />
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
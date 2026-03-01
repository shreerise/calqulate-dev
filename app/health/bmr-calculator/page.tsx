import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BMRCalculator from "@/components/calculators/bmr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Zap,
  Calculator,
  Activity,
  User,
  Info,
  Dumbbell,
  AlertCircle,
  TrendingDown,
  Table,
  CheckCircle2,
  ArrowRight,
  Scale
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "BMR Calculator: Calculate Your Basal Metabolic Rate Accurately",
  description:
    "Find out how many calories your body burns at rest with our accurate BMR calculator. Uses the Mifflin-St Jeor equation for precise metabolic rate estimation.",
  keywords:
    "BMR calculator, basal metabolic rate, calculate BMR, resting metabolic rate, metabolic age, calorie burn at rest, Mifflin-St Jeor formula",
}

const faqs = [
  {
    question: "How to calculate BMR manually?",
    answer:
      "You can use the Mifflin-St Jeor formula: For Men: (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5. For Women: (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161.",
  },
  {
    question: "What is a normal basal metabolic rate?",
    answer:
      "There is no universal 'normal' number. It varies by body size, age, and muscle mass. Generally, adult women range between 1,200–1,600 kcal/day and men between 1,500–1,900 kcal/day.",
  },
  {
    question: "Is BMR the same as calories burned daily?",
    answer:
      "No. BMR is only the calories your body burns to perform basic life-sustaining functions at complete rest. It does not include movement, digestion, or exercise.",
  },
  {
    question: "Can I lose weight by eating my BMR?",
    answer:
      "Not necessarily. To lose weight, you must eat below your Total Daily Energy Expenditure (TDEE), not necessarily below your BMR. Eating below BMR for long periods can be unsafe.",
  },
  {
    question: "How often should I check BMR?",
    answer:
      "It is recommended to recalculate your BMR after every 4–5 kg weight change, as your metabolic needs decrease as you lose body mass.",
  },
]

export default function BMRCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="BMR Calculator"
        description="Calculate your Basal Metabolic Rate (BMR) to understand how many calories your body burns at rest."
        url="https://calqulate.net/health/bmr-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                BMR Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your Basal Metabolic Rate accurately to understand your body's energy needs. Find out exactly how many calories you burn at complete rest.
              </p>
            </div>

            {/* Calculator Component */}
            <BMRCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Definition Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is Basal Metabolic Rate (BMR)?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your basal metabolic rate (BMR) is the number of calories your body burns at complete rest to maintain essential life-sustaining functions:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <Activity className="w-4 h-4 mx-auto text-green-600 mb-1" />
                    <span className="text-[10px] font-bold text-green-800 uppercase">Breathing</span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <Zap className="w-4 h-4 mx-auto text-green-600 mb-1" />
                    <span className="text-[10px] font-bold text-green-800 uppercase">Heartbeat</span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <User className="w-4 h-4 mx-auto text-green-600 mb-1" />
                    <span className="text-[10px] font-bold text-green-800 uppercase">Brain Function</span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <Activity className="w-4 h-4 mx-auto text-green-600 mb-1" />
                    <span className="text-[10px] font-bold text-green-800 uppercase">Cell Repair</span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <Activity className="w-4 h-4 mx-auto text-green-600 mb-1" />
                    <span className="text-[10px] font-bold text-green-800 uppercase">Temperature</span>
                  </div>
                </div>
                <p className="mt-6 text-gray-700 font-medium">
                  In simple words: BMR = Calories your body needs to survive. It does NOT include exercise or daily movement.
                </p>
              </section>

              {/* Formulas Card */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Calculator className="w-5 h-5" />
                      BMR Formula (Mifflin-St Jeor)
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      Considered the most accurate modern method for estimating resting calorie burn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-5 bg-white border border-green-100 rounded-xl">
                          <h4 className="text-xs uppercase font-bold text-gray-400 mb-2">For Men</h4>
                          <p className="text-lg font-mono font-bold text-green-700">
                            (10 × wt kg) + (6.25 × ht cm) − (5 × age) + 5
                          </p>
                        </div>
                        <div className="p-5 bg-white border border-green-100 rounded-xl">
                          <h4 className="text-xs uppercase font-bold text-gray-400 mb-2">For Women</h4>
                          <p className="text-lg font-mono font-bold text-green-700">
                            (10 × wt kg) + (6.25 × ht cm) − (5 × age) − 161
                          </p>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" /> Example Manual Calculation
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          For a <strong>30-year-old female</strong> weighing <strong>65 kg</strong> and <strong>165 cm</strong> tall:<br />
                          BMR = (10×65) + (6.25×165) − (5×30) − 161 <br />
                          BMR = 650 + 1031 − 150 − 161 = <strong>1,370 kcal/day</strong>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Normal Ranges & Comparison */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Table className="text-green-600 w-5 h-5" /> Average BMR Ranges
                  </h3>
                  <Card className="not-prose overflow-hidden border-gray-100">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">Group</th>
                          <th className="px-4 py-2">Average BMR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">Adult Women</td><td className="px-4 py-3">1,200–1,600 kcal</td></tr>
                        <tr><td className="px-4 py-3">Adult Men</td><td className="px-4 py-3">1,500–1,900 kcal</td></tr>
                      </tbody>
                    </table>
                  </Card>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Scale className="text-green-600 w-5 h-5" /> BMR vs RMR
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    While often used interchangeably, <strong>RMR (Resting Metabolic Rate)</strong> is measured under less strict conditions than BMR. Practically, they are close enough for daily use in fat loss planning.
                  </p>
                </div>
              </section>

              {/* BMR and Weight Loss */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <TrendingDown className="w-6 h-6" />
                  BMR Calculator to Lose Weight
                </h2>
                  <p className="mb-6 opacity-90">
                    BMR is the foundation of fat loss. To use it effectively, you must find your{" "}
                    <Link
                      href="/health/tdee-calculator"
                      className="hover:underline hover:text-green-700 transition-colors font-medium"
                    >
                      TDEE (Total Daily Energy Expenditure)
                    </Link>
                    :
                  </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="not-prose overflow-hidden border-none bg-white/10 text-white">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="px-4 py-2">Activity Level</th>
                          <th className="px-4 py-2">Multiplier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10"><td className="px-4 py-2">Sedentary</td><td className="px-4 py-2">1.2</td></tr>
                        <tr className="border-b border-white/10"><td className="px-4 py-2">Lightly Active</td><td className="px-4 py-2">1.375</td></tr>
                        <tr className="border-b border-white/10"><td className="px-4 py-2">Moderate</td><td className="px-4 py-2">1.55</td></tr>
                        <tr><td className="px-4 py-2">Very Active</td><td className="px-4 py-2">1.725</td></tr>
                      </tbody>
                    </table>
                  </Card>
                  <div className="space-y-4 text-sm">
                    <p className="font-bold">The Strategy:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-2"><span>1.</span> Calculate BMR</li>
                      <li className="flex gap-2"><span>2.</span> Multiply by Activity (TDEE)</li>
                      <li className="flex gap-2"><span>3.</span> Create a 300–500 calorie deficit</li>
                    </ul>
                    <p className="text-xs italic bg-black/20 p-3 rounded-lg">Example: BMR (1,500) × 1.5 (TDEE: 2,250). To lose weight, eat ~1,750.</p>
                  </div>
                </div>
              </section>

              {/* Muscle & Metabolic Age */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Dumbbell className="text-green-600 w-5 h-5" /> Why Muscle Matters
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Muscle burns more calories than fat. Two people of equal weight can have different metabolic rates; the one with more muscle will have a higher BMR. This is why resistance training is key to increasing metabolism over time.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <User className="text-green-600 w-5 h-5" />
                    <Link
                      href="/health/heart-age-calculator"
                      className="hover:underline hover:text-green-700 transition-colors"
                    >
                      Metabolic Age
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Metabolic age compares your BMR to population averages for your age group. While motivational, it is not a formal medical diagnosis but a helpful indicator of your overall metabolic health.
                  </p>
                </div>
              </section>

              {/* Errors to Avoid */}
              <section className="border-2 border-dashed border-red-200 p-6 rounded-2xl bg-red-50/30">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" /> Common Mistakes When Using BMR
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">❌ Confusing BMR with total daily calorie needs</li>
                    <li className="flex items-center gap-2">❌ Eating below BMR (dangerously aggressive dieting)</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">❌ Not adjusting BMR after significant weight loss</li>
                    <li className="flex items-center gap-2">❌ Ignoring the role of strength training</li>
                  </ul>
                </div>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Final Takeaway
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  Your BMR is your body’s engine size. Your calorie intake determines whether you gain, lose, or maintain weight. A BMR calculator is not just a number tool — it’s the starting point of intelligent fat loss.
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to calculate your deficit?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you know your BMR, find out exactly how many calories you need to burn to reach your weight loss goals.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/calorie-deficit-calculator">
                      Calorie Deficit Tool <ArrowRight className="ml-2 w-4 h-4" />
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
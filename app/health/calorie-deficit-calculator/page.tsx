import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import CalorieDeficitCalculator from "@/components/calculators/calorie-deficit-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Flame,
  Calculator,
  Target,
  Dumbbell,
  Info,
  AlertCircle,
  TrendingDown,
  Table,
  CheckCircle2,
  ArrowRight,
  Scale,
  Utensils,
  History
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator: Weight Loss & Fat Loss Tool | Free",
  description:
    "Calculate your maintenance calories and daily calorie deficit needed to lose weight safely. Learn the exact formula for fat loss and muscle preservation.",
  keywords:
    "calorie deficit calculator, calculate calorie deficit, weight loss calculator, fat loss calculator, BMR calculator, TDEE calculator, calorie deficit for weight loss",
}

const faqs = [
  {
    question: "How to calculate calorie deficit to lose weight?",
    answer:
      "First, calculate your maintenance calories (TDEE). Then, subtract a safe amount, typically 300–700 calories, to create your target daily intake.",
  },
  {
    question: "How much calorie deficit is needed for weight loss?",
    answer:
      "A deficit of 500 calories per day is the gold standard, as it leads to approximately 0.5 kg of weight loss per week, which is sustainable and safe.",
  },
  {
    question: "How much calorie deficit to lose fat (not muscle)?",
    answer:
      "A moderate deficit of 300–500 kcal combined with high protein intake (1.6–2.2g/kg) and strength training helps preserve muscle while losing fat.",
  },
  {
    question: "How to find your calorie deficit manually?",
    answer:
      "It is your Maintenance Calories (TDEE) minus your daily caloric intake. If your TDEE is 2500 and you eat 2000, your deficit is 500.",
  },
  {
    question: "Is it the same as a calorie deficiency calculator?",
    answer:
      "Yes, people often use these terms interchangeably. However, in nutrition, a 'deficit' is intentional for weight loss, while 'deficiency' usually refers to a lack of specific nutrients.",
  },
]

export default function CalorieDeficitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Calorie Deficit Calculator"
        description="Calculate exactly how many calories you need to burn and consume to reach your weight loss goals."
        url="https://calqulate.net/health/calorie-deficit-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Calorie Deficit Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate exactly how many calories you need to lose weight. Understand your BMR, TDEE, and the perfect deficit for sustainable fat loss.
              </p>
            </div>

            {/* Calculator Component */}
            <CalorieDeficitCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Core Definition */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-green-600" />
                  What Is a Calorie Deficit?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A calorie deficit happens when: <strong>Calories Burned &gt; Calories Consumed</strong>. When this happens consistently, your body uses stored fat for energy, leading to weight loss.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="font-bold text-green-800 text-sm">Weight Loss Speed</p>
                    <p className="text-xs text-gray-600">Determined by the depth of your daily deficit.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="font-bold text-green-800 text-sm">Fat vs. Muscle</p>
                    <p className="text-xs text-gray-600">A proper deficit ensures you lose fat, not muscle mass.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="font-bold text-green-800 text-sm">Sustainability</p>
                    <p className="text-xs text-gray-600">Calculated deficits prevent extreme hunger and rebounding.</p>
                  </div>
                </div>
              </section>

              {/* Step by Step Guide */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Calculate Calorie Deficit (Step-by-Step)</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Calculate Your BMR (Basal Metabolic Rate)</h4>
                      <p className="text-sm text-gray-600 mb-2">We use the Mifflin-St Jeor Formula, the most accurate for adults:</p>
                      <div className="bg-gray-50 p-3 rounded-lg text-xs font-mono">
                        Men: (10 × wt kg) + (6.25 × ht cm) − (5 × age) + 5 <br />
                        Women: (10 × wt kg) + (6.25 × ht cm) − (5 × age) − 161
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Calculate Your TDEE (Total Daily Energy Expenditure)</h4>
                      <p className="text-sm text-gray-600">Multiply your BMR by your activity level multiplier:</p>
                      <Card className="not-prose mt-3 overflow-hidden border-green-100">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-green-50">
                            <tr>
                              <th className="px-4 py-2">Activity Level</th>
                              <th className="px-4 py-2">Multiplier</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr><td className="px-4 py-2">Sedentary</td><td className="px-4 py-2">1.2</td></tr>
                            <tr><td className="px-4 py-2">Light Exercise</td><td className="px-4 py-2">1.375</td></tr>
                            <tr><td className="px-4 py-2">Moderate Exercise</td><td className="px-4 py-2">1.55</td></tr>
                            <tr><td className="px-4 py-2">Very Active</td><td className="px-4 py-2">1.725</td></tr>
                          </tbody>
                        </table>
                      </Card>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Apply the Calorie Deficit Formula</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                        <strong>Calorie Deficit = Maintenance Calories (TDEE) − Target Intake</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Loss Targets Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" />
                  Safe Fat Loss Deficit Targets
                </h2>
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Daily Deficit</th>
                        <th className="px-6 py-4 text-left font-bold">Expected Weekly Loss</th>
                        <th className="px-6 py-4 text-left font-bold">Effort Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4">300 kcal</td><td className="px-6 py-4">~0.25 kg</td><td className="px-6 py-4 text-green-600 font-medium">Easy/Slow</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-4">500 kcal</td><td className="px-6 py-4">~0.5 kg</td><td className="px-6 py-4 text-green-700 font-bold">Sustainable</td></tr>
                      <tr><td className="px-6 py-4">750 kcal</td><td className="px-6 py-4">~0.7 kg</td><td className="px-6 py-4 text-yellow-600 font-medium">Moderate</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-4">1000 kcal</td><td className="px-6 py-4">~1 kg</td><td className="px-6 py-4 text-red-600 font-bold">Aggressive</td></tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>How Many Calories Deficit to Lose 1kg?</strong> 1 kg of fat ≈ 7,700 calories. To lose 1kg in a week, you'd need an 1,100 calorie daily deficit, which is aggressive and not ideal for most.
                </p>
              </section>

              {/* Fat Loss vs Muscle */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-green-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Dumbbell className="text-green-600 w-5 h-5" /> Lose Fat, Not Muscle
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Keep deficit moderate (300-500)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Eat 1.6–2.2g of protein per kg</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Prioritize strength training</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Avoid crash dieting</li>
                  </ul>
                </div>
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Common Mistakes
                  </h3>
                  <ul className="text-xs space-y-2 text-red-900/80">
                    <li><strong>Eating too little:</strong> Leads to metabolic adaptation.</li>
                    <li><strong>Untracked oils/sauces:</strong> Hidden calories remove your deficit.</li>
                    <li><strong>Weekend overeating:</strong> Canceling out the weekday deficit.</li>
                    <li><strong>Overestimating exercise:</strong> Gym sessions burn less than you think.</li>
                  </ul>
                </div>
              </section>

              {/* Plateau Section */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <History className="w-6 h-6" />
                  Managing Weight Loss Plateaus
                </h2>
                <p className="mb-6 opacity-90">Most calculators don’t mention metabolic adaptation — but it matters. If you stop losing weight:</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <strong>Recalculate:</strong> A lighter body burns fewer calories. Update your weight in the calculator monthly.
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <strong>Diet Breaks:</strong> Spend 1–2 weeks eating at maintenance to reset your hormones and metabolism.
                  </div>
                </div>
              </section>

              {/* Realistic Expectations */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Realistic Expectations</h2>
                <p className="text-gray-700 mb-4">A healthy fat loss rate is <strong>0.5–1% of body weight per week</strong>. For an 80kg person, losing 0.4–0.8 kg per week is realistic and sustainable. Faster loss increases the risk of a weight rebound.</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">The "Free Calorie Deficit Calculator" Quality Standard:</h4>
                  <p className="text-sm text-gray-600">An accurate tool must use the Mifflin-St Jeor formula, adjust for activity, allow for goal-based selection, and warn against cutting calories below your BMR.</p>
                </div>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Final Takeaway</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  Weight loss is not about starving. It’s about creating a controlled, sustainable calorie deficit. The best results happen when the deficit is moderate, protein is adequate, and progress is tracked weekly.
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Curious about your hydration?</h3>
                    <p className="text-gray-300 max-w-md">
                      When dieting, water intake becomes even more critical for metabolic health.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/water-intake-calculator">
                      Check Water Intake <ArrowRight className="ml-2 w-4 h-4" />
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
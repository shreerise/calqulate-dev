import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import DailyWaterIntakeCalculator from "@/components/calculators/daily-water-intake-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Droplets, Activity, Sun, Info, HeartPulse, CupSoda, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Daily Water Intake Calculator: How Much Water Should You Drink?",
  description:
    "Calculate your exact daily water intake based on your weight, activity level, and climate. Get personalized hydration goals, hourly tracking tips, and fluid vs. food breakdowns.",
  keywords:
    "daily water intake calculator, how much water should I drink, hydration calculator, water requirement calculator, calculate water intake, daily water requirement, water calculator by weight, hydration tracker",
}

const faqs = [
  {
    question: "How is my daily water intake calculated?",
    answer:
      "Our calculator uses an industry-standard formula (approximately 35ml of water per kilogram of body weight) and adjusts it dynamically based on your daily exercise duration, local climate, and specific biological conditions like pregnancy or lactation.",
  },
  {
    question: "Does coffee or tea count toward my daily water intake?",
    answer:
      "Yes! While caffeine is a mild diuretic, the water in coffee and tea still contributes to your overall daily fluid intake. However, plain water is always the most efficient way to stay hydrated.",
  },
  {
    question: "Do I need to drink more water if I exercise?",
    answer:
      "Absolutely. When you exercise, you lose water through sweat. Our calculator automatically adds approximately 12 to 14 ounces (about 350-400ml) of water for every 30 minutes of physical activity you perform.",
  },
  {
    question: "How much of my water comes from food?",
    answer:
      "On average, about 20% of your daily hydration comes from the foods you eat, especially fruits and vegetables like watermelon, cucumbers, and oranges. Our calculator breaks down exactly how much you should drink versus how much you will naturally eat.",
  },
  {
    question: "Can I drink too much water?",
    answer:
      "Yes. Drinking excessive amounts of water in a short period can lead to a dangerous condition called hyponatremia (water intoxication), where your blood sodium levels drop too low. It's best to spread your intake throughout the day as recommended in our hourly breakdown.",
  },
  {
    question: "Why do I need more water in hot weather?",
    answer:
      "In hot or humid climates, your body sweats more to regulate its temperature, even if you aren't exercising. We add a 500ml (approx. 17 oz) buffer to your daily goal if you live in a hot climate.",
  },
]

export default function DailyWaterIntakeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Daily Water Intake Calculator"
        description="Calculate your exact daily water intake based on your weight, activity level, and climate. Get personalized hydration goals and hourly tracking tips."
        url="https://calqulate.net/health/daily-water-intake-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Daily Water Intake Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Hydration is the foundation of good health. Stop guessing how much water you need. 
                Enter your weight, activity level, and environment to get a highly personalized, 
                science-backed hydration profile—complete with a fluid vs. food breakdown and hourly goals.
              </p>
            </div>

            {/* Calculator Component */}
            <DailyWaterIntakeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is it? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is a Daily Water Intake Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  While the old rule of "8 glasses a day" is easy to remember, it isn't medically accurate for everyone. 
                  A 200-pound athlete living in a hot climate needs significantly more water than a 130-pound office worker in a mild climate.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Our <b>Daily Water Intake Calculator</b> relies on guidelines from the National Academies of Sciences, Engineering, and Medicine, adapting base weight formulas with real-life variables like sweat loss (exercise) and environmental heat. 
                </p>

                <Card className="mt-8 border border-blue-100 bg-blue-50/50 shadow-sm rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-blue-800">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      The 80/20 Hydration Rule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Did you know you don't actually have to <i>drink</i> 100% of your water goal? According to clinical standards, about <b>20% of your daily water intake comes from the food you eat</b> (especially fruits, vegetables, and soups). Our calculator separates your "Drinking Goal" from your total requirement so you don't over-hydrate.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Referral to Body Shape Calculator */}
              <section>
                <Card className="not-prose border-2 border-primary/20 shadow-md">
                  <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <HeartPulse className="w-6 h-6 text-primary" />
                        Hydration & Your Body Shape
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Proper hydration directly impacts your metabolism, skin elasticity, and how your body stores or flushes weight. Water weight can completely alter your physical proportions!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Once you've optimized your hydration, why not discover what your true body proportions mean for your health and style?
                      </p>
                      <Link href="/health/body-shape-calculator" className="inline-block mt-2 font-semibold text-primary hover:underline">
                        Try our Body Shape Calculator →
                      </Link>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="p-4 bg-muted rounded-full">
                        <Activity className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Standard Hydration Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Institute of Medicine (IOM) General Guidelines</CardTitle>
                    <CardDescription>
                      These are the baseline adequate intake (AI) levels for total water (from all beverages and foods) per day.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border px-4 py-3 text-left">Demographic</th>
                            <th className="border px-4 py-3 text-left">Total Water (Liters)</th>
                            <th className="border px-4 py-3 text-left">Total Water (Ounces)</th>
                            <th className="border px-4 py-3 text-left">Approx. Fluid Goal (Drink)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Adult Men (19+ yrs)</td>
                            <td className="border px-4 py-3">3.7 L / day</td>
                            <td className="border px-4 py-3">125 oz / day</td>
                            <td className="border px-4 py-3">~3.0 L (101 oz)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Adult Women (19+ yrs)</td>
                            <td className="border px-4 py-3">2.7 L / day</td>
                            <td className="border px-4 py-3">91 oz / day</td>
                            <td className="border px-4 py-3">~2.2 L (74 oz)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Pregnant Women</td>
                            <td className="border px-4 py-3">3.0 L / day</td>
                            <td className="border px-4 py-3">101 oz / day</td>
                            <td className="border px-4 py-3">~2.4 L (81 oz)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Lactating Women</td>
                            <td className="border px-4 py-3">3.8 L / day</td>
                            <td className="border px-4 py-3">128 oz / day</td>
                            <td className="border px-4 py-3">~3.1 L (104 oz)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Factors Influencing Hydration */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Key Factors That Change Your Water Needs</b>
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <Activity className="w-6 h-6 text-blue-500 mb-2" />
                      <CardTitle className="text-base">Physical Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      If you do any activity that makes you sweat, you need to drink extra water to cover the fluid loss. It's important to drink water before, during, and after a workout.
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <Sun className="w-6 h-6 text-orange-500 mb-2" />
                      <CardTitle className="text-base">Environment</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Hot or humid weather can make you sweat and requires additional fluid. Dehydration can also occur at high altitudes.
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <HeartPulse className="w-6 h-6 text-red-500 mb-2" />
                      <CardTitle className="text-base">Overall Health</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Your body loses fluids when you have a fever, vomiting, or diarrhea. Pregnancy and breast-feeding also significantly increase baseline requirements.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Benefits of staying hydrated */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Benefits of Hitting Your Hydration Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <ul className="list-disc pl-4 space-y-2">
                      <li><b>Flushes out wastes</b> through urination, perspiration, and bowel movements.</li>
                      <li><b>Regulates body temperature</b> and prevents heat stroke.</li>
                      <li><b>Lubricates and cushions joints</b>, reducing physical fatigue.</li>
                      <li><b>Protects sensitive tissues</b> and the spinal cord.</li>
                      <li><b>Boosts skin health</b> by maintaining elasticity and flushing toxins.</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
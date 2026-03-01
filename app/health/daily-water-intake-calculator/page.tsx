import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import WaterIntakeCalculator from "@/components/calculators/daily-water-intake-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Droplets,
  ThermometerSun,
  Dumbbell,
  Info,
  AlertCircle,
  GlassWater,
  Table,
  CheckCircle2,
  ArrowRight,
  User,
  Utensils,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Daily Water Intake Calculator: How Much Water Should You Drink?",
  description:
    "Calculate your personalized daily water intake based on weight, activity level, and climate. Get specific hydration advice for Indian weather conditions.",
  keywords:
    "daily water intake calculator, how much water to drink, hydration calculator, water intake calculator India, calculate water needs by weight, dehydration signs",
}

const faqs = [
  {
    question: "What is a daily water intake calculator?",
    answer:
      "It is a tool that estimates your daily hydration needs based on factors like body weight, activity levels, and lifestyle, providing a more personalized target than the generic '8 glasses a day' rule.",
  },
  {
    question: "How do I calculate daily water intake manually?",
    answer:
      "A common nutritionist-approved method is to multiply your body weight in kg by 30–35 ml. For example, a 60kg person needs roughly 1.8 to 2.1 liters per day.",
  },
  {
    question: "Is 8 glasses of water enough?",
    answer:
      "For some people, yes. However, for many—especially those living in hot climates like India or those who are physically active—8 glasses is often not enough to maintain optimal hydration.",
  },
  {
    question: "How much water should I drink in India?",
    answer:
      "Due to high average temperatures and sweat loss, most adults in India need between 2.5 to 3.5 liters per day, even if they aren't performing heavy exercise.",
  },
  {
    question: "Does food count toward daily water intake?",
    answer:
      "Yes. Fruits and vegetables contribute about 20–30% of your hydration. However, plain water should still be your primary source of fluids.",
  },
  {
    question: "Can drinking too much water be harmful?",
    answer:
      "Yes. While rare, excessive water intake without proper electrolyte balance can lead to hyponatremia (water intoxication). Balance is key.",
  },
]

export default function WaterIntakeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Daily Water Intake Calculator"
        description="Estimate how much water your body needs each day based on weight, climate, and activity level."
        url="https://calqulate.net/health/water-intake-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Daily Water Intake Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                How much water do you really need each day? Use our personalized calculator to find your hydration target based on your weight, lifestyle, and climate.
              </p>
            </div>

            {/* Calculator Component */}
            <WaterIntakeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Definition Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is a Daily Water Intake Calculator?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A daily water intake calculator estimates how much water your body needs each day based on:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <User className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <span className="text-xs font-bold text-green-800">Body weight</span>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <ThermometerSun className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <span className="text-xs font-bold text-green-800">Climate</span>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <Dumbbell className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <span className="text-xs font-bold text-green-800">Activity Level</span>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <Zap className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <span className="text-xs font-bold text-green-800">Lifestyle</span>
                  </div>
                </div>
                <p className="mt-6 text-gray-700">
                  Unlike generic advice like “drink 8 glasses a day,” this calculator gives a personalized hydration target tailored specifically to you.
                </p>
              </section>

              {/* Variation Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Water Intake Is Not the Same for Everyone</h2>
                <p className="text-gray-700 mb-4">Your water needs change dynamically. A "daily water intake calculator India" gives more realistic guidance because it accounts for:</p>
                <ul className="grid md:grid-cols-2 gap-2 list-none pl-0">
                  <li className="flex items-center gap-2 bg-white p-3 border rounded-lg text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Hot or humid climates
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 border rounded-lg text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Diet (High protein or salt)
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 border rounded-lg text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Physical exertion/Sweat loss
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 border rounded-lg text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Illness, fever, or pregnancy
                  </li>
                </ul>
              </section>

              {/* Formula & Examples Card */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Droplets className="w-5 h-5" />
                      How to Calculate Daily Water Intake
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      The weight-based method used by nutritionists globally.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-white border-2 border-green-600 border-dashed p-6 rounded-xl text-center mb-8">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Basic Formula (Adults)</p>
                      <p className="text-2xl md:text-3xl font-bold text-green-700">Daily Water (ml) = Weight (kg) × 30–35</p>
                    </div>

                    <h4 className="font-bold text-gray-800 mb-4">Calculation Examples:</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-bold text-sm mb-1">Example 1: Sedentary Adult (60kg)</p>
                        <p className="text-sm text-gray-600">60 × 30 = 1800 ml <br /><strong>✅ About 1.8 liters/day</strong></p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-bold text-sm mb-1">Example 2: Active Adult in India (70kg)</p>
                        <p className="text-sm text-gray-600">70 × 35 = 2450 ml <br /><strong>✅ About 2.4–2.5 liters/day</strong></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* India-Specific Adjustments */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ThermometerSun className="w-6 h-6 text-orange-500" />
                  India-Specific Guidance (Practical Adjustments)
                </h2>
                <p className="mb-6 text-gray-700">Most global calculators ignore high average temperatures and sweat loss. Many Indians need 2.5–3.5 liters/day, even without gym workouts.</p>
                
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Condition</th>
                        <th className="px-6 py-4 text-left font-bold">Add Extra Water</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-3">Hot weather / Humidity</td><td className="px-6 py-3 font-medium">+500 ml</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-3">Heavy sweating</td><td className="px-6 py-3 font-medium">+500–1000 ml</td></tr>
                      <tr><td className="px-6 py-3">Exercise &gt; 45 min</td><td className="px-6 py-3 font-medium">+500 ml</td></tr>
                      <tr className="bg-green-50/30"><td className="px-6 py-3">Fever / Illness</td><td className="px-6 py-3 font-medium">+500 ml</td></tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Quick Chart */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Table className="w-6 h-6 text-green-600" />
                  Daily Water Intake Chart (Adults)
                </h2>
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm text-center">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 font-bold">Body Weight</th>
                        <th className="px-4 py-3 font-bold">Recommended Intake (L)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-4 py-3">50 kg</td><td className="px-4 py-3">1.5 – 1.8 L</td></tr>
                      <tr><td className="px-4 py-3">60 kg</td><td className="px-4 py-3">1.8 – 2.1 L</td></tr>
                      <tr><td className="px-4 py-3">70 kg</td><td className="px-4 py-3">2.1 – 2.5 L</td></tr>
                      <tr><td className="px-4 py-3">80 kg</td><td className="px-4 py-3">2.4 – 2.8 L</td></tr>
                      <tr><td className="px-4 py-3">90 kg</td><td className="px-4 py-3">2.7 – 3.1 L</td></tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-xs text-gray-500 italic">📌 This target includes plain water + fluids derived from your food.</p>
              </section>

              {/* Food & Drink Section */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-green-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Utensils className="text-green-600 w-5 h-5" /> Does Food Count?
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-2"><strong>✔ Fruits/Veg:</strong> Account for ~20–30% of hydration.</li>
                    <li className="flex gap-2"><strong>✔ Tea/Coffee:</strong> They count, but caffeine can offset some benefits.</li>
                    <li className="flex gap-2 text-red-600"><strong>❌ Sugary Drinks:</strong> Not ideal for hydration.</li>
                  </ul>
                  <p className="mt-4 text-xs font-semibold">Plain water should always be the main source.</p>
                </div>
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Signs of Dehydration
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium text-red-700">
                    <div className="bg-white/50 p-2 rounded">Dark yellow urine</div>
                    <div className="bg-white/50 p-2 rounded">Dry mouth or lips</div>
                    <div className="bg-white/50 p-2 rounded">Fatigue & Headaches</div>
                    <div className="bg-white/50 p-2 rounded">Constipation</div>
                  </div>

                  <p className="mt-4 text-xs text-red-800 font-bold italic">
                    Thirst means you’re already dehydrated! Severe dehydration may also affect{" "}
                    <Link
                      href="/health/blood-pressure-calculator"
                      className="underline hover:text-red-900 transition-colors"
                    >
                      blood pressure
                    </Link>
                    , leading to dizziness or fainting.
                  </p>
                </div>
              </section>

              {/* How to Drink correctly */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <GlassWater className="w-6 h-6" />
                  How to Drink Water Correctly
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-green-200 uppercase tracking-wider text-sm">Mistakes to Avoid:</h4>
                    <ul className="space-y-2 text-sm opacity-90 list-disc pl-4">
                      <li>Drinking massive amounts all at once</li>
                      <li>Waiting until you are very thirsty</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-green-200 uppercase tracking-wider text-sm">The Right Way:</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Sip water throughout the day</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Start morning with 1 glass</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Drink before meals</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Myths & Apps */}
              <section className="space-y-8">
                <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Apps vs. Calculators</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A daily water intake calculator app can help with reminders, but they often overestimate needs and ignore local climate adjustments. The best approach is to use this calculator to set your target and use apps only as reminders.
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Common Myths About Water Intake</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 italic">"More water is always better" — False</span>
                    <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 italic">"Urine must be crystal clear" — False</span>
                    <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 italic">"Only water hydrates" — False</span>
                  </div>
                </div>
              </section>

              {/* Professional Footer CTA */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Checking your health metrics?</h3>
                    <p className="text-gray-300 max-w-md">
                      Hydration is step one. Step two is understanding your body’s metabolic markers.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/estimated-average-glucose-calculator">
                      Check Average Glucose <ArrowRight className="ml-2 w-4 h-4" />
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
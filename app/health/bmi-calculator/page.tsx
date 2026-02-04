import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BMICalculator from "@/components/calculators/bmi-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Scale, 
  Info, 
  Calculator as CalculatorIcon, 
  User, 
  Users, 
  Zap, 
  Utensils, 
  Clock, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react"

export const metadata: Metadata = {
  title: "BMI Calculator: Calculate Your Body Mass Index & Healthy Weight",
  description:
    "Calculate your BMI (Body Mass Index) to understand if your weight matches your height. Get personalized health tips for men, women, and simple diet swaps.",
  keywords:
    "BMI calculator, body mass index, how to calculate BMI, BMI chart, healthy weight calculator, BMI for men, BMI for women, weight management",
}

const faqs = [
  {
    question: "Is BMI accurate for gym people?",
    answer:
      "Not always. Muscle weighs more than fat, so BMI may appear higher (showing 'overweight' or 'obese') even if the person has a very low body fat percentage.",
  },
  {
    question: "Why is my BMI normal but I still have belly fat?",
    answer:
      "BMI measures weight vs height, not fat distribution. This is often called 'normal weight obesity.' In such cases, waist size also matters for assessing health risks.",
  },
  {
    question: "Should women check BMI during periods?",
    answer:
      "Yes, but remember slight temporary increases are normal. Women’s bodies naturally experience hormonal weight fluctuations and water retention during periods.",
  },
  {
    question: "How often should I check BMI?",
    answer:
      "Once every 2–3 months is enough for most people. Tracking daily or weekly is unnecessary as body composition changes take time.",
  },
  {
    question: "Is BMI different after 40?",
    answer:
      "The formula is the same, but metabolism slows slightly with age. Maintaining a healthy BMI after 40 often requires more consistent physical activity and dietary adjustments.",
  },
]

export default function BMICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) instantly. Understand your weight category and get actionable health advice."
        url="https://calqulate.net/health/bmi-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                BMI Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Knowing your BMI (Body Mass Index) helps you quickly understand whether your weight matches your height. It is one of the easiest health indicators used worldwide.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                But BMI is not just a number — it gives you a direction. This page helps you not only calculate BMI, but also understand what to do next in real life.
              </p>
            </div>

            {/* Calculator Component */}
            <BMICalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* What is BMI? */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What is BMI?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  BMI stands for Body Mass Index. It is a simple formula that compares your weight and height to estimate whether you are underweight, normal weight, overweight, or obese.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Doctors, fitness trainers, and health apps use BMI as a starting point, not a final judgment.
                </p>

                <Card className="mt-8 border border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-800">
                      <CalculatorIcon className="w-5 h-5" />
                      How to Calculate BMI (Formula)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">The Formula:</h3>
                      <p className="bg-gray-100 p-4 rounded-lg font-mono mb-4 text-center text-lg border-l-4 border-green-600">
                        BMI = Weight (kg) ÷ Height² (meters)
                      </p>
                      <p className="text-gray-600">
                        You don’t need to calculate this manually every day — that’s why BMI calculators exist. But knowing the formula helps you understand doctor reports and fitness apps better.
                      </p>
                    </div>
                    <div className="flex flex-col justify-center bg-white border border-green-100 rounded-xl p-5">
                      <h3 className="text-green-800 font-bold mb-3">Example Calculation:</h3>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p><b>Weight:</b> 70 kg</p>
                        <p><b>Height:</b> 1.70 m</p>
                        <p className="pt-2 border-t mt-2"><b>Math:</b> 70 ÷ (1.70 × 1.70)</p>
                        <p className="text-lg font-bold text-green-700">Result: 24.2 (Normal)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* BMI Chart */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-800">BMI Chart – What Your Number Means in Daily Life</h2>
                <Card className="not-prose border-green-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-green-600 text-white">
                            <th className="px-6 py-4 text-left font-bold">BMI Range</th>
                            <th className="px-6 py-4 text-left font-bold">Category</th>
                            <th className="px-6 py-4 text-left font-bold">What It Means Practically</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="px-6 py-4 font-medium">Below 18.5</td>
                            <td className="px-6 py-4 text-blue-600 font-semibold">Underweight</td>
                            <td className="px-6 py-4">Low energy, may need more nutrition & strength training</td>
                          </tr>
                          <tr className="bg-green-50/50">
                            <td className="px-6 py-4 font-medium">18.5 – 24.9</td>
                            <td className="px-6 py-4 text-green-600 font-semibold">Normal</td>
                            <td className="px-6 py-4">Balanced weight, easier stamina, lower lifestyle risk</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium">25 – 29.9</td>
                            <td className="px-6 py-4 text-orange-600 font-semibold">Overweight</td>
                            <td className="px-6 py-4">Fat gain starting, small diet & activity changes help</td>
                          </tr>
                          <tr className="bg-red-50/30">
                            <td className="px-6 py-4 font-medium">30+</td>
                            <td className="px-6 py-4 text-red-600 font-semibold">Obese</td>
                            <td className="px-6 py-4">Higher strain on joints & heart, structured plan recommended</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <p className="mt-4 text-sm text-center italic text-gray-500">
                  BMI is a guideline, not a verdict. Lifestyle matters more than a single number.
                </p>
              </section>

              {/* Men vs Women Section */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                    <User className="text-green-600" /> BMI Calculator for Men
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Men often confuse muscle weight with fat weight. If you go to the gym or lift weights, your BMI might show “overweight” even when your body fat is low.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-600">
                    <h4 className="font-bold text-sm mb-2">Practical Tips for Men:</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• Check waist size along with BMI.</li>
                      <li>• Waist under 34 inches with BMI 25–27 may indicate muscle.</li>
                      <li>• If waist is above 38 inches, fat risk is higher even if BMI looks normal.</li>
                      <li>• Combine BMI with strength, stamina, and body measurements.</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                    <Users className="text-green-600" /> BMI Calculator for Women
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Women’s bodies naturally experience hormonal weight fluctuations. BMI can slightly rise due to water retention during periods or stress.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-600">
                    <h4 className="font-bold text-sm mb-2">Practical Tips for Women:</h4>
                    <ul className="text-xs space-y-2 text-gray-600">
                      <li>• BMI can temporarily increase 0.5–1 point during periods — this is normal.</li>
                      <li>• Post-pregnancy weight changes are gradual and natural.</li>
                      <li>• Conditions like PCOS or thyroid imbalance may affect BMI.</li>
                      <li>• Focus on monthly trends instead of daily numbers.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Action Plan */}
              <section className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h2 className="text-2xl font-bold mb-6 text-green-900">What to Do After Knowing Your BMI</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-blue-700 mb-2">If Underweight</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Increase protein (paneer, eggs, lentils).</li>
                      <li>• Start light strength training.</li>
                      <li>• Sleep 7–8 hours daily.</li>
                      <li>• Avoid skipping meals.</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-green-700 mb-2">If Normal Weight</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Maintain your eating pattern.</li>
                      <li>• Walk/exercise 30 minutes daily.</li>
                      <li>• Drink enough water.</li>
                      <li>• Monitor BMI every 2–3 months.</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-orange-700 mb-2">If Overweight</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Reduce sugary drinks and fried snacks.</li>
                      <li>• Walk 8,000–10,000 steps daily.</li>
                      <li>• Create a small calorie deficit.</li>
                      <li>• Focus on consistency, not speed.</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-red-700 mb-2">If Obese</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Consult a professional before heavy exercise.</li>
                      <li>• Start with walking and simple diet control.</li>
                      <li>• Avoid extreme/instant loss methods.</li>
                      <li>• Aim for slow, steady improvement.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitations */}
              <section className="border-l-4 border-orange-400 bg-orange-50/50 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" /> BMI Limitations – When BMI Can Be Misleading
                </h3>
                <p className="text-sm text-gray-700 mb-2">BMI does not perfectly apply to:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-orange-500" /> Athletes</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-orange-500" /> Pregnant women</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-orange-500" /> Elderly individuals</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-orange-500" /> Children/Teens</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-orange-500" /> High muscle mass</div>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  In these cases, body fat percentage or waist measurement gives better insight.
                </p>
              </section>

              {/* Indian Diet Swaps */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                  <Utensils className="w-6 h-6 text-green-600" /> Simple Indian Diet Swaps for Better BMI
                </h2>
                <Card className="not-prose overflow-hidden border-green-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="px-6 py-3 text-left font-bold text-green-900">Instead of</th>
                        <th className="px-6 py-3 text-left font-bold text-green-900">Try This</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-3 text-gray-500">Fried namkeen</td>
                        <td className="px-6 py-3 font-medium text-green-700">Roasted chana or peanuts</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-500">Sugary tea 3–4 times</td>
                        <td className="px-6 py-3 font-medium text-green-700">1–2 times with less sugar</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-500">Daily white rice</td>
                        <td className="px-6 py-3 font-medium text-green-700">Mix brown rice or millets</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-500">Late-night sweets</td>
                        <td className="px-6 py-3 font-medium text-green-700">Fruit or yogurt</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-500">Soft drinks</td>
                        <td className="px-6 py-3 font-medium text-green-700">Lemon water or coconut water</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-center text-gray-600 font-medium italic">Small swaps daily create long-term results.</p>
              </section>

              {/* Timeline */}
              <section className="py-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Clock className="w-6 h-6 text-green-600" /> How Long Does It Take to Improve BMI?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { points: "1–2 Points", time: "1–2 Months", color: "bg-green-50 text-green-700" },
                    { points: "3–4 Points", time: "3–4 Months", color: "bg-green-100 text-green-800" },
                    { points: "5+ Points", time: "5–8 Months", color: "bg-green-600 text-white" }
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl text-center ${item.color}`}>
                      <p className="text-sm uppercase tracking-widest opacity-80 mb-1">Improvement</p>
                      <p className="text-2xl font-bold mb-2">{item.points}</p>
                      <div className="h-px bg-current opacity-20 my-2" />
                      <p className="font-semibold">{item.time}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-gray-600 italic">
                  Healthy change is gradual, not instant. Fast loss often returns quickly.
                </p>
              </section>

              {/* Final Note */}
              <section className="text-center py-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">BMI is not a judgment — it is a direction.</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Your health is shaped by daily habits like food, sleep, movement, and stress management. 
                  Use BMI as a starting point, not a final decision. Small consistent improvements always beat sudden extreme changes.
                </p>
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
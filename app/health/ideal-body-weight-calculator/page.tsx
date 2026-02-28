import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import IdealBodyWeightCalculator from "@/components/calculators/ideal-body-weight-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Scale, 
  Dumbbell, 
  Users, 
  Calculator as CalculatorIcon, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  Stethoscope, 
  Target 
} from "lucide-react"

export const metadata: Metadata = {
  title: "Ideal Body Weight Calculator: Find Your Healthy Weight Range",
  description:
    "Calculate your ideal body weight (IBW) based on medical formulas. Understand your healthy weight range for height and gender with our accurate tool.",
  keywords:
    "ideal body weight calculator, IBW calculator, how to calculate ideal weight, ideal weight for women, ideal weight for men, Devine formula, healthy weight range",
}

const faqs = [
  {
    question: "What is the ideal body weight calculator used for?",
    answer:
      "To estimate a healthy target weight based on height and gender using medically accepted formulas like the Devine Formula.",
  },
  {
    question: "How accurate is ideal body weight?",
    answer:
      "It provides a safe reference range for medical and nutritional planning, but it doesn't account for muscle mass or bone density. It is a guide, not a perfect number.",
  },
  {
    question: "Is ideal body weight better than BMI?",
    answer:
      "They serve different purposes. IBW helps set specific weight goals, while BMI is used to classify general health risk categories.",
  },
  {
    question: "What is the ideal body weight calculation formula?",
    answer:
      "The most common is the Devine Formula: for men, 50kg + 2.3kg per inch over 5ft; for women, 45.5kg + 2.3kg per inch over 5ft.",
  },
  {
    question: "Can women use the same formula as men?",
    answer:
      "No. Ideal body weight calculator female formulas are different because women naturally have different body fat percentages and muscle distributions.",
  },
  {
    question: "Should age be considered?",
    answer:
      "While age affects body composition (muscle and bone density), it does not change the core IBW formula. However, older adults may be healthy slightly above their IBW.",
  },
]

export default function IBWCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Ideal Body Weight Calculator"
        description="Estimate your healthy weight range using scientific formulas. Accurate calculations for men and women based on height."
        url="https://calqulate.net/health/ideal-body-weight-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Ideal Body Weight Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                An ideal body weight calculator estimates the healthy weight range for a person based on height and gender, using medically accepted formulas.
              </p>
              <p className="text-base text-muted-foreground mt-3 italic">
                “Am I underweight, healthy, or overweight for my height?” — This tool uses scientific formulas, not social trends, to give you a clear answer.
              </p>
            </div>

            {/* Calculator Component */}
            <IdealBodyWeightCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* What is IBW? */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is an Ideal Body Weight Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  It answers questions like:
                </p>
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="text-sm font-bold text-green-800">Health Check</p>
                    <p className="text-xs text-green-700 mt-1">Status for height</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="text-sm font-bold text-green-800">Weight Goals</p>
                    <p className="text-xs text-green-700 mt-1">What you should be</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="text-sm font-bold text-green-800">Safety</p>
                    <p className="text-xs text-green-700 mt-1">Gain/loss targets</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Unlike guesswork or social standards, this calculator uses scientific formulas, not trends.
                </p>
              </section>

              {/* How to Calculate & Formula */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Calculate Ideal Body Weight</h2>
                <p className="text-gray-700 mb-6">
                  Doctors don’t use just one formula. They compare multiple methods to get a realistic range. The most commonly used ideal body weight calculation formula is the <b>Devine Formula</b>.
                </p>
                
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden mb-8">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <CalculatorIcon className="w-5 h-5" />
                      Ideal Body Weight Calculation Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 bg-white">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 border-b pb-2">For Men</h4>
                        <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
                          IBW = 50 kg + 2.3 kg per inch over 5 feet
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 border-b pb-2">For Women</h4>
                        <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
                          IBW = 45.5 kg + 2.3 kg per inch over 5 feet
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-500 italic">
                      This formula is widely used in hospitals, medical dosing, and nutrition planning.
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Female Focus & Example */}
              <section className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Ideal Body Weight Calculator – Female Focus
                  </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Women naturally have higher essential{" "}
                      <Link
                        href="/health/body-fat-calculator"
                        className="text-pink-600 hover:underline hover:text-pink-800 transition-colors font-medium"
                      >
                        body fat
                      </Link>
                      , different hormonal balances, and different muscle distributions. 
                      That’s why female-specific formulas are essential.
                    </p>
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h4 className="font-bold text-green-900 mb-3">Example: 5&apos;2&quot; Female</h4>
                    <ul className="text-sm space-y-1 text-green-800 font-medium">
                      <li>• Height: 5 feet 2 inches</li>
                      <li>• Extra inches over 5ft: 2</li>
                      <li>• Calculation: 45.5 + (2 × 2.3)</li>
                      <li className="text-lg pt-2">✅ Ideal weight: ~50.1 kg</li>
                    </ul>
                  </div>
                </div>

                <div className="not-prose">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Healthy Range Chart (Women)</h3>
                  <div className="border border-green-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-green-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">Height</th>
                          <th className="px-4 py-3 text-left">Ideal Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">5&apos;0&quot;</td><td className="px-4 py-3 font-bold text-green-700">~45.5</td></tr>
                        <tr><td className="px-4 py-3">5&apos;2&quot;</td><td className="px-4 py-3 font-bold text-green-700">~50.0</td></tr>
                        <tr><td className="px-4 py-3">5&apos;4&quot;</td><td className="px-4 py-3 font-bold text-green-700">~54.5</td></tr>
                        <tr><td className="px-4 py-3">5&apos;6&quot;</td><td className="px-4 py-3 font-bold text-green-700">~59.0</td></tr>
                        <tr><td className="px-4 py-3">5&apos;8&quot;</td><td className="px-4 py-3 font-bold text-green-700">~63.5</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Male Example */}
              <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Ideal Weight for 6 Feet Male</h3>
                    <p className="text-gray-700 mb-4">For a male standing 6 feet (72 inches) tall:</p>
                    <div className="space-y-2 font-mono text-sm bg-white p-4 rounded-xl border border-green-200">
                      <p>Height: 72 inches (12 over 5ft)</p>
                      <p>IBW = 50 + (12 × 2.3)</p>
                      <p>IBW = 50 + 27.6</p>
                      <p className="text-lg font-bold text-green-700">Result: ~77.6 kg</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-gray-800">Why IBW is not one fixed number?</h4>
                    <p className="text-sm text-gray-600">Your real healthy weight depends on:</p>
                    <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-green-700">
                      <li className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3"/>
                        Bone Structure
                      </li>

                      <li className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3"/>
                        <Link
                          href="/health/lean-body-mass-calculator"
                          className="hover:underline hover:text-green-900 transition-colors"
                        >
                          Muscle Mass
                        </Link>
                      </li>

                      <li className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3"/>
                        Activity Level
                      </li>

                      <li className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3"/>
                        <Link
                          href="/health/creatinine-clearance-calculator"
                          className="hover:underline hover:text-green-900 transition-colors"
                        >
                          Medical Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* IBW vs BMI Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Ideal Body Weight vs{" "}
                  <Link
                    href="/health/bmi-calculator"
                    className="text-green-700 hover:underline hover:text-green-900 transition-colors"
                  >
                    BMI Calculator
                  </Link>
                </h2>
                <div className="not-prose overflow-x-auto border border-green-100 rounded-2xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-50 text-green-900 border-b border-green-100">
                        <th className="px-6 py-4 text-left">Factor</th>
                        <th className="px-6 py-4 text-left">Ideal Body Weight</th>
                        <th className="px-6 py-4 text-left">BMI Calculator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 font-medium">Uses height</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td></tr>
                      <tr><td className="px-6 py-4 font-medium">Uses weight</td><td className="px-6 py-4 text-red-500">❌ No</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td></tr>
                      <tr><td className="px-6 py-4 font-medium">Estimates target</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td><td className="px-6 py-4 text-red-500">❌ No</td></tr>
                      <tr><td className="px-6 py-4 font-medium">Classifies obesity</td><td className="px-6 py-4 text-red-500">❌ No</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td></tr>
                      <tr><td className="px-6 py-4 font-medium">Medical dosing use</td><td className="px-6 py-4 text-green-600 font-bold">✅ Yes</td><td className="px-6 py-4 text-red-500">❌ No</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm font-bold text-center text-green-700">👉 Best practice: Use both together, not one alone.</p>
              </section>

              {/* BMI Guide */}
              <section className="grid md:grid-cols-2 gap-12 border-t pt-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">How to Calculate BMI for Women</h3>
                  <div className="bg-gray-100 p-4 rounded-xl font-mono text-center mb-6 border-l-4 border-green-600">
                    BMI = Weight (kg) ÷ Height² (m²)
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-700">BMI Categories (Adults):</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• Underweight: &lt; 18.5</li>
                      <li>• Normal: 18.5 – 24.9</li>
                      <li>• Overweight: 25 – 29.9</li>
                      <li>• Obese: 30+</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Weight According to Age – Does Age Matter?</h3>
                  <p className="text-sm text-gray-600 mb-4">Age does not change your ideal body weight formula, but it changes tolerance.</p>
                  <div className="not-prose space-y-3">
                    <div className="flex items-center justify-between p-3 border-b text-sm">
                      <span className="font-bold">18–30</span>
                      <span className="text-gray-500">Higher muscle potential</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b text-sm">
                      <span className="font-bold">30–50</span>
                      <span className="text-gray-500">Muscle loss begins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b text-sm">
                      <span className="font-bold">50+</span>
                      <span className="text-gray-500">Bone density & fat % increase</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations & Precautions */}
              <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Who Should NOT Rely Only on Ideal Body Weight?
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  IBW is a screening tool, not a diagnosis. Use caution if you are:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {['An athlete', 'Pregnant', 'Elderly', 'Chronic Illness'].map((item) => (
                    <div key={item} className="bg-white p-2 rounded text-center text-xs font-bold border border-red-200 text-red-600">{item}</div>
                  ))}
                </div>
              </section>

              {/* Practical Use */}
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" /> Practical Use of IBW Calculator
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-green-700">Use IBW for:</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex gap-2">✔️ Setting realistic weight goals</li>
                      <li className="flex gap-2">✔️ Medical reference</li>
                      <li className="flex gap-2">✔️ Nutrition planning</li>
                      <li className="flex gap-2">✔️ Fitness tracking</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-700">Don’t use IBW for:</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex gap-2">❌ Comparing yourself to others</li>
                      <li className="flex gap-2">❌ Crash dieting</li>
                      <li className="flex gap-2">❌ Body image judgments</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Health is Unique</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Ideal Body Weight is a helpful compass, not a final destination. Every body is different, and true health is shaped by daily habits, strength, and how you feel—not just a single number on a scale.
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
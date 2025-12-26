import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PulsePressureCalculator from "@/components/calculators/pulse-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Heart, AlertCircle, Stethoscope, TrendingUp, BookOpen, UserCheck, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Pulse Pressure Calculator: Check Heart Health & MAP Instantly",
  description:
    "Calculate your Pulse Pressure (PP) and Mean Arterial Pressure (MAP) instantly. Understand what a wide or narrow pulse pressure means for your cardiovascular health with our medical-grade tool.",
  keywords:
    "pulse pressure calculator, calculate pulse pressure, wide pulse pressure meaning, narrow pulse pressure causes, mean arterial pressure calculator, MAP calculator, systolic vs diastolic, blood pressure gap, is my pulse pressure normal, cardiovascular health tool",
}

const faqs = [
  {
    question: "What is a normal pulse pressure?",
    answer:
      "For most healthy adults, a normal pulse pressure falls between 40 and 60 mmHg. A reading of 40 mmHg is often considered ideal. This indicates that your heart is working efficiently and your arteries are flexible.",
  },
  {
    question: "What does it mean if my pulse pressure is high (wide)?",
    answer:
      "A high pulse pressure (usually > 60 mmHg) is often called 'wide' pulse pressure. It is typically caused by stiffening of the aorta, the largest artery in the body. This is a common part of aging but can also indicate increased risk of cardiovascular events. It means there is a larger gap between your systolic and diastolic readings.",
  },
  {
    question: "What causes a low (narrow) pulse pressure?",
    answer:
      "A narrow pulse pressure (usually < 30 mmHg) occurs when the systolic and diastolic numbers are close together. This can be caused by the heart pumping less blood (low stroke volume), heart failure, or significant blood loss (trauma). It requires medical attention if persistent.",
  },
  {
    question: "How is pulse pressure different from blood pressure?",
    answer:
      "Blood pressure gives you two numbers (Systolic/Diastolic). Pulse pressure is the *difference* between those two numbers. While blood pressure measures force against artery walls, pulse pressure specifically indicates the elasticity of your arteries and the force of your heart's contraction.",
  },
  {
    question: "Can I use this calculator for Mean Arterial Pressure (MAP)?",
    answer:
      "Yes! Our Pulse Pressure Calculator automatically computes your Mean Arterial Pressure (MAP). MAP is the average pressure in a patient's arteries during one cardiac cycle and is a better indicator of perfusion to vital organs than systolic blood pressure alone.",
  },
  {
    question: "Is pulse pressure a better predictor of heart health than BP?",
    answer:
      "Recent studies suggest that for people over age 60, pulse pressure is a more important predictor of heart attacks or other cardiovascular events than systolic blood pressure alone. It is a key marker of arterial stiffness.",
  },
]

export default function PulsePressureCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Pulse Pressure Calculator"
        description="Medical-grade calculator to determine Pulse Pressure and Mean Arterial Pressure (MAP) from your blood pressure readings."
        url="https://calqulate.net/health/pulse-pressure-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full mb-4">
                <Activity className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">Cardiology & Heart Health Tool</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Pulse Pressure Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Discover the hidden indicator of your heart health. Enter your blood pressure to instantly calculate your 
                <strong> Pulse Pressure (PP)</strong> and <strong>Mean Arterial Pressure (MAP)</strong>.
              </p>
            </div>

            {/* Calculator Component */}
            <PulsePressureCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Introduction Section */}
              <section className="py-4">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-500" /> What is Pulse Pressure?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Most people focus on their blood pressure numbers (like 120/80), but there is a third number that is equally critical: **Pulse Pressure**.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Pulse pressure is the numeric difference between your systolic blood pressure (the top number) and your diastolic blood pressure (the bottom number). It represents the force that your heart generates each time it contracts.
                </p>
                
                <Card className="mt-6 bg-slate-50 dark:bg-slate-900 border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">The Formula</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 py-4">
                      PP = Systolic - Diastolic
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Example: If your BP is <strong>120/80</strong>, your Pulse Pressure is <strong>40</strong> (120 - 80).
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Interpretation Chart */}
              <section>
                <h2 className="mb-4 font-semibold flex items-center gap-2">
                   <TrendingUp className="w-6 h-6 text-green-500" /> Pulse Pressure Interpretation Chart
                </h2>
                <p className="mb-4">
                  Use the chart below to understand what your results mean. Remember that "Normal" can vary slightly by age, but these are the general medical guidelines.
                </p>
                
                <Card className="not-prose overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border-b px-4 py-3 text-left font-semibold">Category</th>
                            <th className="border-b px-4 py-3 text-left font-semibold">Range (mmHg)</th>
                            <th className="border-b px-4 py-3 text-left font-semibold">Description</th>
                            <th className="border-b px-4 py-3 text-left font-semibold">Potential Indication</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-blue-50/50">
                            <td className="border-b px-4 py-3 font-medium text-blue-700">Narrow (Low)</td>
                            <td className="border-b px-4 py-3">&lt; 30 mmHg</td>
                            <td className="border-b px-4 py-3">Numbers are close together</td>
                            <td className="border-b px-4 py-3">Low stroke volume, heart failure, or blood loss.</td>
                          </tr>
                          <tr className="bg-green-50/50">
                            <td className="border-b px-4 py-3 font-medium text-green-700">Normal (Healthy)</td>
                            <td className="border-b px-4 py-3">30 – 50 mmHg</td>
                            <td className="border-b px-4 py-3">Ideal balance</td>
                            <td className="border-b px-4 py-3">Healthy cardiovascular function and arterial elasticity.</td>
                          </tr>
                          <tr>
                            <td className="border-b px-4 py-3 font-medium text-orange-600">Elevated (Wide)</td>
                            <td className="border-b px-4 py-3">50 – 70 mmHg</td>
                            <td className="border-b px-4 py-3">Gap is widening</td>
                            <td className="border-b px-4 py-3">Common in aging; early sign of arterial stiffness.</td>
                          </tr>
                          <tr className="bg-red-50/50">
                            <td className="border-b px-4 py-3 font-medium text-red-700">High Risk</td>
                            <td className="border-b px-4 py-3">&gt; 70-80 mmHg</td>
                            <td className="border-b px-4 py-3">Large gap</td>
                            <td className="border-b px-4 py-3">Higher risk of heart disease, atrial fibrillation, or valve issues.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Wide vs Narrow */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                   <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                     <AlertCircle className="w-5 h-5 text-red-500" /> Wide Pulse Pressure
                   </h3>
                   <p className="text-sm text-gray-600 mb-2">
                     A pulse pressure greater than 60 mmHg is considered wide. This is most commonly caused by <strong>arterial stiffness</strong>. As we age, arteries lose their elasticity, causing the systolic pressure to rise while the diastolic pressure stays the same or drops.
                   </p>
                   <ul className="list-disc pl-5 text-sm space-y-1">
                     <li>Atherosclerosis (hardening of arteries)</li>
                     <li>Aortic regurgitation (leaky valve)</li>
                     <li>Hyperthyroidism</li>
                     <li>Anemia</li>
                   </ul>
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-blue-500" /> Narrow Pulse Pressure
                   </h3>
                   <p className="text-sm text-gray-600 mb-2">
                     A pulse pressure lower than 30 mmHg is narrow. This usually means your heart isn't pumping enough blood with each beat (stroke volume is low).
                   </p>
                   <ul className="list-disc pl-5 text-sm space-y-1">
                     <li>Congestive heart failure</li>
                     <li>Aortic stenosis (narrowing of valve)</li>
                     <li>Significant blood loss (trauma)</li>
                     <li>Cardiac tamponade</li>
                   </ul>
                </div>
              </section>

              {/* Why This Calculator Stands Out */}
              <section>
                <Card className="not-prose bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      Why Use Our Pulse Pressure Tool?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Unlike basic calculators, we provide a <strong>comprehensive hemodynamic analysis</strong>. 
                      Our tool goes beyond simple subtraction:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                      <li className="flex items-start gap-2">
                        <UserCheck className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Automatic MAP Calculation:</strong> We calculate Mean Arterial Pressure simultaneously, giving you a fuller picture of organ perfusion.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Risk Visualization:</strong> Our color-coded gauge helps you instantly spot if you are in the "Safe Zone" or "Risk Zone".</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Actionable Insights:</strong> We provide interpretation based on current cardiology guidelines.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimer */}
              <section className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 not-prose">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2 mb-2">
                   <AlertCircle className="w-4 h-4" /> Medical Disclaimer
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  This Pulse Pressure Calculator is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </section>

            </div>

            {/* Structured FAQ UI */}
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
import { useState } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { HeartPulse, TestTube, Activity, ShieldCheck, Calculator as CalculatorIcon, Droplets } from "lucide-react"
import CholesterolRatioCalculator from "@/components/calculators/cholesterol-ratio-calculator"

export const metadata: Metadata = {
  title: "Cholesterol Ratio Calculator: Check Your Heart Health",
  description:
    "Instantly check your cholesterol ratios (HDL, LDL, TC) and heart health risk. Simple, accurate, and free—see how balanced your numbers really are.",
  keywords:
    "cholesterol ratio calculator, heart health calculator, how to calculate cholesterol ratio, triglycerides cholesterol ratio calculator, how do you calculate your cholesterol ratio, cholesterol hdl ratio calculator, TC/HDL ratio, LDL/HDL ratio, TG/HDL ratio, cholesterol levels, cardiovascular health, good cholesterol, bad cholesterol, triglycerides",
}

const faqs = [
  {
    question: "What is a good cholesterol ratio?",
    answer: "The ratio of Total Cholesterol/HDL is considered to be ideal below 3.5.",
  },
  {
    question: "How do I calculate LDL manually?",
    answer: "Use: LDL = Total Cholesterol – HDL – (Triglycerides ÷ 5). This formula is reliable when triglycerides are below 400 mg/dL.",
  },
  {
    question: "Can I calculate the cholesterol in mmol/L?",
    answer:
      "Yes. Our calculator supports both mg/dL and mmol/L. If you need to convert manually, use: Total Cholesterol, HDL, LDL × 38.67 = mg/dL; Triglycerides × 88.57 = mg/dL.",
  },
  {
    question: "What if both HDL and LDL are high?",
    answer:
      "Higher HDL partly offsets LDL risk, but your doctor should still assess your total cardiovascular risk. A high LDL level is still a significant risk factor, even with high HDL.",
  },
  {
    question: "How often should I test my cholesterol?",
    answer: "Adults should check every 4–6 years; those with risk factors for heart disease should test more frequently, often yearly, as recommended by their doctor.",
  },
]



export default function CholesterolCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Cholesterol Ratio Calculator"
        description="Evaluate your heart health by calculating key cholesterol ratios (TC/HDL, LDL/HDL, TG/HDL) and understanding your cardiovascular risk."
        url="https://calqulate.net/health/cholesterol-ratio-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Check Your Heart Health Instantly: What Your Cholesterol Says About You
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Use our Cholesterol Ratio Calculator to evaluate your heart health in seconds. Enter your Total Cholesterol, HDL, LDL, and Triglyceride levels to automatically compute your cholesterol ratios (TC/HDL, LDL/HDL, and TG/HDL). These results help you understand how balanced your cholesterol levels are and what they mean for your cardiovascular health.
              </p>
            </div>

            {/* Calculator Component */}
            <CholesterolRatioCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              {/* What is Cholesterol and Why It Matters */}
              <section>
                <h2 className="text-2xl font-bold">What is Cholesterol and Why It Matters</h2>
                <p>
                  Cholesterol is a waxy substance in your blood that your body needs to build cells, hormones, and vitamin D. Your liver makes it, but it is also derived through food items like meat, eggs, and dairy products.
                </p>
                <p>
                  When LDL, or low-density lipoprotein, cholesterol builds up and your levels of HDL, or high-density lipoprotein, are low, it causes plaque in your arteries. Over time, this leads to a heightened risk of heart disease and stroke.
                </p>
              </section>

              {/* Types of Cholesterol Explained */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5" />
                        <h2>Types of Cholesterol Explained: HDL, LDL, Triglycerides and TC Made Simple</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left font-semibold">Type</th>
                            <th className="border px-4 py-2 text-left font-semibold">Description</th>
                            <th className="border px-4 py-2 text-left font-semibold">Ideal Range (mg/dL)</th>
                            <th className="border px-4 py-2 text-left font-semibold">Why It Matters</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium">HDL (Good Cholesterol)</td>
                            <td className="border px-4 py-2">Carries cholesterol from the arteries to the liver for removal.</td>
                            <td className="border px-4 py-2">60 or higher</td>
                            <td className="border px-4 py-2">Higher HDL protects against heart disease.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">LDL (Bad Cholesterol)</td>
                            <td className="border px-4 py-2">Delivers cholesterol to cells; excess accumulates in arteries.</td>
                            <td className="border px-4 py-2">Below 100</td>
                            <td className="border px-4 py-2">Lower LDL reduces risk of artery blockage.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Triglycerides (TG)</td>
                            <td className="border px-4 py-2">Stores unused calories as body fat.</td>
                            <td className="border px-4 py-2">Below 150</td>
                            <td className="border px-4 py-2">High TG raises risk of heart disease and diabetes.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Total Cholesterol (TC)</td>
                            <td className="border px-4 py-2">Combined total of HDL, LDL, and 20% of TG.</td>
                            <td className="border px-4 py-2">Below 200</td>
                            <td className="border px-4 py-2">Provides a broad view of your cholesterol status.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* LDL Calculation Formula */}
              <section>
                <Card className="not-prose bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalculatorIcon className="w-5 h-5 text-blue-600" />
                        <h3>LDL Calculation Formula</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>If your LDL cholesterol value is not directly measured, it can be estimated by the Friedewald formula:</p>
                    <p className="font-mono bg-gray-100 p-2 rounded-md my-2 text-center">LDL = Total Cholesterol – HDL – (Triglycerides ÷ 5)</p>
                    <p>This formula gives a reliable LDL value when triglycerides are below 400 mg/dL. Our LDL Cholesterol Calculator automatically applies this formula for accurate results.</p>
                  </CardContent>
                </Card>
              </section>

              {/* How to Read Your Cholesterol Ratios */}
              <section>
                <h2 className="text-2xl font-bold">How to Read Your Cholesterol Ratios: What the Numbers Mean for Your Heart</h2>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left font-semibold">Ratio</th>
                        <th className="border px-4 py-2 text-left font-semibold">Formula</th>
                        <th className="border px-4 py-2 text-left font-semibold">Ideal Range</th>
                        <th className="border px-4 py-2 text-left font-semibold">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-medium">Total Cholesterol / HDL</td>
                        <td className="border px-4 py-2">TC ÷ HDL</td>
                        <td className="border px-4 py-2">Below 3.5</td>
                        <td className="border px-4 py-2">Indicates low heart-disease risk.</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-medium">LDL / HDL</td>
                        <td className="border px-4 py-2">LDL ÷ HDL</td>
                        <td className="border px-4 py-2">Below 2.0</td>
                        <td className="border px-4 py-2">Lower ratio means healthier balance between good and bad cholesterol.</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-medium">Triglyceride / HDL</td>
                        <td className="border px-4 py-2">TG ÷ HDL</td>
                        <td className="border px-4 py-2">Below 2.0</td>
                        <td className="border px-4 py-2">Reflects insulin sensitivity and overall heart health.</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-medium">VLDL (optional)</td>
                        <td className="border px-4 py-2">TG ÷ 5</td>
                        <td className="border px-4 py-2">—</td>
                        <td className="border px-4 py-2">Estimates very-low-density lipoproteins that carry triglycerides.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Why This Calculator Is Useful */}
              <section>
                <h2 className="text-2xl font-bold">Why This Calculator Is Useful</h2>
                <p className="mt-2">Unlike most calculators that just return raw numbers, this one provides:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Accurate cholesterol ratio results presented with interpretation.</li>
                  <li>Automatic calculation of LDL using the standard formula.</li>
                  <li>Support for both mg/dL and mmol/L units.</li>
                  <li>Evidence-based ranges based on global heart-health guidelines.</li>
                  <li>Practical tips for naturally improving your results.</li>
                </ul>
              </section>

              {/* Why Cholesterol Ratios Matter */}
              <section>
                <h2 className="text-2xl font-bold">Why Cholesterol Ratios Matter</h2>
                <p className="mt-2">A normal total cholesterol level doesn't always mean low risk. The balance of HDL and LDL is what defines cardiovascular health.</p>
                <p className="mt-2">For example:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-4 not-prose">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle>Healthy Scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Total Cholesterol = 200 mg/dL, HDL = 65</p>
                      <p className="font-bold text-lg mt-2">Ratio = 3.1 (Healthy)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle>High-Risk Scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Total Cholesterol = 200 mg/dL, HDL = 40</p>
                      <p className="font-bold text-lg mt-2">Ratio = 5.0 (High Risk)</p>
                    </CardContent>
                  </Card>
                </div>
                <p className="mt-4">These ratios help you and your doctor take early precautionary measures.</p>
              </section>

              {/* How to Improve Your Cholesterol Ratios */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                        <h2>How to Improve Your Cholesterol Ratios</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Choose fiber-rich foods, including oats, beans, and fruits.</li>
                      <li>Replace saturated fats with healthy unsaturated fats: olive oil, nuts, avocado.</li>
                      <li>Exercise for at least 30 minutes most days.</li>
                      <li>Avoid smoking. Limit your intake of alcohol.</li>
                      <li>Maintain a healthy weight and sleep schedule.</li>
                      <li>Consult your doctor in case lifestyle modifications are not sufficient; medication might be necessary.</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Benefits of Using the Calculator */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <h2>Benefits of Using the Cholesterol Ratio Calculator</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <b>Quickly understand your heart health status.</b> Get an immediate snapshot of your cardiovascular risk based on key ratios.
                    </p>
                    <p>
                      <b>Easily understandable medical data interpretations.</b> We translate complex numbers into clear, actionable insights.
                    </p>
                    <p>
                      <b>Helps track changes over time.</b> Monitor how your lifestyle changes positively affect your cholesterol balance.
                    </p>
                    <p>
                      <b>Encourages early lifestyle changes.</b> Seeing your ratios can motivate you to adopt healthier habits before problems arise.
                    </p>
                    <p>
                      <b>Free and supported by medical research.</b> Our tool is based on established formulas and guidelines for heart health.
                    </p>
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
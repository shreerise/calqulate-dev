import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import EstimatedAverageGlucoseCalculator from "@/components/calculators/estimated-average-glucose-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Droplets, HeartPulse, Stethoscope, BookOpen, Calculator as CalculatorIcon, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Estimated Average Glucose (eAG) Calculator | Convert A1C to eAG",
  description:
    "Easily convert your A1C to Estimated Average Glucose (eAG) or vice versa. Use our clinical-grade eAG calculator to understand your daily blood sugar levels and track your diabetes management.",
  keywords:
    "estimated average glucose calculator, eag calculator, a1c to eag calculator, eag to a1c conversion, average blood sugar calculator, diabetes calculator, average glucose mg/dl, hbA1c average blood sugar, what is my eag",
}

const faqs = [
  {
    question: "What is Estimated Average Glucose (eAG)?",
    answer:
      "Estimated Average Glucose (eAG) translates your A1C percentage into a daily average blood sugar level (in mg/dL or mmol/L). Because most people test their daily blood sugar in mg/dL or mmol/L, eAG makes it easier to understand your A1C test results in numbers you are already familiar with.",
  },
  {
    question: "How does the A1C to eAG formula work?",
    answer:
      "Our calculator uses the scientifically validated formula from the ADAG (A1c-Derived Average Glucose) study conducted by the American Diabetes Association (ADA). The exact formula is: eAG (mg/dL) = (28.7 x A1C) - 46.7.",
  },
  {
    question: "Is eAG the same as my fasting blood sugar?",
    answer:
      "No. Fasting blood sugar is your glucose level at a single point in time (usually in the morning before eating). Your eAG is an average of your blood sugar levels over a 2 to 3-month period, including times when it was high (like after meals) and low (like while sleeping).",
  },
  {
    question: "Why is my meter average different from my eAG?",
    answer:
      "Your home glucose meter only averages the times you test—typically fasting or right after meals. The eAG reflects your true average over 24 hours a day for the last 90 days. Since you don't test while you sleep or during every fluctuation, your meter average and eAG might not match perfectly.",
  },
  {
    question: "What is a normal eAG level?",
    answer:
      "A normal eAG level for someone without diabetes is typically under 117 mg/dL (which corresponds to an A1C of less than 5.7%). For those managing diabetes, doctors often recommend an A1C goal of around 7.0%, which equals an eAG of 154 mg/dL.",
  },
  {
    question: "Can I convert eAG back to A1C?",
    answer:
      "Yes! Our two-way calculator allows you to input your Estimated Average Glucose to find out what your estimated A1C percentage would be. Just select the 'eAG to A1C' option in the calculator.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "The calculator is highly accurate as it follows the standard ADA clinical formula. However, individual biological differences (like red blood cell lifespan or certain anemias) can cause A1C to not perfectly reflect true average glucose. Always consult your doctor for medical advice.",
  },
]

export default function EstimatedAverageGlucoseCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Estimated Average Glucose (eAG) Calculator"
        description="Convert your A1C percentage to your daily average blood sugar level (eAG) using the official ADA formula."
        url="https://calqulate.net/health/estimated-average-glucose-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Estimated Average Glucose (eAG) Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Make sense of your A1C test. Translate your HbA1c percentage into daily average blood sugar 
                levels (mg/dL or mmol/L) to better manage your health. Our calculator works both ways!
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Trusted, clinical-grade conversions based on guidelines from the American Diabetes Association (ADA).
              </p>
            </div>

            {/* Calculator Component */}
            <EstimatedAverageGlucoseCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is eAG? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is Estimated Average Glucose (eAG)?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  If you have diabetes or prediabetes, you are likely familiar with the <b>HbA1c (A1C)</b> blood test. 
                  While A1C gives a percentage indicating your blood sugar control over the past 2 to 3 months, 
                  it can be hard to relate a percentage (like 7.0%) to the daily numbers you see on your blood glucose meter (like 150 mg/dL).
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  That’s where <b>Estimated Average Glucose (eAG)</b> comes in. eAG translates your A1C percentage into the 
                  same units your daily blood glucose meter uses—either <b>mg/dL</b> or <b>mmol/L</b>.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-blue-500" />
                      Why Our eAG Calculator Stands Out
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      We go beyond a simple math conversion to provide a comprehensive health tool.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><b>Two-Way Conversion:</b> Calculate A1C to eAG, or enter an eAG to predict your A1C.</li>
                        <li><b>Visual Risk Gauges:</b> Instantly see if your levels indicate Normal, Prediabetes, or Diabetes.</li>
                        <li><b>Global Units:</b> Seamlessly switch between mg/dL (used in US) and mmol/L (used in UK/Canada/Aus).</li>
                        <li><b>Actionable Insights:</b> Receive tailored lifestyle and monitoring tips based on your results.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                       <Droplets className="w-12 h-12 text-blue-500" />
                       <p className="text-gray-500 text-xs text-center font-medium">
                         Based on the globally recognized ADAG Study formula.
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* The Formula */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>The Science: How We Calculate eAG</b>
                </h2>
                <p className="mb-2">
                  Our calculator utilizes the standard formula established by the rigorous <b>A1c-Derived Average Glucose (ADAG)</b> study, recognized by the American Diabetes Association (ADA).
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li><b>For mg/dL:</b> <code>eAG = (28.7 × A1C) - 46.7</code></li>
                  <li><b>For mmol/L:</b> <code>eAG = (1.59 × A1C) - 2.59</code></li>
                </ul>
                <p className="mt-4 text-sm text-gray-600 border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-r-lg">
                  <b>Did you know?</b> Your eAG will almost always be slightly higher than the average you calculate manually from your daily morning meter readings. This is because eAG accounts for 24 hours of data, including post-meal spikes that you might not be testing for!
                </p>
              </section>

              {/* A1C to eAG Conversion Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>📊 A1C to eAG Quick Reference Chart</CardTitle>
                    <CardDescription>
                      Compare A1C percentages to their corresponding average daily glucose levels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-3 text-left font-semibold">A1C Level (%)</th>
                            <th className="border px-4 py-3 text-left font-semibold">eAG (mg/dL)</th>
                            <th className="border px-4 py-3 text-left font-semibold">eAG (mmol/L)</th>
                            <th className="border px-4 py-3 text-left font-semibold">Diagnostic Category</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium">5.0%</td>
                            <td className="border px-4 py-2">97</td>
                            <td className="border px-4 py-2">5.4</td>
                            <td className="border px-4 py-2 text-green-600 font-medium">Normal</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">5.5%</td>
                            <td className="border px-4 py-2">111</td>
                            <td className="border px-4 py-2">6.2</td>
                            <td className="border px-4 py-2 text-green-600 font-medium">Normal</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">6.0%</td>
                            <td className="border px-4 py-2">126</td>
                            <td className="border px-4 py-2">7.0</td>
                            <td className="border px-4 py-2 text-yellow-600 font-medium">Prediabetes</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">6.5%</td>
                            <td className="border px-4 py-2">140</td>
                            <td className="border px-4 py-2">7.8</td>
                            <td className="border px-4 py-2 text-red-600 font-medium">Diabetes</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">7.0%</td>
                            <td className="border px-4 py-2">154</td>
                            <td className="border px-4 py-2">8.6</td>
                            <td className="border px-4 py-2 text-red-600 font-medium">Diabetes (Common Target)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">8.0%</td>
                            <td className="border px-4 py-2">183</td>
                            <td className="border px-4 py-2">10.2</td>
                            <td className="border px-4 py-2 text-red-600 font-medium">Diabetes (Elevated)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">9.0%</td>
                            <td className="border px-4 py-2">212</td>
                            <td className="border px-4 py-2">11.8</td>
                            <td className="border px-4 py-2 text-red-600 font-medium">Diabetes (High)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">10.0%</td>
                            <td className="border px-4 py-2">240</td>
                            <td className="border px-4 py-2">13.3</td>
                            <td className="border px-4 py-2 text-red-600 font-medium">Diabetes (Very High)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Interpreting Results */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-red-500" />
                      What Do Your Results Mean?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <div>
                      <h3 className="font-semibold text-base text-green-600">🟢 Normal Range (A1C below 5.7% / eAG &lt; 117 mg/dL)</h3>
                      <p className="mt-1 text-gray-600">Your average blood sugar levels are within the healthy, non-diabetic range. Continue maintaining a balanced diet and regular exercise routine.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-yellow-600">🟡 Prediabetes Range (A1C 5.7% - 6.4% / eAG 117 - 137 mg/dL)</h3>
                      <p className="mt-1 text-gray-600">You are at a higher risk of developing Type 2 diabetes. Lifestyle modifications, such as increased physical activity and dietary changes, can often reverse this trend.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-red-600">🔴 Diabetes Range (A1C 6.5% or higher / eAG &gt; 137 mg/dL)</h3>
                      <p className="mt-1 text-gray-600">Levels in this range indicate diabetes. An A1C of around 7.0% (154 mg/dL) is a common treatment target for many adults with diabetes, but goals should always be personalized by your healthcare provider.</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimer */}
              <section>
                <Card className="not-prose bg-gray-50 border-gray-200">
                  <CardContent className="text-sm space-y-2 pt-6">
                     <p className="flex items-start gap-2 text-gray-600">
                       <Shield className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                       <span>
                         <b>Medical Disclaimer:</b> This Estimated Average Glucose (eAG) calculator is designed for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider regarding any medical condition or adjustments to your diabetes care plan.
                       </span>
                     </p>
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
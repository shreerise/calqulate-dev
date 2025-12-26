import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AscvdRiskCalculator from "@/components/calculators/ascvd-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { HeartPulse, ShieldCheck, Stethoscope, AlertCircle, Info, Activity } from "lucide-react"

export const metadata: Metadata = {
  title: "ASCVD Risk Estimator Calculator (2025 Guidelines)",
  description:
    "Estimate your 10-year risk of heart disease and stroke with our advanced ASCVD Risk Estimator. Based on ACC/AHA guidelines with instant cholesterol and blood pressure analysis.",
  keywords:
    "ASCVD risk estimator, cvd risk calculator, 10 year heart disease risk calculator, aha acc risk calculator, cholesterol risk calculator, heart attack risk assessment, stroke risk calculator, cardiovascular risk score",
}

const faqs = [
  {
    question: "What is the ASCVD Risk Estimator?",
    answer:
      "The ASCVD (Atherosclerotic Cardiovascular Disease) Risk Estimator is a medical tool developed by the ACC and AHA. It calculates your 10-year probability of suffering a heart attack or stroke based on factors like age, cholesterol levels, blood pressure, and diabetes status.",
  },
  {
    question: "What is a normal ASCVD risk score?",
    answer:
      "A low risk is considered less than 5%. Borderline risk is 5% to 7.4%, intermediate risk is 7.5% to 19.9%, and high risk is 20% or greater. Your doctor uses this score to decide if you need statin therapy or lifestyle changes.",
  },
  {
    question: "What is the ideal range for Total Cholesterol and HDL?",
    answer:
      "Generally, Total Cholesterol should be below 200 mg/dL. HDL (Good Cholesterol) should be above 60 mg/dL for protection against heart disease. Our calculator provides visual range indicators to help you understand your numbers instantly.",
  },
  {
    question: "Can I lower my ASCVD risk score?",
    answer:
      "Yes! While you cannot change your age or genetics, you can lower your risk significantly by quitting smoking, managing blood pressure, lowering LDL cholesterol through diet or medication, and maintaining a healthy weight.",
  },
  {
    question: "Who should use this calculator?",
    answer:
      "This calculator is designed for adults aged 40-79 without a prior history of heart disease or stroke. It helps primary prevention efforts. If you already have heart disease, consult your cardiologist for a different management plan.",
  },
]

export default function AscvdRiskCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="ASCVD Risk Estimator Calculator"
        description="Calculate your 10-year risk of cardiovascular disease with clinical accuracy."
        url="https://calqulate.net/health/ascvd-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                ASCVD Risk Estimator Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Assess your heart health with clinical precision. Our tool estimates your 10-year risk of 
                Atherosclerotic Cardiovascular Disease (heart attack or stroke) following ACC/AHA guidelines.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Includes <b>Smart Range Indicators</b> to help you interpret your Cholesterol and Blood Pressure numbers instantly.
              </p>
            </div>

            {/* Calculator Component */}
            <AscvdRiskCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is ASCVD? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Understanding Your Heart Risk (ASCVD)
                </h2>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  ASCVD stands for <b>Atherosclerotic Cardiovascular Disease</b>. It refers to conditions caused by the buildup of plaque in arterial walls, 
                  which restricts blood flow. This calculator uses the Pooled Cohort Equations (PCE) to predict the likelihood of a cardiovascular event 
                  (nonfatal myocardial infarction or coronary heart disease death, or fatal/nonfatal stroke) over the next 10 years.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      What Your Risk Score Means
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Current ACC/AHA guidelines categorize 10-year risk into four distinct levels.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                             <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <div className="mt-1 w-3 h-3 rounded-full bg-green-500 shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Low Risk (&lt; 5%)</span>
                                    <p className="text-sm text-gray-600">Lifestyle changes (diet, exercise) are usually sufficient to maintain health.</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                <div className="mt-1 w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Borderline Risk (5% – 7.4%)</span>
                                    <p className="text-sm text-gray-600">Discussion regarding moderate-intensity statin therapy may be beneficial.</p>
                                </div>
                             </div>
                        </div>
                        <div className="space-y-4">
                             <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                                <div className="mt-1 w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Intermediate Risk (7.5% – 19.9%)</span>
                                    <p className="text-sm text-gray-600">Moderate-intensity statin therapy is often recommended.</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                <div className="mt-1 w-3 h-3 rounded-full bg-red-500 shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">High Risk (≥ 20%)</span>
                                    <p className="text-sm text-gray-600">Aggressive lifestyle changes and high-intensity statin therapy are typically initiated.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Input Categories Table */}
              <section>
                <h2 className="mb-4 font-semibold text-2xl">Interpreting Your Inputs</h2>
                <p className="mb-4">
                  To get accurate results, it helps to understand the &quot;Healthy Ranges&quot; for the inputs required. 
                  Our calculator provides real-time feedback, but here is the clinical breakdown:
                </p>

                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Cholesterol & Blood Pressure Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <th className="border px-4 py-3 text-left">Metric</th>
                            <th className="border px-4 py-3 text-left text-green-600">Optimal / Normal</th>
                            <th className="border px-4 py-3 text-left text-yellow-600">Borderline / At Risk</th>
                            <th className="border px-4 py-3 text-left text-red-600">High / Hazardous</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Total Cholesterol</td>
                            <td className="border px-4 py-3">&lt; 200 mg/dL</td>
                            <td className="border px-4 py-3">200 – 239 mg/dL</td>
                            <td className="border px-4 py-3">≥ 240 mg/dL</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium">HDL (Good Cholesterol)</td>
                            <td className="border px-4 py-3">&gt; 60 mg/dL</td>
                            <td className="border px-4 py-3">40 – 59 mg/dL</td>
                            <td className="border px-4 py-3">&lt; 40 mg/dL (Bad)</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium">Systolic BP</td>
                            <td className="border px-4 py-3">&lt; 120 mmHg</td>
                            <td className="border px-4 py-3">120 – 139 mmHg</td>
                            <td className="border px-4 py-3">≥ 140 mmHg</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Benefits Section */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5" />
                      Benefits of Using Our ASCVD Tool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      <b>Medical Accuracy:</b> Uses the official 2013 ACC/AHA Pooled Cohort Equations.
                    </p>
                    <p>
                      <b>Standardized Assessment:</b> Evaluates standard metrics used by cardiologists worldwide.
                    </p>
                    <p>
                      <b>Interactive Ranges:</b> See instantly if your input numbers are in a healthy zone.
                    </p>
                    <p>
                      <b>Privacy Focused:</b> Your health data is processed in your browser and never stored.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimer */}
              <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg not-prose">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                        <p className="font-bold mb-1">Medical Disclaimer</p>
                        <p>
                            This calculator is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. 
                            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. 
                            If you think you may have a medical emergency, call your doctor or emergency services immediately.
                        </p>
                    </div>
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
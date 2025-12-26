import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Qrisk3Calculator from "@/components/calculators/qrisk3-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { HeartPulse, Stethoscope, Activity, AlertTriangle, CheckCircle2, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Qrisk3 Calculator (UK/UAE): Estimate Your Heart Health Risk",
  description:
    "Calculate your 10-year risk of cardiovascular disease with our advanced Qrisk3 Calculator. tailored for UK and UAE demographics. Get insights on heart age, cholesterol, and blood pressure risk factors.",
  keywords:
    "qrisk3 calculator, qrisk3 uk, qrisk3 uae, cardiovascular risk calculator, heart attack risk calculator, heart age calculator, nhs heart check, uae heart health, cvd risk assessment",
}

const faqs = [
  {
    question: "What is the Qrisk3 Calculator?",
    answer:
      "Qrisk3 is an algorithm developed to estimate a person's risk of developing cardiovascular disease (heart attack or stroke) over the next 10 years. It is widely used by the NHS in the UK and health authorities in the UAE to identify high-risk individuals who may benefit from intervention.",
  },
  {
    question: "How is Qrisk3 different from Qrisk2?",
    answer:
      "Qrisk3 includes more risk factors than its predecessor. It accounts for chronic kidney disease, migraines, corticosteroid use, severe mental illness, atypical antipsychotics, systemic lupus erythematosus (SLE), and erectile dysfunction, making it more accurate for a wider range of people.",
  },
  {
    question: "Why is this calculator specific to UK and UAE?",
    answer:
      "Cardiovascular risk varies significantly by ethnicity and region. This calculator includes specific ethnicity adjustments (such as for South Asian, African, and Middle Eastern backgrounds) which are prevalent in the UK and UAE populations, ensuring more accurate results than generic risk tools.",
  },
  {
    question: "What is a 'High Risk' score?",
    answer:
      "Generally, a Qrisk3 score of 10% or higher indicates a clinically significant risk. In the UK (NICE guidelines) and UAE, this is often the threshold where doctors might suggest lifestyle changes or statin therapy to lower cholesterol.",
  },
  {
    question: "Can I lower my Qrisk3 score?",
    answer:
      "Yes. While you cannot change your age, ethnicity, or family history, you can significantly lower your risk by stopping smoking, managing blood pressure, lowering cholesterol, losing weight, and managing diabetes effectively.",
  },
]

export default function Qrisk3CalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Qrisk3 Heart Risk Calculator"
        description="Estimate your 10-year cardiovascular disease risk and heart age using the Qrisk3 algorithm standards."
        url="https://calqulate.net/health/qrisk3-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Qrisk3 Calculator (UK/UAE)
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Assess your heart health with precision. This calculator estimates your risk of developing cardiovascular disease over the next 10 years, considering factors specifically relevant to populations in the United Kingdom and United Arab Emirates.
              </p>
              <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Medically Aligned</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> UK/UAE Ethnicity Support</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Instant Results</span>
              </div>
            </div>

            {/* Calculator Component */}
            <Qrisk3Calculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* Introduction Section */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Understanding Your Heart Risk
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Cardiovascular disease (CVD) is a leading cause of death globally. The Qrisk3 algorithm is considered the "gold standard" in the UK and increasingly used in the UAE for assessing heart health. Unlike simpler calculators, Qrisk3 looks at a comprehensive picture of your health—from your postcode (socioeconomic factors) to specific medical conditions like rheumatoid arthritis or migraines.
                </p>
                
                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <Stethoscope className="w-5 h-5 text-blue-500" />
                      Why Use This Calculator?
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Tailored for specific demographics and medical histories.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>**Ethnicity Sensitivity:** Accurate risk adjustment for South Asian, African, and Middle Eastern backgrounds.</li>
                        <li>**Comprehensive Inputs:** Accounts for blood pressure treatment, CKD, and family history.</li>
                        <li>**Actionable Data:** Provides your "Heart Age" alongside your percentage risk.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 bg-blue-50 rounded-xl p-4">
                       <Activity className="w-12 h-12 text-blue-600" />
                       <p className="text-center text-sm font-medium text-blue-800">
                         Early detection is the best prevention.
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Interpretation Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Interpreting Your Qrisk3 Score</CardTitle>
                    <CardDescription>
                      What does your percentage mean for your future health?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-3 text-left">Risk Level</th>
                            <th className="border px-4 py-3 text-left">Score Range</th>
                            <th className="border px-4 py-3 text-left">Recommendation (UK/UAE Guidelines)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-green-600">Low Risk</td>
                            <td className="border px-4 py-3">&lt; 10%</td>
                            <td className="border px-4 py-3">
                              Maintain a healthy lifestyle. Re-evaluate in 5 years.
                            </td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-yellow-600">Moderate Risk</td>
                            <td className="border px-4 py-3">10% – 20%</td>
                            <td className="border px-4 py-3">
                              Lifestyle changes recommended (diet, exercise). Consult a GP about cholesterol (statins).
                            </td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-semibold text-red-600">High Risk</td>
                            <td className="border px-4 py-3">&gt; 20%</td>
                            <td className="border px-4 py-3">
                              Medical intervention likely required. Strict control of BP and lipids is essential.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Medical Disclaimer */}
              <section>
                <Card className="not-prose border-red-100 bg-red-50">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-red-700">
                       <AlertTriangle className="w-5 h-5" /> Important Medical Disclaimer
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="text-sm text-red-800">
                     <p>
                       This calculator is for educational and informational purposes only. While it mimics the logic of the Qrisk3 algorithm, it is <strong>not a diagnostic tool</strong>.
                     </p>
                     <p className="mt-2">
                       Please consult with a qualified healthcare professional (GP or Cardiologist) for a formal risk assessment and before making any decisions regarding medication or treatment. In an emergency, always contact emergency services.
                     </p>
                   </CardContent>
                </Card>
              </section>

              {/* UK & UAE Context */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Why Geography Matters: UK & UAE</b>
                </h2>
                <p className="mb-2">
                  Populations in the UK and UAE face unique challenges regarding heart health. 
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <b>United Kingdom:</b> Cardiovascular disease affects 7 million people. The NHS uses Qrisk3 to decide on Statin prescription thresholds (usually 10%).
                  </li>
                  <li>
                    <b>UAE:</b> Heart disease is a leading cause of mortality. Factors such as high prevalence of diabetes, sedentary lifestyle due to heat, and specific dietary habits make accurate risk assessment vital for the UAE population.
                  </li>
                </ul>
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
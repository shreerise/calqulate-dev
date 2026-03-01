import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BreastCancerRiskCalculator from "@/components/calculators/breast-cancer-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ShieldCheck,
  Activity,
  Users,
  Info,
  Scale,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  FileText,
  History,
  Beaker,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Breast Cancer Risk Calculator: Personalized Risk Assessment",
  description:
    "Estimate your 5-year and lifetime breast cancer risk using validated models like Gail and Tyrer-Cuzick. Understand your risk factors and screening needs.",
  keywords:
    "breast cancer risk calculator, gail model breast cancer, tyrer-cuzick score, breast cancer risk assessment tool, lifetime risk assessment, family history breast cancer calculator",
}

const faqs = [
  {
    question: "What is a breast cancer risk assessment?",
    answer:
      "A breast cancer risk assessment is a statistical estimate of your probability of developing breast cancer over a specific timeframe (usually 5 years or lifetime) based on population data.",
  },
  {
    question: "What is the Gail Model?",
    answer:
      "The Gail Model (Breast Cancer Risk Assessment Tool) is a validated prediction model used primarily for the general population. It considers age, reproductive history, and limited family history.",
  },
  {
    question: "What is the Tyrer Cuzick score?",
    answer:
      "The Tyrer-Cuzick (IBIS) score is a more comprehensive risk model that incorporates extended family history on both sides, genetic mutation probabilities, HRT use, and breast density.",
  },
  {
    question: "What is considered high lifetime risk?",
    answer:
      "A lifetime risk of above 20% is generally considered high. Individuals in this category may qualify for enhanced screening, such as annual MRIs alongside mammograms.",
  },
  {
    question: "Does family history guarantee cancer?",
    answer:
      "No. While family history increases the probability, it does not mean you will definitely develop the disease. It serves as a guide for proactive screening.",
  },
  {
    question: "Should I take a lifetime risk assessment test?",
    answer:
      "If you are over 35, have a family history of breast or ovarian cancer, or have dense breast tissue, a risk assessment can provide valuable guidance for your screening schedule.",
  },
]

export default function BreastCancerRiskPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Breast Cancer Risk Calculator"
        description="Personalized assessment to estimate 5-year and lifetime breast cancer risk based on medical and family history."
        url="https://calqulate.net/health/breast-cancer-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Breast Cancer Risk Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Understanding your personal risk is powerful. Use this personalized assessment to estimate your 5-year and lifetime breast cancer risk and plan your screening schedule.
              </p>
            </div>

            {/* Calculator Component */}
            <BreastCancerRiskCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Core Definition */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What Is a Breast Cancer Risk Assessment?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A breast cancer risk assessment evaluates multiple factors to estimate your probability of developing breast cancer over time. It is not a diagnosis, but a statistical estimate based on population data to help guide your screening decisions.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="font-bold text-green-800 text-sm">5-Year Risk</p>
                    <p className="text-xs text-gray-600">Short-term probability estimate.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="font-bold text-green-800 text-sm">10-Year Risk</p>
                    <p className="text-xs text-gray-600">Mid-term risk projection.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="font-bold text-green-800 text-sm">Lifetime Risk</p>
                    <p className="text-xs text-gray-600">Total probability up to age 80-90.</p>
                  </div>
                </div>
              </section>

              {/* Models Card */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Major Breast Cancer Risk Models Explained</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border-green-100 shadow-sm">
                    <CardHeader className="bg-green-50/50">
                      <CardTitle className="text-lg font-bold text-green-800 flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Gail Model
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-600 space-y-2">
                      <p>Widely used for general population screening. It considers age, biopsy history, and first-degree family history.</p>
                      <p className="font-semibold text-green-700">Best for: General screening decisions.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-100 shadow-sm">
                    <CardHeader className="bg-green-50/50">
                      <CardTitle className="text-lg font-bold text-green-800 flex items-center gap-2">
                        <Beaker className="w-5 h-5" /> Tyrer-Cuzick (IBIS)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-600 space-y-2">
                      <p>More comprehensive. Includes extended family history, breast density, and HRT use.</p>
                      <p className="font-semibold text-green-700">Best for: High-risk clinics and detailed assessment.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Risk Interpretation Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-green-600" />
                  Understanding Your Risk Score
                </h2>
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Lifetime Risk</th>
                        <th className="px-6 py-4 text-left font-bold">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">&lt;15%</td>
                        <td className="px-6 py-4">Average risk (Population average is ~12%)</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-yellow-600">15–20%</td>
                        <td className="px-6 py-4">Moderate risk</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-red-600">&gt;20%</td>
                        <td className="px-6 py-4">High risk (Earlier screening recommended)</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
                  <strong>Who is High Risk?</strong> Women with &gt;20% lifetime risk may qualify for earlier mammograms, annual MRI screening, and targeted preventive strategies.
                </p>
              </section>

              {/* Age and Family History */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <History className="text-green-600 w-5 h-5" />
                    Risk of Breast Cancer by{" "}
                    <Link
                      href="/age-calculator"
                      className="hover:underline hover:text-green-700 transition-colors"
                    >
                      Age
                    </Link>
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>Risk increases as you age, with most cases occurring after age 50:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Age 30:</strong> Generally Low risk</li>
                      <li><strong>Age 40:</strong> Risk starts increasing</li>
                      <li><strong>Age 50:</strong> Moderate risk levels</li>
                      <li><strong>Age 60+:</strong> Highest risk category</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Users className="text-green-600 w-5 h-5" /> Family History Impacts
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Risk is significantly higher if a first-degree relative (mother/sister) was diagnosed before age 50, if multiple relatives are affected, or if there is a history of ovarian cancer in the family.
                  </p>
                </div>
              </section>

              {/* Advanced Risk Factors */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Beaker className="w-6 h-6" />
                  Advanced Risk Factors: HRT & Genetics
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="bg-white/10 p-5 rounded-2xl">
                    <h4 className="font-bold text-green-200 mb-2">
                      Hormone Therapy (HRT)
                    </h4>

                    <p className="opacity-90 leading-relaxed">
                      HRT can slightly increase risk depending on the type and duration. 
                      Combination estrogen-progestin therapy generally carries a higher risk 
                      than estrogen alone. Advanced models include factors like{" "}
                      <Link
                        href="/health/body-fat-calculator"
                        className="underline hover:text-white transition-colors font-medium"
                      >
                        body fat
                      </Link>{" "}
                      levels and metabolic profile in the calculation.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl">
                    <h4 className="font-bold text-green-200 mb-2">Genetic Testing vs. Calculator</h4>
                    <p className="opacity-90 leading-relaxed">
                      Calculators provide statistical estimates based on history. Genetic testing (BRCA1/BRCA2) detects actual mutations. High calculator scores often prompt a referral for genetic testing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Modifiable Factors */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  How to Lower Breast Cancer Risk
                </h2>

                {/* Image */}
                <div className="mb-8 flex justify-center">
                  <Image
                    src="/breast-cancer-risk-calculator.png"
                    alt="Breast cancer prevention lifestyle illustration showing exercise, healthy diet, weight management and regular screening"
                    width={750}
                    height={420}
                    className="rounded-2xl shadow-lg border border-green-100"
                    priority
                  />
                </div>

                <p className="text-gray-700 mb-6">
                  Even if your calculated risk is elevated, modifiable lifestyle factors play a massive role in prevention:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Maintain healthy weight
                  </div>

                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Exercise regularly
                  </div>

                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Limit alcohol intake
                  </div>

                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Avoid smoking
                  </div>

                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Breastfeed if possible
                  </div>

                  <div className="p-3 border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-700 flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Regular Screenings
                  </div>
                </div>
              </section>

              {/* What score does not mean */}
              <section className="border-2 border-dashed border-red-100 p-6 rounded-2xl bg-red-50/30">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5" /> What Your Risk Score Does NOT Mean
                </h3>
                <ul className="text-sm text-red-900/80 space-y-2 list-disc pl-5">
                  <li>It does <strong>not</strong> mean you will definitely develop cancer.</li>
                  <li>It does <strong>not</strong> replace the need for regular mammograms.</li>
                  <li>It is <strong>not</strong> a definitive genetic test for mutations.</li>
                </ul>
                <p className="mt-4 text-xs italic text-gray-500">The goal of this tool is to guide prevention decisions, not to cause anxiety.</p>
              </section>

              {/* Final Takeaway */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  Final Takeaway
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                  "Knowledge reduces fear. Understanding your risk allows for proactive care. A breast cancer risk calculator is not about anxiety — it’s about early awareness and smarter screening."
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Assess your overall health?</h3>
                    <p className="text-gray-300 max-w-md">
                      Weight management is a key factor in cancer prevention. Check your BMI and body metrics next.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/bmr-calculator">
                      Metabolic Rate Tool <ArrowRight className="ml-2 w-4 h-4" />
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
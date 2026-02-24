import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BreastCancerRiskCalculator from "@/components/calculators/breast-cancer-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Shield, BookOpen, Stethoscope, AlertTriangle, HeartPulse, ClipboardList } from "lucide-react"

export const metadata: Metadata = {
  title: "Breast Cancer Risk Calculator | Assess Your Risk Profile Instantly",
  description:
    "Evaluate your breast cancer risk with our comprehensive Breast Cancer Risk Assessment Tool. Based on standard clinical models (like the Gail Model), get personalized screening guidelines and health insights.",
  keywords:
    "breast cancer risk calculator, gail model calculator, breast cancer risk assessment tool, breast cancer screening guidelines, high risk breast cancer calculator, family history breast cancer risk, mammogram calculator",
}

const faqs = [
  {
    question: "What is a Breast Cancer Risk Calculator?",
    answer:
      "A Breast Cancer Risk Calculator is an educational tool that uses established medical risk factors—such as age, reproductive history, and family history—to estimate your relative risk of developing breast cancer compared to the average population. It helps guide conversations with your healthcare provider.",
  },
  {
    question: "Is this tool the same as the Gail Model?",
    answer:
      "This calculator is heavily inspired by standard clinical assessment models like the Breast Cancer Risk Assessment Tool (BCRAT / Gail Model). It evaluates similar key risk factors to provide a relative risk category, but it is designed for educational purposes and should not replace a clinical evaluation by your doctor.",
  },
  {
    question: "What are the most significant risk factors for breast cancer?",
    answer:
      "The most significant non-modifiable risk factors include being born female, advancing age, inherited gene mutations (like BRCA1 and BRCA2), dense breast tissue, and a strong family history of the disease. Modifiable factors include alcohol consumption, physical inactivity, and certain hormone replacement therapies.",
  },
  {
    question: "Can men get breast cancer?",
    answer:
      "Yes. While it is much more common in women, men can also develop breast cancer. However, this specific calculator is optimized for female reproductive and physiological risk factors, as standard models (like the Gail model) were developed using female demographic data.",
  },
  {
    question: "If my risk is high, does that mean I will definitely get cancer?",
    answer:
      "Absolutely not. A 'High' or 'Elevated' risk score simply means your statistical probability is higher than average based on demographic data. Many women with elevated risk never develop breast cancer, and some women with average risk do. This score is meant to empower you to start proactive screening.",
  },
  {
    question: "When should I start getting mammograms?",
    answer:
      "According to the American Cancer Society, women at average risk should have the option to start annual mammograms at age 40, and are highly recommended to start by age 45. Women at high risk may need to start earlier and include MRI screenings. Always consult your doctor for a personalized timeline.",
  },
  {
    question: "Does having a breast biopsy mean I am at higher risk?",
    answer:
      "Not necessarily, but the *results* of the biopsy matter. If a past biopsy showed Atypical Hyperplasia or Lobular Carcinoma in Situ (LCIS), it significantly increases your risk profile. If the biopsy was entirely benign with no atypia, the risk increase is very minimal.",
  },
]

export default function BreastCancerRiskCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Breast Cancer Risk Assessment Tool"
        description="Estimate your relative risk of breast cancer based on established medical risk factors and receive personalized screening recommendations."
        url="https://calqulate.net/health/breast-cancer-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
                <HeartPulse className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Breast Cancer Risk Assessment Tool
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Empower your health journey. Evaluate your personal risk factors, understand your
                relative risk profile, and discover personalized, standard-compliant screening guidelines.
              </p>
              
              <div className="mt-6 flex items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 text-left max-w-3xl mx-auto">
                <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 text-yellow-600 dark:text-yellow-500" />
                <p>
                  <strong>Medical Disclaimer:</strong> This tool is for educational purposes only and does not provide medical advice or diagnosis. It is designed to estimate relative risk based on standard clinical parameters (such as the Gail Model). Always consult a healthcare professional for clinical diagnoses and screening decisions.
                </p>
              </div>
            </div>

            {/* Calculator Component */}
            <BreastCancerRiskCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              {/* Introduction Section */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 pb-2">
                  Understanding the Breast Cancer Risk Calculator
                </h2>
                <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Breast Cancer Risk Assessment Tool is engineered to help women estimate their risk of developing invasive breast cancer over their lifetime. Modeled after gold-standard clinical assessments like the <strong>Gail Model (BCRAT)</strong> and the <strong>Tyrer-Cuzick</strong> models, it evaluates specific personal and family history data to classify your relative risk.
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  What makes our calculator stand out is its focus on <strong>actionability</strong>. Instead of leaving you with a confusing percentage, it translates your risk factors into a clear, personalized screening roadmap based on American Cancer Society (ACS) guidelines.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl not-prose">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <Stethoscope className="w-5 h-5 text-pink-500" />
                      Key Risk Factors Analyzed
                    </CardTitle>
                    <CardDescription>
                      This tool evaluates several established components of breast cancer risk:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2 text-sm">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                        <span><strong>Current Age:</strong> Risk increases naturally as you get older.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                        <span><strong>Age at Menarche:</strong> Starting menstruation before age 12 slightly increases lifetime estrogen exposure.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                        <span><strong>Age at First Live Birth:</strong> Having a first child after 30, or never giving birth, alters risk profiles.</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                        <span><strong>Family History:</strong> Having 1st-degree relatives (mother, sister, daughter) with breast cancer heavily impacts risk.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                        <span><strong>Biopsy History:</strong> Previous breast biopsies, especially those showing Atypical Hyperplasia, are significant indicators.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Modifiable vs Non Modifiable */}
              <section>
                <h2 className="mb-4 font-semibold text-2xl">
                  Modifiable vs. Non-Modifiable Risk Factors
                </h2>
                <p className="mb-6">
                  Knowledge is power. While you cannot change certain aspects of your biology, there are many lifestyle choices you can make to actively lower your risk of developing breast cancer.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border-l-4 border-l-gray-400">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gray-500" />
                        Non-Modifiable (You Can't Change)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Age & Gender:</strong> Being female and growing older are the two biggest factors.</li>
                        <li><strong>Genetics:</strong> Inherited mutations (BRCA1, BRCA2, PALB2).</li>
                        <li><strong>Family History:</strong> Having close blood relatives who have had the disease.</li>
                        <li><strong>Dense Breast Tissue:</strong> Makes mammograms harder to read and slightly increases risk.</li>
                        <li><strong>Menstrual History:</strong> Early periods (before 12) or late menopause (after 55).</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" />
                        Modifiable (You Can Control)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Physical Activity:</strong> Regular exercise (150 mins/week) significantly lowers risk.</li>
                        <li><strong>Weight Management:</strong> Maintaining a healthy weight, especially after menopause.</li>
                        <li><strong>Alcohol Intake:</strong> Limiting alcohol (even small amounts can increase risk).</li>
                        <li><strong>Hormone Therapy:</strong> Limiting the duration of combined hormone replacement therapy (HRT) after menopause.</li>
                        <li><strong>Breastfeeding:</strong> Breastfeeding for several months can reduce breast cancer risk.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Standard Screening Guidelines */}
              <section>
                <Card className="not-prose bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="w-6 h-6 text-primary" />
                      Standard Breast Cancer Screening Guidelines
                    </CardTitle>
                    <CardDescription>
                      Based on the American Cancer Society (ACS) recommendations for women at <strong>Average Risk</strong>.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold border-b">Age Group</th>
                            <th className="px-4 py-3 text-left font-semibold border-b">Recommendation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-3 font-medium text-nowrap">Ages 40 to 44</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              Should have the choice to start annual breast cancer screening with mammograms if they wish to do so.
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-nowrap">Ages 45 to 54</td>
                            <td className="px-4 py-3 font-semibold text-primary">
                              Should get mammograms every year.
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-nowrap">Ages 55 and older</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              Can switch to mammograms every 2 years, or can continue yearly screening. Screening should continue as long as a woman is in good health and is expected to live 10 more years or longer.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      * Women who are at High Risk (due to family history, genetic tendency, or past breast cancer) may need to start MRI and mammogram screenings earlier (often around age 30).
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Why choose this tool */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold border-b border-gray-200 pb-2">
                  Why Use Our Calculator?
                </h2>
                <p>
                  While you may find tools like the <strong>MDCalc Gail Model</strong> or government-backed platforms, our interface is specifically built to be user-friendly, reducing medical anxiety while providing highly accurate, guidelines-based advice.
                </p>
                <ul className="space-y-2 mt-4">
                  <li><strong>Complete Privacy:</strong> Your sensitive health data is processed entirely in your browser. We do not store or track your inputs.</li>
                  <li><strong>Action-Oriented:</strong> We don't just calculate risk; we give you the exact questions to ask your doctor.</li>
                  <li><strong>Holistic View:</strong> Integrates seamlessly with our BMI and Body Shape calculators so you can track your modifiable risk factors (like weight and fat distribution) in one place.</li>
                </ul>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-16">
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
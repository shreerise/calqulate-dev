import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import FraminghamRiskCalculator from "@/components/calculators/framingham-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  History, 
  Calculator as CalculatorIcon, 
  AlertTriangle, 
  Info,
  TrendingDown,
  Globe
} from "lucide-react"

export const metadata: Metadata = {
  title: "Framingham Risk Calculator: Predict Your 10-Year Heart Health",
  description:
    "Predict your 10-year heart health with the Framingham Risk Score Calculator. Estimate your risk of heart attack or stroke based on the Framingham Heart Study.",
  keywords:
    "Framingham Risk Calculator, framingham risk calculator, framingham risk score calculator, framingham heart risk calculator, framingham heart study risk calculator, framingham study risk calculator, 10 year ascvd risk calculator framingham",
}

const faqs = [
  {
    question: "Is the Framingham Risk Calculator accurate for everyone?",
    answer:
      "The original Framingham Heart Study was conducted on a primarily Caucasian population. While it is highly accurate for many, some ethnic groups in Malaysia, the UAE, or South Asia may find that 'Pooled Cohort Equations' (ASCVD) provide a more nuanced result for their specific demographic.",
  },
  {
    question: "How often should I use the framingham risk score calculator?",
    answer:
      "If you are over age 30, it is clinically recommended to check your risk every 4–6 years. However, if you have existing risk factors like hypertension or high cholesterol, checking it annually with your healthcare provider is advised to track the effectiveness of your lifestyle changes.",
  },
  {
    question: "Does the calculator include stroke risk?",
    answer:
      "The 2008 Framingham 'General CVD' version includes stroke, transient ischemic attack (TIA), and heart failure. However, the 'Hard CHD' version of the framingham heart risk calculator focuses specifically on the probability of a heart attack or fatal coronary heart disease.",
  },
  {
    question: "What is the difference between FRS and the 10 year ascvd risk calculator framingham?",
    answer:
      "FRS (Framingham Risk Score) is the traditional model focusing on coronary heart disease. The 10-year ASCVD (Atherosclerotic Cardiovascular Disease) calculator is an updated model recommended by the AHA/ACC since 2013/2018 that includes stroke risk and accounts for race as a factor.",
  },
  {
    question: "Can I use mmol/L instead of mg/dL for cholesterol?",
    answer:
      "Most Framingham models use mg/dL. If you are in the UK or Malaysia, you should convert your mmol/L results to mg/dL (multiply by 38.67 for total cholesterol) before entering them into the framingham study risk calculator for the most accurate results.",
  },
  {
    question: "Does diabetes affect my Framingham score?",
    answer:
      "Yes, diabetes is considered a 'risk equivalent.' Having diabetes significantly increases the weighting in the framingham heart study risk calculator, as it drastically raises the probability of a vascular event over a 10-year period.",
  },
  {
    question: "Should I double my score if I have a family history of heart disease?",
    answer:
      "While the standard formula doesn't ask for family history, clinical guidelines often suggest that if a first-degree relative had premature heart disease, your actual risk may be twice what the calculator shows. Always discuss this 'multiplier' with your doctor.",
  },
]

export default function FraminghamRiskCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Framingham Risk Calculator"
        description="Estimate your 10-year risk of cardiovascular disease using the clinically validated Framingham Risk Score. Includes insights for patients in the USA, UK, UAE, and Malaysia."
        url="https://calqulate.net/health/framingham-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Framingham Risk Calculator: Predict Your 10-Year Heart Health
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Is your heart older than you are? Cardiovascular disease remains the leading cause of mortality 
                globally, but it is also one of the most preventable. For over 70 years, the 
                <strong> Framingham Risk Calculator</strong> has served as the gold standard for predicting heart health.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you are in the USA, UK, UAE, or Malaysia, knowing your 
                <strong><a href="/health/ascvd-risk-calculator" className="no-underline hover:underline hover:text-blue-700"> 10-year ASCVD risk calculator</a> Framingham</strong> score is the first step toward a longer life.
              </p>
            </div>

            {/* Calculator Component Placeholder */}
            <FraminghamRiskCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is the Framingham Risk Score Calculator? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is the Framingham Risk Score Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  The <strong>framingham risk score calculator</strong> is a clinically validated evidence-based tool 
                  used to estimate an individual’s 10-year risk of developing &quot;hard&quot; coronary heart disease (CHD), 
                  including myocardial infarction (heart attack) or fatal heart disease.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Developed from the landmark{" "}
                  <Link
                    href="/health/pulse-pressure-calculator"
                    className="font-semibold text-gray-700 no-underline hover:underline hover:text-blue-700"
                  >
                    Framingham Heart Study
                  </Link>
                  , which began in 1948 in Massachusetts, this study helped identify the major cardiovascular risk factors we recognize today: high blood pressure, high cholesterol, and smoking.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <History className="w-5 h-5 text-red-500" />
                      A Legacy of Life-Saving Data
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      How the <strong>framingham heart study risk calculator</strong> changed modern medicine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>1948:</strong> The study begins with 5,209 adult subjects.</li>
                        <li><strong>1960s:</strong> Cigarette smoking found to increase heart disease risk.</li>
                        <li><strong>1970s:</strong> High blood pressure and cholesterol linked to stroke.</li>
                        <li><strong>2008:</strong> The &quot;General CVD&quot; risk score is released for primary care use.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Image
                        src="/framingham-heart-study-chart.png"
                        alt="Framingham Heart Study Evolution"
                        width={320}
                        height={220}
                        className="rounded-xl border border-gray-200 bg-white object-contain"
                      />
                      <p className="text-gray-500 text-xs text-center">
                        70+ years of data drive our <strong>framingham study risk calculator</strong> accuracy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* How the Framingham Dashboard Works */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">How the Framingham Dashboard Works</h2>
                <p className="mb-4">
                  The <strong>framingham calculator</strong> takes into consideration how your lifestyle and 
                  biology interact. You need a few key pieces of information to get an accurate reading:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-5 h-5 text-blue-600" /></div>
                    <div>
                      <p className="font-semibold">Age & Gender</p>
                      <p className="text-sm text-gray-600">Risk increases sharply between ages 30-79. Formulas differ significantly for men and women.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 rounded-lg"><TrendingDown className="w-5 h-5 text-red-600" /></div>
                    <div>
                      <p className="font-semibold">Cholesterol Ratios</p>
                      <p className="text-sm text-gray-600">The tool compares your Total Cholesterol to your &quot;Good&quot; HDL cholesterol levels.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 rounded-lg"><Stethoscope className="w-5 h-5 text-green-600" /></div>
                    <div>
                      <p className="font-semibold">Blood Pressure</p>
                      <p className="text-sm text-gray-600">Systolic (top number) pressure is a primary predictor of vascular stress.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
                    <div>
                      <p className="font-semibold">Lifestyle Factors</p>
                      <p className="text-sm text-gray-600">Smoking status and Diabetes significantly raise your 10-year risk profile.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-blue-700" />
                    <h3 className="font-bold text-blue-900">Note for UK, UAE, and Malaysia Users</h3>
                  </div>
                  <p className="text-blue-800 text-sm">
                    This <strong>framingham heart risk calculator</strong> uses mg/dL for cholesterol. 
                    In the UK and Malaysia, results are often in mmol/L. To get an accurate score, 
                    convert your units (mmol/L &times; 38.67 = mg/dL) before inputting your data.
                  </p>
                </div>
              </section>

              {/* Interpreting Your Results Table */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Interpreting Your Results: What Does Your Percentage Mean?</CardTitle>
                    <CardDescription>
                      Once the <strong>10 year ascvd risk calculator framingham</strong> produces a 
                      percentage, use this clinical benchmark to understand your risk level.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-3 text-left">Risk Level</th>
                            <th className="border px-4 py-3 text-left">10-Year CHD Risk (%)</th>
                            <th className="border px-4 py-3 text-left">Recommended Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-medium text-green-700">Low Risk</td>
                            <td className="border px-4 py-3">&lt; 10%</td>
                            <td className="border px-4 py-3">Maintain healthy lifestyle; periodic re-screening.</td>
                          </tr>
                          <tr className="bg-orange-50/30">
                            <td className="border px-4 py-3 font-medium text-orange-700">Intermediate Risk</td>
                            <td className="border px-4 py-3">10% – 20%</td>
                            <td className="border px-4 py-3">Lifestyle changes + discussion about statin therapy with a doctor.</td>
                          </tr>
                          <tr className="bg-red-50/30">
                            <td className="border px-4 py-3 font-medium text-red-700">High Risk</td>
                            <td className="border px-4 py-3">&gt; 20%</td>
                            <td className="border px-4 py-3">Intensive medical intervention and lifestyle overhaul.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 italic">
                      *According to Framingham data, a 50-year-old smoker with high blood pressure often 
                      carries a 10-15% risk, compared to an optimal peer at only 6%.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* The Math Behind the Risk Calculator */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">The Science: The Math Behind the Framingham Risk Calculator</h2>
                <p className="mb-4">
                  For researchers and clinicians using the <strong>framingham risk calculator</strong>, the 
                  tool utilizes a complex multivariable regression model. 
                </p>
                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                  <p className="text-blue-400">// Men Constant (L_Men): -172.300168</p>
                  <p className="text-pink-400">// Women Constant (L_Women): -146.5933061</p>
                  <p className="mt-4">Risk Probability Formula: P = 1 - S ^ exp(L)</p>
                  <p className="text-gray-400 mt-2">
                    Where S is the baseline survival rate (0.9402 for men and 0.98767 for women).
                  </p>
                </div>
                <p className="mt-4">
                  This level of mathematical precision is why the <strong>framingham heart risk calculator</strong> 
                  remains a trusted global tool in clinical settings across the USA and the Middle East.
                </p>
              </section>

              {/* 1. Ethnicity Adjustment Section */}
              <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
                <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  <Globe className="w-5 h-5" /> Ethnicity & Regional Considerations
                </h3>
                <p className="text-sm text-amber-800 mt-2">
                  While the <strong>framingham heart study risk calculator</strong> is a global benchmark, it was originally 
                  developed using a specific demographic in the USA. 
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
                  <li><strong>South Asian / Malay Descent:</strong> Often experience heart events 10 years earlier than other groups.</li>
                  <li><strong>Middle Eastern Residents:</strong> Higher prevalence of metabolic factors may require more aggressive prevention.</li>
                </ul>
              </section>

              {/* 2. Decision Support Section */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4">What to do with your Framingham Score?</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-white border-blue-100">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-blue-700">0% - 5% (Low)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-xs">
                      Focus on prevention. Re-check your <strong>framingham risk calculator</strong> score in 3-5 years.
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-orange-100">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-orange-700">5% - 10% (Borderline)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-xs">
                      Discuss &quot;Risk Enhancers&quot; (like family history) with your GP. Start lifestyle changes now.
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-red-100">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-red-700">7.5% - 20% (Intermediate)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-xs">
                      Clinical guidelines often suggest discussing statin therapy at this stage to prevent future ASCVD.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* FRS vs ASCVD */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">FRS (2008) vs. ASCVD (2018): Which Should You Use?</h2>
                <p>
                  In 2018, the American College of Cardiology (ACC) and the American Heart Association (AHA) 
                  recommended the use of the <strong>2018 ASCVD 10-year Risk Calculator</strong>.
                </p>
                <p>
                  While the <strong>framingham heart study risk calculator</strong> is the foundation, the 
                  newer ASCVD model (Pooled Cohort Equations) includes <strong>Race</strong> as a factor and 
                  focuses on a broader range of events, including stroke. However, the Framingham model remains 
                  the most historically significant tool for primary care globally.
                </p>
                
                <div className="mt-6 border-l-4 border-red-500 pl-4 py-2 italic bg-red-50 rounded-r-lg">
                  <p className="font-bold text-red-900 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Pro Tip: The Family History Factor
                  </p>
                  <p className="text-red-800 text-sm">
                    The <strong>framingham study risk calculator</strong> doesn&apos;t account for genetics. 
                    If you have a first-degree relative with premature heart disease, many clinicians 
                    suggest <strong>doubling</strong> your FRS score for a truer picture of your risk.
                  </p>
                </div>
              </section>

              {/* 5 Steps to Lower Your Score */}
              <section>
                <h2 className="mb-6 text-2xl font-semibold">3 Steps to Lower Your Framingham Risk Score</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-xl hover:border-blue-500 transition-colors">
                    <h3 className="font-bold flex items-center gap-2"><TrendingDown className="w-5 h-5 text-blue-500" /> 1. Manage Blood Pressure</h3>
                    <p className="text-sm text-gray-600">Dropping your systolic pressure by just 10mmHg can significantly reduce your 10-year risk percentage.</p>
                  </div>
                  <div className="p-4 border rounded-xl hover:border-red-500 transition-colors">
                    <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-red-500" /> 2. Smoking Cessation</h3>
                    <p className="text-sm text-gray-600">Within one year of quitting, your excess risk of CHD is reduced by half in the <strong>framingham risk calculator</strong> algorithm.</p>
                  </div>
                  <div className="p-4 border rounded-xl hover:border-green-500 transition-colors">
                    <h3 className="font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-green-500" /> 3. Optimize HDL</h3>
                    <p className="text-sm text-gray-600">Focus on &quot;good&quot; fats found in olive oil and fish, staples in the healthy diets of the UAE and Mediterranean.</p>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="mb-4 text-2xl font-bold">Conclusion: Take Control of Your Heart Health</h2>
                <p className="mb-4">
                  The <strong>Framingham Risk Calculator</strong> is more than just a math equation; it is a 
                  legacy of 70 years of life-saving research. By understanding your 
                  <strong> 10 year ascvd risk calculator framingham</strong> score, you are empowered to 
                  make informed decisions with your physician.
                </p>
                <p className="font-semibold">
                  Don&apos;t wait for symptoms. Use our <strong>framingham heart risk calculator</strong> 
                  today, and start your journey toward a healthier, longer life.
                </p>
              </section>

              {/* References */}
              <section className="mt-16 pt-8 border-t text-sm text-gray-500 italic">
                <h4 className="font-bold mb-2">Scientific References & Guidelines:</h4>
                <ul className="space-y-1">
                  <li>D&apos;Agostino RB, et al. (2008). General Cardiovascular Risk Profile for Use in Primary Care. <em>Circulation</em>.</li>
                  <li>Arnett DK, et al. (2019). ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease.</li>
                  <li>WHO Cardiovascular Disease Risk Charts for Malaysia and UAE regions.</li>
                </ul>
                <p className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <strong>Medical Disclaimer:</strong> This 10 year ascvd risk calculator framingham tool is for educational purposes 
                  only and is not a substitute for professional medical advice, diagnosis, or treatment.
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
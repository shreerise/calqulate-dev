import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BreastCancerRiskCalculator from "@/components/calculators/breast-cancer-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  HeartPulse,
  ShieldCheck,
  Users,
  Info,
  FileText,
  Scale,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Dna,
  Pill,
  ClipboardList,
  Stethoscope,
  TrendingUp,
  Clock,
  UserCheck,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Breast Cancer Risk Calculator: Gail Model & Tyrer-Cuzick | Free",
  description:
    "Calculate your breast cancer risk using validated Gail and Tyrer-Cuzick models. Get your 5-year, 10-year, and lifetime risk score. Free, private, clinically-based.",
  keywords:
    "breast cancer risk calculator, breast cancer risk assessment, gail model calculator, tyrer cuzick calculator, lifetime risk of breast cancer calculator, family history breast cancer risk calculator, high risk breast cancer calculator, ibis breast cancer risk calculator",
    alternates: {
      canonical: "https://calqulate.net/health/breast-cancer-risk-calculator",
    }
}

const faqs = [
  {
    question: "What is a breast cancer risk assessment?",
    answer:
      "A breast cancer risk assessment evaluates personal and family medical history, reproductive factors, and genetic indicators to estimate your probability of developing breast cancer over defined time periods.",
  },
  {
    question: "What is the Gail Model?",
    answer:
      "The Gail Model is a breast cancer risk prediction tool developed by the National Cancer Institute that uses 7 factors—including age, biopsy history, and family history—to calculate 5-year and lifetime risk.",
  },
  {
    question: "What is the Tyrer Cuzick score?",
    answer:
      "The Tyrer-Cuzick score represents your 10-year and lifetime breast cancer risk percentage calculated by the IBIS model, which incorporates extended family history, breast density, and hormone therapy use.",
  },
  {
    question: "What is considered high lifetime risk?",
    answer:
      "A lifetime breast cancer risk greater than 20% is classified as high risk. This threshold qualifies women for enhanced screening, including annual breast MRI starting at age 30.",
  },
  {
    question: "Does family history guarantee I'll get breast cancer?",
    answer:
      "No. Family history increases statistical risk but does not guarantee diagnosis. Most women with family history never develop breast cancer. Risk assessment helps guide screening, not predict certainty.",
  },
  {
    question: "Should I take a lifetime risk assessment test?",
    answer:
      "Women over 35, those with family history of breast or ovarian cancer, and anyone considering preventive strategies should complete a lifetime breast cancer risk assessment to guide informed medical decisions.",
  },
  {
    question: "Can men use a breast cancer risk calculator?",
    answer:
      "Most breast cancer risk calculators are designed for women. Male breast cancer is rare (less than 1% of cases) and uses different risk factors. Men with BRCA2 mutations should consult specialists.",
  },
]

export default function BreastCancerRiskCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Breast Cancer Risk Calculator"
        description="Calculate your breast cancer risk using validated Gail and Tyrer-Cuzick models. Get your 5-year, 10-year, and lifetime risk score with personalized screening recommendations."
        url="https://calqulate.net/health/breast-cancer-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Breast Cancer Risk Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Understanding your personal risk is powerful. Use this clinically-validated assessment to estimate your 5-year and lifetime breast cancer risk based on the Gail Model and Tyrer-Cuzick (IBIS) methodology.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Your information is private and never stored. This tool helps guide screening decisions — not replace professional medical advice.
              </p>
            </div>

            {/* Calculator Component */}
            <BreastCancerRiskCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* Section 1: What Is a Breast Cancer Risk Assessment */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-pink-600" />
                  What Is a Breast Cancer Risk Assessment Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  A breast cancer risk assessment calculator estimates your probability of developing breast cancer over 5 years, 10 years, and your lifetime. It uses validated medical models—Gail and Tyrer-Cuzick—to analyze personal and family health factors.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Risk assessment is not a diagnosis. It provides a statistical estimate based on population-level data to help you and your healthcare provider make informed decisions about screening frequency, preventive measures, and lifestyle modifications.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center">
                    <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <h4 className="font-bold text-pink-800">5-Year Risk</h4>
                    <p className="text-sm text-gray-600">Short-term probability estimate</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center">
                    <TrendingUp className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <h4 className="font-bold text-pink-800">10-Year Risk</h4>
                    <p className="text-sm text-gray-600">Mid-term risk projection</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center">
                    <Activity className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <h4 className="font-bold text-pink-800">Lifetime Risk</h4>
                    <p className="text-sm text-gray-600">Total probability up to age 90</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">How Risk Assessment Differs from Diagnosis</h3>
                <p className="text-gray-700 leading-relaxed">
                  A breast cancer risk assessment tool calculates statistical probability. It cannot detect existing cancer or predict with certainty whether you will develop cancer. Mammograms, biopsies, and clinical exams diagnose cancer. Risk calculators guide prevention strategies.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Who Should Use a Breast Cancer Risk Calculator</h3>
                <p className="text-gray-700 leading-relaxed">
                  Women aged 35 and older benefit most from breast cancer risk assessment. Those with family history of breast or ovarian cancer, previous breast biopsies, or concerns about hormone therapy should complete an assessment. Results help determine appropriate screening schedules and preventive interventions.
                </p>
              </section>

              {/* Section 2: Gail Model */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-pink-600" />
                  What Is the Gail Model Breast Cancer Risk Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  The Gail Model is a statistical tool developed by the National Cancer Institute. It calculates 5-year and lifetime breast cancer risk using age, reproductive history, family history of breast cancer, and prior biopsy results.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Originally developed in 1989 and updated multiple times, the Gail Model remains the most widely used breast cancer risk assessment tool in clinical settings. It forms the basis for determining eligibility for preventive medications like tamoxifen.
                </p>

                <Card className="border-pink-100 shadow-sm rounded-2xl overflow-hidden mt-6">
                  <CardHeader className="bg-pink-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-pink-800">
                      <Info className="w-5 h-5" />
                      Gail Model Risk Factors
                    </CardTitle>
                    <CardDescription className="text-pink-700/80">
                      Seven factors determine your Gail Model risk score
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-700 list-none pl-0">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Current age
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Age at first menstrual period
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Age at first live birth
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Number of first-degree relatives with breast cancer
                        </li>
                      </ul>
                      <ul className="space-y-2 text-gray-700 list-none pl-0">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Number of previous breast biopsies
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Presence of atypical hyperplasia in biopsy
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600" /> Race/ethnicity
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Gail Model Limitations</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Gail Model does not account for extended family history (grandmothers, aunts, cousins), paternal family history, breast density, or BRCA gene mutations. Women with strong hereditary patterns may receive underestimated risk scores from the Gail Model alone.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">When to Use the Gail Model Calculator</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Gail Model calculator is appropriate for general population screening, determining eligibility for chemoprevention (tamoxifen, raloxifene), and initial risk stratification. For women with extensive family history, the Tyrer-Cuzick model provides more accurate assessment.
                </p>
              </section>

              {/* Section 3: Tyrer-Cuzick */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Dna className="w-6 h-6 text-pink-600" />
                  What Is the Tyrer-Cuzick (IBIS) Risk Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  The Tyrer-Cuzick model, also called IBIS, provides comprehensive breast cancer risk assessment. It includes extended family history, breast density, hormone replacement therapy use, and body mass index for more detailed 10-year and lifetime projections.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Developed by researchers at Queen Mary University of London, the IBIS model is particularly valuable for high-risk clinics and genetic counseling settings where detailed family pedigrees are available.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Tyrer-Cuzick vs Gail Model: Key Differences</h3>
                <Card className="not-prose overflow-hidden border-pink-200 mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Feature</th>
                        <th className="px-6 py-4 text-left font-bold">Gail Model</th>
                        <th className="px-6 py-4 text-left font-bold">Tyrer-Cuzick (IBIS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">Extended family history</td>
                        <td className="px-6 py-4">❌ Not included</td>
                        <td className="px-6 py-4">✅ Grandparents, aunts, cousins</td>
                      </tr>
                      <tr className="bg-pink-50/30">
                        <td className="px-6 py-4 font-medium text-gray-700">Breast density</td>
                        <td className="px-6 py-4">❌ Not included</td>
                        <td className="px-6 py-4">✅ Included</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">HRT use</td>
                        <td className="px-6 py-4">❌ Not included</td>
                        <td className="px-6 py-4">✅ Type and duration</td>
                      </tr>
                      <tr className="bg-pink-50/30">
                        <td className="px-6 py-4 font-medium text-gray-700">BMI/Body weight</td>
                        <td className="px-6 py-4">❌ Not included</td>
                        <td className="px-6 py-4">✅ Included</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">BRCA probability</td>
                        <td className="px-6 py-4">❌ Not calculated</td>
                        <td className="px-6 py-4">✅ Estimates carrier probability</td>
                      </tr>
                      <tr className="bg-pink-50/30">
                        <td className="px-6 py-4 font-medium text-gray-700">Best suited for</td>
                        <td className="px-6 py-4">General screening</td>
                        <td className="px-6 py-4">High-risk clinics, detailed assessment</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">What Is a Tyrer-Cuzick Score?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A Tyrer-Cuzick score represents your calculated 10-year and lifetime breast cancer risk as a percentage. A score above 20% lifetime risk classifies you as high-risk, qualifying you for enhanced screening protocols including annual MRI.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">When Clinicians Recommend the IBIS Calculator</h3>
                <p className="text-gray-700 leading-relaxed">
                  Healthcare providers recommend the IBIS breast cancer risk calculator when patients have multiple affected relatives, known BRCA mutations in the family, dense breast tissue, or are considering genetic testing referrals. It provides the most comprehensive risk picture available.
                </p>
              </section>

              {/* Section 4: Risk Factors */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-pink-600" />
                  What Are the Main Breast Cancer Risk Factors?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Breast cancer risk factors include age, family history of breast or ovarian cancer, BRCA gene mutations, breast density, early menstruation, late menopause, hormone therapy use, obesity, alcohol consumption, and previous breast biopsies with abnormal cells.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Risk factors divide into two categories: non-modifiable factors you cannot change (genetics, age) and modifiable factors you can influence through lifestyle choices (weight, alcohol, exercise).
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                      <Dna className="w-5 h-5" /> Non-Modifiable Risk Factors
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Age:</strong> Risk increases significantly after 50</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Genetics:</strong> BRCA1/BRCA2 mutations increase lifetime risk to 45-72%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Family history:</strong> First-degree relative doubles baseline risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Breast density:</strong> Dense tissue increases risk 4-6 times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Early menstruation:</strong> Before age 12 increases exposure to estrogen</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5" /> Modifiable Risk Factors
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Obesity:</strong> Post-menopausal obesity increases risk by 20-40%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Alcohol:</strong> Each daily drink increases risk by 7-10%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Physical inactivity:</strong> Sedentary lifestyle elevates risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>HRT use:</strong> Combined therapy increases risk after 5+ years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
                        <span><strong>Not breastfeeding:</strong> Breastfeeding provides protective effect</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Family History */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Users className="w-6 h-6 text-pink-600" />
                  How Does Family History Affect Breast Cancer Risk?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Having a first-degree relative (mother, sister, daughter) diagnosed with breast cancer doubles your risk. Risk increases further with multiple affected relatives, relatives diagnosed before age 50, or family history of ovarian cancer or BRCA mutations.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  A family history breast cancer risk calculator accounts for both maternal and paternal lineage. Breast cancer genes pass equally through fathers, making paternal family history equally important for risk assessment.
                </p>

                <Card className="border-pink-100 shadow-sm rounded-2xl overflow-hidden mt-6">
                  <CardHeader className="bg-pink-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-pink-800">
                      <Users className="w-5 h-5" />
                      Family History Risk Multipliers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">One first-degree relative</span>
                        <span className="font-bold text-pink-700">2x baseline risk</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Two first-degree relatives</span>
                        <span className="font-bold text-pink-700">3x baseline risk</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Relative diagnosed before 50</span>
                        <span className="font-bold text-pink-700">Higher risk than later diagnosis</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Family ovarian cancer history</span>
                        <span className="font-bold text-pink-700">Suggests BRCA mutation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">First-Degree vs Second-Degree Relative Risk</h3>
                <p className="text-gray-700 leading-relaxed">
                  First-degree relatives (parents, siblings, children) share 50% of your genes. Second-degree relatives (grandparents, aunts, uncles, nieces, nephews) share 25%. The Gail Model counts only first-degree relatives. The Tyrer-Cuzick model incorporates both levels for comprehensive assessment.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">When Family History Warrants Genetic Testing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Genetic counseling is recommended when family history includes breast cancer before age 50, ovarian cancer at any age, male breast cancer, Ashkenazi Jewish ancestry with breast cancer, or multiple generations affected on the same side of the family.
                </p>
              </section>

              {/* Section 6: Understanding High Risk */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                  What Is Considered High Risk for Breast Cancer?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  A lifetime breast cancer risk exceeding 20% is classified as high risk by major medical organizations. Women with high-risk scores qualify for enhanced screening protocols, including annual MRI in addition to mammography, starting at earlier ages.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  The American Cancer Society, National Comprehensive Cancer Network, and other guidelines use this 20% threshold to determine screening intensity and preventive intervention eligibility.
                </p>

                <Card className="not-prose overflow-hidden border-pink-200 mt-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Lifetime Risk</th>
                        <th className="px-6 py-4 text-left font-bold">Category</th>
                        <th className="px-6 py-4 text-left font-bold">Recommended Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">&lt;15%</td>
                        <td className="px-6 py-4">Average Risk</td>
                        <td className="px-6 py-4">Standard mammography schedule</td>
                      </tr>
                      <tr className="bg-pink-50/30">
                        <td className="px-6 py-4 font-bold text-yellow-700">15–20%</td>
                        <td className="px-6 py-4">Moderate Risk</td>
                        <td className="px-6 py-4">Discuss enhanced screening with provider</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-red-700">&gt;20%</td>
                        <td className="px-6 py-4">High Risk</td>
                        <td className="px-6 py-4">Annual MRI + mammography recommended</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <p className="mt-6 text-gray-700 font-medium bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                  <strong>Note:</strong> The general population average lifetime breast cancer risk is approximately 12% (1 in 8 women). A "high risk" classification means your risk exceeds this average substantially.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">What a 5-Year Risk Score Means</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your 5-year risk score indicates the probability of developing breast cancer within the next five years. A 5-year risk of 1.67% or higher (the threshold used in breast cancer prevention trials) may qualify you for preventive medication discussions.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">What Your Lifetime Risk Score Means</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lifetime risk calculates probability from your current age to age 90. This cumulative measure guides long-term prevention strategies, screening frequency decisions, and conversations about risk-reducing surgeries for very high-risk individuals.
                </p>
              </section>

              {/* Section 7: HRT Risk */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Pill className="w-6 h-6 text-pink-600" />
                  How Does HRT Affect Breast Cancer Risk?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Hormone replacement therapy (HRT) increases breast cancer risk, particularly combined estrogen-progestin therapy used for more than 5 years. Estrogen-only HRT carries lower risk. The Tyrer-Cuzick model factors HRT duration and type into risk calculations.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  The Women's Health Initiative study established that combined HRT increases breast cancer risk by approximately 26% after 5 years of use. Risk decreases after discontinuation, returning to baseline within 5-10 years.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 border border-pink-200 rounded-2xl bg-pink-50/50">
                    <h3 className="font-bold text-pink-800 mb-3">Combined HRT (Estrogen + Progestin)</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 26% increased risk after 5+ years</li>
                      <li>• Risk increases with duration of use</li>
                      <li>• Higher risk for current vs. past users</li>
                      <li>• Used for women with intact uterus</li>
                    </ul>
                  </div>
                  <div className="p-5 border border-green-200 rounded-2xl bg-green-50/50">
                    <h3 className="font-bold text-green-800 mb-3">Estrogen-Only HRT</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Lower breast cancer risk increase</li>
                      <li>• Some studies show neutral or slight reduction</li>
                      <li>• Used for women after hysterectomy</li>
                      <li>• Still requires risk-benefit discussion</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">HRT Risk Calculator Considerations</h3>
                <p className="text-gray-700 leading-relaxed">
                  When using a breast cancer risk calculator that includes HRT (like Tyrer-Cuzick), provide accurate information about therapy type, duration, and current use status. HRT for menopausal symptoms requires individualized risk-benefit analysis with your healthcare provider.
                </p>
              </section>

              {/* Section 8: Recurrence Calculator */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-pink-600" />
                  What Is a Breast Cancer Recurrence Risk Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Breast cancer recurrence risk calculators estimate the probability of cancer returning after treatment. Models like Oncotype DX and PREDICT use tumor characteristics, treatment history, and molecular markers—different inputs than primary prevention calculators like Gail or Tyrer-Cuzick.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Recurrence calculators serve breast cancer survivors. Primary risk calculators serve women who have never had breast cancer. These tools answer fundamentally different questions and should not be confused.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Recurrence Risk vs Initial Risk: Different Tools</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">Primary Risk Calculators</h4>
                    <p className="text-sm text-gray-600">Gail, Tyrer-Cuzick, IBIS — for women who have never had breast cancer</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">Recurrence Calculators</h4>
                    <p className="text-sm text-gray-600">Oncotype DX, PREDICT, MammaPrint — for breast cancer survivors</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Oncotype DX Score Explained</h3>
                <p className="text-gray-700 leading-relaxed">
                  Oncotype DX analyzes 21 genes in tumor tissue to produce a Recurrence Score (0-100). Low scores (0-25) indicate low recurrence risk and minimal chemotherapy benefit. High scores (26+) suggest higher recurrence risk where chemotherapy may provide benefit.
                </p>
              </section>

              {/* Section 9: Survival Calculator */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-pink-600" />
                  What Is a Breast Cancer Survival Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Breast cancer survival calculators estimate prognosis after diagnosis based on cancer stage, grade, receptor status, and treatment response. The PREDICT tool (Cambridge) and Adjuvant! Online are examples. These differ from prevention-focused risk assessment calculators.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Survival calculators require a breast cancer diagnosis. They help oncologists and patients understand treatment benefits and make informed decisions about chemotherapy, radiation, and hormonal therapy.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">How the PREDICT Model Works</h3>
                <p className="text-gray-700 leading-relaxed">
                  The PREDICT breast cancer prognosis calculator uses tumor size, grade, lymph node status, ER/PR/HER2 status, and Ki-67 levels to estimate 5-year and 10-year survival. It shows the additional survival benefit of various treatments including chemotherapy and hormonal therapy.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Survival Calculators Are Not Definitive Predictions</h3>
                <p className="text-gray-700 leading-relaxed">
                  All survival and prognosis calculators provide statistical estimates based on population data. Individual outcomes vary significantly. These tools guide treatment discussions but cannot predict any individual's specific outcome with certainty.
                </p>
              </section>

              {/* Section 10: Lowering Risk */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-pink-600" />
                  How Can I Lower My Breast Cancer Risk?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Modifiable breast cancer risk reduction strategies include maintaining healthy weight, exercising 150+ minutes weekly, limiting alcohol to one drink daily, avoiding smoking, breastfeeding when possible, and discussing preventive medications with your doctor if you're high-risk.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Even women with elevated genetic risk can reduce their overall probability through lifestyle modifications. Risk calculators estimate probability, not destiny.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 not-prose">
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <Scale className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Maintain Healthy Weight</h4>
                    <p className="text-xs text-gray-600 mt-1">Especially after menopause</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Exercise Regularly</h4>
                    <p className="text-xs text-gray-600 mt-1">150+ minutes per week</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <AlertTriangle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Limit Alcohol</h4>
                    <p className="text-xs text-gray-600 mt-1">1 drink or less daily</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <HeartPulse className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Breastfeed If Possible</h4>
                    <p className="text-xs text-gray-600 mt-1">Provides protective effect</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <Pill className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Consider Preventive Meds</h4>
                    <p className="text-xs text-gray-600 mt-1">For high-risk women</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50 text-center">
                    <Stethoscope className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-green-800 text-sm">Regular Screenings</h4>
                    <p className="text-xs text-gray-600 mt-1">Early detection saves lives</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Preventive Medications for High-Risk Women</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tamoxifen and raloxifene can reduce breast cancer risk by approximately 50% in high-risk women. These medications block estrogen's effects on breast tissue. Eligibility requires a 5-year risk of 1.67% or higher. Side effects require careful consideration with your oncologist.
                </p>
              </section>

              {/* Section 11: After Getting Score */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-pink-600" />
                  What Should I Do After Getting My Risk Score?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  After receiving your breast cancer risk assessment results, schedule a consultation with your healthcare provider. Discuss your specific score, appropriate screening intervals, genetic testing referrals if indicated, and personalized prevention strategies based on your risk category.
                </p>

                <Card className="border-pink-100 shadow-sm rounded-2xl overflow-hidden mt-6">
                  <CardHeader className="bg-pink-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-pink-800">
                      <HelpCircle className="w-5 h-5" />
                      Questions to Ask Your Doctor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-1 shrink-0" />
                        <span>Based on my risk score, when should I start mammograms?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-1 shrink-0" />
                        <span>Should I have annual MRI in addition to mammography?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-1 shrink-0" />
                        <span>Is genetic counseling or BRCA testing appropriate for me?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-1 shrink-0" />
                        <span>Am I a candidate for preventive medications like tamoxifen?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-1 shrink-0" />
                        <span>What lifestyle changes would most reduce my personal risk?</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">When Genetic Counseling Is Recommended</h3>
                <p className="text-gray-700 leading-relaxed">
                  Genetic counseling is recommended for women with lifetime risk above 20%, family history of BRCA-related cancers, Ashkenazi Jewish ancestry with breast cancer family history, or family members with known genetic mutations. A genetic counselor helps interpret test results and discuss implications.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Screening Guidelines by Risk Level</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4 not-prose">
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50">
                    <h4 className="font-bold text-green-800 mb-2">Average Risk (&lt;15%)</h4>
                    <p className="text-sm text-gray-600">Annual mammogram starting at 40-50 (guideline dependent)</p>
                  </div>
                  <div className="p-4 border border-yellow-200 rounded-xl bg-yellow-50/50">
                    <h4 className="font-bold text-yellow-800 mb-2">Moderate Risk (15-20%)</h4>
                    <p className="text-sm text-gray-600">Discuss MRI with provider; may qualify for supplemental screening</p>
                  </div>
                  <div className="p-4 border border-red-200 rounded-xl bg-red-50/50">
                    <h4 className="font-bold text-red-800 mb-2">High Risk (&gt;20%)</h4>
                    <p className="text-sm text-gray-600">Annual MRI + mammogram starting at 30; preventive options discussion</p>
                  </div>
                </div>
              </section>

              {/* Section 12: Calculator Comparison */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-pink-600" />
                  Which Breast Cancer Risk Calculator Is Most Accurate?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  No single breast cancer risk calculator is universally most accurate. The Gail Model suits general population screening. Tyrer-Cuzick provides better estimates for women with detailed family history or breast density data. Clinicians often use both for comprehensive assessment.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Validation studies show both models perform well at population level, with accuracy around 60-70% for identifying who will develop breast cancer. Individual predictions carry inherent uncertainty.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Gail vs Tyrer-Cuzick: When to Use Each</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4 not-prose">
                  <div className="p-5 border border-blue-200 rounded-xl bg-blue-50/50">
                    <h4 className="font-bold text-blue-800 mb-3">Use Gail Model When:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• General screening without detailed family tree</li>
                      <li>• Determining chemoprevention eligibility</li>
                      <li>• Limited family history information available</li>
                      <li>• Primary care setting risk stratification</li>
                    </ul>
                  </div>
                  <div className="p-5 border border-purple-200 rounded-xl bg-purple-50/50">
                    <h4 className="font-bold text-purple-800 mb-3">Use Tyrer-Cuzick When:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Detailed 3-generation family history available</li>
                      <li>• Breast density information known</li>
                      <li>• HRT use needs to be factored</li>
                      <li>• High-risk clinic or genetic counseling setting</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">Why Multiple Models Exist</h3>
                <p className="text-gray-700 leading-relaxed">
                  Different breast cancer risk calculators were developed for different clinical scenarios. The Gail Model prioritized simplicity for widespread screening. The Tyrer-Cuzick model prioritized accuracy for high-risk populations. Using both provides the most complete risk picture.
                </p>
              </section>

              {/* Section 13: Trust & Validation */}
              <section className="bg-white rounded-3xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-teal-600" />
                  Is This Breast Cancer Risk Calculator Clinically Validated?
                </h2>
                <p className="mb-4 text-gray-700">
                  Our calculator implements algorithms based on the Gail Model and Tyrer-Cuzick (IBIS) methodology—both validated through peer-reviewed studies and used in clinical settings. We cite National Cancer Institute and peer-reviewed sources for all risk factor weightings.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Based on NCI-validated Gail Model</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Incorporates Tyrer-Cuzick methodology</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Your data is never stored or tracked</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Not a substitute for professional evaluation</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  This tool provides educational risk estimates only. It does not diagnose cancer or replace clinical evaluation. Always consult a healthcare professional for personalized medical advice.
                </p>
              </section>

              {/* Important Limitations */}
              <section className="border-2 border-dashed border-teal-200 p-6 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5 text-teal-600" /> What Your Risk Score Does NOT Mean
                </h3>
                <ul className="space-y-2 text-gray-700 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>It does <strong>not</strong> mean you will definitely develop breast cancer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>It does <strong>not</strong> replace the need for regular mammograms and clinical exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>It is <strong>not</strong> a genetic test for BRCA or other mutations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>It cannot detect existing cancer — only screening and biopsy can diagnose</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-700 italic">
                  The goal of this breast cancer risk assessment tool is to guide prevention decisions and screening conversations — not to cause anxiety.
                </p>
              </section>

              {/* Who Built This */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-pink-600" />
                  About This Breast Cancer Risk Calculator
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  This breast cancer risk assessment tool was developed by health technology professionals using clinically-validated models. Our goal: provide accurate, transparent, and accessible risk information to help women make informed health decisions.
                </p>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3 font-medium">
                  "Knowledge reduces fear. Understanding your risk allows for proactive care. A breast cancer risk calculator is not about anxiety — it's about early awareness and smarter screening."
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white border-2 border-teal-200 rounded-3xl shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">Assessing your overall health?</h3>
                    <p className="text-gray-600 max-w-md">
                      Weight management is a key factor in breast cancer prevention. Check your BMI and body metrics to support your health goals.
                    </p>
                  </div>
                  <Button asChild size="lg" className="whitespace-nowrap bg-teal-600 hover:bg-teal-700">
                    <Link href="/health/bmi-calculator">
                      Check Your BMI <ArrowRight className="ml-2 w-4 h-4" />
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

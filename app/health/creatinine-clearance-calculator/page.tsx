import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import CreatinineClearanceCalculator from "@/components/calculators/creatinine-clearance-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Activity,
  Scale,
  ShieldCheck,
  UserCheck,
  Info,
  FileText,
  Pill,
  Heart,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Beaker,
  Calculator,
  Users,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Creatinine Clearance Calculator (Cockcroft-Gault): IBW vs ABW",
  description:
    "Calculate creatinine clearance using the Cockcroft-Gault equation with actual, ideal, and adjusted body weight. Includes CKD staging, drug dosing guidance, and clinical decision support.",
  keywords:
    "creatinine clearance calculator, cockcroft gault calculator, crcl calculator, creatinine clearance formula, cockcroft gault normal range, kidney function calculator, gfr clearance calculator, drug dosing renal",
  alternates: {
    canonical: "https://calqulate.net/health/creatinine-clearance-calculator",
  }
}

const faqs = [
  {
    question: "What is Creatinine Clearance (CrCl)?",
    answer:
      "Creatinine clearance (CrCl) is the volume of blood plasma cleared of creatinine per minute, measured in mL/min. It estimates how well your kidneys filter waste from the blood. Normal CrCl is 97-137 mL/min for men and 88-128 mL/min for women, declining approximately 1 mL/min per year after age 40.",
  },
  {
    question: "Which weight should I use in the Cockcroft-Gault equation?",
    answer:
      "For normal weight patients, use actual body weight. For obese patients (BMI ≥30 or >20% above ideal body weight), use adjusted body weight with a 40% correction factor: ABW = IBW + 0.4 × (Actual Weight - IBW). For underweight patients, use actual body weight.",
  },
  {
    question: "What is the normal Creatinine Clearance range?",
    answer:
      "Normal creatinine clearance is 97-137 mL/min for adult males and 88-128 mL/min for adult females. Values decline with age, approximately 1 mL/min per year after age 40. A CrCl ≥90 mL/min indicates normal kidney function, while <15 mL/min indicates kidney failure (ESRD).",
  },
  {
    question: "Should I use CrCl or eGFR for drug dosing?",
    answer:
      "Most FDA drug labels use Cockcroft-Gault CrCl for dosing recommendations because pharmacokinetic studies historically used this equation. Use CrCl for drugs with narrow therapeutic indices (vancomycin, aminoglycosides, DOACs), elderly patients, and obese patients. eGFR is acceptable for drugs with wide therapeutic indices.",
  },
  {
    question: "What is the Cockcroft-Gault formula?",
    answer:
      "The Cockcroft-Gault formula is: CrCl = [(140 - Age) × Weight (kg)] / [72 × Serum Creatinine (mg/dL)]. For females, multiply the result by 0.85. This equation was developed in 1976 using data from 249 male veterans.",
  },
  {
    question: "Why does the calculator show three different CrCl values?",
    answer:
      "We calculate CrCl using actual body weight, ideal body weight (IBW), and adjusted body weight (ABW) because the appropriate weight varies by patient. Obese patients should use ABW with a 40% correction factor, while underweight patients should use actual weight.",
  },
  {
    question: "How accurate is the Cockcroft-Gault equation?",
    answer:
      "The Cockcroft-Gault equation typically overestimates GFR by 10-20% compared to measured creatinine clearance. It may be less accurate in elderly patients with muscle wasting, obese patients, and those with unstable kidney function. Despite limitations, it remains the standard for most drug dosing.",
  },
]

export default function CreatinineClearanceCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Creatinine Clearance Calculator (Cockcroft-Gault)"
        description="Calculate creatinine clearance using the Cockcroft-Gault equation with support for ideal body weight, adjusted body weight, and drug dosing recommendations."
        url="https://calqulate.net/health/creatinine-clearance-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Creatinine Clearance Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate CrCl using the Cockcroft-Gault equation with actual, ideal, or adjusted body weight. Get instant CKD staging, drug dosing guidance, and clinical decision support for healthcare professionals.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you're a physician adjusting medication doses, a pharmacist verifying renal dosing, or a patient understanding your kidney function, this calculator provides accurate, evidence-based results.
              </p>
            </div>

            {/* Calculator Component */}
            <CreatinineClearanceCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* What is CrCl Section */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Beaker className="w-6 h-6 text-blue-600" />
                  What is Creatinine Clearance?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Creatinine clearance (CrCl) is the volume of blood plasma cleared of creatinine per unit time, measured in milliliters per minute (mL/min). It serves as a clinically practical estimate of the glomerular filtration rate (GFR)—the gold standard measure of kidney function.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Creatinine is a metabolic waste product generated from the normal breakdown of creatine phosphate in skeletal muscle. Production is relatively constant and proportional to muscle mass. Healthy kidneys filter creatinine from the blood into the urine at a predictable rate.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Normal Ranges</h4>
                    <ul className="space-y-2 text-blue-800 list-none pl-0">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Adult Males: 97-137 mL/min
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Adult Females: 88-128 mL/min
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Age Decline: ~1 mL/min/year after 40
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                    <h4 className="font-bold text-green-900 mb-2">Clinical Uses</h4>
                    <ul className="space-y-2 text-green-800 list-none pl-0">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Drug dosing for renally cleared medications
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> CKD staging and progression monitoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Pre-surgical kidney function assessment
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cockcroft-Gault Formula Section */}
              <section>
                <Card className="border-blue-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-blue-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-800">
                      <Calculator className="w-5 h-5" />
                      The Cockcroft-Gault Equation
                    </CardTitle>
                    <CardDescription className="text-blue-700/80">
                      The gold standard for drug dosing calculations since 1976
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 font-mono text-center mb-6">
                      <div className="text-sm text-slate-400 mb-2">For Males:</div>
                      <div className="text-lg md:text-xl">
                        CrCl = [(140 - Age) × Weight (kg)] / [72 × SCr (mg/dL)]
                      </div>
                      <div className="text-sm text-slate-400 mt-4 mb-2">For Females:</div>
                      <div className="text-lg md:text-xl">
                        CrCl = [(140 - Age) × Weight (kg)] / [72 × SCr (mg/dL)] × 0.85
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 font-semibold uppercase tracking-wider text-sm">Understanding the Variables:</p>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">140</div>
                        <p className="text-gray-700"><strong>(140 - Age):</strong> Accounts for age-related decline in kidney function. GFR decreases with age.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">kg</div>
                        <p className="text-gray-700"><strong>Weight (kg):</strong> Approximates muscle mass, which determines creatinine production. Most debated variable for obese patients.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">72</div>
                        <p className="text-gray-700"><strong>72:</strong> A constant derived empirically to convert the equation's output to mL/min.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">.85</div>
                        <p className="text-gray-700"><strong>× 0.85:</strong> Adjustment factor for females, accounting for lower average muscle mass compared to males.</p>
                      </div>
                    </div>
                    <p className="mt-6 text-sm italic text-gray-500 border-t pt-4">
                      Developed in 1976 by Drs. Cockcroft and Gault using data from 249 male veterans with CrCl ranging from 30-130 mL/min.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Which Weight to Use Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-blue-600" />
                  Which Weight Should You Use?
                </h2>
                <p className="mb-4 text-gray-700">Selecting the appropriate body weight is critical for accurate CrCl estimation. Here are evidence-based recommendations:</p>
                
                <div className="space-y-4 not-prose">
                  <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded-r-xl">
                    <h4 className="font-bold text-green-900 text-lg">Normal Weight Patients</h4>
                    <p className="text-green-800 mt-2"><strong>Use:</strong> Actual Body Weight (ABW)</p>
                    <p className="text-green-700 text-sm mt-1">When actual weight is within 20% of ideal body weight, ABW provides accurate estimation.</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-5 rounded-r-xl">
                    <h4 className="font-bold text-yellow-900 text-lg">Underweight Patients</h4>
                    <p className="text-yellow-800 mt-2"><strong>Use:</strong> Actual Body Weight (ABW)</p>
                    <p className="text-yellow-700 text-sm mt-1">For patients below their ideal body weight, always use actual weight. Using IBW would overestimate kidney function.</p>
                  </div>

                  <div className="border-l-4 border-red-500 bg-red-50 p-5 rounded-r-xl">
                    <h4 className="font-bold text-red-900 text-lg">Overweight/Obese Patients (BMI ≥30 or &gt;20% above IBW)</h4>
                    <p className="text-red-800 mt-2"><strong>Use:</strong> Adjusted Body Weight with 40% Correction Factor</p>
                    <div className="bg-white rounded-lg p-3 mt-3 font-mono text-center border">
                      ABW = IBW + 0.4 × (Actual Weight - IBW)
                    </div>
                    <p className="text-red-700 text-sm mt-3">Multiple studies confirm the 40% correction factor provides the least bias and highest accuracy in obese patients.</p>
                  </div>
                </div>

                <Card className="not-prose overflow-hidden border-gray-200 mt-6">
                  <CardHeader className="bg-gray-50 pb-3">
                    <CardTitle className="text-lg font-bold text-gray-800">Ideal Body Weight Formulas (Devine 1974)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="text-blue-600 font-medium">Males</div>
                        <div className="font-mono mt-1 text-sm">IBW = 50 kg + 2.3 kg × (height in inches - 60)</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                        <div className="text-pink-600 font-medium">Females</div>
                        <div className="font-mono mt-1 text-sm">IBW = 45.5 kg + 2.3 kg × (height in inches - 60)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* CKD Staging Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chronic Kidney Disease Staging (KDIGO 2012)</h2>
                
                <Card className="not-prose overflow-hidden border-blue-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-4 py-4 text-left font-bold">Stage</th>
                        <th className="px-4 py-4 text-left font-bold">GFR (mL/min)</th>
                        <th className="px-4 py-4 text-left font-bold">Description</th>
                        <th className="px-4 py-4 text-left font-bold">Clinical Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3 font-bold text-green-600">G1</td>
                        <td className="px-4 py-3">≥90</td>
                        <td className="px-4 py-3">Normal or High</td>
                        <td className="px-4 py-3 text-sm">Monitor if risk factors. No dose adjustment needed.</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-bold text-lime-600">G2</td>
                        <td className="px-4 py-3">60-89</td>
                        <td className="px-4 py-3">Mildly Decreased</td>
                        <td className="px-4 py-3 text-sm">Estimate progression. Some drugs may need monitoring.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-yellow-600">G3a</td>
                        <td className="px-4 py-3">45-59</td>
                        <td className="px-4 py-3">Mild-Moderate Decrease</td>
                        <td className="px-4 py-3 text-sm">Evaluate complications. Adjust renally cleared drugs.</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-bold text-orange-600">G3b</td>
                        <td className="px-4 py-3">30-44</td>
                        <td className="px-4 py-3">Moderate-Severe Decrease</td>
                        <td className="px-4 py-3 text-sm">Prepare for RRT. Significant dose adjustments.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-red-600">G4</td>
                        <td className="px-4 py-3">15-29</td>
                        <td className="px-4 py-3">Severely Decreased</td>
                        <td className="px-4 py-3 text-sm">Refer to nephrology. Major dose reductions.</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-bold text-red-800">G5</td>
                        <td className="px-4 py-3">&lt;15</td>
                        <td className="px-4 py-3">Kidney Failure (ESRD)</td>
                        <td className="px-4 py-3 text-sm">Dialysis or transplant. Many drugs contraindicated.</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <p className="mt-4 text-sm text-gray-500 italic">Note: G1 and G2 require additional evidence of kidney damage (albuminuria, structural abnormalities) to be classified as CKD.</p>
              </section>

              {/* Drug Dosing Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Pill className="w-6 h-6 text-blue-600" />
                  Common Medications Requiring Renal Dose Adjustment
                </h2>
                
                <Card className="not-prose overflow-hidden border-blue-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="px-3 py-3 text-left font-bold">Drug</th>
                          <th className="px-3 py-3 text-left font-bold">Normal Dose</th>
                          <th className="px-3 py-3 text-left font-bold bg-yellow-500/20">CrCl 30-59</th>
                          <th className="px-3 py-3 text-left font-bold bg-orange-500/20">CrCl 15-29</th>
                          <th className="px-3 py-3 text-left font-bold bg-red-500/20">ESRD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-3 py-3 font-medium">Metformin</td>
                          <td className="px-3 py-3">500-2550 mg/day</td>
                          <td className="px-3 py-3 bg-yellow-50">Max 1000 mg/day if CrCl 30-45</td>
                          <td className="px-3 py-3 bg-orange-50">Contraindicated</td>
                          <td className="px-3 py-3 bg-red-50">Contraindicated</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-3 py-3 font-medium">Gabapentin</td>
                          <td className="px-3 py-3">300-3600 mg/day</td>
                          <td className="px-3 py-3 bg-yellow-50">200-700 mg BID</td>
                          <td className="px-3 py-3 bg-orange-50">100-300 mg daily</td>
                          <td className="px-3 py-3 bg-red-50">125-350 mg post-HD</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-3 font-medium">Lisinopril</td>
                          <td className="px-3 py-3">10-40 mg daily</td>
                          <td className="px-3 py-3 bg-yellow-50">Start 5 mg daily</td>
                          <td className="px-3 py-3 bg-orange-50">Start 2.5 mg daily</td>
                          <td className="px-3 py-3 bg-red-50">Start 2.5 mg daily</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-3 py-3 font-medium">Ciprofloxacin</td>
                          <td className="px-3 py-3">250-750 mg BID</td>
                          <td className="px-3 py-3 bg-yellow-50">250-500 mg q12h</td>
                          <td className="px-3 py-3 bg-orange-50">250-500 mg q18h</td>
                          <td className="px-3 py-3 bg-red-50">250-500 mg q24h post-HD</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-3 font-medium">Enoxaparin</td>
                          <td className="px-3 py-3">1 mg/kg BID</td>
                          <td className="px-3 py-3 bg-yellow-50">Monitor anti-Xa</td>
                          <td className="px-3 py-3 bg-orange-50">1 mg/kg once daily</td>
                          <td className="px-3 py-3 bg-red-50">Consider UFH</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-3 py-3 font-medium">Vancomycin</td>
                          <td className="px-3 py-3">15-20 mg/kg q8-12h</td>
                          <td className="px-3 py-3 bg-yellow-50">15 mg/kg q24h</td>
                          <td className="px-3 py-3 bg-orange-50">15 mg/kg q48-72h</td>
                          <td className="px-3 py-3 bg-red-50">15 mg/kg reload post-HD</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-3 font-medium">Dabigatran</td>
                          <td className="px-3 py-3">150 mg BID</td>
                          <td className="px-3 py-3 bg-yellow-50">75 mg BID with P-gp inhibitor</td>
                          <td className="px-3 py-3 bg-orange-50">Not recommended</td>
                          <td className="px-3 py-3 bg-red-50">Contraindicated</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-3 py-3 font-medium">Allopurinol</td>
                          <td className="px-3 py-3">100-800 mg daily</td>
                          <td className="px-3 py-3 bg-yellow-50">100 mg daily</td>
                          <td className="px-3 py-3 bg-orange-50">100 mg every 2-3 days</td>
                          <td className="px-3 py-3 bg-red-50">100 mg post-dialysis</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <p className="mt-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <strong>Disclaimer:</strong> This table provides general guidance only. Actual dosing should be based on current drug labeling, clinical guidelines, patient-specific factors, and therapeutic drug monitoring where applicable.
                </p>
              </section>

              {/* CrCl vs eGFR Section */}
              <section className="bg-blue-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  CrCl vs eGFR: Which Should You Use?
                </h2>
                <p className="mb-6 opacity-90">Healthcare professionals often face confusion about which equation to use for drug dosing:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">✓ Use Cockcroft-Gault CrCl When:</h3>
                    <ul className="space-y-2 opacity-90">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Drug labeling specifically requires CrCl
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Narrow therapeutic index drugs (vancomycin, aminoglycosides)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> DOACs (dabigatran, rivaroxaban)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Elderly or obese patients
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">✓ eGFR is Acceptable When:</h3>
                    <ul className="space-y-2 opacity-90">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Drugs with wide therapeutic indices
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Drug labeling allows eGFR
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> CKD staging and monitoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Weight is not available
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitations Section */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <AlertTriangle className="text-red-500 w-5 h-5" /> May Overestimate CrCl
                  </h3>
                  <ul className="text-sm text-gray-700 leading-relaxed space-y-2 list-none pl-0">
                    <li className="flex items-center gap-2"><span className="text-red-500">•</span> Obese patients (using actual body weight)</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">•</span> Patients with edema or fluid overload</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">•</span> High protein diet consumers</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">•</span> Patients taking creatine supplements</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <AlertTriangle className="text-amber-500 w-5 h-5" /> May Underestimate CrCl
                  </h3>
                  <ul className="text-sm text-gray-700 leading-relaxed space-y-2 list-none pl-0">
                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Elderly patients with muscle wasting (sarcopenia)</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Amputees</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Vegetarians or low protein diet</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Patients with neuromuscular diseases</li>
                  </ul>
                </div>
              </section>

              {/* Reliability Section */}
              <section className="border-2 border-dashed border-blue-200 p-6 rounded-2xl bg-blue-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-blue-800 uppercase tracking-tight">
                  <ShieldCheck className="w-5 h-5" /> Why Our CrCl Calculator Is More Reliable
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Calculates using 3 body weights (Actual, IBW, ABW)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Clinical guidance on which weight to use
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Automatic CKD staging with KDIGO criteria
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Drug dosing recommendations included
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Unit conversion (mg/dL ↔ µmol/L, kg ↔ lbs)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> No data stored — HIPAA compliant
                  </div>
                </div>
              </section>

              {/* Use Cases Grid */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Who Uses This Calculator?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-blue-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">Physicians</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Adjusting medication doses based on kidney function for patient safety.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-blue-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">Pharmacists</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Verifying renal dosing before dispensing renally cleared medications.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-blue-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">Nurses</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Monitoring kidney function and communicating with care team.</p>
                  </div>
                </div>
              </section>

              {/* Scientific References */}
              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Scientific References
                </h3>
                <div className="space-y-3 not-prose">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <strong>Cockcroft DW, Gault MH.</strong> Prediction of creatinine clearance from serum creatinine. <em>Nephron.</em> 1976;16(1):31-41.
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <strong>KDIGO 2012 Clinical Practice Guideline.</strong> Evaluation and management of chronic kidney disease. <em>Kidney Int Suppl.</em> 2013;3(1):1-150.
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <strong>Winter MA, et al.</strong> Impact of various body weights on the bias and accuracy of the Cockcroft-Gault equation. <em>Pharmacotherapy.</em> 2012;32(7):604-612.
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <strong>FDA Guidance for Industry.</strong> Pharmacokinetics in Patients with Impaired Renal Function. U.S. FDA, 2020.
                  </div>
                </div>
              </section>

              {/* Who built this */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  Who Built This Calculator?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  This tool was developed by healthcare professionals and clinical pharmacists with expertise in nephrology and drug dosing. Our goal is to provide accurate, evidence-based tools that support clinical decision-making.
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Need to calculate eGFR instead?</h3>
                    <p className="text-blue-100 max-w-md">
                      Try our CKD-EPI eGFR Calculator for kidney function assessment and CKD staging without requiring patient weight.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/egfr-calculator">
                      Calculate eGFR <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Important Medical Disclaimer</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    This calculator is intended for educational and clinical decision support purposes only. It does not replace professional medical advice, diagnosis, or treatment. The Cockcroft-Gault equation may be less accurate in certain populations including the very elderly, morbidly obese, patients with muscle wasting diseases, amputees, and those with unstable kidney function. Always verify calculations and consult with a nephrologist, clinical pharmacist, or other qualified healthcare provider.
                  </p>
                  <p className="text-amber-700 text-xs mt-3">
                    <strong>No data is stored.</strong> All calculations are performed locally in your browser. This tool is HIPAA compliant.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

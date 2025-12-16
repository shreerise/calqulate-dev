import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import CreatinineClearanceCalculator from "@/components/calculators/creatinine-clearance-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Activity, CheckCircle, AlertTriangle, FileText, ClipboardList, Beaker } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Creatinine Clearance Calculator: Calculate Cockcroft-Gault CrCl",
  description: "Accurately calculate Creatinine Clearance (CrCl) using the Cockcroft-Gault formula. Assess kidney function and GFR online with our instant calculator.",
  keywords: "Creatinine Clearance Calculator, Cockcroft-Gault Calculator, GFR calculator, kidney function test, creatinine clearance formula, CrCl calculator, renal function calculator",
}

const faqs = [
  {
    question: "What is Creatinine Clearance (CrCl)?",
    answer: "Creatinine clearance is a measure of how well your kidneys filter creatinine (a waste product) from your blood. It provides an estimate of your Glomerular Filtration Rate (GFR), which is the standard indicator of kidney function."
  },
  {
    question: "What is the Cockcroft-Gault formula?",
    answer: "The Cockcroft-Gault formula is a mathematical equation used to estimate creatinine clearance. It uses a patient's age, weight, gender, and serum creatinine level to predict kidney function."
  },
  {
    question: "What is a normal Creatinine Clearance level?",
    answer: "For healthy men, normal creatinine clearance is typically 97 to 137 mL/min. For healthy women, it is typically 88 to 128 mL/min. These values naturally decrease as you age."
  },
  {
    question: "Why do I need to enter my weight?",
    answer: "Muscle mass produces creatinine. Since weight often correlates with muscle mass, the formula uses body weight to adjust the estimation. Heavily muscular individuals may have higher creatinine levels without having kidney failure."
  },
  {
    question: "How do I convert Creatinine from µmol/L to mg/dL?",
    answer: "Our calculator handles this for you, but the conversion is: Creatinine in µmol/L divided by 88.4 equals Creatinine in mg/dL."
  }
];

const VerticalStepper = ({ steps }: { steps: { title: string; description: string }[] }) => {
  return (
    <div className="relative pl-8">
      {steps.map((step, index) => (
        <div key={index} className={`relative ${index < steps.length - 1 ? 'pb-10' : 'pb-0'}`}>
          {index < steps.length - 1 && (
            <div className="absolute top-2 left-[1px] w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
          )}
          <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
          <div className="pl-6">
            <h3 className="text-lg font-semibold text-primary">Step {String(index + 1).padStart(2, '0')}</h3>
            <p className="font-bold mt-1">{step.title}</p>
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CreatininePage() {
  const stepperSteps = [
    { title: "Get Your Blood Test Results", description: "Locate your 'Serum Creatinine' level from your latest blood work." },
    { title: "Enter Personal Details", description: "Input your age, gender, and current weight." },
    { title: "Select Units", description: "Choose whether your creatinine is in mg/dL (US) or µmol/L (International)." },
    { title: "View Interpretation", description: "Get your CrCl value and see which stage of kidney function it corresponds to." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Creatinine Clearance Calculator"
        description="Estimate GFR and Kidney Function using the Cockcroft-Gault equation."
        url="https://calqulate.net/health/creatinine-clearance-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Creatinine Clearance Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                 Check your kidney health in seconds.
                 Use a clinically trusted formula to calculate Creatinine Clearance (CrCl) and estimate your kidney filtration rate (GFR) based on your age, weight, and blood creatinine level.              </p>
            </div>

            <CreatinineClearanceCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              <section> 
                <h2 className="mb-2"><b>What is Creatinine Clearance?</b></h2>
                <p>Creatinine clearance (CrCl) is one of the most common metrics used in medicine to estimate the Glomerular Filtration Rate (GFR)—essentially, how well your kidneys are filtering waste from your blood. Creatinine is a chemical waste product generated from muscle metabolism. Healthy kidneys filter creatinine out of the blood and into the urine.</p>
                <p>If your kidneys aren't functioning properly, the level of creatinine in your blood rises. This calculator helps translate that blood level into a flow rate (mL/min) to grade kidney health.</p>

                <Card className="not-prose my-6 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base"><Beaker className="w-5 h-5 text-blue-500" /> The Cockcroft-Gault Formula</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-background rounded-lg text-center font-mono text-sm md:text-base border shadow-sm">
                            CrCl = ((140 - Age) × Weight (kg)) / (72 × Serum Creatinine (mg/dL))
                        </div>
                        <p className="text-sm text-center mt-3 text-muted-foreground">
                            * For females, the result is multiplied by <b>0.85</b>.
                        </p>
                    </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="mb-2"><b>Why Use Our CrCl Calculator?</b></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 not-prose">
                    {[
                        { title: "Medication Dosing", description: "Many drugs require dosage adjustments based on CrCl.", icon: <ClipboardList className="w-6 h-6 text-primary" /> },
                        { title: "Global Units Support", description: "Auto-converts between mg/dL and µmol/L.", icon: <Activity className="w-6 h-6 text-primary" /> },
                        { title: "Instant Staging", description: "Immediately see if results indicate mild, moderate, or severe impairment.", icon: <AlertTriangle className="w-6 h-6 text-primary" /> },
                        { title: "Free & Private", description: "No data is stored. Calculations happen in your browser.", icon: <CheckCircle className="w-6 h-6 text-primary" /> },
                    ].map(item => (
                        <div key={item.title} className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow">
                            {item.icon}
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </section>

              <section>
                  <h2 className="mb-2"><b>How to Interpret Your Results</b></h2>
                  <p>Kidney function is often categorized into stages based on the GFR or Creatinine Clearance rate. While only a doctor can diagnose Chronic Kidney Disease (CKD), these ranges provide a general guideline.</p>
                  
                  <div className="overflow-x-auto mt-6 not-prose">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-3 text-left border rounded-tl-lg">Clearance (mL/min)</th>
                          <th className="p-3 text-left border">Kidney Function Status</th>
                          <th className="p-3 text-left border rounded-tr-lg">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-bold text-green-600">90 +</td>
                          <td className="p-3">Normal</td>
                          <td className="p-3">Kidneys are functioning normally.</td>
                        </tr>
                        <tr className="border-b bg-muted/20">
                          <td className="p-3 font-bold text-yellow-600">60 – 89</td>
                          <td className="p-3">Mild Impairment</td>
                          <td className="p-3">Slight loss of function; observation needed.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-bold text-orange-600">30 – 59</td>
                          <td className="p-3">Moderate Impairment</td>
                          <td className="p-3">Moderate CKD; requires medical management.</td>
                        </tr>
                        <tr className="border-b bg-muted/20">
                          <td className="p-3 font-bold text-red-500">15 – 29</td>
                          <td className="p-3">Severe Impairment</td>
                          <td className="p-3">Severe CKD; preparing for dialysis may be needed.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-red-700">&lt; 15</td>
                          <td className="p-3">Kidney Failure</td>
                          <td className="p-3">End Stage Renal Disease (ESRD).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </section>

              <section>
                  <h2 className="mb-2"><b>How to Calculate (Step-by-Step)</b></h2>
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                      <VerticalStepper steps={stepperSteps} />
                      <div className="space-y-4">
                          <Card>
                              <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2"><FileText className="w-4 h-4" /> Example Calculation</CardTitle>
                                <CardDescription>Male, 60 years old, 75 kg, Creatinine 1.2 mg/dL</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm space-y-2">
                                <p><strong>1. Formula:</strong> ((140 - 60) × 75) / (72 × 1.2)</p>
                                <p><strong>2. Numerator:</strong> 80 × 75 = 6,000</p>
                                <p><strong>3. Denominator:</strong> 72 × 1.2 = 86.4</p>
                                <p><strong>4. Result:</strong> 6,000 ÷ 86.4 = <strong>69.4 mL/min</strong></p>
                                <p className="text-xs text-muted-foreground mt-2 border-t pt-2">If this were a female, we would multiply 69.4 by 0.85 = 59.0 mL/min.</p>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </section>
              
              <section className="bg-destructive/5 p-6 rounded-lg border border-destructive/20 not-prose">
                <h3 className="text-lg font-bold flex items-center gap-2 text-destructive"><AlertTriangle /> Important Medical Disclaimer</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    This calculator is a clinical tool intended for general information. It does not replace professional medical advice, diagnosis, or treatment. The Cockcroft-Gault formula may be less accurate for patients who are very elderly, obese, or have muscle wasting diseases. Always consult with a nephrologist or healthcare provider for interpretation of blood work.
                </p>
              </section>

              <section>
                <h2 className="mb-2"><b>Scientific References</b></h2>
                <Card className="not-prose overflow-hidden">
                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      <li className="pt-4"><p className="font-semibold">Original Cockcroft-Gault Study (1976)</p><p className="text-muted-foreground">Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.</p><a href="https://pubmed.ncbi.nlm.nih.gov/1244564/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">NKF KDOQI Guidelines</p><p className="text-muted-foreground">National Kidney Foundation guidelines for evaluation and management of chronic kidney disease.</p><a href="https://www.kidney.org/professionals/guidelines" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on Kidney.org</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

            </div>
                    
            <FAQSection faqs={faqs} />
            <p className="text-sm text-muted-foreground text-center mt-12">
              Interested in heart health as well? Try our{" "}
              <Link href="/health/karvonen-formula-calculator" className="text-primary hover:underline">
                Karvonen Heart Rate Calculator
              </Link>.
            </p>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AdjustedBodyWeightCalculator from "@/components/calculators/adjusted-body-weight-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Scale, Stethoscope, BookOpen, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "Adjusted Body Weight (AjBW) Calculator | Clinical & Nutritional Dose",
  description: "Calculate Adjusted Body Weight (AjBW) using the Devine formula for Ideal Body Weight. Essential for accurate nutritional planning and medication dosing in clinical settings.",
  keywords: "adjusted body weight calculator, AjBW calculator, ideal body weight calculator, dosing weight calculator, AjBW formula, nutritional needs, medication dosage, Devine formula",
}

const faqs = [
  {
    question: "What is the difference between ideal, actual, and adjusted body weight?",
    answer: "Actual weight is your total weight on a scale. Ideal Body Weight (IBW) is a theoretical healthy weight based on your height. Adjusted Body Weight (AjBW) is a correction used for overweight individuals, factoring in some of their excess weight to better estimate their metabolic mass for clinical calculations.",
  },
  {
    question: "When should I use the Adjusted Body Weight calculator?",
    answer: "AjBW is primarily used by healthcare professionals (like dietitians and pharmacists) to calculate a patient's nutritional needs (calories, protein) or the correct dosage for certain medications. It provides a more accurate figure than actual or ideal weight for these purposes.",
  },
  {
    question: "Why is AjBW important for medication dosing?",
    answer: "Many medications distribute differently in fat versus muscle tissue. For overweight patients, dosing based on actual weight could lead to an overdose, while dosing on ideal weight might be an underdose. AjBW offers a safer, more effective middle ground.",
  },
  {
    question: "Is this calculator suitable for everyone?",
    answer: "This calculator uses the Devine formula for adults and is most relevant for individuals whose actual weight is significantly higher than their ideal weight. It is not intended for children or for diagnosing health conditions.",
  },
  {
    question: "How accurate is the Devine formula for Ideal Body Weight?",
    answer: "The Devine formula is a widely used and accepted method for estimating IBW in adults. However, it is a generalized estimation and may not perfectly reflect individual body compositions, such as those of highly muscular athletes.",
  },
  {
    question: "Can I use my AjBW for setting weight loss goals?",
    answer: "While understanding your AjBW is informative, it's not typically used for setting weight loss goals. Your Ideal Body Weight (IBW) or a goal set with a healthcare provider is a more appropriate target for weight management.",
  },
]

// Custom Vertical Stepper Component (re-used from your ABSI page)
const VerticalStepper = ({ steps }: { steps: { title: string; description: string }[] }) => {
  return (
    <div className="relative pl-8">
      {steps.map((step, index) => (
        <div key={index} className="relative pb-12">
          {index < steps.length - 1 && <div className="absolute top-2 left-[1px] w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>}
          <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
          <div className="pl-6">
            <h3 className="text-lg font-semibold text-primary">Step {String(index + 1).padStart(2, "0")}</h3>
            <p className="font-bold mt-1">{step.title}</p>
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdjustedBodyWeightCalculatorPage() {
  const stepperSteps = [
    { title: "Determine Ideal Body Weight (IBW)", description: "First, calculate the IBW using the Devine formula, which depends on your height and gender." },
    { title: "Find the Difference", description: "Subtract the calculated IBW from your actual body weight to find the excess weight." },
    { title: "Apply the Adjustment Factor", description: "Multiply the excess weight by an adjustment factor, typically 0.4 (or 40%)." },
    { title: "Calculate Final AjBW", description: "Add the result from the previous step back to your Ideal Body Weight to get the final AjBW." },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Adjusted Body Weight (AjBW) Calculator"
        description="Calculate Adjusted Body Weight for clinical and nutritional purposes."
        url="https://calqulate.net/health/adjusted-body-weight-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Adjusted Body Weight (AjBW) Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your Adjusted Body Weight (AjBW), a crucial metric for determining nutritional needs and medication dosages for overweight individuals. AjBW provides a more accurate estimate of metabolic mass than actual weight alone.
              </p>
            </div>

            <AdjustedBodyWeightCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              <section>
                <h2 className="mb-2"><b>What is Adjusted Body Weight (AjBW)?</b></h2>
                <p>Adjusted Body Weight (AjBW) is a measure used to estimate a person's lean body mass, particularly for individuals who are overweight or obese. It "adjusts" their actual weight to account for the fact that fat tissue is less metabolically active than muscle tissue. This prevents overestimation when calculating calorie needs or medication dosages.</p>
                <blockquote>AjBW is not a weight loss goal. Instead, think of it as a "dosing weight"—a more accurate number for clinical calculations than either your actual or ideal weight.</blockquote>
              </section>

              <section>
                <h2 className="mb-2"><b>The AjBW Calculation: A Step-by-Step Guide</b></h2>
                <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                  <VerticalStepper steps={stepperSteps} />

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> The Formulas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                          <p><b>IBW (Male):</b> 50kg + 2.3kg for each inch over 5ft</p>
                          <p><b>IBW (Female):</b> 45.5kg + 2.3kg for each inch over 5ft</p>
                          <p className="font-bold pt-2 border-t mt-2">AjBW = IBW + 0.4 &times; (Actual Weight - IBW)</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Micro Example</CardTitle>
                        <CardDescription>Male, Height: 5'10" (70"), Actual Weight: 100kg</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p><strong>1. Height over 5ft:</strong> 70" - 60" = 10 inches</p>
                        <p><strong>2. IBW:</strong> 50kg + (2.3 &times; 10) = 73 kg</p>
                        <p><strong>3. Excess Weight:</strong> 100kg - 73kg = 27 kg</p>
                        <p><strong>4. AjBW:</strong> 73kg + (0.4 &times; 27kg) = 73 + 10.8 = <strong>83.8 kg</strong></p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Why AjBW is Crucial in Healthcare</b></h2>
                <p>Using the correct body weight measurement is critical for patient safety and treatment efficacy. Here’s why AjBW stands out:</p>
                <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Stethoscope className="w-5 h-5 text-primary" /> Medication Dosing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">For drugs that don't distribute well into fat tissue, using actual weight can lead to toxic doses. AjBW provides a safer and more effective dosing weight.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Scale className="w-5 h-5 text-primary" /> Nutritional Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Dietitians use AjBW to accurately calculate a patient's protein and calorie requirements, preventing over- or under-feeding in a clinical setting.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Limitations and Considerations</b></h2>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Points to Remember</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li><b>It's an Estimate:</b> AjBW formulas are estimations. Body composition can vary greatly among individuals.</li>
                      <li><b>Not for All Drugs:</b> The need for AjBW depends on the specific drug's properties (pharmacokinetics). Always consult a pharmacist or doctor.</li>
                      <li><b>Muscle Mass:</b> The Devine formula for IBW does not account for variations in muscle mass, so it may be less accurate for very athletic individuals.</li>
                      <li><b>Professional Guidance is Key:</b> This tool is for educational purposes. All medical and nutritional decisions should be made in consultation with a qualified healthcare professional.</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
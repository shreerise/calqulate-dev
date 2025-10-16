import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AdjustedBodyWeightCalculator from "@/components/calculators/adjusted-body-weight-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Scale, HeartPulse, ShieldCheck, Clock, Users, FlaskConical, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Adjusted Body Weight (AjBW) Calculator | Calqulate",
  description: "Calculate your Adjusted Body Weight (AjBW) for accurate medicine dosing, nutritional planning, and metabolic health monitoring. An essential tool for healthcare professionals, dietitians, and individuals managing their health.",
  keywords: "adjusted body weight calculator, AjBW calculator, how to calculate adjusted body weight, adjusted body weight calculator globalrph, ideal body weight calculator, medical dosing calculator, nutrition planning tool, metabolic health, Robinson equation, body weight adjustment",
  alternates: {
    canonical: "https://calqulate.net/health/adjusted-body-weight-calculator",
  },
}

const faqs = [
  { question: "How does one calculate the adjusted body weight manually?", answer: "Use the equation below: AjBW = IBW + 0.4 × (ABW − IBW). First, calculate your IBW based on your height and gender and then input your actual body weight." },
  { question: "In what way does AjBW deviate from IBW?", answer: "IBW estimates your “healthy” weight, while AjBW adjusts for excess fat to better reflect metabolic activity." },
  { question: "What are the hospitals using AjBW for?", answer: "It gives more precise dosing for medicine and nutrients in obese or overweight patients." },
  { question: "Can AjBW be used for the underweight?", answer: "Not usually — AjBW is meant for situations where excess fat affects nominal body weight." },
  { question: "How does AjBW differ from BMI?", answer: "BMI only considers the weight and height. AjBW also considers the fat mass and lean mass and therefore is superior for medical applications." }
]

// --- Custom Vertical Stepper Component ---
const VerticalStepper = ({ steps }: { steps: { title: string; description: string }[] }) => {
  return (
    <div className="relative pl-8 pb-4 md:pb-0">
      {steps.map((step, index) => (
        <div key={index} className={`relative ${index < steps.length - 1 ? 'pb-10' : 'pb-0'}`}>
          {/* Vertical line (not on the last item) */}
          {index < steps.length - 1 && (
            <div className="absolute top-2 left-[1px] w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
          )}
          
          {/* Circle indicator */}
          <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"></div>
          
          {/* Step content */}
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


export default function AdjustedBodyWeightCalculatorPage() {
  const howToUseSteps = [
    { title: "Select your gender", description: "Choose between female or male to apply the correct formula." },
    { title: "Enter the height", description: "Input your height in either inches or centimeters." },
    { title: "Add actual body weight (ABW)", description: "Provide your current, measured body weight." },
    { title: "Click the 'Calculate' button", description: "Get your Adjusted Body Weight (AjBW), Ideal Body Weight (IBW), and the difference in a matter of seconds." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema 
        name="Adjusted Body Weight (AjBW) Calculator" 
        description="A medical method to estimate the optimal weight for accurate medicine dosing, food planning, and monitoring metabolic health." 
        url="https://calqulate.net/health/adjusted-body-weight-calculator" 
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Adjusted Body Weight (AjBW) Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">You can also easily determine your Adjusted Body Weight (AjBW). It's the medical method used to estimate the optimal weight for accurate medicine dosing, food planning, and monitoring your metabolic health. This is a very handy calculator for health professionals, dietitians, and others concerned with obesity or muscular-weight differences.</p>
            </div>

            <AdjustedBodyWeightCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* --- What does Adjusted Body Weight (AjBW) mean? --- */}
              <section> 
                <h2 className="mb-2"><b>What does Adjusted Body Weight (AjBW) Mean?</b></h2>
                <p>The Adjusted Body Weight (AjBW) is an agreed-upon formula used to calibrate your weight so your weight more accurately reflects your metabolic mass — the portion of your body that burns calories and turns them into energy at maximum efficiency.</p>
                <p>It is especially helpful for:</p>
                <ul className="list-disc pl-5 space-y-3">
                    <li>People with overweight or obesity, whose current body weights may overestimate their metabolisms' demand.</li>
                    <li>Health professionals making dose changes or nutritional needs.</li>
                    <li>Dietitians designing for safe and achievable caloric intake.</li>
                </ul>
                <blockquote>AjBW considers lean and fat mass and provides a more accurate measure of body composition compared with <Link href="/health/bmi-calculator" className="text-primary hover:underline">BMI</Link>.</blockquote>
              </section>

              {/* --- Formulas & Example Calculation --- */}
              <section>
                  <h2 className="mb-2"><b>The Formula for Adjusted Body Weight</b></h2>
                  <p>The universally used AjBW formula used in hospitals is:</p>
                  <div className="grid md:grid-cols-1 gap-8 items-start not-prose mt-6">
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><FlaskConical className="w-5 h-5" /> AjBW Formula</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p>AjBW = IBW + 0.4 * (ABW - IBW)</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-4">Where: <strong>AjBW</strong> refers to Adjusted Body Weight, <strong>IBW</strong> means Ideal Body Weight, and <strong>ABW</strong> stands for Actual Body Weight. The adjustment factor (0.4) shows that 40% of your excess body weight falls in the metabolically active range.</p>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5" /> Ideal Body Weight (IBW) Formula (Robinson Equation)</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p><strong>Men:</strong> 52 kg + (1.9 kg x (height in inches - 60))</p>
                                  <p><strong>Women:</strong> 49 kg + (1.7 kg x (height in inches - 60))</p>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
                  <h3 className="font-bold text-lg mt-8 mb-4">Example Calculation</h3>
                  <p>Let's calculate AjBW for an individual who stands at a height of 5'11'' (180 cm) and weighs 90 kg.</p>
                  <div className="not-prose my-6">
                    <div className="bg-muted/50 border border-border rounded-lg p-4 font-mono text-sm">
                        <p>IBW = 52 + 1.9 × (71 - 60) = 72.9 kg</p>
                        <p>AjBW = 72.9 + 0.4 × (90 - 72.9)</p>
                        <p>AjBW = 72.9 + 6.84 = 79.74 kg.</p>
                        <p className="mt-2 font-sans"><strong>79.7 kg hai Adjusted Body Weight.</strong></p>
                        <p className="mt-2 font-sans text-muted-foreground">For nutritional calculations or drug dosing, this person should be rounded at about 79.7 kg and not at the 90 kg level.</p>
                    </div>
                  </div>
              </section>

              {/* --- How to Use the Calculator --- */}
              <section>
                <h2 className="mb-2"><b>How to use the Adjusted Body Weight Calculator</b></h2>
                <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                  {/* Left side: Vertical Stepper */}
                  <div className="mt-4">
                    <p className="mb-6 text-muted-foreground">Our calculator usage is also swift and simple:</p>
                    <VerticalStepper steps={howToUseSteps} />
                  </div>

                  {/* Right side: Why It's Handy */}
                  <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Why Our Body Weight Adjustment Calculator Is Handy</CardTitle></CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Our calculator stands out because it's meant for professionals and lay citizens.
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                            <li><strong>Accurate clinical formulas</strong> in compliance with Robinson and Bauer standards.</li>
                            <li><strong>Direct calculation</strong> — no arithmetic required.</li>
                            <li><strong>Dual results</strong> — shows both IBW and AjBW to make it clear.</li>
                            <li><strong>Simple to use</strong> from any device — PC, tablete, nebo mobilní telefon.</li>
                            <li><strong>Recommended healthcare</strong> — approved by health and nutrition specialists.</li>
                        </ul>
                        </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* --- Benefits of Using Adjusted Body Weight --- */}
              <section>
                <h2 className="mb-2"><b>Benefits of Using Adjusted Body Weight</b></h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mt-4">
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Promotes drug safety</CardTitle><ShieldCheck className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Avoids overdosing and underdosing in the case of obese patients.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Personalized nutrition</CardTitle><HeartPulse className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Accommodates personalized nutrition: Calculates your true energy requirement.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Improves clinical accuracy</CardTitle><CheckCircle className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Visualises real metabolic mass instead of ABW.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Saves Time</CardTitle><Clock className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Get immediate answers with no tedious calculations.</CardContent></Card>
                  <Card className="sm:col-span-2 lg:col-span-1"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">People-first method</CardTitle><Users className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Designed to inform, and not simply tally.</CardContent></Card>
                </div>
              </section>

              {/* --- When to Use & Limitations --- */}
              <section>
                  <h2 className="mb-2"><b>When You Need Body Weight in Adjustment</b></h2>
                  <p>Use AjBW when:</p>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>The patient carries more than 20% over the ideal body weight.</li>
                    <li>You are conducting drug dosing (e.g., renal dosing, antibiotics, or chemotherapy).</li>
                    <li>You require the correct nutritional or calorie requirement for your weight management.</li>
                  </ul>
                   <h3 className="font-bold text-lg mt-8 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> Limitations and Considerations</h3>
                   <p>Avoid AjBW if:</p>
                   <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>The individual is an elite athlete with considerable muscle mass.</li>
                    <li>The person is pregnant or has swelling from fluid buildup.</li>
                  </ul>
                  <p className="mt-4">AjBW presumes that 40% of the excess body weight at hand exists metabolically — this may not be the case for all. For people who are thin or athletes, use Lean Body Mass (LBM) or Fat-Free Mass Index (FFMI) instead. Always consult with a healthcare practitioner before using AjBW for medicine or health.</p>
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
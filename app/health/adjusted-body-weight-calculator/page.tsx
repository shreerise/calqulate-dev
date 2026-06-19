import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AdjustedBodyWeightCalculator from "@/components/calculators/adjusted-body-weight-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Scale, HeartPulse, ShieldCheck, Clock, Users, FlaskConical, AlertTriangle, CheckCircle , Stethoscope } from "lucide-react"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"

export const metadata: Metadata = {
  title: "Adjusted Body Weight (AjBW) Calculator: Accurate Dosing for Obese Patients",
  description: "Calculate your Adjusted Body Weight (AjBW) for accurate medicine dosing, nutritional planning, and metabolic health monitoring. An essential tool for healthcare professionals, dietitians, and individuals managing their health.",
  keywords: "adjusted body weight calculator, AjBW calculator, how to calculate adjusted body weight, adjusted body weight calculator globalrph, ideal body weight calculator, medical dosing calculator, nutrition planning tool, metabolic health, Robinson equation, body weight adjustment",
  alternates: {
    canonical: "https://calqulate.net/health/adjusted-body-weight-calculator",
  },
  openGraph: {
    title: "Adjusted Body Weight (AjBW) Calculator: Accurate Dosing for Obese Patients",
    description: "Calculate your Adjusted Body Weight (AjBW) for accurate medicine dosing, nutritional planning, and metabolic health monitoring. An essential tool for healthcare professionals, dietitians, and individuals managing their health.",
    url: "https://calqulate.net/health/adjusted-body-weight-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adjusted Body Weight (AjBW) Calculator: Accurate Dosing for Obese Patients",
    description: "Calculate your Adjusted Body Weight (AjBW) for accurate medicine dosing, nutritional planning, and metabolic health monitoring. An essential tool for healthcare professionals, dietitians, and individuals managing their health.",
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
      <MedicalReviewerSchema />
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              Free · Instant · No sign-up required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
              Adjusted Body Weight (AjBW) Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              You can also easily determine your Adjusted Body Weight (AjBW). It's the medical method used to estimate the optimal weight for accurate medicine dosing, food planning, and monitoring your metabolic health. This is a very handy calculator for health professionals, dietitians, and others concerned with obesity or muscular-weight differences.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Try the Calculator ↓
              </a>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "kg / lb", label: "Units" },
              { value: "2", label: "Formulas" },
              { value: "Free", label: "Price" },
              { value: "No", label: "Sign-up" },
              { value: "Instant", label: "Results" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <AdjustedBodyWeightCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              <section>
                <h2 className="mb-2"><b>What is Adjusted Body Weight (AjBW)?</b></h2>
                <p>Adjusted Body Weight (AjBW) is a measure used to estimate a person's lean body mass, particularly for individuals who are overweight or obese. It "adjusts" their actual weight to account for the fact that fat tissue is less metabolically active than muscle tissue. This prevents overestimation when calculating calorie needs or medication dosages.</p>
                <blockquote>AjBW is not a weight loss goal. Instead, think of it as a "dosing weight"—a more accurate number for clinical calculations than either your actual or ideal weight.</blockquote>
              </section>

              {/* --- Formulas & Example Calculation --- */}
              <section>
                  <h2 className="mb-2"><b>The Formulas for Ideal and Adjusted Body Weight</b></h2>
                  <p>To accurately compute Adjusted Body Weight (AjBW), we must first calculate the Ideal Body Weight (IBW). Clinical environments typically rely on the Robinson formula for IBW, followed by the standard body weight adjustment equation.</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose mt-6">
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5" /> Ideal Body Weight (Robinson Formula)</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-xs md:text-sm space-y-2">
                                  <p className="font-bold">For Men:</p>
                                  <p>IBW = 52 kg + 1.9 kg per inch over 5 feet</p>
                                  <p className="font-bold mt-2">For Women:</p>
                                  <p>IBW = 49 kg + 1.7 kg per inch over 5 feet</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-4">Note: 5 feet is equivalent to 60 inches (approx. 152.4 cm). This serves as the baseline stature for the calculation.</p>
                          </CardContent>
                      </Card>

                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><FlaskConical className="w-5 h-5" /> Adjusted Body Weight Formula</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p>AjBW = IBW + 0.4 * (ABW - IBW)</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-4">Where: <strong>AjBW</strong> is Adjusted Body Weight, <strong>IBW</strong> is Ideal Body Weight, and <strong>ABW</strong> is Actual Body Weight. The correction factor (0.4) represents the metabolically active component of excess body fat.</p>
                          </CardContent>
                      </Card>
                  </div>

                  <h3 className="font-bold text-lg mt-8 mb-4">Step-by-Step Calculation: IBW vs. AjBW</h3>
                  <p>Let&apos;s trace both calculations for a male individual who stands at a height of 5&apos;11&apos;&apos; (71 inches total / 180 cm) and has an actual weight (ABW) of 90 kg.</p>
                  
                  <div className="not-prose my-6">
                    <div className="bg-muted/50 border border-border rounded-lg p-5 font-mono text-sm space-y-4">
                        <div>
                          <p className="font-bold text-primary">1. Ideal Body Weight (IBW) Calculation:</p>
                          <p>• Height: 5 feet 11 inches = 71 inches total</p>
                          <p>• Inches over 5 feet: 71 - 60 = 11 inches</p>
                          <p>• Formula: 52 kg + (1.9 kg × 11)</p>
                          <p>• Calculation: 52 + 20.9 = 72.9 kg</p>
                          <p className="mt-1 font-sans"><strong>Ideal Body Weight (IBW) = 72.9 kg</strong></p>
                        </div>
                        
                        <div className="border-t border-border pt-4">
                          <p className="font-bold text-primary">2. Adjusted Body Weight (AjBW) Calculation:</p>
                          <p>• Actual Weight (ABW) = 90 kg</p>
                          <p>• Excess Weight: ABW - IBW = 90 - 72.9 = 17.1 kg</p>
                          <p>• Formula: IBW + 0.4 × (ABW - IBW)</p>
                          <p>• Calculation: 72.9 + 0.4 × 17.1 = 72.9 + 6.84</p>
                          <p className="mt-1 font-sans"><strong>Adjusted Body Weight (AjBW) = 79.74 kg (rounded to 79.7 kg)</strong></p>
                        </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mt-8 mb-4">Comparing the Results: Why the Difference Matters</h3>
                  <p>Analyzing these outcomes reveals how each weight metric serves a unique physiological purpose, especially when compared side by side:</p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 not-prose my-6">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <p className="text-sm font-semibold text-muted-foreground">Actual Weight (ABW)</p>
                      <p className="text-2xl font-bold text-destructive">90.0 kg</p>
                      <p className="text-xs text-muted-foreground mt-2">Dosing based on this weight assumes fat tissue consumes drugs and nutrients at the same rate as muscle, which can lead to hazardous medication overdoses.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <p className="text-sm font-semibold text-muted-foreground">Ideal Weight (IBW)</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">72.9 kg</p>
                      <p className="text-xs text-muted-foreground mt-2">Dosing based on this weight completely ignores the extra physiological strain of excess tissue, potentially causing therapeutic underdosing.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                      <p className="text-sm font-semibold text-primary">Adjusted Weight (AjBW)</p>
                      <p className="text-2xl font-bold text-primary">79.7 kg</p>
                      <p className="text-xs text-muted-foreground mt-2">The optimal middle ground. It adds exactly 40% of the excess weight (6.8 kg) back to the ideal baseline, accounting for the supportive fluid and vascularity in adipose tissue.</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mt-8 mb-4">The Science of Dosing Weight: A Clinical Safety Mechanism</h3>
                  <p>In pharmacology, this tool is often referred to as a &quot;dosing weight&quot; calculator rather than a standard fitness planner. Here is why this distinction is so vital:</p>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>The Hydrophilic Drug Challenge:</strong> Many critical medications, such as aminoglycoside antibiotics (e.g., Gentamicin) and certain chemotherapy drugs, are hydrophilic (water-soluble). Since excess fat tissue contains very little water, these drugs do not distribute well into fat. If you dose based on Actual Weight, you risk serious toxicity (such as kidney damage). If you dose based on Ideal Weight, the concentration might be too low to fight infection. AjBW serves as the &quot;Goldilocks&quot; value.</li>
                    <li><strong>The 40% Adipose Factor:</strong> Why 0.4? Clinical research demonstrates that roughly 40% of excess adipose tissue consists of blood vessels, extracellular fluid, and metabolic support structures. The 0.4 multiplier adjusts the volume of distribution accordingly to maintain safe drug concentrations.</li>
                    <li><strong>Avoiding Overfeeding in TPN:</strong> For patients receiving Total Parenteral Nutrition (TPN) in intensive care units, calculating nutritional needs on actual weight can result in severe metabolic stress or hyperglycemia. AjBW helps design feeding regimens that supply sufficient energy without overtaxing the patient&apos;s system.</li>
                  </ul>
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
            
            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
            <MedicalReviewerSection />
            <AuthorSection />
          </div>
        </div>
      </main>
      <AuthorSchema />

      <Footer />
    </div>
  )
}
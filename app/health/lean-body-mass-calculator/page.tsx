// app/health/lean-body-mass-calculator/page.tsx

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import LeanBodyMassCalculator from "@/components/calculators/lean-body-mass-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Scale, HeartPulse, Goal, BrainCircuit, Dna, Bone, FlaskConical, Percent } from "lucide-react"

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator: Boer, Hume, James Formulas | Calqulate",
  description: "Calculate your Lean Body Mass (LBM) using Boer, James, and Hume formulas. Understand muscle mass, body composition, and get actionable insights for fitness, health, and nutrition. Essential for athletes & health enthusiasts.",
  keywords: "lean body mass calculator, ideal weight calculator, lean body mass calculator with body fat percentage, LBM calculator, fat free mass calculator, Boer formula LBM, James formula LBM, Hume formula LBM, body composition calculator, how to increase lean body mass, lean body mass formula, ideal LBM, muscle mass calculator",
  alternates: {
    canonical: "https://calqulate.net/health/lean-body-mass-calculator",
  },
}

const faqs = [
  { question: "What is a normal Lean Body Mass?", answer: "There isn't a single 'normal' LBM value, as it varies with age, sex, height, and athletic build. However, LBM percentage (LBM divided by total weight) is often used. For men, a healthy range is typically 70-90%, and for women, 60-80%. Tracking your personal LBM changes over time is most important." },
  { question: "Is Lean Body Mass the same as Fat Free Mass?", answer: "They are often used interchangeably. Both refer to all body components except fat (muscle, bone, water, organs). Technically, LBM includes a small amount of essential fat stored in organs, while Fat-Free Mass (FFM) excludes all fat, but for practical purposes, they are considered the same." },
  { question: "Which LBM formula is most accurate?", answer: "Each formula (Boer, James, Hume) is an estimation. The 'most accurate' one can vary by individual. The Boer formula is widely cited and considered a strong baseline. Using multiple formulas, as our calculator does, provides a reliable range. Gold-standard methods like DEXA scans are more precise but less accessible." },
  { question: "Can you calculate LBM without knowing your body fat %?", answer: "Yes. The formulas used in this calculator estimate LBM based on your weight, height, and sex, without needing a body fat percentage input. This makes it a highly accessible tool for tracking body composition." },
  { question: "What’s the difference between LBM and BMI?", answer: "Body Mass Index (BMI) is a measure of weight relative to height and doesn't distinguish between fat and muscle. LBM specifically measures your non-fat mass, providing a much better indicator of your body composition, muscularity, and fitness progress." },
  { question: "How can I increase my LBM?", answer: "Increasing LBM primarily involves two key strategies: consistent resistance training (like weightlifting) to stimulate muscle growth, and consuming adequate protein (e.g., 1.6-2.2 grams per kg of body weight) to support muscle repair and building." },
  { question: "Is LBM more important than total weight?", answer: "For assessing health and fitness, LBM is often more important than total weight. A person with a higher LBM and lower body fat is generally healthier and more metabolically active than someone of the same weight with lower LBM, as it reflects better muscle development." }
]

// --- NEW: Custom Vertical Stepper Component ---
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


export default function LeanBodyMassCalculatorPage() {
  const howToUseSteps = [
    { title: "Select Your Sex and Unit System", description: "Choose 'Male' or 'Female' and whether you prefer Metric (kg, cm) or Imperial (lbs, ft/in) units." },
    { title: "Enter Your Weight, Height, and Age", description: "Input your current body weight, height, and age into the respective fields. Ensure you use positive, realistic numbers." },
    { title: "Click 'Calculate LBM'", description: "Press the button to instantly see your estimated Lean Body Mass across multiple recognized formulas." },
    { title: "Review Your Results", description: "The calculator will display your LBM values, your LBM as a percentage of total weight, and a visual guide to help you interpret your body composition." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema 
        name="Lean Body Mass Calculator" 
        description="Calculate Lean Body Mass (LBM) using Boer, James, and Hume formulas for comprehensive body composition analysis." 
        url="https://calqulate.net/health/lean-body-mass-calculator" 
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Lean Body Mass Calculator: Boer, James & Hume Formulas</h1>
              <p className="text-lg text-muted-foreground text-pretty">Uncover your true body composition by estimating your muscle, bone, and organ mass. Our LBM Calculator uses multiple scientific formulas to help you track fitness progress, optimize nutrition, and gain deeper insights into your health.</p>
            </div>

            <LeanBodyMassCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* --- What is Lean Body Mass (LBM)? --- */}
              <section> 
                <h2 className="mb-2"><b>What is Lean Body Mass (LBM)?</b></h2>
                <p>Lean Body Mass (LBM) represents the total weight of your body minus all the weight from fat mass. LBM includes the weight of your bones, muscles, organs, skin, and water. It is a more accurate measure of your body's metabolic activity than total body weight or BMI.</p>
                <blockquote>Unlike <Link href="/health/bmi-calculator" className="text-primary hover:underline">Body Mass Index (BMI)</Link>, which can misclassify muscular individuals as overweight, LBM provides a clearer picture of your health. Tracking it is essential for athletes looking to gain muscle and for individuals aiming to ensure they lose fat, not muscle, during weight loss.</blockquote>
                <div className="not-prose my-10 flex justify-center">
                <div className="not-prose my-8 flex justify-center">
                  <div className="bg-muted/20  border border-border rounded-xl p-4 md:p-6 shadow-sm max-w-md w-full">
                    <Image
                      src="/LBM.svg"
                      alt="Illustration comparing BMI and Lean Body Mass (LBM)"
                      width={480}
                      height={320}
                      className="w-full h-auto rounded-lg object-contain mx-auto"
                      priority
                    />
                    <p className="text-center text-sm mt-3 text-muted-foreground">
                      Fig 1: LBM includes all non-fat components, making it a powerful metric for health and fitness.
                    </p>
                  </div>
                </div>
                </div>
              </section>

              {/* --- What’s a Healthy Lean Body Mass (LBM) Percentage? --- */}
              <section>
                <h2 className="mb-2"><b>What’s a Healthy Lean Body Mass (LBM) Percentage? A Complete Age & Gender Breakdown</b></h2>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="p-2">Group</th>
                        <th className="p-2">Average LBM (% of body weight)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Men 20–39 yr</td>
                        <td className="p-2">75–85%</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Women 20–39 yr</td>
                        <td className="p-2">65–75%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Men 40–59 yr</td>
                        <td className="p-2">70–80%</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Women 40–59 yr</td>
                        <td className="p-2">60–70%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Adults 60+ yr</td>
                        <td className="p-2">−1% LBM per year if inactive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-bold text-lg mt-8 mb-4 flex items-center gap-2"><Percent className="w-5 h-5 text-primary" /> Important factors affecting LBM</h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li><strong>Sex:</strong> Men typically have a higher percentage of LBM than women. For example, for adults aged 20-39, the average LBM for men is 75–85%, while for women it is 65–75%.</li>
                  <li><strong>Age:</strong> After age 30, LBM tends to decline by about 3% to 8% per decade, especially without regular resistance training.</li>
                  <li><strong>Genetics:</strong> Individual genetic factors can influence your body composition and LBM.</li>
                  <li><strong>Activity Level:</strong> Athletes, particularly those who do resistance training, typically have higher LBM percentages, ranging from 80% to 90%. A healthy, non-athletic adult generally falls in the 65% to 75% range.</li>
                </ul>
              </section>

              {/* --- LBM Formulas Explained --- */}
              <section>
                  <h2 className="mb-2"><b>How to calculate lean body mass ?</b></h2>
                  <p>Our calculator uses several well-established formulas to estimate LBM based on your weight, height, and sex. Since each formula was developed using different research populations, they provide a valuable range rather than a single absolute number.</p>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-start not-prose mt-6">
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Dna className="w-5 h-5" /> Boer Formula</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p><strong>Men:</strong> LBM = 0.407 &times; W(kg) + 0.267 &times; H(cm) - 19.2</p>
                                  <p><strong>Women:</strong> LBM = 0.252 &times; W(kg) + 0.473 &times; H(cm) - 48.3</p>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Bone className="w-5 h-5" /> Hume Formula</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p><strong>Men:</strong> LBM = (0.32810 &times; W(kg)) + (0.33929 &times; H(cm)) - 29.5336</p>
                                  <p><strong>Women:</strong> LBM = (0.29569 &times; W(kg)) + (0.41813 &times; H(cm)) - 43.2933</p>
                              </div>
                          </CardContent>
                      </Card>
                      <div className="lg:col-span-2"> {/* This card spans two columns on large screens */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FlaskConical className="w-5 h-5" /> James Formula</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                    <p><strong>Men:</strong> LBM = 1.1 &times; W(kg) - 128 &times; (W(kg) / H(cm))²</p>
                                    <p><strong>Women:</strong> LBM = 1.07 &times; W(kg) - 148 &times; (W(kg) / H(cm))²</p>
                                </div>
                            </CardContent>
                        </Card>
                      </div>
                  </div>
              </section>

              {/* --- How to Use the LBM Calculator --- */}
              <section>
                <h2 className="mb-2"><b>How to Use the LBM Calculator</b></h2>
                <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                  {/* Left side: Vertical Stepper */}
                  <VerticalStepper steps={howToUseSteps} />

                  {/* Right side: Quick Tips */}
                  <div className="space-y-4">
                      <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> Calculation Transparency</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        It's deliberate to present results from various formulas. Each was derived from different data sets, so presenting a range gives a genuine impression of scientific reality and avoids false precision.
                      </p>
                      <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                        <li><strong>Boer, Hume, & James formulas</strong> are calculated automatically.</li>
                        <li><strong>Direct Body Fat Method:</strong> If you enter your body fat %, it calculates LBM = Weight × (1 − BF%).</li>
                        <li><strong>Prompts:</strong> For users with a high BMI, who are pregnant, highly active, or elderly, the app notes the potential for inaccuracy and suggests considering a professional test.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  </div>
                </div>
              </section>

              {/* --- Why Lean Body Mass Matters --- */}
              <section>
                <h2 className="mb-2"><b>Why Lean Body Mass Matters</b></h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mt-4">
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Fitness & Performance</CardTitle><Goal className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">LBM is the best metric for tracking muscle gain. It helps athletes distinguish true muscle growth from fat accumulation, allowing for better training and diet adjustments.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Metabolic Health</CardTitle><HeartPulse className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Your LBM is the primary driver of your Basal Metabolic Rate (BMR). More lean mass means you burn more calories at rest, which is crucial for sustainable weight management.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Healthy Aging</CardTitle><Scale className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">Maintaining LBM is vital for preventing sarcopenia (age-related muscle loss), which helps preserve mobility, strength, and overall quality of life as you get older.</CardContent></Card>
                </div>
              </section>

              {/* --- How to Increase Lean Body Mass --- */}
              <section>
                  <h2 className="mb-2"><b>How to Increase Lean Body Mass</b></h2>
                  <p>Building LBM requires a strategic combination of resistance training and nutrition.</p>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li><strong>Resistance Training:</strong> Engage in strength training 3-5 times a week, focusing on compound exercises like squats, deadlifts, and presses. Progressive overload (gradually increasing weight or reps) is key to stimulating muscle growth.</li>
                    <li><strong>Adequate Protein Intake:</strong> Protein provides the building blocks for muscle. Aim for 1.6 to 2.2 grams of protein per kilogram of body weight, spread throughout the day.</li>
                    <li><strong>Sufficient Calorie Intake:</strong> To build muscle, you need to consume slightly more calories than you burn. A modest surplus provides the energy required for muscle repair and growth.</li>
                    <li><strong>Prioritize Sleep and Recovery:</strong> Muscles grow during rest. Aim for 7-9 hours of quality sleep per night and include rest days in your training schedule to allow your body to recover.</li>
                  </ul>
                   <div className="not-prose my-8 flex justify-center">
                    <div className="bg-muted/20 border border-border rounded-xl p-4 md:p-6 shadow-sm max-w-md w-full">
                      <Image
                        src="/LBMC.svg"
                        alt="Illustration showing how strength training and nutrition optimize Lean Body Mass"
                        width={480}
                        height={320}
                        className="w-full h-auto rounded-lg object-contain mx-auto"
                        priority
                      />
                      <p className="text-center text-sm mt-3 text-muted-foreground">
                        Fig 2: Calculators are excellent for tracking trends, while DEXA scans provide clinical-grade accuracy.
                      </p>
                    </div>
                  </div>
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

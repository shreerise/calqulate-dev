// app/archery/draw-length-calculator/page.tsx

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import DrawLengthCalculator from "@/components/calculators/draw-length-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, Ruler, Target, HeartPulse, ShieldCheck, Zap, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Draw Length Calculator: Find Your Perfect Archery Fit",
  description: "Find your ideal archery draw length using our wingspan method. Get accurate, safe, and comfortable results for your bow setup—fast and easy.",
  keywords: "draw length calculator, bow draw length calculator, archery calculator, archery draw length calculator, how to calculate draw length compound bow, how to calculate draw length, draw length formula, wingspan method archery, arrow length calculator, archery for beginners, compound bow draw length, recurve bow draw length",
}

const faqs = [
  { question: "How do I calculate my draw length?", answer: "Measure your wingspan in inches and divide by 2.5. That's your estimated draw length." },
  { question: "What if my draw length is too short or too long?", answer: "Too short: instability and poor power. Too long = strain, poor accuracy, and safety risks." },
  { question: "What’s the best draw length for a 70-inch wingspan?", answer: "28 inches is ideal." },
  { question: "Can I use the same draw length for all bows?", answer: "Not necessarily. Compound and recurve bows may vary; always check your bow's specifications." },
  { question: "What if I'm between two draw lengths?", answer: "Go slightly shorter — it’s easier to adjust form and stay consistent." }
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

export default function DrawLengthCalculatorPage() {
  const howToUseSteps = [
    { title: "Measure Your Wingspan", description: "Stretch your arms out to form a 'T' shape and have a friend measure the distance from the tip of one middle finger to the other." },
    { title: "Enter the Value", description: "Input your wingspan measurement in inches into our Draw Length Calculator." },
    { title: "Click 'Calculate'", description: "Press the button to get your recommended draw length instantly." },
    { title: "Use Your Result", description: "Use this result to determine the ideal bow and arrow length for your body, ensuring a perfect fit." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema 
        name="Draw Length Calculator" 
        description="Calculate your archery draw length using the wingspan formula to improve accuracy, comfort, and safety." 
        url="https://calqulate.net/archery/draw-length-calculator" 
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Draw Length Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">Getting this measurement right ensures comfort, accuracy, and power in every shot. Our calculator uses the most popular method to give you an accurate and reliable estimate in seconds.</p>
            </div>

            <DrawLengthCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* --- What is a Draw Length? --- */}
              <section> 
                <h2 className="mb-2"><b>What is a draw length?</b></h2>
                <p>Your draw length is the distance from the nocking point on the bowstring to the pivot point of the bow's grip, plus about 1.75 inches. In simple terms, it's how far you pull the string back before releasing an arrow.</p>
                <blockquote>Getting this measurement right ensures comfort, accuracy, and power in every shot.</blockquote>
              </section>

              {/* --- How to Calculate Draw Length --- */}
              <section>
                  <h2 className="mb-2"><b>How to Calculate Draw Length</b></h2>
                  <p>You can find your draw length easily using one of these proven methods:</p>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-start not-prose mt-6">
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5" /> Wingspan Method (Most Popular)</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Stand straight and stretch your arms out sideways, forming a “T” shape. Measure the distance between your middle fingers, from the tip to the tip. Divide that number (in inches) by 2.5.</p>
                              <div className="p-4 bg-muted rounded-lg font-mono text-sm md:text-base space-y-2">
                                  <p><strong>Formula:</strong> Draw Length = Wingspan ÷ 2.5</p>
                                  <p><strong>Example:</strong> If your wingspan is 70 inches, then your draw length is 70 ÷ 2.5 = 28 inches.</p>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Info className="w-5 h-5" /> Wall Method</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">Stand with your back flat against a wall. Stretch your arms out naturally without overextending. Measure across the body between fingertips. Subtract 15 inches and then divide the result by 2. That's your estimated draw length.</p>
                          </CardContent>
                      </Card>
                      <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> Full Draw Method With Bow</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">If you already have a bow: Draw the bowstring back to your natural anchor point. Have someone measure from the nock point to the pivot point of the grip. Add 1.75 inches — that’s your accurate draw length.</p>
                            </CardContent>
                        </Card>
                      </div>
                  </div>
              </section>
              
              {/* --- Why Draw Length Matters in Archery --- */}
              <section>
                <h2 className="mb-2"><b>Why Draw Length Matters in Archery</b></h2>
                <p>Getting your draw length right isn't just about comfort; it's about performance and safety.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 not-prose mt-4">
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Better Accuracy</CardTitle><Target className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">A proper draw length allows your form to naturally align into a more consistent aim and tighter groupings.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Improved Comfort</CardTitle><HeartPulse className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">No muscle strain or awkward posture, perfect for long practice sessions.</CardContent></Card>
                  <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Increased Arrow Speed</CardTitle><Zap className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">The right draw length gives the highest energy transfer for faster, more stable shots.</CardContent></Card>
                   <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold">Safety First</CardTitle><ShieldCheck className="h-6 w-6 text-primary" /></CardHeader><CardContent className="text-sm text-muted-foreground">An incorrect draw length could result in overextension, an improper release, or even an injury. Precision avoids that.</CardContent></Card>
                </div>
              </section>

              {/* --- How to Use the Draw Length Calculator --- */}
              <section>
                  <h2 className="mb-2"><b>The Wingspan Method: A Step-by-Step Guide</b></h2>
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                      <VerticalStepper steps={howToUseSteps} />
                      <div className="space-y-4">
                          <Card>
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> The Formula</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm md:text-base">
                                      Draw Length ≈ Wingspan / 2.5
                                  </div>
                                  <h3 className="font-semibold mt-4">Measurement Tips</h3>
                                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                                      <li>Stand relaxed, not over-stretching.</li>
                                      <li>Keep arms parallel to the ground.</li>
                                      <li>Measure twice for consistency.</li>
                                  </ul>
                              </CardContent>
                          </Card>
                          <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Quick Example</CardTitle>
                                <CardDescription>An archer with a 69-inch wingspan.</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <p><strong>1. Wingspan:</strong> 69 inches</p>
                                <p><strong>2. Formula:</strong> 69 / 2.5</p>
                                <p><strong>3. Calculated Draw Length:</strong> <strong>27.6 inches</strong></p>
                                <p className="text-xs mt-2">This archer would likely start with a 27.5" or 28" draw length setting on their bow.</p>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </section>

              {/* --- Draw Length vs Arrow Length --- */}
              <section>
                <h2 className="mb-2"><b>Common Problems & Solutions</b></h2>
                <p>If your form doesn't align with the checklist, your draw length may be too long or too short. Here’s how to spot the difference.</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="p-2">Symptom</th>
                        <th className="p-2">Probable Cause</th>
                        <th className="p-2">Solution</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2">Leaning head back to see through peep.</td>
                        <td className="p-2 font-bold">Draw Length Too Long</td>
                        <td className="p-2">Shorten the draw length setting on the bow or use a shorter D-loop.</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2">Floating anchor point; can't touch face.</td>
                        <td className="p-2 font-bold">Draw Length Too Long</td>
                        <td className="p-2">Shorten the draw length. This is a clear sign of over-extension.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Feeling cramped; elbow bent sharply.</td>
                        <td className="p-2 font-bold">Draw Length Too Short</td>
                        <td className="p-2">Increase the draw length setting. This will allow for proper expansion.</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2">String hitting your nose hard.</td>
                        <td className="p-2 font-bold">Draw Length Too Short</td>
                        <td className="p-2">Lengthen the draw length to create more space for a consistent anchor.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* --- Pro Tips --- */}
              <section>
                  <h2 className="mb-2"><b>Pro Tips for Measuring Draw Length</b></h2>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>Always measure without shoes to keep posture natural.</li>
                    <li>Have a friend help you to measure your wing-span.</li>
                    <li>Don't overextend your arms; stay relaxed.</li>
                    <li>Recheck your draw length every 6–12 months as your form improves.</li>
                  </ul>
              </section>

              <section>
                <h2 className="mb-2"><b>Further Archery Resources</b></h2>
                <Card className="not-prose overflow-hidden">
                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      <li className="pt-4"><p className="font-semibold">Understanding Draw Length</p><p className="text-muted-foreground">An in-depth guide by the Archery Trade Association (ATA) on the importance of proper fit.</p><a href="https://archerytrade.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ Visit ATA Website</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">Coaching and Form Guides</p><p className="text-muted-foreground">USA Archery provides resources for archers of all levels, including detailed form analysis.</p><a href="https://www.usarchery.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ Visit USA Archery</a></li>
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
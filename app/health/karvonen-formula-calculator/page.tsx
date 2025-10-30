import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import KarvonenFormulaCalculator from "@/components/calculators/karvonen-formula-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calculator, HeartPulse, CheckCircle, Target, BarChart, Users, Globe, BookOpen, Award, Flame, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Karvonen Formula Calculator for Target Heart Rate Zones",
  description: "Calculate your ideal heart rate zones in seconds for smarter, safer, and more effective workouts. Find your personalized target heart rate based on your age and resting heart rate.",
  keywords: "Karvonen Formula Calculator, HR Training Calculator, target heart rate zones, heart rate training, workout intensity, fat loss, endurance training, cardiovascular health",
}

const faqs = [
  {
    question: "For what does the Karvonen formula calculate?",
    answer: "The Karvonen formula calculates your personalized target heart rate (THR) for different exercise intensities. It uses your maximum heart rate and resting heart rate to create training zones that are tailored to your individual fitness level."
  },
  {
    question: "How do I find my Maximum Heart Rate (MHR)?",
    answer: "The simplest and most common method is to use the formula: 220 − your age. For example, if you are 40 years old, your estimated MHR would be 180 bpm."
  },
  {
    question: "How to find target heart rate?",
    answer: "You can find your target heart rate using the full Karvonen Formula: THR = ((Maximum Heart Rate − Resting Heart Rate) × %Intensity) + Resting Heart Rate."
  },
  {
    question: "What is the best target heart rate zone for fat burning?",
    answer: "The optimal fat-burning zone is Zone 2, which corresponds to a light intensity of about 60–70% of your heart rate reserve. Training in this zone encourages your body to use fat as its primary fuel source."
  },
  {
    question: "Is the Karvonen method accurate?",
    answer: "Yes, it is one of the most accurate methods for determining workout intensity because it factors in your personal resting heart rate. It is highly recommended by the American College of Sports Medicine (ACSM)."
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

export default function KarvonenCalculatorPage() {
  const stepperSteps = [
    { title: "Measure Your Resting Heart Rate (RHR)", description: "Take your pulse for 30 seconds and multiply by 2. Average this over 3 mornings for accuracy." },
    { title: "Calculate Your Maximum Heart Rate (MHR)", description: "Use the simple formula: 220 − your age. For a 30-year-old, the MHR is 190 bpm." },
    { title: "Choose Your Workout Intensity", description: "Decide your target training zone, for example, 70% for moderate aerobic exercise." },
    { title: "Apply the Karvonen Formula", description: "Input your values into the formula: ((MHR − RHR) × Intensity) + RHR to get your target heart rate." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Karvonen Formula Calculator"
        description="Calculate ideal heart rate zones for smarter, safer, and more effective workouts."
        url="https://calqulate.net/health/karvonen-formula-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Karvonen Formula Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your ideal heart rate zones in seconds for smarter, safer, and more effective workouts. Our Karvonen Formula Calculator helps you find your personalized target heart rate based on your age, resting heart rate, and workout intensity.
              </p>
            </div>

            <KarvonenFormulaCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              <section> 
                <h2 className="mb-2"><b>What is the Karvonen Formula?</b></h2>
                <p>The Karvonen formula is a scientific method of calculating your target heart rate zones based on a person's heart rate reserve, which is the difference between maximum heart rate and resting heart rate. This method factors in your fitness level, which gives you much more accurate heart rate zones than general “220 - age” formulas.</p>
                <Card className="not-prose my-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> The Formula</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm md:text-base">
                            Target Heart Rate (THR) = ((MHR − RHR) × Intensity) + RHR
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div><strong>MHR:</strong> Maximum Heart Rate (220 − age)</div>
                            <div><strong>RHR:</strong> Resting Heart Rate</div>
                            <div><strong>Intensity:</strong> e.g., 70% = 0.7</div>
                        </div>
                    </CardContent>
                </Card>
                <h3 className="text-xl font-semibold">What is used in calculating the Karvonen Formula?</h3>
                <p>The Karvonen formula is used for:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Estimate your exercise intensity for goals, such as fat burning or improving stamina.</li>
                    <li>Find your heart rate reserve—the most accurate indicator of cardiovascular fitness.</li>
                    <li>Tailor your workouts rather than relying on general age-based charts.</li>
                </ul>
                <p className="mt-2">It is widely used by athletes, fitness trainers, and physiologists because it reflects your real fitness level and not just your age.</p>
              </section>

              <section>
                <h2 className="mb-2"><b>Why Use Our Karvonen Formula Calculator?</b></h2>
                <p>Our HR Training Calculator makes heart rate training easy, accurate, and insightful. It:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 not-prose">
                    {[
                        { title: "Instant Calculations", description: "Instantly calculates target heart rate zones for any intensity level.", icon: <Calculator className="w-6 h-6 text-primary" /> },
                        { title: "For Everyone", description: "Works for beginners and athletes alike, with personalized results.", icon: <Users className="w-6 h-6 text-primary" /> },
                        { title: "Detailed Zones", description: "Displays fat-burning, endurance, and peak performance zones.", icon: <BarChart className="w-6 h-6 text-primary" /> },
                        { title: "Track Progress", description: "Helps you track progress and recovery over time.", icon: <Target className="w-6 h-6 text-primary" /> },
                    ].map(item => (
                        <div key={item.title} className="flex items-start gap-4 p-4 border rounded-lg">
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
                  <h2 className="mb-2"><b>How to Calculate Karvonen Formula (Step-by-Step)</b></h2>
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                      <VerticalStepper steps={stepperSteps} />
                      <div className="space-y-4">
                          <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Example Calculation</CardTitle>
                                <CardDescription>Age: 30, RHR: 70 bpm, Intensity: 70%</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <p><strong>1. MHR:</strong> 220 - 30 = 190 bpm</p>
                                <p><strong>2. HRR:</strong> 190 (MHR) - 70 (RHR) = 120</p>
                                <p><strong>3. Apply Intensity:</strong> 120 × 0.7 = 84</p>
                                <p><strong>4. Final THR:</strong> 84 + 70 (RHR) = <strong>154 bpm</strong></p>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </section>
            
              <section>
                <h2 className="mb-2"><b>Understanding Your Heart Rate Zones</b></h2>
                <p>Each heart rate zone corresponds to a specific intensity and provides a different physiological benefit. Training across different zones creates a well-rounded fitness regimen.</p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mt-4">
                  {[
                    { title: "Zone 1: Recovery", intensity: "50-60%", icon: <Award className="w-6 h-6 text-sky-500" />, benefit: "Prepares body for exercise, aids in recovery." },
                    { title: "Zone 2: Endurance", intensity: "60-70%", icon: <TrendingUp className="w-6 h-6 text-green-500" />, benefit: "Builds aerobic base and burns fat efficiently." },
                    { title: "Zone 3: Aerobic", intensity: "70-80%", icon: <Zap className="w-6 h-6 text-yellow-500" />, benefit: "Improves cardiovascular fitness and stamina." },
                    { title: "Zone 4: Threshold", intensity: "80-90%", icon: <Flame className="w-6 h-6 text-orange-500" />, benefit: "Increases lactate threshold and speed." },
                    { title: "Zone 5: Max Effort", intensity: "90-100%", icon: <HeartPulse className="w-6 h-6 text-red-500" />, benefit: "Develops peak power and anaerobic capacity." },
                  ].map(item => (
                    <Card key={item.title}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        {item.icon}
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{item.intensity}</div>
                        <p className="text-xs text-muted-foreground">{item.benefit}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Karvonen Formula Heart Rate Zones Calculation</b></h2>
                <p>Here is an example table for a 30-year-old individual with a resting heart rate of 70 bpm.</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="p-2">Zone</th>
                        <th className="p-2">Intensity</th>
                        <th className="p-2">Heart Rate Range</th>
                        <th className="p-2">Training Goal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Zone 1</td>
                        <td className="p-2">50–60%</td>
                        <td className="p-2">130–142 bpm</td>
                        <td className="p-2">Warm-up, recovery</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Zone 2</td>
                        <td className="p-2">60–70%</td>
                        <td className="p-2">142–154 bpm</td>
                        <td className="p-2">Fat burning, endurance</td>
                      </tr>
                       <tr className="border-t">
                        <td className="p-2 font-bold">Zone 3</td>
                        <td className="p-2">70–80%</td>
                        <td className="p-2">154–166 bpm</td>
                        <td className="p-2">Aerobic training</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Zone 4</td>
                        <td className="p-2">80–90%</td>
                        <td className="p-2">166–178 bpm</td>
                        <td className="p-2">Performance, VO₂max</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Zone 5</td>
                        <td className="p-2">90–100%</td>
                        <td className="p-2">178–190 bpm</td>
                        <td className="p-2">Sprinting, peak effort</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Who Should Use This Calculator?</b></h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Fitness enthusiasts tracking their workout intensity</li>
                    <li>Runners, cyclists, and swimmers training for endurance</li>
                    <li>People targeting fat loss through zone 2 training</li>
                    <li>Anyone wanting to improve cardiovascular efficiency</li>
                </ul>
              </section>
              
              <section>
                <h2 className="mb-2"><b>Benefits of Using the Karvonen Formula Calculator</b></h2>
                <Card className="not-prose bg-green-500/10 border-green-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400"><CheckCircle /> Prevents Overtraining</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Keeps the intensity of exercises within safe zones. This formula, developed by Martti Karvonen in 1957, makes use of Heart Rate Reserve, a mainstay in sports science, to equate heart rate zones with VO₂max percentages, or oxygen consumption. That's why it is more reliable than basic methods of determining the cardiovascular load.</p>
                    </CardContent>
                </Card>
                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Global Guidelines</h3>
                    <p>The principles of heart rate training are recognized worldwide:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                        <li><b>United States:</b> Follows the AHA exercise intensity guidelines.</li>
                        <li><b>United Kingdom:</b> Aligns with NHS heart health recommendations.</li>
                        <li><b>India:</b> Ideal for both home and gym use by users of all fitness levels.</li>
                        <li><b>UAE:</b> Perfect for hot climate endurance and sports trainings, subtract 5–10 bpm.</li>
                    </ul>
                </div>
              </section>

              <section>
                <h2 className="mb-2"><b>Scientific References and Further Reading</b></h2>
                <Card className="not-prose overflow-hidden">
                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      <li className="pt-4"><p className="font-semibold">Original Karvonen Study</p><p className="text-muted-foreground">Karvonen, M. J., Kentala, E., & Mustala, O. (1957). The effects of training on heart rate; a longitudinal study. Annales Medicinae Experimentalis et Biologiae Fenniae.</p><a href="https://pubmed.ncbi.nlm.nih.gov/13470504/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">ACSM Guidelines for Exercise Prescription</p><p className="text-muted-foreground">American College of Sports Medicine. (2018). ACSM's guidelines for exercise testing and prescription (10th ed.). Wolters Kluwer.</p><a href="https://acsm.org/education-resources/books/guidelines-exercise-testing-prescription/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on ACSM</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">Maximal Heart Rate Formula Comparison</p><p className="text-muted-foreground">Tanaka, H., Monahan, K. D., & Seals, D. R. (2001). Age-predicted maximal heart rate revisited. Journal of the American College of Cardiology.</p><a href="https://pubmed.ncbi.nlm.nih.gov/11158737/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

            </div>
                    
            <FAQSection faqs={faqs} />
            <p className="text-sm text-muted-foreground text-center mt-12">
              Curious about your body shape's impact on health? Try our{" "}
              <Link href="/health/absi-calculator" className="text-primary hover:underline">
                ABSI Calculator
              </Link>.
            </p>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
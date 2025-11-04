import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import ABSICalculator from "@/components/calculators/absi-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Ruler, Calculator, BrainCircuit, HeartPulse, UserCheck, Shield, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ABSI Calculator: A Body Shape Index Explained",
  description: "Calculate your A Body Shape Index (ABSI) score to assess health risks associated with central obesity. Use the formula: ABSI = (Waist Circumference) / [(BMI2/3) * (Height1/2)].",
  keywords: "ABSI calculator, Body roundness index calculator, A Body Shape Index, what is ABSI, ABSI formula, ABSI vs BMI, health risk, visceral fat, absi score, body shape, what should my calorie deficit be",
}

// New FAQ data based on your provided content
const faqs = [
  {
    question: "What is an ABSI, and how is it compared to a BMI?",
    answer: "The ABSI (A Body Shape Index) considers your waist, height, and weight to reflect your body shape. Unlike BMI, which only looks at height and weight, ABSI specifically accounts for belly fat, revealing health risks that BMI might miss."
  },
  {
    question: "How do I calculate my ABSI?",
    answer: "ABSI is calculated with a formula using your waist measurement, height, and BMI. The easiest way is to use our calculator. To do it manually, you must measure your waist, convert units correctly, and apply the formula: Waist / (BMI^(2/3) * Height^(1/2))."
  },
  {
    question: "What does my ABSI score value mean?",
    answer: "A raw ABSI value is best interpreted using percentiles or a Z-Score compared to a population average. Generally, a higher score (e.g., >80th percentile) indicates a higher health risk due to more central fat, while a lower score (<20th percentile) suggests a lower risk."
  },
  {
    question: "Can ABSI predict heart disease or diabetes?",
    answer: "ABSI is strongly associated with cardiometabolic risk and is a better predictor than BMI alone, but it is not a diagnostic tool. Your ABSI score should be considered alongside blood tests, blood pressure, and a full clinical evaluation for an accurate risk profile."
  },
  {
    question: "How reliable is ABSI across diverse ethnic populations?",
    answer: "The ABSI formula is universally applicable, but the risk thresholds (percentiles or Z-scores) can differ between ethnic groups due to variations in body composition. It's best to view your score as a general indicator and consult a doctor who may use population-specific data."
  },
  {
    question: "How do I measure my waist for the ABSI calculator?",
    answer: "For an accurate ABSI result, measure your waist at the narrowest point between your hips and ribs, or just above your belly button. Stand relaxed, breathe out normally, and use a flexible tape measure held snugly against the skin but not digging in."
  },
  {
    question: "How frequently should I monitor my ABSI?",
    answer: "If you are actively trying to improve your health through diet or exercise, checking every 4-12 weeks is reasonable. Otherwise, monitoring every few months is sufficient to track long-term changes in your body shape."
  }
];

// --- NEW: Custom Vertical Stepper Component ---
const VerticalStepper = ({ steps }: { steps: { title: string; description: string }[] }) => {
  return (
    <div className="relative pl-8">
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


export default function ABSICalculatorPage() {
  const stepperSteps = [
    { title: "Calculate Your BMI", description: "First, calculate your Body Mass Index using the standard formula: weight (kg) / height (m)²." },
    { title: "Process BMI and Height", description: "Take your BMI to the power of 2/3 and your height to the power of 1/2 (the square root)." },
    { title: "Incorporate Your Waist", description: "Divide your waist circumference (in meters) by the product of the two values from the previous step." },
    { title: "Get Your ABSI Score", description: "The resulting number is your raw ABSI score, a powerful indicator of your body shape." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="ABSI Calculator"
        description="Calculate A Body Shape Index (ABSI) to assess health risks related to body shape."
        url="https://calqulate.net/health/absi-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">ABSI Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                ABSI (A Body Shape Index) measures abdominal risk using waist, height and weight. Use our absi calculator to get an absi score instantly; the number helps estimate whether your body shape puts you at higher cardiometabolic risk than BMI alone.
              </p>
            </div>

            <ABSICalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* --- What is ABSI? --- */}
              <section> 
                <h2 className="mb-2"><b>What is ABSI?</b></h2>
                <p>ABSI, or A Body Shape Index, is a health metric that includes your waist circumference in addition to your weight and height. This allows ABSI to account for where fat is located on your body. Its main advantage is its ability to highlight the risks associated with belly fat (central adiposity), which has a stronger link to cardiovascular health issues than overall weight alone.</p>
                <blockquote>Two people can have the same BMI, but if one has more fat around their midsection, their ABSI will be higher—often signaling a greater health risk. This is why ABSI complements BMI, offering a more complete picture.</blockquote>
              </section>

              {/* --- The ABSI Formula --- */}
              <section>
                  <h2 className="mb-2"><b>The ABSI Formula </b>: A Step-by-Step Outline</h2>
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                      {/* Left side: Vertical Stepper */}
                      <VerticalStepper steps={stepperSteps} />

                      {/* Right side: Formula Box & Tips */}
                      <div className="space-y-4">
                          <Card>
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> The Formula</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm md:text-base">
                                      ABSI = Waist / ( BMI<sup>2/3</sup> &times; Height<sup>1/2</sup> )
                                  </div>
                                  <h3 className="font-semibold mt-4">Common Mistakes & Tips</h3>
                                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                                      <li>Always convert waist and height to **meters (m)**.</li>
                                      <li>To convert pounds to kg, divide by 2.20462.</li>
                                      <li>Using cm for waist and m for height will give a result ~100x too large.</li>
                                  </ul>
                              </CardContent>
                          </Card>
                          <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Micro Example</CardTitle>
                                <CardDescription>Weight: 70kg, Height: 1.65m, Waist: 90cm (0.9m)</CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                <p><strong>1. BMI:</strong> 70 / 1.65² = 25.71</p>
                                <p><strong>2. BMI²ᐟ³:</strong> 25.71^(2/3) ≈ 8.76</p>
                                <p><strong>3. Height¹ᐟ²:</strong> √1.65 ≈ 1.28</p>
                                <p><strong>4. ABSI:</strong> 0.90 / (8.76 &times; 1.28) ≈ <strong>0.08043</strong></p>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </section>

              {/* --- How to Measure Your Waist --- */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5" /> How to Measure Your Waist Correctly</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Stand and Relax:</strong> Stand upright but relaxed, and breathe out normally. Don't suck in your stomach.</li>
                        <li><strong>Find the Location:</strong> Measure just above your belly button, at the narrowest part of your torso.</li>
                        <li><strong>Use the Tape:</strong> Wrap a flexible measuring tape around your waist, ensuring it's level with the floor.</li>
                        <li><strong>Check the Fit:</strong> The tape should be snug against the skin but not tight enough to compress it.</li>
                        <li><strong>Record the Value:</strong> Note the measurement to the nearest 0.1 cm. Remember to convert it to meters for the formula!</li>
                      </ol>
                  </CardContent>
                </Card>
              </section>

              {/* --- Learning Your ABSI Score --- */}
              <section>
                <h2 className="mb-2"><b>Learning Your ABSI Score</b></h2>
                <p>
                  A raw ABSI value is useful, but it becomes powerful when converted to an "ABSI Z-Score".
                  This score compares your result to an age and gender-matched population, telling you how your body shape risk compares to the average.
                  If you’d like to estimate your actual body fat percentage using a simpler method, try our{" "}
                  <Link href="/health/rfm-calculator" className="text-primary hover:underline">
                    RFM Calculator
                  </Link>.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mt-4">
                  {[
                    { title: "Very Low to Low Risk", score: "z ≤ -0.5", icon: <Shield className="w-6 h-6 text-green-500" />, advice: "Keep up your healthy habits." },
                    { title: "Average Risk", score: "-0.5 < z ≤ 0.5", icon: <UserCheck className="w-6 h-6 text-yellow-500" />, advice: "Focus on general prevention with diet and exercise." },
                    { title: "High to Very High Risk", score: "z > 0.5", icon: <HeartPulse className="w-6 h-6 text-red-500" />, advice: "Raise physical activity and consult a doctor." },
                  ].map(item => (
                    <Card key={item.title}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        {item.icon}
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{item.score}</div>
                        <p className="text-xs text-muted-foreground">{item.advice}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* --- ABSI vs Other Indices --- */}
              <section>
                <h2 className="mb-2"><b>ABSI Versus Other Body Indices</b></h2>
                <p>ABSI is one of several tools used to assess body composition. Here's how it compares to other common indices.</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="p-2">Index</th>
                        <th className="p-2">What It Measures</th>
                        <th className="p-2">Strengths</th>
                        <th className="p-2">Weaknesses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2 font-bold">ABSI</td>
                        <td className="p-2">Body shape and central fat relative to size.</td>
                        <td className="p-2">Strongly tied to mortality risk; isolates belly fat.</td>
                        <td className="p-2">Requires population data (z-scores) for context.</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">BMI</td>
                        <td className="p-2">Overall body mass relative to height.</td>
                        <td className="p-2">Simple, universal screening tool.</td>
                        <td className="p-2">Doesn't distinguish fat from muscle; ignores fat location.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2 font-bold">WHtR</td>
                        <td className="p-2">Waist size relative to height.</td>
                        <td className="p-2">Very simple; good predictor of cardiometabolic risk.</td>
                        <td className="p-2">Doesn't account for overall body mass (weight).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid md:grid-cols-2 gap-8 my-6 not-prose">
                    <div className="p-4 border rounded-lg">
                        <Image src="/absi-vs-bmi.png" alt="Illustration showing two people with the same BMI but different ABSI scores due to belly fat." width={300} height={300} className="mx-auto" />
                        <p className="text-center text-sm mt-2 text-muted-foreground">Fig 1: Same BMI, Different Risk. Higher ABSI indicates greater health risk.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <Image src="/visceral-fat.png" alt="Diagram showing dangerous visceral fat around organs versus subcutaneous fat." width={300} height={300} className="mx-auto" />
                        <p className="text-center text-sm mt-2 text-muted-foreground">Fig 2: ABSI helps estimate the risk from harmful visceral fat.</p>
                    </div>
                </div>
              </section>

              {/* --- Real Life Case Study --- */}
              <section>
                <h2 className="mb-2"><b>Real-Life Case Study: "Riya"</b></h2>
                 <Card className="not-prose overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-6">
                            <h3 className="font-bold text-lg">Meet Riya, a 28-year-old woman</h3>
                            <p className="text-muted-foreground text-sm mt-2">Riya wanted to understand her health beyond the number on the scale. Her BMI was in the 'normal' range, but she was concerned about her body shape.</p>
                            <div className="mt-4 space-y-2 text-sm">
                                <p><strong>Weight:</strong> 60 kg</p>
                                <p><strong>Height:</strong> 1.70 m</p>
                                <p><strong>Waist:</strong> 72 cm (0.72 m)</p>
                            </div>
                        </div>
                        <div className="bg-muted/50 p-6">
                            <h3 className="font-semibold">Her Results & Action Plan:</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                              <li><strong>BMI:</strong> 20.8 (Normal)</li>
                              <li><strong>WHtR:</strong> 0.42 (Healthy)</li>
                              <li><strong>ABSI Calculation:</strong> 0.72 / (20.8^(2/3) &times; 1.70^(1/2)) ≈ <strong>0.07310</strong></li>
                              <li><strong>Interpretation:</strong> Riya's ABSI was in the low-risk category, confirming her healthy body composition.</li>
                              <li><strong>Action:</strong> She focused on maintaining her active lifestyle with aerobics and core strength exercises, monitoring her waist measurement monthly.</li>
                            </ul>
                        </div>
                    </div>
                </Card>
              </section>
               <section>
                <h2 className="mb-2"><b>Scientific References and Further Reading</b></h2>
                <Card className="not-prose overflow-hidden">

                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      <li className="pt-4"><p className="font-semibold">Original/Early Paper on ABSI</p><p className="text-muted-foreground">Krakauer, N. Y., & Krakauer, J. C. (2012). A New Body Shape Index Predicts Mortality Hazard Independently of Body Mass Index. PLOS ONE.</p><a href="https://pubmed.ncbi.nlm.nih.gov/22815707/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">Systematic Review Comparing ABSI, BMI, and Waist Circumference</p><p className="text-muted-foreground">Ji, M. et al. (2018). Effectiveness of A Body Shape Index (ABSI) in predicting all-cause mortality and chronic disease outcomes.</p><a href="https://pubmed.ncbi.nlm.nih.gov/29349876/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
      
                      
                      <li className="border-t pt-4"><p className="font-semibold">ABSI and Mortality in People with Type 2 Diabetes</p><p className="text-muted-foreground">Chen, F. et al. (2025). A Body Shape Index (ABSI) as a risk factor for all-cause mortality among US adults with Type 2 Diabetes.</p><a href="https://pubmed.ncbi.nlm.nih.gov/40224530/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on PubMed</a></li>
                      <li className="border-t pt-4"><p className="font-semibold">Review of Central Fatness and Mortality</p><p className="text-muted-foreground">Jayedi, A. et al. (2020). Central fatness and risk of all cause mortality: systematic review and dose-response meta-analysis.</p><a href="https://www.bmj.com/content/370/bmj.m3324" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">→ View on The BMJ</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </div>
                    
            <FAQSection faqs={faqs} />
            <p className="text-sm text-muted-foreground text-center mt-12">
              Want to go one step further? Estimate your body fat directly with our{" "}
              <Link href="/health/rfm-calculator" className="text-primary hover:underline">
                RFM Calculator
              </Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
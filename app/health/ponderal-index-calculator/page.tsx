import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PonderalIndexCalculator from "@/components/calculators/ponderal-index-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Ruler, Calculator, BrainCircuit, HeartPulse, UserCheck, Shield, BookOpen, Activity, Scale, Baby } from "lucide-react"

export const metadata: Metadata = {
  title: "Ponderal Index Calculator: Corpulence Index Explained",
  description: "Calculate your Ponderal Index (PI) score to assess your body composition more accurately than BMI, especially for tall or short individuals. Use our evidence-based formulas for adults and pediatrics.",
  keywords: "Ponderal Index calculator, Corpulence Index calculator, Rohrer's Index, what is Ponderal Index, PI formula, Ponderal Index vs BMI, body composition, healthy weight, child growth assessment",
}

// New FAQ data based on your provided content
const faqs = [
  {
    question: "What is the Ponderal Index?",
    answer: "The Ponderal Index (PI), or Corpulence Index, is a body composition test that measures your weight against your height raised to the third power. This process provides a better measurement of body proportion than BMI, and is superior for very short or very tall persons."
  },
  {
    question: "What is the Ponderal Index formula?",
    answer: "For adults, the formula is PI = weight (kg) ÷ height³ (m³). For infants or children, the formula is PI = weight (grams) ÷ height³ (cm³). It is sometimes referred to as the Corpulence Index formula and is utilized to determine whether a human body weight is healthy."
  },
  {
    question: "How do you manually calculate the Ponderal Index?",
    answer: "To calculate the Ponderal Index manually: 1. Convert your height to meters. 2. Cube the height (height × height × height). 3. Divide your weight (in kg) by the cubed height. The resulting number is your Ponderal Index (kg/m³)."
  },
  {
    question: "What is the normal Ponderal Index range?",
    answer: "The average Ponderal Index for adults is between 11 and 15. For newborn infants and young children, the average is 2.2 to 3.0 g/cm³. A measurement lower or higher than these values may indicate an underweight or overweight body composition."
  },
  {
    question: "Is the Ponderal Index more accurate than the BMI?",
    answer: "Yes, the Ponderal Index is often seen as more accurate than BMI because it considers your body's 3D shape. BMI uses height squared (2D), while PI uses height cubed (3D), which makes it a better assessment for individuals who are very tall or short."
  },
  {
    question: "What does my Ponderal Index result indicate?",
    answer: "Your Ponderal Index result indicates your body weight status. A score below 11 suggests you are underweight. A score between 11 and 15 indicates a healthy weight. A score above 15 suggests you are overweight. These are calculated from your height and weight."
  },
  {
    question: "Can I also use the Ponderal Index Calculator for infants or young persons?",
    answer: "Yes, our Ponderal Index Calculator has a specific mode for children and infants. For infants, the formula applies grams and centimeters (PI = weight ÷ height³). This enables physicians to review their growth and identify potential issues like Intrauterine Growth Restriction (IUGR)."
  }
];

export default function PonderalIndexCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Ponderal Index Calculator"
        description="Calculate your Ponderal Index (PI) or Corpulence Index to assess body composition for adults and children."
        url="https://calqulate.net/health/ponderal-index-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Ponderal Index Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Our Ponderal Index or Corpulence Index Calculator allows you to see your body weight in proportion to your height in a better way than the BMI. Unlike BMI, which looks at height squared, the Ponderal Index (PI) uses height cubed.
              </p>
            </div>

            <PonderalIndexCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* --- What Is Ponderal Index? --- */}
              <section> 
                <h2 className="mb-2"><b>What Is Ponderal Index?</b></h2>
                <p>The Ponderal Index (PI), also known as the Corpulence Index or Rohrer's Index, is a measure of body composition. It is defined as the ratio of your weight in kilograms to the cube of your height in meters. It allows you to assess if your body weight is healthy for your height.</p>
                <blockquote>Because it includes the cubic height, it better approximates body volume. This makes it a superior index to BMI, especially for very lean or very tall individuals.</blockquote>
              </section>

              {/* --- The Ponderal Index Formula --- */}
              <section>
                  <h2 className="mb-2"><b>Ponderal Index Formula</b></h2>
                  <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                      {/* Left side: Formula Cards */}
                      <div className="space-y-4">
                          <Card>
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2"><UserCheck className="w-5 h-5" /> For Adults</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm md:text-base">
                                      PI = Weight (kg) &divide; Height&sup3; (m&sup3;)
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-2">This is the standard formula used in clinical and fitness assessments for the adult population.</p>
                              </CardContent>
                          </Card>
                           <Card>
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2"><Baby className="w-5 h-5" /> For Infants/Children</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className="p-4 bg-muted rounded-lg text-center font-mono text-sm md:text-base">
                                      PI = Weight (g) &divide; Height&sup3; (cm&sup3;)
                                  </div>
                                   <p className="text-sm text-muted-foreground mt-2">Note: This result is numerically different from the adult PI (approximately 0.1 times the adult value).</p>
                              </CardContent>
                          </Card>
                      </div>

                      {/* Right side: Reference Chart */}
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5" /> Ponderal Index Reference Chart</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-semibold">Adults (kg/m³)</h3>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                                <li className="flex justify-between"><span>&lt; 11</span> <span className="font-medium text-blue-500">Underweight</span></li>
                                <li className="flex justify-between"><span>11 – 15</span> <span className="font-medium text-green-500">Normal Weight</span></li>
                                <li className="flex justify-between"><span>&gt; 15</span> <span className="font-medium text-red-500">Overweight</span></li>
                            </ul>
                             <h3 className="font-semibold mt-6">Infants & Kids (g/cm³)</h3>
                              <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                                <li className="flex justify-between"><span>2.2 – 3.0</span> <span className="font-medium text-green-500">Normal Range</span></li>
                            </ul>
                          </CardContent>
                      </Card>
                  </div>
              </section>

              {/* --- Why Use Our Calculator? --- */}
              <section>
                <h2 className="mb-2"><b>Why Use Our Calculator?</b></h2>
                <p>Choosing the right metric matters. Our Ponderal Index calculator offers several advantages over simpler measures like BMI:</p>
                <div className="space-y-4 mt-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li><strong>More correct than BMI:</strong> The Ponderal Index takes your body's 3D shape into consideration, minimizing misclassification for very tall or very short individuals.</li>
                    <li><strong>Two modes (Adult & Child):</strong> We provide distinct formulas for adults and infants/children to improve accuracy across age groups.</li>
                    <li><strong>Quick health check:</strong> A visually-minded bar and readable-at-a-glance results let you instantly see where you stand along the continuum of health.</li>
                    <li><strong>Metric and Imperial units:</strong> Easily switch between kilograms/meters and pounds/inches for convenience.</li>
                    <li><strong>Research-based accuracy:</strong> Built using criteria commonly used in pediatric growth assessment and adult fitness evaluation.</li>
                  </ul>
                </div>
              </section>

              {/* --- Pros of Knowing Its Ponderal Index --- */}
              <section>
                <h2 className="mb-2"><b>Benefits of Knowing Your Ponderal Index</b></h2>
                <p>Understanding your PI offers several advantages for monitoring your health and fitness journey.</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose mt-4">
                  {[
                    { title: "Assess Healthy Weight", icon: <Scale className="w-6 h-6 text-primary" />, description: "Aids in determining whether your body weight is appropriate for your size." },
                    { title: "Complement Other Measures", icon: <BrainCircuit className="w-6 h-6 text-primary" />, description: "Complements metrics like BMI, Body Fat %, and Waist-to-Height Ratio." },
                    { title: "Track Fitness Progress", icon: <Activity className="w-6 h-6 text-primary" />, description: "Portable for easy tracking of diet or fitness program effectiveness." },
                    { title: "Early Health Indication", icon: <HeartPulse className="w-6 h-6 text-primary" />, description: "Helps find possible underweight or overweight problems early." },
                    { title: "Monitor Child Growth", icon: <Baby className="w-6 h-6 text-primary" />, description: "Can be applied to infants and children to assess growth healthily." },
                    { title: "Better Body Proportion", icon: <UserCheck className="w-6 h-6 text-primary" />, description: "Provides a fairer measurement of your body shape and volume." },
                  ].map(item => (
                    <Card key={item.title}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        {item.icon}
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* --- Ponderal Index vs. BMI --- */}
              <section>
                <h2 className="mb-2"><b>Ponderal Index vs. BMI - How Do They Differ?</b></h2>
                <p>While both PI and BMI assess weight relative to height, their formulas and sensitivity to different body types set them apart. The Ponderal Index is a fairer measurement because it uses height cubed (height³), connecting it more closely to body volume and density.</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead className="text-left bg-muted">
                      <tr>
                        <th className="p-2 font-semibold">Feature</th>
                        <th className="p-2 font-semibold">Ponderal Index</th>
                        <th className="p-2 font-semibold">BMI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Formula</td>
                        <td className="p-2">Weight &divide; Height&sup3;</td>
                        <td className="p-2">Weight &divide; Height&sup2;</td>
                      </tr>
                      <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Body Type Sensitivity</td>
                        <td className="p-2">More accurate for tall or short individuals</td>
                        <td className="p-2">Can misclassify obesity in tall or muscular people</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2 font-bold">Used For</td>
                        <td className="p-2">Adults, Children, Newborns</td>
                        <td className="p-2">Primarily adults</td>
                      </tr>
                       <tr className="border-t bg-muted/50">
                        <td className="p-2 font-bold">Accuracy (Dimensionality)</td>
                        <td className="p-2">High (3D volume-based)</td>
                        <td className="p-2">Moderate (2D area-based)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 not-prose">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">
                          <strong>Key Takeaway:</strong> Keep in mind — just like BMI, the PI doesn't differentiate between muscle and fat. A very muscular individual may register as "overweight" by PI. It's best to consider it in combination with other health measures.
                        </p>
                      </CardContent>
                    </Card>
                </div>
              </section>

              {/* --- Why It Matters --- */}
              <section>
                <h2 className="mb-2"><b>Why It Matters</b></h2>
                 <Card className="not-prose overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-6">
                            <h3 className="font-bold text-lg">A More Insightful Health Metric</h3>
                            <p className="text-muted-foreground text-sm mt-2">Tracking your Ponderal Index provides valuable information for several key areas of health and wellness, offering a more nuanced view than traditional metrics alone.</p>
                        </div>
                        <div className="bg-muted/50 p-6">
                            <h3 className="font-semibold">PI Informs Your Understanding Of:</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                              <li><b>Healthy weight regulation:</b> Gain clarity on whether your weight is proportional to your volume.</li>
                              <li><b>Watching babies grow:</b> An essential tool for parents and pediatricians to monitor healthy development.</li>
                              <li><b>Body proportion balance:</b> Understand your body composition beyond a simple weight number.</li>
                              <li><b>Better diet or fitness:</b> Use it as a reliable metric to track the progress of your health goals.</li>
                            </ul>
                        </div>
                    </div>
                </Card>
                <p className="mt-4">Whether you're on a fitness course, a parent tracking growth, or a healthcare professional, our calculator makes challenging body information readable and usable.</p>
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
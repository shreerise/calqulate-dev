import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import MetabolicAgeCalculator from "@/components/calculators/metabolic-age-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Flame, HeartPulse, Clock, TrendingUp, AlertCircle, Dumbbell, Apple } from "lucide-react"

export const metadata: Metadata = {
  title: "Metabolic Age Calculator: Is Your Body Aging Faster Than You?",
  description:
    "Calculate your metabolic age instantly. Compare your BMR and biological age against your chronological age. Get free, personalized insights to lower your metabolic age and boost health.",
  keywords:
    "metabolic age calculator, biological age calculator, calculate metabolic age, metabolic rate calculator, BMR calculator, metabolic age chart, lower metabolic age, fitness age calculator, what is my metabolic age",
}

const faqs = [
  {
    question: "What is Metabolic Age?",
    answer:
      "Metabolic age is a comparison between your Basal Metabolic Rate (BMR) and the average BMR of people in your chronological age group. If your metabolic age is lower than your actual age, it suggests your body is in good physical condition. If it is higher, it may indicate a slower metabolism or lower muscle mass.",
  },
  {
    question: "How is Metabolic Age calculated?",
    answer:
      "Our calculator uses the Mifflin-St Jeor equation to determine your BMR based on height, weight, age, and gender. It then adjusts this based on your activity level and compares your energy expenditure to statistical averages for different age groups to estimate your 'biological' age.",
  },
  {
    question: "Is having a higher metabolic age bad?",
    answer:
      "A metabolic age higher than your actual age often indicates that your metabolism is slower than the average for your age group. This can be caused by low muscle mass, a sedentary lifestyle, or hormonal factors. However, it is reversible through diet and exercise.",
  },
  {
    question: "How can I lower my metabolic age?",
    answer:
      "To lower your metabolic age, focus on increasing your BMR. The most effective way is Strength Training (building muscle), as muscle burns more calories at rest than fat. High-Intensity Interval Training (HIIT), getting adequate protein, and improving sleep quality also help.",
  },
  {
    question: "What is the difference between Chronological Age and Metabolic Age?",
    answer:
      "Chronological age is the number of years you have been alive. Metabolic age is a reflection of your overall physical health and metabolic efficiency. You cannot change your chronological age, but you can actively improve your metabolic age.",
  },
  {
    question: "Does muscle mass affect metabolic age?",
    answer:
      "Yes, significantly. Muscle tissue is metabolically active, meaning it requires more energy (calories) to maintain than fat tissue. Therefore, individuals with higher muscle mass typically have a higher BMR and a lower metabolic age.",
  },
]

export default function MetabolicAgeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Metabolic Age Calculator"
        description="Find out if your body is aging faster or slower than your actual age with our free Metabolic Age Calculator."
        url="https://calqulate.net/health/metabolic-age-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Metabolic Age Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Is your body younger or older than the calendar says? Our <strong>Metabolic Age Calculator</strong> analyzes your body stats and lifestyle to determine your true biological fitness.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Uncover hidden health insights and get a personalized plan to turn back the clock on your metabolism today.
              </p>
            </div>

            {/* Calculator Component */}
            <MetabolicAgeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is Metabolic Age? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is Metabolic Age?
                </h2>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  While your <strong>Chronological Age</strong> is simply the number of birthdays you've celebrated, your <strong>Metabolic Age</strong> is a reflection of your physical fitness and metabolic efficiency. It compares your Basal Metabolic Rate (BMR) against the average BMR of other people your age.
                </p>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  In simpler terms:
                </p>

                <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                    <Card className="bg-green-50 border-green-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-green-700 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Good Result</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-green-800">
                                <strong>Metabolic Age &lt; Chronological Age:</strong> <br/>
                                Your body is efficient, you likely have good muscle mass, and your fitness level is excellent.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-red-700 flex items-center gap-2"><AlertCircle className="w-5 h-5"/> Attention Needed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-red-800">
                                <strong>Metabolic Age &gt; Chronological Age:</strong> <br/>
                                Your metabolism is slower than average. This implies you may need to increase activity or build muscle to improve health.
                            </p>
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* Why it matters */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Why knowing your Metabolic Age matters</b>
                </h2>
                <p className="mb-2">
                  Metabolic age is often considered a better indicator of overall health than BMI (Body Mass Index). BMI only looks at weight vs. height, whereas metabolic health looks at how your body burns energy.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>It serves as a "wake-up call" to improve lifestyle habits.</li>
                  <li>It helps track progress in fitness programs (seeing the age number drop is motivating!).</li>
                  <li>It highlights potential issues with muscle loss (sarcopenia) as you age.</li>
                </ul>
              </section>

              {/* BMR Reference Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" /> Average BMR by Age & Gender
                    </CardTitle>
                    <CardDescription>
                      See where you stand. As we age, BMR naturally drops due to muscle loss. A higher BMR usually equals a lower metabolic age.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="border px-4 py-3 text-left">Age Group</th>
                            <th className="border px-4 py-3 text-left">Avg. BMR (Men)</th>
                            <th className="border px-4 py-3 text-left">Avg. BMR (Women)</th>
                            <th className="border px-4 py-3 text-left">Metabolic Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3">18–29</td>
                            <td className="border px-4 py-3">1,600 – 1,900 kcal</td>
                            <td className="border px-4 py-3">1,300 – 1,500 kcal</td>
                            <td className="border px-4 py-3">Peak Metabolic Rate</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3">30–49</td>
                            <td className="border px-4 py-3">1,500 – 1,800 kcal</td>
                            <td className="border px-4 py-3">1,250 – 1,450 kcal</td>
                            <td className="border px-4 py-3">Gradual Decline begins</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3">50–69</td>
                            <td className="border px-4 py-3">1,350 – 1,600 kcal</td>
                            <td className="border px-4 py-3">1,150 – 1,350 kcal</td>
                            <td className="border px-4 py-3">Decline accelerates due to muscle loss</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3">70+</td>
                            <td className="border px-4 py-3">1,200 – 1,450 kcal</td>
                            <td className="border px-4 py-3">1,000 – 1,200 kcal</td>
                            <td className="border px-4 py-3">Significantly slower metabolism</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* How to Improve */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">How to "Reverse" Your Metabolic Age</h2>
                <p className="mb-4">
                    The good news is that unlike your chronological age, your metabolic age is reversible. Here are the three most effective ways to lower it:
                </p>

                <div className="grid md:grid-cols-3 gap-6 not-prose">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg"><Dumbbell className="w-5 h-5 text-blue-500"/> Build Muscle</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            Muscle is metabolically "expensive." Every pound of muscle you gain burns an extra 6-10 calories per day at rest. <strong>Strength training</strong> is the #1 way to lower metabolic age.
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg"><Activity className="w-5 h-5 text-red-500"/> Increase NEAT</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            NEAT (Non-Exercise Activity Thermogenesis) includes walking, standing, and fidgeting. Simply increasing your daily steps to 8,000+ keeps your metabolism active all day.
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg"><Apple className="w-5 h-5 text-green-500"/> Protein Intake</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            Protein has a high "Thermic Effect of Food" (TEF). Your body uses 20-30% of the calories in protein just to digest it, temporarily boosting your metabolic rate.
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* Features Unique */}
              <section>
                <Card className="not-prose bg-blue-50 dark:bg-slate-900 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      What makes our Metabolic Calculator unique?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Most calculators only give you a number. We provide a comprehensive metabolic profile:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>Activity-Adjusted Analysis:</strong> We factor in your daily movement, not just your weight.</li>
                        <li><strong>BMR & TDEE Calculation:</strong> We show you exactly how many calories you burn at rest vs. during the day.</li>
                        <li><strong>Actionable Insights:</strong> We don't just tell you that you are "old"; we tell you how many years you can "reclaim."</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
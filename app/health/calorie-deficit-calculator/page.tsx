import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import CalorieDeficitCalculator from "@/components/calculators/calorie-deficit-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Flame, Activity, Apple, Scale, TrendingDown, Target, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator: Find Your Target Weight Loss Calories",
  description: "Calculate your exact calorie deficit for sustainable weight loss. Get your TDEE, personalized macronutrient splits, and a unique zig-zag diet schedule to prevent plateaus.",
  keywords: "calorie deficit calculator, weight loss calculator, tdee calculator, how many calories to lose weight, calorie cycling, macro calculator, calorie deficit for weight loss",
}

const faqs = [
  {
    question: "What is a calorie deficit?",
    answer: "A calorie deficit occurs when you consume fewer calories from food and drink than your body burns through basal metabolic rate (BMR) and physical activity. This energy shortage forces your body to use stored fat for energy, leading to weight loss."
  },
  {
    question: "How accurate is this calorie deficit calculator?",
    answer: "Our calculator uses the Mifflin-St Jeor equation, which is widely recognized by health and fitness professionals as the most accurate standard for estimating Basal Metabolic Rate (BMR). Factoring in your daily activity level gives a highly reliable estimate of your Total Daily Energy Expenditure (TDEE)."
  },
  {
    question: "Is it safe to eat less than 1,200 calories a day?",
    answer: "Generally, no. Health standards dictate that women should not consume fewer than 1,200 calories per day, and men should not consume fewer than 1,500 calories per day unless under direct medical supervision. Dropping below this can cause muscle loss, nutrient deficiencies, and metabolic slowdown."
  },
  {
    question: "What is Zig-Zag Calorie Cycling?",
    answer: "Zig-zag calorie cycling is a dieting strategy where you alternate your daily calorie intake (e.g., eating more on weekends and less on weekdays) while keeping your overall weekly deficit the same. Our calculator automatically generates this schedule to help you avoid weight-loss plateaus and diet fatigue."
  },
  {
    question: "Do I need to track my macros to lose weight?",
    answer: "While a calorie deficit is the primary driver of weight loss, tracking your macronutrients (Protein, Fats, Carbs) ensures you lose fat rather than muscle. A higher protein intake, for example, helps preserve lean muscle and keeps you feeling full longer."
  },
  {
    question: "Does my body shape affect my calorie deficit?",
    answer: "Your body shape doesn't change the basic math of a calorie deficit, but it does indicate where you naturally store fat. For a complete wellness strategy, we recommend pairing your calorie insights with our Body Shape Calculator to understand your natural proportions and best workout styles."
  }
]

export default function CalorieDeficitCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Calorie Deficit Calculator"
        description="Discover your ideal calorie deficit for healthy weight loss. Includes TDEE calculation, macro splits, and a plateau-busting zig-zag schedule."
        url="https://calqulate.net/health/calorie-deficit-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Calorie Deficit Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Take the guesswork out of weight loss. Our advanced Calorie Deficit Calculator determines 
                exactly how much you need to eat to lose weight sustainably. It calculates your TDEE, breaks down 
                your ideal macros, and even builds a custom calorie-cycling schedule to prevent plateaus.
              </p>
            </div>

            {/* Calculator Component */}
            <CalorieDeficitCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* Introduction */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  The Science of Losing Weight: What is a Calorie Deficit?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Weight loss, at its core, is driven by energy balance. A <b>calorie deficit</b> happens when you supply 
                  your body with fewer calories than it needs to maintain its current weight. To make up for this 
                  energy shortfall, your body taps into its stored energy reserves (body fat), resulting in weight loss.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  While simple in theory, finding the <i>right</i> deficit is crucial. Cut too few calories, and you won't see results. 
                  Cut too many, and you risk losing muscle mass, slowing down your metabolism, and experiencing extreme fatigue.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <Target className="w-5 h-5 text-blue-500" />
                      More Than Just a Number
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Why our calculator stands out from the rest.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><b>Industry Standard Accuracy:</b> Uses the Mifflin-St Jeor formula.</li>
                        <li><b>Macro Split Options:</b> Tailors protein, fat, and carbs to your diet style.</li>
                        <li><b>Zig-Zag Dieting:</b> Provides a varied schedule to trick your metabolism.</li>
                        <li><b>Safety First:</b> Warns against dangerously low calorie goals.</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                       <p className="text-sm text-gray-600 italic">
                         "Pair this insight with our <Link href="/health/body-shape-calculator" className="text-blue-600 hover:underline font-semibold">Body Shape Calculator</Link> to understand exactly how your body naturally distributes the fat you are working to lose."
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* TDEE and BMR */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Understanding BMR and TDEE</b>
                </h2>
                <p className="mb-2">
                  To calculate your deficit, we first need to determine your maintenance calories. We do this by calculating two important metrics:
                </p>
                <ul className="list-disc pl-5 space-y-3 mt-4">
                  <li>
                    <b>Basal Metabolic Rate (BMR):</b> This is the number of calories your body burns at complete rest just to keep you alive (breathing, circulating blood, cell production). For most people, BMR accounts for 60-75% of total daily calorie burn.
                  </li>
                  <li>
                    <b>Total Daily Energy Expenditure (TDEE):</b> This is your BMR multiplied by an activity factor. It includes the calories burned through exercise, walking, working, and even digesting food. Your TDEE is your <b>Maintenance Level</b>.
                  </li>
                </ul>
                <p className="mt-4">
                  Once we have your TDEE, we subtract calories based on your goal (e.g., -500 calories a day to lose roughly 1 pound a week).
                </p>
              </section>

              {/* Zig Zag Calorie Cycling */}
              <section>
                <Card className="not-prose border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <TrendingDown className="w-5 h-5" />
                      The Secret Weapon: Zig-Zag Calorie Cycling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Most calculators just give you a static number (e.g., "Eat 1,500 calories a day"). While effective at first, your body is incredibly smart. Over time, it adapts to a static low-calorie diet by slowing down your metabolism—a process called <i>adaptive thermogenesis</i>.
                    </p>
                    <p>
                      <b>Calorie Cycling (Zig-Zag Dieting)</b> solves this. By eating higher calories on some days and lower calories on others, you:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 font-medium">
                      <li>Prevent your metabolism from adapting to a low intake.</li>
                      <li>Enjoy more flexibility (e.g., eating more on weekends or heavy workout days).</li>
                      <li>Reduce diet fatigue and mental burnout.</li>
                    </ul>
                    <p>
                      Our calculator automatically provides a 7-day Zig-Zag schedule that matches your exact weekly deficit goal!
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Safe Limits */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      Safe Weight Loss Limits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3 text-muted-foreground">
                    <p>
                      Faster isn't always better. The medical consensus for safe, sustainable weight loss is <b>0.5 to 2 pounds (0.25 to 1 kg) per week</b>. 
                    </p>
                    <p>
                      As a general rule, the National Institutes of Health (NIH) recommends that calorie intake should not fall below:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 font-medium text-foreground">
                      <li>1,200 calories per day for Women</li>
                      <li>1,500 calories per day for Men</li>
                    </ul>
                    <p>
                      If your calculated deficit puts you below these numbers, our calculator will flag it. In these cases, it's better to increase your physical activity rather than dropping your food intake further.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Macros Explained */}
              <section>
                <h2 className="mb-2 font-semibold flex items-center gap-2">
                  <Apple className="w-6 h-6 text-red-500" />
                  Why Macronutrients Matter
                </h2>
                <p>
                  Calories dictate <i>how much</i> weight you lose, but macronutrients (macros) dictate <i>what kind</i> of weight you lose (fat vs. muscle) and how you feel during the process.
                </p>
                <div className="grid md:grid-cols-3 gap-4 not-prose mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">🥩 Protein</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Essential for preserving muscle mass while in a deficit. It has the highest thermic effect (burns the most calories to digest) and keeps you feeling full.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">🥑 Fats</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Crucial for hormonal balance, brain health, and absorbing vitamins. Never cut fats entirely out of your diet.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">🍚 Carbohydrates</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Your body's preferred energy source. Needed for high-intensity workouts and general daily energy.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Final Encouragement */}
              <section>
                <h2 className="mb-2">
                  <b>Ready to Start Your Journey?</b>
                </h2>
                <p>
                  Use the Calorie Deficit Calculator above to find your targets. Remember that consistency is more important than perfection. 
                  Hit your calorie goals 80% of the time, stay active, and be patient with your body. 
                </p>
                <p className="mt-4">
                  For a full understanding of your body's transformation, track your progress alongside our <Link href="/health/body-shape-calculator" className="text-primary hover:underline">Body Shape Calculator</Link> to see how your proportions evolve as you shed fat!
                </p>
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
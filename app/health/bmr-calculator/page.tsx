import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BMRCalculator from "@/components/calculators/bmr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Flame, Activity, TrendingDown, TrendingUp, Utensils, Info, Calculator as CalculatorIcon, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "BMR Calculator: Basal Metabolic Rate & Daily Calorie Planner",
  description: "Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Find out exactly how many calories you burn resting and get a custom macro plan for weight loss or muscle gain.",
  keywords: "bmr calculator, basal metabolic rate calculator, resting metabolic rate, tdee calculator, calories burned resting, mifflin st jeor calculator, katch mcardle calculator, how to calculate bmr, calories for weight loss, daily calorie calculator",
}

const faqs = [
  {
    question: "What is BMR (Basal Metabolic Rate)?",
    answer: "Basal Metabolic Rate (BMR) is the total number of calories your body needs to perform basic, life-sustaining functions while at rest. This includes breathing, blood circulation, cell production, and nutrient processing. It accounts for about 60% to 75% of your total daily calorie burn.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "Your BMR is the calories you burn simply by existing (if you stayed in bed all day). TDEE (Total Daily Energy Expenditure) takes your BMR and multiplies it by your activity level (from sedentary to very active) to estimate the total calories you burn in a full day.",
  },
  {
    question: "Which BMR formula is the most accurate?",
    answer: "For most people, the Mifflin-St Jeor equation is considered the most accurate and is the modern industry standard. However, if you are very lean or know your exact Body Fat Percentage, the Katch-McArdle formula provides an even more precise measurement because it factors in lean muscle mass.",
  },
  {
    question: "How can I use my BMR to lose weight?",
    answer: "To lose weight, you first calculate your BMR, then determine your TDEE based on your activity level. Once you have your TDEE, you subtract 300 to 500 calories to create a 'calorie deficit'. Eating at this deficit forces your body to use stored fat for energy.",
  },
  {
    question: "Does my BMR decrease as I get older?",
    answer: "Yes, BMR naturally decreases with age. This is primarily due to a gradual loss of muscle mass and hormonal changes. You can combat this decline by engaging in strength training to build and preserve lean muscle, which burns more calories at rest than fat tissue.",
  },
  {
    question: "Why do men generally have a higher BMR than women?",
    answer: "Men typically have a higher BMR because, on average, they have more muscle mass, heavier bones, and less body fat than women of the same height and weight. Muscle tissue is highly active metabolically and requires more energy to maintain.",
  }
]

export default function BMRCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="BMR Calculator"
        description="Calculate your precise Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and get personalized macronutrient plans for your fitness goals."
        url="https://calqulate.net/health/bmr-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Advanced BMR Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Discover exactly how many calories your body burns at rest. Our advanced Basal Metabolic Rate (BMR) Calculator goes beyond the basics, giving you your Total Daily Energy Expenditure (TDEE) and personalized macronutrient splits to help you crush your fitness goals.
              </p>
            </div>

            {/* Calculator Component */}
            <BMRCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Introduction */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What Exactly is Basal Metabolic Rate (BMR)?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Imagine you spent the entire day resting in bed, doing absolutely nothing. Your body still requires energy to keep your heart beating, your lungs breathing, and your brain functioning. The total number of calories required to maintain these essential life functions is known as your <strong>Basal Metabolic Rate (BMR)</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Knowing your BMR is the absolute foundation of any successful diet or fitness plan. Whether you want to shed body fat, build lean muscle, or maintain your current physique, your BMR acts as the baseline for calculating your daily nutritional needs.
                </p>
              </section>

              {/* Cross-linking to Body Shape Calculator */}
              <section>
                <Link href="/health/body-shape-calculator" className="no-underline block group">
                  <Card className="border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors">
                        <Activity className="w-6 h-6" />
                        Take Your Body Knowledge Further
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Knowing your BMR is a great start, but understanding how your body stores fat and muscle is just as important. Discover your exact proportions, get style tips, and uncover health insights tied to your body type.
                      </p>
                      <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">
                        Try our Body Shape Calculator <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </section>

              {/* Formula Standards */}
              <section>
                <Card className="not-prose border border-gray-200 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-blue-500" />
                      The Science: Industrial Standard Formulas Used
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Unlike basic calculators, we give you the option to choose between the three most respected scientific equations for measuring resting metabolism.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        Mifflin-St Jeor Equation (Recommended)
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Introduced in 1990, this formula is considered the most accurate standard for modern lifestyles. The Academy of Nutrition and Dietetics highly recommends it. It is the default calculation for our tool.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        Harris-Benedict Equation (Revised)
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Originally created in 1919 and revised in 1984, this was the standard for decades. It tends to slightly overestimate calories for overweight individuals but remains a highly respected baseline.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        Katch-McArdle Formula
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        If you know your exact Body Fat Percentage, this is the most accurate formula of all. It calculates resting metabolism based strictly on <em>Lean Body Mass (LBM)</em>, making it perfect for athletes and bodybuilders.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Factors that affect BMR */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>What Variables Impact Your BMR?</b>
                </h2>
                <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-700">
                  <li><b>Muscle Mass:</b> Muscle tissue burns far more calories at rest than fat tissue. The more muscular you are, the higher your BMR.</li>
                  <li><b>Age:</b> As we age, our metabolism slows down naturally, primarily due to muscle loss and neurological changes.</li>
                  <li><b>Genetics:</b> Some people are simply born with a slightly faster or slower metabolic engine.</li>
                  <li><b>Weather & Temperature:</b> Your body burns extra calories adjusting to extreme cold or extreme heat.</li>
                  <li><b>Dietary Deficiencies:</b> Starvation or extreme low-calorie crash diets can drop your BMR by up to 15% as your body tries to conserve energy.</li>
                </ul>
              </section>

              {/* How to use the results */}
              <section>
                <Card className="not-prose bg-gray-50 dark:bg-gray-900 border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="w-5 h-5" />
                      How to Use Your BMR for Weight Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <p>Once you know your BMR and TDEE (Total Daily Energy Expenditure), reaching your fitness goals becomes simple math:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <h4 className="font-bold flex items-center gap-2 mb-2 text-red-500">
                          <TrendingDown className="w-4 h-4" /> For Weight Loss
                        </h4>
                        <p>Consume fewer calories than your TDEE. A 500-calorie daily deficit usually results in about 1 pound (0.45kg) of fat loss per week.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <h4 className="font-bold flex items-center gap-2 mb-2 text-green-500">
                          <TrendingUp className="w-4 h-4" /> For Muscle Gain
                        </h4>
                        <p>Consume more calories than your TDEE. A 250-500 calorie surplus provides the extra energy required to build new muscle tissue.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-16">
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
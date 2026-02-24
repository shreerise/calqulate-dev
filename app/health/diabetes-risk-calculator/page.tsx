import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import DiabetesRiskCalculator from "@/components/calculators/diabetes-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, HeartPulse, Scale, Shield, ActivitySquare, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Diabetes Risk Calculator: Check Your Type 2 Risk Instantly",
  description:
    "Assess your risk for Type 2 Diabetes in under 60 seconds. Our step-by-step Diabetes Risk Calculator uses ADA-backed clinical guidelines to evaluate your health, BMI, and lifestyle factors.",
  keywords:
    "diabetes risk calculator, type 2 diabetes risk test, ada diabetes risk test, calculate diabetes risk, prediabetes calculator, diabetes risk assessment tool, bmi and diabetes risk, am i at risk for diabetes",
}

const faqs = [
  {
    question: "How accurate is this Diabetes Risk Calculator?",
    answer:
      "This calculator is based on the widely recognized American Diabetes Association (ADA) Type 2 Diabetes Risk Test. While it is highly accurate in assessing risk factors based on statistical data, it is purely educational and not a medical diagnosis. Always consult a healthcare provider for blood tests like A1C or fasting glucose to confirm your exact status.",
  },
  {
    question: "What does a score of 5 or higher mean?",
    answer:
      "According to clinical guidelines, a score of 5 or higher indicates that you are at an increased risk for having or developing Type 2 diabetes. If you score 5 or above, it is highly recommended to schedule an appointment with your doctor to get a blood sugar test.",
  },
  {
    question: "Why does the calculator ask for my height and weight?",
    answer:
      "Your height and weight are used to calculate your Body Mass Index (BMI). Excess body weight, particularly around the abdomen, is one of the most significant modifiable risk factors for developing Type 2 diabetes. Higher BMI categories add more points to your total risk score.",
  },
  {
    question: "Can I use this tool for Type 1 Diabetes?",
    answer:
      "No. This calculator is specifically designed to assess the risk of Type 2 diabetes, which is largely influenced by lifestyle, age, and genetics. Type 1 diabetes is an autoimmune condition that is not evaluated using these standard lifestyle metrics.",
  },
  {
    question: "What is gestational diabetes and why does it matter?",
    answer:
      "Gestational diabetes is a type of diabetes that develops during pregnancy. Women who have had gestational diabetes are at a significantly higher lifetime risk of developing Type 2 diabetes later in life, which is why it adds a point to your risk score.",
  },
  {
    question: "How can I lower my diabetes risk score?",
    answer:
      "While you cannot change factors like your age, genetics, or past pregnancies, you can dramatically lower your risk by increasing physical activity, losing a moderate amount of weight (even 5-7% of your body weight makes a huge difference), and managing your blood pressure.",
  },
]

export default function DiabetesRiskCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Diabetes Risk Calculator"
        description="Calculate your risk of developing Type 2 Diabetes using clinical guidelines. Get personalized insights and lifestyle recommendations instantly."
        url="https://calqulate.net/health/diabetes-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
                <ActivitySquare className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4 text-gray-900 dark:text-gray-100">
                Type 2 Diabetes Risk Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Are you at risk for Type 2 diabetes? 1 in 3 adults have prediabetes, and over 80% don't know it. Take this quick, clinically-backed step-by-step test to uncover your risk level instantly.
              </p>
            </div>

            {/* Step-by-Step Interactive Calculator Component */}
            <DiabetesRiskCalculator />

            {/* Comprehensive SEO Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-12">
              
              {/* Introduction */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is the Diabetes Risk Calculator?
                </h2>
                <p className="leading-relaxed text-gray-700">
                  The <strong>Diabetes Risk Calculator</strong> is an intuitive health assessment tool designed to estimate your likelihood of developing Type 2 diabetes. Unlike generic quizzes, our calculator is strictly modeled after the <strong>American Diabetes Association (ADA) Risk Test guidelines</strong>, ensuring the results meet rigorous industrial standards.
                </p>
                <p className="leading-relaxed text-gray-700 mt-2">
                  By evaluating seven critical health factors—including your age, genetics, body mass index (BMI), and lifestyle habits—this tool generates a personalized risk score. It acts as an essential first step in preventive healthcare.
                </p>
              </section>

              {/* How it Works / Score Breakdown */}
              <section>
                <Card className="not-prose border-blue-100 shadow-sm">
                  <CardHeader className="bg-blue-50/50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Scale className="w-5 h-5" />
                      How is the Risk Score Calculated?
                    </CardTitle>
                    <CardDescription>
                      This calculator evaluates 7 clinical data points. Here is how your score is generated:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Age:</strong>
                          <span>Risk increases with age. (40-49: 1 pt, 50-59: 2 pts, 60+: 3 pts)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Gender:</strong>
                          <span>Men are statistically at a slightly higher risk. (Men: 1 pt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Genetics:</strong>
                          <span>Having a parent or sibling with diabetes increases risk. (Yes: 1 pt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Pregnancy:</strong>
                          <span>History of Gestational Diabetes increases future risk. (Yes: 1 pt)</span>
                        </li>
                      </ul>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Blood Pressure:</strong>
                          <span>High BP correlates strongly with insulin resistance. (Yes: 1 pt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">Activity Level:</strong>
                          <span>Leading a sedentary lifestyle is a massive risk factor. (No: 1 pt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <strong className="min-w-[120px]">BMI (Weight):</strong>
                          <span>Excess fat impacts insulin production. (Overweight: 1 pt, Obese: 2 pts, Morbidly Obese: 3 pts)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                      <p className="font-semibold text-gray-900">
                        A total score of <span className="text-red-600 text-lg">5 or more</span> puts you in the High-Risk category.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Modifiable vs Non-Modifiable */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Understanding Your Risk Factors</h2>
                <p className="mb-4">
                  When dealing with Type 2 diabetes risk assessment, clinical experts divide risk factors into two categories: things you can change (modifiable) and things you cannot (non-modifiable).
                </p>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                        <Activity className="w-5 h-5" /> Modifiable Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Weight & BMI:</strong> Losing just 5% to 7% of your body weight can lower your risk by up to 58%.</li>
                        <li><strong>Physical Activity:</strong> Aiming for 150 minutes of brisk walking per week significantly improves insulin sensitivity.</li>
                        <li><strong>Blood Pressure:</strong> Managing diet, reducing sodium, and taking prescribed medication helps protect your vascular system.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                        <Shield className="w-5 h-5" /> Non-Modifiable Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Age:</strong> Risk naturally increases as you get older, specifically after age 40.</li>
                        <li><strong>Family History:</strong> Genetics play a crucial role. If a direct family member has diabetes, your vigilance must increase.</li>
                        <li><strong>Gestational History:</strong> For women, previous gestational diabetes permanently elevates long-term risk.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Next Steps */}
              <section>
                <Card className="not-prose bg-blue-600 text-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertCircle className="w-6 h-6" /> What To Do If Your Score Is High
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-blue-50">
                    <p>
                      Scoring a 5 or above does not mean you have diabetes right now—it means you have a clinical profile that is statistically at risk. Prediabetes is highly reversible if caught early.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 font-medium">
                      <li>Schedule an appointment with your primary care physician.</li>
                      <li>Ask for an A1C test or Fasting Plasma Glucose test.</li>
                      <li>Assess your current diet and look to reduce processed sugars and simple carbohydrates.</li>
                      <li>Incorporate daily movement—even 20 minutes a day makes a massive difference.</li>
                    </ol>
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* FAQs */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
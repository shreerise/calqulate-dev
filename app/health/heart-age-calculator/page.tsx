import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import HeartAgeCalculator from "@/components/calculators/heart-age-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  TrendingDown, 
  Timer, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Zap,
  User,
  ShieldCheck,
  Cigarette,
  Scale,
  ArrowDownCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Heart Age Calculator: Estimate Your Cardiovascular Risk Age",
  description:
    "Find out if your heart is older or younger than your actual age. Use our heart age calculator based on blood pressure, cholesterol, and lifestyle factors to assess cardiovascular risk.",
  keywords:
    "heart age calculator, cardiac age calculator, cardiovascular age, heart health test, ASCVD risk, calculate heart age, heart rate by age, reduce heart age",
}

const faqs = [
  {
    question: "What is a heart age calculator?",
    answer:
      "It estimates how old your heart is based on cardiovascular risk factors like blood pressure, cholesterol, and lifestyle habits compared to a healthy person of your same chronological age.",
  },
  {
    question: "Is heart age scientifically accurate?",
    answer:
      "Yes. It is based on validated clinical models like the ASCVD (Atherosclerotic Cardiovascular Disease) and Framingham risk scores used by medical professionals globally.",
  },
  {
    question: "Can heart age be lower than real age?",
    answer:
      "Yes—and that indicates excellent heart health. It means your risk factors are lower than the average person of your age.",
  },
  {
    question: "How often should I calculate my heart age?",
    answer:
      "It is recommended to check once a year or after making major lifestyle changes, such as quitting smoking or improving your diet and exercise routine.",
  },
  {
    question: "Is this the same as the CDC heart age calculator?",
    answer:
      "Conceptually yes. Most reliable heart age tools, including ours, use similar population datasets and risk models to provide an estimate of cardiovascular health.",
  },
  {
    question: "Does heart age predict heart attacks?",
    answer:
      "It estimates your statistical risk over a period of time (usually 10 years). It is a screening tool for awareness and prevention, not a certain prediction of a medical event.",
  },
]

export default function HeartAgeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Heart Age Calculator"
        description="Estimate your cardiovascular age based on risk factors like blood pressure, BMI, and cholesterol. Understand your heart health risk today."
        url="https://calqulate.net/health/heart-age-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Heart Age Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Your heart age estimates how old your cardiovascular system is compared to your actual age. 
                It is a powerful way to understand your future risk of heart disease or stroke.
              </p>
              <p className="text-base text-green-600 mt-3 font-semibold">
                Your blood vessels, cholesterol, and lifestyle matter more than your birthday.
              </p>
            </div>

            {/* Calculator Component */}
            <HeartAgeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Why it matters */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-red-600" />
                  Why Heart Age Matters More Than Your Chronological Age
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  You can be 35 years old with a heart age of 50, or 55 years old with a heart age of 40. 
                  Unlike your real age, your heart age is a reflection of your biological health. It helps answer:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Vessel Health', icon: Activity },
                    { label: 'Stroke Risk', icon: Zap },
                    { label: 'Longevity', icon: Timer },
                    { label: 'Prevention', icon: ShieldCheck }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
                      <item.icon className="w-6 h-6 text-red-600 mb-2" />
                      <span className="text-xs font-bold text-red-900">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-700 font-bold text-center">
                  👉 Heart age is often more motivating for lifestyle change than a simple risk percentage.
                </p>
              </section>

              {/* How It Works Section */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <Heart className="w-5 h-5" />
                      How the Heart Age Calculation Works
                    </CardTitle>
                    <CardDescription className="text-green-50">Based on validated cardiovascular risk models (ASCVD/CDC).</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 bg-white space-y-6">
                    <p className="text-gray-700">
                      The calculator compares your cardiovascular risk profile to a &quot;healthy reference person&quot; of the same age and gender. It analyzes several key accelerators:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>Blood Pressure:</strong> Higher pressure strains the heart and arteries.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>Cholesterol:</strong> High LDL or low HDL contributes to plaque buildup.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>Diabetes:</strong> High blood sugar damages blood vessels over time.</span>
                        </li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>Smoking Status:</strong> Smoking is the fastest way to increase heart age.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>BMI:</strong> Excess weight increases the workload on your heart.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <span><strong>History:</strong> Family history and physical activity levels.</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Interpretation Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Interpreting Your Heart Age Result</h2>
                <div className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Heart Age Result</th>
                        <th className="px-4 py-3 text-left">What It Means</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-green-50/30">
                        <td className="px-4 py-3 font-bold">Lower than real age</td>
                        <td className="px-4 py-3">Excellent heart health; low risk.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">Same as real age</td>
                        <td className="px-4 py-3">Normal, average risk for your demographic.</td>
                      </tr>
                      <tr className="bg-yellow-50/30">
                        <td className="px-4 py-3 font-bold">+5 years</td>
                        <td className="px-4 py-3 text-yellow-800">Moderate risk; lifestyle changes recommended.</td>
                      </tr>
                      <tr className="bg-red-50/50">
                        <td className="px-4 py-3 font-bold text-red-600">+10 years or more</td>
                        <td className="px-4 py-3 text-red-700">High cardiovascular risk; consult a physician.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Note: A high heart age is not a diagnosis of heart failure—it is a marker for preventable risk.
                </p>
              </section>

              {/* Comparison Matrix */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <ArrowDownCircle className="w-5 h-5 text-red-600" /> ASCVD vs. Heart Age
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Both tools use the same data but present it differently:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">ASCVD Risk Score</span>
                        <span className="text-red-700 font-bold">% Chance of heart attack/stroke</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">Heart Age</span>
                        <span className="text-red-700 font-bold">Biological &quot;mileage&quot; of your heart</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-red-600" /> Max Heart Rate Formula
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 text-pretty">
                      Don&apos;t confuse <strong>Heart Age</strong> with <strong>Maximum Heart Rate</strong>.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                      <p className="text-xs uppercase text-gray-400 mb-1">Max HR Calculation</p>
                      <p className="text-lg font-mono font-bold text-red-600">220 − Your Age</p>
                      <p className="text-[10px] text-gray-500 mt-2 italic">Example: Age 40 → Max HR ≈ 180 bpm</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Checklist Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Is Your Heart Healthy? (Checklist)</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-gray-700">If you can check most of these boxes, your heart age is likely younger than your birthday:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Blood pressure &lt; 120/80</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Resting heart rate 60–80 bpm</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Non-smoker</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Active most days of the week</li>
                    </ul>
                  </div>
                  <div className="not-prose grid grid-cols-1 gap-3">
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                      <p className="text-sm font-bold text-orange-900 flex items-center gap-2">
                        <Cigarette className="w-4 h-4" /> Smoking Impact
                      </p>
                      <p className="text-xs text-orange-800 mt-1">Smoking is the #1 heart age accelerator. Quitting can reduce your heart age by years in just 6-12 months.</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                        <Scale className="w-4 h-4" /> Abdominal Fat
                      </p>
                      <p className="text-xs text-blue-800 mt-1">Waist circumference is often a better predictor of heart age than total weight or BMI.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reductions Section */}
              <section className="bg-green-500 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Can Heart Age Be Reduced?</h2>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Unlike your chronological age, your heart age is reversible. By addressing your risk factors, you can literally &quot;de-age&quot; your cardiovascular system.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Lower BP</p>
                    <p className="text-sm opacity-90">Reducing systolic by 10 mmHg helps significantly.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Movement</p>
                    <p className="text-sm opacity-90">30 mins of daily walking lowers risk scores.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Sleep</p>
                    <p className="text-sm opacity-90">7–8 hours of sleep regulates heart pressure.</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm font-bold">📉 Many people reduce their heart age by 5–10 years within one year of lifestyle changes.</p>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Take Control of Your Heart Health</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  The heart age calculator is a starting point, not a diagnosis. Use these insights to have a more informed conversation with your doctor and prioritize the habits that keep your heart young.
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
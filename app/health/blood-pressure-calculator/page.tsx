import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BloodPressureCalculator from "@/components/calculators/blood-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Heart, 
  Activity, 
  AlertCircle, 
  Stethoscope, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Clock,
  Zap
} from "lucide-react"

export const metadata: Metadata = {
  title: "Blood Pressure Calculator: Understand Your BP Readings & Levels",
  description:
    "Use our blood pressure calculator to classify your BP readings into levels like Normal, Elevated, or Hypertension. Learn how age and gender affect your BP.",
  keywords:
    "blood pressure calculator, BP level calculator, normal blood pressure by age, calculate blood pressure, high blood pressure range, systolic and diastolic meaning",
}

const faqs = [
  {
    question: "What is a blood pressure calculator?",
    answer:
      "A tool that classifies BP readings into health categories like Normal, Elevated, Stage 1, or Stage 2 Hypertension based on medical standards.",
  },
  {
    question: "How to calculate blood pressure?",
    answer:
      "Blood pressure cannot be calculated from a mathematical formula—it must be measured with a device like a digital monitor or manual sphygmomanometer.",
  },
  {
    question: "What is normal blood pressure by age?",
    answer:
      "Average BP rises slightly with age (from 110/70 in your 20s to 130/80 in your 60s), but medical definitions of high BP remain consistent across ages.",
  },
  {
    question: "What is a dangerous BP level?",
    answer:
      "Readings of 180/120 mmHg or higher are considered a hypertensive crisis and require immediate medical attention.",
  },
  {
    question: "Is BP different for men and women?",
    answer:
      "Yes. Women typically have lower baseline BP until menopause, after which risk levels tend to equalize or increase.",
  },
  {
    question: "How often should I check my blood pressure?",
    answer:
      "If your BP is normal, once every 1–2 months is usually sufficient. If you are high risk or have hypertension, you may need to check weekly or as advised by your doctor.",
  },
]

export default function BloodPressurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Blood Pressure Calculator"
        description="Classify your blood pressure readings instantly. Understand systolic and diastolic numbers and identify health risks."
        url="https://calqulate.net/health/blood-pressure-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Blood Pressure Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                A blood pressure calculator helps you understand your BP reading by classifying it into levels such as Normal, Elevated, or Hypertension.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                It does not just show numbers—it explains what those numbers mean for your health.
              </p>
            </div>

            {/* Calculator Component */}
            <BloodPressureCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Understanding BP */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  Understanding Blood Pressure
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Blood pressure is the force of blood pushing against artery walls when the heart pumps. It is expressed in two numbers: <b>Systolic / Diastolic (mmHg)</b>.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <p className="font-bold text-green-900 mb-1">Systolic (Top Number)</p>
                    <p className="text-sm text-green-800">The pressure in your arteries when your heart beats.</p>
                  </div>
                  <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <p className="font-bold text-green-900 mb-1">Diastolic (Bottom Number)</p>
                    <p className="text-sm text-green-800">The pressure in your arteries when your heart rests between beats.</p>
                  </div>
                </div>
              </section>

              {/* Measurement vs Calculation */}
              <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Blood Pressure Calculation Formula (Important Clarity)
                </h3>
                <p className="text-sm text-orange-800 font-bold mb-2 uppercase tracking-wide">How to Calculate Blood Pressure:</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  ⚠️ There is <b>NO mathematical formula</b> to calculate blood pressure from age or weight. This is a major misconception. Blood pressure is <b>measured</b>, not calculated, using a digital monitor or manual sphygmomanometer.
                </p>
                <p className="text-sm text-gray-600 italic">
                  A blood pressure calculator formula is actually a classification system, not an equation.
                </p>
              </section>

              {/* BP Level Chart */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Pressure Calculator – BP Level Classification</h2>
                <Card className="not-prose border-green-200 overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">BP Level</th>
                        <th className="px-6 py-4 text-left font-bold">Systolic (mmHg)</th>
                        <th className="px-6 py-4 text-left font-bold">Diastolic (mmHg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 font-medium">Low BP</td><td className="px-6 py-4">&lt; 90</td><td className="px-6 py-4">&lt; 60</td></tr>
                      <tr className="bg-green-50/50"><td className="px-6 py-4 font-bold text-green-700">Normal</td><td className="px-6 py-4">90–119</td><td className="px-6 py-4">60–79</td></tr>
                      <tr><td className="px-6 py-4 font-medium text-orange-600">Elevated</td><td className="px-6 py-4">120–129</td><td className="px-6 py-4">&lt; 80</td></tr>
                      <tr className="bg-orange-50/30"><td className="px-6 py-4 font-medium text-orange-700">High BP (Stage 1)</td><td className="px-6 py-4">130–139</td><td className="px-6 py-4">80–89</td></tr>
                      <tr><td className="px-6 py-4 font-bold text-red-600">High BP (Stage 2)</td><td className="px-6 py-4">≥ 140</td><td className="px-6 py-4">≥ 90</td></tr>
                      <tr className="bg-red-600 text-white"><td className="px-6 py-4 font-bold">Hypertensive Crisis</td><td className="px-6 py-4">≥ 180</td><td className="px-6 py-4">≥ 120</td></tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-sm text-center text-gray-500 italic">👉 This classification powers every blood pressure calculator online.</p>
              </section>

              {/* BP By Age */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Normal Blood Pressure by Age
                </h2>
                <p className="text-gray-700 mb-6">Average readings rise slightly with age, but the medical definition of high BP remains the same.</p>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <Card className="not-prose border-green-100 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-green-50 text-green-900">
                        <tr>
                          <th className="px-6 py-3 text-left">Age Group</th>
                          <th className="px-6 py-3 text-left">Typical Healthy BP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-6 py-3">18–29</td><td className="px-6 py-3 font-bold text-green-700">~110/70</td></tr>
                        <tr><td className="px-6 py-3">30–39</td><td className="px-6 py-3 font-bold text-green-700">~115/75</td></tr>
                        <tr><td className="px-6 py-3">40–49</td><td className="px-6 py-3 font-bold text-green-700">~120/80</td></tr>
                        <tr><td className="px-6 py-3">50–59</td><td className="px-6 py-3 font-bold text-green-700">~125/80</td></tr>
                        <tr><td className="px-6 py-3">60+</td><td className="px-6 py-3 font-bold text-green-700">~130/80</td></tr>
                      </tbody>
                    </table>
                  </Card>
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 uppercase tracking-widest text-sm">How to Use This Guidance:</h4>
                    <ul className="space-y-3">
                      <li className="flex gap-2 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> Compare your reading to age trends.</li>
                      <li className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        Understand long-term{" "}
                        <Link
                          href="/health/ascvd-risk-calculator"
                          className="font-medium hover:underline hover:text-green-700 transition-colors"
                        >
                          cardiovascular risk
                        </Link>.
                      </li>
                      <li className="flex gap-2 text-sm text-red-600 font-bold"><AlertCircle className="w-4 h-4 shrink-0" /> Do NOT ignore high readings because of age. A BP of 140/90 is still high at age 65.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Gender Differences */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:border-green-300 transition-colors">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <Users className="text-green-600" /> Normal Range for Men
                  </h3>
                  <p className="text-sm font-bold text-green-700">Ideal: 110–120 / 70–80 mmHg</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Risk increases faster for men due to factors like smoking, alcohol, and visceral fat storage around the abdomen.</p>
                </div>
                <div className="space-y-4 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:border-green-300 transition-colors">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <Users className="text-green-600" /> Normal Range for Women
                  </h3>
                  <p className="text-sm font-bold text-green-700">Ideal: 105–115 / 65–75 mmHg</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Hormonal changes during pregnancy and menopause significantly affect BP. Women may develop high BP later in life, but complications can be severe.</p>
                </div>
              </section>

              {/* Silent Killer Note */}
              <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" /> High Blood Pressure – The Silent Killer
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="font-bold text-red-800">Stage 1: 130–139 / 80–89</p>
                    <p className="font-bold text-red-800">Stage 2: ≥ 140 / 90</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    High BP is often called the &quot;silent killer&quot; because there are <b>no early symptoms</b>. Damage to your heart and arteries happens quietly over time without you feeling it.
                  </p>
                </div>
              </section>

              {/* How to measure */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                  How to Measure Blood Pressure at Home
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase text-gray-500">Step-by-Step Protocol:</h4>
                    <div className="space-y-3">
                      {[
                        "Sit quietly for 5 minutes before measuring.",
                        "Feet flat on the floor, back supported.",
                        "Arm supported at heart level.",
                        "No caffeine or smoking 30 min before.",
                        "Take 2 readings, 1 minute apart, and average them."
                      ].map((step, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold shrink-0">{i+1}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase text-red-500">Common Mistakes (Avoid These):</h4>
                    <ul className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">❌ Talking during measurement</li>
                      <li className="flex items-center gap-2">❌ Crossed legs</li>
                      <li className="flex items-center gap-2">❌ Cuff over clothing</li>
                      <li className="flex items-center gap-2">❌ Measuring immediately after exercise</li>
                    </ul>
                    <p className="text-xs text-orange-600 font-medium p-3 bg-orange-50 rounded-lg">
                      Note: These errors can raise your readings artificially by 10–20 mmHg.
                    </p>
                  </div>
                </div>
              </section>

              {/* Trends vs Numbers */}
              <section className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  BP Level vs One-Time Reading
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  One high reading does not automatically mean you have hypertension. 
                  Diagnosis requires <b>multiple readings on different days</b>. 
                  Trends matter far more than single numbers.
                </p>

                <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'Age over 35' },
                    { label: 'Diabetes', href: '/health/diabetes-risk-calculator' },
                    { label: 'Overweight', href: '/health/bmi-calculator' },
                    { label: 'Family History' },
                    { label: 'Poor Sleep', href: '/health/sleep-debt-calculator' }
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100"
                    >
                      Monitor Regularly if:{' '}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="underline hover:text-green-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                    </span>
                  ))}
                </div>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Heart Health Matters</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Knowledge is the first step in prevention. By tracking your blood pressure and understanding what the levels mean, you are taking a proactive step toward a longer, healthier life.
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
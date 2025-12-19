import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import MapCalculator from "@/components/calculators/mean-arterial-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  AlertTriangle, 
  Calculator as CalculatorIcon, 
  BookOpen, 
  ShieldCheck, 
  Info,
  TrendingUp,
  Brain
} from "lucide-react"

export const metadata: Metadata = {
  title: "Mean Arterial Pressure (MAP) Calculator: Gold Standard Clinical Perfusion Guide",
  description:
    "Professional Mean Arterial Pressure (MAP) Calculator. Learn the formula, specialized clinical targets for sepsis and stroke, and how to calculate mean arterial pressure from blood pressure accurately.",
  keywords:
    "map calculator, mean arterial pressure calculator, calculate mean arterial pressure, how to calculate mean arterial pressure, mean arterial pressure formula, map formula, calculate mean arterial pressure from blood pressure, mean arterial pressure calculation, formula for calculating mean arterial pressure, how do you calculate mean arterial pressure, calculating mean arterial pressure, how is mean arterial pressure calculated, how to calculate mean arterial pressure from bpr",
}

const faqs = [
  {
    question: "How do I use this map calculator to check my organ perfusion?",
    answer:
      "To use our map calculator, simply enter your Systolic Blood Pressure (top number) and Diastolic Blood Pressure (bottom number). The tool instantly calculates your MAP in mmHg. A result between 70-100 mmHg is generally considered normal for healthy adults, indicating that your vital organs are receiving sufficient blood flow and oxygen.",
  },
  {
    question: "What is the standard mean arterial pressure formula?",
    answer:
      "The gold-standard mean arterial pressure formula is MAP = [SBP + (2 × DBP)] / 3. This formula is weighted because at a normal heart rate, the heart spends two-thirds of the cardiac cycle in diastole (rest/filling phase) and only one-third in systole (contraction phase).",
  },
  {
    question: "How is mean arterial pressure calculated in a hospital vs. home?",
    answer:
      "In a hospital, MAP is often calculated automatically by an oscillometric monitor or measured directly via an invasive arterial line. At home, you can use our mean arterial pressure calculator by taking a reading with a digital cuff and inputting the SBP and DBP values. Understanding how to calculate mean arterial pressure from bpr (blood pressure readings) is essential for monitoring cardiovascular trends.",
  },
  {
    question: "Why does the map formula weight Diastole twice as much as Systole?",
    answer:
      "Calculating mean arterial pressure requires weighting because of the '2/3 rule' of the cardiac cycle. Since the heart spends significantly more time resting and filling with blood (diastole) than it does pumping it out (systole), the diastolic value has a greater impact on the average pressure maintained in the arteries.",
  },
  {
    question: "What is the target MAP for a patient with sepsis?",
    answer:
      "According to the Surviving Sepsis Campaign, the recommended target for mean arterial pressure calculation in septic shock is ≥65 mmHg. This is the minimum pressure believed necessary to prevent acute kidney injury and ensure adequate tissue oxygenation in critically ill patients.",
  },
  {
    question: "Does pulse pressure affect my MAP calculation?",
    answer:
      "Yes. Pulse pressure is the difference between SBP and DBP. An alternative formula for calculating mean arterial pressure is MAP = DBP + 1/3(Pulse Pressure). If you have a very wide pulse pressure (stiff arteries) or a very narrow one (heart failure), your MAP reading will reflect these hemodynamic changes.",
  },
]

export default function MapCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Mean Arterial Pressure (MAP) Calculator"
        description="The ultimate clinical resource for calculating mean arterial pressure. Includes sepsis targets, stroke protocols, and detailed hemodynamic analysis."
        url="https://calqulate.net/health/map-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Mean Arterial Pressure (MAP) Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Beyond standard blood pressure, <strong>Mean Arterial Pressure (MAP)</strong> is the most critical 
                metric for assessing organ perfusion. Use our professional <strong>map calculator</strong> to 
                ensure vital blood flow to the brain, kidneys, and heart.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Clinical Grade
                </span>
                <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <TrendingUp className="w-3 h-3" /> Updated for 2025
                </span>
              </div>
            </div>

            {/* Interactive Calculator */}
            <MapCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* SECTION 1: What is MAP? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is Mean Arterial Pressure Calculation?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Mean Arterial Pressure (MAP) is the average pressure in a person&apos;s arteries during one complete cardiac cycle. 
                  While your <strong>systolic blood pressure</strong> measures the peak pressure during a heartbeat, MAP is widely 
                  considered a better indicator of how well your vital organs are being &quot;perfused&quot; (receiving blood and oxygen).
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Clinicians use the <strong>mean arterial pressure calculator</strong> to determine if a patient has enough hemodynamic 
                  pressure to push blood through the tiny capillaries in the kidneys, brain, and coronary arteries. Without a sufficient 
                  MAP, tissues begin to suffer from ischemia (lack of oxygen), leading to organ failure.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm rounded-2xl bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-blue-500" />
                      The Gold-Standard MAP Formulas
                    </CardTitle>
                    <CardDescription>
                      There are two primary ways to <strong>calculate mean arterial pressure</strong> depending on the data you have.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <div className="p-4 bg-white rounded-lg border">
                       <p className="font-bold text-blue-700">1. The Standard Weighted Method:</p>
                       <code className="text-xl">MAP = [SBP + (2 × DBP)] / 3</code>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                       <p className="font-bold text-blue-700">2. The Pulse Pressure Method:</p>
                       <code className="text-xl">MAP = DBP + 1/3(SBP - DBP)</code>
                    </div>
                  </CardContent>
                </Card>
              </section>    

              {/* SECTION 2: The Physiology of the 2/3 Rule */}
              <section>
                <h2 className="mb-1font-semibold text-xl">The Physiology: Why Diastole Counts Double</h2>
                <p className="mb-4">
                  When you <strong>calculate mean arterial pressure</strong>, you notice that the Diastolic BP is multiplied by two. 
                  This is not a mathematical quirk; it is based on human physiology. 
                </p>
                <p className="mb-4">
                  At a normal resting heart rate (60–90 bpm), your heart spends approximately <strong>66% of its time in Diastole</strong> 
                  (the filling phase) and only <strong>33% in Systole</strong> (the pumping phase). Therefore, the average pressure 
                  over time is much closer to the Diastolic value. 
                </p>
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <Info className="w-6 h-6 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800 italic">
                    <strong>Note for Clinicians:</strong> In patients with <strong>Tachycardia</strong> (heart rate {'>'}120 bpm), 
                    the heart spends less time in diastole. In these cases, the standard <strong>map formula</strong> becomes slightly less accurate 
                    as the ratio between systole and diastole nears 1:1.
                  </p>
                </div>
              </section>

              {/* SECTION 3: Clinical Range Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>MAP Ranges & Clinical Targets</CardTitle>
                    <CardDescription>
                      How clinicians interpret your <strong>mean arterial pressure calculation</strong> results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border px-4 py-2 text-left">MAP (mmHg)</th>
                            <th className="border px-4 py-2 text-left">Status</th>
                            <th className="border px-4 py-2 text-left">Action / Guideline</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-bold text-red-600">&lt; 60</td>
                            <td className="border px-4 py-2">Critical Low</td>
                            <td className="border px-4 py-2">High risk of organ failure; urgent intervention (fluids/pressors).</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold text-orange-500">60 - 65</td>
                            <td className="border px-4 py-2">Low Borderline</td>
                            <td className="border px-4 py-2">Minimum threshold for sepsis management (SSC Guidelines).</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold text-green-600">70 - 100</td>
                            <td className="border px-4 py-2">Normal Range</td>
                            <td className="border px-4 py-2">Ideal for brain, kidney, and heart perfusion.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-bold text-blue-600">&gt; 105</td>
                            <td className="border px-4 py-2">High (Hypertensive)</td>
                            <td className="border px-4 py-2">Risk of vascular damage, stroke, or heart muscle hypertrophy.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* SECTION 4: Specialized Protocols */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Specialized Protocols: When MAP Targets Change</h2>
                <p className="mb-4">
                  Search intent for <strong>how to calculate mean arterial pressure</strong> often comes from critical care students. 
                  It is vital to understand that &quot;Normal&quot; changes based on the diagnosis:
                </p>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Brain className="w-5 h-5 text-purple-500" /> Neuro & Stroke Targets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      In ischemic stroke or head injury, doctors may target a higher MAP (e.g., 85–90 mmHg). 
                      This ensures <strong>Cerebral Perfusion Pressure (CPP)</strong> remains high enough to overcome 
                      intracranial swelling.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <HeartPulse className="w-5 h-5 text-red-500" /> Sepsis Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      The <strong>Surviving Sepsis Campaign</strong> mandates a MAP goal of ≥65 mmHg. Clinicians titrate 
                      vasopressors like Norepinephrine based on the <strong>map calculator</strong> result to maintain this limit.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* SECTION 5: The Pulse Pressure Connection */}
              <section>
                <h2 className="mb-2 font-semibold">The Pulse Pressure Connection</h2>
                <p className="mb-3">
                  Pulse Pressure is the numeric difference between SBP and DBP (e.g., 120 - 80 = 40). 
                  Integrating this into your <strong>mean arterial pressure calculation</strong> provides deeper insights:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Wide Pulse Pressure ({'>'}60 mmHg):</strong> Often seen in arterial stiffness (aging) or aortic regurgitation. This raises the MAP significantly.</li>
                  <li><strong>Narrow Pulse Pressure ({'<'}25 mmHg):</strong> Can indicate heart failure, blood loss, or cardiac tamponade. A low MAP with a narrow pulse pressure is a major clinical warning sign.</li>
                </ul>
              </section>

              {/* SECTION 6: Invasive vs Non-Invasive */}
              <section>
                <Card className="not-prose bg-muted/40 border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5" />
                      Invasive vs. Non-Invasive MAP
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      <strong>Non-Invasive (NIBP):</strong> This is what you do at home or with a standard cuff. 
                      The <strong>map formula</strong> is a mathematical estimate.
                    </p>
                    <p>
                      <strong>Invasive (Art-Line):</strong> In the ICU, a catheter is placed in the radial artery. 
                      The monitor calculates &quot;True MAP&quot; by finding the <strong>Area Under the Curve (AUC)</strong> 
                      of the real-time pressure wave. 
                    </p>
                    <p className="font-medium text-blue-800">
                      Why does this matter? For patients with very low blood pressure, the manual formula can sometimes 
                      overestimate the MAP, making the arterial line the gold standard for accuracy.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* SECTION 7: Home Accuracy Guide */}
              <section>
                <h2 className="mb-4 text-xl font-bold">How to Calculate Mean Arterial Pressure from BPR at Home</h2>
                <p className="mb-4">
                  To get an accurate result from the <strong>mean arterial pressure calculator</strong> using home equipment, 
                  follow these professional tips:
                </p>
                <div className="grid md:grid-cols-3 gap-4 not-prose">
                  <div className="p-4 bg-white border rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm mb-1">Arm Position</h4>
                    <p className="text-xs text-gray-600">Ensure your arm is at heart level. If your arm is too low, the MAP will be falsely high.</p>
                  </div>
                  <div className="p-4 bg-white border rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm mb-1">Cuff Size</h4>
                    <p className="text-xs text-gray-600">A cuff that is too small will compress the artery too much, resulting in an inaccurate SBP/DBP.</p>
                  </div>
                  <div className="p-4 bg-white border rounded-xl shadow-sm">
                    <h4 className="font-bold text-sm mb-1">Rest Period</h4>
                    <p className="text-xs text-gray-600">Sit quietly for 5 minutes before measuring to avoid &apos;White Coat Hypertension&apos; affecting your MAP.</p>
                  </div>
                </div>
              </section>

              {/* SECTION 8: Summary Comparison */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">MAP vs. Systolic Blood Pressure: Which is Better?</h2>
                <p className="mb-4">
                   While both are important, they serve different purposes in your health journey:
                </p>
                <div className="overflow-x-auto not-prose">
                  <table className="w-full text-sm border">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="border p-3 text-left">Metric</th>
                        <th className="border p-3 text-left">Best Used For...</th>
                        <th className="border p-3 text-left">Why?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-bold">Systolic BP</td>
                        <td className="border p-3">Stroke & Heart Attack Risk</td>
                        <td className="border p-3">Measures the peak &quot;shock&quot; to vessel walls.</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-bold">MAP</td>
                        <td className="border p-3">Organ Perfusion & Sepsis</td>
                        <td className="border p-3">Measures the steady flow of blood to organs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Final Takeaway */}
              <section className=" p-8 rounded-3xl text-center">
                <h2 className="text-2xl font-bold mb-4">Monitor Your Perfusion with Precision</h2>
                <p className="max-w-2xl mx-auto mb-6">
                  Understanding <strong>how do you calculate mean arterial pressure</strong> is the first step toward 
                  better hemodynamic awareness. Whether you are in the <strong>UK, USA, or UAE</strong>, 
                  use this <strong>map calculator</strong> as your primary tool for ensuring tissue health.
                </p>
                <section className="bg-blue-50 p-6 rounded-lg text-sm text-blue-900 mt-8">
                    <p className="font-bold mb-2">Medical Disclaimer:</p>
                    <p>This tool is for educational purposes and is not a substitute for professional medical advice, 
                  diagnosis, or treatment.</p>
                </section>
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
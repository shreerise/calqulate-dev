import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import MAPCalculator from "@/components/calculators/mean-arterial-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Heart,
  Activity,
  ShieldCheck,
  Stethoscope,
  Info,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Brain,
  Droplets,
  ArrowRight,
  Clock,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Mean Arterial Pressure Calculator: MAP Formula & Normal Range | Clinical Tool",
  description:
    "Calculate mean arterial pressure (MAP) instantly with our clinical-grade MAP calculator. Uses the standard MAP formula [SBP + (2 × DBP)] / 3. Check if your MAP is in the normal range (70-100 mmHg).",
  keywords:
    "mean arterial pressure calculator, map calculator, mean arterial pressure formula, map blood pressure calculator, calculate map, mean arterial pressure calculation, normal mean arterial pressure, map bp calculator",
}

// Long-tail GSC queries converted to FAQs for low-hanging fruit capture
const faqs = [
  {
    question: "How do you calculate mean arterial pressure?",
    answer:
      "To calculate mean arterial pressure, use the standard MAP formula: MAP = [SBP + (2 × DBP)] / 3. For example, if your blood pressure is 120/80 mmHg, your MAP calculation would be [120 + (2 × 80)] / 3 = 93.3 mmHg. The diastolic pressure is weighted twice because the heart spends about 2/3 of its cycle in diastole.",
  },
  {
    question: "What is the normal mean arterial pressure range?",
    answer:
      "Normal mean arterial pressure ranges from 70 to 100 mmHg. A MAP below 60 mmHg is considered critical and may indicate inadequate organ perfusion. A MAP above 105 mmHg suggests hypertension and increased cardiovascular risk. The target MAP for most adults is between 70-100 mmHg.",
  },
  {
    question: "What is the mean arterial pressure formula?",
    answer:
      "There are two accepted mean arterial pressure formulas: (1) The weighted method: MAP = [SBP + (2 × DBP)] / 3, and (2) The pulse pressure method: MAP = DBP + 1/3(SBP - DBP). Both formulas give the same result. Clinicians use these to estimate the average arterial pressure during one cardiac cycle.",
  },
  {
    question: "How do I calculate MAP from blood pressure readings?",
    answer:
      "To calculate MAP from your blood pressure, take your systolic (top number) and diastolic (bottom number) readings. Apply the formula: MAP = [Systolic + (2 × Diastolic)] / 3. Example: BP of 130/85 gives MAP = [130 + (2 × 85)] / 3 = [130 + 170] / 3 = 100 mmHg.",
  },
  {
    question: "Why is diastolic pressure multiplied by 2 in the MAP calculation?",
    answer:
      "Diastolic pressure is multiplied by 2 in the MAP calculation because at a normal resting heart rate (60-90 bpm), the heart spends approximately 66% of each cardiac cycle in diastole (filling phase) and only 33% in systole (pumping phase). This 2:1 ratio reflects the actual time-weighted average pressure in your arteries.",
  },
  {
    question: "What does a MAP blood pressure reading tell you?",
    answer:
      "A MAP blood pressure reading tells you the average pressure pushing blood through your arteries during one complete heartbeat. Unlike systolic BP (peak pressure) or diastolic BP (resting pressure), MAP indicates whether your vital organs are receiving adequate blood flow. It is the primary metric for assessing organ perfusion in clinical settings.",
  },
  {
    question: "How is mean arterial pressure calculated in hospitals vs at home?",
    answer:
      "At home, MAP is calculated using the mathematical formula from your cuff readings: [SBP + (2 × DBP)] / 3. In hospitals (ICU settings), an arterial line catheter directly measures the true MAP by calculating the area under the real-time pressure waveform. The arterial line method is more accurate, especially in patients with very low blood pressure.",
  },
  {
    question: "What is the target MAP for sepsis patients?",
    answer:
      "The Surviving Sepsis Campaign guidelines mandate a target MAP of at least 65 mmHg for sepsis patients. Clinicians titrate vasopressors like norepinephrine to maintain this minimum threshold. Some patients may require higher targets (70-85 mmHg) based on individual organ perfusion needs.",
  },
]

export default function MAPCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Mean Arterial Pressure Calculator"
        description="Calculate your mean arterial pressure (MAP) using the clinical standard formula. Determine if your MAP is within the normal range for healthy organ perfusion."
        url="https://calqulate.net/health/mean-arterial-pressure-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero - Primary keyword "mean arterial pressure calculator" in H1 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-4">
                <Stethoscope className="w-4 h-4" />
                Clinical Grade Tool • Updated 2025
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Mean Arterial Pressure Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Use our MAP calculator to instantly calculate your mean arterial pressure from systolic and diastolic readings. Check if your MAP is within the normal range (70-100 mmHg) for healthy organ perfusion.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Beyond standard blood pressure, MAP is the critical metric clinicians use to assess whether your brain, kidneys, and heart are receiving adequate blood flow.
              </p>
            </div>

            {/* Calculator Component - Above the fold for user intent */}
            <MAPCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* What is MAP - Primary informational intent */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  What is Mean Arterial Pressure?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Mean arterial pressure (MAP) is the average pressure in your arteries during one complete cardiac cycle. While systolic blood pressure measures peak pressure during a heartbeat, <strong>MAP is widely considered a better indicator of organ perfusion</strong> — how well your vital organs receive blood and oxygen.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Clinicians use the mean arterial pressure calculation to determine if a patient has enough hemodynamic pressure to push blood through the tiny capillaries in the kidneys, brain, and coronary arteries. Without sufficient MAP, tissues suffer from ischemia (oxygen deprivation), potentially leading to organ failure.
                </p>
                
                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-amber-800 font-medium flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <span><strong>Clinical Insight:</strong> A MAP below 60 mmHg for extended periods can cause irreversible organ damage. This is why MAP — not just systolic or diastolic BP — is the primary target in critical care settings.</span>
                  </p>
                </div>
              </section>

              {/* MAP Formula Section - High search volume keyword cluster */}
              <section>
                <Card className="border-red-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-red-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-800">
                      <Calculator className="w-5 h-5" />
                      The Mean Arterial Pressure Formula
                    </CardTitle>
                    <CardDescription className="text-red-700/80">
                      Two clinically accepted methods to calculate MAP
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Formula 1 */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">1. Standard Weighted Method</p>
                        <div className="text-2xl font-mono font-bold text-red-700 text-center py-4 bg-white rounded-lg border-2 border-red-200">
                          MAP = [SBP + (2 × DBP)] / 3
                        </div>
                        <p className="text-sm text-gray-600 mt-3">Most commonly used in clinical practice and home monitoring.</p>
                      </div>
                      
                      {/* Formula 2 */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">2. Pulse Pressure Method</p>
                        <div className="text-2xl font-mono font-bold text-red-700 text-center py-4 bg-white rounded-lg border-2 border-red-200">
                          MAP = DBP + ⅓(SBP - DBP)
                        </div>
                        <p className="text-sm text-gray-600 mt-3">Mathematically equivalent; useful when pulse pressure is already known.</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <p className="font-semibold text-blue-800 mb-2">Example MAP Calculation:</p>
                      <p className="text-blue-700">Blood Pressure: 120/80 mmHg</p>
                      <p className="text-blue-700">MAP = [120 + (2 × 80)] / 3 = [120 + 160] / 3 = <strong>93.3 mmHg</strong></p>
                      <p className="text-sm text-blue-600 mt-2">✓ This is within the normal MAP range (70-100 mmHg)</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Why Diastole Counts Double - Addresses "why" queries */}
              <section className="py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-red-600" />
                  Why is Diastolic Pressure Weighted Twice?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you calculate mean arterial pressure, you'll notice diastolic BP is multiplied by two. This isn't a mathematical quirk — it's based on human cardiac physiology.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <div className="text-4xl font-bold text-red-600 mb-2">66%</div>
                    <p className="font-semibold text-gray-800">Time in Diastole</p>
                    <p className="text-sm text-gray-600">The filling phase when the heart relaxes</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <div className="text-4xl font-bold text-red-600 mb-2">33%</div>
                    <p className="font-semibold text-gray-800">Time in Systole</p>
                    <p className="text-sm text-gray-600">The pumping phase when the heart contracts</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  At a normal resting heart rate (60-90 bpm), your heart spends approximately two-thirds of each cycle in diastole. Therefore, the average arterial pressure over time is mathematically closer to the diastolic value.
                </p>
                
                <div className="mt-4 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Note for Clinicians:</strong> In patients with tachycardia (heart rate &gt;120 bpm), the heart spends less time in diastole. The standard MAP formula becomes less accurate as the systole:diastole ratio approaches 1:1. Direct arterial line measurement is preferred in these cases.
                  </p>
                </div>
              </section>

              {/* Normal MAP Range Table - High-value keyword "normal mean arterial pressure" */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-red-600" />
                  Normal Mean Arterial Pressure Ranges
                </h2>
                <p className="mb-4 text-gray-700">Clinical interpretation of your mean arterial pressure calculation results:</p>
                
                <Card className="not-prose overflow-hidden border-red-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-red-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">MAP (mmHg)</th>
                        <th className="px-6 py-4 text-left font-bold">Status</th>
                        <th className="px-6 py-4 text-left font-bold">Clinical Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-red-50">
                        <td className="px-6 py-4 font-bold text-red-700">&lt; 60</td>
                        <td className="px-6 py-4 font-semibold text-red-700">⚠️ Critical Low</td>
                        <td className="px-6 py-4">High risk of organ failure; urgent intervention required (fluids/vasopressors)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-amber-700">60 - 65</td>
                        <td className="px-6 py-4 font-semibold text-amber-700">⚡ Low Borderline</td>
                        <td className="px-6 py-4">Minimum threshold for sepsis management per Surviving Sepsis Campaign</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-700">70 - 100</td>
                        <td className="px-6 py-4 font-semibold text-green-700">✓ Normal Range</td>
                        <td className="px-6 py-4">Ideal for brain, kidney, and heart perfusion</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-orange-700">&gt; 105</td>
                        <td className="px-6 py-4 font-semibold text-orange-700">📈 High (Hypertensive)</td>
                        <td className="px-6 py-4">Increased risk of vascular damage, stroke, cardiac hypertrophy</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Specialized Protocols - E-E-A-T expertise signals */}
              <section className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-red-600" />
                  When MAP Targets Change: Specialized Protocols
                </h2>
                <p className="mb-6 text-gray-700">Understanding that "normal" MAP changes based on clinical context is essential for healthcare professionals:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-white border border-gray-200 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-gray-800">Neuro & Stroke Targets</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      In ischemic stroke or traumatic brain injury, clinicians often target a <strong>higher MAP (85-90 mmHg)</strong> to maintain adequate Cerebral Perfusion Pressure (CPP) and overcome intracranial swelling.
                    </p>
                  </div>
                  
                  <div className="p-5 bg-white border border-gray-200 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-gray-800">Sepsis Management</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      The Surviving Sepsis Campaign mandates a <strong>MAP goal of ≥65 mmHg</strong>. Clinicians titrate vasopressors like norepinephrine based on MAP calculator results to maintain this threshold.
                    </p>
                  </div>
                </div>
              </section>

              {/* Pulse Pressure Connection - Semantic depth */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-red-600" />
                  The Pulse Pressure Connection
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pulse Pressure is the difference between systolic and diastolic BP (e.g., 120 - 80 = 40 mmHg). Integrating this into your mean arterial pressure calculation provides deeper cardiovascular insights:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 border-l-4 border-amber-500 bg-amber-50 rounded-r-xl">
                    <h4 className="font-bold text-amber-800 mb-2">Wide Pulse Pressure (&gt;60 mmHg)</h4>
                    <p className="text-sm text-amber-700">Often indicates arterial stiffness (common in aging) or aortic valve regurgitation. This typically elevates MAP significantly.</p>
                  </div>
                  <div className="p-5 border-l-4 border-red-500 bg-red-50 rounded-r-xl">
                    <h4 className="font-bold text-red-800 mb-2">Narrow Pulse Pressure (&lt;25 mmHg)</h4>
                    <p className="text-sm text-red-700">May indicate heart failure, significant blood loss, or cardiac tamponade. Low MAP with narrow pulse pressure is a major clinical warning sign.</p>
                  </div>
                </div>
              </section>

              {/* Invasive vs Non-Invasive - Addresses hospital vs home query */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-red-600" />
                  MAP Calculation: Hospital vs Home
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50 pb-3">
                      <CardTitle className="text-lg text-blue-800">Non-Invasive (Home/Clinic)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          Standard blood pressure cuff measurement
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          MAP calculated using the formula
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          Mathematical estimate (highly accurate in most cases)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardHeader className="bg-purple-50 pb-3">
                      <CardTitle className="text-lg text-purple-800">Invasive (ICU Art-Line)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                          Arterial catheter placed in radial artery
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                          Calculates "True MAP" from pressure waveform
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                          Gold standard for critically ill patients
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <p className="mt-4 text-sm text-gray-600 italic">
                  Note: For patients with very low blood pressure, the manual formula may slightly overestimate MAP. Arterial line measurement provides the most accurate reading in these scenarios.
                </p>
              </section>

              {/* How to Get Accurate Readings - Practical user value */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Info className="w-5 h-5" />
                      How to Get Accurate MAP Readings at Home
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      Follow these professional tips for the most accurate results
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                        <h4 className="font-bold text-gray-800 mb-2">Arm Position</h4>
                        <p className="text-sm text-gray-600">Keep your arm at heart level. If too low, MAP will read falsely high.</p>
                      </div>
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                        <h4 className="font-bold text-gray-800 mb-2">Cuff Size</h4>
                        <p className="text-sm text-gray-600">A cuff that's too small will over-compress the artery, skewing readings.</p>
                      </div>
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                        <h4 className="font-bold text-gray-800 mb-2">Rest First</h4>
                        <p className="text-sm text-gray-600">Sit quietly for 5 minutes to avoid "white coat hypertension" effects.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* MAP vs Systolic BP - Comparison content for semantic relevance */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">MAP vs Systolic Blood Pressure: Which Matters More?</h2>
                <p className="mb-4 text-gray-700">Both metrics serve different clinical purposes:</p>
                
                <Card className="not-prose overflow-hidden border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Metric</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Best Used For</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800">Why?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-700">Systolic BP</td>
                        <td className="px-6 py-4">Stroke & Heart Attack Risk</td>
                        <td className="px-6 py-4">Measures peak "shock" pressure against vessel walls</td>
                      </tr>
                      <tr className="bg-red-50/30">
                        <td className="px-6 py-4 font-bold text-red-700">MAP</td>
                        <td className="px-6 py-4">Organ Perfusion & Sepsis</td>
                        <td className="px-6 py-4">Measures steady blood flow delivery to organs</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <p className="mt-4 text-gray-700">
                  For everyday cardiovascular risk assessment, systolic BP remains important. However, <strong>MAP is the gold standard for ensuring your organs are receiving adequate oxygen and nutrients</strong> — especially in clinical and emergency settings.
                </p>
              </section>

              {/* Reliability Section - Trust signals */}
              <section className="bg-red-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  Why Trust Our MAP Calculator?
                </h2>
                <p className="mb-6 opacity-90">We built this calculator with clinical accuracy and user trust as priorities:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-red-200" />
                    <span>Uses the clinically validated MAP formula</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-red-200" />
                    <span>No data stored or tracked — complete privacy</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-red-200" />
                    <span>Clear explanations of the physiology</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-red-200" />
                    <span>No ads or misleading health claims</span>
                  </div>
                </div>
              </section>

              {/* Medical Disclaimer - E-E-A-T compliance */}
              <section className="border-2 border-dashed border-red-200 p-6 rounded-2xl bg-red-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-red-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5" /> Medical Disclaimer
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This mean arterial pressure calculator is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns. If you have symptoms of low blood pressure (dizziness, fainting) or high blood pressure (severe headache, chest pain), seek immediate medical attention.
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Monitor Your Complete Heart Health</h3>
                    <p className="text-red-100 max-w-md">
                      Now that you know your MAP, check your overall cardiovascular fitness with our Heart Rate Calculator.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/heart-rate-calculator">
                      Check Heart Rate Zones <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* FAQ Section - Long-tail keyword capture */}
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

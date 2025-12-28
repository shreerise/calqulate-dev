import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PulsePressureCalculator from "@/components/calculators/pulse-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  BookOpen, 
  Calculator as CalculatorIcon, 
  AlertCircle, 
  Globe, 
  Apple, 
  Dumbbell 
} from "lucide-react"

export const metadata: Metadata = {
  title: "Pulse Pressure Calculator: How to Calculate & Interpret Your Results",
  description:
    "Learn how to calculate pulse pressure and what it reveals about your heart health. Our pulse pressure calculator helps you identify narrow or wide ranges for better cardiovascular awareness.",
  keywords:
    "how to calculate pulse pressure, pulse pressure calculation, how do you calculate pulse pressure, pulse pressure calculator, calculate pulse pressure, how to calculate a pulse pressure, how to calculate the pulse pressure, how is pulse pressure calculated, calculate the pulse pressure, normal pulse pressure range, wide pulse pressure, narrow pulse pressure",
}

const faqs = [
  {
    question: "How do I use this calculator to find my pulse pressure?",
    answer:
      "To use our pulse pressure calculator, simply enter your Systolic (top) and Diastolic (bottom) blood pressure readings. The tool instantly performs the pulse pressure calculation by subtracting the bottom number from the top, giving you a clear indicator of your cardiovascular force and arterial flexibility.",
  },
  {
    question: "How do you calculate pulse pressure manually?",
    answer:
      "If you want to know how is pulse pressure calculated without a tool, the formula is simple: Pulse Pressure = Systolic Pressure - Diastolic Pressure. For example, if your blood pressure is 120/80 mmHg, you calculate the pulse pressure by subtracting 80 from 120, resulting in 40 mmHg.",
  },
  {
    question: "What is a normal pulse pressure range?",
    answer:
      "A healthy pulse pressure typically falls between 40 mmHg and 60 mmHg. When you calculate pulse pressure and it consistently falls within this range, it suggests a good balance between heart pump force and arterial elasticity. Anything above 60 is considered 'wide,' and below 40 is 'narrow.'",
  },
  {
    question: "Why is pulse pressure calculation important for people over 50?",
    answer:
      "Research, including the Framingham Heart Study, shows that for adults over 50, pulse pressure is often a better predictor of heart complications, such as stroke or heart attack, than systolic pressure alone. Knowing how to calculate a pulse pressure helps you monitor arterial stiffness, which often increases with age.",
  },
  {
    question: "Can a wide pulse pressure be dangerous?",
    answer:
      "Yes. If you calculate the pulse pressure and it is consistently above 60 mmHg, it is known as a 'wide' pulse pressure. This often indicates stiffening of the major arteries (atherosclerosis) or heart valve issues, which can increase the risk of cardiovascular events and kidney damage.",
  },
  {
    question: "How does pulse pressure differ from standard blood pressure?",
    answer:
      "While blood pressure measures the force against your artery walls, pulse pressure measures the 'gap' or the surge of pressure. Two people can have the same pulse pressure but different risks—for example, a 120/60 and a 180/120 both have a PP of 60, but the person with 180/120 is at much higher risk due to high absolute pressure.",
  },
  {
    question: "Does pulse pressure change during exercise?",
    answer:
      "Yes, it is normal for pulse pressure to increase during aerobic exercise. This happens because your systolic pressure rises to pump more blood, while your diastolic pressure typically stays the same or drops slightly. However, your resting pulse pressure calculation should ideally return to the 40-60 mmHg range.",
  },
]

export default function PulsePressureCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Pulse Pressure Calculator"
        description="Calculate your pulse pressure instantly. Understand what your systolic and diastolic difference says about your heart health and arterial stiffness."
        url="https://yourdomain.com/health/pulse-pressure-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Pulse Pressure Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Most people know their &quot;120 over 80,&quot; but few know the most important number inside that reading: your Pulse Pressure. 
                Our pulse pressure calculator helps you understand how well your heart pumps and how flexible your arteries are.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you want to learn how to calculate pulse pressure for clinical records or personal tracking, our tool provides instant, accurate results.
              </p>
            </div>

            {/* Calculator Component */}
            <PulsePressureCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is Pulse Pressure? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  What is Pulse Pressure?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Pulse pressure is defined as the numerical difference between your systolic blood pressure (the pressure when the heart beats) and your diastolic blood pressure (the pressure when the heart rests). 
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Think of your arteries like a garden hose. Pulse pressure is the &quot;force&quot; of the water surge every time you turn the tap on and off. If that hose is stiff or the pump is failing, that force changes significantly.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Using a **pulse pressure calculator** allows you to monitor this force, giving you a window into your &quot;vascular age&quot; and overall cardiovascular efficiency.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-red-500" />
                      Pulse Pressure: How to Calculate
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      The mathematical steps to perform a pulse pressure calculation at home.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <h3 className="font-bold text-gray-900 mb-2">The Formula:</h3>
                      <p className="bg-gray-100 p-3 rounded-lg font-mono mb-4 text-center">
                        PP = SBP - DBP
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Step 1:</strong> Check your blood pressure with a validated cuff.</li>
                        <li><strong>Step 2:</strong> Identify the Top Number (Systolic).</li>
                        <li><strong>Step 3:</strong> Identify the Bottom Number (Diastolic).</li>
                        <li><strong>Step 4:</strong> Subtract the bottom from the top.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-red-50 rounded-xl p-4 border border-red-100">
                      <p className="text-red-800 font-bold text-center mb-2">Example Calculation:</p>
                      <p className="text-red-700 text-sm text-center">
                        Reading: 130/85 mmHg<br />
                        130 - 85 = <strong>45 mmHg</strong><br />
                        Result: Normal Pulse Pressure
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Why Calculate Pulse Pressure? */}
              <section>
                <h2 className="mb-2 font-semibold text-2xl">
                  Why Calculate Pulse Pressure Matters
                </h2>
                <p className="mb-2">
                  Research from the <b>Framingham Heart Study</b> indicates that in people over age 50, pulse pressure is a better predictor of heart problems than systolic pressure alone.
                </p>
                <p className="mb-4">When you calculate pulse pressure, you are essentially measuring two vital indicators:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl bg-blue-50/50">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-600" /> Stroke Volume
                    </h4>
                    <p className="text-sm">The actual amount of blood pushed out by your left heart ventricle during each beat.</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-green-50/50">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <HeartPulse className="w-4 h-4 text-green-600" /> Arterial Compliance
                    </h4>
                    <p className="text-sm">How &quot;stretchy&quot; or stiff your arteries are. Stiff arteries cannot absorb blood force, causing pressure to widen.</p>
                  </div>
                </div>
              </section>

              {/* Interpreting Your Results: The Range Guide */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Pulse Pressure Range Interpretation Guide</CardTitle>
                    <CardDescription>
                      Use this chart to understand your pulse pressure calculation results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-2 text-left">Category</th>
                            <th className="border px-4 py-2 text-left">Range (mmHg)</th>
                            <th className="border px-4 py-2 text-left">Clinical Meaning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium text-blue-600">Low (Narrow)</td>
                            <td className="border px-4 py-2">Less than 40</td>
                            <td className="border px-4 py-2">May indicate poor heart pump function, dehydration, or blood loss.</td>
                          </tr>
                          <tr className="bg-green-50/30">
                            <td className="border px-4 py-2 font-medium text-green-600">Normal</td>
                            <td className="border px-4 py-2">40 to 60</td>
                            <td className="border px-4 py-2">Healthy balance between heart force and arterial elasticity.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium text-orange-600">High (Wide)</td>
                            <td className="border px-4 py-2">Greater than 60</td>
                            <td className="border px-4 py-2">Indicates stiffening of the arteries (Atherosclerosis) or valve issues.</td>
                          </tr>
                          <tr className="bg-red-50/50">
                            <td className="border px-4 py-2 font-medium text-red-600">Severely High</td>
                            <td className="border px-4 py-2">Over 100</td>
                            <td className="border px-4 py-2">High risk of cardiovascular event; requires immediate medical consultation.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Narrow vs Wide Explanation */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="text-blue-500" /> Narrow Pulse Pressure
                  </h3>
                  <p className="text-sm text-gray-700">
                    If you calculate a pulse pressure and it is consistently below 40 mmHg (or less than 25% of systolic), it is &quot;narrow.&quot; Common causes:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    <li><b>Heart Failure:</b> Reduced stroke volume.</li>
                    <li><b>Aortic Stenosis:</b> Heart valve restriction.</li>
                    <li><b>Anemia:</b> Severe cases can drop pressure.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="text-orange-500" /> Wide Pulse Pressure
                  </h3>
                  <p className="text-sm text-gray-700">
                    Results consistently above 60 mmHg suggest arteries are losing their &quot;bounce.&quot; Risks include:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    <li><b>Stroke:</b> Stiff arteries send pressure waves to the brain.</li>
                    <li><b>Kidney Damage:</b> High-pressure hits to delicate filters.</li>
                    <li><b>Hyperthyroidism:</b> Overactive heart force.</li>
                  </ul>
                </div>
              </section>

              {/* Accuracy Protocol */}
              <section>
                <Card className="not-prose border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-blue-500" />
                      Protocol for Accurate Calculation
                    </CardTitle>
                    <CardDescription>
                      Used by clinics in the UK and India to ensure the baseline blood pressure is correct.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">1</div>
                        <p><b>The 5-Minute Rule:</b> Sit quietly for five minutes before measuring. No phones or talking.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">2</div>
                        <p><b>Arm Position:</b> Ensure your arm is supported at heart level during the reading.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">3</div>
                        <p><b>No Stimulants:</b> Avoid caffeine or nicotine for 30 minutes before you calculate pulse pressure.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">4</div>
                        <p><b>The Double Check:</b> Take two readings, two minutes apart, and average them for your final calculation.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Regional Health Factors */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-green-600" /> Regional Health Considerations
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">USA & UK</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      High processed food intake often leads to arterial stiffness. Physicians here recommend the &quot;DASH&quot; diet to manage widening pulse pressure.
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">UAE</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      Sedentary lifestyles and high diabetes rates contribute to early arterial aging. Monitoring PP is a vital early intervention tool.
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">India</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      High-sodium vegetarian diets and genetic heart disease predispositions make weekly PP calculation essential for those over 40.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Management Tips */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      How to Manage & Improve Pulse Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                          <Apple className="w-4 h-4" /> Lifestyle & Diet
                        </h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• <b>Reduce Sodium:</b> Salt stiffens artery walls almost immediately.</li>
                          <li>• <b>Aerobic Exercise:</b> Swimming or brisk walking maintains &quot;bounce.&quot;</li>
                          <li>• <b>Folic Acid:</b> Studies suggest it may help reduce stiffness in younger men.</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" /> Medical Guidance
                        </h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• <b>ACE Inhibitors:</b> Often used to manage hypertension and PP.</li>
                          <li>• <b>Nitrates:</b> Unique ability to lower systolic pressure while retaining diastolic levels.</li>
                          <li>• <b>Stress Management:</b> Lowering cortisol prevents chronic arterial narrowing.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Summary Checklist */}
              <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Pulse Pressure Summary Checklist</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Calculation:</b> Always Systolic minus Diastolic.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Ideal Range:</b> Aim for 40 mmHg to 60 mmHg.</p>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>High Risk:</b> Consult a doctor if PP is consistently over 60.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-white/20 rounded-md flex items-center justify-center shrink-0">✓</div>
                      <p><b>Narrow Risk:</b> Seek advice if PP is below 35 or you feel dizzy.</p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Final Note */}
              <section className="text-center pb-12">
                <h2 className="text-3xl font-bold mb-4">Every Beat Tells a Story</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your pulse pressure is a vital window into your vascular health. By learning how to calculate pulse pressure and monitoring it regularly, you are taking a proactive step in heart disease prevention. Don&apos;t just settle for knowing your blood pressure—know your pulse pressure.
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
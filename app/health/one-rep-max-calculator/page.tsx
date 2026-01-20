import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import OneRepMaxCalculator from "@/components/calculators/one-rep-max-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "One Rep Max Calculator (Accurate, Safe & Trainer‑Approved) | calqulate.net",
  description:
    "Calculate your estimated One Rep Max (1RM) for bench press, squat, and deadlift. Safe, accurate, and science-backed strength tools from calqulate.net.",
  keywords:
    "one rep max calculator, 1RM calculator, calculate bench press max, squat max calculator, strength calculator, calqulate.net, weightlifting tool",
}

const faqs = [
  {
    question: "What is the most accurate one rep max calculator?",
    answer:
      "Calculators based on submaximal reps (3–8) are safest and most accurate for general training. Using a weight you can lift for several reps allows for a precise estimation without the high injury risk of a true 1RM test.",
  },
  {
    question: "How often should I recalculate my one rep max?",
    answer:
      "You should recalculate your 1RM every 4–6 weeks, or whenever you notice a significant and consistent increase in your lifting strength during your normal sets.",
  },
  {
    question: "Is estimated one rep max reliable?",
    answer:
      "Yes, estimated 1RM is highly reliable when the reps used for calculation are performed with good form and stopped just before technical failure.",
  },
  {
    question: "Can beginners use a one rep max calculator?",
    answer:
      "Absolutely. In fact, beginners should rely on calculators rather than true max testing to avoid injury while they are still mastering their lifting technique.",
  },
  {
    question: "Is one rep max the same for every lift?",
    answer:
      "No. Different muscle groups recover and fatigue at different rates. Upper-body lifts like the bench press generally fatigue faster than lower-body lifts like the squat or deadlift.",
  },
  {
    question: "How do I calculate macros for strength gains?",
    answer:
      "To support strength and 1RM progress, focus on a slight calorie surplus and high protein intake (1.6g to 2.2g per kg of body weight). You can use our dedicated macro calculator on calqulate.net for a full breakdown.",
  },
]

export default function OneRepMaxCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="One Rep Max Calculator"
        description="Calculate your estimated maximum lift capacity for bench press, squats, and deadlifts safely."
        url="https://calqulate.net/health/one-rep-max-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-800 uppercase bg-blue-50 rounded-full">
                Professional Strength Tools
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                One Rep Max Calculator (Accurate, Safe & Trainer‑Approved)
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Built for lifters in the USA, UK, Canada & India who want strength gains without injury.
              </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-16">
              <OneRepMaxCalculator />
            </div>

            <div className="prose prose-slate max-w-none space-y-16">
              
              {/* Introduction */}
              <section>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <p className="text-lg text-gray-700 leading-relaxed m-0">
                    If you’re searching for a one rep max calculator that goes beyond basic math, this page is designed to do exactly that. 
                    Here, you won’t just calculate your one rep max — you’ll learn how to use it correctly, when NOT to test it, and how elite coaches apply 1RM data to build strength safely.
                  </p>
                </div>
              </section>

              {/* Use This First Section */}
              <section>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">One Rep Max Calculator</h2>
                    <p className="text-gray-700 mb-4">
                      Enter the weight you lifted and number of reps completed to instantly get:
                    </p>
                    <ul className="space-y-2 list-none p-0">
                      <li className="flex items-center gap-2 font-medium text-gray-800">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Estimated 1RM (one rep max)
                      </li>
                      <li className="flex items-center gap-2 font-medium text-gray-800">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Training percentages (60–95%)
                      </li>
                      <li className="flex items-center gap-2 font-medium text-gray-800">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Safe working weight ranges
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-600 italic">
                      This one rep max predictor is ideal for beginners, intermediates, and advanced lifters who want precision without risk.
                    </p>
                  </div>
                  <div className="w-full md:w-1/3">
                    <Image 
                      src="/squat-rack.avif" 
                      alt="Weightlifter preparing for a lift" 
                      width={400} 
                      height={300} 
                      className="rounded-2xl shadow-md border"
                    />
                  </div>
                </div>
              </section>

              {/* What is 1RM */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is One Rep Max?</h2>
                <p className="text-gray-700 mb-6">
                  One Rep Max (1RM) is the maximum weight you can lift once with proper form for a given exercise.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {["Bench press 1RM", "Squat 1RM", "Deadlift 1RM"].map((lift) => (
                    <div key={lift} className="p-4 text-center bg-white border rounded-xl font-bold text-gray-800 shadow-sm">
                      {lift}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700">
                  A one rep max calculator bench or squat calculator estimates this number without requiring a true max lift, which is safer for most people.
                </p>
              </section>

              {/* Why NOT to test */}
              <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h2 className="text-2xl font-bold text-red-900 mb-4 mt-0">Why You Should NOT Test Your True 1RM Often</h2>
                <p className="text-red-800 mb-4">
                  Most online calculators don’t explain this — but coaches know it well. Testing a true max:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm font-semibold text-red-700">
                  <div className="bg-white p-4 rounded-lg border border-red-200">Increases injury risk</div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">Creates nervous system fatigue</div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">Is unnecessary for most programs</div>
                </div>
                <p className="mt-6 text-red-900 font-medium">
                  That’s why estimating one rep max using submaximal lifts (3–10 reps) is the smarter option for 90% of lifters.
                </p>
              </section>

              {/* Comparison Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How This One Rep Max Calculator Is Better</h2>
                <p className="text-gray-700 mb-6">Compared to StrengthLevel, NASM, Calculator.net, OmniCalculator:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Explains when to use 1RM",
                    "Accounts for fatigue & form quality",
                    "Designed for real gym conditions",
                    "Suitable for home & commercial gyms",
                    "Emphasizes long‑term progression"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 border rounded-xl bg-white">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-600 font-medium text-center">
                  This is not just a calculator — it’s a strength education tool.
                </p>
              </section>

              {/* Conversion and Zones */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">One Rep Max Conversion Explained</h2>
                <p className="text-gray-700 mb-6">
                  One rep max conversion means translating your estimated 1RM into: Training weights, Program percentages, and Progressive overload plans.
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { zone: "60–70% 1RM", desc: "Endurance & technique" },
                    { zone: "70–80% 1RM", desc: "Hypertrophy" },
                    { zone: "80–90% 1RM", desc: "Strength" },
                    { zone: "90%+ 1RM", desc: "Peaking (short term)" }
                  ].map((item) => (
                    <div key={item.zone} className="p-4 border rounded-2xl bg-slate-50 text-center">
                      <div className="font-bold text-blue-700 mb-1">{item.zone}</div>
                      <div className="text-xs text-gray-600 uppercase font-semibold tracking-tighter">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-800 font-bold text-center">
                  Using the wrong zone is why many lifters stall.
                </p>
              </section>

              {/* Step by Step */}
              <section>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <Image 
                    src="/squat-safety.avif" 
                    alt="Strength training session" 
                    width={400} 
                    height={400} 
                    className="rounded-3xl border order-2 md:order-1"
                  />
                  <div className="flex-1 order-1 md:order-2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Determining One Rep Max (Step‑by‑Step)</h2>
                    <div className="space-y-4">
                      {[
                        "Warm up properly",
                        "Choose a weight you can lift 3–8 reps",
                        "Stop 1–2 reps before failure",
                        "Use a one rep max calculator",
                        "Apply training percentages"
                      ].map((step, index) => (
                        <div key={index} className="flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                          <span className="text-2xl font-black text-slate-200">{index + 1}</span>
                          <span className="font-semibold text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Bench Press Notes */}
              <section className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl">
                <h2 className="text-2xl font-bold text-white mb-6 mt-0">Calculating One Rep Max Bench Press</h2>
                <p className="text-slate-300 mb-8">
                  The bench press is the most searched lift for 1RM — and the most misunderstood. Bench-specific guidance:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="font-bold text-white mb-2">Fatigue Factor</div>
                    <div className="text-sm text-slate-400">Fatigue sets in faster than squats or deadlifts.</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="font-bold text-white mb-2">Spotter Quality</div>
                    <div className="text-sm text-slate-400">A good spotter is vital for safety and mental confidence.</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="font-bold text-white mb-2">Technique Depth</div>
                    <div className="text-sm text-slate-400">Small technique changes affect numbers drastically.</div>
                  </div>
                </div>
                <p className="mt-8 text-slate-400 text-sm italic">
                  That’s why a one rep max bench press calculator should be used more cautiously than squat or deadlift estimations.
                </p>
              </section>

              {/* Predictor vs True Max Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">One Rep Max Predictor vs True Max Testing</h2>
                <div className="overflow-x-auto rounded-2xl border">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-900">
                      <tr>
                        <th className="p-4 border-b">Method</th>
                        <th className="p-4 border-b">Risk</th>
                        <th className="p-4 border-b">Accuracy</th>
                        <th className="p-4 border-b">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="p-4 border-b font-bold">True 1RM test</td>
                        <td className="p-4 border-b">High</td>
                        <td className="p-4 border-b">Very high</td>
                        <td className="p-4 border-b">Advanced / competition</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b font-bold">1RM predictor</td>
                        <td className="p-4 border-b">Low</td>
                        <td className="p-4 border-b">High</td>
                        <td className="p-4 border-b">Most lifters</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b font-bold">Percentage guess</td>
                        <td className="p-4 border-b">Medium</td>
                        <td className="p-4 border-b">Low</td>
                        <td className="p-4 border-b">Beginners</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-center font-bold text-blue-700 uppercase tracking-widest text-sm">Smart lifters predict, not gamble.</p>
              </section>

              {/* Regional Training */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Training Considerations</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-2xl">
                    <div className="font-black text-gray-900 mb-2">USA & Canada</div>
                    <p className="text-sm text-gray-600">High access to commercial gyms → structured percentages</p>
                  </div>
                  <div className="p-6 border rounded-2xl">
                    <div className="font-black text-gray-900 mb-2">UK</div>
                    <p className="text-sm text-gray-600">Limited space gyms → submax efficiency matters</p>
                  </div>
                  <div className="p-6 border rounded-2xl">
                    <div className="font-black text-gray-900 mb-2">India</div>
                    <p className="text-sm text-gray-600">Mixed equipment quality → estimation &gt; max testing</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-gray-500 text-sm">A universal one rep max calculator must account for these realities.</p>
              </section>

              {/* Common Mistakes */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes When Calculating One Rep Max</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Testing while fatigued",
                    "Ignoring form breakdown",
                    "Chasing ego numbers",
                    "Recalculating every workout"
                  ].map((mistake) => (
                    <div key={mistake} className="p-4 text-center border-t-4 border-t-red-500 bg-white shadow-sm font-medium text-gray-800 text-sm">
                      {mistake}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-gray-600 italic">Your 1RM is a reference, not a daily goal.</p>
              </section>

              {/* Final Verdict */}
              <section className="text-center pb-12 border-t pt-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Final Verdict: Should You Use a One Rep Max Calculator?</h2>
                <p className="text-xl text-gray-600 mb-8">Yes — if you use it correctly.</p>
                <p className="text-gray-700 max-w-2xl mx-auto mb-10">
                  A one rep max calculator is not about ego lifting. It’s about Smarter programming, Safer progression, and Measurable strength gains.
                </p>
                <div className="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg">
                  Master Your{" "}
                  <Link
                    href="/health/wilks-calculator"
                    className="underline hover:text-blue-100"
                  >
                    Strength
                  </Link>{" "}
                  at{" "}
                  <Link
                    href="https://calqulate.net/"
                    className="underline hover:text-blue-100"
                  >
                    calqulate.net
                  </Link>
                </div>

              </section>

            </div>

            {/* Structured FAQ Section */}
            <div className="mt-12 bg-slate-50 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">FAQs – One Rep Max Calculator</h2>
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
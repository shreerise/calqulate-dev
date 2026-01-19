import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Qrisk3Calculator from "@/components/calculators/qrisk3-calculator"
import Link from "next/link"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { 
  HeartPulse, 
  Stethoscope, 
  ShieldCheck, 
  Info, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  ClipboardList,
  Target,
  Users,
  Brain
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "QRISK3 Calculator: NHS Heart Disease 10-Year Risk Score",
  description:
    "Calculate your heart age and 10-year risk of heart attack or stroke using the official UK QRISK3 calculator. The gold standard cardiovascular risk calculator for NHS health checks.",
  keywords:
    "qrisk3 calculator, cardiovascular risk calculator, cardiovascular event risk calculator, 10 year cardiovascular risk calculator uk, qrisk2 score, cardiovascular disease risk score, qrisk3 score calculator, qrisk3 nhs calculator, qrisk3 cardiovascular disease 10 year risk calculator score",
}

const faqs = [
  {
    question: "What is a 'good' QRISK3 score?",
    answer:
      "In the UK, a QRISK3 score below 10% is generally considered low to moderate risk. If your score is 10% or higher, NHS guidelines suggest that a GP should discuss preventative measures with you, such as lifestyle changes or starting statin medication.",
  },
  {
    question: "How does QRISK3 differ from the older QRISK2 score?",
    answer:
      "The qrisk2 score was the previous standard. The updated QRISK3 calculator adds several new risk factors, including chronic kidney disease, migraines, systemic lupus erythematosus (SLE), severe mental illness, erectile dysfunction, and the use of steroid tablets.",
  },
  {
    question: "Why does the QRISK3 nhs calculator ask about my postcode?",
    answer:
      "QRISK3 uses the Townsend Deprivation Index, which is linked to your postcode. In the UK, research shows that people living in more deprived areas have a statistically higher risk of cardiovascular disease due to environmental and lifestyle factors.",
  },
  {
    question: "Can I use the QRISK3 score calculator if I already have heart disease?",
    answer:
      "No. The qrisk3 calculator is designed for primary prevention—meaning it predicts the risk for people who have NOT yet had a heart attack or stroke. If you already have cardiovascular disease, you are already considered high risk, and different clinical guidelines apply.",
  },
]

export default function Qrisk3CalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <CalculatorSchema
        name="QRISK3 Calculator"
        description="The official UK clinical tool for predicting 10-year risk of cardiovascular disease."
        url="https://calqulate.net/health/qrisk3-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* UK Clinical Header */}
        <header className="mb-16 border-b border-slate-100 pb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            QRISK®3 Calculator: <span className="text-blue-600">Your 10-Year Heart Score.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            Used by GPs across the NHS, the <b>qrisk3 calculator</b> is the most accurate 
            <b> 10 year cardiovascular risk calculator uk</b> patients can use to predict 
            their chances of a heart attack or stroke. 
          </p>
        </header>

        {/* Calculator Component UI */}
        <div className="mb-20">
          <Qrisk3Calculator />
        </div>

        {/* Unique Authority Content */}
        <article className="space-y-20">
          
          {/* Section 1: Simple Definition */}
          <section>
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">
              <Info className="w-4 h-4" /> Definition
            </div>
            <h2 className="text-3xl font-bold mb-6">What is the QRISK3 Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  Think of the <b>qrisk3 calculator</b> as a &quot;Weather Forecast&quot; for your heart. Just as a 
                  forecaster uses wind speed, humidity, and pressure to predict a storm, this tool uses 
                  your medical history to predict a &quot;Heart Storm&quot; (a heart attack or stroke).
                </p>
                <p>
                  It is a <b>cardiovascular event risk calculator</b> that looks at you as a whole person, 
                  not just a{" "}
                  <Link
                    href="/health/mean-arterial-pressure-calculator"
                    className="font-medium text-gray-800 no-underline hover:underline hover:text-blue-700"
                  >
                    blood pressure
                  </Link>{" "}
                  reading. It is the gold standard for <b>cardiovascular disease risk score</b> 
                  assessment in the United Kingdom.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-900"><Target className="w-5 h-5" /> What a 10% Score Means:</h4>
                <p className="text-sm text-blue-800">
                  If your <b>qrisk3 nhs calculator</b> result is 10%, it means that out of 100 people 
                  exactly like you, 10 will have a heart attack or stroke in the next 10 years. 
                  In the UK, this is the &quot;trigger point&quot; where doctors suggest medical intervention.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Why QRISK3 is different (Unique Insight) */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The &quot;Hidden&quot; Heart Risks: Why QRISK3 Beats QRISK2</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Most <b>cardiovascular risk calculators</b> only look at cholesterol and smoking. 
              The <b>qrisk3 score calculator</b> is unique because it recognizes that <b>Systemic Inflammation</b> 
              is just as dangerous as high fat in the blood. 
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-slate-200 shadow-none bg-white">
                <CardHeader>
                  <Brain className="w-8 h-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">Mental Health</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Severe mental illness is included because the chronic stress and medication associated 
                  with these conditions can accelerate arterial damage.
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-none bg-white">
                <CardHeader>
                  <Activity className="w-8 h-8 text-red-500 mb-2" />
                  <CardTitle className="text-lg">Autoimmune Issues</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Conditions like Lupus (SLE) cause body-wide inflammation, which &quot;scars&quot; the 
                  artery walls, making it easier for plaque to build up.
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-none bg-white">
                <CardHeader>
                  <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
                  <CardTitle className="text-lg">Erectile Dysfunction</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Often the &quot;Canary in the Coal Mine.&quot; Small blood vessel issues often 
                  show up here years before they cause a heart attack.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3: Interpreting the Score (NHS Context) */}
          <section className="bg-slate-900 text-white p-10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8">NHS Guidelines: What Happens After the Score?</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">Score: Under 10%</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You are considered low risk. Your GP will likely focus on &quot;Primary Prevention&quot; 
                  — advising you on how to keep your <b>cardiovascular disease 10 year risk calculator score</b> 
                  low through diet and keeping an active lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">Score: 10% or Higher</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  This is the clinical threshold for statins in the UK. Your GP will discuss Atorvastatin 
                  (usually 20mg) and conduct a more thorough check of your liver and kidney function 
                  to ensure your <b>qrisk3 score</b> can be safely lowered.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Postcode & Ethnicity - The UK Factor */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Postcodes and Ethnicity: The &quot;UK Factor&quot;</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              The <b>qrisk3 calculator uk</b> version is highly localized. It uses your postcode to 
              determine the Townsend Deprivation Index. This is because health outcomes in the UK 
              are closely tied to social factors, including local air quality, access to exercise 
              spaces, and local food environments.
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <h4 className="font-bold mb-4">Ethnicity Weighting:</h4>
              <p className="text-sm text-slate-600">
                Data shows that individuals of South Asian origin (Indian, Pakistani, Bangladeshi) 
                tend to have higher risks at lower BMIs. The <b>qrisk3 cardiovascular disease 10 year risk calculator score</b> 
                adjusts for this, ensuring that preventative care starts earlier for these groups.
              </p>
            </div>
          </section>

          {/* Section 5: Step-by-Step for Users */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">How to Get the Most Accurate Result</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                <h4 className="font-bold mb-2">BP Check</h4>
                <p className="text-xs text-slate-500">Use your most recent blood pressure reading from a pharmacy or GP.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                <h4 className="font-bold mb-2">Cholesterol</h4>
                <p className="text-xs text-slate-500">
                  You need your <a href="/health/cholesterol-ratio-calculator" className="underline">Total Cholesterol/HDL ratio</a> from a blood test.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                <h4 className="font-bold mb-2">BMI</h4>
                <p className="text-xs text-slate-500">Know your current height and weight for an accurate BMI calculation.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
                <h4 className="font-bold mb-2">Postcode</h4>
                <p className="text-xs text-slate-500">Crucial for the UK deprivation weighting used in the QRISK3 model.</p>
              </div>
            </div>
          </section>

          {/* Final Educational Summary */}
          <section className="bg-white text-slate-900 p-10 rounded-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Your Score is Not Your Destiny</h2>
            <p className="text-slate-700 max-w-2xl mx-auto mb-8">
              The <b>qrisk3 calculator</b> provides a snapshot of where you are heading based on your current
              vitals. The good news? Almost every factor in the <b>cardiovascular risk calculator</b>
              (except age and genetics) can be improved through deliberate action.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold"><Users className="w-4 h-4 text-slate-600" /> NHS Clinical Standard</div>
              <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="w-4 h-4 text-slate-600" /> Evidence-Based Tool</div>
              <div className="flex items-center gap-2 text-sm font-bold"><Activity className="w-4 h-4 text-slate-600" /> Updated for 2024</div>
            </div>
          </section>

        </article>

        {/* Structured FAQ Section */}
        <div className="mt-20">
          <FAQSection faqs={faqs} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import OneRepMaxCalculator from "@/components/calculators/one-rep-max-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, AlertTriangle, ChevronRight, BarChart3, Medal } from "lucide-react";

export const metadata: Metadata = {
  title: "One Rep Max Calculator: The Most Accurate 1RM Tool",
  description:
    "Calculate your precise One Rep Max (1RM) for Bench Press, Squat, and Deadlift. Includes percentage charts, training zones, and strength curves.",
  keywords:
    "one rep max calculator, 1rm calculator, bench press calculator, squat max, deadlift max, strength standards, epley formula, weightlifting calculator",
};

const faqs = [
  {
    question: "How accurate is the 1RM calculator?",
    answer:
      "This calculator uses the Epley Formula, which is the industry standard for estimating One Rep Max. It is highly accurate (within 95%) when calculating from a 3-6 rep max. For rep ranges above 10, accuracy decreases slightly due to individual muscle endurance differences.",
  },
  {
    question: "Why is knowing my 1RM important?",
    answer:
      "Most effective strength programs (like 5/3/1, Starting Strength, or Push-Pull-Legs) base their lifting weights on percentages of your 1RM (e.g., 'Do 5 sets at 75%'). Knowing your 1RM allows you to follow these programs correctly without guessing.",
  },
  {
    question: "Is it safe to test my 1RM in the gym?",
    answer:
      "Testing a true 1RM involves lifting the absolute heaviest weight you can handle. This carries a risk of injury if your form breaks down. Using a calculator is a safer alternative because it estimates your max based on sub-maximal lifts (weights you can control for reps).",
  },
  {
    question: "Can I use this for dumbbells?",
    answer:
      "Yes, you can use this for dumbbell press, dumbbell rows, etc. However, keep in mind that stabilizing dumbbells is harder than a barbell, so your 'calculated' max might be slightly lower than your actual potential on a machine.",
  },
];

export default function OneRepMaxPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-black">
      <CalculatorSchema
        name="One Rep Max Calculator"
        description="Calculate your 1RM instantly using the Epley formula. Get strength zones and load charts."
        url="https://calqulate.net/health/one-rep-max-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              One Rep Max <span className="text-blue-600">Calculator</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculate your maximum strength potential safely. Use our industry-standard tool to find your <strong>1RM</strong>, training percentages, and power zones for Bench Press, Squat, and Deadlift.
            </p>
          </div>

          {/* Calculator Wrapper */}
          <OneRepMaxCalculator />

          {/* Content Body */}
          <div className="max-w-5xl mx-auto mt-20 space-y-20">
            
            {/* Section 1: Visual Guide (Text + Image) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <Target className="w-4 h-4" /> Strategic Training
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Why Calculate Instead of Test?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Testing your true 1RM in the gym taxes your central nervous system and increases injury risk if your form isn't perfect. 
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  By using the <strong>Epley Formula</strong>, you can estimate your max using a weight you can lift for 5 reps. It gives you the data you need to program your workouts without the physical toll of a max-effort day.
                </p>
                <ul className="space-y-3 pt-2">
                  {['Avoid Injury Risk', 'Plan Progression', 'Track Strength Gains'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Image Placeholder 1 */}
              <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl group">
                 <Image 
                   src="/squat-rack.avif" 
                   alt="Athlete performing a heavy squat"
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 /> 
              </div>
            </div>

            {/* Section 2: How to use the results */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">How To Use Your Results</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Once you have your number, don't just stare at it. Use the <strong>Training Zones</strong> to structure your next 4 weeks of training.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-none bg-slate-50 dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-red-600">
                      <BarChart3 className="w-5 h-5" /> Strength
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      <strong>Goal:</strong> Lift heavier weights.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Use <strong>85-95%</strong> of your 1RM for sets of 1-5 reps. Rest 3-5 minutes between sets to recover full ATP.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-none bg-slate-50 dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-blue-600">
                      <BarChart3 className="w-5 h-5" /> Hypertrophy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      <strong>Goal:</strong> Build muscle size.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Use <strong>70-80%</strong> of your 1RM for sets of 8-12 reps. This is the sweet spot for mechanical tension and volume.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-none bg-slate-50 dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-green-600">
                      <BarChart3 className="w-5 h-5" /> Endurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      <strong>Goal:</strong> Sports performance / Stamina.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Use <strong>50-60%</strong> of your 1RM for sets of 15+. Great for conditioning or active recovery days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Safety Tips */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               {/* Image Placeholder 2 */}
              <div className="order-2 md:order-1 relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl group">
                 <Image 
                   src="/squat-safety.avif" 
                   alt="Athlete performing a heavy squat"
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 /> 
              </div>

              <div className="order-1 md:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" /> Safety First
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  When To Use Which Formula?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  While our calculator defaults to <strong>Epley</strong> for standard lifting, advanced powerlifters might prefer the <strong>Brzycki</strong> formula for lower reps (1-5), as it tends to be slightly more conservative.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    Tip: Never attempt a 1RM test without a spotter. If you are training alone, rely on this calculator's estimate to set your working weights.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
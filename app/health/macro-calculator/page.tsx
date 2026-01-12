import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import MacroCalculator from "@/components/calculators/macro-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator as CalculatorIcon, Utensils, Flame, Target, Activity, Dumbbell, Apple, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Macro Calculator (IIFYM): Exact Daily Macros for Weight Loss",
  description:
    "Calculate your optimal TDEE and daily macros (Protein, Carbs, Fats) with our accurate IIFYM Calculator. Includes body fat integration for precision.",
};

const faqs = [
  {
    question: "What is IIFYM and how does it work?",
    answer:
      "IIFYM stands for 'If It Fits Your Macros.' It is a flexible dieting method where you track Protein, Carbohydrates, and Fats rather than just calories. This allows you to eat a variety of foods as long as they fit within your daily targets.",
  },
  {
    question: "Why do I need to enter my Body Fat Percentage?",
    answer:
      "Entering your body fat percentage allows our calculator to use the Katch-McArdle formula. This bases your calorie needs on your Lean Body Mass (muscle), which is far more accurate for athletic individuals than standard weight-based formulas.",
  },
  {
    question: "How do I weigh my food?",
    answer:
      "For the best results, use a digital food scale. Weigh meats raw (unless specified otherwise) and grains dry. Tracking apps like MyFitnessPal make this easy once you have the numbers from our calculator.",
  },
  {
    question: "What if I hit a plateau?",
    answer:
      "If your weight stalls for 2 weeks, recalculate your macros with your new body weight. As you get lighter, your body burns fewer calories, so you may need to slightly lower your intake or increase activity.",
  }
];

export default function MacroCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Macro Calculator (IIFYM)"
        description="Calculate your optimal daily macros for fat loss, maintenance, or bulking."
        url="https://calqulate.net/health/macro-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Macro Calculator (IIFYM)
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Transform your physique with data, not guessing. Our IIFYM Calculator uses your unique body metrics to determine the exact Protein, Carbs, and Fats you need to achieve your goal.
              </p>
            </div>

            {/* Calculator Component */}
            <MacroCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Introduction to Macros */}
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Counting Macros Works Better Than Calories</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While a calorie deficit causes weight loss, <strong>macros determine what kind of weight you lose</strong>. 
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you only count calories but ignore protein, you risk losing muscle mass instead of body fat, leading to the "skinny fat" look.
                    Our Macro Calculator prioritizes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> <strong>Protein:</strong> Muscle retention and satiety.</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> <strong>Fats:</strong> Hormonal balance.</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> <strong>Carbs:</strong> Energy for workouts.</li>
                  </ul>
                </div>
                
                {/* IMAGE 1: Healthy Food Spread */}
                <figure className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg not-prose">
                  <Image 
                    src="/macro-1.avif" 
                    alt="Healthy macro-balanced meal prep bowls with chicken, vegetables and rice"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Balanced meals lead to sustainable results.</p>
                  </div>
                </figure>
              </section>

              {/* The 3 Macros Breakdown */}
              <section>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold">Understanding Your Macros</h2>
                  <p className="text-muted-foreground">Every number in our calculator serves a specific biological purpose.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <Card className="bg-blue-50/50 border-blue-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                        <Dumbbell className="w-5 h-5" /> Protein
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <p className="mb-2"><strong>4 Calories per gram</strong></p>
                      Protein is the building block of muscle tissue. It has a high "thermic effect," meaning your body burns more calories digesting it than fats or carbs.
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-orange-50/50 border-orange-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-700 text-lg">
                        <Flame className="w-5 h-5" /> Carbs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <p className="mb-2"><strong>4 Calories per gram</strong></p>
                      Your body's preferred energy source. We calculate this based on your activity level to fuel your workouts without spilling over into fat storage.
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-50/50 border-yellow-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-yellow-700 text-lg">
                        <Utensils className="w-5 h-5" /> Fats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <p className="mb-2"><strong>9 Calories per gram</strong></p>
                      Essential for nutrient absorption and hormone production. While calorie-dense, healthy fats are crucial for a functioning metabolism.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Body Composition Section */}
              <section className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 my-12 not-prose">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* IMAGE 2: Fitness Tracking / Measuring */}
                    <figure className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                        <Image 
                            src="/macro-2.avif" 
                            alt="Man tying shoes preparing for a workout"
                            fill
                            className="object-cover"
                        />
                    </figure>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Why Body Fat % Matters</h3>
                        <p className="text-gray-600 mb-4">
                            Most calculators guess your metabolic rate based on total weight. But muscle burns more calories than fat.
                        </p>
                        <p className="text-gray-600 mb-6">
                            By using the <strong>Katch-McArdle Formula</strong> (which activates when you enter your body fat percentage in our tool), we calculate based on your <strong>Lean Body Mass</strong>. This prevents muscular individuals from under-eating and ensures accuracy for everyone.
                        </p>
                        <ul className="space-y-2 text-sm font-medium text-gray-700">
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> More accurate BMR calculation</li> 
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Better protein recommendations</li> 
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Tailored to athletic body types</li> 
                        </ul>
                    </div>
                </div>
              </section>

              {/* How to Track */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">How to Use Your Results</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="mb-4">Once you have your numbers (e.g., 180g Protein, 200g Carbs, 60g Fat), the real work begins. Here is the best way to start:</p>
                        <ol className="list-decimal pl-5 space-y-3 marker:font-bold marker:text-primary">
                            <li><strong>Download a Tracker:</strong> Use an app like MyFitnessPal, Cronometer, or MacrosFirst.</li>
                            <li><strong>Input Custom Goals:</strong> Don't use the app's default suggestions. Go to settings and enter the numbers from <em>this</em> calculator.</li>
                            <li><strong>Weigh Your Food:</strong> Estimating portions is the #1 reason people fail. A cheap kitchen scale is your best friend.</li>
                            <li><strong>Prioritize Protein:</strong> If you can't hit all numbers perfectly, make sure you hit your protein goal to protect your muscle.</li>
                        </ol>
                    </div>
                     {/* IMAGE 3: Food Scale / App */}
                    <figure className="relative h-60 w-full rounded-xl overflow-hidden shadow-md not-prose">
                        <Image 
                            src="/macro-3.avif" 
                            alt="Smartphone with fitness app and fresh food"
                            fill
                            className="object-cover"
                        />
                    </figure>
                </div>
              </section>

            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
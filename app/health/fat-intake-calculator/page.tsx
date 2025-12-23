import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import FatIntakeCalculator from "@/components/calculators/fat-intake-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Activity,
  Droplets,
  HeartPulse,
  Scale,
  Utensils,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BrainCircuit,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fat Intake Calculator: How Many Grams of Fat Per Day?",
  description:
    "Calculate your ideal daily fat intake for weight loss, keto, or muscle gain. Our accurate Fat Intake Calculator breaks down saturated, unsaturated, and trans fats.",
  keywords:
    "fat intake calculator, saturated fat calculator, how much fat should i eat per day calculator, daily fat intake calculator, fats calculator, protein intake calculator for fat loss, fat intake calculator for muscle gain, saturated fat intake calculator, how much fat should i eat per day to lose weight, how much fat per day, how many grams of fat per day to lose weight, how much fat should i eat per day, fat calculator",
  openGraph: {
    title: "Fat Intake Calculator — Calqulate",
    description: "Calculate daily fat needs (grams) and get a visual, practical breakdown for healthy eating.",
  },
};

const faqs = [
  {
    question: "How many grams of fat should I eat a day to lose weight?",
    answer:
      "For weight loss, a common recommendation is to keep fat intake between 20% to 30% of your total daily calories. For a 2,000 calorie diet, this equals roughly 44g to 67g of fat per day. Our calculator adjusts this based on your specific body metrics and activity level.",
  },
  {
    question: "What is the difference between saturated and unsaturated fats?",
    answer:
      "Unsaturated fats (monounsaturated and polyunsaturated) are considered 'healthy fats' that support heart health and brain function (found in olive oil, nuts, avocados). Saturated fats (found in meat, butter) should be limited to about 10% of daily calories to maintain heart health.",
  },
  {
    question: "Does eating fat make you fat?",
    answer:
      "No. Eating dietary fat does not directly translate to body fat. Weight gain occurs when you consume more calories than you burn, regardless of whether those calories come from protein, carbs, or fat. Healthy fats are actually essential for hormone production and nutrient absorption.",
  },
  {
    question: "How much fat is allowed on a Keto diet?",
    answer:
      "The Ketogenic (Keto) diet is high-fat. Typically, 70% to 80% of your daily calories should come from fat. Our calculator has a specific 'Keto' mode to help you find this exact number.",
  },
  {
    question: "Why do I need fat in my diet?",
    answer:
      "Dietary fat is essential for energy, cell growth, protecting organs, and absorbing nutrients like vitamins A, D, E, and K. It is also vital for hormone production.",
  },
];

export default function FatIntakeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Fat Intake Calculator"
        description="Calculate exactly how many grams of fat you need per day for weight loss, maintenance, or bulking."
        url="https://calqulate.net/health/fat-intake-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">{/* slightly wider for comfort */}
            {/* Hero Section - subtle card for contrast */}
             <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Fat Intake Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Find your perfect balance. Whether you are doing Keto, cutting for summer, or just trying to eat healthier, 
                our tool calculates exactly <strong>how many grams of fat</strong> you need daily based on your body and goals.
              </p>
            </div>

            {/* Calculator Component */}
            <div id="calculator" className="mb-8">
              <FatIntakeCalculator />
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">

{/* Introduction Section — adjusted spacing to match other sections (no content changes) */}
<section id="introduction" className="not-prose rounded-2xl p-6 md:p-8 bg-white/60 dark:bg-black/5">
  <div className="max-w-4xl mx-auto">
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-6">Why Calculate Your Fat Intake?</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        Fat is often misunderstood. For years it was demonized as the cause of weight gain, but modern science shows that
        <strong> dietary fat is essential for life</strong>. The key isn't avoiding fat — it's eating the <em>right amount</em> of the <em>right kind</em>.
      </p>
    </div>

    <p className="text-sm text-muted-foreground mb-4">Using a fat intake calculator helps you:</p>

    <div className="grid sm:grid-cols-2 gap-6">
      <div className="flex gap-3 p-3 rounded-lg border hover:shadow-sm transition">
        <div className="w-10 h-10 rounded-md bg-yellow-50 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <div className="font-medium text-sm">Regulate hormones</div>
          <div className="text-xs text-muted-foreground mt-1">Fats are the building blocks for testosterone and estrogen.</div>
        </div>
      </div>

      <div className="flex gap-3 p-3 rounded-lg border hover:shadow-sm transition">
        <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
          <BrainCircuit className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <div className="font-medium text-sm">Boost brain power</div>
          <div className="text-xs text-muted-foreground mt-1">The brain is approx. 60% fat; healthy fat supports cognition.</div>
        </div>
      </div>

      <div className="flex gap-3 p-3 rounded-lg border hover:shadow-sm transition">
        <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <div className="font-medium text-sm">Absorb vitamins</div>
          <div className="text-xs text-muted-foreground mt-1">Vitamins A, D, E & K require fat for proper absorption.</div>
        </div>
      </div>

      <div className="flex gap-3 p-3 rounded-lg border hover:shadow-sm transition">
        <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <div className="font-medium text-sm">Control hunger</div>
          <div className="text-xs text-muted-foreground mt-1">Fat digests slowly, keeping you fuller for longer.</div>
        </div>
      </div>
    </div>

    <div className="mt-6 text-sm text-muted-foreground">
      <strong>Quick note:</strong> Fat provides ~9 kcal per gram — our calculator converts your calories into practical fat amounts and food equivalents.
    </div>
  </div>
</section>


              {/* Visual Guide: Good vs Bad Fats */}
              <section className="not-prose">
                <h2 className="text-2xl font-bold mb-6">The Fat Quality Scale: Good vs. Bad</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Healthy Fats */}
                  <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="w-5 h-5" /> Healthy Fats
                      </CardTitle>
                      <CardDescription>Unsaturated (Mono & Poly)</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>These should make up the majority of your fat intake. They lower bad cholesterol and support heart health.</p>
                      <div className="font-semibold mt-2">Best Sources:</div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Avocados</li>
                        <li>Olive Oil & Avocado Oil</li>
                        <li>Nuts (Almonds, Walnuts)</li>
                        <li>Fatty Fish (Salmon, Mackerel)</li>
                        <li>Chia & Flax Seeds</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Moderate Fats */}
                  <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                        <AlertTriangle className="w-5 h-5" /> Limit These
                      </CardTitle>
                      <CardDescription>Saturated Fats</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Necessary in small amounts, but too much can raise LDL cholesterol. Aim for &lt;10% of total calories.</p>
                      <div className="font-semibold mt-2">Common Sources:</div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Red Meat (Beef, Lamb)</li>
                        <li>Butter & Cream</li>
                        <li>Cheese</li>
                        <li>Coconut Oil</li>
                        <li>Processed Meats (Sausage)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Bad Fats */}
                  <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <XCircle className="w-5 h-5" /> Avoid These
                      </CardTitle>
                      <CardDescription>Trans Fats</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Artificial fats that raise bad cholesterol and lower good cholesterol. Highly inflammatory.</p>
                      <div className="font-semibold mt-2">Found In:</div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Fried Fast Foods</li>
                        <li>Commercial Baked Goods</li>
                        <li>Non-Dairy Coffee Creamers</li>
                        <li>Margarine (Stick form)</li>
                        <li>Partially Hydrogenated Oils</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How We Calculate */}
              <section>
                <h2 className="text-2xl font-bold mb-4">How This Calculator Works</h2>
                <p>
                  We use the <strong>Mifflin-St Jeor Equation</strong>, considered the gold standard for calculating Basal Metabolic Rate (BMR).
                  We then multiply this by your activity level to find your Total Daily Energy Expenditure (TDEE).
                </p>
                <p className="mt-2">Finally, we apply your selected diet preference to determine the grams:</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Diet Type</th>
                        <th className="border p-2 text-left">% Calories from Fat</th>
                        <th className="border p-2 text-left">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">Standard / Balanced</td>
                        <td className="border p-2">25% - 35%</td>
                        <td className="border p-2">General health, sustainable maintenance.</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">Low Fat</td>
                        <td className="border p-2">15% - 20%</td>
                        <td className="border p-2">Those with gallbladder issues or specific medical advice.</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">Keto / High Fat</td>
                        <td className="border p-2">70% - 75%</td>
                        <td className="border p-2">Ketosis, rapid blood sugar control, epilepsy management.</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">High Carb / Athlete</td>
                        <td className="border p-2">20%</td>
                        <td className="border p-2">Endurance athletes needing maximum glycogen storage.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Food Visualization Cards */}
              <section className="not-prose">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Utensils className="w-6 h-6" /> What Does 10g of Fat Look Like?
                </h2>
                <p className="text-muted-foreground mb-6">
                  It's easy to overeat fat because it is calorie-dense (9 calories per gram vs. 4 for carbs/protein). Here is a quick visual reference:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="flex flex-col items-center p-4 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">🥑</span>
                    </div>
                    <h3 className="font-semibold">Avocado</h3>
                    <p className="text-xs text-muted-foreground">1/3 of a medium avocado</p>
                  </Card>

                  <Card className="flex flex-col items-center p-4 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">🫒</span>
                    </div>
                    <h3 className="font-semibold">Olive Oil</h3>
                    <p className="text-xs text-muted-foreground">1 Tablespoon (approx)</p>
                  </Card>

                  <Card className="flex flex-col items-center p-4 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">🥜</span>
                    </div>
                    <h3 className="font-semibold">Almonds</h3>
                    <p className="text-xs text-muted-foreground">Approx. 12-14 nuts</p>
                  </Card>

                  <Card className="flex flex-col items-center p-4 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">🥩</span>
                    </div>
                    <h3 className="font-semibold">Steak</h3>
                    <p className="text-xs text-muted-foreground">2 oz of Ribeye</p>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-2">Medical Disclaimer</h2>
                <p className="text-sm text-muted-foreground italic">
                  The results from this calculator are estimates based on population averages. Individual needs may vary based on genetics, medications, and health conditions.
                  Always consult with a registered dietitian or physician before making significant changes to your diet, especially if you have heart conditions or gallbladder issues.
                </p>
              </section>

            </div>

            {/* Structured FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">
                Trying to build muscle? Check out our{" "}
                <Link href="/health/body-shape-calculator" className="text-primary hover:underline">
                  Body Shape Calculator
                </Link>{" "}to see how your training is paying off.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

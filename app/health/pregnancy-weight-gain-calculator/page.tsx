import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import PregnancyWeightGainCalculator from "@/components/calculators/pregnancy-weight-gain-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Baby, Scale, Apple, Activity, AlertCircle, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Pregnancy Weight Gain Calculator: Week by Week Chart & Tracker",
  description:
    "Track your pregnancy weight gain week by week. Our personalized calculator uses IOM guidelines to create a custom weight gain chart and timeline for you.",
  keywords:
    "pregnancy weight gain calculator, pregnancy weight chart, pregnancy weight tracker, weight gain during pregnancy, bmi pregnancy calculator, pregnancy weight distribution, healthy pregnancy weight",
};

const faqs = [
  {
    question: "How much weight should I gain during pregnancy?",
    answer:
      "The recommended amount depends on your pre-pregnancy BMI. Generally, women with a normal BMI should gain 25-35 lbs (11.5-16 kg). Underweight women may need 28-40 lbs, while overweight women are advised to gain 15-25 lbs.",
  },
  {
    question: "When does pregnancy weight gain start?",
    answer:
      "Most women gain only 1-4 lbs (0.5-2 kg) in the first trimester (weeks 1-13). Steady weight gain usually begins in the second trimester, averaging about 1 lb (0.5 kg) per week.",
  },
  {
    question: "Is it safe to lose weight during pregnancy?",
    answer:
      "Intentionally losing weight during pregnancy is generally not recommended, even if you are overweight, as it can deprive the baby of essential nutrients. Always consult your healthcare provider before managing weight.",
  },
  {
    question: "Where does the extra weight go?",
    answer:
      "It's not just fat! The baby weighs about 7-8 lbs. The rest consists of the placenta, amniotic fluid, increased blood volume, breast tissue growth, and natural fluid retention.",
  },
  {
    question: "How does this calculator determine my target?",
    answer:
      "We use the official guidelines from the Institute of Medicine (IOM). By calculating your pre-pregnancy BMI, we determine the specific healthy weight gain range tailored to your body type.",
  },
];

export default function PregnancyWeightCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Pregnancy Weight Gain Calculator"
        description="Calculate personalized weight gain targets for your pregnancy based on BMI and IOM guidelines."
        url="https://calqulate.net/health/pregnancy-weight-gain-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Pregnancy Weight Gain Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Are you gaining enough? Or too much? Use our smart calculator to create a personalized 
                <strong> week-by-week weight gain chart</strong> based on your pre-pregnancy body type.
              </p>
            </div>

            {/* Calculator Component */}
            <PregnancyWeightGainCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Introduction Content */}
              <section className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-4">Why Tracking Pregnancy Weight Matters</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Gaining the right amount of weight during pregnancy is vital for the long-term health of both you and your baby. 
                  While "eating for two" is a common myth, the reality is about <strong>eating for health</strong>. 
                  Appropriate weight gain supports the development of the placenta, increases blood supply, and ensures your baby grows to a healthy size.
                </p>
              </section>

              {/* IOM Guidelines Table */}
              <section>
                <Card className="not-prose overflow-hidden border-t-4 border-t-pink-400">
                  <CardHeader className="bg-pink-50/50">
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-pink-500" />
                      Official IOM Weight Gain Guidelines
                    </CardTitle>
                    <CardDescription>
                      Institute of Medicine recommendations based on Pre-Pregnancy BMI
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                          <tr>
                            <th className="px-6 py-3">Pre-Pregnancy Weight Category</th>
                            <th className="px-6 py-3">BMI</th>
                            <th className="px-6 py-3">Total Recommended Gain</th>
                            <th className="px-6 py-3">Weekly Gain (2nd & 3rd Trimester)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-medium">Underweight</td>
                            <td className="px-6 py-4">&lt; 18.5</td>
                            <td className="px-6 py-4">28 – 40 lbs (12.5 – 18 kg)</td>
                            <td className="px-6 py-4">1.0 – 1.3 lbs</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 font-medium">Normal Weight</td>
                            <td className="px-6 py-4">18.5 – 24.9</td>
                            <td className="px-6 py-4">25 – 35 lbs (11.5 – 16 kg)</td>
                            <td className="px-6 py-4">0.8 – 1.0 lbs</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-medium">Overweight</td>
                            <td className="px-6 py-4">25.0 – 29.9</td>
                            <td className="px-6 py-4">15 – 25 lbs (7 – 11.5 kg)</td>
                            <td className="px-6 py-4">0.5 – 0.7 lbs</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 font-medium">Obese</td>
                            <td className="px-6 py-4">≥ 30.0</td>
                            <td className="px-6 py-4">11 – 20 lbs (5 – 9 kg)</td>
                            <td className="px-6 py-4">0.4 – 0.6 lbs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  * Note: For twin pregnancies, recommended ranges are generally higher. Our calculator adjusts for twins automatically.
                </p>
              </section>

              {/* Where Does the Weight Go? Visual Breakdown */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Where Does the Weight Go?</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="mb-4 text-gray-700">
                            It can be surprising to see the scale go up, but rest assured, it's not all fat storage. 
                            In a typical 30lb weight gain scenario, only about 7lbs is maternal fat stores (energy for breastfeeding). 
                            The rest is vital support for the baby.
                        </p>
                        <ul className="space-y-3">
                            {[
                                { label: "Baby", weight: "~ 7.5 lbs" },
                                { label: "Placenta", weight: "~ 1.5 lbs" },
                                { label: "Amniotic Fluid", weight: "~ 2.0 lbs" },
                                { label: "Uterine Enlargement", weight: "~ 2.0 lbs" },
                                { label: "Maternal Breast Tissue", weight: "~ 2.0 lbs" },
                                { label: "Maternal Blood Volume", weight: "~ 4.0 lbs" },
                                { label: "Fluids in Maternal Tissue", weight: "~ 4.0 lbs" },
                                { label: "Maternal Fat Stores", weight: "~ 7.0 lbs" },
                            ].map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-1">
                                    <span className="font-medium text-gray-600">{item.label}</span>
                                    <span className="font-bold text-primary">{item.weight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Placeholder for an image - using a card visual instead since I cannot upload assets */}
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-center text-blue-700">Healthy Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center">
                            <div className="relative w-64 h-64">
                                {/* Simple CSS Pie Chart representation or SVG illustration placeholder */}
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="25 100" /> {/* Baby */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ec4899" strokeWidth="20" strokeDasharray="20 100" strokeDashoffset="-25" /> {/* Fat */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="15 100" strokeDashoffset="-45" /> {/* Fluid */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="40 100" strokeDashoffset="-60" /> {/* Others */}
                                    <text x="50" y="50" textAnchor="middle" dy="5" fontSize="5" fill="black" transform="rotate(90 50 50)">Baby & Support</text>
                                </svg>
                            </div>
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* Tips for Healthy Weight Gain */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Tips for Healthy Weight Management</h2>
                <div className="grid sm:grid-cols-2 gap-6 not-prose">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Apple className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-lg">Focus on Nutrient Density</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Choose foods packed with nutrients like lean proteins, leafy greens, and whole grains rather than empty calories.</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <Activity className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-lg">Stay Active</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Gentle exercise like walking, swimming, or prenatal yoga helps regulate weight gain and prepares your body for labor.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-lg">Track, Don't Obsess</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Use this calculator to stay informed, but don't stress over minor fluctuations. Focus on how you feel.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <Heart className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-lg">Hydrate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Drinking plenty of water helps manage swelling (edema) and supports the increased blood volume.</p>
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                <p className="text-sm text-yellow-800">
                  <strong>Medical Disclaimer:</strong> This calculator provides estimates based on general IOM guidelines. Every pregnancy is unique. Always consult your doctor or midwife for personalized advice regarding your weight and health.
                </p>
              </div>

            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
            
            <p className="text-center text-muted-foreground mt-12 text-sm">
                Looking for more health insights? Try our <Link href="/health/body-shape-calculator" className="text-primary hover:underline">Body Shape Calculator</Link> to understand your postpartum changes.
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
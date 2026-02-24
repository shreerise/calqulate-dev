import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import SleepDebtCalculator from "@/components/calculators/sleep-debt-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Moon, BatteryWarning, Brain, HeartPulse, Activity, Zap, BedDouble } from "lucide-react"

export const metadata: Metadata = {
  title: "Sleep Debt Calculator: Calculate Your Sleep Deficit & Recovery Plan",
  description:
    "Find out exactly how much sleep debt you've accumulated. Our highly accurate Sleep Debt Calculator uses your weekday and weekend sleep patterns to give you a personalized recovery plan.",
  keywords:
    "sleep debt calculator, sleep deficit calculator, catch up on sleep, how much sleep do I need, sleep deprivation calculator, sleep calculator, sleep health, sleep recovery plan",
}

const faqs = [
  {
    question: "What is sleep debt?",
    answer:
      "Sleep debt, or sleep deficit, is the difference between the amount of sleep your body needs and the amount you actually get. For example, if you need 8 hours of sleep but only get 6, you accumulate 2 hours of sleep debt for that night.",
  },
  {
    question: "Can I recover from sleep debt?",
    answer:
      "Yes, but you can't just sleep for 14 hours on a weekend to fix it. It takes time to pay back sleep debt. For short-term debt, adding 1 to 2 extra hours of sleep on weekends or taking 20-minute power naps can help. For chronic debt, you need to slowly adjust your nightly routine by going to bed 15-30 minutes earlier over several weeks.",
  },
  {
    question: "How accurate is this sleep debt calculator?",
    answer:
      "Unlike basic calculators that just ask for a daily average, our tool calculates your debt based on your specific weekday and weekend habits. This industrial-standard approach gives a highly accurate picture of your actual sleep deficit over time.",
  },
  {
    question: "What happens if my sleep debt gets too high?",
    answer:
      "High or chronic sleep debt increases the risk of weight gain, weakened immunity, high blood pressure, cognitive decline, and mood swings. It changes how your body processes glucose and increases the stress hormone cortisol.",
  },
  {
    question: "How does sleep debt affect my body shape?",
    answer:
      "Lack of sleep triggers a spike in cortisol (the stress hormone), which signals your body to hold onto fat, especially around your midsection. If you're struggling to manage your weight despite dieting, sleep debt might be the culprit. We highly recommend using our Body Shape Calculator alongside this tool to track your health holistically.",
  },
  {
    question: "Do naps help reduce sleep debt?",
    answer:
      "Yes! Strategic power naps (20-30 minutes) can give you a quick boost of alertness and chip away at minor sleep debt without leaving you groggy or disrupting your nighttime sleep drive.",
  },
]

export default function SleepDebtCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Sleep Debt Calculator"
        description="Accurately calculate your sleep deficit and get a personalized, actionable recovery plan to restore your energy and health."
        url="https://calqulate.net/health/sleep-debt-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Sleep Debt Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Are you running on empty? Uncover exactly how much sleep you owe your body. 
                Our Sleep Debt Calculator goes beyond simple averages by analyzing your weekday 
                hustle and weekend recovery to give you an accurate deficit score and a personalized recovery plan.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Stop guessing why you are tired. Calculate your sleep debt instantly and reclaim your energy, focus, and health.
              </p>
            </div>

            {/* Calculator Component */}
            <SleepDebtCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* What is a Sleep Debt Calculator? */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 pb-2">
                  What is a Sleep Debt Calculator?
                </h2>
                <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  A Sleep Debt Calculator measures the cumulative effect of not getting enough sleep over a specific period. 
                  Every time you sleep less than your body ideally requires, that missed time goes into your "sleep debt." 
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Why we stand out:</strong> While standard calculators ask for a generic daily average, our tool separates 
                  your routine into <em>Weekdays</em> and <em>Weekends</em>. This is how the real world operates! Many people 
                  sacrifice sleep for work or school Monday through Friday, and attempt to "binge sleep" on Saturday and Sunday. 
                  This calculator factors that exact behavior into your total deficit.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl not-prose">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      More Than Just a Number
                    </CardTitle>
                    <CardDescription>
                      Here’s how our tool helps you optimize your recovery.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Precision Tracking:</strong> Adjusts for different weekend vs. weekday habits.</li>
                        <li><strong>Actionable Recovery:</strong> We don't just tell you you're tired; we tell you <em>how</em> to fix it safely over time.</li>
                        <li><strong>Health Impact:</strong> Understands how your current deficit impacts your brain, heart, and waistline.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center w-full h-32 bg-primary/10 rounded-xl border border-primary/20">
                        <BatteryWarning className="w-16 h-16 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-xs text-center">
                        Visualize your "Sleep Bank" and learn how to recharge your biological battery.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cross-Promotion: Sleep & Body Shape */}
              <section>
                <Card className="not-prose border-primary/40 bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                      <Activity className="w-6 h-6 text-primary" />
                      The Hidden Link Between Sleep Debt & Your Body Shape
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Did you know that your sleep schedule directly impacts your waistline? Chronic sleep debt raises 
                      cortisol levels and lowers insulin sensitivity, causing your body to store excess fat—specifically around your midsection. 
                      If you've been working out but aren't seeing results, your sleep deficit might be holding you back.
                    </p>
                    <Link 
                      href="/health/body-shape-calculator" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                    >
                      Try Our Body Shape Calculator
                    </Link>
                  </CardContent>
                </Card>
              </section>

              {/* Sleep Needs by Age Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Recommended Sleep by Age</CardTitle>
                    <CardDescription>
                      Based on guidelines from the National Sleep Foundation and the CDC. Use this to determine your "Ideal Sleep" target.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border px-4 py-3 text-left font-medium">Age Group</th>
                            <th className="border px-4 py-3 text-left font-medium">Recommended Hours</th>
                            <th className="border px-4 py-3 text-left font-medium">May Be Appropriate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Infants (4-11 months)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">12 - 15 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">10 to 18 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Toddlers (1-2 years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">11 - 14 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">9 to 16 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Preschoolers (3-5 years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">10 - 13 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">8 to 14 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">School-Age (6-13 years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">9 - 11 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">7 to 12 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Teenagers (14-17 years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">8 - 10 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">7 to 11 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium bg-primary/5">Adults (18-64 years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold bg-primary/5">7 - 9 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground bg-primary/5">6 to 10 hours</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-2 font-medium">Older Adults (65+ years)</td>
                            <td className="border px-4 py-2 text-blue-600 font-semibold">7 - 8 hours</td>
                            <td className="border px-4 py-2 text-muted-foreground">5 to 9 hours</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Signs you have Sleep Debt */}
              <section>
                <h2 className="mb-2"><b>Warning Signs of High Sleep Debt</b></h2>
                <p>If you're unsure if you're sleep deprived, your body usually provides clear signals. Look out for these symptoms:</p>
                <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Brain className="w-5 h-5" /> Cognitive Symptoms</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>• Difficulty focusing or frequent "brain fog".</p>
                      <p>• Increased irritability and mood swings.</p>
                      <p>• Memory issues, like forgetting why you walked into a room.</p>
                      <p>• Microsleeps (nodding off for a few seconds).</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><HeartPulse className="w-5 h-5" /> Physical Symptoms</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>• Constant sugar and carbohydrate cravings.</p>
                      <p>• Dark circles or puffy eyes.</p>
                      <p>• Getting sick more often due to a weakened immune system.</p>
                      <p>• Slower metabolism and unexpected weight gain.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to recover effectively */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BedDouble className="w-5 h-5" />
                      How to Safely Recover Your Sleep Debt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <p>
                      A common mistake is trying to "sleep it all off" in one go. If you sleep 14 hours on a Saturday, you'll disrupt your circadian rhythm and feel groggy (a condition known as "sleep drunkenness").
                    </p>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>
                        <b>The 20-Minute Nap Rule:</b> Short power naps before 3 PM can chip away at sleep debt without ruining your nighttime rest.
                      </li>
                      <li>
                        <b>Weekend Catch-Up:</b> Sleeping in for just 1-2 extra hours on weekends is healthy and can help resolve minor, acute sleep debt.
                      </li>
                      <li>
                        <b>The Incremental Approach:</b> For chronic sleep debt (over 15 hours), go to bed 15 to 30 minutes earlier every night. This slowly balances your sleep bank over several weeks.
                      </li>
                      <li>
                        <b>Sleep Hygiene Fixes:</b> Remove screens 1 hour before bed, keep your room cool (around 65°F / 18°C), and avoid late caffeine.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
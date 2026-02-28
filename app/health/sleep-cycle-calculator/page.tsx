import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import SleepCycleCalculator from "@/components/calculators/sleep-cycle-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Moon, Clock, Brain, BatteryCharging, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator: Find Your Optimal Bedtime & Wake Time",
  description:
    "Never wake up feeling groggy again. Our advanced Sleep Cycle Calculator factors in customized sleep latency and REM cycles to find your perfect bedtime and wake-up time.",
  keywords:
    "sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, rem sleep calculator, 90 minute sleep cycle, how much sleep do I need, optimal sleep calculator, sleep stages",
};

const faqs = [
  {
    question: "What is a sleep cycle?",
    answer:
      "A sleep cycle is a progression through the various stages of sleep, including light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. On average, one complete sleep cycle lasts about 90 minutes. Your body typically goes through four to six cycles per night.",
  },
  {
    question: "Why should I use a sleep cycle calculator?",
    answer:
      "Waking up in the middle of a deep sleep stage causes 'sleep inertia'—that groggy, heavy feeling that can ruin your morning. Our sleep cycle calculator helps you plan your bedtime or wake-up time so your alarm goes off at the end of a cycle, ensuring you wake up refreshed and alert.",
  },
  {
    question: "How many sleep cycles do I need?",
    answer:
      "Most healthy adults need exactly 5 sleep cycles per night, which equates to 7.5 hours of sleep. If you are recovering from an illness, an athlete, or a teenager, you might need 6 cycles (9 hours). 4 cycles (6 hours) is generally considered the minimum threshold for adults.",
  },
  {
    question: "What makes this sleep calculator different from others?",
    answer:
      "Standard calculators assume everyone takes exactly 15 minutes to fall asleep. Our tool allows you to customize your 'sleep latency' (the time it takes you to fall asleep), resulting in highly accurate cycle mapping. We also provide a visual timeline of your sleep phases.",
  },
  {
    question: "Is 6 hours of sleep enough?",
    answer:
      "Six hours translates to exactly 4 sleep cycles. While waking up at the end of 4 cycles will prevent grogginess in the morning, consistently getting only 6 hours of sleep builds 'sleep debt' and is not recommended for long-term health for most adults.",
  },
  {
    question: "What is REM sleep and why does it matter?",
    answer:
      "REM stands for Rapid Eye Movement. It's the final stage of a sleep cycle where dreaming occurs. Your brain activity is high during REM, closer to when you are awake. Because of this, waking up right after the REM stage feels much more natural than waking up during deep sleep.",
  },
  {
    question: "Does sleep affect my body weight and shape?",
    answer:
      "Absolutely! Poor sleep disrupts hunger hormones (ghrelin and leptin) and increases cortisol, leading to weight gain—particularly around the midsection. Optimizing your sleep cycle is just as important as diet when managing your body shape. We highly recommend using our Body Shape Calculator alongside this tool to track your health progress.",
  },
];

export default function SleepCycleCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Sleep Cycle Calculator"
        description="Find your optimal bedtime and wake time based on natural 90-minute sleep cycles. Wake up refreshed by avoiding sleep inertia."
        url="https://calqulate.net/health/sleep-cycle-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
                <Moon className="w-4 h-4" /> Better Sleep, Better Life
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4 leading-tight">
                Sleep Cycle Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Stop waking up tired. Calculate your optimal bedtime and wake-up times by aligning your alarm with your body's natural 90-minute sleep cycles. 
              </p>
            </div>

            {/* Main Interactive Tool */}
            <SleepCycleCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Introduction to Sleep Cycles */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" /> What is the Sleep Cycle Calculator?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  A Sleep Cycle Calculator does more than just count hours. Human sleep doesn't happen in a single flat block; instead, it progresses through a series of <strong>90-minute phases</strong> known as sleep cycles. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you've ever slept for 10 hours but woke up feeling exhausted, you likely woke up in the middle of "Deep Sleep." Conversely, you might have slept only 6 hours and felt surprisingly energized because you woke up right at the end of a cycle. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our advanced tool helps you calculate the exact minute to go to bed or set your alarm so you wake up during a natural transition point.
                </p>

                <Card className="mt-8 border border-indigo-100 dark:border-indigo-950/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20">
                  <CardContent className="grid md:grid-cols-2 gap-8 pt-6">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-3 mt-0">
                        <BatteryCharging className="w-5 h-5" /> Say Goodbye to Sleep Inertia
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Sleep inertia is the groggy, heavy feeling you get when your alarm abruptly interrupts deep sleep. 
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
                        <li><strong>Standard Calculators</strong> assume you fall asleep instantly or in exactly 15 minutes.</li>
                        <li><strong>Our Calculator</strong> allows you to input your exact sleep latency, ensuring mathematical precision.</li>
                        <li>We factor in optimal 7.5-hour (5 cycle) targets for peak adult performance.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                      <h4 className="font-bold text-center text-sm uppercase tracking-wide text-muted-foreground mb-3 mt-0">The 4 Stages of a Cycle</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-200"></div> NREM 1: Falling Asleep (5%)</div>
                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-400"></div> NREM 2: Light Sleep (45%)</div>
                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-800"></div> NREM 3: Deep Sleep (25%)</div>
                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-purple-500"></div> REM: Dreaming Phase (25%)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Age Chart */}
              <section>
                <Card className="not-prose border shadow-sm">
                  <CardHeader className="bg-slate-50 dark:bg-slate-800/50 rounded-t-xl border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" /> Recommended Sleep Cycles by Age
                    </CardTitle>
                    <CardDescription>
                      While 5 cycles (7.5 hours) is the gold standard for adults, younger individuals need more.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800 text-left">
                            <th scope="col" className="px-4 py-3 border-b font-semibold">Age Group</th>
                            <th scope="col" className="px-4 py-3 border-b font-semibold">Recommended Hours</th>
                            <th scope="col" className="px-4 py-3 border-b font-semibold">Total Sleep Cycles</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3">Infants (4-11 months)</td>
                            <td className="px-4 py-3">12–15 hours</td>
                            <td className="px-4 py-3 text-muted-foreground">Sleep cycles vary (shorter length)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3">School-age (6-13 years)</td>
                            <td className="px-4 py-3">9–11 hours</td>
                            <td className="px-4 py-3 font-medium">6 to 7 cycles</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3">Teenagers (14-17 years)</td>
                            <td className="px-4 py-3">8–10 hours</td>
                            <td className="px-4 py-3 font-medium">5 to 6 cycles</td>
                          </tr>
                          <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                            <td className="px-4 py-3 font-semibold text-primary">Adults (18-64 years)</td>
                            <td className="px-4 py-3 font-semibold text-primary">7–9 hours</td>
                            <td className="px-4 py-3 font-bold text-primary">5 cycles (Optimal)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3">Older Adults (65+ years)</td>
                            <td className="px-4 py-3">7–8 hours</td>
                            <td className="px-4 py-3 font-medium">4 to 5 cycles</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cross Linking Strategy (Boosts SEO & Engagement) */}
              <section>
                <Card className="not-prose overflow-hidden border-2 border-indigo-100 dark:border-indigo-900">
                  <div className="md:flex">
                    <div className="bg-indigo-50 dark:bg-indigo-950/50 p-6 md:w-1/3 flex items-center justify-center border-b md:border-b-0 md:border-r border-indigo-100 dark:border-indigo-900">
                      <div className="text-center">
                        <Activity className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
                        <h3 className="font-bold text-lg">The Sleep-Fitness Connection</h3>
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3 space-y-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Did you know that chronic sleep deprivation alters your body shape? Lack of sleep increases cortisol (the stress hormone), which signals your body to store belly fat. It also decreases muscle recovery after workouts.
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Once you've calculated your perfect sleep schedule, check out our highly popular <strong>Body Shape Calculator</strong>. It analyzes your measurements to tell you your exact body type (Apple, Pear, Hourglass, etc.) and provides tailored fitness and style tips.
                      </p>
                      <Button asChild variant="default">
                        <Link href="/health/body-shape-calculator">Discover Your Body Shape</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>

              {/* How to use the calculator effectively */}
              <section>
                <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">How to Use the Sleep Calculator Effectively</h2>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li><strong>Assess your sleep latency:</strong> Most people take 10-20 minutes to fall asleep. If you toss and turn for an hour, adjust the "Time to fall asleep" input to 60 minutes for accurate math.</li>
                  <li><strong>Aim for 5 cycles:</strong> For average adults, hitting the 7.5-hour mark (5 cycles) strikes the perfect balance between REM saturation and physical recovery.</li>
                  <li><strong>Use the "Now" feature:</strong> If you are exhausted and just want to crash immediately, click the "I am sleeping right now" tab. It will tell you exactly what time to set your alarm for immediately.</li>
                  <li><strong>Maintain consistency:</strong> The calculator works best if you use the calculated times to build a consistent daily routine. Go to bed at the exact same calculated time every day, including weekends.</li>
                </ul>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-16">
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
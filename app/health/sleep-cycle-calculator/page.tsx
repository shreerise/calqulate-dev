import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import SleepCycleCalculator from "@/components/calculators/sleep-cycle-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import Image from "next/image"
import { ClickableImage } from "@/components/ui/image-lightbox"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Moon,
  Info,
  Calculator as CalculatorIcon,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sun,
  BedDouble,
  Brain,
  Activity,
} from "lucide-react"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator: Find the Best Time to Sleep and Wake Up",
  description:
    "Use our sleep cycle calculator to find your ideal bedtime and wake up time. Learn how to complete full sleep cycles and wake up feeling refreshed every day.",
  keywords:
    "sleep cycle calculator, sleep calculator, best time to sleep, best time to wake up, sleep cycles, REM sleep, deep sleep, bedtime calculator, wake up time calculator",
  alternates: {
    canonical: "https://calqulate.net/health/sleep-cycle-calculator",
  },
}

const faqs = [
  {
    question: "What is a sleep cycle calculator?",
    answer:
      "A sleep cycle calculator is a tool that helps you find the best time to go to bed or wake up by counting time in 90-minute intervals. Its goal is to prevent your alarm from waking you up during deep sleep.",
  },
  {
    question: "How does a sleep calculator work?",
    answer:
      "It works by taking your desired wake up time or bedtime and adding or subtracting 90-minute blocks (representing human sleep cycles). It also factors in an average of 15 minutes to fall asleep.",
  },
  {
    question: "How long is a sleep cycle?",
    answer:
      "A natural human sleep cycle lasts approximately 90 minutes. During this time, the brain moves through light sleep, deep sleep, and REM sleep.",
  },
  {
    question: "How many sleep cycles do I need?",
    answer:
      "Most healthy adults need between 4 and 6 complete sleep cycles per night to feel fully rested. Five cycles (which equals 7.5 hours of sleep) is the ideal target for most people.",
  },
  {
    question: "Is 90 minutes always one full sleep cycle?",
    answer:
      "No. While 90 minutes is the scientifically accepted average, individual sleep cycles can range anywhere from 80 to 110 minutes depending on your genetics, age, and how long you have been asleep that night.",
  },
  {
    question: "What time should I go to bed if I wake up at 6 AM?",
    answer:
      "If you need to wake up at 6:00 AM, the best times to go to bed are 8:45 PM (for 6 cycles), 10:15 PM (for 5 cycles), or 11:45 PM (for 4 cycles). This includes 15 minutes to fall asleep.",
  },
  {
    question: "What time should I wake up if I sleep at 11 PM?",
    answer:
      "If you get into bed at 11:00 PM, aim to set your alarm for 5:30 AM (after 4 cycles), 7:00 AM (after 5 cycles), or 8:30 AM (after 6 cycles).",
  },
  {
    question: "Is 5 sleep cycles enough?",
    answer:
      "Yes, for most adults, 5 sleep cycles are enough. Five complete cycles equal 7.5 hours of sleep, which falls perfectly within the CDC's recommendation of 7 or more hours for adults.",
  },
  {
    question: "Why do I feel tired after sleeping 8 hours?",
    answer:
      "You may feel tired because your alarm woke you up mid-cycle during deep sleep or REM sleep. It could also be due to poor sleep quality, stress, or a fragmented sleep routine.",
  },
  {
    question: "Is it better to wake up during light sleep?",
    answer:
      "Yes. Waking up during Stage 1 or Stage 2 light sleep is ideal because your brain and body are already close to a state of wakefulness, preventing morning grogginess.",
  },
  {
    question: "How long does it take to fall asleep?",
    answer:
      "On average, it takes a healthy adult between 10 and 20 minutes to fall asleep. This period is known in sleep medicine as 'sleep latency.'",
  },
  {
    question: "Can a sleep cycle calculator improve sleep quality?",
    answer:
      "Yes. By helping you avoid waking up during deep sleep, a calculator can drastically reduce morning fatigue and help you establish a more consistent sleep schedule.",
  },
  {
    question: "What is REM sleep?",
    answer:
      "REM (Rapid Eye Movement) sleep is the phase of the cycle where your brain is highly active, and most vivid dreaming occurs. It is crucial for memory consolidation and emotional processing.",
  },
  {
    question: "What is Non-REM sleep?",
    answer:
      "Non-REM (NREM) sleep makes up the rest of your sleep cycle and is broken down into light sleep and deep sleep. Deep NREM sleep is essential for physical recovery and immune system health.",
  },
  {
    question: "Should I use a sleep cycle calculator every night?",
    answer:
      "You don't have to use it every single night. It is best used as a tool to help you discover your ideal bedtimes and wake times so you can establish a natural, recurring sleep routine.",
  },
]

export default function SleepCycleCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Sleep Cycle Calculator"
        description="Find your ideal bedtime and wake up time using 90-minute sleep cycle intervals. Wake up refreshed every day."
        url="https://calqulate.net/health/sleep-cycle-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Sleep Cycle Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                If you have ever slept for eight hours but still woken up feeling exhausted, you are not alone. The secret to waking up refreshed is not just about total hours — it is about timing your sleep cycles correctly.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Use this calculator to find your ideal bedtime or wake up time based on 90-minute sleep cycles, so you stop fighting your alarm every morning.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-8 border-l-4 border-blue-400 bg-blue-50/60 p-4 rounded-r-xl text-sm text-gray-600">
              <strong>Disclaimer:</strong> This sleep cycle calculator and guide provide general educational information and are not intended as a medical diagnosis. If you suffer from chronic insomnia, severe daytime sleepiness, symptoms of sleep apnea, or other persistent sleep disorders, please consult a healthcare provider or a sleep medicine doctor.
            </div>

            {/* Calculator Component */}
            <SleepCycleCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* How to Use */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CalculatorIcon className="w-6 h-6 text-indigo-600" />
                  How to Use the Sleep Cycle Calculator
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  To use the calculator, you simply need to know your schedule. Are you trying to figure out what time you should go to bed to wake up for work? Or are you heading to bed right now and need to set your alarm?
                </p>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Our calculator features two distinct modes to match your needs:
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg font-bold text-indigo-800">
                        <Sun className="w-5 h-5" />
                        Mode 1: "I want to wake up at..."
                      </CardTitle>
                      <CardDescription className="text-indigo-700 text-sm">
                        If you have a strict morning schedule, use this mode.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 space-y-2">
                      <p>• Enter your desired wake up time (e.g., 6:30 AM).</p>
                      <p>• The calculator counts backward in 90-minute blocks.</p>
                      <p>• It provides suggested bedtimes for 4, 5, or 6 full sleep cycles.</p>
                      <p>• It automatically adds 15 minutes to account for the time to fall asleep.</p>
                    </CardContent>
                  </Card>

                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg font-bold text-indigo-800">
                        <Moon className="w-5 h-5" />
                        Mode 2: "I want to go to bed at..."
                      </CardTitle>
                      <CardDescription className="text-indigo-700 text-sm">
                        If you are ready for bed and want to know when to set your alarm.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 space-y-2">
                      <p>• Enter your current bedtime (e.g., 10:30 PM).</p>
                      <p>• The calculator counts forward in 90-minute blocks.</p>
                      <p>• It suggests optimal alarm times after completing 4, 5, or 6 cycles.</p>
                      <p>• It factors in a 15-minute buffer to fall asleep.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Formula & Examples */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CalculatorIcon className="w-6 h-6 text-indigo-600" />
                  The Sleep Calculator Formula
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Behind the scenes, the calculator uses a simple but highly effective formula:
                </p>

                <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden mb-8">
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">The Formula:</h3>
                      <ul className="space-y-2 text-gray-600 mb-4">
                        <li>• <strong>Sleep cycle length:</strong> 90 minutes</li>
                        <li>• <strong>Recommended cycles:</strong> 4 to 6 per night</li>
                        <li>• <strong>Time to fall asleep:</strong> 10 to 20 minutes (default: 15 minutes)</li>
                      </ul>
                      <p className="bg-gray-100 p-4 rounded-lg font-mono text-center text-base border-l-4 border-indigo-600">
                        5 cycles × 90 min = 7.5 hrs of sleep
                      </p>
                    </div>
                    <div className="flex flex-col justify-center bg-white border border-indigo-100 rounded-xl p-5">
                      <h3 className="text-indigo-800 font-bold mb-3">Quick Reference:</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>4 cycles</strong> = approx. 6 hours of sleep</p>
                        <p><strong>5 cycles</strong> = approx. 7.5 hours of sleep</p>
                        <p><strong>6 cycles</strong> = approx. 9 hours of sleep</p>
                        <p className="pt-2 border-t mt-2 text-indigo-700 font-semibold">
                          5 cycles is the sweet spot for most adults!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Example Calculations for Your Sleep Routine</h3>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-3">
                      <CardTitle className="text-base font-bold text-indigo-800">
                        Example 1: Ideal Bedtime
                      </CardTitle>
                      <CardDescription className="text-indigo-700 text-sm">
                        Wake up at 6:30 AM
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left py-2 text-gray-600 font-semibold">Bedtime</th>
                            <th className="text-left py-2 text-gray-600 font-semibold">Cycles</th>
                            <th className="text-left py-2 text-gray-600 font-semibold">Sleep</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-gray-700">
                          <tr>
                            <td className="py-2">9:15 PM</td>
                            <td className="py-2">6 cycles</td>
                            <td className="py-2">9 hrs</td>
                          </tr>
                          <tr className="bg-indigo-50/50">
                            <td className="py-2 font-semibold text-indigo-700">10:45 PM</td>
                            <td className="py-2 font-semibold text-indigo-700">5 cycles ⭐</td>
                            <td className="py-2 font-semibold text-indigo-700">7.5 hrs</td>
                          </tr>
                          <tr>
                            <td className="py-2">12:15 AM</td>
                            <td className="py-2">4 cycles</td>
                            <td className="py-2">6 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>

                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-3">
                      <CardTitle className="text-base font-bold text-indigo-800">
                        Example 2: Ideal Wake Up Time
                      </CardTitle>
                      <CardDescription className="text-indigo-700 text-sm">
                        Going to bed at 10:30 PM
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left py-2 text-gray-600 font-semibold">Wake Up</th>
                            <th className="text-left py-2 text-gray-600 font-semibold">Cycles</th>
                            <th className="text-left py-2 text-gray-600 font-semibold">Sleep</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-gray-700">
                          <tr>
                            <td className="py-2">5:00 AM</td>
                            <td className="py-2">4 cycles</td>
                            <td className="py-2">6 hrs</td>
                          </tr>
                          <tr className="bg-indigo-50/50">
                            <td className="py-2 font-semibold text-indigo-700">6:30 AM</td>
                            <td className="py-2 font-semibold text-indigo-700">5 cycles ⭐</td>
                            <td className="py-2 font-semibold text-indigo-700">7.5 hrs</td>
                          </tr>
                          <tr>
                            <td className="py-2">8:00 AM</td>
                            <td className="py-2">6 cycles</td>
                            <td className="py-2">9 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* What Is a Sleep Cycle */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Moon className="w-6 h-6 text-indigo-600" />
                  What Is a Sleep Cycle?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  To truly improve your sleep quality, it helps to understand what your brain is doing overnight. A sleep cycle is the repeating, biological pattern your brain and body go through while you sleep.
                </p>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  On average, a 90-minute sleep cycle carries you from light sleep, down into the deepest stages of physical rest, and finally into a stage of vivid dreaming. Once a cycle finishes, the process loops and starts all over again. Most healthy adults will complete between four and six of these cycles over the course of a normal night.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These cycles are broadly categorized into two main types of sleep: Non-REM sleep (NREM) and REM sleep.
                </p>
              </section>

              {/* Sleep Stages */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-6 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  What Happens During a Sleep Cycle?
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  A single cycle is made up of distinct stages of sleep. Let's break down the sleep stages simply:
                </p>

                <div className="not-prose grid md:grid-cols-2 gap-6">
                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-3">
                      <CardTitle className="text-base font-bold text-indigo-800">
                        Stage 1: The Dozing Off Phase (NREM)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        This is the lightest light sleep phase. It acts as the transition period between wakefulness and sleep. During this brief stage (lasting only 1 to 7 minutes), your heartbeat, breathing, and eye movements begin to slow down. Your muscles relax, occasionally twitching. Because this sleep is so light, it is very easy to wake someone up. <strong>This is the absolute best stage to wake up from.</strong>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-indigo-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50 pb-3">
                      <CardTitle className="text-base font-bold text-indigo-800">
                        Stage 2: Light Sleep (NREM)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        Before you enter deep sleep, you spend a significant amount of time in Stage 2. Your body temperature drops, and your heart rate slows down even further. Your eye movement stops entirely, and your brain waves slow, though there are brief bursts of electrical activity (called sleep spindles) that help process memories. You spend roughly 50% of your total sleep time in this stage.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-purple-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-purple-50 pb-3">
                      <CardTitle className="text-base font-bold text-purple-800">
                        Stage 3: Deep Sleep Stage (NREM)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        This is the restorative, heavy sleep your body needs to heal. During the deep sleep stage, your blood pressure drops, breathing is slow and steady, and it becomes very difficult to be awakened. This stage is critical for tissue repair, muscle growth, bone building, and strengthening the immune system. <strong>Waking up mid-cycle during Stage 3 is what causes severe morning grogginess and brain fog.</strong>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-purple-100 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-purple-50 pb-3">
                      <CardTitle className="text-base font-bold text-purple-800">
                        Stage 4: REM Sleep (Rapid Eye Movement)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        After deep sleep, you transition into REM sleep. Your eyes dart rapidly beneath your eyelids. Your brain waves become highly active, resembling the brain activity of a person who is awake. This is the stage where most vivid dreams occur. REM sleep is essential for cognitive functions like creativity, learning, and emotional regulation. While your brain is highly active, your body enters a state of temporary paralysis to stop you from acting out your dreams.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <p className="mt-6 text-gray-600 italic text-center">
                  As the night progresses, your deep sleep stages get shorter, and your REM sleep stages get longer.
                </p>
              </section>

              {/* Why Waking Up at End of Cycle Helps */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-indigo-600" />
                  Why Waking Up at the End of a Sleep Cycle Helps
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Have you ever woken up before your alarm, checked the clock, gone back to sleep for 45 minutes, and then woken up feeling entirely exhausted? You interrupted your sleep architecture.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  The main philosophy behind a sleep calculator is timing. The goal is to complete full sleep cycles rather than interrupting them. Waking up during a light sleep phase (Stage 1 or 2) aligns beautifully with your body's natural transition toward wakefulness.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Conversely, when your alarm blares while you are buried in deep NREM sleep or in the middle of a vivid REM dream, you experience "sleep inertia." Sleep inertia is that heavy, confused, dragging feeling that can impair your cognitive function and mood for hours. By calculating your sleep correctly, you aim to have your alarm gently wake you just as a 90-minute cycle is ending, ensuring you wake up feeling refreshed.
                </p>
              </section>

              {/* How Much Sleep Do I Need */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BedDouble className="w-6 h-6 text-indigo-600" />
                  How Much Sleep Do I Need?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  While timing your cycles is vital, total hours of sleep still matter heavily. The answer largely depends on your age, lifestyle, overall health, and daily physical exertion.
                </p>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  The Centers for Disease Control and Prevention (CDC) and the National Sleep Foundation have established guidelines for recommended sleep by age. Below is a look at the sleep needs across different age groups:
                </p>

                {/* Infographic Image */}
                <div className="mb-6 flex justify-center">
                  <a href="/recommendation-sleep-cycle-by-age-infographic.png" target="_blank" rel="noopener noreferrer">
                    <ClickableImage
                      src="/recommendation-sleep-cycle-by-age-infographic.png"
                      alt="How Much Sleep Do I Need? Infographic showing recommended sleep hours by age group"
                      width={400}
                      height={200}
                      className="rounded-xl shadow-sm border border-gray-100"
                      priority
                    />
                  </a>
                </div>

                <Card className="not-prose border-indigo-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-indigo-600 text-white">
                            <th className="px-6 py-4 text-left font-bold">Age Group</th>
                            <th className="px-6 py-4 text-left font-bold">Recommended Sleep</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="px-6 py-4 font-medium">Newborns (0–3 months)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">14–17 hours</td>
                          </tr>
                          <tr className="bg-indigo-50/40">
                            <td className="px-6 py-4 font-medium">Infants (4–12 months)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">12–16 hours (including naps)</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium">Toddlers (1–2 years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">11–14 hours (including naps)</td>
                          </tr>
                          <tr className="bg-indigo-50/40">
                            <td className="px-6 py-4 font-medium">Preschoolers (3–5 years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">10–13 hours (including naps)</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium">School-age children (6–12 years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">9–12 hours</td>
                          </tr>
                          <tr className="bg-indigo-50/40">
                            <td className="px-6 py-4 font-medium">Teenagers (13–18 years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">8–10 hours</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium">Adults (18–60 years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">7 or more hours</td>
                          </tr>
                          <tr className="bg-indigo-50/40">
                            <td className="px-6 py-4 font-medium">Older adults (61+ years)</td>
                            <td className="px-6 py-4 text-indigo-700 font-semibold">7–8 hours</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <p className="mt-4 text-sm text-center italic text-gray-500">
                  Remember, these are averages. A person recovering from an illness, an athlete in heavy training, or a pregnant woman may require more sleep than the baseline recommendation.
                </p>
              </section>

              {/* How Many Cycles */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  How Many Sleep Cycles Should You Get?
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  For most adults, the medical community recommends aiming for 4 to 6 sleep cycles per night.
                </p>

                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { cycles: "4 Cycles", sleep: "Approx. 6 hours", color: "bg-indigo-50 text-indigo-700" },
                    { cycles: "5 Cycles ⭐", sleep: "Approx. 7.5 hours", color: "bg-indigo-600 text-white" },
                    { cycles: "6 Cycles", sleep: "Approx. 9 hours", color: "bg-indigo-50 text-indigo-700" },
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl text-center ${item.color}`}>
                      <p className="text-sm uppercase tracking-widest opacity-80 mb-1">Per Night</p>
                      <p className="text-2xl font-bold mb-2">{item.cycles}</p>
                      <div className="h-px bg-current opacity-20 my-2" />
                      <p className="font-semibold">{item.sleep}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-gray-600 italic">
                  For the vast majority of adults, targeting 5 full sleep cycles (7.5 hours) is the perfect sweet spot.
                </p>
              </section>

              {/* What Time Should I Go to Bed */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Moon className="w-6 h-6 text-indigo-600" />
                  What Time Should I Go to Bed?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  If you are asking, "What time should I go to bed?" the answer relies on knowing your morning commitments. To manually calculate your ideal bedtime:
                </p>
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 not-prose">
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
                      <p>Identify your exact wake-up time (e.g., 7:00 AM).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
                      <p>Count backward in 90-minute blocks. Counting back five cycles (7.5 hours) lands you at 11:30 PM.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</span>
                      <p>Add your time to fall asleep (10 to 20 minutes).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">4</span>
                      <p><strong>Your ideal time to get into bed and turn off the lights is 11:15 PM.</strong></p>
                    </li>
                  </ol>
                </div>
              </section>

              {/* What Time Should I Wake Up */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-indigo-600" />
                  What Time Should I Wake Up?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  If you are a night owl or have a variable schedule, you might ask, "What time should I wake up?"
                </p>
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 not-prose">
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
                      <p>Note the time your head hits the pillow (e.g., midnight).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
                      <p>Give yourself 15 minutes to fall asleep (12:15 AM).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</span>
                      <p>Add 4, 5, or 6 blocks of 90 minutes.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">4</span>
                      <p><strong>To get 5 full cycles, set your alarm for 7:45 AM.</strong></p>
                    </li>
                  </ol>
                </div>
              </section>

              {/* Why Tired After 8 Hours */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Why Do I Wake Up Tired After 8 Hours of Sleep?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  It can be incredibly frustrating to commit to a full eight hours in bed, only to wake up feeling like a zombie. There are several potential culprits:
                </p>

                <div className="not-prose grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Waking Up Mid-Cycle",
                      desc: "Interrupting deep or REM sleep causes sleep inertia — that heavy, groggy morning feeling.",
                    },
                    {
                      title: "Poor Sleep Quality",
                      desc: "You may be in bed for 8 hours, but if you are tossing and turning, you are not getting 8 hours of restful sleep.",
                    },
                    {
                      title: "Inconsistent Sleep Schedule",
                      desc: "Going to bed at 10 PM on Tuesday and 2 AM on Saturday confuses your body's internal clock.",
                    },
                    {
                      title: "Dietary Choices",
                      desc: "Heavy meals, alcohol, or caffeine consumed too close to bedtime can severely fragment your sleep architecture.",
                    },
                    {
                      title: "Stress and Anxiety",
                      desc: "High cortisol levels prevent your brain from slipping into the deepest, most restorative stages of NREM sleep.",
                    },
                    {
                      title: "Screen Use",
                      desc: "Blue light from phones suppresses melatonin (the sleep hormone), making it harder to fall and stay asleep.",
                    },
                    {
                      title: "Underlying Sleep Disorders",
                      desc: "Conditions like sleep apnea can pull you out of deep sleep dozens of times a night without you realizing it.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl">
                      <h4 className="font-bold text-orange-800 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Circadian Rhythm */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  Circadian Rhythm and Your Internal Clock
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  To get the most out of your sleep calculator, you should understand how it pairs with your circadian rhythm.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Your circadian rhythm is essentially your body's internal clock. Operating on a roughly 24-hour cycle, this system regulates feelings of sleepiness and alertness based largely on environmental cues — primarily light and darkness.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When the sun goes down, your eyes send a signal to your brain to release melatonin, making you sleepy. When the sun comes up, cortisol is released to wake you up. Maintaining a consistent sleep schedule respects this internal clock. If you constantly shift your sleep routine, you give yourself "social jetlag," making it much harder to fall asleep quickly and wake up naturally.
                </p>
              </section>

              {/* Tips to Improve Sleep Quality */}
              <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <h2 className="text-2xl font-bold mb-6 text-indigo-900">
                  Tips to Improve Your Sleep Quality
                </h2>
                <p className="text-gray-700 mb-6">
                  A calculator is a great tool, but it works best when combined with excellent sleep hygiene. Here are actionable tips:
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  {[
                    {
                      title: "Keep a Consistent Sleep Schedule",
                      desc: "Go to bed and wake up at the exact same time every day, even on weekends.",
                    },
                    {
                      title: "Get Morning Sunlight",
                      desc: "Exposure to natural light within 30 minutes of waking up anchors your circadian rhythm.",
                    },
                    {
                      title: "Watch the Caffeine",
                      desc: "Avoid coffee and energy drinks in the late afternoon and evening.",
                    },
                    {
                      title: "Unplug Before Bed",
                      desc: "Put away smartphones, tablets, and laptops at least an hour before sleep to reduce blue light exposure.",
                    },
                    {
                      title: "Optimize Your Bedroom",
                      desc: "Keep your bedroom cool (around 65°F or 18°C), pitch dark, and as quiet as possible.",
                    },
                    {
                      title: "Create a Winding Down Routine",
                      desc: "Read a physical book, take a warm bath, or do light stretching to signal to your body that it is time to rest.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                      <h4 className="font-bold text-indigo-700 text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Limitations */}
              <section className="border-l-4 border-orange-400 bg-orange-50/50 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" /> Sleep Cycle Calculator Limitations
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  While aiming for 90-minute blocks is an excellent biological hack, it is important to acknowledge that the human body is not a machine.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-gray-600 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p><strong>90 Minutes is an Average:</strong> For some people, a cycle might be 80 minutes; for others, it might be 110 minutes.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Cycles Change Length:</strong> Your first cycle of the night might be 100 minutes, while later cycles might shrink to 80 minutes as REM sleep increases.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Varying Fall-Asleep Times:</strong> A highly stressed individual might take 45 minutes to fall asleep, throwing off the alarm math.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Because of this, a sleep cycle calculator should be viewed as a highly educated guide rather than an exact medical prescription. If you find yourself waking up groggy on a 7.5-hour schedule, try adjusting your alarm by 15 minutes earlier or later to find your personal biological rhythm.
                </p>
              </section>

              {/* Final Note */}
              <section className="text-center py-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Stop waking up mid-cycle. Start waking up refreshed.
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Finding the perfect balance of rest does not require complex math, but it does require an understanding of how your body works. By aiming for 4 to 6 cycles, factoring in 10 to 20 minutes to fall asleep, and keeping a consistent sleep schedule, you can conquer sleep inertia and finally wake up feeling ready to take on the day.
                </p>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
            <AuthorSection />
          </div>
        </div>
      </main>

      {/* Author Schema */}
      <AuthorSchema />

      <Footer />
    </div>
  )
}

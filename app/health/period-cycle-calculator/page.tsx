import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PeriodCycleCalculator from "@/components/calculators/period-cycle-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  CalendarDays,
  HeartPulse,
  FlaskConical,
  BookOpen,
  ShieldAlert,
  Microscope,
  Info,
  FileText,
  Activity,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─────────────────────────────────────────────────────────────────
// METADATA — title & description built from top GSC clusters:
// "period cycle calculator" (27 imp), "menstrual cycle calculator" (63),
// "accurate period calculator" (13), "calculate menstrual cycle" (7),
// "cycle length calculator" (9), "irregular period calculator" (5),
// "menstrual phase calculator" (4), "pms cycle calculator" (4)
// ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Period Cycle Calculator – Predict Next Period, Ovulation & Fertile Days",
  description:
    "Free period cycle calculator: predict your next period date, ovulation day, and fertile window using your LMP and cycle length. Covers irregular periods, menstrual phases, and PMS windows.",
  keywords:
    "period cycle calculator, menstrual cycle calculator, period calculator, calculate menstrual cycle, cycle length calculator, ovulation calculator, fertile window calculator, irregular period calculator, menstrual phase calculator, pms cycle calculator, accurate period calculator, how to calculate menstrual cycle, how to calculate ovulation, menstrual cycle length, next period date, safe period calculator",
    alternates: {
      canonical: "https://calqulate.net/health/period-cycle-calculator",
    }
}

// ─────────────────────────────────────────────────────────────────
// FAQ — every question maps to a real GSC query:
// "how to calculate period cycle" (10), "how to calculate menstrual cycle" (13),
// "how to calculate ovulation" cluster, "irregular period" (5),
// "fertile window" cluster, "period late" cluster,
// "safe period calculator" implied, "pms cycle" (4)
// ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How do I calculate my period cycle days?",
    answer:
      "Count from Day 1 of your last period (first day of full bleeding) to Day 1 of your next period. That total is your cycle length. The average menstrual cycle is 26–32 days; most calculators default to 28. For accuracy, track 3–6 consecutive cycles and calculate the average.",
  },
  {
    question: "How to calculate the ovulation date from my cycle length?",
    answer:
      "Use the formula: Ovulation Day = Cycle Length − 14. Ovulation occurs approximately 14 days before your next period — not necessarily 14 days after it starts. For a 28-day cycle, ovulation falls around Day 14. For a 30-day cycle, it's around Day 16. For a 35-day cycle, approximately Day 21.",
  },
  {
    question: "How to calculate menstrual cycle length accurately?",
    answer:
      "Track 3–6 consecutive cycles. Add the total days across all cycles and divide by the number of cycles to get your average. For example: cycles of 26, 29, 28, and 27 days → average = 27.5 days. Apps, Basal Body Temperature (BBT) charts, and LH ovulation test strips significantly improve accuracy over calendar counting alone.",
  },
  {
    question: "Can I use this calculator for irregular periods?",
    answer:
      "Yes. Track your shortest and longest cycle over 6 months. Your fertile window starts on (shortest cycle − 18) and ends on (longest cycle − 11). For example, if your shortest cycle is 25 days and your longest is 32 days: first fertile day = Day 7, last fertile day = Day 21. Combine with BBT tracking and ovulation predictor kits (OPKs) for the best accuracy.",
  },
  {
    question: "What is a fertile window and how many days after my period does it begin?",
    answer:
      "Your fertile window spans 6 days — the 5 days before ovulation plus the ovulation day itself. Sperm can survive in the reproductive tract for up to 5 days, while the egg survives only 12–24 hours after release. For a 28-day cycle with a 5-day period, fertile days typically begin around Day 9, approximately 3–5 days after bleeding stops.",
  },
  {
    question: "Why is my period late — and when should I test for pregnancy?",
    answer:
      "Periods can be late due to stress, significant weight change, intense exercise, illness, travel, thyroid dysfunction, PCOS, or certain medications. If you are 5–7 days late and have had unprotected sex, take a home pregnancy test. A positive result or ongoing irregularity warrants a consultation with your healthcare provider.",
  },
  {
    question: "Is a safe period calculator reliable for contraception?",
    answer:
      "No. No calendar-based or rhythm method is 100% reliable. Ovulation can shift by 3–5 days in either direction due to stress, sleep disruption, hormonal fluctuation, or illness. Calendar methods have a typical-use failure rate of around 24% per year. For pregnancy prevention, always use clinically validated contraception alongside any tracking method.",
  },
  {
    question: "How often should I recalculate my cycle predictions?",
    answer:
      "Update your cycle data every 1–3 months, or immediately after any significant life change — illness, major stress, new medications, significant weight change, or starting/stopping hormonal contraception. Your cycle is a dynamic health signal that shifts with your physiology; treating predictions as permanent is the most common tracking mistake.",
  },
]

export default function PeriodCycleCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Period Cycle Calculator"
        description="Free period cycle calculator using LMP and average cycle length. Predict your next period date, ovulation day, and fertile window. Includes support for irregular cycles and menstrual phase breakdown."
        url="https://calqulate.net/health/period-cycle-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* ── HERO ── */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Period Cycle Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Accurately predict your <strong>next period date</strong>, <strong>ovulation day</strong>,
                and <strong>fertile window</strong> using your last menstrual period (LMP) date and average
                cycle length — the same inputs used by clinical cycle-tracking tools.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you want to <strong>calculate your menstrual cycle</strong> for family planning,
                understand your fertile days, track an irregular period, or simply know when your next
                period starts — this free menstrual cycle calculator gives you a complete picture in seconds.
              </p>
            </div>

            {/* ── CALCULATOR COMPONENT ── */}
            <PeriodCycleCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* ── WHAT IS A PERIOD CYCLE CALCULATOR ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-rose-500" />
                  What Is a Period Cycle Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  A <strong>period cycle calculator</strong> — also called a <strong>menstrual cycle calculator</strong> or{" "}
                  <strong>menstruation calculator</strong> — estimates three critical dates using two inputs:
                  the <strong>first day of your last menstrual period (LMP)</strong> and your{" "}
                  <strong>average cycle length</strong>.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  In short: the calculator answers the three questions every person with a cycle asks — <em>when
                  will my next period start?</em>, <em>when am I ovulating?</em>, and <em>when are my most
                  fertile days?</em> An accurate prediction matters because irregular estimates cause unnecessary
                  anxiety, missed family-planning windows, and overlooked signs of hormonal irregularities
                  like PCOS or thyroid dysfunction.
                </p>

                <div className="grid md:grid-cols-3 gap-4 not-prose mt-6">
                  {[
                    {
                      icon: <CalendarDays className="w-5 h-5 text-rose-500" />,
                      title: "Next Period Date",
                      desc: "Predicts when your next bleed will start based on your cycle length and LMP.",
                      color: "border-rose-200",
                    },
                    {
                      icon: <Activity className="w-5 h-5 text-emerald-500" />,
                      title: "Ovulation Date",
                      desc: "Estimates the day your dominant follicle releases an egg — your peak fertility day.",
                      color: "border-emerald-200",
                    },
                    {
                      icon: <HeartPulse className="w-5 h-5 text-amber-500" />,
                      title: "Fertile Window",
                      desc: "The 6-day window (5 days before ovulation + ovulation day) when conception is possible.",
                      color: "border-amber-200",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`p-5 border-2 ${item.color} rounded-2xl bg-white shadow-sm`}
                    >
                      <div className="mb-2">{item.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── HOW TO CALCULATE YOUR MENSTRUAL CYCLE LENGTH ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-rose-500" />
                  How to Calculate Your Menstrual Cycle Length
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Knowing <strong>how to calculate your menstrual cycle</strong> accurately is the
                  foundation of all period and fertility tracking. The calculation is simpler than most
                  people expect — the difficulty lies in consistency, not complexity.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                  Step-by-Step: How to Count Your Menstrual Cycle
                </h3>
                <div className="space-y-4 not-prose">
                  {[
                    {
                      step: 1,
                      title: "Identify Day 1",
                      body: "Day 1 is the first day of full bleeding — not light spotting. This is also your LMP (Last Menstrual Period) date, and it is the universal starting point for all cycle, ovulation, and pregnancy calculations.",
                    },
                    {
                      step: 2,
                      title: "Count to the Next Period",
                      body: "Count every day from Day 1 of your current cycle until — but not including — the first day of your next period. Every day counts, including the bleeding days themselves.",
                    },
                    {
                      step: 3,
                      title: "That Number Is Your Cycle Length",
                      body: "If your last period started March 1 and your next began March 29, your cycle length is 28 days. If your next period started March 25, your cycle is 24 days.",
                    },
                    {
                      step: 4,
                      title: "Average Over 3–6 Cycles",
                      body: "A single cycle is rarely representative. Track 3–6 consecutive months and calculate the mean. This is your personal average cycle length — the most reliable input for a menstrual cycle calculator.",
                    },
                  ].map(({ step, title, body }) => (
                    <div key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {step}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">{title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-rose-50 border border-rose-100 rounded-2xl not-prose">
                  <p className="text-sm font-bold text-rose-700 mb-1">📐 Cycle Length Formula</p>
                  <p className="font-mono text-sm text-rose-900">
                    Cycle Length = Day 1 of current period → Day 1 of next period
                  </p>
                  <p className="text-xs text-rose-600 mt-2">
                    The average menstrual cycle is <strong>26–32 days</strong>. The statistical mean is 28 days,
                    but fewer than 15% of people have an exactly 28-day cycle.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">
                  Cycle Length vs. Period Duration — What's the Difference?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  These two numbers are frequently confused. Your <strong>cycle length</strong> is the full
                  span from one period's first day to the next (e.g., 28 days). Your <strong>period
                  duration</strong> is how many days you bleed (typically 3–7 days). Only cycle length
                  determines when you ovulate. Period duration does not shift your fertile window — a common
                  misconception that leads to inaccurate predictions.
                </p>
              </section>

              {/* ── THE 4 PHASES ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-rose-500" />
                  The 4 Phases of Your Menstrual Cycle Explained
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  A <strong>menstrual phase calculator</strong> breaks your cycle into four hormonally distinct
                  phases. Understanding each phase helps you predict symptoms, energy levels, and fertility
                  windows far beyond what a basic period date calculator offers.
                </p>

                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  {[
                    {
                      phase: "Menstrual Phase",
                      days: "Day 1–5",
                      icon: "🩸",
                      color: "border-rose-400",
                      bg: "bg-rose-50",
                      text: "text-rose-700",
                      desc: "Uterine lining sheds. Estrogen and progesterone are at their lowest. Energy is lower — rest is physiologically appropriate, not laziness.",
                    },
                    {
                      phase: "Follicular Phase",
                      days: "Day 1–13",
                      icon: "🌱",
                      color: "border-amber-400",
                      bg: "bg-amber-50",
                      text: "text-amber-700",
                      desc: "FSH rises to mature the dominant follicle. Estrogen rises and rebuilds the endometrium. Energy, focus, and mood typically improve through this phase.",
                    },
                    {
                      phase: "Ovulation",
                      days: "Day ~14",
                      icon: "🥚",
                      color: "border-emerald-400",
                      bg: "bg-emerald-50",
                      text: "text-emerald-700",
                      desc: "LH surge causes the dominant follicle to release an egg. Cervical mucus becomes clear and stretchy (egg-white consistency). Peak fertility — the egg survives 12–24 hours.",
                    },
                    {
                      phase: "Luteal Phase",
                      days: "Day 15–28",
                      icon: "🌙",
                      color: "border-violet-400",
                      bg: "bg-violet-50",
                      text: "text-violet-700",
                      desc: "Corpus luteum secretes progesterone. If no fertilisation occurs, progesterone drops → next period. PMS symptoms (bloating, mood shifts, fatigue) typically appear in the final 7–10 days.",
                    },
                  ].map((p) => (
                    <div
                      key={p.phase}
                      className={`p-5 border-2 ${p.color} ${p.bg} rounded-2xl`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{p.icon}</span>
                        <span className={`font-bold ${p.text}`}>{p.phase}</span>
                        <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-white ${p.text}`}>
                          {p.days}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── HOW TO CALCULATE OVULATION ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FlaskConical className="w-6 h-6 text-rose-500" />
                  How to Calculate Your Ovulation Date and Fertile Window
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Calculating your <strong>ovulation date</strong> is the most critical step in fertility and
                  natural cycle tracking. Ovulation does <em>not</em> always occur 14 days after your period
                  starts — it occurs approximately <strong>14 days before your next expected period</strong>.
                  This distinction matters enormously for accuracy.
                </p>

                <div className="grid md:grid-cols-2 gap-4 not-prose mb-6">
                  <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <p className="text-sm font-bold text-emerald-700 mb-2">🧮 Ovulation Date Formula</p>
                    <p className="font-mono text-sm text-emerald-900">
                      Ovulation Day = Cycle Length − 14
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-emerald-800">
                      <li>28-day cycle → Day 14</li>
                      <li>30-day cycle → Day 16</li>
                      <li>35-day cycle → Day 21</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-sm font-bold text-amber-700 mb-2">🌿 Fertile Window Formula</p>
                    <p className="font-mono text-sm text-amber-900">
                      Window Start = Ovulation Day − 5
                    </p>
                    <p className="font-mono text-sm text-amber-900">
                      Window End &nbsp;&nbsp;= Ovulation Day
                    </p>
                    <p className="text-xs text-amber-700 mt-3">
                      Sperm survive up to 5 days; egg survives 12–24 hours.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                  Fertile Days by Cycle Length — Reference Table
                </h3>
                <div className="not-prose overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-rose-50">
                      <tr>
                        {["Cycle Length", "Ovulation Day", "Fertile Window"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-rose-700">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["24 days", "Day 10", "Day 5 – Day 10"],
                        ["26 days", "Day 12", "Day 7 – Day 12"],
                        ["28 days", "Day 14", "Day 9 – Day 14"],
                        ["30 days", "Day 16", "Day 11 – Day 16"],
                        ["32 days", "Day 18", "Day 13 – Day 18"],
                        ["35 days", "Day 21", "Day 16 – Day 21"],
                      ].map(([cl, ov, fw], i) => (
                        <tr
                          key={cl}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-3 text-gray-700 font-medium">{cl}</td>
                          <td className="px-4 py-3 text-gray-700">{ov}</td>
                          <td className="px-4 py-3 text-gray-700">{fw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── IRREGULAR PERIOD CALCULATOR ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-rose-500" />
                  Irregular Period Calculator: How to Calculate an Irregular Menstrual Cycle
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Standard period cycle calculators assume a fixed cycle length — which doesn't work
                  if your periods vary month to month. An <strong>irregular period calculator</strong> uses
                  a range-based method (the Ogino–Knaus method) that accounts for cycle variability and
                  returns a wider, more honest fertile window estimate.
                </p>

                <div className="p-5 bg-violet-50 border border-violet-100 rounded-2xl not-prose mb-6">
                  <p className="text-sm font-bold text-violet-700 mb-2">
                    📐 Irregular Cycle Fertile Window Formula (Ogino–Knaus)
                  </p>
                  <p className="font-mono text-sm text-violet-900">
                    First Fertile Day = Shortest Cycle Length − 18
                  </p>
                  <p className="font-mono text-sm text-violet-900">
                    Last Fertile Day &nbsp;= Longest Cycle Length − 11
                  </p>
                  <p className="text-xs text-violet-700 mt-3">
                    Example: shortest cycle 25 days, longest 32 days →{" "}
                    <strong>fertile window Day 7 to Day 21</strong>
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Four Ways to Improve Accuracy for Irregular Cycles
                </h3>
                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  {[
                    {
                      icon: "🌡️",
                      title: "Basal Body Temperature (BBT)",
                      desc: "A 0.2–0.5 °C rise in resting temperature the morning after ovulation confirms the event retrospectively. Track daily with a BBT thermometer before rising.",
                    },
                    {
                      icon: "🔬",
                      title: "Ovulation Predictor Kits (OPK)",
                      desc: "Detect the LH surge 24–36 hours before ovulation — the most reliable same-cycle confirmation method available without a clinic visit.",
                    },
                    {
                      icon: "🩺",
                      title: "Cervical Mucus Tracking",
                      desc: "Clear, stretchy, egg-white cervical mucus signals peak fertility and typically appears 1–2 days before ovulation.",
                    },
                    {
                      icon: "📲",
                      title: "Cycle Tracking Apps",
                      desc: "Apps like Clue, Flo, and Natural Cycles combine self-reported data with predictive models to refine ovulation estimates over multiple cycles.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm"
                    >
                      <span className="text-xl">{c.icon}</span>
                      <p className="font-bold text-gray-800 text-sm mt-2 mb-1">{c.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                  When to See a Doctor About Irregular Periods
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Cycles shorter than 21 days or longer than 35 days, periods lasting more than 7 days, or
                  cycles varying by more than 9 days month-to-month may signal underlying conditions such as{" "}
                  <strong>PCOS</strong>, <strong>hypothyroidism</strong>, <strong>hyperprolactinemia</strong>,
                  or perimenopause. A healthcare provider can evaluate with hormone blood panels and pelvic ultrasound.
                </p>
              </section>

              {/* ── LMP & LATE PERIODS ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-rose-500" />
                  LMP, Late Periods, and What Your Cycle Is Telling You
                </h2>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  What Is LMP and Why Does It Matter?
                </h3>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  <strong>LMP (Last Menstrual Period)</strong> is the starting point for all period cycle,
                  ovulation, and pregnancy calculations. Medical providers use LMP to estimate gestational
                  age and due dates because ovulation — and therefore conception — typically occurs
                  approximately 14 days after LMP in a standard cycle.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Common Reasons Your Period Is Late (That Aren't Pregnancy)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 not-prose mb-4">
                  {[
                    "Psychological stress",
                    "Significant weight change",
                    "Intense exercise",
                    "Travel / jet lag",
                    "Thyroid dysfunction",
                    "PCOS",
                    "Perimenopause",
                    "Certain medications",
                  ].map((cause) => (
                    <div
                      key={cause}
                      className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs font-semibold text-amber-800 text-center"
                    >
                      {cause}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If you are <strong>5–7 days late</strong> and have been sexually active, take a home pregnancy
                  test. A positive result or ongoing late periods warrant a consultation with your healthcare provider.
                </p>
              </section>

              {/* ── PMS CYCLE ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-rose-500" />
                  PMS Cycle Calculator: Predicting Premenstrual Symptoms
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  <strong>PMS (Premenstrual Syndrome)</strong> symptoms typically appear in the luteal phase —
                  the final 7–14 days before your period. A <strong>PMS cycle calculator</strong> works by
                  subtracting 7–14 days from your predicted next period date to estimate when symptoms are
                  likely to begin.
                </p>

                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl not-prose mb-4">
                  <p className="text-sm font-bold text-rose-700 mb-1">🗓️ PMS Window Formula</p>
                  <p className="font-mono text-sm text-rose-900">
                    PMS Start = Next Period Date − 7 to 14 days
                  </p>
                  <p className="text-xs text-rose-600 mt-2">
                    Individual variance is significant: some experience symptoms for 2–3 days; others for 10–14 days.
                    If symptoms are severe and impair daily functioning, this may indicate{" "}
                    <strong>PMDD (Premenstrual Dysphoric Disorder)</strong>, which requires clinical evaluation.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Your Cycle as a Vital Sign
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The American College of Obstetricians and Gynecologists recognises the menstrual cycle as
                  one of the five vital signs. Consistently tracking your{" "}
                  <strong>menstrual cycle length</strong> for 3–6 months helps identify patterns in energy,
                  mood, digestion, and sleep. Persistent changes — new irregularity, sudden heavier bleeding,
                  or new mid-cycle pain — are signals to discuss with a gynaecologist.
                </p>
              </section>

              {/* ── SAFE PERIOD WARNING ── */}
              <section className="bg-rose-500 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Common Period Tracking Mistakes — and How to Avoid Them
                </h2>
                <p className="mb-6 opacity-90">
                  These are the errors that most often lead to inaccurate predictions and missed fertile windows:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    [
                      "Assuming every cycle is 28 days",
                      "Fewer than 15% of people have an exactly 28-day cycle. Always use your personal average.",
                    ],
                    [
                      "Treating a safe period calculator as contraception",
                      "Calendar methods have a ~24% typical-use failure rate annually. Always use clinically validated contraception.",
                    ],
                    [
                      "Confusing period duration with cycle length",
                      "Bleeding for 7 days vs. 3 days does not shift your ovulation date. Only total cycle length matters.",
                    ],
                    [
                      "Not recalculating after lifestyle changes",
                      "Stress, illness, weight change, and new medications can all shift ovulation by days. Update your data regularly.",
                    ],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3 bg-white/10 p-4 rounded-xl">
                      <span className="text-red-200 font-bold shrink-0 mt-0.5">✗</span>
                      <div>
                        <p className="font-semibold text-sm mb-1">{title}</p>
                        <p className="text-white/70 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── WHO SHOULD USE ── */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-rose-500" />
                  Who Should Use a Period Cycle Calculator?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  {[
                    {
                      title: "Family planning",
                      desc: "Identify fertile days to optimise timing when trying to conceive, based on your actual cycle data.",
                    },
                    {
                      title: "Natural birth control",
                      desc: "Understand your cycle as a supplement to — never a replacement for — reliable contraception.",
                    },
                    {
                      title: "Symptom prediction",
                      desc: "Anticipate PMS, luteal phase fatigue, and mid-cycle energy peaks to plan your week effectively.",
                    },
                    {
                      title: "Irregular cycle management",
                      desc: "Build a 6-month dataset to identify your personal cycle range and improve prediction accuracy over time.",
                    },
                    {
                      title: "Health monitoring",
                      desc: "Track changes in cycle length that may signal hormonal shifts, PCOS, thyroid issues, or perimenopause.",
                    },
                    {
                      title: "General cycle literacy",
                      desc: "Understanding your menstrual cycle is a foundational health literacy skill — regardless of whether you're trying to conceive.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-rose-300 transition-colors shadow-sm"
                    >
                      <h4 className="font-bold text-rose-800 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-700 italic">
                  If you've ever searched "how to calculate my menstrual cycle," "when is my next period,"
                  or "calculate my fertile days" — this tool is built exactly for you.
                </p>
              </section>

              {/* ── CLOSING STATEMENT ── */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-rose-500" />
                  Your cycle is one of your body's five vital signs
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A <strong>period cycle calculator</strong> isn't just a date predictor — it's the
                  starting point for understanding your hormonal health, planning your fertility, and
                  detecting irregularities early. Track consistently for 3–6 months. Understand your
                  patterns. Revisit your data whenever your life changes.
                </p>
              </section>

              {/* ── CTA ── */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to map your next ovulation window?</h3>
                    <p className="text-rose-100 max-w-md">
                      Our dedicated ovulation calculator maps your fertile window across 3 upcoming cycles —
                      ideal for family planning and conception timing.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/ovulation-calculator">
                      Ovulation Calculator <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* ── FAQ ── */}
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

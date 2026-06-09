// components/blog/CalculateWeightLossPercentageBlog.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import {
  weightLossMilestones,
  trackingTips,
  nonScaleVictories,
  plateauChallenges,
  weightLossHabits,
} from "@/lib/blog/weight-loss-percentage-data";
import WeightLossMilestoneChart from "@/components/charts/WeightLossMilestoneChart";
import WeightLossGuidePdfButton from "@/components/plans/WeightLossGuidePdfButton";
import WeightLossPercentageCalculator from "@/components/calculators/weight-loss-percentage-calculator";

interface Props {
  blog: Blog;
}

// ── SMALL REUSABLE PIECES ─────────────────────────────────────────
function CitationBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
      {children}
    </span>
  );
}

function StatBar({
  label,
  value,
  note,
  color = "bg-emerald-500",
}: {
  label: string;
  value: number;
  note: string;
  color?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="text-slate-500">{note}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-100">
        <div
          className={`h-2.5 rounded-full ${color} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function CalculateWeightLossPercentageBlog({ blog }: Props) {
  return (
    <article className="bg-white">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              How to Calculate Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                Weight Loss Percentage
              </span>{" "}
              — and Why It Matters More Than the Number on the Scale
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              40% of American adults are living with obesity right now. Most are
              tracking the wrong number. Here's the metric that actually predicts
              your health outcomes — backed by CDC and NIH research.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#weight-loss-calculator-widget"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Calculate My % Now →
              </Link>
              <span className="text-sm text-slate-500">
                {blog.readTime} • Updated{" "}
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap gap-2">
              <CitationBadge>✓ CDC-cited data</CitationBadge>
              <CitationBadge>✓ NIH research</CitationBadge>
              <CitationBadge>✓ Free calculator</CitationBadge>
              <CitationBadge>✓ No login needed</CitationBadge>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <Image
              src={blog.featuredImage}
              alt="Weight loss percentage calculator and tracking guide — Calqulate"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          AMERICA'S WEIGHT CRISIS — STAT DASHBOARD
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
            The numbers behind America's weight struggle — 2025
          </p>
          <div className="grid grid-cols-2 gap-px bg-slate-200 md:grid-cols-4">
            {[
              {
                value: "40%",
                label: "US Adults with Obesity",
                sub: "CDC National Survey",
                color: "text-rose-600",
              },
              {
                value: "7.6M",
                label: "Fewer Obese Adults vs 2022",
                sub: "Gallup 2025",
                color: "text-emerald-600",
              },
              {
                value: "5%",
                label: "Loss = Clinically Meaningful",
                sub: "WashU Medicine",
                color: "text-emerald-700",
              },
              {
                value: "58%",
                label: "Obese Adults Have High BP",
                sub: "CDC 2024",
                color: "text-amber-600",
              },
            ].map((s) => (
              <div key={s.label} className="bg-white px-6 py-8 text-center">
                <p className={`text-3xl font-bold md:text-4xl ${s.color}`}>
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MAIN ARTICLE BODY
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">

        {/* ── TABLE OF CONTENTS ──────────────────────── */}
        <nav
          aria-label="Article contents"
          className="mb-16 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            What you'll learn
          </p>
          <ol className="space-y-2 text-sm text-slate-700">
            {[
              ["#why-percentage", "Why the scale number alone lies to you"],
              ["#the-formula", "The exact formula (with 3 worked examples)"],
              ["#american-context", "What these numbers mean for Americans specifically"],
              ["#healthy-rate", "What's a 'healthy' weight loss percentage?"],
              ["#milestone-benefits", "Health benefits unlocked at 5%, 7%, 10%, 15%, 20%"],
              ["#weight-loss-calculator-widget", "Free calculator — skip the math"],
              ["#tracking-correctly", "How to weigh yourself correctly"],
              ["#plateau-reasons", "Why your scale stalled (6 real reasons)"],
              ["#common-questions", "Answers to the most-asked weight loss questions"],
              ["#citations", "Medical sources and citations"],
            ].map(([href, label]) => (
              <li key={href as string}>
                <a
                  href={href as string}
                  className="text-emerald-700 underline-offset-2 hover:underline"
                >
                  {label as string}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── SECTION 1: WHY PERCENTAGE ──────────────── */}
        <section id="why-percentage" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why the Scale Number Alone Lies to You
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            You've seen it happen. Someone posts about losing "20 pounds" and
            looks completely transformed. Another person loses the same 20 pounds
            and nobody can tell. Same number. Completely different reality.
          </p>

          <p className="mt-4 leading-relaxed text-slate-700">
            The difference isn't willpower. It's math. Your body doesn't care
            about the raw pounds you've dropped — it responds to the{" "}
            <strong className="text-slate-900">
              percentage of your total body weight
            </strong>{" "}
            that's gone. Losing 20 lbs at a starting weight of 200 lbs is a
            10% reduction. Losing 20 lbs at 350 lbs is only 5.7%. Same physical
            effort, very different physiological signal.
          </p>

          <div className="my-8 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
            <p className="font-semibold text-slate-900">
              The three problems raw pounds can't solve:
            </p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
                  1
                </span>
                <span>
                  <strong className="text-slate-900">It ignores your starting point.</strong>{" "}
                  A 5% reduction means something at any size. Five pounds lost does
                  not.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
                  2
                </span>
                <span>
                  <strong className="text-slate-900">
                    It doesn't map to clinical milestones.
                  </strong>{" "}
                  Every major health guideline — CDC, NIH, American Heart
                  Association — uses percentage, not pounds, to define meaningful
                  progress.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
                  3
                </span>
                <span>
                  <strong className="text-slate-900">
                    Daily swings wreck your head.
                  </strong>{" "}
                  A 2 lb water-retention spike looks catastrophic in raw pounds.
                  As a percentage, it barely registers. Tracking percentage keeps
                  you sane.
                </span>
              </li>
            </ul>
          </div>

          <p className="leading-relaxed text-slate-700">
            Doctors who treat obesity, researchers running clinical trials, and
            the teams behind shows like <em>The Biggest Loser</em> all score
            results in percentage — not because it's fashionable, but because
            it's the only number that actually tells the truth about your body's
            response.
          </p>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 2: THE FORMULA ─────────────────── */}
        <section id="the-formula" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            The Exact Formula — and 3 Worked Examples
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            The math is three steps. It works in pounds, kilograms, or stone —
            as long as you use the same unit for both weights.
          </p>

          {/* Formula card */}
          <div className="my-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Weight loss percentage formula
            </p>
            <div className="mt-4 rounded-xl bg-white p-5 text-center ring-1 ring-emerald-200">
              <p className="text-lg font-bold text-slate-900 md:text-xl">
                <span className="text-emerald-600">
                  (Starting Weight − Current Weight)
                </span>
                <span className="text-slate-400"> ÷ </span>
                <span className="text-emerald-600">Starting Weight</span>
                <span className="text-slate-400"> × </span>
                <span className="text-emerald-600">100</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                = Your Weight Loss Percentage
              </p>
            </div>
          </div>

          {/* 3 Examples */}
          <h3 className="mt-10 text-xl font-bold text-slate-900">
            Example 1 — The Classic: 200 lbs → 180 lbs
          </h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Started at <strong>200 lbs</strong>, now at{" "}
            <strong>180 lbs</strong>. Here's the math:
          </p>
          <ol className="mt-4 space-y-2 pl-4 text-slate-700">
            <li>
              <strong>Pounds lost:</strong> 200 − 180 = <strong>20 lbs</strong>
            </li>
            <li>
              <strong>Divide by starting weight:</strong> 20 ÷ 200 ={" "}
              <strong>0.10</strong>
            </li>
            <li>
              <strong>Multiply by 100:</strong> 0.10 × 100 ={" "}
              <strong>10%</strong> — a major clinical milestone
            </li>
          </ol>

          <h3 className="mt-10 text-xl font-bold text-slate-900">
            Example 2 — The Early Win: 165 lbs → 157 lbs
          </h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Lost 8 lbs over 6 weeks. Doesn't feel like much, right? The math
            says otherwise: 8 ÷ 165 × 100 ={" "}
            <strong className="text-emerald-700">4.8%</strong>. You're almost
            at the 5% threshold where the CDC confirms real cardiovascular
            improvements begin.
          </p>

          <h3 className="mt-10 text-xl font-bold text-slate-900">
            Example 3 — Kilograms work too: 90 kg → 81 kg
          </h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Lost 9 kg. 9 ÷ 90 × 100 ={" "}
            <strong className="text-emerald-700">10%</strong>. Identical
            percentage to Example 1, different unit. The formula is
            unit-agnostic — all that matters is consistency.
          </p>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">
              💡 Don't want to do the math?
            </p>
            <p className="mt-1 text-sm text-amber-800">
              Jump to the{" "}
              <a href="#weight-loss-calculator-widget" className="underline">
                free calculator below
              </a>{" "}
              — it handles all three unit types and shows your milestone
              progress automatically.
            </p>
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 3: AMERICAN CONTEXT ────────────── */}
        <section id="american-context" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            What These Numbers Mean for Americans Specifically
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            The United States has one of the highest obesity rates in the
            developed world — and the statistics behind that aren't abstract.
            They're your neighbors, your coworkers, possibly you.
          </p>

          {/* US Obesity Progress bars */}
          <div className="my-8 space-y-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Obesity prevalence by US adult age group (CDC 2023)
            </p>
            <StatBar
              label="Ages 40–59"
              value={46.4}
              note="46.4% — highest group"
              color="bg-rose-500"
            />
            <StatBar
              label="Ages 60+"
              value={43.1}
              note="43.1%"
              color="bg-orange-500"
            />
            <StatBar
              label="Ages 20–39"
              value={35.5}
              note="35.5% — lowest group"
              color="bg-amber-400"
            />
            <p className="text-xs text-slate-400">
              Source: CDC National Health and Nutrition Examination Survey
              (NHANES), 2021–2023
            </p>
          </div>

          <p className="leading-relaxed text-slate-700">
            Here's the critical piece of context: the{" "}
            <strong className="text-slate-900">average American man</strong>{" "}
            weighs 197.9 lbs. The{" "}
            <strong className="text-slate-900">average American woman</strong>{" "}
            weighs 170.8 lbs (CDC). That means for most American adults, the
            key milestones look like this in real pounds:
          </p>

          {/* Milestone table */}
          <div className="my-8 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Milestone
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-slate-700">
                    Avg Man (198 lbs)
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-slate-700">
                    Avg Woman (171 lbs)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Key health benefit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["5%", "~10 lbs", "~9 lbs", "Insulin sensitivity improves"],
                  ["7%", "~14 lbs", "~12 lbs", "Type 2 diabetes risk drops significantly"],
                  ["10%", "~20 lbs", "~17 lbs", "Blood pressure, cholesterol improve"],
                  ["15%", "~30 lbs", "~26 lbs", "Sleep apnea symptoms reduce"],
                  ["20%", "~40 lbs", "~34 lbs", "Joint pain, mobility major gains"],
                ].map(([pct, man, woman, benefit]) => (
                  <tr key={pct as string} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-emerald-700">
                      {pct}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-700">
                      {man}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-700">
                      {woman}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed text-slate-700">
            Notice that 5% — the first clinically meaningful threshold — is
            about <strong>9–10 lbs</strong> for most American adults. That's
            entirely achievable in 6–10 weeks at a safe, sustainable pace. But
            when people track raw pounds, they often dismiss those 10 lbs as
            "not enough." When you track percentage, you understand you've just
            cleared a threshold that improves your blood sugar, lowers your
            liver fat, and reduces your cancer risk.
          </p>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 4: HEALTHY RATE ────────────────── */}
        <section id="healthy-rate" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            What Is a "Healthy" Weight Loss Percentage — and How Fast Should
            You Actually Go?
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            Almost every credible source — the CDC, the NHS, the American
            College of Sports Medicine — lands on the same target: lose{" "}
            <strong className="text-slate-900">
              0.5% to 1% of your body weight per week
            </strong>
            . This lines up with the classic "1–2 lbs per week" advice, but
            framed in percentage it scales correctly for every starting weight.
          </p>

          <div className="my-8 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Per week",
                target: "0.5–1%",
                sub: "1–2 lbs for most adults",
                color: "ring-emerald-300 bg-emerald-50",
                text: "text-emerald-800",
              },
              {
                label: "First goal (3–6 months)",
                target: "5%",
                sub: "Clinically meaningful threshold",
                color: "ring-emerald-400 bg-emerald-100",
                text: "text-emerald-900",
              },
              {
                label: "Major milestone (6–12 months)",
                target: "10%",
                sub: "Where health gains compound",
                color: "ring-emerald-500 bg-emerald-200",
                text: "text-emerald-900",
              },
            ].map((r) => (
              <div
                key={r.label}
                className={`rounded-2xl p-5 ring-1 ${r.color} text-center`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {r.label}
                </p>
                <p className={`mt-2 text-4xl font-bold ${r.text}`}>
                  {r.target}
                </p>
                <p className="mt-1 text-xs text-slate-600">{r.sub}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 text-xl font-bold text-slate-900">
            What happens when you go too fast?
          </h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            Faster than 1% per week and you stop losing fat — you start losing
            muscle. Your metabolism responds by slowing your resting metabolic
            rate, making every subsequent week harder. Research consistently
            shows that aggressive weight loss (under 1,000 kcal/day for
            extended periods) leads to:
          </p>
          <ul className="mt-4 space-y-2 pl-4 text-slate-700">
            <li>Significant muscle mass loss (up to 25% of total weight lost)</li>
            <li>Gallstone formation (risk spikes sharply below 800 kcal/day)</li>
            <li>Nutritional deficiencies — iron, B12, calcium, vitamin D</li>
            <li>Hair loss and fatigue within 3–4 months</li>
            <li>
              Rebound weight gain: studies show 80% of crash dieters regain the
              weight within 5 years
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            Slower is not giving up. It's the strategy that actually works.
          </p>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 5: MILESTONE BENEFITS ──────────── */}
        <section id="milestone-benefits" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Health Benefits Unlocked at Each Percentage Milestone
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            Each threshold below is backed by peer-reviewed research. These
            aren't vague promises — they're measurable, documented changes your
            body goes through.
          </p>

          {/* Milestone quick nav */}
          <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-5">
            {weightLossMilestones.map((m) => (
              <a
                key={m.id}
                href={`#milestone-${m.id}`}
                className="group flex flex-col items-center rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: m.brandColor }}
                >
                  {m.percent}%
                </div>
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-600">
                  {m.label}
                </p>
              </a>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-12">
            <WeightLossMilestoneChart />
          </div>

          {/* Milestone deep cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {weightLossMilestones.map((m) => (
              <div
                key={m.id}
                id={`milestone-${m.id}`}
                className="scroll-mt-20 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                style={{ borderTop: `4px solid ${m.brandColor}` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: m.brandColor }}
                  >
                    {m.percent}%
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {m.headline}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {m.benefits.map((b: string) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ═══════════════════════════════════════════════════
            EMBEDDED CALCULATOR
        ═══════════════════════════════════════════════════ */}
        <section
          id="weight-loss-calculator-widget"
          className="scroll-mt-20"
        >
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-2 ring-1 ring-emerald-200">
            <div className="rounded-[1.4rem] bg-white p-6 md:p-8">
              <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Free Tool — No Account Needed
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                    Calculate Your Weight Loss Percentage Now
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Enter your starting and current weight. See your percentage,
                    which milestone you've hit, and what health benefits you've
                    unlocked — in seconds.
                  </p>
                </div>
                <Link
                  href="/health/weight-loss-percentage-calculator"
                  className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Full page ↗
                </Link>
              </div>
              <WeightLossPercentageCalculator />
            </div>
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 6: HOW TO WEIGH CORRECTLY ──────── */}
        <section id="tracking-correctly" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            How to Weigh Yourself Correctly (Most People Get This Wrong)
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            Your formula is only as accurate as your data. Weigh yourself wrong
            and you can look like you gained 3 lbs overnight when you actually
            lost fat. These six habits separate honest tracking from numbers
            that mess with your head.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {trackingTips.map((t) => (
              <div
                key={t.id}
                className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  ✓
                </span>
                <div>
                  <p className="font-bold text-slate-900">{t.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {t.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">
              The weekly average rule
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Weigh daily, but <strong>never react to a single day</strong>.
              Calculate a 7-day average each week, then compare that average to
              the previous week's average. Daily weight can swing 2–5 lbs from
              water, sodium, and hormones alone — the weekly average cuts
              through all of that noise.
            </p>
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 7: PLATEAU REASONS ─────────────── */}
        <section id="plateau-reasons" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why Is My Weight Loss Percentage Stuck? (6 Real Reasons the Scale
            Isn't Moving)
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            A plateau isn't failure. It's your body being extremely good at
            adaptation — and it happens to almost everyone. Here are the six
            most common causes, ranked by how often they actually occur.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {plateauChallenges.map((c) => {
              const dot =
                c.impact === "high"
                  ? "bg-rose-500"
                  : c.impact === "medium"
                  ? "bg-amber-500"
                  : "bg-slate-400";
              const badge =
                c.impact === "high"
                  ? "bg-rose-100 text-rose-800"
                  : c.impact === "medium"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-600";
              return (
                <div
                  key={c.name}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
                >
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`}
                    aria-label={`${c.impact} impact`}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge}`}
                      >
                        {c.impact} impact
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {c.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 8: NSVs ─────────────────────────── */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Non-Scale Victories: How to Know Your Body Is Changing When the
            Scale Won't Move
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            The scale is one data point. Your body is telling you a dozen other
            stories at the same time — most of which are more meaningful than
            a number. These are the wins that actually matter.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {nonScaleVictories.map((v) => (
              <div
                key={v.category}
                className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {v.emoji}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {v.category}
                  </h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {v.examples.map((e: string) => (
                    <li key={e} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 9: HABITS ──────────────────────── */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Habits That Actually Move Your Percentage — and the Ones That
            Quietly Kill Your Progress
          </h2>

          <p className="mt-4 leading-relaxed text-slate-700">
            The biggest lever in weight loss isn't a specific diet or a
            specific exercise. It's the collection of daily defaults that run
            in the background. Here's what research consistently supports — and
            what quietly undermines progress for most Americans.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {weightLossHabits.map((h) => {
              const isLove = h.verdict === "love";
              return (
                <div
                  key={h.name}
                  className={`flex items-start gap-3 rounded-xl p-4 ring-1 ${
                    isLove
                      ? "bg-emerald-50 ring-emerald-200"
                      : "bg-rose-50 ring-rose-200"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                      isLove ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                    aria-label={isLove ? "Recommended" : "Avoid"}
                  >
                    {isLove ? "✓" : "✕"}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{h.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {h.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SECTION 10: COMMON QUESTIONS (H2 for SEO) ─ */}
        <section id="common-questions" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Answers to the Most-Asked Weight Loss Percentage Questions
          </h2>
          <p className="mt-3 text-slate-600">
            These are the exact questions people search for — answered
            directly, with no fluff.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                q: "How do you calculate weight loss percentage?",
                a: "Subtract your current weight from your starting weight, divide that result by your starting weight, then multiply by 100. Example: if you started at 200 lbs and now weigh 185 lbs, that's (200 − 185) ÷ 200 × 100 = 7.5%. The unit (lbs, kg, stone) doesn't matter — as long as both numbers use the same unit.",
              },
              {
                q: "What is a good weight loss percentage per week?",
                a: "The CDC and most clinical guidelines recommend 0.5% to 1% of your body weight per week. For a 200 lb person, that's 1–2 lbs per week. Going faster than 1% per week increases muscle loss, metabolic slowdown, and long-term rebound risk.",
              },
              {
                q: "Can my weight loss percentage fluctuate day to day?",
                a: "Yes — dramatically. Daily weight can swing 2–5 lbs due to water retention, sodium intake, carbohydrates, hormonal cycles, and digestion. This means your percentage can look 1–2 points worse overnight with zero actual fat change. Always compare weekly averages, not single days.",
              },
              {
                q: "Is a higher weight loss percentage always better?",
                a: "No. Past roughly 1% per week, you begin losing significant muscle alongside fat. Your resting metabolic rate drops, hunger hormones increase, and the research is clear: aggressive loss almost always leads to aggressive regain. Sustainable beats fast in every long-term study.",
              },
              {
                q: "What is the first weight loss percentage milestone that actually matters medically?",
                a: "5% of your starting body weight. Washington University School of Medicine research showed that losing 5% improved insulin sensitivity across fat tissue, the liver, and skeletal muscle — and reduced liver fat. This is backed by the CDC and ADA as the minimum threshold for meaningful metabolic improvement.",
              },
              {
                q: "I've lost pounds but my clothes don't feel different — why?",
                a: "In the first 1–3 weeks of a new diet, most 'weight loss' is water and glycogen depletion, not fat. Real fat loss takes 4–6 weeks to become visible and to change how clothing fits. Track your waist measurement and progress photos weekly alongside the scale.",
              },
              {
                q: "Does weight loss percentage work the same for men and women?",
                a: "The formula is identical, but physiology differs. Women typically lose weight more slowly than men at the same caloric deficit — because women have more essential body fat and lower resting metabolic rates relative to their size. The milestones and health benefits, however, apply equally.",
              },
              {
                q: "How accurate is an online weight loss percentage calculator?",
                a: "The math itself is exact — there's no estimation or algorithm. The only accuracy variable is how consistently you weigh yourself. Same scale, same time of day (first thing in the morning, after using the bathroom, before eating), same clothing. Get those conditions right and your numbers are fully reliable.",
              },
              {
                q: "What is the difference between total body weight loss percentage and fat loss percentage?",
                a: "Total body weight loss percentage uses your overall weight and is what this calculator measures. Fat loss percentage only counts fat — calculated from body composition measurements (DEXA scan, hydrostatic weighing, or skin calipers). Most people only have scale access, so total body percentage is the practical standard.",
              },
              {
                q: "At what weight loss percentage does sleep apnea improve?",
                a: "Research shows meaningful improvement in sleep apnea symptoms typically begins around 10–15% body weight loss. A 2020 study found that 10% loss reduced apnea-hypopnea index scores significantly, with some patients experiencing full remission at 15%+.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white p-5 ring-1 ring-slate-200 open:bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {f.q}
                  </h3>
                  <span className="mt-0.5 shrink-0 text-lg text-emerald-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── MEDICAL DISCLAIMER ─────────────────────── */}
        <section>
          <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
            <h3 className="text-base font-bold text-slate-900">
              A Note on Sustainable, Healthy Progress
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Weight loss is not linear — and a healthy percentage looks
              different for every person. Conditions including PCOS,
              hypothyroidism, perimenopause, insulin resistance, and certain
              medications can significantly affect what a realistic rate and
              timeline looks like for you.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              If you're making major dietary changes, or targeting a weight loss
              percentage above 10%, talk with a registered dietitian or your
              physician first. This calculator and guide are for general
              informational purposes only — they are not a substitute for
              personalized medical advice.
            </p>
          </div>
        </section>

        <hr className="my-14 border-slate-200" />

        {/* ── SOURCES & CITATIONS ─────────────────────── */}
        <section id="citations" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Medical Sources and Citations
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            All data and health claims in this article are sourced from
            peer-reviewed research or official government health agencies.
          </p>

          <ol className="mt-8 space-y-4 text-sm">
            {[
              {
                num: 1,
                title: "CDC National Health and Nutrition Examination Survey (NHANES) 2021–2023",
                org: "Centers for Disease Control and Prevention",
                note: "Source for US adult obesity prevalence (40.3%) and age-group breakdown.",
                url: "https://www.cdc.gov/nchs/nhanes/index.htm",
              },
              {
                num: 2,
                title: "Gallup Well-Being Index: US Obesity Rate 2025",
                org: "Gallup",
                note: "Source for 2025 US adult obesity rate (37%) and GLP-1 drug usage trends.",
                url: "https://news.gallup.com/poll/",
              },
              {
                num: 3,
                title: "Klein et al. — 5% Weight Loss Has Significant Health Benefits",
                org: "Washington University School of Medicine / Cell Metabolism",
                note: "Clinical trial demonstrating improvements in insulin sensitivity and liver fat at 5% weight loss.",
                url: "https://medicine.washu.edu/news/in-obese-patients-5-percent-weight-loss-has-significant-health-benefits/",
              },
              {
                num: 4,
                title: "Diabetes Prevention Program (DPP)",
                org: "National Institutes of Health / New England Journal of Medicine",
                note: "7% weight loss reduced type 2 diabetes incidence by 58% in high-risk adults.",
                url: "https://www.niddk.nih.gov/about-niddk/research-areas/diabetes/diabetes-prevention-program-dpp",
              },
              {
                num: 5,
                title: "Healthy People 2030: Weight Management Goals",
                org: "U.S. Department of Health and Human Services",
                note: "Federal goal: reduce adult obesity prevalence to 36% by 2030.",
                url: "https://health.gov/healthypeople/objectives-and-data/browse-objectives/overweight-and-obesity",
              },
              {
                num: 6,
                title: "Obesity and Cardiovascular Disease: A Scientific Statement",
                org: "American Heart Association (AHA)",
                note: "Documents cardiovascular improvements associated with 5–10% body weight reduction.",
                url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063",
              },
              {
                num: 7,
                title: "Choosing a Safe and Successful Weight-Loss Program",
                org: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)",
                note: "Guidelines for safe rate of weight loss (1–2 lbs/week) and program evaluation.",
                url: "https://www.niddk.nih.gov/health-information/weight-management/choosing-a-safe-successful-weight-loss-program",
              },
              {
                num: 8,
                title: "Rotunda et al. — Weight Loss in Short-Term Interventions, Meta-Analysis",
                org: "CDC Preventing Chronic Disease, 2024",
                note: "Pooled data from lifestyle interventions showing −2.59 kg mean difference.",
                url: "https://www.cdc.gov/pcd/issues/2024/23_0347.htm",
              },
              {
                num: 9,
                title: "Medical Costs of Obesity in the United States",
                org: "CDC / NIDDK",
                note: "Annual medical costs $1,861 higher for adults with obesity vs. healthy weight (2019 data).",
                url: "https://www.cdc.gov/obesity/data/adult.html",
              },
              {
                num: 10,
                title: "Trust for America's Health — State of Obesity 2024",
                org: "Trust for America's Health",
                note: "2024 state-level obesity data; 19 states with 35%+ obesity rates.",
                url: "https://www.tfah.org/report-details/state-of-obesity-2024/",
              },
            ].map((ref) => (
              <li key={ref.num} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                  {ref.num}
                </span>
                <div>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    {ref.title}
                  </a>
                  <p className="text-xs text-slate-500">
                    {ref.org} — {ref.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════
          PDF GUIDE CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-emerald-50 to-lime-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Take this guide with you — free PDF
          </h2>
          <p className="mt-4 text-slate-600">
            Formula, milestone table, tracking checklist, and habits guide.
            Printable. No email required.
          </p>
          <div className="mt-8 flex justify-center">
            <WeightLossGuidePdfButton />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM LINE / FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            The Bottom Line
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-300">
            40% of American adults are dealing with obesity. Most are watching
            the wrong number. Weight loss percentage is the metric that actually
            maps to how your body works — from the first 5% that improves your
            blood sugar, all the way to 20% that transforms your joint health
            and mobility. The math is simple. The milestones are real. The
            pace that makes it stick is slower than you think — and that's not
            a problem. It's the plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/health/weight-loss-percentage-calculator"
              className="rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              Open Full Calculator →
            </Link>
            <Link
              href="#weight-loss-calculator-widget"
              className="rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Calculate on this page ↑
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
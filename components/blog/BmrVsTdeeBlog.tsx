// components/blog/BmrVsTdeeBlog.tsx
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import {
  bmrFormulas,
  activityLevels,
  energyComponents,
  calorieGoals,
  compareRows,
  bmrTdeeFaqs,
} from "@/lib/blog/bmr-tdee-data";
import BmrTdeeChart from "@/components/charts/BmrTdeeChart";
import BmrTdeeGuidePdfButton from "@/components/plans/BmrTdeeGuidePdfButton";

// ── EMBEDDED CALCULATOR ────────────────────────────────────────────
// The BMR calculator returns both BMR and TDEE, so it is the right widget
// to embed here. If your reusable export lives at a different path, adjust
// this one import line.
import BMRCalculator from "@/components/calculators/bmr-calculator";

const BMR_HREF = "/health/bmr-calculator";
const TDEE_HREF = "/health/tdee-calculator";

interface Props {
  blog: Blog;
}

export default function BmrVsTdeeBlog({ blog }: Props) {
  // FAQ rich-result schema. Matches the visible FAQ word for word, which is
  // what Google requires for the FAQ snippet to be eligible.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bmrTdeeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              BMR vs TDEE:{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                What&rsquo;s the Difference?
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">{blog.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#bmr-tdee-calculator-widget"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Calculate My BMR &amp; TDEE →
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
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <Image
              src={blog.featuredImage}
              alt="BMR vs TDEE explained, calories at rest versus total daily energy, by Calqulate"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        </div>
      </header>

      {/* ── MINI DASHBOARD STATS ─────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-4">
          {[
            { label: "BMR Share of TDEE", value: "~65%" },
            { label: "Activity Levels", value: `${activityLevels.length}` },
            { label: "Formulas", value: `${bmrFormulas.length}` },
            { label: "Calculator", value: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 text-center">
              <p className="text-3xl font-bold text-slate-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* ── INTRO ─────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-lime-500" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The Short Answer
            </h2>
          </div>

          {/* BMR vs TDEE side-by-side comparison cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                  BMR
                </span>
                <div>
                  <p className="text-lg font-bold text-slate-900">Basal Metabolic Rate</p>
                  <p className="text-sm text-slate-500">Your body at complete rest</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                The calories your body burns just to keep you alive — heart,
                lungs, brain, kidneys, cells. It is your{" "}
                <strong className="text-slate-900">metabolic floor</strong>:
                the minimum energy required to exist. For most adults this lands
                between 1,200 and 2,000 calories a day.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm">
                <span className="font-semibold text-slate-900">Rule:</span>
                <span className="text-slate-600">Never eat below your BMR</span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                  TDEE
                </span>
                <div>
                  <p className="text-lg font-bold text-slate-900">Total Daily Energy Expenditure</p>
                  <p className="text-sm text-slate-500">Your real-world burn</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                BMR <strong className="text-slate-900">plus</strong> walking,
                workouts, chores, fidgeting, and the energy spent digesting food.
                It is your{" "}
                <strong className="text-slate-900">true daily target</strong>:
                20% to 90% higher than BMR depending on how active you are.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2.5 text-sm">
                <span className="font-semibold text-emerald-800">Rule:</span>
                <span className="text-emerald-700">Build your meal plan around TDEE</span>
              </div>
            </div>
          </div>

          {/* Practical takeaway + roadmap */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
            <p className="text-sm leading-relaxed text-slate-300">
              Mix the two up and a diet either stalls or starts eating your
              muscle. The{" "}
              <Link
                href={BMR_HREF}
                className="font-semibold text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
              >
                free BMR calculator
              </Link>{" "}
              returns both figures at once, so you do not have to do the math by
              hand.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "BMR vs TDEE table",
                "Visual chart",
                "Energy breakdown",
                "Activity multipliers",
                "Calorie goal zones",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── COMPARISON TABLE ──────────────────────── */}
        <h2 className="mt-14 text-2xl font-bold text-slate-900 md:text-3xl">
          BMR vs TDEE at a Glance
        </h2>
        <p className="mt-2 text-slate-600">
          Same body, two different questions. One asks what you burn doing
          nothing, the other asks what you burn living your day.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 py-3 font-semibold">Factor</th>
                <th className="px-4 py-3 font-semibold">BMR</th>
                <th className="px-4 py-3 font-semibold">TDEE</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r, i) => (
                <tr key={r.factor} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 font-bold text-slate-900">{r.factor}</td>
                  <td className="px-4 py-3 text-slate-700">{r.bmr}</td>
                  <td className="px-4 py-3 text-slate-700">{r.tdee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── CHART ─────────────────────────────────── */}
        <div className="mt-14">
          <BmrTdeeChart />
        </div>

        {/* ───────────────────────────────────────────────
            EMBEDDED CALCULATOR WIDGET   ★ USP ★
            Live, interactive. Uses your /health/bmr-calculator engine,
            which outputs both BMR and TDEE.
           ─────────────────────────────────────────────── */}
        <section id="bmr-tdee-calculator-widget" className="mt-16 scroll-mt-20">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-2 ring-1 ring-emerald-200">
            <div className="rounded-[1.4rem] bg-white p-6 md:p-8">
              <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Free Tool
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                    Get Both Numbers in One Step
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Enter your age, sex, height, weight, and activity level. The
                    calculator returns your BMR and your TDEE together, using the
                    Mifflin-St Jeor equation dietitians rely on.
                  </p>
                </div>
                <Link
                  href={BMR_HREF}
                  className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open full page ↗
                </Link>
              </div>

              {/* ▼▼▼  ACTUAL CALCULATOR COMPONENT  ▼▼▼ */}
              <BMRCalculator />
              {/* ▲▲▲  END CALCULATOR  ▲▲▲ */}
            </div>
          </div>
        </section>

        {/* ── WHAT IS BMR ───────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-lime-500" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What BMR Measures
            </h2>
          </div>

          {/* Visual: body systems at rest */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { label: "Brain", value: "~20%", detail: "Your brain burns a fifth of your resting calories just thinking and regulating.", color: "bg-emerald-500" },
              { label: "Heart & Lungs", value: "~15%", detail: "Constant pumping and breathing — the biggest non-brain organ demand.", color: "bg-teal-500" },
              { label: "Liver & Kidneys", value: "~25%", detail: "Filtration, detox, and processing — these organs never rest.", color: "bg-green-500" },
              { label: "Cells & Repair", value: "~40%", detail: "Cell maintenance, ion pumps, protein turnover — the silent majority.", color: "bg-lime-500" },
            ].map((org) => (
              <div
                key={org.label}
                className="rounded-2xl bg-white p-5 text-center ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <span
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white ${org.color}`}
                >
                  {org.value}
                </span>
                <p className="mt-3 font-bold text-slate-900">{org.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{org.detail}</p>
              </div>
            ))}
          </div>

          {/* Description + key insight card */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛌</span>
                <h3 className="text-lg font-bold text-slate-900">At Complete Rest</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Picture your body parked in bed, awake but not moving, not
                digesting, not cold. The calories it still burns to run your heart,
                lungs, brain, and kidneys are your basal metabolic rate. Your brain
                alone takes about a fifth of it. For most adults BMR lands
                somewhere between 1,200 and 2,000 calories a day.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐢</span>
                <h3 className="text-lg font-bold text-slate-900">Changes Slowly</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                BMR is the part of your burn you cannot change overnight. It moves
                slowly, with weight, muscle mass, and age. It drops by roughly 50
                calories per decade as muscle naturally declines, which is why a
                45 year old needs fewer calories than at 25 at the same weight.
              </p>
              <Link
                href="/blog/how-to-calculate-resting-metabolic-rate-rmr"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Read our full RMR guide →
              </Link>
            </div>
          </div>
        </div>

        {/* ── ENERGY COMPONENTS ─────────────────────── */}
        <h2 className="mt-12 text-2xl font-bold text-slate-900 md:text-3xl">
          Where Your Daily Calories Go
        </h2>
        <p className="mt-2 text-slate-600">
          TDEE is made of four parts. BMR is the largest by far, which is why
          your resting burn matters more than any single workout.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {energyComponents.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="flex items-center gap-4">
                {/* simple percentage ring */}
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: `conic-gradient(${c.brandColor} ${c.percent * 3.6}deg, #e2e8f0 0deg)`,
                  }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900">
                    {c.percent}%
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {c.short}{" "}
                    <span className="text-sm font-medium text-slate-400">
                      {c.name}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{c.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Shares are representative for an average person. Athletes and highly
          active people carry a larger activity slice.
        </p>
      </div>

      {/* ── HOW BMR BECOMES TDEE ───────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Turning BMR Into TDEE: The Activity Multiplier
          </h2>
          <p className="mt-3 text-slate-600">
            TDEE is just your BMR multiplied by an activity factor. Pick the row
            that matches your real week, not your best week. Most people overrate
            their activity, which inflates the target and stalls fat loss.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3 font-semibold">Activity level</th>
                  <th className="px-4 py-3 font-semibold">Multiplier</th>
                  <th className="px-4 py-3 font-semibold">Who it fits</th>
                  <th className="px-4 py-3 font-semibold">TDEE (BMR 1,500)</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {activityLevels.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">
                      {a.name}
                    </td>
                    <td className="px-4 py-3 text-slate-700">×{a.multiplier}</td>
                    <td className="px-4 py-3 text-slate-600">{a.fits}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                        {a.exampleTdee} kcal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Prefer a tool that asks for your activity directly? The{" "}
            <Link href={TDEE_HREF} className="font-semibold text-emerald-600">
              TDEE calculator
            </Link>{" "}
            builds the multiplier in for you.
          </p>
        </div>
      </section>

      {/* ── WORKED EXAMPLE ─────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          A Worked Example, Start to Finish
        </h2>
        <p className="mt-3 text-slate-600">
          Take a 30 year old woman, 65 kg, 165 cm, who trains a few times a week.
          Here is how her BMR turns into a fat-loss target.
        </p>

        <ol className="mt-6 space-y-3">
          {[
            {
              step: "1",
              title: "Find BMR (Mifflin-St Jeor)",
              body: "(10 × 65) + (6.25 × 165) − (5 × 30) − 161 = 1,370 kcal/day.",
            },
            {
              step: "2",
              title: "Find TDEE (moderate × 1.55)",
              body: "1,370 × 1.55 = about 2,124 kcal/day. That is her real daily burn.",
            },
            {
              step: "3",
              title: "Apply a 500 kcal deficit",
              body: "2,124 − 500 = 1,624 kcal/day, which targets roughly 0.5 kg of fat loss a week.",
            },
            {
              step: "4",
              title: "Stay above BMR",
              body: "1,624 sits well above her 1,370 floor, so the plan protects muscle and her metabolism.",
            },
          ].map((s) => (
            <li
              key={s.step}
              className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                {s.step}
              </span>
              <div>
                <p className="font-bold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm text-slate-700">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CALORIE GOAL ZONES ─────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Set Your Target From TDEE, Not BMR
          </h2>
          <p className="mt-3 text-slate-600">
            Once you know your TDEE, your goal decides the adjustment. Think in
            zones rather than one exact number, which leaves room for the normal
            day-to-day swing in how much you burn.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {calorieGoals.map((g) => {
              const tone =
                g.tone === "ok"
                  ? "bg-white ring-slate-200"
                  : g.tone === "loss"
                  ? "bg-emerald-50 ring-emerald-200"
                  : "bg-lime-50 ring-lime-200";
              return (
                <div key={g.id} className={`rounded-2xl p-5 ring-1 ${tone}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{g.label}</p>
                    <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      {g.rule}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{g.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORMULAS ──────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          The Formulas Behind BMR
        </h2>
        <p className="mt-3 text-slate-600">
          TDEE depends on getting BMR right first. Three formulas do the job.
          Mifflin-St Jeor is the default for most people.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {bmrFormulas.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              style={{ borderTop: `4px solid ${f.brandColor}` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: f.brandColor }}
                >
                  {f.year}
                </span>
                <h3 className="text-base font-bold text-slate-900">{f.name}</h3>
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div>
                  <p className="font-semibold text-slate-500">Men</p>
                  <p className="font-mono text-slate-700">{f.men}</p>
                </div>
                {f.id !== "katch" && (
                  <div>
                    <p className="font-semibold text-slate-500">Women</p>
                    <p className="font-mono text-slate-700">{f.women}</p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-600">{f.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCLAIMER ─────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
          <h3 className="text-lg font-bold text-slate-900">
            A Note on These Numbers
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            BMR and TDEE formulas are estimates with about a 10% margin. They are
            a strong starting point, not a lab measurement. Conditions like
            thyroid disorders, PCOS, pregnancy, and some medications shift your
            real burn beyond what any formula predicts. Track your weight for two
            to three weeks, then adjust your target based on what the scale
            shows. If you have a medical condition or are in recovery from
            disordered eating, work with a doctor or registered dietitian.
          </p>
        </div>
      </section>

      {/* ── PDF GUIDE CTA ─────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-50 to-lime-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Take the cheat sheet with you
          </h2>
          <p className="mt-3 text-slate-600">
            Download a free, printable BMR and TDEE guide. Formulas, activity
            multipliers, and calorie zones in one PDF.
          </p>
          <div className="mt-8 flex justify-center">
            <BmrTdeeGuidePdfButton />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {bmrTdeeFaqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl bg-white p-5 ring-1 ring-slate-200 open:bg-slate-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                {f.q}
                <span className="ml-4 text-emerald-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── BOTTOM LINE / FINAL CTA ────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            The Bottom Line
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            BMR is what you burn at rest. TDEE is what you burn in real life. Find
            your BMR, multiply by your honest activity level to get TDEE, then
            adjust from there for fat loss or muscle gain. Keep your daily intake
            above your BMR, recheck the numbers every couple of months, and let
            real-world results fine-tune the rest.
          </p>
          <Link
            href={BMR_HREF}
            className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
          >
            Calculate Your BMR &amp; TDEE →
          </Link>
        </div>
      </section>
    </article>
  );
}

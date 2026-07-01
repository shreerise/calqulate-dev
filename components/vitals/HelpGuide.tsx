import Link from "next/link";
import {
  Syringe, Scale, Activity, Compass, Target, TrendingUp, FileText, ShieldCheck,
  ChevronRight, Sparkles, Dumbbell, CalendarClock, ArrowRight, AlertTriangle,
} from "lucide-react";

/**
 * End-to-end help guide for Calqulate Vitals, shown at /dashboard/guide.
 * A running worked example (Sarah, 180 lb → 140 lb) threads through the steps,
 * and each step deep-links to the exact card it describes on the live dashboard.
 * Native <details> gives interactive expand/collapse with no client JS.
 */

type Step = {
  n: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  href: string;
  linkLabel: string;
  what: string;
  example: string;
};

const STEPS: Step[] = [
  {
    n: 1,
    icon: Syringe,
    title: "Add your medication",
    href: "/dashboard/glp1#log",
    linkLabel: "Open the logging panel",
    what:
      "Tell Calqulate what you're on. Pick the compound (semaglutide, tirzepatide, etc.), an optional brand (Ozempic, Wegovy, Zepbound…), your start date, and how often you dose (usually every 7 days). This one-time setup unlocks the medication-level curve, dose reminders and the trial benchmark.",
    example:
      "Sarah is 180 lb and just started semaglutide at 0.25 mg once weekly. She adds “Semaglutide · Wegovy · every 7 days,” starting today.",
  },
  {
    n: 2,
    icon: Scale,
    title: "Set your starting point & goal",
    href: "/dashboard/glp1#track-more",
    linkLabel: "Open Track more (weight & body comp)",
    what:
      "Log today's weight and, if you can, a body-composition entry (weight + body-fat %). Your starting numbers are the baseline everything is measured against — so the sooner you log them, the better your trends. Add at least two body-comp entries over time so the app can separate fat loss from muscle loss.",
    example:
      "Sarah logs 180 lb and 38% body fat on day one. Her goal is 140 lb — a 40 lb loss. That baseline is what her “fat vs. muscle” and projections build on.",
  },
  {
    n: 3,
    icon: Syringe,
    title: "Log every shot, the day you take it",
    href: "/dashboard/glp1#log",
    linkLabel: "Log a dose",
    what:
      "Every week when you inject, tap Log dose. This is the single most important habit — it powers your medication-level curve, your next-dose reminder, refill countdown and the trial benchmark. Skipped a week? Log that too, so the curve stays honest.",
    example:
      "Sarah injects every Sunday morning and logs it right after. After a few weeks the app knows her rhythm and reminds her the day before.",
  },
  {
    n: 4,
    icon: Activity,
    title: "Read your medication level",
    href: "/dashboard/glp1#vitals",
    linkLabel: "See your key numbers",
    what:
      "The “Medication level now” card estimates how much active drug is still in your body between shots. It's high just after a dose and drifts down before the next one — which is exactly when appetite and cravings (“food noise”) tend to return. Seeing it is normal helps you plan meals and not panic.",
    example:
      "By Friday Sarah's level reads ~45% and she feels hungrier. Now she understands why — it's the medication fading, not willpower failing — so she leans on protein and her next dose is close.",
  },
  {
    n: 5,
    icon: TrendingUp,
    title: "Weigh in weekly — watch the trend, not the day",
    href: "/dashboard/glp1#log",
    linkLabel: "Log a weight",
    what:
      "Weigh yourself about once a week, same day, same time (morning, after the bathroom, before food). Daily weight bounces with water and food; the weekly trend is the real signal. The app projects your likely next week so you're never guessing.",
    example:
      "Sarah weighs in every Sunday. Week to week she's down ~1% of body weight — right where steady, muscle-sparing loss should be on her way from 180 to 140.",
  },
  {
    n: 6,
    icon: Compass,
    title: "Turn on Autopilot",
    href: "/dashboard/protocol",
    linkLabel: "Open GLP-1 Autopilot",
    what:
      "Autopilot builds an adaptive plan: a step-up (titration) schedule plus weekly missions, a protein target and simple training to lose fat, not muscle. Log a quick check-in each week and the plan adjusts to how you're actually doing and what side effects you report.",
    example:
      "Autopilot maps Sarah's climb — 0.25 → 0.5 → 1.0 mg every 4 weeks if she tolerates it — and gives her a weekly protein goal and two short strength sessions.",
  },
  {
    n: 7,
    icon: Dumbbell,
    title: "Protect your muscle",
    href: "/dashboard/glp1#track-more",
    linkLabel: "Log body composition & protein",
    what:
      "Fast weight loss can cost muscle if you let it. Two things protect it: enough protein and resistance training. Log a body-composition entry every 2–4 weeks and watch the “Fat vs. muscle” card — if it flags too much lean loss, add protein and strength work.",
    example:
      "At 160 lb Sarah's card shows most of her loss is fat, lean mass steady — proof the protein + strength plan is working, not just a smaller number on the scale.",
  },
  {
    n: 8,
    icon: Target,
    title: "Check “Am I on track?”",
    href: "/dashboard/glp1#benchmark",
    linkLabel: "See your trial benchmark",
    what:
      "This card compares your percentage of weight lost against the average from the clinical trial for your exact drug and dose. “On track,” “ahead” or “behind” tells you at a glance whether your results are in the expected range — useful before you consider a dose change with your prescriber.",
    example:
      "At month 3 Sarah has lost 8% vs. a trial average of ~6% for her dose — she's “ahead,” so she holds her plan steady rather than rushing to titrate up.",
  },
  {
    n: 9,
    icon: Sparkles,
    title: "Find your dosing sweet spot",
    href: "/dashboard/glp1#sweet-spot",
    linkLabel: "See your sweet spot",
    what:
      "Once you have some history, this card reads your own data to find the dose that gave the most weight loss for the fewest side effects — so you and your prescriber can talk about the dose that actually works best for your body, not just the highest one.",
    example:
      "Sarah's data shows 1.0 mg gave her strong loss with mild side effects, while 1.7 mg added nausea for little extra loss — a concrete talking point for her doctor.",
  },
  {
    n: 10,
    icon: TrendingUp,
    title: "See “Future You”",
    href: "/dashboard/future",
    linkLabel: "Open Future You",
    what:
      "A projection of where your weight and health score are heading over the next few months, with honest confidence bands. It turns “am I making progress?” into a date and a range you can plan around.",
    example:
      "Future You estimates Sarah reaches her 140 lb goal in roughly 9–12 months at her current pace — a finish line she can actually see.",
  },
  {
    n: 11,
    icon: FileText,
    title: "Share a report with your doctor",
    href: "/dashboard/glp1#report",
    linkLabel: "Generate your PDF report",
    what:
      "Generate a clean one-page PDF — medication, doses, weight and body-composition trend, medication level and risk — to bring to your next appointment. It turns months of logging into a summary your clinician can read in 30 seconds.",
    example:
      "Before her check-up Sarah exports the PDF; her doctor sees the fat-vs-muscle trend and the sweet-spot finding and agrees to hold her dose.",
  },
  {
    n: 12,
    icon: ShieldCheck,
    title: "Your data is yours",
    href: "/dashboard/settings",
    linkLabel: "Open Settings & privacy",
    what:
      "Everything saves durably the moment you log it and syncs across your devices. You can export all of it (JSON or CSV) or permanently delete it anytime from Settings. We never sell your data.",
    example:
      "Sarah switches phones mid-journey — nothing is lost, all her history is right there when she signs back in.",
  },
];

const RHYTHM = [
  { when: "Every dose day", what: "Log your shot (Step 3). Check your medication-level card." },
  { when: "Weekly", what: "Weigh in on the same day. Do your Autopilot check-in. Glance at “Am I on track?”." },
  { when: "Every 2–4 weeks", what: "Log a body-composition entry so fat-vs-muscle stays accurate." },
  { when: "Before a doctor visit", what: "Generate the PDF report and review your sweet spot." },
];

export function HelpGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Help Guide</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
          How to use Calqulate Vitals — end to end
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
          New here? This is the whole journey in order: what to set up, what to log, when to log it, and how to
          read every number. Each step links straight to the exact card it's talking about, so you can follow
          along in the real tracker.
        </p>
      </div>

      {/* Worked example callout */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <Target className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-emerald-900">Follow one real example</h2>
            <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">
              Meet <strong>Sarah</strong>: she weighs <strong>180 lb</strong>, her goal is <strong>140 lb</strong>{" "}
              (a 40 lb loss), and she's just started weekly semaglutide. You'll see exactly what she does at each
              step below, so you can copy the pattern with your own numbers.
            </p>
          </div>
        </div>
      </div>

      {/* 3-minute setup */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-gray-900">The 3-minute setup</h2>
        <p className="mt-1 text-sm text-gray-500">Do these three first — everything else builds on them.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { t: "1. Add your med", d: "Compound, start date, weekly interval.", href: "/dashboard/glp1#log" },
            { t: "2. Log weight + body fat", d: "Your baseline to measure from.", href: "/dashboard/glp1#track-more" },
            { t: "3. Log today's shot", d: "Starts your medication-level curve.", href: "/dashboard/glp1#log" },
          ].map((q) => (
            <Link
              key={q.t}
              href={q.href}
              className="group rounded-xl border border-gray-200 bg-gray-50/70 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <p className="text-sm font-semibold text-gray-900">{q.t}</p>
              <p className="mt-1 text-xs text-gray-500">{q.d}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                Go <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Full journey */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">The full journey, step by step</h2>
        <p className="mt-1 text-sm text-gray-500">Tap any step to expand it.</p>
        <div className="mt-4 space-y-3">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <details key={s.n} className="group rounded-2xl border border-gray-200 bg-white [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center gap-4 p-4 sm:p-5">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Step {s.n}
                    </span>
                    <span className="block text-sm font-semibold text-gray-900 sm:text-base">{s.title}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:px-5">
                  <p className="text-sm leading-relaxed text-gray-600">{s.what}</p>
                  <div className="mt-3 rounded-xl border-l-4 border-emerald-300 bg-emerald-50/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Sarah's example</p>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">{s.example}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    {s.linkLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* Weekly rhythm cheat sheet */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <CalendarClock className="h-5 w-5 text-emerald-600" /> Your weekly rhythm — what to log, when
        </h2>
        <div className="mt-4 divide-y divide-gray-100">
          {RHYTHM.map((r) => (
            <div key={r.when} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
              <div className="w-full flex-shrink-0 text-sm font-semibold text-gray-900 sm:w-44">{r.when}</div>
              <div className="text-sm text-gray-600">{r.what}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety */}
      <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed text-amber-900">
            <strong>Important:</strong> Calqulate Vitals is educational decision-support, not medical advice. It
            organizes and tracks your own data — it does not prescribe. Always confirm your dose and any changes
            with the clinician who prescribed your medication, and check units against your own vial.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <h2 className="text-base font-bold text-emerald-900">Ready? Start with step 1.</h2>
          <p className="mt-0.5 text-sm text-emerald-900/80">Add your medication and log today's weight — it takes about a minute.</p>
        </div>
        <Link
          href="/dashboard/glp1#log"
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Go to my tracker <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

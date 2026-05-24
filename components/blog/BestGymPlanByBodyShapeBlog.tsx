// components/blog/BestGymPlanByBodyShapeBlog.tsx
"use client";

import Link from "next/link";
import type { Blog } from "@/lib/blog/blogs-data";
import {
  maleShapes,
  femaleShapes,
} from "@/lib/blog/gym-plan-data";
import GymPlanSelector from "@/components/gym-plan/GymPlanSelector";
import GymPlanPdfButton from "@/components/plans/GymPlanPdfButton";
import WorkoutStatsBar from "@/components/charts/WorkoutStatsBar";
import { useState } from "react";

interface Props {
  blog: Blog;
}

export default function BestGymPlanByBodyShapeBlog({ blog }: Props) {
  const [activeGender, setActiveGender] = useState<"male" | "female">("female");

  const totalRoutines =
    maleShapes.reduce((acc, s) => acc + s.routines.length, 0) +
    femaleShapes.reduce((acc, s) => acc + s.routines.length, 0);

  return (
    <article className="bg-white">

      {/* ── HERO ────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 sm:px-6">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800">
            {blog.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
            Best Gym Plan by Body Shape — What Actually Works for Male and Female
          </h1>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Most gym plans fail not because people skip the gym, but because the plan was built for a different body. This guide matches your body shape — male or female — to the exact workout routines, weekly schedule, and training focus that produces results for your specific physiology.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>By <strong className="text-black">Meet Akabari</strong></span>
            <span>·</span>
            <span>{blog.readTime}</span>
            <span>·</span>
            <span>
              Updated{" "}
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4">
          {[
            { label: "Body Shapes Covered", value: "9" },
            { label: "Workout Routines", value: `${totalRoutines}+` },
            { label: "7-Day Plans", value: "9" },
            { label: "Free PDF Plans", value: "2" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-6 text-center">
              <p className="text-3xl font-bold text-black">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TLDR ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-green-800 mb-3">TL;DR — Quick Summary</p>
          <ul className="space-y-2 text-sm text-gray-800">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 mt-2" />
              Your body shape determines where you carry muscle and fat — and that changes what type of training actually works.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 mt-2" />
              This guide covers 9 body shapes (4 male, 5 female) each with 4 workout routines and a complete 7-day gym schedule.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 mt-2" />
              Beginners of any body shape should start with the universal 3-day full body plan for 8 weeks before going shape-specific.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 mt-2" />
              Free downloadable PDF plans for men and women are available below — no email required.
            </li>
          </ul>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 pt-8 pb-2 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Table of Contents</p>
          <ol className="space-y-2 text-sm">
            {[
              { href: "#does-body-shape-matter", label: "Does Your Body Shape Really Change Your Gym Plan?" },
              { href: "#how-to-use", label: "How to Use This Guide" },
              { href: "#workout-plans", label: "Gym Plans by Body Shape — Interactive Selector" },
              { href: "#training-chart", label: "Training Focus Comparison by Shape" },
              { href: "#beginner-plan", label: "Universal Beginner Plan (Any Body Shape)" },
              { href: "#download-pdf", label: "Download Free 7-Day Gym Plan PDF" },
              { href: "#workout-routines-explained", label: "Best Workout Routines for Each Goal" },
              { href: "#faq", label: "Frequently Asked Questions" },
              { href: "#resources", label: "Research & Resources" },
            ].map((item, i) => (
              <li key={item.href} className="flex items-start gap-3">
                <span className="shrink-0 w-5 text-right text-xs font-bold text-green-700 mt-0.5">{i + 1}.</span>
                <a href={item.href} className="text-gray-700 hover:text-green-700 hover:underline leading-snug">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h2 id="does-body-shape-matter" className="text-2xl font-bold text-black md:text-3xl">
          Does Your Body Shape Really Change Your Gym Plan?
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Yes — and the difference is substantial. Your body shape tells you where you naturally accumulate muscle and fat, what your hormonal tendencies are, how fast your metabolism runs, and how your body responds to different training stimuli. A strength program built for a lean ectomorph male would actively undermine the goals of a female pear shape, and vice versa.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          This guide covers the best gym plan by body shape for both male and female — with research-backed workout routines, a full 7-day gym workout plan per body shape, and downloadable PDF plans you can print and take to the gym.
        </p>

        <h2 id="how-to-use" className="mt-10 text-2xl font-bold text-black md:text-3xl">
          How to Use This Guide
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Not sure of your body shape yet? Use our{" "}
          <Link href="/health/body-shape-calculator" className="font-semibold text-green-700 underline underline-offset-2">
            free Body Shape Calculator
          </Link>{" "}
          first — it identifies your shape in under 60 seconds using your measurements. Then come back here to find your personalised workout plan.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Already know your shape? Scroll down, select your gender, and choose your body shape to jump straight to your workout routines and 7-day gym plan.
        </p>

        {/* Key principles */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Shape-Specific Goals",
              desc: "Your body shape determines whether you should focus on building mass, burning fat, or creating balanced proportions. One plan does not fit all.",
            },
            {
              title: "Progressive Overload",
              desc: "Every plan in this guide uses progressive overload — the scientifically proven method for continuous improvement regardless of body type.",
            },
            {
              title: "Evidence-Based Numbers",
              desc: "All sets, reps, rest periods, and exercise selections are based on peer-reviewed exercise science and NSCA guidelines.",
            },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-green-100 bg-green-50 p-5">
              <p className="font-bold text-black">{p.title}</p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── GENDER + SHAPE SELECTOR ──────────────────────── */}
      <section id="workout-plans" className="bg-gray-50 py-10 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              Gym Workout Plans by Body Shape
            </h2>
            <p className="mt-3 text-gray-700">
              Select your gender, then your body shape to see your personalised workout routines and 7-day plan.
            </p>

            <div className="mt-6 inline-flex rounded-xl border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setActiveGender("female")}
                className={`rounded-lg px-6 py-2.5 text-sm font-bold transition ${
                  activeGender === "female"
                    ? "bg-green-700 text-white shadow"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Female Body Shapes
              </button>
              <button
                type="button"
                onClick={() => setActiveGender("male")}
                className={`rounded-lg px-6 py-2.5 text-sm font-bold transition ${
                  activeGender === "male"
                    ? "bg-green-700 text-white shadow"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Male Body Types
              </button>
            </div>
          </div>

          <GymPlanSelector gender={activeGender} />
        </div>
      </section>

      {/* ── WORKOUT CHART ─────────────────────────────────── */}
      <section id="training-chart" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <WorkoutStatsBar />
      </section>

      {/* ── FULL BODY MIX WORKOUT ─────────────────────────── */}
      <section id="beginner-plan" className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <h2 className="text-2xl font-bold text-black md:text-3xl">
          What Is a Full Body Mix Workout — and Who Needs It?
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          A full body mix workout plan hits every major muscle group in each session, typically 3 times per week. It is the right starting point for beginners regardless of body shape — because it builds movement patterns, establishes baseline strength, and prevents overload before your body is ready for split training.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          After 8 to 12 weeks of full-body training, beginners should progress to the shape-specific splits above. The plans in this guide are designed for intermediate trainees who already have a movement foundation.
        </p>

        <h3 className="mt-8 text-xl font-bold text-black">
          Universal Starter Plan — Works for Any Body Shape
        </h3>
        <p className="mt-2 text-gray-700 leading-relaxed">
          If you are new to the gym, run this 3-day full body routine for 8 weeks before moving to your shape-specific plan:
        </p>

        {/* Universal Beginner Table */}
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Exercise</th>
                  <th className="p-4 text-left font-semibold">Sets</th>
                  <th className="p-4 text-left font-semibold">Reps</th>
                  <th className="p-4 text-left font-semibold">Rest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { name: "Goblet Squat", sets: 3, reps: "10–12", rest: "60s" },
                  { name: "Push-Up (Modified or Full)", sets: 3, reps: "8–12", rest: "60s" },
                  { name: "Dumbbell Row", sets: 3, reps: "10–12", rest: "60s" },
                  { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "10", rest: "60s" },
                  { name: "Dumbbell Overhead Press", sets: 3, reps: "10", rest: "60s" },
                  { name: "Plank Hold", sets: 3, reps: "30 sec", rest: "45s" },
                ].map((ex) => (
                  <tr key={ex.name} className="hover:bg-gray-50">
                    <td className="p-4 font-semibold text-black">{ex.name}</td>
                    <td className="p-4 text-gray-600">{ex.sets}</td>
                    <td className="p-4 text-gray-600">{ex.reps}</td>
                    <td className="p-4 text-gray-600">{ex.rest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Perform this 3x per week (e.g., Mon / Wed / Fri) for 8 weeks before moving to a shape-specific plan.
        </p>
      </section>

      {/* ── PDF DOWNLOAD SECTION ──────────────────────────── */}
      <section id="download-pdf" className="border-t border-b border-gray-100 bg-green-50 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-black md:text-3xl">
            Download Your Free 7-Day Gym Workout Plan PDF
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Get your personalised 7-day gym workout plan as a printable PDF — shape-specific routines, exercise descriptions, sets, reps, and rest periods, all in one document. No email required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <GymPlanPdfButton gender="male" label="Download Men's Gym Plan PDF" />
            <GymPlanPdfButton gender="female" label="Download Women's Gym Plan PDF" />
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Free download. Generated instantly in your browser. No sign-up needed.
          </p>
        </div>
      </section>

      {/* ── WORKOUT ROUTINES EXPLAINED ────────────────────── */}
      <section id="workout-routines-explained" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold text-black md:text-3xl">
          Best Workout Routines by Training Goal
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The best workout routines are the ones aligned with your body shape and primary training goal. Here is a quick reference:
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              goal: "Build Muscle Mass",
              best: "Ectomorph (Male) — Mass Builder Compound Lifts",
              routine: "4–6 reps, 90–120s rest, progressive overload every session",
              border: "border-l-green-600",
              bg: "bg-green-50",
            },
            {
              goal: "Lose Body Fat",
              best: "Endomorph (Male) / Apple (Female) — Fat Burner + Cardio",
              routine: "12–20 reps, 45–60s rest, supersets, cardio integration",
              border: "border-l-gray-800",
              bg: "bg-gray-50",
            },
            {
              goal: "Build Curves (Women)",
              best: "Rectangle / Pear Female — Glute Growth + Upper Balance",
              routine: "10–15 reps, moderate weight, hip thrusts 3x/week",
              border: "border-l-green-600",
              bg: "bg-green-50",
            },
            {
              goal: "Athletic Performance",
              best: "Mesomorph (Male) — PPL Split + Power Circuit",
              routine: "PPL 6x/week, mix of heavy compound and HIIT",
              border: "border-l-gray-800",
              bg: "bg-gray-50",
            },
            {
              goal: "Balanced Physique",
              best: "Rectangle (Male) / Hourglass (Female) — Balanced Programs",
              routine: "Full body 3x/week or upper/lower 4x/week",
              border: "border-l-green-600",
              bg: "bg-green-50",
            },
            {
              goal: "Hip and Glute Volume",
              best: "Inverted Triangle (Female) — Hip Builder",
              routine: "Hip abduction 5x/week, wide-stance squats, sumo deadlifts",
              border: "border-l-gray-800",
              bg: "bg-gray-50",
            },
          ].map((item) => (
            <div
              key={item.goal}
              className={`rounded-xl border-l-4 p-5 ${item.border} ${item.bg}`}
            >
              <p className="font-bold text-black">{item.goal}</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">{item.best}</p>
              <p className="mt-1 text-xs text-gray-600">{item.routine}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <h2 className="text-2xl font-bold text-black md:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-3">
          {[
            {
              q: "What is the best gym plan by body shape for beginners?",
              a: "For any body shape, beginners should start with a 3-day full body workout routine for 8–12 weeks. This builds movement patterns, strength foundation, and exercise familiarity before progressing to shape-specific splits. See the beginner table above for a universal starter plan.",
            },
            {
              q: "Is a 6-day gym workout schedule too much?",
              a: "A 6-day schedule works well for mesomorphs and experienced trainees using a Push/Pull/Legs split — each muscle group trained twice per week with appropriate rest between sessions. For beginners or ectomorphs, 4 days is more appropriate. Overtraining burns the calorie surplus needed for muscle growth.",
            },
            {
              q: "Can I follow a 7-day gym workout plan every week?",
              a: "True 7-day plans include one active recovery day (light walk, yoga, or mobility work) and one full rest day — so technically 5 heavy training days. Training 7 days of intense lifting without rest leads to overtraining, injury, and reduced results over time.",
            },
            {
              q: "What is the best workout routine for men by body type?",
              a: "Ectomorphs: 4-day compound mass builder with minimal cardio. Mesomorphs: 6-day PPL split with HIIT. Endomorphs: 4-day fat burner circuit with cardio days. Rectangle males: 5-day V-taper and core definition program. Select your type in the interactive planner above for the full detailed plan.",
            },
            {
              q: "Is there a gym plan by body shape PDF I can download?",
              a: "Yes — use the PDF download buttons on this page to get free 7-day workout plan PDFs for both men and women. They are generated instantly in your browser with no email required.",
            },
            {
              q: "Do workout routines for women differ significantly from men?",
              a: "Yes. Women's workout routines for most body shapes prioritise glute and hip development, postural correction, and cardio integration. Men's plans more often prioritise upper body mass, V-taper development, and maximal strength. The hormonal environment also means women typically respond better to higher rep ranges (12–20) while men see strong results at 6–12 reps.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-gray-200 bg-white p-5 open:bg-gray-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-black">
                {f.q}
                <span className="ml-4 shrink-0 text-green-700 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── RESOURCES ─────────────────────────────────────── */}
      <section id="resources" className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-black">Research and Resources</h2>
          <p className="mt-2 text-sm text-gray-600">
            The exercise selections, set/rep ranges, and training principles in this guide draw from the following sources:
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              {
                title: "NSCA Essentials of Strength Training and Conditioning, 4th Edition",
                href: "https://www.nsca.com/education/products/nsca-essentials-of-strength-training-and-conditioning-4th-edition/",
                note: "Primary reference for set/rep prescriptions and periodization",
              },
              {
                title: "American College of Sports Medicine (ACSM) — Exercise Guidelines",
                href: "https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines",
                note: "Cardio and resistance training frequency recommendations",
              },
              {
                title: "Schoenfeld BJ — The Mechanisms of Muscle Hypertrophy (Journal of Strength and Conditioning Research)",
                href: "https://pubmed.ncbi.nlm.nih.gov/20847704/",
                note: "Foundational hypertrophy research supporting progressive overload approach",
              },
              {
                title: "Calqulate Body Shape Calculator",
                href: "/health/body-shape-calculator",
                note: "Identify your body shape using your measurements before selecting a plan",
              },
            ].map((res) => (
              <li key={res.href} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                <div>
                  <a
                    href={res.href}
                    target={res.href.startsWith("http") ? "_blank" : undefined}
                    rel={res.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    {res.title}
                  </a>
                  <p className="mt-0.5 text-xs text-gray-500">{res.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── AUTHOR SECTION ────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">About the Author</p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
              MA
            </div>
            <div>
              <p className="text-lg font-bold text-black">Meet Akabari</p>
              <p className="mt-1 text-sm font-semibold text-green-700">Health and Fitness Writer, Calqulate</p>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                Meet writes about evidence-based fitness, body composition, and practical training strategies for everyday people. He focuses on translating exercise science into plans that real people can actually follow — without the generic advice that wastes months of effort. His work at Calqulate helps readers across India, the US, and the UK find workout approaches that match their specific body type and goals.
              </p>
              <p className="mt-3 text-xs text-gray-400">
                Content reviewed for accuracy against NSCA and ACSM guidelines. Last reviewed May 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-black py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Not Sure What Your Body Shape Is?
          </h2>
          <p className="mt-3 text-gray-300 max-w-xl mx-auto leading-relaxed">
            Use our free Body Shape Calculator to identify your shape in 60 seconds using your measurements. Then come back here for your personalised gym plan, 7-day schedule, and free PDF.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={blog.ctaHref}
              className="inline-block rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-green-500"
            >
              {blog.cta} →
            </Link>
            <Link
              href="/blog"
              className="inline-block rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:border-white/50"
            >
              Browse All Body Shape Guides
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

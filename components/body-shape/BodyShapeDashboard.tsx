// components/body-shape/BodyShapeDashboard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { bodyShapes, type ShapeId } from "@/lib/blog/body-shapes-data";
import { getDietPlan } from "@/lib/diet/diet-plans-data";
import MacrosDonutChart from "@/components/charts/MacrosDonutChart";
import DietPlanPdfButton from "@/components/plans/DietPlanPdfButton";

export default function BodyShapeDashboard() {
  const [activeId, setActiveId] = useState<ShapeId>("hourglass");
  const active = bodyShapes.find((s) => s.id === activeId)!;
  const diet = getDietPlan(activeId)!;

  return (
    <section className="my-16">
      {/* ── Tab strip — all 5 shapes ─────────────────── */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Explore Each Body Shape
        </h2>
        <p className="mt-2 text-slate-600">
          Tap a shape to see its characteristics, best dresses, and personalized diet plan.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {bodyShapes.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`flex items-center gap-3 rounded-xl border-2 px-5 py-3 text-left transition ${
                isActive
                  ? "border-transparent text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
              style={isActive ? { backgroundColor: s.brandColor } : {}}
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/20">
                <Image
                  src={s.illustration}
                  alt={s.name}
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="text-sm font-bold">{s.name}</div>
                <div className={`text-xs ${isActive ? "text-white/80" : "text-slate-500"}`}>
                  {s.alsoKnownAs}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Active shape detail ──────────────────────── */}
      <div
        className="overflow-hidden rounded-3xl ring-1 ring-slate-200"
        style={{
          background: `linear-gradient(135deg, ${active.brandColor}10 0%, #ffffff 60%)`,
        }}
      >
        {/* Hero strip */}
        <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: active.brandColor }}
            >
              {active.alsoKnownAs}
            </span>
            <h3 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {active.name} Shape
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {active.ratioRule}
            </p>
            <p className="mt-4 text-slate-700">{active.description}</p>

            <div className="mt-6 rounded-xl border-l-4 bg-white p-4 shadow-sm" style={{ borderLeftColor: active.brandColor }}>
              <p className="text-sm font-semibold text-slate-900">Styling Goal</p>
              <p className="mt-1 text-sm text-slate-700">{active.stylingGoal}</p>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md">
            <Image
              src={active.illustration}
              alt={`${active.name} body shape illustration`}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Characteristics */}
        <div className="grid gap-6 border-t border-slate-200 bg-white p-8 md:grid-cols-3 md:p-12">
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Characteristics
            </h4>
            <ul className="space-y-2 text-slate-700">
              {active.characteristics.map((c) => (
                <li key={c} className="flex gap-2">
                  <span style={{ color: active.brandColor }}>●</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">
              ✓ Best Necklines
            </h4>
            <ul className="space-y-2 text-slate-700">
              {active.bestNecklines.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-rose-600">
              ✗ Avoid
            </h4>
            <ul className="space-y-2 text-slate-700">
              {active.avoid.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Best dresses ───────────────────────────── */}
        <div className="border-t border-slate-200 bg-slate-50 p-8 md:p-12">
          <h4 className="text-2xl font-bold text-slate-900">
            Best Dresses for {active.name} Shape
          </h4>
          <p className="mt-2 text-slate-600">
            Hand-picked silhouettes that flatter your proportions.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {active.bestDresses.map((d) => (
              <div
                key={d.name}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: active.brandColor }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{d.name}</h5>
                    <p className="mt-1 text-sm text-slate-600">{d.why}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.occasions.map((o) => (
                        <span
                          key={o}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-slate-500">
            Inspired by: <span className="font-medium">{active.celebrities.join(" • ")}</span>
          </div>
        </div>

        {/* ── Personalized diet plan + PDF ──────────── */}
        <div className="border-t border-slate-200 bg-white p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: active.brandColor }}
              >
                Personalized Plan
              </span>
              <h4 className="mt-3 text-2xl font-bold text-slate-900">
                {active.name} Body — 7-Day Diet Plan
              </h4>
              <p className="mt-2 text-slate-600">{diet.goal}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Daily Calories</p>
                  <p className="mt-1 font-bold text-slate-900">{diet.dailyCalories}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Hydration</p>
                  <p className="mt-1 font-bold text-slate-900">{diet.hydration}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-slate-700">Focus Nutrients</p>
                <div className="flex flex-wrap gap-2">
                  {diet.focusNutrients.map((n) => (
                    <span
                      key={n}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: active.brandColor }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <DietPlanPdfButton plan={diet} brandColor={active.brandColor} />
                <p className="mt-2 text-xs text-slate-500">
                  Free PDF download — full 7-day plan + grocery list.
                </p>
              </div>
            </div>

            <MacrosDonutChart
              protein={diet.macros.protein}
              carbs={diet.macros.carbs}
              fats={diet.macros.fats}
              shapeName={active.name}
            />
          </div>

          {/* 7-day meal preview */}
          <div className="mt-10">
            <h5 className="mb-4 text-lg font-bold text-slate-900">
              Sample 3-Day Preview
            </h5>
            <div className="grid gap-4 md:grid-cols-3">
              {diet.weeklyPlan.slice(0, 3).map((d) => (
                <div
                  key={d.day}
                  className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
                >
                  <p className="font-bold text-slate-900">{d.day}</p>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase text-slate-500">
                        Breakfast
                      </dt>
                      <dd className="text-slate-700">{d.breakfast}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase text-slate-500">
                        Lunch
                      </dt>
                      <dd className="text-slate-700">{d.lunch}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase text-slate-500">
                        Dinner
                      </dt>
                      <dd className="text-slate-700">{d.dinner}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Download the full PDF for all 7 days + snacks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

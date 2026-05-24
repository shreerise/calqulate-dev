// components/gym-plan/GymWeekPlan.tsx
"use client";

import { useState } from "react";
import type { ShapeData } from "@/lib/blog/gym-plan-data";

interface GenderColor {
  accent: string;
  accentHover: string;
  ring: string;
  badge: string;
  border: string;
  light: string;
  text: string;
  gradient: string;
}

interface Props {
  shape: ShapeData;
  genderColor: GenderColor;
  gender: "male" | "female";
}

const dayTypeConfig = {
  training: {
    border: "border-l-green-600",
    badge: "bg-green-100 text-green-800",
    label: "Training",
  },
  rest: {
    border: "border-l-gray-300",
    badge: "bg-gray-100 text-gray-600",
    label: "Rest",
  },
  "active-recovery": {
    border: "border-l-black",
    badge: "bg-gray-800 text-white",
    label: "Active Recovery",
  },
};

export default function GymWeekPlan({ shape, genderColor, gender }: Props) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const trainingDays = shape.weekPlan.filter((d) => d.type === "training").length;
  const restDays = shape.weekPlan.filter((d) => d.type === "rest").length;
  const activeDays = shape.weekPlan.filter((d) => d.type === "active-recovery").length;

  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50 p-5 md:p-7">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800">
          7-Day Gym Workout Plan
        </span>
        <h3 className="mt-3 text-xl font-bold text-black md:text-2xl">
          Complete 7-Day Schedule — {shape.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Your personalised 7-day gym workout plan designed specifically for the{" "}
          {shape.name} {gender === "male" ? "body type" : "body shape"}.
        </p>

        {/* Summary stats */}
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            { value: trainingDays, label: "Training Days" },
            { value: activeDays, label: "Active Recovery" },
            { value: restDays, label: "Rest Days" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center shadow-sm"
            >
              <p className="text-xl font-bold text-black">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day list */}
      <div className="divide-y divide-gray-100">
        {shape.weekPlan.map((day) => {
          const config = dayTypeConfig[day.type];
          const routine = day.routineId
            ? shape.routines.find((r) => r.id === day.routineId)
            : null;
          const isExpanded = expandedDay === day.day;

          return (
            <div key={day.day} className={`border-l-4 ${config.border}`}>
              <button
                type="button"
                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                className="w-full p-4 text-left transition hover:bg-gray-50 md:p-5"
                disabled={day.type === "rest"}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Day abbreviation */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-700">
                      {day.label.slice(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${config.badge}`}>
                          {config.label}
                        </span>
                        {routine && (
                          <span className="rounded-full bg-green-700 px-2 py-0.5 text-xs font-semibold text-white">
                            {routine.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-semibold text-black text-sm">{day.focus}</p>
                      {routine && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          {routine.exercises.length} exercises · {routine.duration} min · {routine.frequency}
                        </p>
                      )}
                    </div>
                  </div>

                  {day.type !== "rest" && (
                    <span className={`shrink-0 text-sm text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  )}
                </div>
              </button>

              {/* Expanded day detail */}
              {isExpanded && day.type !== "rest" && routine && (
                <div className="border-t border-gray-100 bg-gray-50 p-4 md:p-5">
                  {/* Pro tip */}
                  <div className="mb-4 rounded-xl border-l-4 border-green-600 bg-green-50 p-3 text-sm">
                    <strong className="text-black">Pro Tip:</strong>{" "}
                    <span className="text-gray-700">{routine.proTip}</span>
                  </div>

                  {/* Exercise quick list */}
                  <div className="space-y-2">
                    {routine.exercises.map((ex, idx) => (
                      <div
                        key={ex.name}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-black">{ex.name}</p>
                          <p className="text-xs text-gray-500">{ex.muscleGroup}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 shrink-0">
                          <span className="font-bold text-black">{ex.sets}x{ex.reps}</span>
                          <span className="text-gray-400">·</span>
                          <span>{ex.rest} rest</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {day.notes && (
                    <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                      Note: {day.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Active recovery content */}
              {isExpanded && day.type === "active-recovery" && (
                <div className="border-t border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">
                    {day.notes ?? "Light activity to support recovery. Keep heart rate below 60% of maximum. Options include walking, light cycling, yoga, or foam rolling."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-600">
          Want this plan as a printable PDF?{" "}
          <a href="#download-pdf" className="font-semibold text-green-700 underline underline-offset-2">
            Download the free {gender === "male" ? "Men's" : "Women's"} Gym Plan PDF
          </a>
        </p>
      </div>
    </section>
  );
}

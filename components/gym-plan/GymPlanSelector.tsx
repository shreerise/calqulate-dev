// components/gym-plan/GymPlanSelector.tsx
"use client";

import { useState } from "react";
import {
  maleShapes,
  femaleShapes,
  maleShapeList,
  femaleShapeList,
  type ShapeData,
  type WorkoutRoutine,
} from "@/lib/blog/gym-plan-data";
import GymWeekPlan from "@/components/gym-plan/GymWeekPlan";
import WorkoutRoutineCard from "@/components/gym-plan/WorkoutRoutineCard";

interface Props {
  gender: "male" | "female";
}

const greenColor = {
  accent: "bg-green-700",
  accentHover: "hover:bg-green-600",
  ring: "ring-green-300",
  badge: "bg-green-100 text-green-800",
  border: "border-green-500",
  light: "bg-green-50",
  text: "text-green-700",
  gradient: "from-green-50 to-gray-50",
};

export default function GymPlanSelector({ gender }: Props) {
  const shapeList = gender === "male" ? maleShapeList : femaleShapeList;
  const shapes = gender === "male" ? maleShapes : femaleShapes;

  const [activeShapeId, setActiveShapeId] = useState<string>(shapeList[0].id);
  const [activeRoutineId, setActiveRoutineId] = useState<string | null>(null);

  const activeShape: ShapeData =
    shapes.find((s) => s.id === activeShapeId) ?? shapes[0];

  const activeRoutine: WorkoutRoutine | null = activeRoutineId
    ? activeShape.routines.find((r) => r.id === activeRoutineId) ?? null
    : null;

  return (
    <div>
      {/* ── SHAPE SELECTOR TABS ─────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2">
        {shapeList.map((shape) => {
          const isActive = shape.id === activeShapeId;
          return (
            <button
              key={shape.id}
              type="button"
              onClick={() => {
                setActiveShapeId(shape.id);
                setActiveRoutineId(null);
              }}
              className={`rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "border-transparent bg-green-700 text-white shadow"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:text-green-800"
              }`}
              aria-pressed={isActive}
            >
              {shape.name}
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE SHAPE HERO CARD ─────────────────────── */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white">
        {/* Stats bar */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
          <div className="p-4 md:p-5 text-center">
            <p className="text-2xl font-bold text-black md:text-3xl">{activeShape.routines.length}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">Workout Routines</p>
          </div>
          <div className="p-4 md:p-5 text-center">
            <p className="text-2xl font-bold text-black md:text-3xl">7</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">Day Plan</p>
          </div>
          <div className="p-4 md:p-5 text-center">
            <p className="text-2xl font-bold text-black md:text-3xl">{activeShape.routines.reduce((acc, r) => acc + r.exercises.length, 0)}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">Total Exercises</p>
          </div>
        </div>

        <div className="p-5 md:p-7">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800">
            {gender === "male" ? "Male Body Type" : "Female Body Shape"}
          </span>
          <h3 className="mt-3 text-2xl font-bold text-black md:text-3xl">
            {activeShape.name}
          </h3>
          <p className="mt-2 text-gray-700 leading-relaxed">{activeShape.longDesc}</p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                Key Characteristics
              </p>
              <ul className="space-y-2">
                {activeShape.characteristics.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                Training Goals
              </p>
              <ul className="space-y-2">
                {activeShape.goals.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                      ✓
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Priority Muscle Groups
            </p>
            <div className="flex flex-wrap gap-2">
              {activeShape.keyFocusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition Tip */}
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1">
              Nutrition Tip
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{activeShape.nutritionTip}</p>
          </div>

          {/* Avoid section */}
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-red-700">
              What to Avoid for This Body Shape
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {activeShape.avoid.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    X
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── WORKOUT ROUTINES GRID ─────────────────────────── */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-black md:text-2xl">
          {activeShape.routines.length} Workout Routines for {activeShape.name}
        </h3>
        <p className="mt-1 text-gray-600 text-sm">
          Click any routine to expand the full exercise list with sets, reps, and coaching tips.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {activeShape.routines.map((routine) => (
          <WorkoutRoutineCard
            key={routine.id}
            routine={routine}
            isActive={routine.id === activeRoutineId}
            genderColor={greenColor}
            onClick={() =>
              setActiveRoutineId(
                activeRoutineId === routine.id ? null : routine.id
              )
            }
          />
        ))}
      </div>

      {/* ── 7-DAY WEEKLY PLAN ─────────────────────────────── */}
      <GymWeekPlan
        shape={activeShape}
        genderColor={greenColor}
        gender={gender}
      />
    </div>
  );
}

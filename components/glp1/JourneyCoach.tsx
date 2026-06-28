"use client";

import { useEffect, useState } from "react";
import { Flag, TrendingDown, Target, CalendarClock, Trophy, Check } from "lucide-react";
import { goalProjection, type JourneyMetrics, type WeeklyScore } from "@/lib/glp1/coach";

const LB = 2.2046226218;
const GOAL_KEY = "glp1_goal_kg";
const kg2lb = (kg: number) => Math.round(kg * LB * 10) / 10;

/**
 * Interactive "Your Journey" coaching panel. Pace, projection and milestones come
 * from the server-computed metrics; the goal weight lives in localStorage only
 * (UX-only — never persisted to the backend) so the projection feels personal.
 */
export function JourneyCoach({ journey, weekly }: { journey: JourneyMetrics; weekly: WeeklyScore | null }) {
  const [goalKg, setGoalKg] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(GOAL_KEY) : null;
    if (saved) setGoalKg(Number(saved));
  }, []);

  function saveGoal() {
    const lb = Number(draft);
    if (!lb || lb <= 0) return;
    const kg = Math.round((lb / LB) * 10) / 10;
    window.localStorage.setItem(GOAL_KEY, String(kg));
    setGoalKg(kg);
    setEditing(false);
  }

  const proj = goalKg != null ? goalProjection(journey.currentKg, goalKg, journey.paceKgPerWeek) : null;
  const etaDate =
    proj?.etaWeeks != null
      ? new Date(Date.now() + proj.etaWeeks * 7 * 24 * 3_600_000).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : null;

  // Milestones from baseline → goal, every 5 kg.
  const milestones: { lb: number; reached: boolean }[] = [];
  if (goalKg != null && journey.baselineKg > goalKg) {
    for (let kg = journey.baselineKg - 5; kg > goalKg; kg -= 5) {
      milestones.push({ lb: kg2lb(kg), reached: journey.currentKg <= kg });
    }
    milestones.push({ lb: kg2lb(goalKg!), reached: journey.currentKg <= goalKg });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Flag className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-gray-900">Your journey</h2>
      </div>

      {/* Headline metrics */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Current" value={`${kg2lb(journey.currentKg)} lb`} sub={`${journey.currentKg.toFixed(1)} kg`} />
        <Metric label="Lost so far" value={journey.lostKg > 0 ? `${journey.lostLb} lb` : "—"} sub={journey.lostKg > 0 ? `${journey.lostKg} kg` : "keep logging"} tone="emerald" />
        <Metric
          label="Pace"
          value={journey.paceKgPerWeek ? `${Math.abs(kg2lb(journey.paceKgPerWeek)).toFixed(1)} lb/wk` : "—"}
          sub={journey.paceKgPerWeek ? `${Math.abs(journey.paceKgPerWeek).toFixed(2)} kg/wk` : "need 2+ weigh-ins"}
        />
        <Metric label="Projected next week" value={journey.projectedNextKg ? `${kg2lb(journey.projectedNextKg)} lb` : "—"} sub={journey.projectedNextKg ? `${journey.projectedNextKg} kg` : "—"} />
      </div>

      {/* Goal + projection */}
      <div className="mt-4 rounded-xl bg-emerald-50/60 p-4">
        {goalKg == null && !editing ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Target className="h-4 w-4 text-emerald-600" /> Set a goal weight to see your estimated finish.</div>
            <button onClick={() => setEditing(true)} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700">Set goal</button>
          </div>
        ) : editing ? (
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="goal-lb" className="text-xs font-medium text-gray-500">Goal weight (lb)</label>
              <input id="goal-lb" type="number" min="0" step="0.1" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={String(kg2lb(journey.currentKg))} className="mt-1 h-9 w-32 rounded-md border border-input bg-background px-3 text-sm" />
            </div>
            <button onClick={saveGoal} className="h-9 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white hover:bg-emerald-700">Save</button>
            <button onClick={() => setEditing(false)} className="h-9 rounded-lg px-2 text-sm text-gray-500 hover:text-gray-800">Cancel</button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="inline-flex items-center gap-1.5 text-sm"><Target className="h-4 w-4 text-emerald-600" /> Goal <b className="text-gray-900">{kg2lb(goalKg!)} lb</b></span>
              {proj && !proj.reached && <span className="inline-flex items-center gap-1.5 text-sm"><TrendingDown className="h-4 w-4 text-emerald-600" /> {kg2lb(proj.remainingKg)} lb to go</span>}
              {etaDate && <span className="inline-flex items-center gap-1.5 text-sm"><CalendarClock className="h-4 w-4 text-emerald-600" /> Est. finish <b className="text-gray-900">~{etaDate}</b></span>}
              {proj?.reached && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700"><Trophy className="h-4 w-4" /> Goal reached!</span>}
            </div>
            <button onClick={() => { setDraft(String(kg2lb(goalKg!))); setEditing(true); }} className="text-xs font-medium text-emerald-700 hover:underline">Edit</button>
          </div>
        )}

        {/* Milestone timeline */}
        {milestones.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {milestones.map((m, idx) => (
              <span key={idx} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${m.reached ? "bg-emerald-600 text-white" : "bg-white text-gray-500 ring-1 ring-gray-200"}`}>
                {m.reached ? <Check className="h-3 w-3" /> : null}{m.lb} lb
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Weekly health score */}
      {weekly && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">This week's health score</h3>
            <span className="text-sm font-bold text-emerald-700">{weekly.overall}%</span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Bar label="Nutrition (protein)" pct={weekly.nutrition} />
            <Bar label="Exercise" pct={weekly.exercise} />
            <Bar label="Hydration" pct={weekly.hydration} />
            <Bar label="Sleep" pct={weekly.sleep} />
          </div>
          <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">💡 {weekly.tip}</p>
        </div>
      )}

      <p className="mt-4 text-[11px] text-gray-400">Estimates for guidance only — individual results vary, and your goal weight stays on this device. Not medical advice.</p>
    </div>
  );
}

function Metric({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: "emerald" }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className={`mt-0.5 text-lg font-extrabold ${tone === "emerald" ? "text-emerald-600" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] text-gray-400">{sub}</div>
    </div>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  const tone = pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-400" : "bg-rose-400";
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="text-gray-400">{pct}%</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${tone} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { runSimulation, type HistoryPoint, type SimulationOutput } from "@/lib/simulationEngine";
import { TrajectoryChart } from "./TrajectoryChart";
import { Rocket, TrendingDown, Sparkles } from "lucide-react";

type Metric = "weight" | "score" | "heartAge";

export function SimulationRunner({ history }: { history: HistoryPoint[] }) {
  const lastWeight = [...history].reverse().find((h) => h.weightKg != null)?.weightKg ?? 85;
  const lastScore = [...history].reverse().find((h) => h.metabolicScore != null)?.metabolicScore ?? 60;

  const [targetWeight, setTargetWeight] = useState(Math.round(lastWeight * 0.88));
  const [targetScore, setTargetScore] = useState(Math.min(95, Math.round(lastScore + 20)));
  const [months, setMonths] = useState(12);
  const [metric, setMetric] = useState<Metric>("weight");
  const [sim, setSim] = useState<SimulationOutput | null>(null);
  const [running, setRunning] = useState(false);

  function run() {
    setRunning(true);
    // Defer so the button shows its running state before the synchronous sim.
    setTimeout(() => {
      const result = runSimulation(history, { targetWeightKg: targetWeight, targetMetabolicScore: targetScore, monthsAhead: months }, 600);
      setSim(result);
      setRunning(false);
    }, 30);
  }

  const realistic = sim?.scenarios.find((s) => s.scenario === "realistic");
  const final = realistic?.points[realistic.points.length - 1];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
        <div className="grid gap-5 md:grid-cols-3">
          <Field label={`Target weight: ${targetWeight} kg`}>
            <input type="range" min={Math.round(lastWeight * 0.6)} max={Math.round(lastWeight * 1.1)} value={targetWeight}
              onChange={(e) => setTargetWeight(+e.target.value)} className="w-full accent-emerald-500" />
          </Field>
          <Field label={`Target metabolic score: ${targetScore}`}>
            <input type="range" min={Math.round(lastScore)} max={100} value={targetScore}
              onChange={(e) => setTargetScore(+e.target.value)} className="w-full accent-emerald-500" />
          </Field>
          <Field label={`Horizon: ${months} months`}>
            <input type="range" min={6} max={60} step={1} value={months}
              onChange={(e) => setMonths(+e.target.value)} className="w-full accent-emerald-500" />
          </Field>
        </div>
        <button onClick={run} disabled={running}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-gray-950 hover:bg-emerald-400 disabled:opacity-60">
          <Rocket className="h-5 w-5" /> {running ? "Simulating 600 futures…" : "Run simulation"}
        </button>
        <p className="mt-2 text-xs text-gray-500">
          Monte-Carlo: 600 stochastic iterations × 3 adherence scenarios, projected from your own trend &amp; volatility.
        </p>
      </div>

      {!sim && (
        <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-10 text-center text-gray-400">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-emerald-500" />
          Set your goals and run the simulation to see your projected future self with confidence bands.
        </div>
      )}

      {sim && final && (
        <>
          {/* Current vs Future */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Compare label="Weight" unit="kg" now={sim.start.weight} future={final.weight.p50} lower />
            <Compare label="Metabolic score" unit="" now={sim.start.score} future={final.score.p50} />
            <Compare label="Heart age Δ" unit="yr" now={sim.start.heartAge} future={final.heartAge.p50} lower />
          </div>

          {/* Metric toggle + chart */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
            <div className="mb-3 inline-flex rounded-lg border border-gray-700 p-1">
              {(["weight", "score", "heartAge"] as Metric[]).map((mt) => (
                <button key={mt} onClick={() => setMetric(mt)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${metric === mt ? "bg-emerald-500 text-gray-950" : "text-gray-400 hover:text-white"}`}>
                  {mt === "weight" ? "Weight" : mt === "score" ? "Metabolic Score" : "Heart age"}
                </button>
              ))}
            </div>
            <TrajectoryChart sim={sim} metric={metric} />
            <p className="mt-2 text-xs text-gray-500">
              Solid line = most-likely (p50). Shaded = realistic 80% confidence band. Dashed = best/worst adherence.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      {children}
    </label>
  );
}

function Compare({ label, unit, now, future, lower }: { label: string; unit: string; now: number; future: number; lower?: boolean }) {
  const delta = Math.round((future - now) * 10) / 10;
  const good = lower ? delta < 0 : delta > 0;
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-gray-500 line-through">{now}{unit}</span>
        <span className="text-2xl font-extrabold text-white">{future}{unit}</span>
      </div>
      <div className={`mt-1 flex items-center gap-1 text-sm font-semibold ${good ? "text-emerald-400" : "text-amber-400"}`}>
        <TrendingDown className={`h-4 w-4 ${good && lower ? "" : "rotate-180"}`} />
        {delta > 0 ? "+" : ""}{delta}{unit} projected
      </div>
    </div>
  );
}

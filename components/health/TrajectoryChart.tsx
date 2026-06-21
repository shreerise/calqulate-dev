"use client";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { SimulationOutput } from "@/lib/simulationEngine";

type Metric = "weight" | "score" | "heartAge";

const META: Record<Metric, { label: string; unit: string; key: "weight" | "score" | "heartAge" }> = {
  weight: { label: "Weight", unit: "kg", key: "weight" },
  score: { label: "Metabolic Score", unit: "", key: "score" },
  heartAge: { label: "Heart age Δ", unit: "yr", key: "heartAge" },
};

export function TrajectoryChart({ sim, metric }: { sim: SimulationOutput; metric: Metric }) {
  const m = META[metric];
  const realistic = sim.scenarios.find((s) => s.scenario === "realistic")!;
  const optimistic = sim.scenarios.find((s) => s.scenario === "optimistic")!;
  const pessimistic = sim.scenarios.find((s) => s.scenario === "pessimistic")!;

  const data = realistic.points.map((pt, i) => {
    const lo = realistic.points[i][m.key].p10;
    const hi = realistic.points[i][m.key].p90;
    return {
      month: pt.month,
      band: [lo, hi] as [number, number],
      optimistic: optimistic.points[i][m.key].p50,
      realistic: realistic.points[i][m.key].p50,
      pessimistic: pessimistic.points[i][m.key].p50,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.15} />
        <XAxis dataKey="month" tickFormatter={(v) => `${v}mo`} fontSize={12} stroke="#9ca3af" />
        <YAxis fontSize={12} stroke="#9ca3af" domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ background: "#0b1220", border: "1px solid #1f2937", borderRadius: 12, color: "#e5e7eb" }}
          formatter={(val: any, name: string) => [Array.isArray(val) ? `${val[0]}–${val[1]} ${m.unit}` : `${val} ${m.unit}`, name]}
          labelFormatter={(l) => `Month ${l}`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="band" name="Realistic range (p10–p90)" stroke="none" fill="#10b981" fillOpacity={0.15} />
        <Line type="monotone" dataKey="optimistic" name="Optimistic" stroke="#34d399" strokeWidth={2} dot={false} strokeDasharray="4 3" />
        <Line type="monotone" dataKey="realistic" name="Realistic" stroke="#10b981" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="pessimistic" name="Pessimistic" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 3" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

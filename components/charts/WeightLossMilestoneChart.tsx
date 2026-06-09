// components/charts/WeightLossMilestoneChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { weightLossMilestones } from "@/lib/blog/weight-loss-percentage-data";

/**
 * Visualizes the cumulative health-impact score at each weight-loss
 * percentage milestone (5%, 7%, 10%, 15%, 20%+).
 * Higher score = more clinical and metabolic benefits stack up.
 */
export default function WeightLossMilestoneChart() {
  const data = weightLossMilestones.map((m) => ({
    name: m.label,
    score: m.impactScore,
    color: m.brandColor,
  }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          Health Impact at Each Weight Loss Milestone
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Cumulative health-impact score (0–100) — how clinical benefits stack
          up as your weight loss percentage climbs.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#475569" }}
              interval={0}
              height={40}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 13,
              }}
              formatter={(value: number) => [`${value} / 100`, "Health Impact"]}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
              <LabelList
                dataKey="score"
                position="top"
                style={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Methodology: each milestone's score reflects compounded benefits across
        blood pressure, blood sugar, lipid profile, sleep quality, joint stress,
        and weight-maintenance odds — sourced from clinical weight-management research.
      </p>
    </div>
  );
}

// components/charts/RmrFactorsChart.tsx
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
import { rmrEquations } from "@/lib/blog/rmr-data";

/**
 * Visualizes the accuracy score of each major RMR/BMR prediction equation.
 * Higher score = closer to indirect-calorimetry measured RMR.
 */
export default function RmrFactorsChart() {
  const data = rmrEquations
    .slice()
    .sort((a, b) => b.accuracy - a.accuracy)
    .map((e) => ({
      name: e.name.replace(" (Revised 1984)", "").replace("-", "-\n"),
      accuracy: e.accuracy,
      color: e.brandColor,
    }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          How Accurate Is Each RMR Equation?
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Accuracy score (0–100) measured against gold-standard indirect calorimetry.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#475569" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={70}
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
              formatter={(value: number) => [`${value} / 100`, "Accuracy"]}
            />
            <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
              <LabelList
                dataKey="accuracy"
                position="top"
                style={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Methodology: each equation's predicted RMR is compared against indirect
        calorimetry across mixed-population studies; closer agreement = higher score.
      </p>
    </div>
  );
}

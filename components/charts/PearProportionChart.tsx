// components/charts/PearProportionChart.tsx
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
import { pearDresses } from "../../lib/blog/pear-dress-data";

/**
 * Visualizes how well each dress style balances pear-shape proportions.
 * Higher score = better balance between upper and lower body.
 */
export default function PearProportionChart() {
  const data = pearDresses
    .slice() // don't mutate the import
    .sort((a, b) => b.fitScore - a.fitScore)
    .map((d) => ({
      name: d.name.replace(" + ", " + \n").replace(" / ", "\n"),
      score: d.fitScore,
      color: d.brandColor,
    }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-emerald-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          How Each Dress Cut Scores for Pear Shape
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Balance score (0–100) for restoring shoulder-to-hip proportion.
        </p>
      </div>

      <div className="h-[300px] sm:h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
              cursor={{ fill: "rgba(231, 111, 81, 0.08)" }}
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 13,
              }}
              formatter={(value: number) => [`${value} / 100`, "Balance Score"]}
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
        Scoring methodology: shoulder-line widening, waist definition, hip-skim,
        and leg-line elongation — weighted equally.
      </p>
    </div>
  );
}

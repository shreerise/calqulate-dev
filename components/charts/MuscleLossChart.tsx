"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { weightLossSplit } from "@/lib/blog/ozempic-muscle-loss-data";

/**
 * Shows the part nobody warns you about: when you lose weight on a GLP-1,
 * a big slice of it can be MUSCLE, not fat. The donut makes the "up to ~30%
 * is muscle" reality obvious at a glance — the whole reason the bathroom
 * scale (which only sees total weight) is lying to you.
 */
export default function MuscleLossChart() {
  const data = weightLossSplit.map((s) => ({
    name: s.label,
    value: s.percent,
    color: s.brandColor,
  }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-rose-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          Every Pound You Lose: Fat vs. Muscle
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          On a GLP-1 like Ozempic or Wegovy, as much as a third of the weight
          you drop can come from muscle, not fat. Your scale shows none of this
          — it only sees the total.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              label={({ value }) => `${value}%`}
              labelLine={false}
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 13,
              }}
              formatter={(value: number, name: string) => [
                `${value}% of weight lost`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Source: STEP 1 semaglutide DXA analysis — roughly 40% of total weight
        lost was lean (fat-free) mass; pooled GLP-1 trials range ~25%-40%. With
        protein and resistance training, that muscle share can be cut to just a
        few percent. Track fat vs. muscle to know which one you&rsquo;re really
        losing.
      </p>
    </div>
  );
}

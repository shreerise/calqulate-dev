// components/charts/MaleBodyShapeChart.tsx
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
import { maleShapes } from "@/lib/blog/male-body-shape-data";

/**
 * The shoulder-to-waist spectrum. A higher ratio means a stronger upper-body
 * taper (the V-shape). This is the single number that separates the five male
 * shapes, so plotting it shows the whole spectrum at a glance.
 */
export default function MaleBodyShapeChart() {
  const data = maleShapes.map((s) => ({
    name: s.name,
    ratio: s.shoulderToWaist,
    color: s.brandColor,
  }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          The Shoulder-to-Waist Spectrum
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          One ratio separates the five shapes. The higher it is, the stronger the
          V-taper. A value near 1.0 means a straight or hip-led frame.
        </p>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 40, left: 20, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis
              type="number"
              domain={[1, 1.6]}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 12, fill: "#475569" }}
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
              formatter={(value: number) => [`${value} : 1`, "Shoulder-to-waist"]}
            />
            <Bar dataKey="ratio" radius={[0, 8, 8, 0]} barSize={26}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
              <LabelList
                dataKey="ratio"
                position="right"
                formatter={(v: number) => `${v}:1`}
                style={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Typical values for each shape. Yours will sit somewhere on this line.
        Ratios are based on the measurement ranges in Calqulate's male body type
        chart.
      </p>
    </div>
  );
}

// components/charts/BodyShapeRatioChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { shape: "Pear", Bust: 34, Waist: 28, Hips: 40 },
  { shape: "Apple", Bust: 38, Waist: 36, Hips: 36 },
  { shape: "Hourglass", Bust: 36, Waist: 26, Hips: 36 },
  { shape: "Rectangle", Bust: 34, Waist: 32, Hips: 34 },
  { shape: "Inverted △", Bust: 38, Waist: 30, Hips: 32 },
];

export default function BodyShapeRatioChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="mb-1 text-lg font-bold text-slate-900">
        Body Shape Measurement Comparison
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Average bust, waist & hip measurements (in inches) across all 5 female body shapes.
      </p>
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="shape" tick={{ fill: "#475569", fontSize: 12 }} />
            <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Bar dataKey="Bust" fill="#2A9D8F" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Waist" fill="#E76F51" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Hips" fill="#264653" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

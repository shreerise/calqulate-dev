// components/charts/MacrosDonutChart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Props {
  protein: number;
  carbs: number;
  fats: number;
  shapeName: string;
}

export default function MacrosDonutChart({ protein, carbs, fats, shapeName }: Props) {
  const data = [
    { name: "Protein", value: protein, color: "#2A9D8F" },
    { name: "Carbs", value: carbs, color: "#E9C46A" },
    { name: "Fats", value: fats, color: "#E76F51" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-bold text-slate-900">
        Recommended Macro Split
      </h3>
      <p className="mb-3 text-sm text-slate-500">
        Tailored for {shapeName} body shape goals.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

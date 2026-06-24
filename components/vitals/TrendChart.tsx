"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export interface TrendPoint {
  date: string;
  score?: number | null;
  ascvd?: number | null;
  diabetes?: number | null;
  heartAgeDelta?: number | null;
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  if (!data.length) {
    return <p className="text-sm text-gray-500">No history yet — save a measurement to start your trend.</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="date" fontSize={11} tickMargin={4} />
        <YAxis fontSize={11} width={35} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" name="Health Score" stroke="#2563eb" strokeWidth={2} dot />
        <Line type="monotone" dataKey="ascvd" name="ASCVD risk %" stroke="#dc2626" strokeWidth={2} dot />
        <Line type="monotone" dataKey="diabetes" name="Diabetes risk %" stroke="#ca8a04" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  );
}

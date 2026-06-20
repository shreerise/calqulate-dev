import { getAccess } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const access = await getAccess();
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("risk_results")
    .select("composite_score,composite_grade,ascvd_percent,diabetes_percent,heart_age,computed_at")
    .eq("user_id", access.userId!)
    .order("computed_at", { ascending: false });

  const history = rows ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Measurement history</h1>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Heart age</th>
              <th className="px-4 py-3">ASCVD %</th>
              <th className="px-4 py-3">Diabetes %</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">No measurements yet.</td></tr>
            )}
            {history.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">{new Date(r.computed_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-semibold">{r.composite_score}</td>
                <td className="px-4 py-3">{r.composite_grade}</td>
                <td className="px-4 py-3">{r.heart_age ?? "—"}</td>
                <td className="px-4 py-3">{r.ascvd_percent ?? "—"}</td>
                <td className="px-4 py-3">{r.diabetes_percent ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

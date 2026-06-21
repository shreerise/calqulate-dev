import { createAdminClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  const admin = createAdminClient();

  const [{ data: results }, { data: profiles }, reportsCount] = await Promise.all([
    admin.from("risk_results").select("user_id,composite_score,composite_grade,ascvd_percent,diabetes_percent,heart_age,computed_at").order("computed_at", { ascending: false }).limit(100),
    admin.from("profiles").select("id,email"),
    admin.from("reports").select("*", { count: "exact", head: true }),
  ]);

  const emailById = new Map<string, string>();
  for (const p of profiles ?? []) emailById.set(p.id, p.email ?? "");
  const rows = results ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports &amp; risk results</h1>
        <p className="text-gray-500">Computed health reports across all users.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Risk results" value={rows.length >= 100 ? "100+" : rows.length} />
        <StatCard label="PDF reports" value={reportsCount.count ?? 0} />
        <StatCard label="Latest" value={rows[0]?.computed_at ? new Date(rows[0].computed_at).toLocaleDateString() : "—"} />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Email</th>
              <th className="px-4 py-2.5 font-medium">Score</th>
              <th className="px-4 py-2.5 font-medium">Grade</th>
              <th className="px-4 py-2.5 font-medium">Heart age</th>
              <th className="px-4 py-2.5 font-medium">ASCVD %</th>
              <th className="px-4 py-2.5 font-medium">Diabetes %</th>
              <th className="px-4 py-2.5 font-medium">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-400">No reports yet.</td></tr>
            )}
            {rows.map((r: any, i: number) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-4 py-2.5 text-gray-800">{emailById.get(r.user_id) ?? "—"}</td>
                <td className="px-4 py-2.5 font-semibold">{r.composite_score ?? "—"}</td>
                <td className="px-4 py-2.5">{r.composite_grade ?? "—"}</td>
                <td className="px-4 py-2.5">{r.heart_age ?? "—"}</td>
                <td className="px-4 py-2.5">{r.ascvd_percent ?? "—"}</td>
                <td className="px-4 py-2.5">{r.diabetes_percent ?? "—"}</td>
                <td className="px-4 py-2.5 text-gray-500">{r.computed_at ? new Date(r.computed_at).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

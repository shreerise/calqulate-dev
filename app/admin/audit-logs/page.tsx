import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminAuditLogsPage() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("audit_logs")
    .select("admin_email,action,target,meta,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit logs</h1>
        <p className="text-gray-500">Every admin action is recorded here.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Could not read audit_logs — make sure migration <code>0002_admin.sql</code> has been run.
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">When</th>
              <th className="px-4 py-2.5 font-medium">Admin</th>
              <th className="px-4 py-2.5 font-medium">Action</th>
              <th className="px-4 py-2.5 font-medium">Target</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No actions logged yet.</td></tr>
            )}
            {rows.map((r: any, i: number) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-4 py-2.5 text-gray-500">{r.created_at ? new Date(r.created_at).toLocaleString() : "—"}</td>
                <td className="px-4 py-2.5 text-gray-800">{r.admin_email ?? "—"}</td>
                <td className="px-4 py-2.5"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{r.action}</span></td>
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{r.target ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

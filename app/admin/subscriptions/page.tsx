import { createAdminClient } from "@/lib/supabase/server";
import { RefundButton } from "./RefundButton";

export const dynamic = "force-dynamic";

export default async function AdminSubscriptionsPage() {
  const admin = createAdminClient();
  const [{ data: subs }, { data: profiles }] = await Promise.all([
    admin.from("subscriptions").select("id,user_id,tier,status,gateway,gateway_customer_id,gateway_subscription_id,amount,current_period_end,updated_at").order("updated_at", { ascending: false }).limit(500),
    admin.from("profiles").select("id,email"),
  ]);
  const emailById = new Map<string, string>();
  for (const p of profiles ?? []) emailById.set(p.id, p.email ?? "");

  const rows = subs ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-gray-500">{rows.length} subscription row{rows.length === 1 ? "" : "s"}, synced via webhooks.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Email</th>
              <th className="px-4 py-2.5 font-medium">Tier</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Gateway</th>
              <th className="px-4 py-2.5 font-medium">Renews</th>
              <th className="px-4 py-2.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No subscriptions yet.</td></tr>
            )}
            {rows.map((s: any, i: number) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-4 py-2.5 text-gray-800">{emailById.get(s.user_id) ?? s.user_id}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.tier === "free" || !s.tier ? "bg-gray-100 text-gray-600" : "bg-emerald-100 text-emerald-700"}`}>
                    {s.tier ?? "free"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{s.status ?? "—"}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.gateway === "razorpay" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.gateway ?? "razorpay"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-500">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-2.5">
                  {s.status === "active" && (
                    <RefundButton subscriptionId={s.id} userId={s.user_id} gatewaySubId={s.gateway_subscription_id} gateway={s.gateway} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

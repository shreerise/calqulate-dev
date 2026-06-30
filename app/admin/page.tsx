import { createAdminClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/StatCard";
import { PLANS } from "@/lib/payment/types/index";

export const dynamic = "force-dynamic";

async function count(admin: any, table: string, build?: (q: any) => any): Promise<number> {
  let q = admin.from(table).select("*", { count: "exact", head: true });
  if (build) q = build(q);
  const { count } = await q;
  return count ?? 0;
}

export default async function AdminDashboard() {
  const admin = createAdminClient();
  const since7 = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [users, admins, newUsers, paidSubs, measurements, reports, riskResults, recent] = await Promise.all([
    count(admin, "profiles"),
    count(admin, "profiles", (q) => q.eq("role", "admin")),
    count(admin, "profiles", (q) => q.gte("created_at", since7)),
    count(admin, "subscriptions", (q) => q.in("status", ["active", "trialing"]).neq("tier", "free")),
    count(admin, "measurements"),
    count(admin, "reports"),
    count(admin, "risk_results"),
    admin.from("profiles").select("email,role,created_at").order("created_at", { ascending: false }).limit(8),
  ]);

  // ── Subscription analytics ────────────────────────────────────────────────
  const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();

  const { data: subs } = await admin
    .from("subscriptions")
    .select("tier,status,gateway")
    .in("status", ["active", "trialing"]);

  const planMonthly: Record<string, number> = Object.fromEntries(PLANS.map((p) => [p.tier, p.priceMonthly]));
  const activePaid = (subs ?? []).filter((s: any) => s.tier && s.tier !== "free");

  const mrr = activePaid.reduce((sum: number, s: any) => sum + (planMonthly[s.tier] ?? 0), 0);

  // Gateway breakdown
  const razorpayCount = activePaid.filter((s: any) => s.gateway === "razorpay" || !s.gateway).length;
  const paypalCount = activePaid.filter((s: any) => s.gateway === "paypal").length;

  // Plan distribution
  const proCount = activePaid.filter((s: any) => s.tier === "pro").length;

  // Churn (active → inactive in last 30 days)
  const { count: churned } = await admin
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "canceled")
    .gte("updated_at", since30);

  // Conversion rate
  const conversion = users > 0 ? ((activePaid.length / users) * 100).toFixed(1) : "0.0";

  const recentRows = recent.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500">Live numbers from your Supabase database.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={users} hint={`${admins} admin${admins === 1 ? "" : "s"}`} />
        <StatCard label="New (7 days)" value={newUsers} />
        <StatCard label="Active paid subs" value={activePaid.length} />
        <StatCard label="Est. MRR" value={`$${mrr.toFixed(2)}`} hint="active paid × monthly price" />
        <StatCard label="Conversions" value={`${conversion}%`} hint="paid / total users" />
        <StatCard label="Churned (30d)" value={churned ?? 0} hint="canceled in last 30 days" />
        <StatCard label="Est. ARR" value={`$${(mrr * 12).toFixed(0)}`} hint="MRR × 12" />
        <StatCard label="Total measurements" value={measurements} />
      </div>

      {/* Subscription breakdown */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Razorpay subs" value={razorpayCount} hint="active paid" />
        <StatCard label="PayPal subs" value={paypalCount} hint="active paid" />
        <StatCard label="Plus plan" value={plusCount} hint="active paid" />
        <StatCard label="Pro plan" value={proCount} hint="active paid" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-3 text-sm font-semibold text-gray-700">Newest users</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-2.5 font-medium">Email</th>
                <th className="px-5 py-2.5 font-medium">Role</th>
                <th className="px-5 py-2.5 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentRows.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-6 text-center text-gray-400">No users yet.</td></tr>
              )}
              {recentRows.map((u: any, i: number) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-5 py-2.5 text-gray-800">{u.email}</td>
                  <td className="px-5 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-gray-500">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live platform features & services */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-700">Live features &amp; services</h2>
        <div className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          {[
            "50+ free calculators + Trie/fuzzy search",
            "Calqulate Vitals: Metabolic Health Score + trajectory engine",
            "Longevity Index (0-1000) + biological age",
            "Future You Monte-Carlo simulator",
            "GLP-1 Autopilot protocol builder",
            "Heart Age + GLP-1 + Metabolic trackers",
            "Doctor-shareable PDF reports",
            "Weekly email digest + mobile push (PWA)",
            "AEO answer hub + standalone Q&A pages",
            "Ava on-site assistant",
            "USA units (lb/in) + metric",
            "Service landing pages + single pricing page",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Honest roadmap for modules that need data infrastructure you don't have yet. */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-700">Planned modules (need more data infrastructure)</h2>
        <p className="mt-1 text-sm text-gray-500">
          These are scaffolded for later — they require data we don&apos;t collect yet, so we haven&apos;t shipped fake dashboards:
        </p>
        <ul className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          <li>• <strong>Analytics (DAU/WAU/MAU, funnel, LTV)</strong> — needs an events table</li>
          <li>• <strong>Calculators (enable/disable, CTR)</strong> — needs a calculators table + page-view tracking</li>
          <li>• <strong>Content CMS &amp; Notifications broadcast</strong> — needs a content store + email queue</li>
          <li>• <strong>System metrics</strong> — needs host/DB monitoring hooks</li>
        </ul>
      </div>
    </div>
  );
}

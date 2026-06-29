import { createAdminClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/StatCard";
import { emailConfigured } from "@/lib/email/mailer";
import { pushConfigured } from "@/lib/push";

export const dynamic = "force-dynamic";

async function count(admin: any, table: string, build?: (q: any) => any): Promise<number> {
  let q = admin.from(table).select("*", { count: "exact", head: true });
  if (build) q = build(q);
  const { count } = await q;
  return count ?? 0;
}

export default async function AdminNotificationsPage() {
  const admin = createAdminClient();
  const [pushSubs, emailOptIn, pushOptIn] = await Promise.all([
    count(admin, "push_subscriptions"),
    count(admin, "notification_prefs", (q) => q.eq("email_weekly", true)),
    count(admin, "notification_prefs", (q) => q.eq("push_enabled", true)),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500">Weekly email + mobile push reach.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Push subscriptions" value={pushSubs} />
        <StatCard label="Weekly email opt-ins" value={emailOptIn} />
        <StatCard label="Push opt-ins" value={pushOptIn} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700">Configuration</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Email (SMTP krushal.barasiya@calqulate.net)</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${emailConfigured() ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{emailConfigured() ? "Configured" : "Not set"}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Web Push (VAPID)</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pushConfigured() ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{pushConfigured() ? "Configured" : "Not set"}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700">Send the weekly digest</h2>
          <p className="mt-2 text-sm text-gray-600">
            Point a weekly scheduler (Vercel Cron / cron-job.org / Supabase pg_cron) at:
          </p>
          <code className="mt-2 block break-all rounded-lg bg-gray-900 p-3 text-xs text-emerald-300">
            GET /api/cron/weekly-digest?secret=YOUR_CRON_SECRET
          </code>
          <p className="mt-2 text-xs text-gray-400">
            It emails active paid members (respecting opt-outs) and pushes a nudge to subscribers. To preview the
            template, use “Send me a test weekly email” in your dashboard settings.
          </p>
        </div>
      </div>
    </div>
  );
}

import { adminEmails } from "@/lib/admin";

export const dynamic = "force-dynamic";

function Status({ ok, label, note }: { ok: boolean; label: string; note?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {note && <div className="text-xs text-gray-400">{note}</div>}
      </div>
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
        {ok ? "Configured" : "Not set"}
      </span>
    </div>
  );
}

export default function AdminSettingsPage() {
  const env = process.env;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings &amp; configuration</h1>
        <p className="text-gray-500">Read-only health check of your environment. Set values in your host / .env.local.</p>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Supabase</h2>
        <div className="space-y-2">
          <Status ok={!!env.NEXT_PUBLIC_SUPABASE_URL} label="Project URL" note={env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https?:\/\//, "") ?? ""} />
          <Status ok={!!env.NEXT_PUBLIC_SUPABASE_ANON_KEY} label="Anon key (auth)" />
          <Status ok={!!env.SUPABASE_SERVICE_ROLE_KEY} label="Service-role key (admin + webhook)" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Stripe (payments)</h2>
        <div className="space-y-2">
          <Status ok={!!env.STRIPE_SECRET_KEY} label="Secret key" />
          <Status ok={!!env.STRIPE_WEBHOOK_SECRET} label="Webhook signing secret" />
          <Status ok={!!env.STRIPE_PRICE_PLUS_MONTHLY} label="Plus monthly price ID" />
          <Status ok={!!env.STRIPE_PRICE_PLUS_YEARLY} label="Plus yearly price ID" />
          <Status ok={!!env.STRIPE_PRICE_PRO_MONTHLY} label="Pro monthly price ID" />
          <Status ok={!!env.STRIPE_PRICE_PRO_YEARLY} label="Pro yearly price ID" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Security &amp; site</h2>
        <div className="space-y-2">
          <Status ok={!!env.NEXT_PUBLIC_SITE_URL} label="Site URL" note={env.NEXT_PUBLIC_SITE_URL ?? ""} />
          <Status ok={!!env.TURNSTILE_SECRET_KEY} label="Cloudflare Turnstile secret" note="anti-bot on signup/login" />
          <Status ok={!!env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} label="Turnstile site key" />
          <Status ok={adminEmails().length > 0} label="Admin email allowlist (ADMIN_EMAILS)" note={adminEmails().join(", ") || "using DB role only"} />
          <Status ok={!!env.SMTP_HOST} label="SMTP (email)" note={env.SMTP_HOST ?? ""} />
        </div>
      </section>

      <p className="text-xs text-gray-400">
        Editing these from the UI would mean writing secrets to the server at runtime — intentionally not supported.
        Change them in your hosting environment variables and redeploy.
      </p>
    </div>
  );
}

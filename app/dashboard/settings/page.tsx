import Link from "next/link";
import { SettingsPanel } from "@/components/vitals/SettingsPanel";
import { NotificationSettings } from "@/components/pwa/NotificationSettings";
import { SubscriptionStatus } from "@/components/payment/SubscriptionStatus";
import { getAccess } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const access = await getAccess();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings &amp; privacy</h1>
        <p className="text-gray-600">You own your data. Export or delete it any time.</p>
      </div>
      <SubscriptionStatus userId={access.userId!} />
      <NotificationSettings />
      <SettingsPanel />

      <p className="text-center text-xs text-gray-400">
        <Link href="/refund-policy" className="text-emerald-600 hover:underline font-medium">Refund Policy</Link>
        {" · "}
        <Link href="/terms-and-conditions" className="text-emerald-600 hover:underline font-medium">Terms</Link>
        {" · "}
        <Link href="/privacy-policy" className="text-emerald-600 hover:underline font-medium">Privacy</Link>
      </p>
    </div>
  );
}

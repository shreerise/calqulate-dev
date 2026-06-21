import { SettingsPanel } from "@/components/vitals/SettingsPanel";
import { NotificationSettings } from "@/components/pwa/NotificationSettings";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings &amp; privacy</h1>
        <p className="text-gray-600">You own your data. Export or delete it any time.</p>
      </div>
      <NotificationSettings />
      <SettingsPanel />
    </div>
  );
}

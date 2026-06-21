"use client";
import { useEffect, useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function NotificationSettings() {
  const [emailWeekly, setEmailWeekly] = useState(true);
  const [pushOn, setPushOn] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const pushSupported = typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && !!VAPID_PUBLIC;

  useEffect(() => {
    fetch("/api/notifications/prefs")
      .then((r) => r.json())
      .then((d) => { setEmailWeekly(d.email_weekly ?? true); setPushOn(d.push_enabled ?? false); })
      .catch(() => {});
  }, []);

  async function toggleEmail(next: boolean) {
    setEmailWeekly(next);
    await fetch("/api/notifications/prefs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email_weekly: next }) });
  }

  async function enablePush() {
    setBusy("push"); setMsg(null);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { setMsg("Notifications were blocked. Enable them in your browser/site settings."); return; }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC!),
      });
      const json = sub.toJSON();
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys }),
      });
      if (res.ok) { setPushOn(true); setMsg("✅ Mobile notifications enabled. You'll see 'Calqulate.net' on your device."); }
      else setMsg("Could not save your subscription. Try again.");
    } catch (e) {
      setMsg("Could not enable notifications: " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function sendTest() {
    setBusy("test"); setMsg(null);
    try {
      const res = await fetch("/api/notifications/test", { method: "POST" });
      const data = await res.json();
      setMsg(res.ok ? `✅ Test email sent to ${data.sentTo}.` : `❌ ${data.error}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="flex items-center gap-2 font-semibold"><Bell className="h-4 w-4 text-emerald-600" /> Notifications &amp; updates</h2>
      <p className="mt-1 text-sm text-gray-600">Stay on your trajectory with a weekly recap and optional mobile alerts.</p>

      {/* Weekly email */}
      <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4">
        <div className="flex gap-3">
          <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-800">Weekly progress email</div>
            <div className="text-xs text-gray-500">A week-on-week recap of your score, risks and next lever — from support@calqulate.net.</div>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" checked={emailWeekly} onChange={(e) => toggleEmail(e.target.checked)} className="peer sr-only" />
          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-5" />
        </label>
      </div>

      {/* Push */}
      <div className="mt-3 flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4">
        <div className="flex gap-3">
          <Smartphone className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-800">Mobile notifications</div>
            <div className="text-xs text-gray-500">
              {pushSupported
                ? pushOn ? "Enabled — alerts show as “Calqulate.net” on your device." : "Get nudges and your weekly score on your phone. Add the app to your home screen for best results."
                : "Push isn't configured yet (needs VAPID keys) or your browser doesn't support it."}
            </div>
          </div>
        </div>
        <button
          onClick={enablePush}
          disabled={!pushSupported || pushOn || busy === "push"}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {pushOn ? "Enabled" : busy === "push" ? "Enabling…" : "Enable"}
        </button>
      </div>

      <button onClick={sendTest} disabled={busy === "test"} className="mt-4 text-sm font-medium text-emerald-700 hover:text-emerald-800 disabled:opacity-50">
        {busy === "test" ? "Sending…" : "Send me a test weekly email"}
      </button>
      {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
    </section>
  );
}

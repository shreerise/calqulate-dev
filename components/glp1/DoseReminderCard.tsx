"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff, Loader2, Check, AlertCircle, Smartphone } from "lucide-react";
import { createRecord, updateRecord, ApiError } from "@/lib/glp1/client";

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const LEAD_OPTIONS = [
  { value: 0, label: "At dose time" },
  { value: 30, label: "30 min before" },
  { value: 120, label: "2 hours before" },
  { value: 1440, label: "1 day before" },
];

type Channel = "web-push" | "email";

export interface DoseReminderCardProps {
  medication: { id: string; name: string } | null;
  reminder: { id: string; enabled: boolean; leadMinutes: number; channel: Channel[] } | null;
  nextDoseLabel: string | null;
  pushEnabled: boolean;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function DoseReminderCard({ medication, reminder, nextDoseLabel, pushEnabled }: DoseReminderCardProps) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(reminder?.enabled ?? false);
  const [leadMinutes, setLeadMinutes] = useState(reminder?.leadMinutes ?? 0);
  const [channels, setChannels] = useState<Channel[]>(reminder?.channel ?? ["web-push"]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const pushSupported =
    typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && !!VAPID_PUBLIC;

  if (!medication) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
        Add a medication to set up dose reminders.
      </div>
    );
  }

  async function persist(next: { enabled: boolean; leadMinutes: number; channel: Channel[] }) {
    setBusy(true);
    setMsg(null);
    try {
      if (reminder) {
        await updateRecord("reminder", reminder.id, next);
      } else {
        await createRecord("reminder", {
          kind: "dose",
          medicationId: medication!.id,
          schedule: "auto",
          ...next,
        });
      }
      setMsg({ kind: "ok", text: "Reminder saved" });
      router.refresh();
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof ApiError ? e.message : "Could not save reminder." });
    } finally {
      setBusy(false);
    }
  }

  function toggleChannel(c: Channel) {
    const next = channels.includes(c) ? channels.filter((x) => x !== c) : [...channels, c];
    if (next.length === 0) return; // keep at least one
    setChannels(next);
    if (enabled) persist({ enabled, leadMinutes, channel: next });
  }

  async function enablePush() {
    setBusy(true);
    setMsg(null);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setMsg({ kind: "err", text: "Notifications were blocked. Enable them in your browser settings." });
        return;
      }
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
      if (res.ok) {
        setMsg({ kind: "ok", text: "Mobile notifications enabled." });
        router.refresh();
      } else {
        setMsg({ kind: "err", text: "Could not save your subscription." });
      }
    } catch (e) {
      setMsg({ kind: "err", text: "Could not enable notifications: " + (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="text-emerald-600">{enabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}</span>
          <div>
            <div className="text-sm font-semibold text-gray-900">Dose reminders</div>
            <div className="text-xs text-gray-500">
              {nextDoseLabel ? <>Next {medication.name} dose {nextDoseLabel}.</> : <>Get a nudge when your {medication.name} dose is due.</>}
            </div>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={enabled}
            disabled={busy}
            onChange={(e) => {
              const next = e.target.checked;
              setEnabled(next);
              persist({ enabled: next, leadMinutes, channel: channels });
            }}
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-5" />
        </label>
      </div>

      {enabled && (
        <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Remind me</span>
            <select
              value={leadMinutes}
              disabled={busy}
              onChange={(e) => {
                const v = Number(e.target.value);
                setLeadMinutes(v);
                persist({ enabled, leadMinutes: v, channel: channels });
              }}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              {LEAD_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-gray-500">Via</span>
            {(["web-push", "email"] as Channel[]).map((c) => (
              <label key={c} className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                <input type="checkbox" checked={channels.includes(c)} disabled={busy} onChange={() => toggleChannel(c)}
                  className="h-4 w-4 accent-emerald-600" />
                {c === "web-push" ? "Push" : "Email"}
              </label>
            ))}
          </div>

          {channels.includes("web-push") && !pushEnabled && pushSupported && (
            <button onClick={enablePush} disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
              <Smartphone className="h-4 w-4" /> Enable mobile notifications
            </button>
          )}
        </div>
      )}

      {busy && <p className="mt-3 inline-flex items-center gap-1 text-xs text-gray-500"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</p>}
      {!busy && msg && (
        <p className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${msg.kind === "ok" ? "text-emerald-600" : "text-red-600"}`}>
          {msg.kind === "ok" ? <Check className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />} {msg.text}
        </p>
      )}
    </div>
  );
}

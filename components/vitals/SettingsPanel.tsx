"use client";
import { useState } from "react";

export function SettingsPanel() {
  const [busy, setBusy] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  function exportData() {
    window.location.href = "/api/account/export";
  }

  async function deleteAccount() {
    if (confirmText !== "DELETE") return;
    setBusy(true);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (res.ok) window.location.href = "/?deleted=1";
      else alert("Could not delete account. Please contact support.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="font-semibold">Export your data</h2>
        <p className="mt-1 text-sm text-gray-600">Download everything we store about you as a JSON file.</p>
        <button onClick={exportData} className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Download my data
        </button>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
        <h2 className="font-semibold text-red-700">Delete account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Permanently erases your profile, measurements, and history. This cannot be undone.
          Type <span className="font-mono font-semibold">DELETE</span> to confirm.
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="mt-3 w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="DELETE"
        />
        <div>
          <button
            onClick={deleteAccount}
            disabled={busy || confirmText !== "DELETE"}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? "Deleting…" : "Permanently delete my account"}
          </button>
        </div>
      </section>
    </div>
  );
}

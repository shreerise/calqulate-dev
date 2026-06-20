"use client";
import { useState } from "react";

export function DownloadReportButton({ enabled }: { enabled: boolean }) {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const res = await fetch("/api/vitals/report");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Could not generate report.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calqulate-vitals-report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={download}
      disabled={busy || !enabled}
      title={enabled ? "" : "Upgrade to Vitals Pro to download PDF reports"}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
    >
      {busy ? "Generating…" : "Download doctor PDF"}
    </button>
  );
}

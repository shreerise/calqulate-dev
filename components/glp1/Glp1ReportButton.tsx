"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";

/** Downloads the doctor-shareable GLP-1 progress PDF. */
export function Glp1ReportButton({ enabled }: { enabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function download() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/glp1/report");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(data.error ?? "Could not generate report.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calqulate-glp1-report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={download}
        disabled={busy || !enabled}
        title={enabled ? "" : "Available with Calqulate Vitals"}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        {busy ? "Generating…" : "Doctor PDF"}
      </button>
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}

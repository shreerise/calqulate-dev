// components/plans/SemaglutideGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  titrationSchedule,
  wegovyVsOzempic,
  compoundingDoses,
  storageRules,
  references,
} from "@/lib/blog/semaglutide-dosage-data";

/**
 * Generates a free, printable Semaglutide Dosage & Titration guide as a PDF.
 * Client-side jsPDF — no server, nothing leaves the browser.
 */
export default function SemaglutideGuidePdfButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 60;

      const pageBreak = (limit = 760) => {
        if (y > limit) {
          doc.addPage();
          y = 60;
        }
      };

      // ── Cover heading ─────────────────────────────────
      doc.setFillColor(16, 185, 129); // emerald-500 brand green
      doc.rect(0, 0, pageWidth, 120, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Semaglutide Dosage & Titration Guide", margin, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Wegovy & Ozempic schedule, comparison, and storage", margin, 88);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── Titration schedule ───────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Official Titration Schedule (Wegovy)", margin, y);
      y += 22;
      doc.setFontSize(11);
      titrationSchedule.forEach((s) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${s.phase}  |  ${s.weeks}  |  ${s.doseMg} mg/week`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(`  ${s.purpose}`, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 8;
      });

      // ── Wegovy vs Ozempic ────────────────────────────
      pageBreak(660);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Wegovy vs Ozempic", margin, y);
      y += 22;
      doc.setFontSize(10);
      wegovyVsOzempic.forEach((r) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(r.feature, margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const w = doc.splitTextToSize(`  Wegovy: ${r.wegovy}`, pageWidth - margin * 2);
        doc.text(w, margin, y);
        y += w.length * 12;
        const o = doc.splitTextToSize(`  Ozempic: ${r.ozempic}`, pageWidth - margin * 2);
        doc.text(o, margin, y);
        doc.setTextColor(15, 23, 42);
        y += o.length * 12 + 8;
      });

      // ── Compounding math ─────────────────────────────
      pageBreak(640);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Compounding Math (5 mg/mL vial)", margin, y);
      y += 16;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("1 insulin-syringe unit = 0.01 mL. Verify all math with your pharmacy.", margin, y);
      doc.setTextColor(15, 23, 42);
      y += 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      compoundingDoses.forEach((c) => {
        pageBreak();
        doc.text(
          `${c.doseMg} mg  ->  draw ${c.volumeMl} mL  (${c.units} units)`,
          margin,
          y
        );
        y += 16;
      });

      // ── Storage ──────────────────────────────────────
      pageBreak(620);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Storage Rules That Matter", margin, y);
      y += 22;
      doc.setFontSize(11);
      storageRules.forEach((s) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`* ${s.product} (${s.state})`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(s.rule, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 8;
      });

      // ── References ───────────────────────────────────
      pageBreak(620);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("References & Sources", margin, y);
      y += 20;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      references.forEach((r) => {
        pageBreak();
        doc.setTextColor(15, 23, 42);
        const lines = doc.splitTextToSize(
          `- ${r.label} (${r.publisher}): ${r.url}`,
          pageWidth - margin * 2
        );
        doc.text(lines, margin, y);
        y += lines.length * 12 + 4;
      });

      // ── Disclaimer footer ────────────────────────────
      pageBreak(740);
      y += 10;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      const disc = doc.splitTextToSize(
        "For educational purposes only — not medical advice. Prescription decisions, dose adjustments, and compounded products must be managed by a licensed healthcare provider. Calqulate.net",
        pageWidth - margin * 2
      );
      doc.text(disc, margin, y);

      doc.save("semaglutide-dosage-guide-calqulate.pdf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Building your guide…
        </>
      ) : (
        <>📄 Download Free Semaglutide Dosage Guide (PDF)</>
      )}
    </button>
  );
}

// components/plans/MensBodyShapeGuidePdfButton.tsx
"use client";

import { useState } from "react";
import { maleShapes, measureSteps } from "@/lib/blog/male-body-shape-data";

/**
 * Generates a free printable men's body shape guide as a PDF.
 * Client-side jsPDF. No server, nothing leaves the browser.
 */
export default function MensBodyShapeGuidePdfButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 60;

      const ensure = (limit: number) => {
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
      doc.setFontSize(24);
      doc.text("Men's Body Shape Guide", margin, 65);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("The five shapes, how to measure, style & training", margin, 92);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── How to measure ────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("How to Measure (4 steps)", margin, y);
      y += 22;
      doc.setFontSize(11);
      measureSteps.forEach((s, i) => {
        ensure(770);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${i + 1}. ${s.part}`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(s.how, pageWidth - margin * 2);
        doc.text(lines, margin + 12, y);
        y += lines.length * 13 + 8;
      });

      // ── The five shapes ───────────────────────────────
      ensure(640);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("The Five Male Body Shapes", margin, y);
      y += 22;

      maleShapes.forEach((s) => {
        ensure(700);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text(`${s.name} — ${s.tagline}`, margin, y);
        y += 15;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(71, 85, 105);
        const spot = doc.splitTextToSize(`How to spot it: ${s.rule}`, pageWidth - margin * 2);
        doc.text(spot, margin, y);
        y += spot.length * 13 + 4;

        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text("Dress it:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        s.styleTips.forEach((t) => {
          ensure(780);
          const l = doc.splitTextToSize(`  - ${t}`, pageWidth - margin * 2);
          doc.text(l, margin, y);
          y += l.length * 13;
        });

        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text("Train it:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        s.trainingTips.forEach((t) => {
          ensure(780);
          const l = doc.splitTextToSize(`  - ${t}`, pageWidth - margin * 2);
          doc.text(l, margin, y);
          y += l.length * 13;
        });
        y += 12;
      });

      // ── Footer ────────────────────────────────────────
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Calqulate.net — free, science-backed body & health tools",
        margin,
        820
      );

      doc.save("mens-body-shape-guide-calqulate.pdf");
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
        <>📄 Download Free Men's Body Shape Guide (PDF)</>
      )}
    </button>
  );
}

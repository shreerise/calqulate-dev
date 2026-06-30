// components/plans/MuscleGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  muscleLossStudies,
  proteinTargets,
  warningSigns,
  scaleVsTruth,
  references,
} from "@/lib/blog/ozempic-muscle-loss-data";

/**
 * Generates a free, printable "Protect Your Muscle on Ozempic" guide as a PDF.
 * Client-side jsPDF — no server, nothing leaves the browser.
 */
export default function MuscleGuidePdfButton() {
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
      doc.text("Protect Your Muscle on Ozempic", margin, 58);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        "How to lose fat, not muscle, and avoid the \"skinny fat\" trap",
        margin,
        86
      );

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── Why the scale lies ───────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Why the Bathroom Scale Is Lying to You", margin, y);
      y += 22;
      doc.setFontSize(10);
      scaleVsTruth.forEach((r) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(r.metric, margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const s = doc.splitTextToSize(`  Scale: ${r.scale}`, pageWidth - margin * 2);
        doc.text(s, margin, y);
        y += s.length * 12;
        const t = doc.splitTextToSize(
          `  Body composition: ${r.truth}`,
          pageWidth - margin * 2
        );
        doc.text(t, margin, y);
        doc.setTextColor(15, 23, 42);
        y += t.length * 12 + 8;
      });

      // ── Muscle loss by study ─────────────────────────
      pageBreak(640);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("How Much Muscle You Can Lose", margin, y);
      y += 22;
      doc.setFontSize(10);
      muscleLossStudies.forEach((s) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${s.study}  —  ${s.leanShare}`, margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(`  ${s.detail}`, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 12 + 8;
      });

      // ── Protein targets ──────────────────────────────
      pageBreak(640);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Daily Protein Target (Protect Your Muscle)", margin, y);
      y += 16;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(
        "Roughly 0.7-1.0 g of protein per pound of body weight per day, split across meals.",
        margin,
        y
      );
      doc.setTextColor(15, 23, 42);
      y += 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      proteinTargets.forEach((p) => {
        pageBreak();
        doc.text(
          `${p.bodyWeightLbs} lbs  ->  aim for ${p.gramsLow}-${p.gramsHigh} g protein/day`,
          margin,
          y
        );
        y += 16;
      });

      // ── The fears + fixes ────────────────────────────
      pageBreak(600);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("The Fears (and the Simple Fix)", margin, y);
      y += 22;
      doc.setFontSize(11);
      warningSigns.forEach((w) => {
        pageBreak();
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`* ${w.fear}`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const cause = doc.splitTextToSize(
          `  Why: ${w.cause}`,
          pageWidth - margin * 2
        );
        doc.text(cause, margin, y);
        y += cause.length * 13;
        const fix = doc.splitTextToSize(`  Fix: ${w.fix}`, pageWidth - margin * 2);
        doc.text(fix, margin, y);
        doc.setTextColor(15, 23, 42);
        y += fix.length * 13 + 8;
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
        "For educational purposes only — not medical advice. Dose, nutrition, and exercise changes while on a GLP-1 medication must be managed with a licensed healthcare provider. Calqulate.net",
        pageWidth - margin * 2
      );
      doc.text(disc, margin, y);

      doc.save("ozempic-muscle-protection-guide-calqulate.pdf");
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
        <>📄 Download Free Muscle-Protection Guide (PDF)</>
      )}
    </button>
  );
}

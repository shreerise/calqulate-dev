// components/plans/RmrGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  rmrEquations,
  activityLevels,
  rmrFactors,
  rmrHabits,
  rmrMyths,
} from "@/lib/blog/rmr-data";

/**
 * Generates a free Resting Metabolic Rate guide as a PDF.
 * Client-side jsPDF — no server, nothing leaves the browser.
 */
export default function RmrGuidePdfButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 60;

      // ── Cover heading ─────────────────────────────────
      doc.setFillColor(16, 185, 129); // emerald-500 (brand green)
      doc.rect(0, 0, pageWidth, 120, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("RMR & BMR Calculation Guide", margin, 65);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Every formula, factor, and habit in one PDF", margin, 92);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── Equations ─────────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("The Four Major RMR Equations", margin, y);
      y += 24;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      rmrEquations.forEach((e) => {
        if (y > 720) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${e.name}  •  Accuracy ${e.accuracy}/100`, margin, y);
        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`Male:  ${e.formulaMale}`, margin, y);
        y += 13;
        doc.text(`Female: ${e.formulaFemale}`, margin, y);
        y += 13;
        const bestForLines = doc.splitTextToSize(
          `Best for: ${e.bestFor}`,
          pageWidth - margin * 2
        );
        doc.text(bestForLines, margin, y);
        y += bestForLines.length * 13 + 14;
      });

      // ── Activity multipliers ──────────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("TDEE Activity Multipliers", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      activityLevels.forEach((a) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`• ${a.label}  (×${a.multiplier})`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`— ${a.description}`, margin + 170, y);
        doc.setTextColor(15, 23, 42);
        y += 16;
      });

      // ── Factors that affect RMR ───────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("What Affects Your RMR", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      rmrFactors.forEach((f) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`${f.name}  (${f.impact} impact)`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(f.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 10;
      });

      // ── Habits that help / hurt ───────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Habits That Boost or Drop RMR", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      rmrHabits.forEach((h) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        const isLove = h.verdict === "love";
        if (isLove) {
          doc.setTextColor(16, 185, 129);
        } else {
          doc.setTextColor(220, 38, 38);
        }
        doc.setFont("helvetica", "bold");
        doc.text(isLove ? "+" : "x", margin, y);
        doc.setTextColor(15, 23, 42);
        doc.text(`${h.name}`, margin + 16, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(
          `— ${h.note}`,
          pageWidth - margin * 2 - 200
        );
        doc.text(lines, margin + 200, y);
        doc.setTextColor(15, 23, 42);
        y += Math.max(16, lines.length * 13 + 2);
      });

      // ── Myths ─────────────────────────────────────────
      if (y > 700) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(220, 38, 38);
      doc.text("Common RMR Myths to Ignore", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      rmrMyths.forEach((m) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        const lines = doc.splitTextToSize(`• ${m}`, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 14;
      });

      // ── Footer ────────────────────────────────────────
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text("Calqulate.net — your free health & body calculators", margin, 820);

      doc.save("rmr-bmr-guide-calqulate.pdf");
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
        <>📄 Download Free RMR &amp; BMR Guide (PDF)</>
      )}
    </button>
  );
}

// components/plans/BmrTdeeGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  bmrFormulas,
  activityLevels,
  energyComponents,
  calorieGoals,
} from "@/lib/blog/bmr-tdee-data";

/**
 * Generates a free printable BMR & TDEE cheat sheet as a PDF.
 * Client-side jsPDF. No server, nothing leaves the browser.
 */
export default function BmrTdeeGuidePdfButton() {
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
      doc.text("BMR vs TDEE Cheat Sheet", margin, 65);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Formulas, activity multipliers, and calorie zones", margin, 92);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── The core idea ─────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("The Core Idea", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text("BMR = calories burned at complete rest (your floor).", margin, y);
      y += 16;
      doc.text("TDEE = BMR x activity multiplier (your real daily burn).", margin, y);
      y += 16;
      doc.text("Plan meals around TDEE. Never eat below BMR.", margin, y);
      y += 26;
      doc.setTextColor(15, 23, 42);

      // ── Activity multipliers ──────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Activity Multipliers (TDEE)", margin, y);
      y += 22;
      doc.setFontSize(11);
      activityLevels.forEach((a) => {
        ensure(770);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`x${a.multiplier}  ${a.name}`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`TDEE if BMR 1500 = ${a.exampleTdee} kcal`, margin + 220, y);
        y += 14;
        const lines = doc.splitTextToSize(a.fits, pageWidth - margin * 2);
        doc.text(lines, margin + 12, y);
        y += lines.length * 13 + 6;
      });

      // ── Calorie goal zones ────────────────────────────
      ensure(660);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Calorie Goal Zones (from TDEE)", margin, y);
      y += 22;
      doc.setFontSize(11);
      calorieGoals.forEach((g) => {
        ensure(770);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${g.label}  (${g.rule})`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(g.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 8;
      });

      // ── Energy components ─────────────────────────────
      ensure(660);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Where TDEE Goes", margin, y);
      y += 22;
      doc.setFontSize(11);
      energyComponents.forEach((c) => {
        ensure(770);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${c.short} (${c.percent}%) - ${c.name}`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(c.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 8;
      });

      // ── Formulas ──────────────────────────────────────
      ensure(620);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("BMR Formulas", margin, y);
      y += 22;
      doc.setFontSize(11);
      bmrFormulas.forEach((f) => {
        ensure(760);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${f.name} (${f.year})`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const men = doc.splitTextToSize(`Men: ${f.men}`, pageWidth - margin * 2);
        doc.text(men, margin + 12, y);
        y += men.length * 13;
        if (f.id !== "katch") {
          const women = doc.splitTextToSize(`Women: ${f.women}`, pageWidth - margin * 2);
          doc.text(women, margin + 12, y);
          y += women.length * 13;
        }
        y += 8;
      });

      // ── Footer ────────────────────────────────────────
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Calqulate.net — free, science-backed health calculators",
        margin,
        820
      );

      doc.save("bmr-vs-tdee-cheat-sheet-calqulate.pdf");
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
          Building your cheat sheet…
        </>
      ) : (
        <>📄 Download Free BMR &amp; TDEE Cheat Sheet (PDF)</>
      )}
    </button>
  );
}

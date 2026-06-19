// components/plans/IdealWeightGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  heightWeightChart,
  ibwFormulas,
  ageBands,
  bmiCategories,
} from "@/lib/blog/ideal-weight-data";

/**
 * Generates a free printable Ideal Weight Chart as a PDF.
 * Client-side jsPDF. No server, nothing leaves the browser.
 */
export default function IdealWeightGuidePdfButton() {
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
      doc.text("Ideal Weight Chart by Height & Age", margin, 65);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Women & men, with healthy ranges, in one PDF", margin, 92);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── The height x weight table ─────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Height vs Weight (Devine ideal + healthy range)", margin, y);
      y += 22;

      // table header
      const col = { h: margin, w: margin + 120, m: margin + 250, r: margin + 380 };
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text("Height", col.h, y);
      doc.text("Women ideal", col.w, y);
      doc.text("Men ideal", col.m, y);
      doc.text("Healthy (lb)", col.r, y);
      y += 6;
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;
      doc.setTextColor(15, 23, 42);

      heightWeightChart.forEach((row) => {
        ensure(780);
        doc.setFont("helvetica", "normal");
        doc.text(`${row.ftIn}  (${row.cm} cm)`, col.h, y);
        doc.text(`${row.womenIdealLb} lb`, col.w, y);
        doc.text(`${row.menIdealLb} lb`, col.m, y);
        doc.text(`${row.healthyLb}`, col.r, y);
        y += 15;
      });

      // ── Formulas ──────────────────────────────────────
      ensure(640);
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("The Formulas", margin, y);
      y += 22;
      doc.setFontSize(11);
      ibwFormulas.forEach((f) => {
        ensure(760);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${f.name} (${f.year})`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`Men: ${f.men}`, margin + 12, y);
        y += 13;
        doc.text(`Women: ${f.women}`, margin + 12, y);
        y += 16;
      });

      // ── Age bands ─────────────────────────────────────
      ensure(640);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Age Context", margin, y);
      y += 22;
      doc.setFontSize(11);
      ageBands.forEach((a) => {
        ensure(760);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${a.range}  -  ${a.title}  (${a.bmiTarget})`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(a.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 8;
      });

      // ── BMI categories ────────────────────────────────
      ensure(680);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("BMI Categories", margin, y);
      y += 22;
      doc.setFontSize(11);
      bmiCategories.forEach((c) => {
        ensure(780);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${c.label}  (BMI ${c.range})`, margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(c.meaning, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 8;
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

      doc.save("ideal-weight-chart-calqulate.pdf");
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
          Building your chart…
        </>
      ) : (
        <>📄 Download Free Ideal Weight Chart (PDF)</>
      )}
    </button>
  );
}

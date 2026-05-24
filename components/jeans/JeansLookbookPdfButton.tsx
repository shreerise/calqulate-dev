// components/jeans/JeansLookbookPdfButton.tsx
"use client";

import { useState } from "react";
import {
  bodyShapeGuides,
  jeansStyles,
  jeansCards,
} from "@/lib/blog/jeans-fit-data";

/**
 * Generates a personalized Jeans Fit Lookbook as a PDF.
 *
 * Bug-fixed vs the previous blog's PDF button:
 *   - No `disabled:opacity-X` Tailwind class (was causing the dim/dead-button look).
 *   - Real try/catch/finally with error surfaced to the user.
 *   - Loading state always resets even if jsPDF import fails.
 *   - Button stays fully clickable and styled even while loading.
 */
export default function JeansLookbookPdfButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      let y = 60;

      // Helper: ensure a new page if `y` would overflow.
      const ensureRoom = (needed: number) => {
        if (y + needed > pageHeight - 60) {
          doc.addPage();
          y = 60;
        }
      };

      // ── Cover heading ─────────────────────────────────
      doc.setFillColor(5, 150, 105); // emerald-600 (brand green)
      doc.rect(0, 0, pageWidth, 130, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("Jeans Fit Lookbook", margin, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Your complete denim fit guide for men & women", margin, 95);
      doc.setFontSize(10);
      doc.text("Best jeans for your body shape • 2026 edition", margin, 115);

      y = 170;
      doc.setTextColor(15, 23, 42);

      // ── Section: Body shape guides ────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(5, 150, 105);
      doc.text("Body Shape Fit Guide", margin, y);
      y += 24;
      doc.setTextColor(15, 23, 42);

      for (const guide of bodyShapeGuides) {
        ensureRoom(80);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(
          `${guide.label} (${guide.gender === "women" ? "Women" : "Men"})`,
          margin,
          y,
        );
        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const descLines = doc.splitTextToSize(guide.description, pageWidth - margin * 2);
        doc.text(descLines, margin, y);
        y += descLines.length * 12 + 4;

        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("Best jeans:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.recommendedJeans) {
          ensureRoom(15);
          const itemLines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(itemLines, margin + 12, y);
          y += itemLines.length * 12;
        }

        doc.setTextColor(220, 38, 38);
        doc.setFont("helvetica", "bold");
        ensureRoom(20);
        doc.text("Avoid:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.avoid) {
          ensureRoom(15);
          const itemLines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(itemLines, margin + 12, y);
          y += itemLines.length * 12;
        }
        y += 14;
      }

      // ── Section: Jeans styles ─────────────────────────
      doc.addPage();
      y = 60;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(5, 150, 105);
      doc.text("Jeans Styles at a Glance", margin, y);
      y += 24;
      doc.setTextColor(15, 23, 42);

      for (const style of jeansStyles) {
        ensureRoom(50);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(style.name, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(
          `Best for: ${style.bestFor}  •  Shapes: ${style.bodyShapes}`,
          pageWidth - margin * 2,
        );
        doc.text(lines, margin, y);
        y += lines.length * 12 + 2;
        doc.setTextColor(15, 23, 42);
        const tipLines = doc.splitTextToSize(`Tip: ${style.styleTip}`, pageWidth - margin * 2);
        doc.text(tipLines, margin, y);
        y += tipLines.length * 12 + 10;
      }

      // ── Section: Top recommended jeans ────────────────
      doc.addPage();
      y = 60;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(5, 150, 105);
      doc.text("Top 13 Jeans Worth Trying", margin, y);
      y += 24;
      doc.setTextColor(15, 23, 42);

      for (const card of jeansCards) {
        ensureRoom(60);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(card.name, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const whyLines = doc.splitTextToSize(card.whyItWorks, pageWidth - margin * 2);
        doc.text(whyLines, margin, y);
        y += whyLines.length * 12 + 2;
        doc.setTextColor(15, 23, 42);
        const tipLines = doc.splitTextToSize(`Style tip: ${card.styleTip}`, pageWidth - margin * 2);
        doc.text(tipLines, margin, y);
        y += tipLines.length * 12 + 12;
      }

      // ── Footer note on the last page ──────────────────
      ensureRoom(40);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Generated for personal use • Best jeans for your body shape — fit guide for men and women.",
        margin,
        pageHeight - 40,
      );

      doc.save("jeans-fit-lookbook.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Sorry — couldn't generate the PDF. Please try again.");
    } finally {
      // Always reset loading so the button never gets stuck dim/disabled.
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleDownload}
        aria-busy={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
            <span>Building your lookbook…</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Jeans Fit Lookbook (PDF)</span>
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

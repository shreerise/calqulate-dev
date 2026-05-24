// components/face-shape/FaceShapeLookbookPdfButton.tsx
"use client";

import { useState } from "react";
import { faceShapeGuides } from "@/lib/blog/face-shape-data";

/**
 * Face Shape Lookbook PDF Button
 *
 * Bug-free vs the original pear-shape PDF button:
 *   - No `disabled:opacity-X` class (was leaving button looking dead)
 *   - Real try/catch/finally so `loading` always resets
 *   - Inline error display for the user
 */
export default function FaceShapeLookbookPdfButton() {
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

      const ensureRoom = (needed: number) => {
        if (y + needed > pageHeight - 60) {
          doc.addPage();
          y = 60;
        }
      };

      // ── Cover ─────────────────────────────────────────
      doc.setFillColor(5, 150, 105); // emerald-600
      doc.rect(0, 0, pageWidth, 130, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("Face Shape Lookbook", margin, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Your complete styling guide for every face shape", margin, 95);
      doc.setFontSize(10);
      doc.text("Glasses • Hairstyles • Beard styles • 2026 edition", margin, 115);

      y = 170;
      doc.setTextColor(15, 23, 42);

      // ── Per-shape section ─────────────────────────────
      for (const guide of faceShapeGuides) {
        ensureRoom(80);

        // Shape title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(5, 150, 105);
        doc.text(guide.label, margin, y);
        y += 18;

        // Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const descLines = doc.splitTextToSize(guide.shortDescription, pageWidth - margin * 2);
        doc.text(descLines, margin, y);
        y += descLines.length * 12 + 6;

        // How to identify
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text("How to identify:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const idLines = doc.splitTextToSize(guide.howToIdentify, pageWidth - margin * 2);
        doc.text(idLines, margin, y);
        y += idLines.length * 12 + 6;

        // Best glasses
        ensureRoom(40);
        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("Best glasses:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.bestGlasses) {
          ensureRoom(15);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 4;

        // Best hairstyles
        ensureRoom(40);
        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("Best hairstyles:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.bestHairstyles) {
          ensureRoom(15);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 4;

        // Best beard
        ensureRoom(40);
        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("Best beard styles:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.bestBeard) {
          ensureRoom(15);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 4;

        // Common mistake
        ensureRoom(40);
        doc.setTextColor(220, 38, 38);
        doc.setFont("helvetica", "bold");
        doc.text("Common mistake:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        const mistakeLines = doc.splitTextToSize(guide.commonMistake, pageWidth - margin * 2);
        doc.text(mistakeLines, margin, y);
        y += mistakeLines.length * 12 + 6;

        // Style tip
        ensureRoom(40);
        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("Style tip:", margin, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        const tipLines = doc.splitTextToSize(guide.styleTip, pageWidth - margin * 2);
        doc.text(tipLines, margin, y);
        y += tipLines.length * 12 + 18;
      }

      // ── Footer ────────────────────────────────────────
      ensureRoom(40);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Generated for personal use • Find your face shape — Calqulate styling guide.",
        margin,
        pageHeight - 40,
      );

      doc.save("face-shape-lookbook.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Sorry — couldn't generate the PDF. Please try again.");
    } finally {
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
            <span>Download Face Shape Lookbook (PDF)</span>
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

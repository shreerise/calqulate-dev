"use client";
import { useState } from "react";
import { haircutGuides } from "../../lib/blog/haircut-face-shape-data";

export default function HaircutLookbookPdfButton() {
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
      doc.rect(0, 0, pageWidth, 140, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("Haircut Lookbook 2026", margin, 72);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Best haircuts for your face shape — women & men", margin, 96);
      doc.setFontSize(10);
      doc.text("Calqulate.net · calqulate.net/hair/best-haircut-face-shape-2026-trends", margin, 116);
      doc.text(
        "Bring this to your salon or barber appointment for a clear visual reference.",
        margin,
        132
      );

      y = 184;
      doc.setTextColor(15, 23, 42);

      // ── Per-shape sections ────────────────────────────
      for (const guide of haircutGuides) {
        ensureRoom(90);

        // Shape title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(5, 150, 105);
        doc.text(guide.label, margin, y);
        y += 20;

        // Styling objective
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const objLines = doc.splitTextToSize(
          `Objective: ${guide.stylingObjective}`,
          pageWidth - margin * 2
        );
        doc.text(objLines, margin, y);
        y += objLines.length * 13 + 4;

        // How to identify
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        const idLines = doc.splitTextToSize(
          `Identify: ${guide.howToIdentify}`,
          pageWidth - margin * 2
        );
        doc.text(idLines, margin, y);
        y += idLines.length * 13 + 8;

        // Women
        ensureRoom(50);
        doc.setTextColor(157, 23, 77);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Women — " + guide.women.headline, margin, y);
        y += 14;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        const wDesc = doc.splitTextToSize(guide.women.description, pageWidth - margin * 2);
        doc.text(wDesc.slice(0, 3), margin, y);
        y += Math.min(wDesc.length, 3) * 12 + 4;

        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("✓ Works well:", margin, y);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.women.works.slice(0, 4)) {
          ensureRoom(14);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 4;

        doc.setTextColor(185, 28, 28);
        doc.setFont("helvetica", "bold");
        doc.text("✗ Avoid:", margin, y);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.women.avoid.slice(0, 3)) {
          ensureRoom(14);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 8;

        // Men
        ensureRoom(50);
        doc.setTextColor(29, 78, 216);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Men — " + guide.men.headline, margin, y);
        y += 14;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        const mDesc = doc.splitTextToSize(guide.men.description, pageWidth - margin * 2);
        doc.text(mDesc.slice(0, 3), margin, y);
        y += Math.min(mDesc.length, 3) * 12 + 4;

        doc.setTextColor(5, 150, 105);
        doc.setFont("helvetica", "bold");
        doc.text("✓ Works well:", margin, y);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        for (const item of guide.men.works.slice(0, 4)) {
          ensureRoom(14);
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 12);
          doc.text(lines, margin + 12, y);
          y += lines.length * 12;
        }
        y += 4;

        // Texture note
        ensureRoom(36);
        doc.setFillColor(241, 245, 249);
        const tnLines = doc.splitTextToSize(
          `⚡ Texture: ${guide.textureNote}`,
          pageWidth - margin * 2 - 16
        );
        const boxH = tnLines.length * 12 + 16;
        doc.rect(margin, y, pageWidth - margin * 2, boxH, "F");
        y += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(tnLines, margin + 8, y);
        y += boxH - 10 + 20;
      }

      // ── Back cover ────────────────────────────────────
      ensureRoom(80);
      doc.setFillColor(5, 150, 105);
      doc.rect(margin, y, pageWidth - margin * 2, 68, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Find your face shape before your next appointment", margin + 12, y + 24);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("calqulate.net/health/face-shape-calculator — free, no download required", margin + 12, y + 44);
      doc.setFontSize(9);
      doc.text("© 2026 Calqulate.net · Generated for personal use", margin + 12, y + 60);

      doc.save("haircut-lookbook-2026-calqulate.pdf");
    } catch (err) {
      console.error("Haircut PDF generation failed:", err);
      setError("Couldn't generate the PDF — please try again.");
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
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-600 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-700"
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
            <span>Download Haircut Lookbook (PDF)</span>
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

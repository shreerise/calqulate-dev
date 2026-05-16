// components/plans/PearLookbookPdfButton.tsx
"use client";

import { useState } from "react";
import { pearDresses, pearNecklines, pearFabrics, pearAvoid, pearStylingRules } from "../../lib/blog/pear-dress-data";

/**
 * Generates a personalized pear-shape styling lookbook as a PDF.
 * Client-side jsPDF — no server, no user data leaves the browser.
 */
export default function PearLookbookPdfButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      // Dynamic import keeps the bundle light until the user clicks.
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 60;

      // ── Cover heading ─────────────────────────────────
      doc.setFillColor(231, 111, 81); // pear brand color
      doc.rect(0, 0, pageWidth, 120, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text("Pear Shape Lookbook", margin, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Your personalized styling guide", margin, 95);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── Best dresses ──────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Best Dress Cuts for You", margin, y);
      y += 24;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      pearDresses.forEach((d) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${d.name}  •  Score ${d.fitScore}/100`, margin, y);
        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(d.why, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 10;
      });

      // ── Necklines ─────────────────────────────────────
      if (y > 720) {
        doc.addPage();
        y = 60;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Necklines That Work", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      pearNecklines.forEach((n) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`• ${n.name}`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`— ${n.why}`, margin + 110, y);
        doc.setTextColor(15, 23, 42);
        y += 16;
      });

      // ── Fabrics ───────────────────────────────────────
      if (y > 700) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Fabric Cheat Sheet", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      pearFabrics.forEach((f) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        const isLove = f.verdict === "love";
        if (isLove) {
          doc.setTextColor(42, 157, 143);
        } else {
          doc.setTextColor(220, 38, 38);
        }
        doc.setFont("helvetica", "bold");
        doc.text(isLove ? "♥" : "✕", margin, y);
        doc.setTextColor(15, 23, 42);
        doc.text(`${f.name}`, margin + 16, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`— ${f.note}`, margin + 140, y);
        doc.setTextColor(15, 23, 42);
        y += 16;
      });

      // ── Avoid list ────────────────────────────────────
      if (y > 700) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(220, 38, 38);
      doc.text("Avoid These", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      pearAvoid.forEach((a) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        const lines = doc.splitTextToSize(`• ${a}`, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 14;
      });

      // ── Styling rules ─────────────────────────────────
      if (y > 680) {
        doc.addPage();
        y = 60;
      }
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Four Styling Rules to Live By", margin, y);
      y += 22;
      pearStylingRules.forEach((r, i) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`${i + 1}. ${r.title}`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(r.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 14;
      });

      // ── Footer on last page ──────────────────────────
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text("Calqulate.net — your free body-shape guide", margin, 820);

      doc.save("pear-shape-lookbook-calqulate.pdf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-rose-400 disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Building your lookbook…
        </>
      ) : (
        <>📄 Download Pear Shape Lookbook PDF</>
      )}
    </button>
  );
}

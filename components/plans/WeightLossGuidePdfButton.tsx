// components/plans/WeightLossGuidePdfButton.tsx
"use client";

import { useState } from "react";
import {
  weightLossMilestones,
  trackingTips,
  nonScaleVictories,
  plateauChallenges,
  weightLossHabits,
} from "@/lib/blog/weight-loss-percentage-data";

/**
 * Generates a free Weight Loss Tracking guide as a PDF.
 * Client-side jsPDF — no server, nothing leaves the browser.
 */
export default function WeightLossGuidePdfButton() {
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
      doc.setFillColor(16, 185, 129); // emerald-500 brand green
      doc.rect(0, 0, pageWidth, 120, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Weight Loss Tracking Guide", margin, 65);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text("Formula, milestones, and habits in one PDF", margin, 92);

      y = 160;
      doc.setTextColor(15, 23, 42);

      // ── The formula box ──────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("The Weight Loss Percentage Formula", margin, y);
      y += 24;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text(
        "((Starting Weight - Current Weight) / Starting Weight) x 100",
        margin,
        y
      );
      y += 16;
      doc.text("= Weight Loss Percentage", margin, y);
      y += 24;
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "italic");
      doc.text(
        "Example: 200 lb -> 180 lb  =>  (20 / 200) x 100 = 10%",
        margin,
        y
      );
      y += 24;

      // ── Milestones ────────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Health Milestones at Each %", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      weightLossMilestones.forEach((m) => {
        if (y > 720) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${m.label}  -  ${m.headline}`, margin, y);
        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        m.benefits.forEach((b) => {
          if (y > 780) {
            doc.addPage();
            y = 60;
          }
          const lines = doc.splitTextToSize(`  - ${b}`, pageWidth - margin * 2);
          doc.text(lines, margin, y);
          y += lines.length * 13;
        });
        y += 8;
      });

      // ── Tracking tips ─────────────────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("How to Track Like a Pro", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      trackingTips.forEach((t) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`* ${t.title}`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(t.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 8;
      });

      // ── Non-scale victories ──────────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Non-Scale Victories to Track", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      nonScaleVictories.forEach((v) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(v.category, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        v.examples.forEach((e) => {
          if (y > 780) {
            doc.addPage();
            y = 60;
          }
          const lines = doc.splitTextToSize(`  - ${e}`, pageWidth - margin * 2);
          doc.text(lines, margin, y);
          y += lines.length * 13;
        });
        doc.setTextColor(15, 23, 42);
        y += 8;
      });

      // ── Plateaus & fluctuations ──────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Why You're Stuck: Common Causes", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      plateauChallenges.forEach((p) => {
        if (y > 760) {
          doc.addPage();
          y = 60;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`* ${p.name}  (${p.impact} impact)`, margin, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(p.detail, pageWidth - margin * 2);
        doc.text(lines, margin, y);
        doc.setTextColor(15, 23, 42);
        y += lines.length * 13 + 8;
      });

      // ── Habits ────────────────────────────────────────
      if (y > 660) {
        doc.addPage();
        y = 60;
      }
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Habits That Help (and Hurt)", margin, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      weightLossHabits.forEach((h) => {
        if (y > 780) {
          doc.addPage();
          y = 60;
        }
        const isLove = h.verdict === "love";
        if (isLove) doc.setTextColor(16, 185, 129);
        else doc.setTextColor(220, 38, 38);
        doc.setFont("helvetica", "bold");
        doc.text(isLove ? "+" : "x", margin, y);
        doc.setTextColor(15, 23, 42);
        doc.text(`${h.name}`, margin + 16, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(
          `- ${h.note}`,
          pageWidth - margin * 2 - 240
        );
        doc.text(lines, margin + 240, y);
        doc.setTextColor(15, 23, 42);
        y += Math.max(16, lines.length * 13 + 2);
      });

      // ── Footer ────────────────────────────────────────
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text("Calqulate.net — your free health & body calculators", margin, 820);

      doc.save("weight-loss-tracking-guide-calqulate.pdf");
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
        <>📄 Download Free Weight Loss Tracking Guide (PDF)</>
      )}
    </button>
  );
}

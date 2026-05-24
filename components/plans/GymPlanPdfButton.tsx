// components/plans/GymPlanPdfButton.tsx
"use client";

import { useState } from "react";
import { maleShapes, femaleShapes } from "@/lib/blog/gym-plan-data";

interface Props {
  gender: "male" | "female";
  label: string;
}

const genderConfig = {
  male: {
    brandColor: [22, 163, 74] as [number, number, number],   // green-600
    accentColor: [21, 128, 61] as [number, number, number],  // green-700
    title: "Men's Gym Plan by Body Type",
    subtitle: "7-Day Workout Plans for Ectomorph, Mesomorph, Endomorph & Rectangle",
    shapes: maleShapes,
    filename: "mens-gym-plan-by-body-type-calqulate.pdf",
    badgeText: "MALE BODY TYPES",
  },
  female: {
    brandColor: [22, 163, 74] as [number, number, number],   // green-600
    accentColor: [21, 128, 61] as [number, number, number],  // green-700
    title: "Women's Gym Plan by Body Shape",
    subtitle: "7-Day Workout Plans for Pear, Apple, Hourglass, Rectangle & Inverted Triangle",
    shapes: femaleShapes,
    filename: "womens-gym-plan-by-body-shape-calqulate.pdf",
    badgeText: "FEMALE BODY SHAPES",
  },
};

export default function GymPlanPdfButton({ gender, label }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      const config = genderConfig[gender];
      const [r, g, b] = config.brandColor;
      const [ar, ag, ab] = config.accentColor;

      const addPageHeader = (pageNum: number) => {
        doc.setFillColor(r, g, b);
        doc.rect(0, 0, pageWidth, 8, "F");

        doc.setFillColor(245, 245, 245);
        doc.rect(0, pageHeight - 30, pageWidth, 30, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Calqulate.net  ·  Best Gym Plan by Body Shape  ·  Page ${pageNum}`,
          margin,
          pageHeight - 10
        );
        doc.text(
          "calqulate.net/health/body-shape-calculator",
          pageWidth - margin,
          pageHeight - 10,
          { align: "right" }
        );
      };

      // ── COVER PAGE ──────────────────────────────────────────────────────────
      doc.setFillColor(r, g, b);
      doc.rect(0, 0, pageWidth, 250, "F");
      doc.setFillColor(ar, ag, ab);
      doc.rect(0, 200, pageWidth, 80, "F");

      // Decorative circles — use white fill without opacity API
      doc.setFillColor(255, 255, 255);
      // We draw subtle outlines instead of semi-transparent fills to avoid setOpacity
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1.5);
      doc.circle(pageWidth - 80, 80, 60, "S");
      doc.circle(60, 180, 40, "S");

      // Cover top bar
      doc.setFillColor(r, g, b);
      doc.rect(0, 0, pageWidth, 8, "F");

      // Badge
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.roundedRect(margin, 35, 140, 22, 11, 11, "S");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(config.badgeText, margin + 10, 50);

      // Main title
      doc.setFontSize(30);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      const titleLines = doc.splitTextToSize(config.title, pageWidth - margin * 2);
      doc.text(titleLines, margin, 90);

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(220, 255, 220);
      const subLines = doc.splitTextToSize(config.subtitle, pageWidth - margin * 2);
      doc.text(subLines, margin, 90 + titleLines.length * 35 + 8);

      // Stats panel
      const statsY = 270;
      const stats = [
        { label: "Body Shapes", value: `${config.shapes.length}` },
        {
          label: "Workout Routines",
          value: `${config.shapes.reduce((a, s) => a + s.routines.length, 0)}`,
        },
        { label: "Weekly Plans", value: `${config.shapes.length}` },
        { label: "Days Covered", value: "7" },
      ];
      const statWidth = (pageWidth - margin * 2) / stats.length;
      stats.forEach((stat, i) => {
        const x = margin + i * statWidth;
        doc.setFillColor(248, 248, 250);
        doc.roundedRect(x + 4, statsY, statWidth - 8, 60, 8, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(ar, ag, ab);
        doc.text(stat.value, x + statWidth / 2, statsY + 32, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(stat.label, x + statWidth / 2, statsY + 50, { align: "center" });
      });

      // How to use
      let y = statsY + 90;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("How to Use This Guide", margin, y);
      y += 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      const howToLines = doc.splitTextToSize(
        "1. Find your body shape section in this PDF. 2. Read your shape description and goals. 3. Choose 2-4 routines from your shape's workout menu. 4. Follow the 7-day schedule each week. 5. Progressive overload: increase weight or reps slightly each session.",
        pageWidth - margin * 2
      );
      doc.text(howToLines, margin, y);
      y += howToLines.length * 15 + 20;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(r, g, b);
      doc.text(
        "Not sure of your body shape? Visit calqulate.net/health/body-shape-calculator",
        margin,
        y
      );

      // Footer on cover
      doc.setFillColor(245, 245, 245);
      doc.rect(0, pageHeight - 30, pageWidth, 30, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Calqulate.net  ·  Your free body-shape fitness guide  ·  Page 1",
        margin,
        pageHeight - 10
      );

      // ── SHAPE PAGES ─────────────────────────────────────────────────────────
      let pageNum = 2;

      for (const shape of config.shapes) {
        // ── SHAPE COVER ──────────────────────────────────────────
        doc.addPage();
        addPageHeader(pageNum);
        pageNum++;
        y = 30;

        doc.setFillColor(r, g, b);
        doc.rect(0, 8, pageWidth, 100, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(255, 255, 255);
        doc.text(shape.name, margin, 55);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);
        doc.setTextColor(210, 255, 210);
        doc.text(shape.shortDesc, margin, 78);

        // Characteristics
        y = 140;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text("Body Shape Characteristics", margin, y);
        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        shape.characteristics.forEach((c) => {
          doc.setTextColor(r, g, b);
          doc.text("->", margin, y);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(c, pageWidth - margin * 2 - 20);
          doc.text(lines, margin + 16, y);
          y += lines.length * 13 + 4;
        });

        // Training Goals
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text("Training Goals", margin, y);
        y += 16;
        shape.goals.forEach((gl) => {
          doc.setTextColor(22, 163, 74);
          doc.text("OK", margin, y);
          doc.setTextColor(71, 85, 105);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const lines = doc.splitTextToSize(gl, pageWidth - margin * 2 - 20);
          doc.text(lines, margin + 20, y);
          y += lines.length * 13 + 4;
        });

        // What to Avoid
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(220, 38, 38);
        doc.text("What to Avoid", margin, y);
        y += 16;
        shape.avoid.forEach((av) => {
          doc.setTextColor(220, 38, 38);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text("X", margin, y);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(av, pageWidth - margin * 2 - 20);
          doc.text(lines, margin + 16, y);
          y += lines.length * 13 + 4;
        });

        // Nutrition tip
        y += 10;
        doc.setFillColor(240, 253, 244);
        const nutLines = doc.splitTextToSize(
          `Nutrition Tip: ${shape.nutritionTip}`,
          pageWidth - margin * 2 - 16
        );
        doc.roundedRect(margin, y - 10, pageWidth - margin * 2, nutLines.length * 14 + 20, 6, 6, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(nutLines, margin + 8, y + 6);

        // ── WORKOUT ROUTINES ─────────────────────────────────────────────────
        for (const routine of shape.routines) {
          doc.addPage();
          addPageHeader(pageNum);
          pageNum++;
          y = 30;

          doc.setFillColor(ar, ag, ab);
          doc.rect(0, 8, pageWidth, 70, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(210, 255, 210);
          doc.text(`${shape.name.toUpperCase()} ·`, margin, 28);
          doc.setFontSize(16);
          doc.setTextColor(255, 255, 255);
          doc.text(routine.name, margin + 80, 28);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(210, 255, 210);
          doc.text(routine.goal, margin, 50);

          // Meta row
          y = 100;
          const meta = [
            `Difficulty: ${routine.difficulty}`,
            `Duration: ${routine.duration} min`,
            `Frequency: ${routine.frequency}`,
            `Fit Score: ${routine.focusScore}/100`,
          ];
          meta.forEach((m, idx) => {
            const x = margin + idx * ((pageWidth - margin * 2) / 4);
            doc.setFillColor(248, 248, 250);
            doc.roundedRect(x, y, (pageWidth - margin * 2) / 4 - 6, 30, 4, 4, "F");
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            doc.text(m, x + (pageWidth - margin * 2) / 8 - 3, y + 18, {
              align: "center",
            });
          });
          y += 50;

          // Pro tip
          doc.setFillColor(240, 253, 244);
          const tipLines = doc.splitTextToSize(
            `Pro Tip: ${routine.proTip}`,
            pageWidth - margin * 2 - 20
          );
          doc.roundedRect(margin, y, pageWidth - margin * 2, tipLines.length * 14 + 18, 6, 6, "F");
          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          doc.setTextColor(r, g, b);
          doc.text(tipLines, margin + 10, y + 14);
          y += tipLines.length * 14 + 30;

          // Exercise table header
          doc.setFillColor(15, 23, 42);
          doc.rect(margin, y, pageWidth - margin * 2, 22, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(255, 255, 255);
          doc.text("Exercise", margin + 8, y + 14);
          doc.text("Muscle Group", margin + 200, y + 14);
          doc.text("Sets", margin + 310, y + 14);
          doc.text("Reps", margin + 350, y + 14);
          doc.text("Rest", margin + 400, y + 14);
          y += 22;

          // Exercises
          routine.exercises.forEach((ex, idx) => {
            if (y > 760) {
              doc.addPage();
              addPageHeader(pageNum);
              pageNum++;
              y = 30;
            }
            const bgColor: [number, number, number] =
              idx % 2 === 0 ? [255, 255, 255] : [248, 250, 252];
            doc.setFillColor(...bgColor);
            doc.rect(margin, y, pageWidth - margin * 2, 28, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(15, 23, 42);
            doc.text(ex.name, margin + 8, y + 12);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            doc.text(ex.muscleGroup, margin + 200, y + 12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(ar, ag, ab);
            doc.text(String(ex.sets), margin + 318, y + 12);
            doc.text(ex.reps, margin + 350, y + 12);
            doc.setTextColor(71, 85, 105);
            doc.text(ex.rest, margin + 400, y + 12);

            // Form tip
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8.5);
            doc.setTextColor(100, 116, 139);
            const tipLines2 = doc.splitTextToSize(
              `Tip: ${ex.tip}`,
              pageWidth - margin * 2 - 16
            );
            doc.text(tipLines2, margin + 8, y + 22);
            y += 28 + (tipLines2.length - 1) * 11 + 4;
          });
        }

        // ── 7-DAY PLAN PAGE ──────────────────────────────────────────────────
        doc.addPage();
        addPageHeader(pageNum);
        pageNum++;
        y = 30;

        doc.setFillColor(r, g, b);
        doc.rect(0, 8, pageWidth, 55, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255);
        doc.text(`7-Day Gym Plan — ${shape.name}`, margin, 42);

        y = 80;

        shape.weekPlan.forEach((day) => {
          if (y > 740) {
            doc.addPage();
            addPageHeader(pageNum);
            pageNum++;
            y = 30;
          }

          const typeColors: Record<string, [number, number, number]> = {
            training: [r, g, b],
            rest: [148, 163, 184],
            "active-recovery": [34, 197, 94],
          };
          const [tr, tg, tb] = typeColors[day.type] ?? [r, g, b];

          doc.setFillColor(tr, tg, tb);
          doc.roundedRect(margin, y, 5, 50, 2, 2, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(15, 23, 42);
          doc.text(`${day.label} — Day ${day.day}`, margin + 14, y + 14);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(71, 85, 105);
          const dayLines = doc.splitTextToSize(day.focus, pageWidth - margin * 2 - 20);
          doc.text(dayLines, margin + 14, y + 28);

          if (day.notes) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const noteLines = doc.splitTextToSize(
              `Note: ${day.notes}`,
              pageWidth - margin * 2 - 20
            );
            doc.text(noteLines, margin + 14, y + 28 + dayLines.length * 13);
            y += 50 + noteLines.length * 11;
          } else {
            y += 55;
          }
        });
      }

      doc.save(config.filename);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Building your plan...
        </>
      ) : (
        <>{label}</>
      )}
    </button>
  );
}

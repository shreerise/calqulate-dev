import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/** Plain, serializable summary the route builds and the PDF renders. */
export interface Glp1ReportSummary {
  email: string;
  generatedAt: string; // ISO
  medication: { name: string; compound: string; startDate: string; weeksOnTherapy: number; doseIntervalDays: number } | null;
  weight: { baselineLb: number; currentLb: number; changeLb: number; changePct: number } | null;
  benchmark: { trial: string; dose: string; expectedPct: number; actualPct: number; status: string; message: string } | null;
  bodyComp: { fatMassLb: number; leanMassLb: number; bodyFatPct: number; leanLossPct: number | null; flag: string | null; message: string | null } | null;
  medicationLevelPct: number | null;
  proteinTarget: { minG: number; maxG: number } | null;
  labs: { label: string; value: string }[];
  adherence: { dosesLast30: number; resistanceSessionsLast30: number; symptomDaysLast30: number; noSymptomDaysLast30: number };
}

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#1f2937" },
  brand: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#065F46" },
  sub: { color: "#6b7280", marginBottom: 16 },
  h2: { fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 16, marginBottom: 6, color: "#059669" },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottom: "1px solid #eee" },
  box: { backgroundColor: "#ECFDF5", padding: 14, borderRadius: 6, marginBottom: 8 },
  big: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#065F46" },
  small: { fontSize: 9, color: "#9ca3af", marginTop: 20 },
  note: { fontSize: 10, color: "#374151", marginTop: 4 },
});

function Line({ k, v }: { k: string; v: string }) {
  return (
    <View style={s.row}>
      <Text>{k}</Text>
      <Text style={{ fontFamily: "Helvetica-Bold" }}>{v}</Text>
    </View>
  );
}

export function Glp1ReportPdf({ summary }: { summary: Glp1ReportSummary }) {
  const m = summary;
  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <Text style={s.brand}>Calqulate Vitals</Text>
        <Text style={s.sub}>
          GLP-1 Progress Report · {new Date(m.generatedAt).toLocaleDateString("en-US")} · {m.email}
        </Text>

        {m.weight && (
          <View style={s.box}>
            <Text style={s.big}>
              {m.weight.changeLb >= 0 ? `${m.weight.changeLb} lb lost` : `${Math.abs(m.weight.changeLb)} lb gained`}
              {" "}({m.weight.changePct >= 0 ? "-" : "+"}{Math.abs(m.weight.changePct)}%)
            </Text>
            <Text>
              {m.weight.baselineLb} lb → {m.weight.currentLb} lb
              {m.medication ? ` · ${m.medication.weeksOnTherapy} weeks on ${m.medication.name}` : ""}
            </Text>
          </View>
        )}

        {m.medication && (
          <>
            <Text style={s.h2}>Medication</Text>
            <Line k="Compound" v={m.medication.compound} />
            <Line k="Started" v={new Date(m.medication.startDate).toLocaleDateString("en-US")} />
            <Line k="Dose cadence" v={`every ${m.medication.doseIntervalDays} day(s)`} />
            {m.medicationLevelPct != null && <Line k="Estimated medication level now" v={`${m.medicationLevelPct}% of recent peak`} />}
          </>
        )}

        {m.benchmark && (
          <>
            <Text style={s.h2}>Clinical-study benchmark</Text>
            <Line k={`Trial (${m.benchmark.trial}, ${m.benchmark.dose})`} v={m.benchmark.status} />
            <Line k="Expected loss at this point" v={`${m.benchmark.expectedPct}%`} />
            <Line k="Actual loss" v={`${m.benchmark.actualPct}%`} />
            <Text style={s.note}>{m.benchmark.message}</Text>
          </>
        )}

        {m.bodyComp && (
          <>
            <Text style={s.h2}>Body composition</Text>
            <Line k="Body fat" v={`${m.bodyComp.bodyFatPct}%`} />
            <Line k="Fat mass / lean mass" v={`${m.bodyComp.fatMassLb} lb / ${m.bodyComp.leanMassLb} lb`} />
            {m.bodyComp.leanLossPct != null && <Line k="Share of loss that is lean mass" v={`${m.bodyComp.leanLossPct}% (${m.bodyComp.flag})`} />}
            {m.bodyComp.message && <Text style={s.note}>{m.bodyComp.message}</Text>}
          </>
        )}

        {m.proteinTarget && (
          <Line k="Daily protein target (muscle preservation)" v={`${m.proteinTarget.minG}–${m.proteinTarget.maxG} g`} />
        )}

        {m.labs.length > 0 && (
          <>
            <Text style={s.h2}>Latest labs</Text>
            {m.labs.map((l, i) => <Line key={i} k={l.label} v={l.value} />)}
          </>
        )}

        <Text style={s.h2}>Adherence (last 30 days)</Text>
        <Line k="Doses logged" v={String(m.adherence.dosesLast30)} />
        <Line k="Resistance-training sessions" v={String(m.adherence.resistanceSessionsLast30)} />
        <Line k="Days with symptoms / symptom-free days" v={`${m.adherence.symptomDaysLast30} / ${m.adherence.noSymptomDaysLast30}`} />

        <Text style={s.small}>
          Generated by Calqulate Vitals for educational decision-support. Not medical advice, diagnosis or treatment.
          Trial benchmarks reflect published means for the highest maintenance dose; individual results vary. Risk and
          body-composition figures are estimates. Confirm any clinical decisions with the patient&apos;s prescriber.
        </Text>
      </Page>
    </Document>
  );
}

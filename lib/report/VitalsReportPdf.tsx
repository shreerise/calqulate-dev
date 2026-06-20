import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { VitalsReport } from "@/types/vitals";
import type { ProtocolItem } from "@/lib/protocol";

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#1f2937" },
  brand: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#1F3A5F" },
  sub: { color: "#6b7280", marginBottom: 16 },
  h2: { fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 16, marginBottom: 6, color: "#2E75B6" },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottom: "1px solid #eee" },
  scoreBox: { backgroundColor: "#EFF6FF", padding: 14, borderRadius: 6, marginBottom: 8 },
  scoreNum: { fontSize: 34, fontFamily: "Helvetica-Bold", color: "#1F3A5F" },
  small: { fontSize: 9, color: "#9ca3af", marginTop: 20 },
  item: { marginBottom: 8 },
  itemTitle: { fontFamily: "Helvetica-Bold" },
});

function Line({ k, v }: { k: string; v: string }) {
  return (
    <View style={s.row}>
      <Text>{k}</Text>
      <Text style={{ fontFamily: "Helvetica-Bold" }}>{v}</Text>
    </View>
  );
}

export function VitalsReportPdf({
  report,
  protocol,
  email,
}: {
  report: VitalsReport;
  protocol: ProtocolItem[];
  email: string;
}) {
  const r = report;
  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <Text style={s.brand}>Calqulate Vitals</Text>
        <Text style={s.sub}>
          Metabolic Health Report · {new Date(r.computedAt).toLocaleDateString("en-US")} · {email}
        </Text>

        <View style={s.scoreBox}>
          <Text style={s.scoreNum}>
            {r.composite.score}/100 (Grade {r.composite.grade})
          </Text>
          <Text>Metabolic Health Score · confidence: {r.composite.confidence}</Text>
        </View>

        <Text style={s.h2}>Validated risk scores</Text>
        <Line k="10-year ASCVD cardiovascular risk" v={r.ascvd.tenYearRiskPercent != null ? `${r.ascvd.tenYearRiskPercent}% (${r.ascvd.category})` : "n/a"} />
        <Line k="Heart age (Framingham)" v={r.heartAge.heartAge != null ? `${r.heartAge.heartAge} yrs (${(r.heartAge.delta ?? 0) >= 0 ? "+" : ""}${r.heartAge.delta} vs age ${r.heartAge.chronologicalAge})` : "n/a"} />
        <Line k="10-year type-2 diabetes risk (FINDRISC)" v={r.diabetes.tenYearRiskPercent != null ? `${r.diabetes.tenYearRiskPercent}% (${r.diabetes.category})` : "n/a"} />

        <Text style={s.h2}>Body composition</Text>
        <Line k="BMI" v={`${r.body.bmi} (${r.body.bmiCategory})`} />
        <Line k="Waist-to-height ratio" v={r.body.waistToHeight != null ? `${r.body.waistToHeight}` : "n/a"} />
        <Line k="Relative Fat Mass" v={r.body.rfmPercent != null ? `${r.body.rfmPercent}%` : "n/a"} />
        <Line k="Lean body mass (Boer)" v={r.body.leanBodyMassKg != null ? `${r.body.leanBodyMassKg} kg` : "n/a"} />

        <Text style={s.h2}>Recommended next steps</Text>
        {protocol.map((p, i) => (
          <View key={i} style={s.item}>
            <Text style={s.itemTitle}>
              {i + 1}. {p.lever} [{p.impact} impact]
            </Text>
            <Text>{p.why}</Text>
            <Text>{`-> ${p.action}`}</Text>
          </View>
        ))}

        <Text style={s.small}>
          Educational decision-support only. Not medical advice, diagnosis, or treatment. Risk models: 2013 ACC/AHA
          Pooled Cohort Equations; Framingham General CVD (D&apos;Agostino 2008); FINDRISC. Share with your licensed clinician.
        </Text>
      </Page>
    </Document>
  );
}

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { getAccess } from "@/lib/auth";
import { generateProtocol } from "@/lib/protocol";
import { VitalsReportPdf } from "@/lib/report/VitalsReportPdf";
import type { VitalsReport } from "@/types/vitals";

export const runtime = "nodejs";

/** Generates a doctor-shareable PDF of the user's latest report. Pro tier only. */
export async function GET() {
  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!(access.isActive && access.tier === "pro")) {
    return NextResponse.json({ error: "PDF reports require Vitals Pro." }, { status: 402 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: row } = await supabase
    .from("risk_results")
    .select("report_json")
    .eq("user_id", access.userId)
    .order("computed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!row?.report_json) {
    return NextResponse.json({ error: "No report yet. Save a measurement first." }, { status: 404 });
  }

  const report = row.report_json as VitalsReport;
  const protocol = generateProtocol(report);

  const buffer = await renderToBuffer(
    React.createElement(VitalsReportPdf, { report, protocol, email: user?.email ?? "" }) as any,
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="calqulate-vitals-report.pdf"`,
    },
  });
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccess, hasPaidAccess } from "@/lib/auth";
import { generateProtocol, type ProtocolInput } from "@/lib/protocolGenerator";

export const runtime = "nodejs";

/** Generate + persist the user's GLP-1 Autopilot protocol. Paid tier only. */
export async function POST(req: Request) {
  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!hasPaidAccess(access)) return NextResponse.json({ error: "GLP-1 Autopilot requires Calqulate Vitals." }, { status: 402 });

  const input = (await req.json()) as ProtocolInput;
  if (!input?.medication || input.currentDoseMg == null) {
    return NextResponse.json({ error: "medication and currentDoseMg are required." }, { status: 400 });
  }

  const protocol = generateProtocol(input);
  const supabase = await createClient();

  // Persistence is best-effort: if the glp1_protocols table isn't migrated yet
  // (0003_longevity.sql), still return the generated protocol so the UI works.
  let saved = false;
  let saveError: string | null = null;
  try {
    await supabase.from("glp1_protocols").delete().eq("user_id", access.userId).eq("status", "active");
    const { error } = await supabase.from("glp1_protocols").insert({
      user_id: access.userId,
      medication: input.medication,
      start_date: input.startDateISO?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      target_weight_kg: input.targetWeightKg ?? null,
      status: "active",
      protocol_data: protocol,
    });
    if (error) saveError = error.message;
    else saved = true;
  } catch (e) {
    saveError = (e as Error).message;
  }

  return NextResponse.json({ protocol, saved, saveError });
}

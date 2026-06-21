import Link from "next/link";
import { getAccess, hasPaidAccess } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Paywall } from "@/components/vitals/Paywall";
import { ProtocolBuilder } from "@/components/health/ProtocolBuilder";
import type { GeneratedProtocol } from "@/lib/protocolGenerator";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProtocolPage() {
  const access = await getAccess();
  if (!hasPaidAccess(access)) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">GLP-1 Autopilot</h1>
        <Paywall feature="GLP-1 Autopilot" />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: row } = await supabase
    .from("glp1_protocols")
    .select("protocol_data")
    .eq("user_id", access.userId!)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const initial = (row?.protocol_data as GeneratedProtocol | null) ?? null;

  return (
    <div className="-mx-4 -my-8 min-h-screen bg-gray-950 px-4 py-8 text-gray-100 lg:-mx-0 lg:rounded-3xl lg:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="h-4 w-4" /> Mission control
      </Link>
      <div className="mt-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">GLP-1 Autopilot</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl">Your adaptive protocol</h1>
        <p className="mt-2 max-w-2xl text-gray-400">
          An adaptive titration schedule plus weekly missions, protein targets and training to lose fat —
          not muscle — on semaglutide or tirzepatide. Log your check-in each week and the plan adjusts.
        </p>
      </div>

      <ProtocolBuilder initial={initial} />
    </div>
  );
}

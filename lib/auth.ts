import { createClient } from "@/lib/supabase/server";
import type { Tier } from "@/lib/stripe/plans";

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export interface AccessState {
  userId: string | null;
  tier: Tier;
  isActive: boolean;
}

/** Resolve the current user's subscription tier for paywall checks. */
export async function getAccess(): Promise<AccessState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { userId: null, tier: "free", isActive: false };

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("tier,status")
    .eq("user_id", user.id)
    .maybeSingle();

  const tier = (sub?.tier as Tier) ?? "free";
  const isActive = sub?.status === "active" || sub?.status === "trialing";
  return { userId: user.id, tier, isActive };
}

export function hasPaidAccess(state: AccessState): boolean {
  return state.isActive && (state.tier === "plus" || state.tier === "pro");
}

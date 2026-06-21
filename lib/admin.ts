import "server-only";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { resolveIsAdmin, adminEmails } from "@/lib/admin-core";

export { adminEmails, resolveIsAdmin };

/** Returns the signed-in user IF they are an admin, else null. Server-only. */
export async function getAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return (await resolveIsAdmin(supabase, user)) ? user : null;
}

/** Guard for admin server components / pages. Redirects non-admins home. */
export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/");
  return user;
}

/** Record an admin action to the audit_logs table (best-effort). */
export async function logAudit(action: string, target?: string | null, meta?: Record<string, unknown>) {
  try {
    const user = await getAdminUser();
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      admin_id: user?.id ?? null,
      admin_email: user?.email ?? null,
      action,
      target: target ?? null,
      meta: meta ?? null,
    });
  } catch {
    /* never block on audit failure */
  }
}

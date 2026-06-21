/**
 * Lightweight admin helpers safe to import anywhere (incl. middleware) —
 * no next/headers or next/navigation imports.
 */

/** Bootstrap allowlist so dev/admin mode works even before the SQL role is set. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

type MinimalUser = { id: string; email?: string | null } | null | undefined;
type MinimalClient = { from: (table: string) => any };

/**
 * True if the user is an admin — by env allowlist OR by profiles.role = 'admin'.
 * Works with any Supabase client (browser, server, or middleware).
 */
export async function resolveIsAdmin(supabase: MinimalClient, user: MinimalUser): Promise<boolean> {
  if (!user) return false;
  if (user.email && adminEmails().includes(user.email.toLowerCase())) return true;
  try {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    return data?.role === "admin";
  } catch {
    return false;
  }
}

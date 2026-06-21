import { createAdminClient } from "@/lib/supabase/server";
import { UsersTable, type AdminUserRow } from "@/components/admin/UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const admin = createAdminClient();

  const [{ data: profiles }, { data: subs }] = await Promise.all([
    admin.from("profiles").select("id,email,full_name,role,suspended,created_at").order("created_at", { ascending: false }).limit(500),
    admin.from("subscriptions").select("user_id,tier,status"),
  ]);

  const subByUser = new Map<string, { tier: string | null; status: string | null }>();
  for (const s of subs ?? []) subByUser.set(s.user_id, { tier: s.tier, status: s.status });

  const rows: AdminUserRow[] = (profiles ?? []).map((p: any) => ({
    id: p.id,
    email: p.email,
    full_name: p.full_name,
    role: p.role ?? "user",
    suspended: !!p.suspended,
    created_at: p.created_at,
    tier: subByUser.get(p.id)?.tier ?? "free",
    status: subByUser.get(p.id)?.status ?? null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500">{rows.length} account{rows.length === 1 ? "" : "s"} · search, set role, grant Pro, or delete.</p>
      </div>
      <UsersTable users={rows} />
    </div>
  );
}

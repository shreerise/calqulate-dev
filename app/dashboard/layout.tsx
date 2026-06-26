import { redirect } from "next/navigation";
import { getAccess } from "@/lib/auth";
import { AppShell } from "@/components/vitals/AppShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/dashboard");

  return (
    <AppShell tier={access.tier} isAdmin={access.isAdmin} email={access.email}>
      {children}
    </AppShell>
  );
}

import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Calqulate",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      <AdminSidebar email={user.email ?? null} />
      <main id="main" className="flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}

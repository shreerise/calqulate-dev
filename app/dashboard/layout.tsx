import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccess } from "@/lib/auth";
import { BillingButton } from "@/components/vitals/BillingButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="font-bold">
            Calqulate <span className="text-blue-600">Vitals</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="hover:text-blue-600">Overview</Link>
            <Link href="/dashboard/history" className="hover:text-blue-600">History</Link>
            <Link href="/dashboard/settings" className="hover:text-blue-600">Settings</Link>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase">
              {access.tier}
            </span>
            <BillingButton />
            <form action="/auth/signout" method="post">
              <button className="text-sm text-gray-500 hover:text-blue-600">Sign out</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

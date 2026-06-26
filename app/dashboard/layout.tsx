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
          <Link href="/dashboard" className="text-sm font-bold sm:text-base">
            Calqulate <span className="text-blue-600">Vitals</span>
          </Link>
          <nav className="flex items-center gap-2 overflow-x-auto text-xs sm:gap-4 sm:text-sm">
            <Link href="/dashboard" className="whitespace-nowrap hover:text-blue-600">Overview</Link>
            <Link href="/dashboard/future" className="whitespace-nowrap hover:text-blue-600">Future You</Link>
            <Link href="/dashboard/protocol" className="whitespace-nowrap hover:text-blue-600">Autopilot</Link>
            <Link href="/dashboard/history" className="whitespace-nowrap hover:text-blue-600">History</Link>
            <Link href="/dashboard/settings" className="whitespace-nowrap hover:text-blue-600">Settings</Link>
            {access.isAdmin && (
              <Link href="/admin" className="whitespace-nowrap rounded-full bg-gray-900 px-2 py-1 text-xs font-semibold text-white hover:bg-black">
                Admin
              </Link>
            )}
            <span className="whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs font-medium uppercase">
              {access.tier}
            </span>
            <BillingButton />
            <form action="/auth/signout" method="post">
              <button className="whitespace-nowrap text-xs text-gray-500 hover:text-blue-600 sm:text-sm">Sign out</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

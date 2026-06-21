import { getAccess } from "@/lib/auth";
import { DevTools } from "@/components/admin/DevTools";

export const dynamic = "force-dynamic";

export default async function AdminDevPage() {
  const access = await getAccess();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Developer mode</h1>
        <p className="text-gray-500">
          Test every paid feature manually — no Stripe payment required. You&apos;re signed in as{" "}
          <span className="font-medium text-gray-700">{access.email}</span> with{" "}
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            admin · {access.tier} access
          </span>
          .
        </p>
      </div>
      <DevTools />
    </div>
  );
}

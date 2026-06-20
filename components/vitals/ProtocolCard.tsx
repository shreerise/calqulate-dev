import type { ProtocolItem } from "@/lib/protocol";

const impactColor: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export function ProtocolCard({ items }: { items: ProtocolItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{it.lever}</h4>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${impactColor[it.impact]}`}>
              {it.impact} impact
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{it.why}</p>
          <p className="mt-2 text-sm font-medium text-gray-900">→ {it.action}</p>
        </div>
      ))}
    </div>
  );
}

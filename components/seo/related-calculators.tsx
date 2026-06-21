import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export interface RelatedLink {
  label: string
  href: string
}

/** Internal-linking block: related calculators + the matching paid service. */
export function RelatedCalculators({ title = "Related calculators and trackers", items }: { title?: string; items: RelatedLink[] }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-green-300 hover:text-green-700"
          >
            {l.label}
            <ArrowUpRight className="h-4 w-4 text-gray-300 transition group-hover:text-green-500" />
          </Link>
        ))}
      </div>
    </section>
  )
}

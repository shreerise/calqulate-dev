import { BookOpen, ExternalLink } from "lucide-react"

export interface SourceItem {
  label: string
  href: string
  note?: string
}

/**
 * Sources and references block for clinical calculator pages. Links to
 * high-authority health organizations and primary studies. External links
 * use rel="noopener" and open in a new tab.
 */
export function SourcesSection({ items }: { items: SourceItem[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <BookOpen className="h-5 w-5 text-green-600" /> Sources and references
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        This page is built from public clinical guidance and peer-reviewed research. Always confirm decisions with a
        licensed clinician.
      </p>
      <ol className="mt-4 space-y-2.5">
        {items.map((s, i) => (
          <li key={s.href} className="text-sm text-gray-700">
            <span className="mr-1 font-semibold text-gray-400">{i + 1}.</span>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 hover:text-green-800"
            >
              {s.label}
              <ExternalLink className="ml-1 inline h-3 w-3" />
            </a>
            {s.note && <span className="text-gray-500">. {s.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}

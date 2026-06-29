import Image from "next/image"
import Link from "next/link"
import { Linkedin, ArrowRight } from "lucide-react"

const meetContributions = ["Product Strategy", "User Experience", "Operations"]
const krushalContributions = ["Software Engineering", "Calculator Development", "Technical SEO"]

function FounderCard({
  photo,
  name,
  subtitle,
  contributions,
  linkedInUrl,
  linkedInLabel,
  bioAnchor,
}: {
  photo: string
  name: string
  subtitle: string
  contributions: string[]
  linkedInUrl: string
  linkedInLabel: string
  bioAnchor: string
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-5 shadow-sm flex items-start gap-3 md:gap-4">
      <a
        href={photo}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-200 hover:ring-emerald-400 transition-all"
      >
        <Image src={photo} alt={name} width={64} height={64} className="object-cover" />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-sm md:text-base font-bold text-gray-900">{name}</h3>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-emerald-700 font-medium">{subtitle}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {contributions.map((c) => (
            <span
              key={c}
              className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={`${name} on LinkedIn`}
          >
            <Linkedin className="h-3.5 w-3.5" />
            {linkedInLabel}
          </a>
          <Link
            href={`/about-us#${bioAnchor}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
          >
            Read full bio <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AuthorSection() {
  return (
    <div className="mt-12 mb-6 max-w-2xl mx-auto">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">About the authors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FounderCard
          photo="/meet.akabari.webp"
          name="Meet Akabari"
          subtitle="Co-Founder, Calqulate.net"
          contributions={meetContributions}
          linkedInUrl="https://www.linkedin.com/in/meet-akabari/"
          linkedInLabel="LinkedIn"
          bioAnchor="meet"
        />
        <FounderCard
          photo="/krushal.barasiya.webp"
          name="Krushal Barasiya"
          subtitle="Co-Founder, Calqulate.net"
          contributions={krushalContributions}
          linkedInUrl="https://www.linkedin.com/in/krushalbarasiya/"
          linkedInLabel="LinkedIn"
          bioAnchor="krushal"
        />
      </div>
    </div>
  )
}
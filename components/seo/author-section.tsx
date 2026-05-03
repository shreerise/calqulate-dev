import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Linkedin } from "lucide-react"

export function AuthorSection() {
  return (
    <div className="mt-16 mb-8 max-w-2xl mx-auto">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
          <Image
            src="/meet.akabari.jpeg"
            alt="Meet Akabari"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold text-slate-900">Meet Akabari</h3>
          <p className="text-green-700 font-medium text-sm mb-3">Web Developer & Health Enthusiast</p>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Meet is the creator of Calqulate.net, dedicated to building accurate, privacy-first health and fitness tools that help users make informed decisions about their well-being. With expertise in web development and a passion for health science, Meet combines technical excellence with practical health knowledge to deliver tools you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
            <a
              href="https://calqulate.net/about-us"
              className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-green-700 transition-colors"
            >
              Read more about the author <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/meet-akabari/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Meet Akabari on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

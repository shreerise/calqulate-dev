import { Star, Quote } from "lucide-react";
import { STATS, TESTIMONIALS, SUCCESS_STORIES } from "@/lib/social-proof";

export function SocialProof() {
  const stats = STATS.filter((s) => s.value);
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Stats strip */}
        {stats.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-emerald-600 md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
            What members say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Real people, real numbers moving</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            The stuff that actually keeps people here is simple. The number moves when they do the work, and they
            finally know which thing to fix first.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
              <div className="mb-3 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <Quote className="mb-2 h-5 w-5 text-emerald-300" />
              <blockquote className="text-[15px] leading-relaxed text-gray-700">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-gray-900">{t.name}</span>
                <span className="text-gray-400"> · {t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Success stories */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {SUCCESS_STORIES.map((s) => (
            <div key={s.headline} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
              <div className="text-2xl font-extrabold text-emerald-700">{s.metric}</div>
              <h3 className="mt-2 font-bold text-gray-900">{s.headline}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Individual results vary. Stories reflect member experiences and are not a guarantee of outcomes. Educational
          decision-support, not medical advice.
        </p>
      </div>
    </section>
  );
}

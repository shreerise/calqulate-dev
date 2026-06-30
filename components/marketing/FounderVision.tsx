/**
 * Founder vision — a quoted statement of why Calqulate exists, with the
 * premium gold accent. Used beside the pricing card on the homepage and as a
 * standalone section on the about page.
 */
export function FounderVision({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold-light/10 via-white to-brand-50/50 p-7 shadow-sm sm:p-8 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-10 select-none font-serif text-[140px] leading-none text-gold/15"
      >
        &rdquo;
      </span>
      <div className="relative">
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-gold-light to-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-gold-ink shadow-sm">
          Our founder vision
        </span>
        <blockquote className="mt-4 text-lg font-medium leading-relaxed text-ink sm:text-xl">
          &ldquo;We don&apos;t just track GLP-1 weight loss &mdash; we solve the muscle-wasting problem,
          separating fat loss from muscle loss so you preserve your strength. And by innovating on the
          algorithm that times your dose, we help you find your dosing sweet spot: maximum fat loss,
          minimal side effects, and a body that looks 15 years younger.&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-sm font-semibold text-copy">
          &mdash; Meet Akabari &amp; Krushal Barasiya,{" "}
          <span className="text-brand">Co-Founders of Calqulate</span>
        </figcaption>
      </div>
    </figure>
  );
}

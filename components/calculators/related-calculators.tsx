import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedCalculators, getCategory } from "@/lib/calculators-catalog";

/**
 * Content-side internal linking block. Renders the other calculators that share
 * the current calculator's category, so related tools are discoverable and
 * cross-linked for users and SEO. Drop it near the end of a calculator page:
 *   <RelatedCalculators slug="absi-calculator" />
 */
export function RelatedCalculators({ slug, limit }: { slug: string; limit?: number }) {
  const related = getRelatedCalculators(slug, limit);
  const category = getCategory(slug);
  if (!category || related.length === 0) return null;

  return (
    <section aria-labelledby="related-calculators-heading" className="not-prose mt-16">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8">
        <h2 id="related-calculators-heading" className="text-xl font-bold text-slate-900">
          Related {category} Calculators
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Explore the rest of our {category.toLowerCase()} tools — each one adds a different piece of the picture.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/health/${c.slug}`}
              className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 hover:shadow"
            >
              <span>{c.name}</span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

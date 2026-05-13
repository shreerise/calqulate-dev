// components/blog/RelatedBlogs.tsx
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";

export default function RelatedBlogs({ blogs }: { blogs: Blog[] }) {
  if (!blogs.length) return null;
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Related Reads
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={b.featuredImage}
                  alt={b.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  {b.category}
                </span>
                <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-emerald-700">
                  {b.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// components/blog/GenericBlogPlaceholder.tsx
import Link from "next/link";
import { ClickableImage } from "@/components/ui/image-lightbox";
import type { Blog } from "@/lib/blog/blogs-data";

export default function GenericBlogPlaceholder({ blog }: { blog: Blog }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
        {blog.category}
      </span>
      <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
        {blog.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{blog.description}</p>

      <div className="mt-8">
        <ClickableImage
          src={blog.featuredImage}
          alt={blog.title}
          fill
          containerClassName="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100"
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-slate-700">
          🚧 Full article coming soon. In the meantime, try our{" "}
          <Link href={blog.ctaHref} className="font-semibold text-emerald-600 underline">
            interactive calculator
          </Link>{" "}
          to get personalized recommendations.
        </p>
      </div>
    </article>
  );
}

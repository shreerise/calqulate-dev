// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blog/blogs-data";
import FemaleBodyShapesBlog from "@/components/blog/FemaleBodyShapesBlog";
import GenericBlogPlaceholder from "@/components/blog/GenericBlogPlaceholder";
import RelatedBlogs from "@/components/blog/RelatedBlogs";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | Calqulate`,
    description: blog.description,
    alternates: { canonical: `https://calqulate.net/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.featuredImage }],
      type: "article",
    },
  };
}

export default function BlogSlugPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(params.slug);

  const renderContent = () => {
    switch (blog.slug) {
      case "female-body-shapes-explained":
        return <FemaleBodyShapesBlog blog={blog} />;
      default:
        return <GenericBlogPlaceholder blog={blog} />;
    }
  };

  return (
    <>
      {renderContent()}
      <RelatedBlogs blogs={related} />
    </>
  );
}
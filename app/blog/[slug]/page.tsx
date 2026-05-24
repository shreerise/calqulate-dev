// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blog/blogs-data";
import FemaleBodyShapesBlog from "@/components/blog/FemaleBodyShapesBlog";
import BestDressesPearShapeBlog from "@/components/blog/BestDressesPearShapeBlog";
import BestJeansBodyShapeBlog from "@/components/blog/BestJeansBodyShapeBlog";
import BestGymPlanByBodyShapeBlog from "@/components/blog/BestGymPlanByBodyShapeBlog";
import GenericBlogPlaceholder from "@/components/blog/GenericBlogPlaceholder";
import FindYourFaceShapeBlog from "@/components/blog/FindYourFaceShapeBlog";
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

  // SEO-friendly meta for the jeans blog
  const isJeansBlog = blog.slug === "best-jeans-for-your-body-shape";
  const title = isJeansBlog
    ? "Best Jeans for Your Body Shape: Complete Fit Guide for Men & Women"
    : `${blog.title} | Calqulate`;
  const description = isJeansBlog
    ? "Find the best jeans for your body shape with this complete men's and women's fit guide. Compare straight, skinny, bootcut, relaxed, wide-leg, high-rise, and slim-fit jeans to choose the most flattering style for your body type."
    : blog.description;

  return {
    title,
    description,
    alternates: { canonical: `https://calqulate.net/blog/${blog.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: blog.featuredImage }],
      type: "article",
    },
  };
}

export default function BlogSlugPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(params.slug);

  // Route to the right body component per slug.
  const renderContent = () => {
    switch (blog.slug) {
      case "female-body-shapes-explained":
        return <FemaleBodyShapesBlog blog={blog} />;
      case "best-dresses-for-pear-shape":
        return <BestDressesPearShapeBlog blog={blog} />;
      case "best-jeans-for-your-body-shape":
        return <BestJeansBodyShapeBlog blog={blog} />;
      case "best-gym-plan-by-body-shape":
        return <BestGymPlanByBodyShapeBlog blog={blog} />;
      case "find-your-face-shape":
        return <FindYourFaceShapeBlog blog={blog} />;
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

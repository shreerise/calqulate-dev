// app/sitemap.ts
import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blog/blogs-data";

const baseUrl = "https://calqulate.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");
  const urls: MetadataRoute.Sitemap = [];

  function scanDir(dir: string, parentPath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("_")) continue;
      if (entry.name.startsWith("@")) continue;
      if (entry.name.startsWith("[")) continue; // skip dynamic route segments
      if (["api"].includes(entry.name)) continue;

      const isRouteGroup = entry.name.startsWith("(") && entry.name.endsWith(")");

      // Route groups: traverse but don't add to URL path
      const currentPath = isRouteGroup
        ? parentPath
        : `${parentPath}/${entry.name}`;

      if (!isRouteGroup) {
        const pageExists = ["page.tsx", "page.jsx", "page.ts", "page.js"].some(
          (f) => fs.existsSync(path.join(dir, entry.name, f))
        );

        if (pageExists) {
          urls.push({
            url: `${baseUrl}${currentPath}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: currentPath.split("/").length <= 2 ? 0.9 : 0.8,
          });
        }
      }

      // Always recurse into every directory (including route groups)
      scanDir(path.join(dir, entry.name), currentPath);
    }
  }

  // Home page
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  scanDir(appDir);

  // Blog posts — add each individual slug
  for (const blog of blogs) {
    urls.push({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return urls;
}
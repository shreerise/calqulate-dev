// app/sitemap.ts
import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const baseUrl = "https://calqulate.net"; // change to your domain

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");

  const urls: MetadataRoute.Sitemap = [];

  function scanDir(dir: string, parentPath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        !entry.name.startsWith("_") && // ignore private dirs
        !entry.name.startsWith("(") && // ignore group routes
        !["api"].includes(entry.name) // ignore API routes
      ) {
        const currentPath = `${parentPath}/${entry.name}`;
        const pageFile = path.join(dir, entry.name, "page.tsx");

        // If directory has a page.tsx → it's a route
        if (fs.existsSync(pageFile)) {
          urls.push({
            url: `${baseUrl}${currentPath}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }

        // Recursively scan subdirectories
        scanDir(path.join(dir, entry.name), currentPath);
      }
    }
  }

  // Always include home page
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Scan the app directory
  scanDir(appDir);

  return urls;
}

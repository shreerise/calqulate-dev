import withSerwistInit from "@serwist/next";

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  additionalPrecacheEntries: [{ url: "/offline", revision }],
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
  },
  webpack: (config, { dev }) => {
    // Next/webpack's filesystem cache gzips its pack files. On large projects
    // this can throw "RangeError: Array buffer allocation failed" inside zlib
    // (Gunzip/Gzip) and hard-crash the dev server. Writing the cache
    // uncompressed removes that zlib allocation path entirely.
    if (dev && config.cache && typeof config.cache === "object") {
      config.cache = { ...config.cache, compression: false }
    }
    return config
  },
}

export default withSerwist(nextConfig)

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site for Cloudflare Pages: `npm run build` writes everything to out/
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    // A stray package-lock.json in the home folder would otherwise be picked as the workspace root
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

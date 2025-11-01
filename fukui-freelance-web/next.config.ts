import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site generation
  output: 'export',

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Static hosting compatibility
  trailingSlash: true,

  // MDX support
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;

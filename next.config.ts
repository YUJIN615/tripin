import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["unsplash.it", "picsum.photos"],
  },
};

export default nextConfig;

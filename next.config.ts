import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.it",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        // 구글 계정 프로필 이미지
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

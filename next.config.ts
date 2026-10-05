import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next-build",
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repo = "Dinners-X-UIDE";
// Allow overriding via environment variable or default to repo name in production
const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (isProduction ? `/${repo}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

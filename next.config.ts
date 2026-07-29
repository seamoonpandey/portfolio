import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is prerendered, so it ships as plain files on Cloudflare
  // Pages — no adapter, no server runtime.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

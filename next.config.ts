import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a lockfile also exists further up
  // the tree, which otherwise makes Next infer the wrong workspace root).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-02bd9297cf6144c5bb2a3eacbb891bff.r2.dev",
      },
      // Add one entry per R2 account once you set up accounts 2 and 3:
      // { protocol: "https", hostname: "pub-XXXXXXXXXXXXXXXX.r2.dev" },
    ],
  },
};

export default nextConfig;
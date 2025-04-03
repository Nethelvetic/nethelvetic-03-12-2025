import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb" // ou une autre valeur adaptée à vos besoins
    }
  }
};

export default nextConfig;

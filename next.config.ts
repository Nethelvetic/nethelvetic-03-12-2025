import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // active le polling via webpack-dev-middleware
  webpackDevMiddleware: (config: Configuration): Configuration => {
    config.watchOptions = {
      // toutes les 500 ms, vérifier si un fichier a changé
      poll: 500,
      // attendre 200 ms après un changement pour lancer la recompilation
      aggregateTimeout: 200,
      // on peut ignorer node_modules pour éviter trop de bruit
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;

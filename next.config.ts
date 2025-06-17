import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ot61invinu.ufs.sh/**')],
  }
};

export default nextConfig;

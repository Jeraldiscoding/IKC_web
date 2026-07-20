import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/resources/:slug",
        permanent: true,
      },
      {
        source: "/service-professionals",
        destination: "/our-educators",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

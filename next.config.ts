import type { NextConfig } from "next";

const CASE_STUDY_SLUGS = ["seoul-bike", "fresio", "scholub", "slop", "sipsiilban", "savequest"];

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typedRoutes: false,
  async redirects() {
    return CASE_STUDY_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/case-studies/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;

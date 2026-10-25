import type { NextConfig } from "next";

const CASE_STUDY_SLUGS = ["seoul-bike", "fresio", "scholub", "slop", "sipsiilban", "savequest", "petclinic"];

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typedRoutes: false,
  async redirects() {
    return [
      ...CASE_STUDY_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "linkedin.hyeon.im" }],
        destination: "https://www.linkedin.com/in/shinleehyeon",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

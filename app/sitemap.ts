import type { MetadataRoute } from "next";
import { CASE_STUDIES, caseStudyPath } from "@/features/case-study/model/registry";
import { SITE_URL } from "@/shared/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CASE_STUDIES.map((entry) => ({
      url: `${SITE_URL}${caseStudyPath(entry.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

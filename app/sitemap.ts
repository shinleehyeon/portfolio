import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/lib/site-url";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/scholub", priority: 0.8, changeFrequency: "monthly" },
  { path: "/savequest", priority: 0.8, changeFrequency: "monthly" },
  { path: "/seoul-bike", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sipsiilban", priority: 0.8, changeFrequency: "monthly" },
  { path: "/slop", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fresio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/voiceflow", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

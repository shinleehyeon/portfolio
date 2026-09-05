import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/shared/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    theme_color: "#000",
    background_color: "#FFFFFF",
    display: "standalone",
    start_url: "/",
  };
}

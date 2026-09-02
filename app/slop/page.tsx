import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SlopPage } from "@/features/case-study";
import { SLOP_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "SLOP turns the article you're already reading into a short-form video on the same page, via a Chrome extension and generation pipeline.";

export const metadata: Metadata = {
  title: "SLOP",
  description: DESCRIPTION,
  openGraph: { title: "SLOP", description: DESCRIPTION, images: ["/images/slop/slop.jpg"], type: "article" },
  twitter: { card: "summary_large_image", title: "SLOP", description: DESCRIPTION, images: ["/images/slop/slop.jpg"] },
  alternates: { canonical: "/slop" },
};

export default function Page() {
  return (
    <SiteRuntime boot={SLOP_BOOT}>
      <SlopPage />
    </SiteRuntime>
  );
}

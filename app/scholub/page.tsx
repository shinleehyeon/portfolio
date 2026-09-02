import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { ScholubPage } from "@/features/case-study";
import { SCHOLUB_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "Scholub turns the daily flood of AI papers into news you can actually read, with screening, summaries, AI search, and discussion.";

export const metadata: Metadata = {
  title: "Scholub",
  description: DESCRIPTION,
  openGraph: { title: "Scholub", description: DESCRIPTION, images: ["/images/work/scholub.jpg"], type: "article" },
  twitter: { card: "summary_large_image", title: "Scholub", description: DESCRIPTION, images: ["/images/work/scholub.jpg"] },
  alternates: { canonical: "/scholub" },
};

export default function Page() {
  return (
    <SiteRuntime boot={SCHOLUB_BOOT}>
      <ScholubPage />
    </SiteRuntime>
  );
}

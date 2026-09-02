import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { FresioPage } from "@/features/case-study";
import { FRESIO_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "Fresio is a fridge assistant tying a door display to a phone app — add food by barcode or photo, track expiry, and get recipes from what's left.";

export const metadata: Metadata = {
  title: "Fresio",
  description: DESCRIPTION,
  openGraph: { title: "Fresio", description: DESCRIPTION, images: ["/images/fresio/cover.jpg"], type: "article" },
  twitter: { card: "summary_large_image", title: "Fresio", description: DESCRIPTION, images: ["/images/fresio/cover.jpg"] },
  alternates: { canonical: "/fresio" },
};

export default function Page() {
  return (
    <SiteRuntime boot={FRESIO_BOOT}>
      <FresioPage />
    </SiteRuntime>
  );
}

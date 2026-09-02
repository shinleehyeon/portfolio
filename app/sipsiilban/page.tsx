import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SipsiilbanPage } from "@/features/case-study";
import { SIPSIILBAN_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "Sipsiilban is a React Native app for finding nearby convenience stores and franchises on a map and paying with a single QR.";

export const metadata: Metadata = {
  title: "십시일반",
  description: DESCRIPTION,
  openGraph: { title: "십시일반", description: DESCRIPTION, images: ["/images/sipsiilban/cover.jpg"], type: "article" },
  twitter: { card: "summary_large_image", title: "십시일반", description: DESCRIPTION, images: ["/images/sipsiilban/cover.jpg"] },
  alternates: { canonical: "/sipsiilban" },
};

export default function Page() {
  return (
    <SiteRuntime boot={SIPSIILBAN_BOOT}>
      <SipsiilbanPage />
    </SiteRuntime>
  );
}

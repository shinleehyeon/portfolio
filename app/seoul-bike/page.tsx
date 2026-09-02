import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SeoulBikePage } from "@/features/case-study";
import { SEOUL_BIKE_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "A dashboard and map joining Seoul bike-accident records with dedicated-lane data to show on-lane vs off-lane risk, time patterns, and blackspots.";

export const metadata: Metadata = {
  title: "Seoul Bike Accident Insights",
  description: DESCRIPTION,
  openGraph: {
    title: "Seoul Bike Accident Insights",
    description: DESCRIPTION,
    images: ["/images/work-seoul-access.png"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seoul Bike Accident Insights",
    description: DESCRIPTION,
    images: ["/images/work-seoul-access.png"],
  },
  alternates: { canonical: "/seoul-bike" },
};

export default function Page() {
  return (
    <SiteRuntime boot={SEOUL_BIKE_BOOT}>
      <SeoulBikePage />
    </SiteRuntime>
  );
}

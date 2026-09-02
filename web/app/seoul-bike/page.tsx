import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SeoulBikePage } from "@/features/case-study";
import { SEOUL_BIKE_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Seoul Bike Accident Insights" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SEOUL_BIKE_SCRIPTS]}>
      <SeoulBikePage />
    </SiteRuntime>
  );
}

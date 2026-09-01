import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { SeoulBikePage } from "@/components/pages/SeoulBikePage";
import { SEOUL_BIKE_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "Seoul Bike Accident Insights" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SEOUL_BIKE_SCRIPTS]} extraCss={["/case-study.css"]}>
      <SeoulBikePage />
    </SiteRuntime>
  );
}

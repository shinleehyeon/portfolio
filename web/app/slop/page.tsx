import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { SlopPage } from "@/components/pages/SlopPage";
import { SLOP_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "SLOP" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SLOP_SCRIPTS]} extraCss={["/case-study.css"]}>
      <SlopPage />
    </SiteRuntime>
  );
}

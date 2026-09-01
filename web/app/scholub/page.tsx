import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { ScholubPage } from "@/components/pages/ScholubPage";
import { SCHOLUB_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "Scholub" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SCHOLUB_SCRIPTS]} extraCss={["/case-study.css"]}>
      <ScholubPage />
    </SiteRuntime>
  );
}

import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { ScholubPage } from "@/features/case-study";
import { SCHOLUB_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Scholub" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SCHOLUB_SCRIPTS]}>
      <ScholubPage />
    </SiteRuntime>
  );
}

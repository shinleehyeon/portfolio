import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { ScholubPage } from "@/features/case-study";
import { SCHOLUB_BOOT } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Scholub" };

export default function Page() {
  return (
    <SiteRuntime boot={SCHOLUB_BOOT}>
      <ScholubPage />
    </SiteRuntime>
  );
}

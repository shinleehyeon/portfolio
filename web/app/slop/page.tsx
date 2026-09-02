import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SlopPage } from "@/features/case-study";
import { SLOP_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "SLOP" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SLOP_SCRIPTS]}>
      <SlopPage />
    </SiteRuntime>
  );
}

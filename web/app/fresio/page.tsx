import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { FresioPage } from "@/features/case-study";
import { FRESIO_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Fresio" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...FRESIO_SCRIPTS]}>
      <FresioPage />
    </SiteRuntime>
  );
}

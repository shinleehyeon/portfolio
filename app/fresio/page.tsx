import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { FresioPage } from "@/features/case-study";
import { FRESIO_BOOT } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Fresio" };

export default function Page() {
  return (
    <SiteRuntime boot={FRESIO_BOOT}>
      <FresioPage />
    </SiteRuntime>
  );
}

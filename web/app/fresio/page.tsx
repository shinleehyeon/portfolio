import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { FresioPage } from "@/components/pages/FresioPage";
import { FRESIO_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "Fresio" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...FRESIO_SCRIPTS]} extraCss={["/case-study.css"]}>
      <FresioPage />
    </SiteRuntime>
  );
}

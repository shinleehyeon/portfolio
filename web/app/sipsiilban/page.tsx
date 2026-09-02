import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SipsiilbanPage } from "@/features/case-study";
import { SIPSIILBAN_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "십시일반" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SIPSIILBAN_SCRIPTS]}>
      <SipsiilbanPage />
    </SiteRuntime>
  );
}

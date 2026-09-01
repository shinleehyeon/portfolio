import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { SipsiilbanPage } from "@/components/pages/SipsiilbanPage";
import { SIPSIILBAN_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "십시일반" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SIPSIILBAN_SCRIPTS]} extraCss={["/case-study.css"]}>
      <SipsiilbanPage />
    </SiteRuntime>
  );
}

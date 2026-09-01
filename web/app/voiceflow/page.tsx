import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { VoiceflowPage } from "@/components/pages/VoiceflowPage";
import { VOICEFLOW_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "Voiceflow" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...VOICEFLOW_SCRIPTS]} extraCss={["/case-study.css"]}>
      <VoiceflowPage />
    </SiteRuntime>
  );
}

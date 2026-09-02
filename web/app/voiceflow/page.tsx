import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { VoiceflowPage } from "@/features/case-study";
import { VOICEFLOW_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "Voiceflow" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...VOICEFLOW_SCRIPTS]}>
      <VoiceflowPage />
    </SiteRuntime>
  );
}

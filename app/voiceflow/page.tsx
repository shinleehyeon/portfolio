import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { VoiceflowPage } from "@/features/case-study";
import { VOICEFLOW_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "Voiceflow is a platform for building AI agents — customer support bots, voice assistants, and multi-channel conversational experiences.";

export const metadata: Metadata = {
  title: "Voiceflow",
  description: DESCRIPTION,
  openGraph: { title: "Voiceflow", description: DESCRIPTION, images: ["/images/vf/vf-main.png"], type: "article" },
  twitter: { card: "summary_large_image", title: "Voiceflow", description: DESCRIPTION, images: ["/images/vf/vf-main.png"] },
  alternates: { canonical: "/voiceflow" },
};

export default function Page() {
  return (
    <SiteRuntime boot={VOICEFLOW_BOOT}>
      <VoiceflowPage />
    </SiteRuntime>
  );
}

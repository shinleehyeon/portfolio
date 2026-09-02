import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SaveQuestPage } from "@/features/case-study";
import { SAVEQUEST_SCRIPTS } from "@/shared/lib/scripts";

export const metadata: Metadata = { title: "SaveQuest" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SAVEQUEST_SCRIPTS]}>
      <SaveQuestPage />
    </SiteRuntime>
  );
}

import type { Metadata } from "next";
import { SiteRuntime } from "@/components/SiteRuntime";
import { SaveQuestPage } from "@/components/pages/SaveQuestPage";
import { SAVEQUEST_SCRIPTS } from "@/lib/scripts";

export const metadata: Metadata = { title: "SaveQuest" };

export default function Page() {
  return (
    <SiteRuntime scripts={[...SAVEQUEST_SCRIPTS]} extraCss={["/case-study.css"]}>
      <SaveQuestPage />
    </SiteRuntime>
  );
}

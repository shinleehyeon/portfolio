import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { SaveQuestPage } from "@/features/case-study";
import { SAVEQUEST_BOOT } from "@/shared/lib/scripts";

const DESCRIPTION =
  "SaveQuest turns saving into a daily quest, reading card payments as spend-limit challenges with XP, coins, and rankings.";

export const metadata: Metadata = {
  title: "SaveQuest",
  description: DESCRIPTION,
  openGraph: { title: "SaveQuest", description: DESCRIPTION, images: ["/images/work-savequest.jpg"], type: "article" },
  twitter: { card: "summary_large_image", title: "SaveQuest", description: DESCRIPTION, images: ["/images/work-savequest.jpg"] },
  alternates: { canonical: "/savequest" },
};

export default function Page() {
  return (
    <SiteRuntime boot={SAVEQUEST_BOOT}>
      <SaveQuestPage />
    </SiteRuntime>
  );
}

"use client";

import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { SAVEQUEST_COPY } from "@/lib/savequest-copy";

export function SaveQuestPage() {
  return <CaseStudyTemplate copy={SAVEQUEST_COPY} />;
}

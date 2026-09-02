"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { SAVEQUEST_COPY } from "@/features/case-study/model/copy/savequest";

export function SaveQuestPage() {
  return <CaseStudyTemplate copy={SAVEQUEST_COPY} />;
}

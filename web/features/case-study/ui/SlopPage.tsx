"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { SLOP_COPY } from "@/features/case-study/model/copy/slop";

export function SlopPage() {
  return <CaseStudyTemplate copy={SLOP_COPY} />;
}

"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { SCHOLUB_COPY } from "@/features/case-study/model/copy/scholub";

export function ScholubPage() {
  return <CaseStudyTemplate copy={SCHOLUB_COPY} />;
}

"use client";

import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { SCHOLUB_COPY } from "@/lib/scholub-copy";

export function ScholubPage() {
  return <CaseStudyTemplate copy={SCHOLUB_COPY} />;
}

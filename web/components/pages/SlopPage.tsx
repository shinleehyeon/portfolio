"use client";

import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { SLOP_COPY } from "@/lib/slop-copy";

export function SlopPage() {
  return <CaseStudyTemplate copy={SLOP_COPY} />;
}

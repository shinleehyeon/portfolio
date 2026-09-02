"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { FRESIO_COPY } from "@/features/case-study/model/copy/fresio";

export function FresioPage() {
  return <CaseStudyTemplate copy={FRESIO_COPY} />;
}

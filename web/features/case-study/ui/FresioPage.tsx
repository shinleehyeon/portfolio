"use client";

import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { FRESIO_COPY } from "@/lib/fresio-copy";

export function FresioPage() {
  return <CaseStudyTemplate copy={FRESIO_COPY} />;
}

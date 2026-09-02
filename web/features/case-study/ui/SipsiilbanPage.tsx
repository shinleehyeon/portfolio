"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { SIPSIILBAN_COPY } from "@/features/case-study/model/copy/sipsiilban";

export function SipsiilbanPage() {
  return <CaseStudyTemplate copy={SIPSIILBAN_COPY} />;
}

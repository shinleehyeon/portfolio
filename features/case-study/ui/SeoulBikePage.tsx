"use client";

import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { SEOUL_BIKE_COPY } from "@/features/case-study/model/copy/seoul-bike";

export function SeoulBikePage() {
  return <CaseStudyTemplate copy={SEOUL_BIKE_COPY} />;
}

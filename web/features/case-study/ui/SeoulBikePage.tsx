"use client";

import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { SEOUL_BIKE_COPY } from "@/lib/seoul-bike-copy";

export function SeoulBikePage() {
  return <CaseStudyTemplate copy={SEOUL_BIKE_COPY} />;
}

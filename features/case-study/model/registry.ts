import type { CaseStudyEntry } from "@/features/case-study/model/types";
import { FRESIO_COPY, FRESIO_SEO, FRESIO_WORK } from "@/features/case-study/model/copy/fresio";
import { SAVEQUEST_COPY, SAVEQUEST_SEO, SAVEQUEST_WORK } from "@/features/case-study/model/copy/savequest";
import { SCHOLUB_COPY, SCHOLUB_SEO, SCHOLUB_WORK } from "@/features/case-study/model/copy/scholub";
import { SEOUL_BIKE_COPY, SEOUL_BIKE_SEO, SEOUL_BIKE_WORK } from "@/features/case-study/model/copy/seoul-bike";
import { SIPSIILBAN_COPY, SIPSIILBAN_SEO, SIPSIILBAN_WORK } from "@/features/case-study/model/copy/sipsiilban";
import { SLOP_COPY, SLOP_SEO, SLOP_WORK } from "@/features/case-study/model/copy/slop";

export function caseStudyPath(slug: string) {
  return `/case-studies/${slug}`;
}

export const CASE_STUDIES: CaseStudyEntry[] = [
  { slug: "seoul-bike", seo: SEOUL_BIKE_SEO, work: SEOUL_BIKE_WORK, copy: SEOUL_BIKE_COPY },
  { slug: "fresio", seo: FRESIO_SEO, work: FRESIO_WORK, copy: FRESIO_COPY },
  { slug: "scholub", seo: SCHOLUB_SEO, work: SCHOLUB_WORK, copy: SCHOLUB_COPY },
  { slug: "slop", seo: SLOP_SEO, work: SLOP_WORK, copy: SLOP_COPY },
  { slug: "sipsiilban", seo: SIPSIILBAN_SEO, work: SIPSIILBAN_WORK, copy: SIPSIILBAN_COPY },
  { slug: "savequest", seo: SAVEQUEST_SEO, work: SAVEQUEST_WORK, copy: SAVEQUEST_COPY },
];

const BY_SLUG = Object.fromEntries(CASE_STUDIES.map((entry) => [entry.slug, entry]));

export function getCaseStudy(slug: string) {
  return BY_SLUG[slug];
}

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((entry) => entry.slug);

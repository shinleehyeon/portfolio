import type { CaseStudySlide } from "@/features/case-study/ui/CaseStudyGallery";

export type Lang = "ko" | "en";

export type CaseStudyBlock =
  | {
      type: "hero";
      title: string;
      year: string;
      intro: string;
      tags: { label: string; tip?: string }[];
    }
  | { type: "wideImage"; src: string; alt: string }
  | { type: "phones"; images: { src: string; alt: string }[] }
  | {
      type: "focusList";
      id?: string;
      heading: string;
      body: string[];
      items: { title: string; desc: string }[];
    }
  | {
      type: "scopeList";
      heading: string;
      body: string;
      groups: { title: string; items: string[] }[];
    }
  | { type: "textSection"; id: string; heading: string; body: string[] }
  | { type: "treeDiagram"; id: string }
  | { type: "video"; src: string; poster?: string; hint?: string; portrait?: boolean }
  | { type: "product"; heading: string; entries: { label: string; body: string }[] }
  | { type: "gallery"; slides: CaseStudySlide[]; variant?: "phone"; showDots?: boolean };

export type CaseStudyProject = {
  slug: string;
  title: string;
  nav: { id: string; label: string }[];
  summarize: { label: string; paragraphs: [string, string, string] };
  blocks: CaseStudyBlock[];
};

export type CaseStudyCopy = Record<Lang, CaseStudyProject>;

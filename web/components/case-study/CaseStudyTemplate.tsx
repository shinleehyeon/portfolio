"use client";

import { useState } from "react";
import { CaseStudyChrome } from "./CaseStudyChrome";
import { CaseStudyBlockRenderer } from "./CaseStudyBlockRenderer";
import type { CaseStudyCopy, Lang } from "@/lib/case-study/types";

export function CaseStudyTemplate({ copy }: { copy: CaseStudyCopy }) {
  const [lang, setLang] = useState<Lang>("ko");
  const project = copy[lang];

  return (
    <CaseStudyChrome lang={lang} onLangChange={setLang} navItems={project.nav} summarize={project.summarize}>
      {project.blocks.map((block, idx) => (
        <CaseStudyBlockRenderer key={idx} block={block} />
      ))}
    </CaseStudyChrome>
  );
}

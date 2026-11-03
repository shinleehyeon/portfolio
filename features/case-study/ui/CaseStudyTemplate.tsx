"use client";

import "@/features/case-study/styles/index.css";
import { useEffect, useState } from "react";
import { CaseStudyChrome } from "./CaseStudyChrome";
import { CaseStudyBlockRenderer } from "./CaseStudyBlockRenderer";
import { CaseStudyFileTree } from "./CaseStudyFileTree";
import { CaseStudyOrbit } from "./CaseStudyOrbit";
import type { CaseStudyCopy, Lang } from "@/features/case-study/model/types";
import { useReveals } from "@/shared/lib/use-reveals";

export function CaseStudyTemplate({ copy }: { copy: CaseStudyCopy }) {
  const [lang, setLang] = useState<Lang>("ko");
  const project = copy[lang];
  useReveals(`${project.slug}:${lang}`);

  useEffect(() => {
    document.body.classList.add("fonts-ready");
  }, []);

  return (
    <CaseStudyChrome lang={lang} onLangChange={setLang} navItems={project.nav} summarize={project.summarize}>
      {project.blocks.map((block, idx) => {
        if (block.type === "fileTree") {
          return (
            <section id={block.id} key={idx} className="cs-section">
              <div className="centered cs-repo-stack">
                <CaseStudyFileTree root={block.root} heading={block.heading} tree={block.tree} />
                <CaseStudyOrbit slug={project.slug} lang={lang} />
              </div>
            </section>
          );
        }
        return <CaseStudyBlockRenderer key={idx} block={block} />;
      })}
    </CaseStudyChrome>
  );
}

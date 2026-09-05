"use client";

import { useEffect, useRef, useState } from "react";
import type { TreeNode } from "@/features/case-study/model/types";
import { mountTree } from "./mount-tree";

export function CaseStudyTree({
  id,
  tree,
  collapseAt,
}: {
  id: string;
  tree: TreeNode;
  collapseAt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.dataset.theme ?? "");
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return mountTree(el, tree, { collapseAt, depthGap: 240, sibGap: 10 });
  }, [tree, collapseAt, theme]);

  return <div className="cs-diagram cs-tree reveal-scroll" id={id} ref={ref} />;
}

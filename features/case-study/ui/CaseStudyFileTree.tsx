"use client";

import { useState } from "react";
import type { FileTreeItem } from "@/features/case-study/model/types";

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] };

function toNodes(items: FileTreeItem[], prefix: string): FileNode[] {
  return items.map((item) => {
    const name = item.name.replace(/\/$/, "");
    const path = prefix ? `${prefix}/${name}` : name;
    if (item.children?.length) {
      return { type: "folder", name, path, children: toNodes(item.children, path) };
    }
    return { type: "file", name, path };
  });
}

function ChevronRightIcon() {
  return (
    <svg className="cs-tv__chev" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="cs-tv__ico" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="cs-tv__ico" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileTreeNode({
  node,
  selected,
  onSelect,
}: {
  node: FileNode;
  selected: string;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = useState(true);

  switch (node.type) {
    case "folder":
      return (
        <div>
          <button type="button" className="cs-tv__item" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <ChevronRightIcon />
            <FolderIcon />
            {node.name}
          </button>
          {open ? (
            <div className="cs-tv__kids">
              {node.children.map((child) => (
                <FileTreeNode key={child.path} node={child} selected={selected} onSelect={onSelect} />
              ))}
            </div>
          ) : null}
        </div>
      );
    case "file":
      return (
        <button
          type="button"
          className={`cs-tv__item${selected === node.path ? " is-selected" : ""}`}
          aria-current={selected === node.path ? "true" : undefined}
          onClick={() => onSelect(node.path)}
        >
          <FileIcon />
          {node.name}
        </button>
      );
    default: {
      const unreachable: never = node;
      return unreachable;
    }
  }
}

export function CaseStudyFileTree({
  root,
  tree,
}: {
  root: string;
  heading?: string;
  tree: FileTreeItem[];
}) {
  const [selected, setSelected] = useState("");
  const nodes: FileNode[] = [
    { type: "folder", name: root, path: root, children: toNodes(tree, root) },
  ];

  return (
    <div className="cs-tv reveal-scroll">
      <div className="cs-tv__tree">
        {nodes.map((node) => (
          <FileTreeNode key={node.path} node={node} selected={selected} onSelect={setSelected} />
        ))}
      </div>
    </div>
  );
}

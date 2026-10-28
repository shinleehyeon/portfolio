"use client";

import { useMemo, useState } from "react";
import type { FileTreeItem } from "@/features/case-study/model/types";
import { FileTypeIcon } from "@/features/case-study/ui/FileTypeIcon";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`cs-tv__chev${open ? " is-open" : ""}`} viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="cs-tv__ico cs-tv__ico--folder" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function pathOf(prefix: string, name: string) {
  return prefix ? `${prefix}/${name.replace(/\/$/, "")}` : name.replace(/\/$/, "");
}

function isFolder(item: FileTreeItem) {
  return item.name.endsWith("/") || Boolean(item.children?.length);
}

function Node({
  item,
  depth,
  prefix,
  selected,
  onSelect,
}: {
  item: FileTreeItem;
  depth: number;
  prefix: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const folder = isFolder(item);
  const expandable = Boolean(item.children?.length);
  const [open, setOpen] = useState(true);
  const label = item.name.replace(/\/$/, "");
  const id = pathOf(prefix, item.name);
  const active = selected === id;

  return (
    <div className="cs-tv__item" role="treeitem" aria-expanded={expandable ? open : undefined} aria-selected={active}>
      <div
        className={`cs-tv__row${active ? " is-selected" : ""}`}
        onClick={() => {
          onSelect(id);
          if (expandable) setOpen((value) => !value);
        }}
      >
        <span className="cs-tv__left" style={{ paddingLeft: 8 + depth * 22 }}>
          {expandable ? (
            <button
              type="button"
              className="cs-tv__toggle"
              aria-label={open ? "Collapse" : "Expand"}
              onClick={(event) => {
                event.stopPropagation();
                setOpen((value) => !value);
              }}
            >
              <Chevron open={open} />
            </button>
          ) : (
            <span className="cs-tv__toggle cs-tv__toggle--empty" />
          )}
          {folder ? <FolderIcon /> : <FileTypeIcon name={label} />}
          <span className="cs-tv__label">{label}</span>
        </span>
        {item.note ? <span className="cs-tv__note"># {item.note}</span> : <span />}
      </div>
      {expandable && open ? (
        <div className="cs-tv__kids" role="group">
          {item.children!.map((child) => (
            <Node key={`${id}/${child.name}`} item={child} depth={depth + 1} prefix={id} selected={selected} onSelect={onSelect} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CaseStudyFileTree({
  root,
  heading,
  tree,
}: {
  root: string;
  heading?: string;
  tree: FileTreeItem[];
}) {
  const firstFile = useMemo(() => {
    const walk = (items: FileTreeItem[], prefix: string): string | null => {
      for (const item of items) {
        const id = pathOf(prefix, item.name);
        if (!item.children?.length) return id;
        const nested = walk(item.children, id);
        if (nested) return nested;
      }
      return null;
    };
    return walk(tree, root) ?? root;
  }, [root, tree]);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(firstFile);

  return (
    <div className="cs-tv reveal-scroll">
      {heading ? <div className="cs-tv__title">{heading}</div> : null}
      <div className="cs-tv__tree" role="tree" aria-label={`${root} repository`}>
        <div className="cs-tv__item" role="treeitem" aria-expanded={open}>
          <div className={`cs-tv__row${selected === root ? " is-selected" : ""}`} onClick={() => setSelected(root)}>
            <span className="cs-tv__left">
              <button
                type="button"
                className="cs-tv__toggle"
                aria-label={open ? "Collapse" : "Expand"}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen((value) => !value);
                }}
              >
                <Chevron open={open} />
              </button>
              <FolderIcon />
              <span className="cs-tv__label">{root}</span>
            </span>
            <span />
          </div>
          {open
            ? tree.map((item) => (
                <Node key={item.name} item={item} depth={1} prefix={root} selected={selected} onSelect={setSelected} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

const START = 1.15;
const END = 0.3;
const DIM = 0.2;

function wrapText(root: HTMLElement) {
  const segments: HTMLElement[] = [];

  const walk = (el: HTMLElement) => {
    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        if (!text.length) continue;
        const frag = document.createDocumentFragment();
        for (const char of text) {
          if (char === " " || char === "\n" || char === "\t") {
            frag.appendChild(document.createTextNode(char));
            continue;
          }
          const span = document.createElement("span");
          span.className = "about__reveal-ch";
          span.textContent = char;
          span.style.opacity = String(DIM);
          frag.appendChild(span);
          segments.push(span);
        }
        node.parentNode?.replaceChild(frag, node);
        continue;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const child = node as HTMLElement;
        if (child.matches("input, label, button, img")) continue;
        walk(child);
      }
    }
  };

  walk(root);
  return segments;
}

export function AboutTextReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.dataset.revealed === "1") return;
    root.dataset.revealed = "1";

    const segments = wrapText(root);
    if (!segments.length) return;

    let visible = false;
    let frame = 0;

    const paint = () => {
      if (!visible) return;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPx = vh * START;
      const endPx = vh * END;
      const range = rect.height + (startPx - endPx);
      const progress = Math.min(Math.max((startPx - rect.top) / range, 0), 1);
      const lit = progress * segments.length;
      const count = Math.floor(lit);

      segments.forEach((seg, index) => {
        if (index < count) {
          seg.style.opacity = "1";
        } else if (index === count) {
          const frac = lit - count;
          seg.style.opacity = String(DIM + frac * (1 - DIM));
        } else {
          seg.style.opacity = String(DIM);
        }
      });
    };

    const tick = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tick();
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(root);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    tick();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div ref={rootRef} className="about__content">
      {children}
    </div>
  );
}

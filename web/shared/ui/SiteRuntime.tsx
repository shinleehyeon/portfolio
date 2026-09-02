"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import type { SiteBoot } from "@/shared/lib/scripts";

function loadScript(src: string, force: boolean) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelectorAll<HTMLScriptElement>(`script[data-site-src="${src}"]`);
    if (!force && existing.length) {
      resolve();
      return;
    }
    if (force) existing.forEach((el) => el.remove());
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.dataset.siteSrc = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

function activateReveals() {
  document.querySelectorAll(".reveal-load").forEach((node) => {
    node.classList.add("reveal-load--active");
  });
  document.querySelectorAll(".reveal-scroll").forEach((node) => {
    node.classList.add("reveal-scroll--visible");
  });
}

export function SiteRuntime({ children, boot }: { children: ReactNode; boot: SiteBoot }) {
  const key = `${boot.cdn.join("|")}|${boot.run.join("|")}`;

  useLayoutEffect(() => {
    activateReveals();
  }, [key]);

  useEffect(() => {
    document.body.classList.add("fonts-ready");
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        for (const src of boot.cdn) {
          if (cancelled) return;
          await loadScript(src, false);
        }
        for (const src of boot.run) {
          if (cancelled) return;
          await loadScript(src, true);
        }
      })();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [boot, key]);

  return <>{children}</>;
}

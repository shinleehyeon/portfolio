"use client";

import { useEffect, useRef, type ReactNode } from "react";

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-site-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.dataset.siteSrc = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

export function SiteRuntime({
  children,
  scripts,
  extraCss,
}: {
  children: ReactNode;
  scripts: string[];
  extraCss?: string[];
}) {
  const started = useRef(false);

  useEffect(() => {
    extraCss?.forEach((href) => {
      if (document.querySelector(`link[data-site-css="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.siteCss = href;
      document.head.appendChild(link);
    });
  }, [extraCss]);

  useEffect(() => {
    document.body.classList.add("fonts-ready");
    if (started.current) return;
    started.current = true;
    let cancelled = false;
    (async () => {
      for (const src of scripts) {
        if (cancelled) return;
        await loadScript(src);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [scripts]);

  return <>{children}</>;
}

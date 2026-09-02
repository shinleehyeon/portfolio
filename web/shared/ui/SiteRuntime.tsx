"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";

function isRuntimeSrc(src: string) {
  return /\/(js\/home-runtime|js\/voiceflow-runtime|wheel|trees)\.js(\?|$)/.test(src);
}

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

export function SiteRuntime({
  children,
  scripts,
  extraCss,
}: {
  children: ReactNode;
  scripts: string[];
  extraCss?: string[];
}) {
  const scriptKey = scripts.join("|");

  useLayoutEffect(() => {
    activateReveals();
  }, [scriptKey]);

  useEffect(() => {
    document.body.classList.add("fonts-ready");
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        for (const src of scripts) {
          if (cancelled) return;
          if (isRuntimeSrc(src)) continue;
          await loadScript(src, false);
        }
        for (const src of scripts) {
          if (cancelled) return;
          if (!isRuntimeSrc(src)) continue;
          await loadScript(src, true);
        }
      })();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [scriptKey, scripts]);

  return (
    <>
      {extraCss?.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {children}
    </>
  );
}

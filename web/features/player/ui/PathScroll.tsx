"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { jumpToTop, restoreHomeScroll } from "@/shared/lib/home-scroll";

export function PathScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (pathname !== "/") {
      jumpToTop();
      return;
    }
    if (restoreHomeScroll()) return;
    const retry = window.setTimeout(() => restoreHomeScroll(), 50);
    const last = window.setTimeout(() => restoreHomeScroll(true), 200);
    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(last);
    };
  }, [pathname]);

  return null;
}

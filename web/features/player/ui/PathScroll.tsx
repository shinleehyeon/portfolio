"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { jumpToTop, restoreHomeScroll } from "@/shared/lib/home-scroll";

export function PathScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (pathname === "/") restoreHomeScroll();
    else jumpToTop();
  }, [pathname]);

  return null;
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { saveHomeScroll } from "@/shared/lib/home-scroll";
import { isSiteUrl } from "@/shared/lib/site-origin";
import { close as engineClose } from "@/features/player/model/youtube-engine";

export function ClientNav() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (!isSiteUrl(url) || anchor.target === "_blank") {
        if (!isSiteUrl(url) && anchor.target !== "_blank") engineClose();
        return;
      }
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      if (url.pathname !== "/") saveHomeScroll();
      router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}

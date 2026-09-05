import { useLayoutEffect } from "react";

export function activateReveals() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll<HTMLElement>(".reveal-load").forEach((node) => {
    if (reduced) {
      node.classList.add("reveal-load--active");
      return;
    }
    const delay = Number.parseInt(node.dataset.revealDelay || "0", 10);
    window.setTimeout(() => node.classList.add("reveal-load--active"), delay);
  });

  document.querySelectorAll<HTMLElement>(".reveal-scroll").forEach((node) => {
    if (reduced) {
      node.classList.add("reveal-scroll--visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-scroll--visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
  });
}

export function useReveals(key: string) {
  useLayoutEffect(() => {
    activateReveals();
  }, [key]);
}

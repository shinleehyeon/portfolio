"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import bluePompomData from "@/shared/lottie/blue-pompom.json";

const POMPOM_WIDTH = 160;

export function PompomMascots({
  followMouse = true,
  width = POMPOM_WIDTH,
}: {
  followMouse?: boolean;
  width?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const height = Math.round((width * 90) / POMPOM_WIDTH);

  useEffect(() => {
    if (!followMouse) return;
    const el = wrapRef.current;
    const track = el?.parentElement;
    if (!el || !track) return;

    let raf = 0;
    const handleMouseMove = (t: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const trackRect = track.getBoundingClientRect();
        const nameEl = document.querySelector(".taped-footer__name");
        const minX = nameEl ? nameEl.getBoundingClientRect().left - trackRect.left : 0;

        const rawX = t.clientX - trackRect.left - width / 2;
        const maxX = trackRect.width * 0.4 - width / 2;
        const x = Math.max(minX, Math.min(rawX, maxX));
        el.style.transform = `translateX(${x}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [followMouse, width]);

  return (
    <div className={followMouse ? "footer-pompom" : "now-playing__pompom"} aria-hidden="true">
      <div className="pompom-row BluePomPomWrap" ref={wrapRef}>
        <Lottie animationData={bluePompomData} loop autoplay style={{ width, height }} />
      </div>
    </div>
  );
}

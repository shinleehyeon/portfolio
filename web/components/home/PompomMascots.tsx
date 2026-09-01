"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import bluePompomData from "@/lib/lottie/blue-pompom.json";

const POMPOM_WIDTH = 160;

export function PompomMascots() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        // Character's x must always match the mouse's x exactly (centered on cursor),
        // but only between the "신이현" name's x and 40% of the footer's width.
        const rawX = t.clientX - trackRect.left - POMPOM_WIDTH / 2;
        const maxX = trackRect.width * 0.4 - POMPOM_WIDTH / 2;
        const x = Math.max(minX, Math.min(rawX, maxX));
        el.style.transform = `translateX(${x}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="footer-pompom" aria-hidden="true">
      <div className="pompom-row BluePomPomWrap" ref={wrapRef}>
        <Lottie animationData={bluePompomData} loop autoplay style={{ width: POMPOM_WIDTH, height: 90 }} />
      </div>
    </div>
  );
}

"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

const AMP = 2;

export function WorkTilt({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const hover = useRef(false);
  const current = useRef({ x: 0, y: 0, s: 1 });
  const target = useRef({ x: 0, y: 0, s: 1 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = () => {
    const card = cardRef.current;
    if (!card) return;
    const c = current.current;
    const t = target.current;
    c.x = lerp(c.x, t.x, 0.08);
    c.y = lerp(c.y, t.y, 0.08);
    c.s = lerp(c.s, t.s, 0.04);
    if (Math.abs(c.x - t.x) < 0.01 && Math.abs(c.y - t.y) < 0.01 && Math.abs(c.s - t.s) < 0.001 && !hover.current) {
      c.x = t.x;
      c.y = t.y;
      c.s = t.s;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      if (glareRef.current) glareRef.current.style.opacity = "0";
      raf.current = null;
      return;
    }
    card.style.transform = `perspective(1000px) rotateX(${c.x.toFixed(2)}deg) rotateY(${c.y.toFixed(2)}deg) scale(${c.s.toFixed(4)})`;
    raf.current = requestAnimationFrame(tick);
  };

  const startTick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    target.current.x = -((event.clientY - r.top) / r.height - 0.5) * AMP;
    target.current.y = ((event.clientX - r.left) / r.width - 0.5) * AMP;
    if (glareRef.current) {
      const gx = ((event.clientX - r.left) / r.width) * 100;
      const gy = ((event.clientY - r.top) / r.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.056) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
    startTick();
  };

  return (
    <div
      ref={cardRef}
      className="case-study__tilt"
      onMouseMove={onMove}
      onMouseEnter={() => {
        hover.current = true;
        target.current.s = 1.01;
        if (cardRef.current) cardRef.current.style.transition = "none";
        startTick();
      }}
      onMouseLeave={() => {
        hover.current = false;
        target.current.x = 0;
        target.current.y = 0;
        target.current.s = 1;
        if (glareRef.current) glareRef.current.style.opacity = "0";
        startTick();
      }}
    >
      <div className="tilt-glare" ref={glareRef}></div>
      {children}
    </div>
  );
}

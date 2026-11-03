"use client";

import { useEffect, useRef } from "react";
import { startHeroAgent } from "@/features/home/runtime/hero-agent.js";

export function HeroAgent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return startHeroAgent(root);
  }, []);

  return (
    <div className="hero-agent highlights-agent" ref={rootRef} aria-hidden="true">
      <div className="hero-agent__face">
        <div className="hero-agent__src" data-face-src="true"></div>
        <canvas className="hero-agent__gl"></canvas>
      </div>
    </div>
  );
}

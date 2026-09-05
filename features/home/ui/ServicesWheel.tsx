"use client";

import { useEffect, useRef } from "react";
import { initWheel } from "@/features/home/runtime/init-wheel.js";

export function ServicesWheel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initWheel(root);
  }, []);

  return (
    <div className="sp-card sp-card--services" ref={rootRef}>
      <div className="sp-services__wheel" aria-hidden="true">
        <div className="sp-wheel__track"></div>
      </div>
      <div className="sp-services__arrow" aria-hidden="true">
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
          <path d="M1 7.5H19M12 1l7 6.5-7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="sp-services__pill-stack" id="pillStack">
        <div className="sp-stack__card" id="stackTop2"></div>
        <div className="sp-stack__card" id="stackTop1"></div>
        <div className="sp-stack__card sp-stack__card--active" id="stackActive">
          <span></span>
        </div>
        <div className="sp-stack__card" id="stackBot1"></div>
        <div className="sp-stack__card" id="stackBot2"></div>
      </div>
    </div>
  );
}

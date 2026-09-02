"use client";

import { useEffect } from "react";

export function DotCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const dot = document.createElement("div");
    dot.className = "dot-cursor";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);
    document.documentElement.classList.add("dot-cursor-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let shown = false;
    let raf = 0;
    const HOT = 'a,button,[role="button"],input,textarea,select,label,summary,[data-cursor="hot"]';

    function render() {
      raf = 0;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    }
    function tick() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        dot.classList.add("on");
      }
      dot.classList.toggle("hot", !!(e.target instanceof Element && e.target.closest(HOT)));
      tick();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", () => dot.classList.add("down"));
    window.addEventListener("pointerup", () => dot.classList.remove("down"));
    const onLeave = () => {
      shown = false;
      dot.classList.remove("on");
    };
    const onEnter = () => {
      shown = true;
      dot.classList.add("on");
    };
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("dot-cursor-on");
      dot.remove();
    };
  }, []);

  return null;
}

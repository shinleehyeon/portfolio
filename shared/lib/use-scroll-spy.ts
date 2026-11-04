import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], offsetRatio = 0.3) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    if (!list.length) return;

    let tops: number[] = [];
    let frame = 0;

    const measure = () => {
      tops = list.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY + window.innerHeight * offsetRatio;
      let next = list[0];
      for (let i = 0; i < list.length; i++) {
        if (tops[i] <= y) next = list[i];
      }
      setActive(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, offsetRatio]);

  return active;
}

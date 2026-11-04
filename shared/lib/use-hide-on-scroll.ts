import { useEffect, useState } from "react";

export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > lastY && y > 60) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return hidden;
}

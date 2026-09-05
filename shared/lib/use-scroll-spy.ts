import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], offsetRatio = 0.3) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    if (!list.length) return;

    const update = () => {
      const y = window.scrollY + window.innerHeight * offsetRatio;
      let next = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) next = id;
      }
      setActive(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [key, offsetRatio]);

  return active;
}

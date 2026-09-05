export const GSAP_CORE = [
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
] as const;

export type SiteBoot = {
  cdn: readonly string[];
  run: readonly string[];
};

export const HOME_BOOT: SiteBoot = {
  cdn: GSAP_CORE,
  run: ["/runtime/home-runtime.js"],
};

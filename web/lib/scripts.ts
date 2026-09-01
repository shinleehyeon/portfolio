export const GSAP_CORE = [
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
] as const;

export const GSAP_CASE = [
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
] as const;

export const HOME_SCRIPTS = [...GSAP_CORE, "/wheel.js", "/js/home-runtime.js"];
export const VOICEFLOW_SCRIPTS = [
  "https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js",
  "/trees.js",
  ...GSAP_CASE,
  "/js/voiceflow-runtime.js",
];
export const SCHOLUB_SCRIPTS = VOICEFLOW_SCRIPTS;
export const SEOUL_BIKE_SCRIPTS = VOICEFLOW_SCRIPTS;
export const SLOP_SCRIPTS = VOICEFLOW_SCRIPTS;
export const SIPSIILBAN_SCRIPTS = SLOP_SCRIPTS;
export const SAVEQUEST_SCRIPTS = VOICEFLOW_SCRIPTS;

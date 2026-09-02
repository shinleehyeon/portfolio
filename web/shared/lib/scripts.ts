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

export type SiteBoot = {
  cdn: readonly string[];
  run: readonly string[];
};

export const HOME_BOOT: SiteBoot = {
  cdn: GSAP_CORE,
  run: ["/runtime/wheel.js", "/runtime/home-runtime.js"],
};

export const CASE_STUDY_BOOT: SiteBoot = {
  cdn: ["https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js", ...GSAP_CASE],
  run: ["/runtime/trees.js", "/runtime/voiceflow-runtime.js"],
};

export const VOICEFLOW_BOOT = CASE_STUDY_BOOT;
export const SCHOLUB_BOOT = CASE_STUDY_BOOT;
export const SEOUL_BIKE_BOOT = CASE_STUDY_BOOT;
export const SLOP_BOOT = CASE_STUDY_BOOT;
export const SIPSIILBAN_BOOT = CASE_STUDY_BOOT;
export const SAVEQUEST_BOOT = CASE_STUDY_BOOT;
export const FRESIO_BOOT = CASE_STUDY_BOOT;

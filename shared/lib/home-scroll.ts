export const HOME_SCROLL_KEY = "homeScrollY";
export const HOME_SCROLL_ANCHOR = "homeScrollAnchor";

const RETURN_CLASS = "home-return";

function scrollY() {
  return document.documentElement.scrollTop || window.scrollY || document.body.scrollTop || 0;
}

function jumpTo(top: number) {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  html.scrollTop = top;
  document.body.scrollTop = top;
  html.style.scrollBehavior = prev;
}

function caseCard(anchor: string) {
  const href = anchor.startsWith("/") ? anchor : `/${anchor}`;
  return document.querySelector(`.case-study a[href="${href}"]`)?.closest(".case-study") ?? null;
}

function clear() {
  sessionStorage.removeItem(HOME_SCROLL_KEY);
  sessionStorage.removeItem(HOME_SCROLL_ANCHOR);
}

function pin(top: number, anchor: string | null) {
  const card = anchor ? caseCard(anchor) : null;
  if (card instanceof HTMLElement) {
    const y = card.getBoundingClientRect().top + scrollY() - 72;
    jumpTo(Math.max(0, Math.round(y)));
    return;
  }
  jumpTo(top);
}

function cancelReturn() {
  document.documentElement.classList.remove(RETURN_CLASS);
  document.documentElement.classList.remove("home-return-play");
}

function playReturn() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cancelReturn();
    return;
  }
  const html = document.documentElement;
  html.classList.add("home-return-play");
  window.setTimeout(cancelReturn, 750);
}

export function prepareHomeReturn() {
  if (sessionStorage.getItem(HOME_SCROLL_KEY) == null && sessionStorage.getItem(HOME_SCROLL_ANCHOR) == null) {
    return;
  }
  document.documentElement.classList.add(RETURN_CLASS);
  window.setTimeout(() => {
    if (sessionStorage.getItem(HOME_SCROLL_KEY) != null || sessionStorage.getItem(HOME_SCROLL_ANCHOR) != null) {
      restoreHomeScroll(true);
    }
  }, 400);
}

export function saveHomeScroll(anchor?: string) {
  if (window.location.pathname !== "/") return;
  sessionStorage.setItem(HOME_SCROLL_KEY, String(scrollY()));
  if (anchor) sessionStorage.setItem(HOME_SCROLL_ANCHOR, anchor);
  else sessionStorage.removeItem(HOME_SCROLL_ANCHOR);
}

let lastPinTop = 0;
let lastPinAnchor: string | null = null;
let layoutListenerAttached = false;

function ensureLayoutListener() {
  if (layoutListenerAttached) return;
  layoutListenerAttached = true;
  window.addEventListener("home-layout-ready", () => {
    if (lastPinAnchor != null) pin(lastPinTop, lastPinAnchor);
  });
}

export function restoreHomeScroll(force = false) {
  if (window.location.hash) {
    clear();
    cancelReturn();
    return false;
  }

  const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
  const anchor = sessionStorage.getItem(HOME_SCROLL_ANCHOR);
  if (raw == null && !anchor) {
    if (!document.documentElement.classList.contains("home-return-play")) cancelReturn();
    return false;
  }

  if (anchor && !caseCard(anchor) && !force) return false;

  const top = parseInt(raw || "0", 10) || 0;
  document.documentElement.classList.add(RETURN_CLASS);
  pin(top, anchor);
  clear();

  ensureLayoutListener();
  lastPinTop = top;
  lastPinAnchor = anchor;

  requestAnimationFrame(() => {
    pin(top, anchor);
    requestAnimationFrame(playReturn);
  });
  return true;
}

export function jumpToTop() {
  jumpTo(0);
}

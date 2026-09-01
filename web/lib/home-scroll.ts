export const HOME_SCROLL_KEY = "homeScrollY";

function scrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function jumpTo(top: number) {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
  html.style.scrollBehavior = prev;
}

export function saveHomeScroll() {
  if (window.location.pathname !== "/") return;
  sessionStorage.setItem(HOME_SCROLL_KEY, String(scrollY()));
}

export function restoreHomeScroll() {
  const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
  if (raw == null) return false;
  sessionStorage.removeItem(HOME_SCROLL_KEY);
  jumpTo(parseInt(raw, 10) || 0);
  return true;
}

export function jumpToTop() {
  jumpTo(0);
}

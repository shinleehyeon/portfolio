const EXTRA_HOST = process.env.NEXT_PUBLIC_SITE_HOST;

export function isSiteHost(hostname: string) {
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (EXTRA_HOST && (hostname === EXTRA_HOST || hostname.endsWith(`.${EXTRA_HOST}`))) return true;
  return false;
}

export function isSiteUrl(url: URL) {
  if (typeof window !== "undefined" && url.origin === window.location.origin) return true;
  return isSiteHost(url.hostname);
}

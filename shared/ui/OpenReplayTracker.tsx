"use client";

import { useEffect } from "react";

const VISITOR_KEY = "or-visitor-id";

function visitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "tz";
    const id = `${navigator.language} / ${tz} / ${crypto.randomUUID().slice(0, 8)}`;
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return "anon";
  }
}

function referrerHost(): string {
  try {
    return document.referrer ? new URL(document.referrer).host : "direct";
  } catch {
    return "direct";
  }
}

export function OpenReplayTracker() {
  useEffect(() => {
    const projectKey = process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY;
    if (!projectKey || location.protocol !== "https:") return;

    let cancelled = false;
    void (async () => {
      const { default: Tracker } = await import("@openreplay/tracker");
      if (cancelled) return;
      try {
        const ingestPoint = process.env.NEXT_PUBLIC_OPENREPLAY_INGEST_POINT;
        const tracker = new Tracker({
          projectKey,
          ...(ingestPoint ? { ingestPoint } : {}),
        });
        tracker.start({
          userID: visitorId(),
          metadata: {
            lang: navigator.language,
            path: location.pathname,
            ref: referrerHost(),
          },
        });
      } catch {
        // DNT / missing browser APIs
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

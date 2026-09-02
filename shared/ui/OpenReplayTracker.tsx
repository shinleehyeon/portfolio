"use client";

import { useEffect } from "react";

export function OpenReplayTracker() {
  useEffect(() => {
    const projectKey = process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY;
    if (!projectKey) return;

    let cancelled = false;
    void (async () => {
      const { default: Tracker } = await import("@openreplay/tracker");
      if (cancelled) return;
      const tracker = new Tracker({
        projectKey,
        ingestPoint: process.env.NEXT_PUBLIC_OPENREPLAY_INGEST_POINT,
      });
      tracker.start();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

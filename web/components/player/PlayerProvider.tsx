"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NOW_PLAYING, type PlaylistTrack } from "@/lib/now-playing";
import { isSiteUrl } from "@/lib/site-origin";
import {
  close as engineClose,
  ensureEngine,
  getSnap,
  go as engineGo,
  pollTime,
  seek as engineSeek,
  subscribe,
  toggle as engineToggle,
  type PlayerSnap,
} from "@/lib/youtube-engine";

type PlayerContextValue = PlayerSnap & {
  tracks: PlaylistTrack[];
  track: PlaylistTrack | undefined;
  toggle: () => void;
  close: () => void;
  go: (next: number, forcePlay?: boolean) => void;
  seek: (seconds: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const tracks = NOW_PLAYING.tracks;
  const [snap, setSnap] = useState<PlayerSnap>(getSnap);

  useEffect(() => {
    if (!isSiteUrl(new URL(window.location.href))) return;
    ensureEngine();
    const off = subscribe(setSnap);
    const leave = () => engineClose();
    window.addEventListener("pagehide", leave);
    return () => {
      off();
      window.removeEventListener("pagehide", leave);
    };
  }, []);

  useEffect(() => {
    if (!snap.playing) return;
    const id = window.setInterval(pollTime, 400);
    return () => window.clearInterval(id);
  }, [snap.playing]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      ...snap,
      tracks,
      track: tracks[snap.index],
      toggle: engineToggle,
      close: engineClose,
      go: engineGo,
      seek: engineSeek,
    }),
    [snap, tracks],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

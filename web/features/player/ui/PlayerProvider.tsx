"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_PLAYLIST_ID,
  NOW_PLAYING,
  PLAYLIST_STORAGE_KEY,
  parsePlaylistId,
  type PlaylistTrack,
} from "@/features/player/model/now-playing";
import { isSiteUrl } from "@/shared/lib/site-origin";
import {
  close as engineClose,
  ensureEngine,
  getSnap,
  getTracks,
  go as engineGo,
  pollTime,
  seek as engineSeek,
  setTracks,
  subscribe,
  toggle as engineToggle,
  type PlayerSnap,
} from "@/features/player/model/youtube-engine";

type PlayerContextValue = PlayerSnap & {
  tracks: PlaylistTrack[];
  track: PlaylistTrack | undefined;
  playlistBusy: boolean;
  playlistError: string | null;
  loadPlaylist: (input: string) => Promise<boolean>;
  toggle: () => void;
  close: () => void;
  go: (next: number, forcePlay?: boolean) => void;
  seek: (seconds: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

function persistPlaylistId(id: string) {
  sessionStorage.setItem(PLAYLIST_STORAGE_KEY, id);
  const url = new URL(window.location.href);
  if (id === DEFAULT_PLAYLIST_ID) url.searchParams.delete("list");
  else url.searchParams.set("list", id);
  window.history.replaceState(window.history.state, "", url);
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [tracks, setTracksState] = useState<PlaylistTrack[]>(getTracks);
  const [snap, setSnap] = useState<PlayerSnap>(getSnap);
  const [playlistBusy, setPlaylistBusy] = useState(false);
  const [playlistError, setPlaylistError] = useState<string | null>(null);

  const loadPlaylist = useCallback(async (input: string) => {
    const id = parsePlaylistId(input);
    if (!id) {
      setPlaylistError("유튜브 플레이리스트 링크를 넣어주세요.");
      return false;
    }
    setPlaylistBusy(true);
    setPlaylistError(null);
    try {
      if (id === DEFAULT_PLAYLIST_ID) {
        setTracks(NOW_PLAYING.tracks);
        persistPlaylistId(id);
        return true;
      }
      const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
      const data = (await res.json()) as { tracks?: PlaylistTrack[]; error?: string };
      if (!res.ok || !data.tracks?.length) {
        setPlaylistError(data.error || "플레이리스트를 불러오지 못했습니다.");
        return false;
      }
      setTracks(data.tracks);
      persistPlaylistId(id);
      return true;
    } catch {
      setPlaylistError("플레이리스트를 불러오지 못했습니다.");
      return false;
    } finally {
      setPlaylistBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!isSiteUrl(new URL(window.location.href))) return;
    ensureEngine();
    const off = subscribe((next) => {
      setSnap(next);
      setTracksState(getTracks());
    });
    const leave = () => engineClose();
    window.addEventListener("pagehide", leave);
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get("list") || params.get("playlist") || sessionStorage.getItem(PLAYLIST_STORAGE_KEY);
    if (incoming && parsePlaylistId(incoming) !== DEFAULT_PLAYLIST_ID) {
      void loadPlaylist(incoming);
    }
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
      playlistBusy,
      playlistError,
      loadPlaylist,
      toggle: engineToggle,
      close: engineClose,
      go: engineGo,
      seek: engineSeek,
    }),
    [snap, tracks, playlistBusy, playlistError, loadPlaylist],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

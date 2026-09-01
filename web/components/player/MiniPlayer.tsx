"use client";

import { youtubeThumbFill } from "@/lib/now-playing";
import { usePlayer } from "./PlayerProvider";

export function MiniPlayer() {
  const { track, playing, dismissed, toggle, close } = usePlayer();
  if (dismissed || !track) return null;

  return (
    <div className="mini-player" role="region" aria-label="Now playing">
      <span className={`mini-player__disc${playing ? " is-spinning" : ""}`}>
        <img className="mini-player__cover" src={youtubeThumbFill(track.youtubeId)} alt="" />
      </span>
      <div className="mini-player__meta">
        <span className="mini-player__track">{track.title}</span>
        <span className="mini-player__artist">{track.artist}</span>
      </div>
      <button type="button" className="mini-player__ctrl" aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.2v13.6L19 12 8 5.2Z" />
          </svg>
        )}
      </button>
      <button type="button" className="mini-player__close" aria-label="Close player" onClick={close}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

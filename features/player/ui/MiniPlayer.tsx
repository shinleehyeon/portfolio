"use client";

import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import { FALLBACK_TONE, sampleArtwork, type ArtworkTone } from "@/features/player/model/artwork-tone";
import { youtubeThumbFill } from "@/features/player/model/now-playing";
import { usePlayer } from "./PlayerProvider";
import styles from "./MiniPlayer.module.css";

function fmt(seconds: number) {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MiniPlayer() {
  const { track, playing, dismissed, currentTime, duration, toggle, close, seek } = usePlayer();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<ArtworkTone>(FALLBACK_TONE);

  useEffect(() => {
    if (dismissed) setOpen(false);
  }, [dismissed]);

  useEffect(() => {
    if (!track) return;
    let live = true;
    void sampleArtwork(`/api/artwork?id=${encodeURIComponent(track.youtubeId)}`).then((next) => {
      if (live) setTone(next);
    });
    return () => {
      live = false;
    };
  }, [track?.youtubeId]);

  if (dismissed || !track) return null;

  const total = duration || 0;
  const ratio = total ? Math.min(1, Math.max(0, currentTime / total)) : 0;

  function onSeek(e: PointerEvent<HTMLDivElement>) {
    if (!total) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    seek(x * total);
  }

  function onSeekStart(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    onSeek(e);
  }

  return (
    <div
      className={`${styles.root}${open ? ` ${styles.open}` : ""}`}
      role="region"
      aria-label="Now playing"
      aria-expanded={open}
      style={
        {
          "--mp-a": tone.a,
          "--mp-b": tone.b,
          "--mp-ink": tone.ink,
          "--mp-muted": tone.muted,
        } as CSSProperties
      }
    >
      <div className={styles.liquid} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
      </div>
      <button type="button" className={styles.hit} aria-label={open ? "재생바 닫기" : "재생바 열기"} onClick={() => setOpen((v) => !v)} />
      <div className={styles.row}>
        <span className={`${styles.disc}${playing ? ` ${styles.spinning}` : ""}`}>
          <img className={styles.cover} src={youtubeThumbFill(track.youtubeId)} alt="" />
        </span>
        <div className={styles.meta}>
          <span className={styles.track}>{track.title}</span>
          <span className={styles.artist}>{track.artist}</span>
        </div>
        <button type="button" className={styles.ctrl} aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
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
        <button type="button" className={styles.close} aria-label="Close player" onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <div
            className={styles.seek}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.floor(total)}
            aria-valuenow={Math.floor(currentTime)}
            onPointerDown={onSeekStart}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) onSeek(e);
            }}
          >
            <span className={styles.seekFill} style={{ width: `${ratio * 100}%` }} />
          </div>
          <div className={styles.times}>
            <span>{fmt(currentTime)}</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

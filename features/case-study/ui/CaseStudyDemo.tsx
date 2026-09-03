"use client";

import { useEffect, useRef, useState } from "react";

const RATES = [0.5, 0.75, 1] as const;

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function readDuration(v: HTMLVideoElement) {
  const d = v.duration;
  if (Number.isFinite(d) && d > 0) return d;
  if (v.seekable.length > 0) {
    const end = v.seekable.end(v.seekable.length - 1);
    if (Number.isFinite(end) && end > 0) return end;
  }
  return 0;
}

export function CaseStudyDemo({
  src,
  poster,
  hint,
  portrait,
}: {
  src: string;
  poster?: string;
  hint?: string;
  portrait?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(0.75);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const sync = () => {
      const d = readDuration(v);
      if (d) setDuration(d);
      setTime(v.currentTime);
    };

    sync();
    v.addEventListener("loadedmetadata", sync);
    v.addEventListener("durationchange", sync);
    v.addEventListener("loadeddata", sync);
    return () => {
      v.removeEventListener("loadedmetadata", sync);
      v.removeEventListener("durationchange", sync);
      v.removeEventListener("loadeddata", sync);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const seek = (value: number) => {
    const v = videoRef.current;
    if (!v) return;
    const d = duration || readDuration(v);
    const next = Math.min(Math.max(0, value), d || value);
    v.currentTime = next;
    setTime(next);
  };

  return (
    <div
      className={`cs-demo${portrait ? " cs-demo--portrait" : ""}`}
      style={portrait ? { maxWidth: 280, marginLeft: "auto", marginRight: "auto" } : undefined}
    >
      <div className="cs-demo__stage">
        <video
          ref={videoRef}
          className="cs-demo__video"
          style={portrait ? { width: "100%", height: "auto", maxHeight: "68vh", objectFit: "contain" } : undefined}
          poster={poster}
          playsInline
          preload="auto"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            const d = readDuration(v);
            if (d && d !== duration) setDuration(d);
            setTime(v.currentTime);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <div className="cs-demo__bar">
        <button type="button" className="cs-demo__play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--icon-strong)">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--icon-strong)">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          )}
        </button>
        <span className="cs-demo__time">{formatTime(time)}</span>
        <input
          className="cs-demo__seek"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
        />
        <span className="cs-demo__time">{formatTime(duration)}</span>
        <div className="cs-demo__rates">
          {RATES.map((r) => (
            <button
              key={r}
              type="button"
              className={`cs-demo__rate${rate === r ? " is-active" : ""}`}
              onClick={() => setRate(r)}
            >
              {r}×
            </button>
          ))}
        </div>
      </div>
      {hint ? <p className="cs-demo__hint">{hint}</p> : null}
    </div>
  );
}

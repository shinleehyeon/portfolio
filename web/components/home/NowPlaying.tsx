"use client";

import { useEffect, useRef, useState } from "react";
import { NOW_PLAYING, youtubeThumb } from "@/lib/now-playing";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          width: number;
          height: number;
          playerVars: Record<string, number>;
          events: {
            onReady: () => void;
            onStateChange: (e: { data: number }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYoutubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}

export function NowPlaying() {
  const tracks = NOW_PLAYING.tracks;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const indexRef = useRef(0);
  const track = tracks[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!hostRef.current || !tracks[0]) return;
    let cancelled = false;

    loadYoutubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: tracks[0].youtubeId,
        width: 0,
        height: 0,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          controls: 0,
          origin: typeof window === "undefined" ? "" : window.location.origin,
        },
        events: {
          onReady: () => {},
          onStateChange: (e) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (e.data === state.PLAYING) setPlaying(true);
            if (e.data === state.PAUSED) setPlaying(false);
            if (e.data === state.ENDED) {
              const next = (indexRef.current + 1) % tracks.length;
              setIndex(next);
              playerRef.current?.loadVideoById(tracks[next].youtubeId);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [tracks]);

  if (!track) return null;

  const go = (next: number) => {
    const i = (next + tracks.length) % tracks.length;
    setIndex(i);
    playerRef.current?.loadVideoById(tracks[i].youtubeId);
    setPlaying(true);
  };

  const toggle = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  return (
    <div className="now-playing" id="now-playing">
      <div className="now-playing__yt" aria-hidden="true">
        <div ref={hostRef} />
      </div>

      <div className="now-playing__now">
        <img className="now-playing__cover" src={youtubeThumb(track.youtubeId)} alt="" />
        <div className="now-playing__meta">
          <div className="now-playing__track">{track.title}</div>
          <div className="now-playing__artist">{track.artist}</div>
        </div>
        <div className="now-playing__controls">
          <button type="button" className="now-playing__ctrl" aria-label="Previous" onClick={() => go(index - 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="#002E71" />
            </svg>
          </button>
          <button type="button" className="now-playing__ctrl now-playing__ctrl--main" aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#002E71">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#002E71">
                <path d="M8 5.5v13l11-6.5L8 5.5Z" />
              </svg>
            )}
          </button>
          <button type="button" className="now-playing__ctrl" aria-label="Next" onClick={() => go(index + 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75C5 12.1642 5.33579 12.5 5.75 12.5L16.6487 12.5L13.1738 16.2698C12.9087 16.5881 12.9517 17.061 13.2699 17.3261C13.5881 17.5913 14.061 17.5483 14.3262 17.2301L18.8262 12.2301C19.0579 11.952 19.0579 11.548 18.8262 11.2698L14.3262 6.26984C14.061 5.95163 13.5881 5.90864 13.2699 6.17382C12.9517 6.43899 12.9087 6.91191 13.1738 7.23012L16.6487 11L5.75 11Z" fill="#002E71" />
            </svg>
          </button>
        </div>
      </div>

      <ul className="now-playing__list">
        {tracks.map((item, i) => (
          <li key={`${item.youtubeId}-${i}`}>
            <button
              type="button"
              className={`now-playing__row${i === index ? " is-active" : ""}`}
              onClick={() => go(i)}
            >
              <img src={youtubeThumb(item.youtubeId)} alt="" />
              <span className="now-playing__row-text">
                <span className="now-playing__row-title">{item.title}</span>
                <span className="now-playing__row-artist">{item.artist}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

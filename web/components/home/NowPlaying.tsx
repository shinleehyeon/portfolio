"use client";

import { FormEvent, useState } from "react";
import { youtubeThumb } from "@/lib/now-playing";
import { usePlayer } from "@/components/player/PlayerProvider";

export function NowPlaying() {
  const { tracks, index, track, playing, go, toggle, loadPlaylist, playlistBusy, playlistError } = usePlayer();
  const [link, setLink] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await loadPlaylist(link);
    if (ok) setLink("");
  }

  if (!track) return null;

  return (
    <div className="now-playing" id="now-playing">
      <div className="now-playing__now">
        <img className="now-playing__cover" src={youtubeThumb(track.youtubeId)} alt="" />
        <div className="now-playing__meta">
          <div className="now-playing__track">{track.title}</div>
          <div className="now-playing__artist">{track.artist}</div>
        </div>
        <div className="now-playing__controls">
          <button type="button" className="now-playing__ctrl" aria-label="Previous" onClick={() => go(index - 1, playing)}>
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
          <button type="button" className="now-playing__ctrl" aria-label="Next" onClick={() => go(index + 1, playing)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75C5 12.1642 5.33579 12.5 5.75 12.5L16.6487 12.5L13.1738 16.2698C12.9087 16.5881 12.9517 17.061 13.2699 17.3261C13.5881 17.5913 14.061 17.5483 14.3262 17.2301L18.8262 12.2301C19.0579 11.952 19.0579 11.548 18.8262 11.2698L14.3262 6.26984C14.061 5.95163 13.5881 5.90864 13.2699 6.17382C12.9517 6.43899 12.9087 6.91191 13.1738 7.23012L16.6487 11L5.75 11Z" fill="#002E71" />
            </svg>
          </button>
        </div>
      </div>

      <form className="now-playing__link" onSubmit={onSubmit}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="유튜브 플레이리스트 링크"
          aria-label="유튜브 플레이리스트 링크"
          disabled={playlistBusy}
        />
        <button type="submit" disabled={playlistBusy || !link.trim()}>
          {playlistBusy ? "불러오는 중" : "넣기"}
        </button>
      </form>
      {playlistError ? <p className="now-playing__link-error">{playlistError}</p> : null}

      <ul className="now-playing__list">
        {tracks.map((item, i) => (
          <li key={`${item.youtubeId}-${i}`}>
            <button
              type="button"
              className={`now-playing__row${i === index ? " is-active" : ""}`}
              onClick={() => go(i, true)}
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

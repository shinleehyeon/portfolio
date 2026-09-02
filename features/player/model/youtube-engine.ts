import { NOW_PLAYING, type PlaylistTrack } from "@/features/player/model/now-playing";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
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
          playerVars: Record<string, number | string>;
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

export type PlayerSnap = {
  index: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  ready: boolean;
  dismissed: boolean;
  playlistRev: number;
};

let tracks: PlaylistTrack[] = NOW_PLAYING.tracks;
const listeners = new Set<(snap: PlayerSnap) => void>();

let player: YTPlayer | null = null;
let booted = false;
let snap: PlayerSnap = {
  index: 0,
  playing: false,
  currentTime: 0,
  duration: 0,
  ready: false,
  dismissed: true,
  playlistRev: 0,
};

function emit() {
  const next = { ...snap };
  listeners.forEach((fn) => fn(next));
}

function setSnap(patch: Partial<PlayerSnap>) {
  snap = { ...snap, ...patch };
  emit();
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

export function getSnap() {
  return snap;
}

export function getTracks() {
  return tracks;
}

export function setTracks(next: PlaylistTrack[]) {
  if (!next.length) return;
  tracks = next;
  setSnap({ index: 0, currentTime: 0, duration: 0, playlistRev: snap.playlistRev + 1 });
  if (!player) return;
  if (snap.playing) player.loadVideoById(tracks[0].youtubeId);
  else player.cueVideoById(tracks[0].youtubeId);
}

export function subscribe(fn: (snap: PlayerSnap) => void) {
  listeners.add(fn);
  fn({ ...snap });
  return () => {
    listeners.delete(fn);
  };
}

export function ensureEngine() {
  if (typeof document === "undefined" || booted) return;
  booted = true;

  let host = document.getElementById("yt-engine-host") as HTMLDivElement | null;
  if (!host) {
    const wrap = document.createElement("div");
    wrap.className = "mini-player__yt";
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.cssText =
      "position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;clip:rect(0 0 0 0)";
    host = document.createElement("div");
    host.id = "yt-engine-host";
    wrap.appendChild(host);
    document.body.appendChild(wrap);
  }

  loadYoutubeApi().then(() => {
    if (!host || !window.YT || player) return;
    player = new window.YT.Player(host, {
      videoId: tracks[snap.index].youtubeId,
      width: 0,
      height: 0,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        controls: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          host?.querySelector("iframe")?.setAttribute("allow", "autoplay; encrypted-media");
          setSnap({ ready: true, duration: player?.getDuration() || 0 });
        },
        onStateChange: (e) => {
          const state = window.YT?.PlayerState;
          if (!state) return;
          if (e.data === state.PLAYING) {
            setSnap({ playing: true, duration: player?.getDuration() || snap.duration });
          }
          if (e.data === state.PAUSED) setSnap({ playing: false });
          if (e.data === state.ENDED) go(snap.index + 1, true);
        },
      },
    });
  });
}

export function toggle() {
  if (!player) return;
  if (snap.playing) {
    player.pauseVideo();
    return;
  }
  setSnap({ dismissed: false });
  player.playVideo();
}

export function close() {
  player?.pauseVideo();
  setSnap({ playing: false, dismissed: true });
}

export function go(next: number, forcePlay = false) {
  const i = ((next % tracks.length) + tracks.length) % tracks.length;
  setSnap({ index: i, currentTime: 0, dismissed: false });
  if (!player) return;
  if (forcePlay || snap.playing) player.loadVideoById(tracks[i].youtubeId);
  else player.cueVideoById(tracks[i].youtubeId);
}

export function seek(seconds: number) {
  player?.seekTo(seconds, true);
  setSnap({ currentTime: seconds });
}

export function pollTime() {
  if (!player || !snap.playing) return;
  setSnap({
    currentTime: player.getCurrentTime() || 0,
    duration: player.getDuration() || snap.duration,
  });
}

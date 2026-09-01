import { parsePlaylistId, type PlaylistTrack } from "@/lib/now-playing";

export async function GET(req: Request) {
  const raw = new URL(req.url).searchParams.get("id") || "";
  const id = parsePlaylistId(raw);
  if (!id) return Response.json({ error: "invalid playlist" }, { status: 400 });

  try {
    const tracks = await fetchPlaylistTracks(id);
    if (!tracks.length) return Response.json({ error: "empty playlist" }, { status: 404 });
    return Response.json({ id, tracks });
  } catch {
    return Response.json({ error: "failed to load playlist" }, { status: 502 });
  }
}

function textFrom(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const rec = value as { simpleText?: string; runs?: { text?: string }[] };
  if (rec.simpleText) return rec.simpleText;
  return rec.runs?.map((run) => run.text || "").join("") || "";
}

function lockupArtist(lockup: Record<string, unknown>): string {
  const meta = lockup.metadata as Record<string, unknown> | undefined;
  const view = meta?.lockupMetadataViewModel as Record<string, unknown> | undefined;
  const rows = (view?.metadata as Record<string, unknown> | undefined)?.contentMetadataViewModel as
    | { metadataRows?: { metadataParts?: { text?: { content?: string } }[] }[] }
    | undefined;
  const first = rows?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content;
  if (first) return first;
  const label = ((view?.image as Record<string, unknown> | undefined)?.decoratedAvatarViewModel as { a11yLabel?: string } | undefined)
    ?.a11yLabel;
  return label?.replace(/^Go to channel\s+/i, "") || "";
}

function collectTracks(node: unknown, out: PlaylistTrack[], seen: Set<string>) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectTracks(item, out, seen);
    return;
  }
  const rec = node as Record<string, unknown>;
  const video = rec.playlistVideoRenderer as Record<string, unknown> | undefined;
  if (video && typeof video.videoId === "string" && !seen.has(video.videoId)) {
    seen.add(video.videoId);
    out.push({
      youtubeId: video.videoId,
      title: textFrom(video.title) || "Untitled",
      artist: textFrom(video.shortBylineText),
    });
    return;
  }
  const lockup = rec.lockupViewModel as Record<string, unknown> | undefined;
  if (lockup && lockup.contentType === "LOCKUP_CONTENT_TYPE_VIDEO" && typeof lockup.contentId === "string" && !seen.has(lockup.contentId)) {
    const meta = lockup.metadata as Record<string, unknown> | undefined;
    const view = meta?.lockupMetadataViewModel as Record<string, unknown> | undefined;
    const title = (view?.title as { content?: string } | undefined)?.content || "Untitled";
    seen.add(lockup.contentId);
    out.push({ youtubeId: lockup.contentId, title, artist: lockupArtist(lockup) });
    return;
  }
  for (const value of Object.values(rec)) collectTracks(value, out, seen);
}

function extractYtInitialData(html: string): unknown {
  const marker = html.indexOf("ytInitialData");
  if (marker < 0) return null;
  const start = html.indexOf("{", html.indexOf("=", marker));
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return JSON.parse(html.slice(start, i + 1));
    }
  }
  return null;
}

async function fetchPlaylistTracks(id: string): Promise<PlaylistTrack[]> {
  const res = await fetch(`https://www.youtube.com/playlist?list=${encodeURIComponent(id)}&hl=en`, {
    headers: {
      "Accept-Language": "en",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error("youtube fetch failed");
  const html = await res.text();
  const data = extractYtInitialData(html);
  const tracks: PlaylistTrack[] = [];
  collectTracks(data, tracks, new Set());
  return tracks;
}

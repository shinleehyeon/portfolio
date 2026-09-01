#!/usr/bin/env python3
"""Mirror https://murynmukha.com/ into this folder."""
from __future__ import annotations

import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

HOSTS = {"murynmukha.com", "www.murynmukha.com"}
ORIGIN = "https://murynmukha.com"
ROOT = Path(__file__).resolve().parent
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

SEED_PATHS = [
    "/",
    "/style.css",
    "/case-study.css",
    "/case-study.css?v=25",
    "/wheel.js",
    "/ask-ai-circles.js",
    "/trees.js",
    "/trees.js?v=7",
    "/favicon.ico",
    "/favicon.svg",
    "/apple-touch-icon.png",
    "/site.webmanifest",
    "/images/og-image.png",
    "/robots.txt",
    "/sitemap.xml",
]

SPA: set[str] = set()

URL_RE = re.compile(
    r"""(?x)
    (?:
        (?:href|src|poster|data-src|srcset)\s*=\s*["']([^"']+)["']
      | url\(\s*["']?([^"')]+)["']?\s*\)
      | ["']((?:/?images|/?fonts)/[^"']+)["']
    )
    """
)
SRCSET_SPLIT = re.compile(r"\s*,\s*")


def local_path(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path)
    if not path or path.endswith("/"):
        path = (path or "/") + "index.html"
    if parsed.path.rstrip("/") in SPA:
        path = parsed.path.rstrip("/") + "/index.html"
    # drop query from filename
    return ROOT / path.lstrip("/")


def abs_url(raw: str, base: str) -> str | None:
    raw = raw.strip().strip("'\"")
    if not raw or raw.startswith(("data:", "mailto:", "tel:", "javascript:", "#")):
        return None
    if raw.startswith("//"):
        raw = "https:" + raw
    full = urllib.parse.urljoin(base, raw)
    parsed = urllib.parse.urlparse(full)
    host = (parsed.netloc or "").lower()
    if host and host not in HOSTS:
        return None
    path = parsed.path or "/"
    return urllib.parse.urlunparse(("https", "murynmukha.com", path, "", parsed.query, ""))


def extract_urls(text: str, base: str) -> set[str]:
    found: set[str] = set()
    for m in URL_RE.finditer(text):
        raw = next(g for g in m.groups() if g)
        parts = SRCSET_SPLIT.split(raw) if "," in raw else [raw]
        for part in parts:
            token = part.strip().split()[0] if part.strip() else ""
            u = abs_url(token, base)
            if u:
                found.add(u)
    return found


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def save(url: str, data: bytes) -> Path:
    dest = local_path(url)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return dest


def main() -> None:
    queue = [ORIGIN + p for p in SEED_PATHS]
    seen: set[str] = set()
    failed: list[tuple[str, str]] = []
    downloaded = 0

    while queue:
        url = queue.pop(0)
        key = url.split("#")[0]
        canon = key.split("?")[0]
        if canon in seen:
            continue
        seen.add(canon)
        dest = local_path(canon)
        try:
            if dest.exists() and dest.stat().st_size > 0 and dest.suffix.lower() not in {
                ".html", ".css", ".js", ".xml", ".txt", ".webmanifest",
            }:
                data = dest.read_bytes()
            else:
                data = fetch(key)
                save(canon, data)
                downloaded += 1
                print(f"OK  {len(data):8d}  {key}")
        except Exception as e:
            failed.append((key, str(e)))
            print(f"ERR {key}  {e}")
            time.sleep(0.1)
            continue

        if dest.suffix.lower() in {".html", ".css", ".js", ".xml", ".svg", ".txt"} or dest.name == "index.html":
            text = data.decode("utf-8", errors="ignore")
            for u in extract_urls(text, key):
                if u.split("?")[0] not in seen:
                    queue.append(u)

    print("\n--- done ---")
    print(f"downloaded: {downloaded}  seen: {len(seen)}")
    if failed:
        print("failed:")
        for u, err in failed:
            print(f"  {u}  {err}")


if __name__ == "__main__":
    main()

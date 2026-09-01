#!/usr/bin/env python3
"""Turn the static murynmukha clone into a Next.js app under web/."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "web"
PAGES = {
    "home": ROOT / "index.html",
}
SCRIPT_SRC = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.I | re.S)
SRC_ATTR = re.compile(r"""src\s*=\s*["']([^"']+)["']""", re.I)
BODY = re.compile(r"<body([^>]*)>(.*)</body>", re.I | re.S)


def extract(html: str) -> tuple[str, str, list[str], list[str]]:
    m = BODY.search(html)
    attrs = m.group(1) if m else ""
    inner = m.group(2) if m else html
    externals: list[str] = []
    inlines: list[str] = []

    def take(match: re.Match[str]) -> str:
        head, body = match.group(1), match.group(2)
        if "application/ld+json" in head:
            return match.group(0)
        src = SRC_ATTR.search(head)
        if src:
            externals.append(src.group(1))
            return ""
        text = body.strip()
        if text:
            inlines.append(text)
        return ""

    cleaned = SCRIPT_SRC.sub(take, inner)
    return attrs, cleaned, externals, inlines


def write_runtime(name: str, inlines: list[str]) -> None:
    dest = WEB / "public" / "js" / f"{name}-runtime.js"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text("\n;\n".join(inlines) + "\n", encoding="utf-8")


def jsx_string(html: str) -> str:
    return html.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def main() -> None:
    public = WEB / "public"
    public.mkdir(parents=True, exist_ok=True)

    for name in ("images", "fonts"):
        src = ROOT / name
        dest = public / name
        if dest.exists():
            shutil.rmtree(dest)
        if src.exists():
            shutil.copytree(src, dest)
    for fname in (
        "style.css",
        "case-study.css",
        "wheel.js",
        "ask-ai-circles.js",
        "trees.js",
        "favicon.ico",
        "favicon.svg",
        "apple-touch-icon.png",
        "site.webmanifest",
    ):
        src = ROOT / fname
        if src.exists():
            shutil.copy2(src, public / fname)

    extracted: dict[str, tuple[str, str, list[str], list[str]]] = {}
    for name, path in PAGES.items():
        html = path.read_text(encoding="utf-8", errors="ignore")
        extracted[name] = extract(html)
        _attrs, _body, _ext, inlines = extracted[name]
        write_runtime(name, inlines)

    from _html_to_tsx import main as write_tsx

    write_tsx()
    print("wrote TSX page components and public assets")


if __name__ == "__main__":
    main()

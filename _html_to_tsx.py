#!/usr/bin/env python3
"""Convert cloned HTML bodies into Next.js TSX page components."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "web"
OUT = WEB / "components" / "pages"

SCRIPT_SRC = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.I | re.S)
STYLE_TAG = re.compile(r"<style\b[^>]*>.*?</style>", re.I | re.S)
BODY = re.compile(r"<body([^>]*)>(.*)</body>", re.I | re.S)
COMMENT = re.compile(r"<!--(.*?)-->", re.S)
TAG = re.compile(r"<(/)?([a-zA-Z][\w:-]*)((?:\s+[^>]*?)?)\s*(/)?\s*>", re.S)
ATTR = re.compile(
    r"""([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?""",
    re.S,
)

VOID = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}

ATTR_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "colspan": "colSpan",
    "rowspan": "rowSpan",
    "maxlength": "maxLength",
    "minlength": "minLength",
    "readonly": "readOnly",
    "autofocus": "autoFocus",
    "autocomplete": "autoComplete",
    "autocapitalize": "autoCapitalize",
    "contenteditable": "contentEditable",
    "crossorigin": "crossOrigin",
    "datetime": "dateTime",
    "enctype": "encType",
    "formaction": "formAction",
    "formenctype": "formEncType",
    "formmethod": "formMethod",
    "formnovalidate": "formNoValidate",
    "formtarget": "formTarget",
    "frameborder": "frameBorder",
    "hreflang": "hrefLang",
    "inputmode": "inputMode",
    "marginwidth": "marginWidth",
    "marginheight": "marginHeight",
    "maxlength": "maxLength",
    "novalidate": "noValidate",
    "radiogroup": "radioGroup",
    "spellcheck": "spellCheck",
    "srcdoc": "srcDoc",
    "srclang": "srcLang",
    "srcset": "srcSet",
    "allowfullscreen": "allowFullScreen",
    "playsinline": "playsInline",
    "autoplay": "autoPlay",
    "controlslist": "controlsList",
    "disablepictureinpicture": "disablePictureInPicture",
    "disableremoteplayback": "disableRemotePlayback",
}

HYPHEN_ATTR = {
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "clip-path": "clipPath",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    "font-style": "fontStyle",
    "text-anchor": "textAnchor",
    "vector-effect": "vectorEffect",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "flood-color": "floodColor",
    "flood-opacity": "floodOpacity",
    "color-interpolation-filters": "colorInterpolationFilters",
    "xlink:href": "xlinkHref",
    "xml:space": "xmlSpace",
    "xmlns:xlink": "xmlnsXlink",
    "alignment-baseline": "alignmentBaseline",
    "baseline-shift": "baselineShift",
    "dominant-baseline": "dominantBaseline",
    "enable-background": "enableBackground",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    "letter-spacing": "letterSpacing",
    "lighting-color": "lightingColor",
    "marker-end": "markerEnd",
    "marker-mid": "markerMid",
    "marker-start": "markerStart",
    "paint-order": "paintOrder",
    "shape-rendering": "shapeRendering",
    "stop-color": "stopColor",
    "word-spacing": "wordSpacing",
    "writing-mode": "writingMode",
    "gradienttransform": "gradientTransform",
    "gradientunits": "gradientUnits",
    "patterncontentunits": "patternContentUnits",
    "patterntransform": "patternTransform",
    "patternunits": "patternUnits",
    "preserveaspectratio": "preserveAspectRatio",
    "spreadmethod": "spreadMethod",
    "viewbox": "viewBox",
    "stddeviation": "stdDeviation",
    "attributename": "attributeName",
    "attributetype": "attributeType",
    "repeatcount": "repeatCount",
    "calcmode": "calcMode",
    "keytimes": "keyTimes",
    "keysplines": "keySplines",
    "keyPoints": "keyPoints",
}

BOOL = {
    "muted",
    "loop",
    "autoplay",
    "playsinline",
    "disabled",
    "hidden",
    "checked",
    "selected",
    "multiple",
    "required",
    "readonly",
    "autofocus",
    "controls",
    "default",
    "defer",
    "reversed",
    "open",
    "novalidate",
    "allowfullscreen",
    "async",
    "nomodule",
}

PAGES = {
    "HomePage": ROOT / "index.html",
}


def extract_body(html: str) -> str:
    m = BODY.search(html)
    inner = m.group(2) if m else html

    def drop_script(match: re.Match[str]) -> str:
        if "application/ld+json" in match.group(1):
            return ""
        return ""

    inner = SCRIPT_SRC.sub(drop_script, inner)
    inner = STYLE_TAG.sub("", inner)
    return inner.strip()


def css_prop(name: str) -> str:
    if name.startswith("--"):
        return json.dumps(name)
    if name.startswith("-ms-"):
        return "ms" + "".join(p.capitalize() for p in name[4:].split("-"))
    parts = name.split("-")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def style_to_jsx(value: str) -> str:
    items = []
    for decl in value.split(";"):
        decl = decl.strip()
        if not decl or ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        k, v = k.strip(), v.strip()
        items.append(f"{css_prop(k)}: {json.dumps(v)}")
    return "{" + ", ".join(items) + "}"


def fix_url(value: str) -> str:
    if value.startswith(("images/", "fonts/", "wheel.js", "ask-ai-circles.js", "trees.js", "style.css", "case-study.css")):
        return "/" + value
    if value.startswith("./images/"):
        return "/" + value[2:]
    return value


def attr_name(raw: str) -> str:
    lower = raw.lower()
    if lower in ATTR_MAP:
        return ATTR_MAP[lower]
    if raw.startswith("data-") or raw.startswith("aria-"):
        return raw
    if lower in HYPHEN_ATTR:
        return HYPHEN_ATTR[lower]
    if "-" in raw or ":" in raw:
        return HYPHEN_ATTR.get(raw, HYPHEN_ATTR.get(lower, raw))
    return raw


def convert_attrs(raw: str) -> str:
    if not raw or not raw.strip():
        return ""
    out = []
    for m in ATTR.finditer(raw.strip()):
        name = m.group(1)
        if name == "/":
            continue
        val = m.group(2)
        if val is None:
            val = m.group(3)
        if val is None:
            val = m.group(4)
        jsx_name = attr_name(name)
        if val is None:
            if name.lower() in BOOL or jsx_name in {
                "muted",
                "loop",
                "autoPlay",
                "playsInline",
                "disabled",
                "hidden",
                "checked",
                "selected",
            }:
                out.append(jsx_name)
            continue
        if jsx_name == "style":
            out.append(f"style={{{style_to_jsx(val)}}}")
            continue
        if jsx_name in {"src", "href", "poster"}:
            val = fix_url(val)
        if jsx_name == "className" and name.lower() == "class":
            pass
        out.append(f'{jsx_name}={json.dumps(val, ensure_ascii=False)}')
    return (" " + " ".join(out)) if out else ""


def convert_comment(match: re.Match[str]) -> str:
    text = match.group(1).strip()
    text = text.replace("*/", "* /")
    return f"{{/* {text} */}}"


def convert_tag(match: re.Match[str]) -> str:
    closing, name, attrs, selfclose = match.group(1), match.group(2), match.group(3) or "", match.group(4)
    lname = name.lower()
    if closing:
        return f"</{lname}>"
    jsx_attrs = convert_attrs(attrs)
    if lname in VOID or selfclose:
        return f"<{lname}{jsx_attrs} />"
    return f"<{lname}{jsx_attrs}>"


def html_to_jsx(html: str) -> str:
    jsx = COMMENT.sub(convert_comment, html)
    jsx = TAG.sub(convert_tag, jsx)
    return jsx


def write_component(name: str, jsx: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"{name}.tsx"
    dest.write_text(
        f"""export function {name}() {{
  return (
    <>
{jsx}
    </>
  );
}}
""",
        encoding="utf-8",
    )


def main() -> None:
    for name, path in PAGES.items():
        html = path.read_text(encoding="utf-8")
        body = extract_body(html)
        jsx = html_to_jsx(body)
        # indent body under fragment
        indented = "\n".join(("      " + line) if line.strip() else line for line in jsx.splitlines())
        write_component(name, indented)
        print(f"wrote {name} ({len(indented.splitlines())} lines)")


if __name__ == "__main__":
    main()

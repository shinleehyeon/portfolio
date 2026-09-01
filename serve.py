#!/usr/bin/env python3
"""Local static server for the murynmukha.com clone."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import urllib.parse

ROOT = Path(__file__).resolve().parent
SPA = {"/chattermill", "/voiceflow", "/invocable"}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path in SPA:
            self.path = path + "/index.html"
        elif path != "/" and not (ROOT / urllib.parse.unquote(path).lstrip("/")).exists():
            candidate = ROOT / path.lstrip("/") / "index.html"
            if candidate.exists():
                self.path = path + "/index.html"
        return super().do_GET()


class Server(ThreadingHTTPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    port = 4174
    last_err = None
    for candidate in range(port, port + 10):
        try:
            httpd = Server(("127.0.0.1", candidate), Handler)
            print(f"Serving {ROOT} at http://127.0.0.1:{candidate}/", flush=True)
            httpd.serve_forever()
            break
        except OSError as exc:
            last_err = exc
            continue
    else:
        raise SystemExit(f"Could not bind 127.0.0.1:{port}-{port + 9}: {last_err}")

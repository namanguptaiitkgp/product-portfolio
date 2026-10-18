"""Static file server for local preview.

Avoids `python3 -m http.server`, whose __main__ block calls os.getcwd() at import
time — that raises PermissionError under the sandbox the preview runs in. Here the
document root is passed explicitly instead.

    python3 .claude/serve.py <root> [port]
"""
import os
import sys
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
port = int(sys.argv[2]) if len(sys.argv) > 2 else 8000

os.chdir(root)
handler = partial(SimpleHTTPRequestHandler, directory=root)
print(f"serving {root} on http://127.0.0.1:{port}", flush=True)
# Threaded: a single stuck keep-alive connection used to wedge the whole server.
ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()

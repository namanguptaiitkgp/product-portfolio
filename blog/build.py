"""Build the blog from Markdown files.

    python3 blog/build.py

Reads blog/posts/*.md and writes blog/index.html plus blog/<slug>/index.html.
Front matter sits at the top of each file as `key: value` lines, ending at the
first blank line:

    title: Why thresholds are a product decision
    date: 2026-10-23
    summary: One line that shows on the index and in link previews.
    draft: true          # optional — keeps it out of the index and off the site

Optional front matter: `hero: file.webp` puts a lead image under the dek and
uses it for the link preview.

Markdown supported: #/##/### headings, paragraphs, **bold**, *italic*,
`code`, [links](url), > blockquotes, - bullet lists, 1. numbered lists,
--- rules and ![caption](file.webp) images. A paragraph that is bold from end
to end becomes a statement line. That is deliberately a small subset; the site
has no build step and no dependencies, so the parser stays readable rather
than complete.

Images live in blog/assets/ and are referenced by filename alone. The alt text
doubles as the caption, so leave it empty for an image that needs no caption.
"""

import html
import os
import re
import shutil
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
POSTS = os.path.join(HERE, "posts")
SITE = "https://namanbuilds.com"


# ---------------------------------------------------------------- markdown

def inline(t):
    """Inline formatting. Escapes first, so post text can contain < and &."""
    t = html.escape(t, quote=False)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)',
               lambda m: f'<a href="{m.group(2)}"'
                         + (' target="_blank" rel="noopener"' if m.group(2).startswith("http") else '')
                         + f'>{m.group(1)}</a>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', t)
    return t


def dims(src):
    """width/height attributes when Pillow is around, so images reserve space."""
    try:
        from PIL import Image
        with Image.open(os.path.join(HERE, "assets", os.path.basename(src))) as im:
            return f' width="{im.width}" height="{im.height}"'
    except Exception:
        return ""


def figure(alt, src, prefix, cls=""):
    url = src if src.startswith(("http", "/")) else prefix + src
    cap = f"<figcaption>{inline(alt)}</figcaption>" if alt else ""
    klass = f' class="{cls}"' if cls else ""
    return (f'<figure{klass}><img src="{url}" alt="{html.escape(alt, quote=True)}"'
            f' loading="lazy" decoding="async"{dims(src)}>{cap}</figure>')


def markdown(src, prefix=""):
    out, para, lst, quote = [], [], None, []

    def flush_para():
        if para:
            t = " ".join(para)
            whole = re.fullmatch(r'\*\*(.+?)\*\*', t)
            if whole:
                out.append('<p class="statement">' + inline(whole.group(1)) + "</p>")
            else:
                out.append("<p>" + inline(t) + "</p>")
            para.clear()

    def flush_list():
        nonlocal lst
        if lst:
            tag = lst[0]
            items = "".join(f"<li>{inline(i)}</li>" for i in lst[1])
            out.append(f"<{tag}>{items}</{tag}>")
            lst = None

    def flush_quote():
        if quote:
            out.append("<blockquote>" + inline(" ".join(quote)) + "</blockquote>")
            quote.clear()

    def flush_all():
        flush_para(); flush_list(); flush_quote()

    for raw in src.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            flush_all(); continue
        if line.strip() == "---":
            flush_all(); out.append("<hr>"); continue
        m = re.match(r'!\[(.*)\]\(([^)\s]+)\)\s*$', line)
        if m:
            flush_all()
            out.append(figure(m.group(1), m.group(2), prefix))
            continue
        m = re.match(r'(#{1,3})\s+(.*)', line)
        if m:
            flush_all()
            lvl = max(2, len(m.group(1)))      # post title is the h1
            out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
            continue
        m = re.match(r'>\s?(.*)', line)
        if m:
            flush_para(); flush_list(); quote.append(m.group(1)); continue
        m = re.match(r'[-*]\s+(.*)', line)
        if m:
            flush_para(); flush_quote()
            if not lst or lst[0] != "ul":
                flush_list(); lst = ("ul", [])
            lst[1].append(m.group(1)); continue
        m = re.match(r'\d+\.\s+(.*)', line)
        if m:
            flush_para(); flush_quote()
            if not lst or lst[0] != "ol":
                flush_list(); lst = ("ol", [])
            lst[1].append(m.group(1)); continue
        flush_list(); flush_quote(); para.append(line.strip())

    flush_all()
    return "\n".join(out)


def parse(path):
    raw = open(path, encoding="utf-8").read()
    meta, body = {}, raw
    if "\n\n" in raw:
        head, rest = raw.split("\n\n", 1)
        if re.match(r'^[a-z]+:', head.strip().split("\n")[0]):
            for line in head.strip().split("\n"):
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip()
            body = rest
    meta.setdefault("title", "Untitled")
    meta.setdefault("date", date.today().isoformat())
    meta.setdefault("summary", "")
    meta.setdefault("hero", "")
    meta["slug"] = os.path.splitext(os.path.basename(path))[0]
    meta["draft"] = meta.get("draft", "").lower() == "true"
    meta["body"] = body
    meta["words"] = len(re.findall(r'\w+', body))
    meta["mins"] = max(1, round(meta["words"] / 220))
    return meta


# ---------------------------------------------------------------- templates

CSS = """
@font-face{font-family:"Neue Montreal";src:url("https://framerusercontent.com/assets/EN0wrjjcgDdG3SMgxfEI19PNHRs.woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Neue Montreal";src:url("https://framerusercontent.com/assets/vEydk8LUwvYV3ZJtsQhKLqsza0.woff2");font-weight:500;font-display:swap}
@font-face{font-family:"Joane";src:url("https://framerusercontent.com/assets/s7QBt6TrbwZwxnd8WeMUW0iXFw.woff2");font-weight:900;font-display:swap}
:root{--paper:#fff;--panel:#fff;--ink:#191713;--muted:#5f5a4e;--line:rgba(25,23,19,.12);
--shadow:0 1px 2px rgba(25,23,19,.04),0 18px 48px -22px rgba(25,23,19,.28)}
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:"Neue Montreal","SF Pro Display",-apple-system,sans-serif;
font-weight:400;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
.topbar{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--paper) 88%,transparent);
backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid transparent}
.topbar.scrolled{border-bottom-color:var(--line)}
.bar{max-width:720px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:14px}
.brand{display:flex;align-items:center;gap:11px;text-decoration:none}
.brand .logo{font-family:"Joane",Georgia,serif;font-weight:900;font-style:italic;font-size:30px;line-height:.8}
.brand .nm{font-size:16px}
.bar nav{display:flex;gap:20px;font-size:15px}
.bar nav a{text-decoration:none;position:relative;min-height:44px;display:inline-flex;align-items:center}
.bar nav a::after{content:"";position:absolute;left:0;right:0;bottom:11px;height:1px;background:var(--ink);
transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.bar nav a:hover::after{transform:scaleX(1)}
/* The booking link is a button, not a nav item: filled, and no underline
   sweeping under a solid pill. */
.bar nav a.cta{background:var(--ink);color:var(--panel);border-radius:999px;padding:0 17px;
transition:opacity .2s ease}
.bar nav a.cta:hover{opacity:.86}
.bar nav a.cta::after{display:none}
.wrap{max-width:720px;margin:0 auto;padding:0 24px}
.lede{padding:54px 0 10px}
.lede h1{font-family:"Neue Montreal",sans-serif;font-weight:500;font-size:clamp(30px,5vw,44px);
line-height:1.08;letter-spacing:-.022em;margin:0}
.lede h1 em{font-family:"Joane",Georgia,serif;font-style:italic;font-weight:900}
.lede p{margin:14px 0 0;font-size:17.5px;color:var(--muted);max-width:560px;line-height:1.55}
.list{padding:30px 0 80px;display:grid;gap:4px}
.item{display:block;text-decoration:none;padding:24px 0;border-top:1px solid var(--line)}
.item:last-child{border-bottom:1px solid var(--line)}
.item .meta{font-family:"SF Pro Display",-apple-system,sans-serif;font-size:12.5px;letter-spacing:.1em;
text-transform:uppercase;color:var(--muted)}
.item h2{margin:9px 0 0;font-size:24px;font-weight:500;letter-spacing:-.015em;line-height:1.22}
.item p{margin:8px 0 0;color:var(--muted);font-size:16px;line-height:1.5}
.item .more{margin-top:12px;display:inline-flex;align-items:center;gap:6px;font-size:14.5px}
.item:hover h2{text-decoration:underline;text-underline-offset:3px}
.empty{padding:40px 0 90px;color:var(--muted)}
article{padding:46px 0 20px}
article .meta{font-family:"SF Pro Display",-apple-system,sans-serif;font-size:12.5px;letter-spacing:.1em;
text-transform:uppercase;color:var(--muted)}
article h1{font-family:"Neue Montreal",sans-serif;font-weight:500;font-size:clamp(28px,4.6vw,40px);
line-height:1.1;letter-spacing:-.022em;margin:12px 0 0;text-wrap:balance}
article .sum{margin:14px 0 0;font-size:18px;color:var(--muted);line-height:1.55}
article hr{border:0;border-top:1px solid var(--line);margin:30px 0}
.body{padding-bottom:40px}
.body h2{font-size:25px;font-weight:500;letter-spacing:-.015em;margin:34px 0 0;line-height:1.25}
.body h3{font-size:20px;font-weight:500;margin:26px 0 0}
.body p{margin:15px 0 0}
.body ul,.body ol{margin:15px 0 0;padding-left:22px}
.body li{margin:0 0 7px}
.body blockquote{margin:22px 0 0;padding:2px 0 2px 18px;border-left:2px solid var(--line);
color:var(--muted);font-style:italic}
.body code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;
background:color-mix(in srgb,var(--ink) 6%,transparent);padding:2px 5px;border-radius:5px}
.body p.statement{margin:28px 0 0;font-size:20.5px;font-weight:500;letter-spacing:-.013em;line-height:1.35}
.body figure,article figure{margin:28px 0 0}
.body figure img,article figure img{display:block;width:100%;height:auto;border-radius:12px;
border:1px solid var(--line);background:var(--panel)}
.body figcaption{margin:10px 0 0;font-size:14.5px;color:var(--muted);line-height:1.45}
.body a{text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px}
.foot{border-top:1px solid var(--line);margin-top:26px;padding:26px 0 80px;display:flex;
justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:15px;color:var(--muted)}
.foot a{text-decoration:none;border-bottom:1px solid var(--line)}
@media(max-width:640px){
  body{font-size:16.5px}
  .bar{padding:12px 18px}
  .bar nav{gap:14px;font-size:14px}
  .brand .nm{display:none}
  .wrap{padding:0 18px}
  .lede{padding:34px 0 6px}
  .body p.statement{font-size:19px}
}
@media (prefers-reduced-motion: no-preference){html{scroll-behavior:smooth}}
"""

SCRIPT = """
(function(){var b=document.getElementById('topbar');
function s(){b.classList.toggle('scrolled',window.scrollY>8)}s();
window.addEventListener('scroll',s,{passive:true})})();

/* Calendly in a modal rather than a new tab, so a reader does not lose the
   post. The link keeps its real href, so without JS — or if Calendly's script
   fails — it still works as an ordinary link. Loaded on the first click
   rather than on every page view. */
(function(){
  var PREFIX="https://calendly.com/", state="idle", pending=null;
  function fallback(){ if(pending) window.open(pending,"_blank","noopener"); }
  function show(){ if(window.Calendly&&pending) Calendly.initPopupWidget({url:pending}); else fallback(); }
  /* Calendly ships the popup as width:80%;min-width:900px;max-height:700px.
     Its own layout needs more than that: pick a date and the time column
     spills past the card's right edge, and the foot of the calendar is cut
     off with no scrollbar to say so. Appended straight after their
     stylesheet, so these win on source order as well as on !important. The
     <=975px block is theirs, restated because our rule would otherwise
     beat it and flatten the mobile sheet. */
  var FIT =
    ".calendly-overlay .calendly-popup{" +
      "width:calc(100% - 48px)!important;min-width:1000px!important;max-width:1120px!important;" +
      "height:calc(100% - 48px)!important;max-height:860px!important}" +
    "@media(max-width:975px){.calendly-overlay .calendly-popup{" +
      "width:100%!important;max-width:none!important;height:auto!important;" +
      "max-height:none!important}}";
  function load(){
    state="loading";
    var css=document.createElement("link");
    css.rel="stylesheet"; css.href="https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    var fit=document.createElement("style"); fit.textContent=FIT;
    document.head.appendChild(fit);
    var js=document.createElement("script");
    js.src="https://assets.calendly.com/assets/external/widget.js";
    js.onload=function(){state="ready";show()};
    js.onerror=function(){state="failed";fallback()};
    document.head.appendChild(js);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="'+PREFIX+'"]');
    if(!a) return;
    pending=a.href;
    if(state==="failed") return;
    e.preventDefault();
    if(state==="ready") show(); else if(state==="idle") load();
  });
})();
"""


def shell(title, desc, canonical, body, depth, image=None):
    up = "../" * depth
    image = image or f"{SITE}/assets/og-preview.png"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="article">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:image" content="{image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(title)}">
<meta name="twitter:description" content="{html.escape(desc)}">
<meta name="twitter:image" content="{image}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23191713'/%3E%3Ctext x='32' y='46' font-family='Georgia,serif' font-style='italic' font-weight='bold' font-size='40' fill='%23f4f2ec' text-anchor='middle'%3EN%3C/text%3E%3C/svg%3E">
<style>{CSS}</style>
</head>
<body>
<div class="topbar" id="topbar"><div class="bar">
  <a class="brand" href="{up}../index.html"><span class="logo">N</span><span class="nm">Naman Gupta</span></a>
  <nav>
    <a href="{up}index.html">Writing</a>
    <a href="{up}../index.html">Work</a>
    <a class="cta" href="{up}../call/">Book a call</a>
  </nav>
</div></div>
{body}
<script>{SCRIPT}</script>
</body>
</html>
"""


def nice_date(iso):
    try:
        y, m, d = (int(x) for x in iso.split("-"))
        months = ["January","February","March","April","May","June","July",
                  "August","September","October","November","December"]
        return f"{d} {months[m-1]} {y}"
    except Exception:
        return iso


def build():
    os.makedirs(POSTS, exist_ok=True)
    posts = [parse(os.path.join(POSTS, f))
             for f in sorted(os.listdir(POSTS)) if f.endswith(".md")]
    live = sorted([p for p in posts if not p["draft"]], key=lambda p: p["date"], reverse=True)

    # remove directories for posts that no longer exist or went back to draft.
    # Only ever touch a directory that holds a generated index.html and nothing
    # else, so a stray folder here is left alone rather than deleted.
    keep = {p["slug"] for p in live} | {"posts", "assets", "__pycache__"}
    for d in os.listdir(HERE):
        full = os.path.join(HERE, d)
        if os.path.isdir(full) and d not in keep and os.listdir(full) == ["index.html"]:
            shutil.rmtree(full)

    for p in live:
        out = os.path.join(HERE, p["slug"])
        os.makedirs(out, exist_ok=True)
        body = f"""<main class="wrap">
  <article>
    <div class="meta">{nice_date(p['date'])} · {p['mins']} min read</div>
    <h1>{inline(p['title'])}</h1>
    {f'<p class="sum">{inline(p["summary"])}</p>' if p['summary'] else ''}
    {figure('', p['hero'], '../assets/', 'lead') if p['hero'] else ''}
    <hr>
  </article>
  <div class="body">
{markdown(p['body'], prefix='../assets/')}
  </div>
  <div class="foot">
    <a href="../index.html">← All writing</a>
    <span>Naman Gupta · <a href="mailto:hello@namanbuilds.com">hello@namanbuilds.com</a></span>
  </div>
</main>"""
        open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(
            shell(f"{p['title']} — Naman Gupta", p["summary"] or p["title"],
                  f"{SITE}/blog/{p['slug']}/", body, depth=1,
                  image=f"{SITE}/blog/assets/{p['hero']}" if p['hero'] else None))

    if live:
        items = "\n".join(f"""    <a class="item" href="{p['slug']}/">
      <div class="meta">{nice_date(p['date'])} · {p['mins']} min read</div>
      <h2>{inline(p['title'])}</h2>
      <p>{inline(p['summary'])}</p>
      <span class="more">Read <span aria-hidden="true">→</span></span>
    </a>""" for p in live)
        listing = f'<div class="list">\n{items}\n  </div>'
    else:
        listing = ('<div class="empty"><p>Nothing published yet. '
                   'Add a Markdown file to <code>blog/posts/</code> and run '
                   '<code>python3 blog/build.py</code>.</p></div>')

    index_body = f"""<main class="wrap">
  <section class="lede">
    <h1>Notes on building <em>products</em></h1>
    <p>What I was actually deciding, and what it cost — mostly about fintech,
       identity and marketplaces, written while the detail is still fresh.</p>
  </section>
  {listing}
</main>"""
    open(os.path.join(HERE, "index.html"), "w", encoding="utf-8").write(
        shell("Writing — Naman Gupta",
              "Notes on building products: fintech, identity and marketplaces, "
              "by Naman Gupta, Senior Product Manager at Digio.",
              f"{SITE}/blog/", index_body, depth=0))

    drafts = [p for p in posts if p["draft"]]
    print(f"  built {len(live)} post(s)" + (f", {len(drafts)} draft(s) skipped" if drafts else ""))
    for p in live:
        print(f"    /blog/{p['slug']}/  {p['mins']} min  {p['title'][:52]}")
    for p in drafts:
        print(f"    (draft) {p['slug']}  {p['title'][:52]}")


if __name__ == "__main__":
    build()

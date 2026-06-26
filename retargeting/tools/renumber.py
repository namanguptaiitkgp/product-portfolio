#!/usr/bin/env python3
"""Renumber the retargeting deck screenshots: erase OCR-located values and
redraw new ones in matching font/color. Reads pristine sources from
assets/originals/, writes patched copies to assets/. Idempotent."""
import json, statistics
from PIL import Image, ImageDraw, ImageFont

ROOT = "/Users/namangupta/Projects/cinematic-light/retargeting"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
_fonts = {}


def font(size, bold=False):
    key = (round(size), bold)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(BOLD if bold else REG, round(size))
    return _fonts[key]


def fit_font(text, target_h, bold=False):
    lo, hi = 4, 300
    while hi - lo > 1:
        mid = (lo + hi) // 2
        bb = font(mid, bold).getbbox(text)
        if bb[3] - bb[1] <= target_h:
            lo = mid
        else:
            hi = mid
    return lo


def median_color(pixels):
    if not pixels:
        return (255, 255, 255)
    return tuple(int(statistics.median(p[i] for p in pixels)) for i in range(3))


def dist(a, b):
    return sum(abs(a[i] - b[i]) for i in range(3))


def sample(im, box, pad=5):
    x, y, w, h = box
    W, H = im.size
    ring = []
    for px in range(max(0, int(x - pad)), min(W, int(x + w + pad))):
        for py in (int(y - pad), int(y + h + pad)):
            if 0 <= py < H:
                ring.append(im.getpixel((px, py))[:3])
    bg = median_color(ring)
    inside = [im.getpixel((px, py))[:3]
              for px in range(max(0, int(x)), min(W, int(x + w)))
              for py in range(max(0, int(y)), min(H, int(y + h)))]
    ink_pixels = [p for p in inside if dist(p, bg) > 120]
    ink = median_color(ink_pixels) if ink_pixels else (40, 48, 60)
    return bg, ink


def draw_text(im, dr, box, text, align="left", bold=False, color=None, bg=None,
              scale=1.0):
    x, y, w, h = box
    sbg, sink = sample(im, box)
    bg = bg or sbg
    color = color or sink
    size = fit_font(text, h * scale, bold)
    f = font(size, bold)
    bb = f.getbbox(text)
    tw = bb[2] - bb[0]
    if align == "left":
        tx = x
    elif align == "right":
        tx = x + w - tw
    else:
        tx = x + w / 2 - tw / 2
    # erase: tight on the fixed edge, padded on the growth edge
    ex0 = min(x, tx) - (2 if align == "left" else 5)
    ex1 = max(x + w, tx + tw) + (2 if align == "right" else 5)
    dr.rectangle([ex0, y - 4, ex1, y + h + 4], fill=bg)
    dr.text((tx - bb[0], y - bb[1]), text, font=f, fill=color)


def tok_box(toks, find, at):
    cands = [t for t in toks if t["text"] == find]
    if not cands:
        return None
    best = min(cands, key=lambda t: (t["x"] + t["w"] / 2 - at[0]) ** 2 +
                                    (t["y"] + t["h"] / 2 - at[1]) ** 2)
    cx, cy = best["x"] + best["w"] / 2, best["y"] + best["h"] / 2
    if abs(cx - at[0]) > 80 or abs(cy - at[1]) > 40:
        return None
    return (int(best["x"]), int(best["y"]), int(best["w"]), int(best["h"]))


def group_toks(toks, contains, at_y, x_range, skip=()):
    return sorted([t for t in toks if contains in t["line"] and abs(t["y"] - at_y) < 30
                   and x_range[0] <= t["x"] <= x_range[1] and t["text"] not in skip],
                  key=lambda t: t["x"])


def line_union(grp):
    x0 = min(t["x"] for t in grp); y0 = min(t["y"] for t in grp)
    x1 = max(t["x"] + t["w"] for t in grp); y1 = max(t["y"] + t["h"] for t in grp)
    return (int(x0), int(y0), int(x1 - x0), int(y1 - y0))


def redraw_line(im, dr, toks, contains, at_y, x_range, new_texts, bold_flags=None,
                skip=(), align="left"):
    """Redraw a whole 'value label …' line: every token resized from its own
    original box, with the original inter-token gaps preserved."""
    grp = group_toks(toks, contains, at_y, x_range, skip)
    if len(grp) != len(new_texts):
        print(f"  !! line mismatch '{contains}' -> {[t['text'] for t in grp]}")
        return
    boxes = [(int(t["x"]), int(t["y"]), int(t["w"]), int(t["h"])) for t in grp]
    gaps = [boxes[i][0] - (boxes[i - 1][0] + boxes[i - 1][2]) for i in range(1, len(boxes))]
    rend = []
    for i, (box, new) in enumerate(zip(boxes, new_texts)):
        b = bold_flags[i] if bold_flags else False
        _, ink = sample(im, box)
        size = fit_font(new, box[3], b)
        f = font(size, b)
        bb = f.getbbox(new)
        rend.append((new, f, bb, ink, box))
    total = sum(bb[2] - bb[0] for _, _, bb, _, _ in rend) + sum(gaps)
    x0 = boxes[0][0]
    if align == "right":
        x0 = boxes[-1][0] + boxes[-1][2] - total
    u = line_union(grp)
    ex0 = min(x0, u[0]) - 4
    ex1 = max(u[0] + u[2], x0 + total) + 4
    bg, _ = sample(im, (ex0, u[1], ex1 - ex0, u[3]))
    dr.rectangle([ex0, u[1] - 4, ex1, u[1] + u[3] + 4], fill=bg)
    cx = x0
    for j, (new, f, bb, ink, box) in enumerate(rend):
        dr.text((cx - bb[0], box[1] - bb[1]), new, font=f, fill=ink)
        cx += bb[2] - bb[0]
        if j < len(gaps):
            cx += gaps[j]


def load(name):
    im = Image.open(f"{ROOT}/assets/originals/shot-{name}.png").convert("RGB")
    toks = json.load(open(f"{ROOT}/tools/ocr-out/{name}.json"))
    return im, toks, ImageDraw.Draw(im)


def apply_tokens(im, dr, toks, patches, tag):
    misses = []
    for p in patches:
        box = p.get("bbox") or tok_box(toks, p["find"], p["at"])
        if not box:
            misses.append(p.get("find", "bbox"))
            continue
        draw_text(im, dr, box, p["new"], align=p.get("align", "left"),
                  bold=p.get("bold", False), scale=p.get("scale", 1.0),
                  color=p.get("color"))
    print(f"{tag}: {len(patches) - len(misses)}/{len(patches)} tokens"
          + (f"  MISSED {misses}" if misses else ""))


# ─────────────────────────── listing ───────────────────────────
def measure_ink(im, box):
    """True glyph extent inside an OCR box (Vision inflates tokens inside
    long lines to full line height)."""
    x, y, w, h = box
    bg, _ = sample(im, box)
    rows = [py for py in range(int(y), int(y + h))
            if any(dist(im.getpixel((px, py))[:3], bg) > 120
                   for px in range(int(x), int(x + w)))]
    if not rows:
        return y, h
    return rows[0], rows[-1] - rows[0] + 1


def replace_value(im, dr, toks, find, at, new, bold=True):
    """Replace just the numeric value of a 'value label' line. The label is
    never touched: if the new value is wider than the gap, shrink to fit."""
    box = tok_box(toks, find, at)
    if not box:
        print(f"  !! value '{find}' not found at {at}")
        return
    x, y, w, h = box
    nxt = [t for t in toks if t["x"] > x + w - 2 and t["x"] - (x + w) < 220
           and t["y"] < y + h and t["y"] + t["h"] > y]
    limit = min(t["x"] for t in nxt) - 6 if nxt else x + w + 220
    top, ink_h = measure_ink(im, box)
    bg, ink = sample(im, box)
    size = fit_font(new, ink_h, bold)
    f = font(size, bold)
    bb = f.getbbox(new)
    while bb[2] - bb[0] > limit - x and size > 5:
        size -= 1
        f = font(size, bold)
        bb = f.getbbox(new)
    dr.rectangle([x - 2, top - 3, max(x + w, x + bb[2] - bb[0]) + 3, top + ink_h + 3], fill=bg)
    # keep the new value bottom-aligned with the original glyphs
    dr.text((x - bb[0], top + ink_h - (bb[3] - bb[1]) - bb[1]), new, font=f, fill=ink)


im, toks, dr = load("listing")
apply_tokens(im, dr, toks, [
    {"find": "1813", "at": (262, 355), "new": "18130", "bold": True},
    {"find": "1687", "at": (837, 356), "new": "16870", "bold": True},
    {"find": "25",   "at": (1378, 353), "new": "250", "bold": True},
    {"find": "101",  "at": (2540, 355), "new": "1010", "bold": True},
], "listing")
for find, at, new in [
    ("1.77", (222, 686), "17.7"),
    ("1.65", (241, 761), "16.5"),
    ("25",   (276, 809), "250"),
    ("99",   (282, 923), "990"),
    ("65",   (331, 1010), "650"),
    ("29",   (328, 1063), "290"),
    ("5",    (336, 1118), "50"),
    ("26",   (1182, 686), "260"),
    ("24",   (1188, 761), "240"),
    ("2",    (1201, 924), "20"),
    ("2",    (1248, 1007), "20"),
    ("7",    (2103, 686), "70"),
    ("7",    (2108, 758), "70"),
]:
    replace_value(im, dr, toks, find, at, new)
im.save(f"{ROOT}/assets/shot-listing.png")
print("listing: values done")

# ─────────────────────────── analytics ───────────────────────────
im, toks, dr = load("analytics")
apply_tokens(im, dr, toks, [
    {"find": "1.77k", "at": (651, 292), "new": "17.7k", "bold": True},
    {"find": "30",    "at": (815, 292), "new": "300", "bold": True},
    {"find": "103",   "at": (1466, 292), "new": "1030", "bold": True},
    {"find": "63",    "at": (1641, 294), "new": "630"},
    {"bbox": (1856, 278, 16, 30), "new": "50"},
    {"find": "35",    "at": (2101, 294), "new": "350"},
    {"find": "1.67k", "at": (2667, 292), "new": "16.7k", "bold": True},
    {"find": "Total:1798", "at": (449, 734), "new": "Total: 17980", "align": "center"},
    {"find": "1.42k", "at": (1163, 750), "new": "14.2k", "align": "right", "bold": True},
    {"find": "353",   "at": (1178, 801), "new": "3530", "align": "right", "bold": True},
    {"find": "712|51%", "at": (1960, 748), "new": "7120 | 51%", "bold": True},
    {"find": "680|49%", "at": (1960, 799), "new": "6800 | 49%", "bold": True},
    {"find": "1.77k", "at": (1278, 679), "new": "17.7k"},
    {"find": "1.39",  "at": (2020, 679), "new": "13.9"},
    {"find": "1768",  "at": (2412, 1033), "new": "17680", "align": "center", "scale": 0.9},
    {"find": "1415",  "at": (2826, 1024), "new": "14150", "align": "right"},
    {"find": "353",   "at": (2831, 1071), "new": "3530", "align": "right"},
    {"find": "1415",  "at": (2827, 1146), "new": "14150", "align": "right"},
    {"find": "63",    "at": (2838, 1190), "new": "630", "align": "right"},
    {"bbox": (2841, 1228, 14, 24), "new": "50", "align": "right"},
    {"find": "1347",  "at": (2827, 1275), "new": "13470", "align": "right"},
    {"find": "353",   "at": (2831, 1334), "new": "3530", "align": "right"},
    {"find": "353",   "at": (2831, 1376), "new": "3530", "align": "right"},
    {"bbox": (2826, 1468, 24, 22), "new": "170", "align": "right"},
], "analytics")
redraw_line(im, dr, toks, "1.80 k", 272, (40, 220), ["18.0", "k"], [1, 0])
redraw_line(im, dr, toks, "1.77 k", 273, (980, 1180), ["17.7", "k"], [1, 0])
im.save(f"{ROOT}/assets/shot-analytics.png")
print("analytics: done")

# ─────────────────────────── stepcard ───────────────────────────
im, toks, dr = load("stepcard")
apply_tokens(im, dr, toks, [
    {"find": "567", "at": (106, 110), "new": "5670", "align": "center", "scale": 0.9, "bold": True},
    {"find": "448", "at": (526, 104), "new": "4480", "align": "right"},
    {"find": "119", "at": (526, 148), "new": "1190", "align": "right"},
    {"find": "448", "at": (526, 223), "new": "4480", "align": "right"},
    {"find": "63",  "at": (533, 268), "new": "630", "align": "right"},
    {"find": "5",   "at": (537, 312), "new": "50", "align": "right"},
    {"find": "380", "at": (527, 354), "new": "3800", "align": "right"},
    {"find": "119", "at": (526, 412), "new": "1190", "align": "right"},
    {"find": "119", "at": (527, 455), "new": "1190", "align": "right"},
    {"find": "36",  "at": (534, 556), "new": "360", "align": "right"},
], "stepcard")
im.save(f"{ROOT}/assets/shot-stepcard.png")

# ─────────────────────────── channel ───────────────────────────
im, toks, dr = load("channel")
apply_tokens(im, dr, toks, [
    {"find": "33", "at": (115, 376), "new": "330", "bold": True},
    {"find": "1",  "at": (1521, 376), "new": "102", "bold": True},
    {"bbox": (1505, 412, 160, 22), "new": "31% success rate"},
    {"find": "3%", "at": (522, 701), "new": "31%", "align": "center", "bold": True},
    {"find": "0%", "at": (1467, 701), "new": "49%", "align": "center", "bold": True},
    {"find": "0%", "at": (2410, 700), "new": "21%", "align": "center", "bold": True},
], "channel")
grp = group_toks(toks, "3% of users who received this completed", 498, (2300, 2950))
if grp:
    u = line_union(grp)
    _, blue = sample(im, (grp[0]["x"], grp[0]["y"], grp[0]["w"], grp[0]["h"]))
    draw_text(im, dr, u, "31% of users who received this completed", align="right", color=blue)
im.save(f"{ROOT}/assets/shot-channel.png")
print("channel: badge done")

# ─────────────────────────── groupstatus ───────────────────────────
im, toks, dr = load("groupstatus")
apply_tokens(im, dr, toks, [
    {"find": "31", "at": (78, 283), "new": "328"},
    {"find": "32", "at": (78, 357), "new": "329"},
    {"find": "33", "at": (78, 429), "new": "330"},
], "groupstatus")
replace_value(im, dr, toks, "33", (102, 133), "330", bold=False)
grp = group_toks(toks, "Showing 31-33 of 33", 501, (60, 320))
if grp:
    draw_text(im, dr, line_union(grp), "Showing 328-330 of 330")
# active page chip "2" -> wider chip with "11" (Digio blue, white text)
bg, _ = sample(im, (1577, 484, 70, 56), pad=8)
dr.rectangle([1573, 480, 1651, 544], fill=bg)
dr.rounded_rectangle([1579, 486, 1645, 538], radius=8, fill=(37, 99, 235))
f = font(26)
bb = f.getbbox("11")
dr.text((1612 - (bb[0] + bb[2]) / 2, 512 - (bb[1] + bb[3]) / 2), "11", font=f, fill=(255, 255, 255))
im.save(f"{ROOT}/assets/shot-groupstatus.png")
print("groupstatus: done")

# ─────────────────────────── history ───────────────────────────
im, toks, dr = load("history")
apply_tokens(im, dr, toks, [
    {"find": "33", "at": (88, 352), "new": "330", "bold": True},
    {"find": "33", "at": (1015, 679), "new": "330", "align": "right"},
    {"find": "33", "at": (331, 812), "new": "241", "bold": True},
    {"bbox": (148, 794, 22, 34), "new": "89", "bold": True},
], "history")
grp = group_toks(toks, "33 total users reminded", 250, (700, 1100))
if grp:
    u = line_union(grp)
    redraw_line(im, dr, toks, "33 total users reminded", 250, (700, 1100),
                ["330", "total", "users", "reminded"], [1, 0, 0, 0], align="right")
im.save(f"{ROOT}/assets/shot-history.png")
print("history: done")

# ─────────────────────────── impact ───────────────────────────
im, toks, dr = load("impact")
GREEN = (76, 140, 50)
RED = (183, 49, 44)
GRAY = (90, 100, 116)
DARK = (31, 41, 55)
BLUES = [(36, 86, 199), (80, 121, 214), (157, 180, 234), (203, 216, 245)]

apply_tokens(im, dr, toks, [
    {"find": "33", "at": (117, 352), "new": "330", "bold": True},
    {"find": "1", "at": (1066, 354), "new": "142", "bold": True},
    {"find": "32", "at": (2051, 352), "new": "188", "bold": True},
], "impact")

redraw_line(im, dr, toks, "3.0% of total", 389, (1000, 1400), ["43.0%", "of", "total"])
redraw_line(im, dr, toks, "97.0% of total", 389, (1950, 2400), ["57.0%", "of", "total"])

# title line (skip the chart icon token)
grp = group_toks(toks, "Breakdown of 1 completions", 517, (0, 1400), skip=("il.",))
if grp:
    draw_text(im, dr, line_union(grp), "Breakdown of 142 completions via retargeting",
              bold=True, color=DARK)

# breakdown bar -> segments 89/38/12/3
BAR = (64, 578, 2876, 622)
dr.rectangle([BAR[0] - 6, BAR[1] - 6, BAR[2] + 6, BAR[3] + 6], fill=(255, 255, 255))
total_w = BAR[2] - BAR[0]
x = BAR[0]
for i, (fr, lab) in enumerate(zip([89 / 142, 38 / 142, 12 / 142, 3 / 142],
                                  ["89", "38", "12", ""])):
    w = total_w * fr
    dr.rounded_rectangle([x, BAR[1], x + w, BAR[3]], radius=10, fill=BLUES[i],
                         corners=(i == 0, i == 3, i == 3, i == 0))
    if lab and w > 70:
        f = font(24, True)
        bb = f.getbbox(lab)
        dr.text((x + w / 2 - (bb[0] + bb[2]) / 2, (BAR[1] + BAR[3]) / 2 - (bb[1] + bb[3]) / 2),
                lab, font=f, fill=(255, 255, 255))
    x += w

# legend
dr.rectangle([56, 642, 1100, 692], fill=(255, 255, 255))
lx, ly = 64, 667
for color, label, num in zip(BLUES, ["1st Reminder", "2nd Reminder", "3rd Reminder", "4th+ Reminder"],
                             ["89", "38", "12", "3"]):
    dr.ellipse([lx, ly - 9, lx + 18, ly + 9], fill=color)
    lx += 30
    f = font(25); fb = font(25, True)
    t1 = label + " — "
    bb1 = f.getbbox(t1)
    dr.text((lx, ly - 12), t1, font=f, fill=GRAY)
    lx += bb1[2] - bb1[0]
    bb2 = fb.getbbox(num)
    dr.text((lx, ly - 12), num, font=fb, fill=DARK)
    lx += bb2[2] - bb2[0] + 46

# per-card lines
cards_x = [77, 791, 1500, 2209]
for cx, n in zip(cards_x, ["330", "241", "203", "191"]):
    grp = [t for t in toks if abs(t["y"] - 944) < 14 and cx - 10 <= t["x"] <= cx + 420
           and "Sent" in t["line"]]
    if grp:
        draw_text(im, dr, line_union(grp), f"Sent to {n} users", color=GRAY)
for cx, n in zip(cards_x, ["+89", "+38", "+12", "+3"]):
    grp = [t for t in toks if abs(t["y"] - 1004) < 16 and cx - 10 <= t["x"] <= cx + 420
           and "completed" in t["line"]]
    if not grp:
        continue
    u = line_union(grp)
    sizes = [fit_font(n, u[3], True), fit_font(" completed", u[3], False)]
    size = min(sizes)
    fb, f = font(size, True), font(size)
    bb1, bb2 = fb.getbbox(n), f.getbbox(" completed")
    bg, _ = sample(im, u)
    dr.rectangle([u[0] - 4, u[1] - 4, max(u[0] + u[2], u[0] + (bb1[2] - bb1[0]) + (bb2[2] - bb2[0])) + 4,
                  u[1] + u[3] + 4], fill=bg)
    dr.text((u[0] - bb1[0], u[1] - bb1[1]), n, font=fb, fill=GREEN)
    dr.text((u[0] + bb1[2] - bb1[0] - bb2[0], u[1] - bb2[1]), " completed", font=f, fill=GRAY)

# success-rate lines per card
rate_lines = [("3% success rate", 1055, (60, 500), "27%"),
              ("0% success rate", 1051, (780, 1200), "16%"),
              ("0% success rate", 1055, (1490, 1900), "6%"),
              ("0% success rate", 1055, (2200, 2600), "2%")]
for contains, at_y, xr, pct in rate_lines:
    grp = group_toks(toks, contains, at_y, xr)
    if grp:
        draw_text(im, dr, line_union(grp), f"{pct} success rate", color=GRAY)

# mini rate bars
for cx, r, c in zip(cards_x, [0.27, 0.16, 0.06, 0.02], [GREEN, GREEN, RED, RED]):
    dr.rounded_rectangle([cx + 3, 1094, cx + 3 + 650, 1107], radius=6, fill=(241, 243, 247))
    dr.rounded_rectangle([cx + 3, 1094, cx + 3 + max(18, 650 * r), 1107], radius=6, fill=c)

# chips on cards 1+2
for cx, txt in zip(cards_x[:2], ["Strong lift", "Good lift"]):
    dr.rectangle([cx + 2, 1118, cx + 290, 1166], fill=(255, 255, 255))
    f = font(26, True)
    bb = f.getbbox(txt)
    tw = bb[2] - bb[0]
    dr.rounded_rectangle([cx + 8, 1121, cx + 8 + tw + 44, 1161], radius=20, fill=(229, 243, 229))
    dr.text((cx + 30 - bb[0], 1141 - (bb[1] + bb[3]) / 2), txt, font=f, fill=(45, 122, 51))

# insights sentence (keep the bold "Insights:" prefix)
grp = group_toks(toks, "Insights: The 1st and 2nd", 1234, (0, 2900), skip=("Insights:",))
if grp:
    draw_text(im, dr, line_union(grp),
              "The 1st and 2nd reminders drive the completions with a combined 38% "
              "success rate, compared with 7.4% from the 3rd and 4th reminders.",
              color=(74, 64, 42))

# bottom bar green 43% / red 57%
B = (64, 1494, 2876, 1542)
dr.rectangle([B[0] - 6, B[1] - 6, B[2] + 6, B[3] + 6], fill=(255, 255, 255))
gw = (B[2] - B[0]) * 0.43
dr.rounded_rectangle([B[0], B[1], B[0] + gw, B[3]], radius=10, fill=GREEN,
                     corners=(True, False, False, True))
dr.rounded_rectangle([B[0] + gw, B[1], B[2], B[3]], radius=10, fill=RED,
                     corners=(False, True, True, False))
for lab, lcx in [("142", B[0] + gw / 2), ("188", B[0] + gw + (B[2] - B[0] - gw) / 2)]:
    f = font(26, True)
    bb = f.getbbox(lab)
    dr.text((lcx - (bb[0] + bb[2]) / 2, (B[1] + B[3]) / 2 - (bb[1] + bb[3]) / 2),
            lab, font=f, fill=(255, 255, 255))

# caption to the right of "When All Notified"
grp = group_toks(toks, "1 completed 32 pending", 1460, (2400, 2900))
if grp:
    u = line_union(grp)
    size = fit_font("142 completed  188 pending (57.0%)", u[3])
    f = font(size)
    t1, t2 = "142 completed", "  188 pending (57.0%)"
    bb1, bb2 = f.getbbox(t1), f.getbbox(t2)
    total = (bb1[2] - bb1[0]) + (bb2[2] - bb2[0])
    x0 = u[0] + u[2] - total
    bg, _ = sample(im, u)
    dr.rectangle([min(x0, u[0]) - 4, u[1] - 4, u[0] + u[2] + 4, u[1] + u[3] + 4], fill=bg)
    dr.text((x0 - bb1[0], u[1] - bb1[1]), t1, font=f, fill=GREEN)
    dr.text((x0 + bb1[2] - bb1[0] - bb2[0], u[1] - bb2[1]), t2, font=f, fill=RED)

im.save(f"{ROOT}/assets/shot-impact.png")
print("impact: done")
print("ALL DONE")

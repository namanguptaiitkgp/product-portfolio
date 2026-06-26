# Naman — Portfolio (cinematic-light)

**`index.html`** at the project root is the front door: the "Naman — Sr. Product Manager"
portfolio landing page. Its four project sections each link to a supporting case page:

| # | Section | Links to | What it is |
|---|---|---|---|
| 1 | **Ninja Credit** (Ninja Global) | `ninja-credit/ninjacredit.html` | SME lending case study (offline copy of the gukhan.in page) |
| 2 | **Ninja Connect** (The Trade Desk) | `ninja-connect/tradedesk.html` | Commerce platform case study (offline copy of the gukhan.in page) |
| 3 | **KYC Verification** | `cinematic/index_2_light.html` | the Selfie Service cinematic deck (11 scenes, liveness) |
| 4 | **Retargeting** | `retargeting/Retargeting Case Study Studio Blue.html` | the Retargeting cinematic deck (Studio Blue theme) |

### Future / archived landing mocks (kept, not in the live flow)

| Page | What it is |
|---|---|
| `decks-portal.html` | the earlier cinematic-decks portal (links to `cinematic/` decks + contact sheet) |
| `counter-intuitive.html` | Counter-Intuitive contact-sheet deck (self-contained bundle) |
| `counter-intuitive/` | the Counter-Intuitive work/ideas site (`work.html`, `index.html`, …) |
| `_archive/old-framer-cases/` | superseded single-page Framer exports (`ninjaconnect.html`, `ninjacredit.html`) |

The **raw full-site mirrors** downloaded from gukhan.in live in `downloaded-sites/`
(`gukhan-ninjacredit/`, `gukhan-tradedesk/`) and are the source the `ninja-credit/` and
`ninja-connect/` clean copies were pruned from.

## Stack

Per the handoff README, this matches the source exactly:

- **React 18.3.1** + **ReactDOM** loaded from unpkg (pinned, with SRI hashes)
- **@babel/standalone 7.29.0** for in-browser JSX compilation (`type="text/babel"`)
- **No build step.** Edit a `.jsx` or `.css` file and refresh.

Fonts: **Geist** (primary), **Newsreader** (editorial italic), **JetBrains Mono** (labels/meta) — loaded from Google Fonts inside `cinematic-light.css`.

## Running

Browsers refuse to load `text/babel` scripts from `file://` (CORS). Serve over HTTP:

```bash
cd ~/Projects/cinematic-light
npx serve .          # any port, defaults to :3000
# or
python3 -m http.server 8000
```

Then open `http://localhost:3000/` (or `:8000/`) and pick a deck from the landing page.

## Navigation (Decks 1 & 2)

- **← / →** or **Space / PageDown / PageUp** — prev / next scene
- **Home / End** — first / last scene
- **1–9** — jump to scene N
- Click the **dots** at the bottom for direct nav
- URL hash mirrors current scene (`#scene-3`) — refresh-safe and shareable

Selfie deck only: click any image marked `.zoomable` for a full-screen lightbox (← / → to navigate, Esc to close).

## Project structure

```
cinematic-light/
├── index.html                            # ← FRONT DOOR: portfolio landing → 4 sections
├── ninja-credit/                         # § 1 — Ninja Credit case (pruned offline copy)
│   └── ninjacredit.html
├── ninja-connect/                        # § 2 — Trade Desk case (pruned offline copy)
│   └── tradedesk.html
├── retargeting/                          # § 4 — Retargeting deck (Studio Blue)
├── decks-portal.html                     # future mock — old cinematic-decks portal
├── counter-intuitive.html                # future mock — self-contained contact-sheet bundle
├── counter-intuitive/                    # future mock — work/ideas site
├── _archive/old-framer-cases/            # superseded single-page Framer exports
├── downloaded-sites/                     # raw 122MB×2 gukhan.in mirrors (source of extracts)
├── README.md                             # this file
└── cinematic/                            # shared source for the Prologue + Selfie decks (§ 3)
    ├── index_light.html                  # Deck 1 entry — Prologue
    ├── index_2_light.html                # Deck 2 entry — Selfie (+ inline lightbox JS)
    ├── stage.jsx                         # shared Stage engine (scale, scene track, nav)
    ├── cinematic-light.css               # tokens + Stage primitives + Prologue scene layouts
    │
    ├── app.jsx                           # Prologue: assembles 10 scenes into <Stage>
    ├── scenes-a.jsx                      #   scenes 1–5
    ├── scenes-b.jsx                      #   scenes 6–10
    │
    ├── selfie-app.jsx                    # Selfie: assembles 11 scenes into <Stage>
    ├── selfie-scenes-a.jsx               #   scenes 1–5
    ├── selfie-scenes-b.jsx               #   scenes 6–11
    ├── selfie-light.css                  # Selfie scene layouts + lightbox styles
    │
    └── assets/                           # face-localizer images (used only in Selfie scene 9)
        ├── orig-all.jpg
        └── feat-*.png                    # face / chin / eyeL / eyeR / mouth / nose / all
```

## Notes on Deck 3 (Counter-Intuitive — Contact Sheet)

This deck ships only as a **self-contained standalone HTML** (~1.5MB) with no separated source.
It uses a custom asset-bundler pattern — assets are base64-embedded in `<script type="__bundler/manifest">` tags and decoded into Blob URLs on `DOMContentLoaded`. It works in any modern browser straight from the file system (no server needed).

To modify it, you'd need to rebuild the bundle from its original source — not included in this handoff.

## Design tokens (light theme)

Defined in `cinematic/cinematic-light.css :root`:

| Token | Value | Use |
|---|---|---|
| `--ink-0` | `#FFFFFF` | the canvas |
| `--ink-1` | `#F6F3EC` | warm off-white section |
| `--ink-2` | `#EFEBE1` | lifted tint |
| `--paper` | `#221C30` | primary text |
| `--paper-dim` | `#5C5468` | secondary text |
| `--paper-quiet` | `#8B8498` | tertiary / labels |
| `--amber` | `oklch(58% 0.15 65)` | warm accent (the candlelit one) |
| `--coral` | `oklch(55% 0.19 28)` | human warmth |
| `--teal`  | `oklch(52% 0.13 200)` | strategic / insight |
| `--ease-cine` | `cubic-bezier(.2, .8, .2, 1)` | cinematic motion |

Stage letterbox: `#ECE8E0`. Atmosphere: warm radial wash + low-opacity dark grain (`mix-blend-mode: multiply`).

## Motion

Entrance animations run **only on the active scene** (`.scene[data-active="true"] .a-*`). Per-element stagger via inline `style={{"--d":"450ms"}}`.

| Class | Effect | Duration |
|---|---|---|
| `.a-rise` | translateY(24px) + scale(.985) + blur(8px) → 0 | 1100ms |
| `.a-fade` | opacity 0 → 1 | 1400ms |
| `.a-slide` | translateX(-40px) → 0 | 1000ms |
| `.a-pop` | scale(.6) rotate(-3deg) → 1 | 900ms |
| `.a-draw` | SVG stroke draw-on | 1800ms |

Scene transition: `transform 1100ms cubic-bezier(.2, .8, .2, 1)`.
Reduced-motion / print: visible end-state is the base style — extra motion is gated under `@media (prefers-reduced-motion)`.

## Source

Built from the handoff at `~/Claude/Projects/design_handoff_cinematic_light/`.
See that folder's `README.md` for full per-scene narrative descriptions and the canonical token / typography / motion spec.

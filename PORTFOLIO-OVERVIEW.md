# Product Portfolio — Project Overview

A cinematic, light-themed portfolio site for **Naman Gupta (Sr. Product Manager)**.
A landing page ("front door") links out to four product case studies, three of which
are animated, slide-based "cinematic decks" built in React (no build step).

- **Live site:** https://namanbuilds.com/ (custom domain via CNAME; GitHub Pages origin is namanguptaiitkgp.github.io/product-portfolio/)
- **Repo:** `git@github.com:namanguptaiitkgp/product-portfolio.git` (GitHub Pages, public)
- **Local path:** `~/Documents/Claude/Projects/cinematic-light`
- **Hosting:** GitHub Pages (free, project site), served from `main` branch `/root`

---

## The four case studies

| # | Section | Entry file | What it is |
|---|---------|-----------|------------|
| 1 | **Ninja Credit** (Ninja Global) | `ninja-global-deck/Ninja Global Case Study.html` | Cinematic deck — cross-border agri-trade lending, built 0→1 (Situation/Task/Action/Result) |
| 2 | **Ninja Connect** (Trade Desk) | `ninja-connect/tradedesk.html` | Static case page (pruned offline copy of a Framer export) |
| 3 | **KYC Verification** (Selfie) | `cinematic/index_2_light.html` | Cinematic deck — Selfie/liveness KYC (12 slides) |
| 4 | **Retargeting** (Studio Blue) | `retargeting/Retargeting Case Study Studio Blue.html` | Cinematic deck — retargeting module (11 slides) |

The **front door** is `index.html` at the repo root; its four project sections link to the pages above.

---

## Stack

- **React 18.3.1 + ReactDOM** from unpkg (pinned, with SRI hashes)
- **@babel/standalone 7.29.0** for in-browser JSX (`<script type="text/babel">`)
- **No build step** — edit a `.jsx`/`.css`/`.html` file and refresh
- Fonts: Geist, Newsreader, JetBrains Mono (Google Fonts); the landing page also uses Neue Montreal / Joane (Framer-hosted)
- **Requires internet** to render decks (React/Babel/fonts load from CDNs)

> Note: browsers refuse to load `text/babel` from `file://`, so the decks must be
> served over HTTP. Locally: `python3 -m http.server 8000` then open `http://localhost:8000/`.

---

## The "Stage" cinematic engine (decks 1, 3, 4)

Each deck assembles scenes into a shared `<Stage>` component (`stage.jsx`). There are
**three independent copies** of this engine (one per deck folder):
`cinematic/stage.jsx`, `ninja-global-deck/cinematic/stage.jsx`, `retargeting/cinematic/stage.jsx`.

Engine features:
- Fixed 1920×1080 canvas, auto-scaled to viewport (letterboxed)
- Horizontal scene track with smooth transitions; `data-active` drives per-scene entrance animations
- **Navigation:** ← / → / Space / PageUp / PageDown, Home/End, number keys 1–9, clickable dots
- **Mouse-wheel navigation** (added): scroll down = next scene, scroll up = prev, with a cooldown so trackpad inertia doesn't skip slides. The Ninja Global deck routes wheel through `scrollCapture` so tall scenes scroll internally first.
- URL hash mirrors current scene (`#scene-3`) — refresh-safe and shareable

Each case study also has a fixed **"← Home" button** (top-left) that returns to `index.html`.

---

## Project structure (tracked files only)

```
cinematic-light/
├── index.html                  # FRONT DOOR: landing page → 4 sections
├── .nojekyll                   # tells GitHub Pages to serve files verbatim
├── assets/
│   └── Naman-Gupta-Resume.pdf  # linked from the header "Resume" link
├── ninja-global-deck/          # § 1 Ninja Credit (cinematic deck)
├── ninja-connect/              # § 2 Trade Desk (static case page)
├── cinematic/                  # § 3 Selfie/KYC deck (+ shared Prologue deck source)
├── retargeting/                # § 4 Retargeting deck (Studio Blue)
├── counter-intuitive/          # archived mocks (not in live flow)
├── decks-portal.html           # archived portal mock
└── PORTFOLIO-OVERVIEW.md       # this file
```

**Excluded from the repo** (via `.gitignore`, kept locally only):
- `downloaded-sites/` — raw ~245MB gukhan.in mirrors (source material)
- `_archive/` — superseded single-page Framer exports
- `.DS_Store`, `node_modules/`

---

## Deployment / updating

Any change goes live via GitHub Pages (auto-rebuilds ~1–2 min after push):

```bash
git add -A && git commit -m "your message" && git push
```

Auth is via an **SSH key** already configured on this machine (`~/.ssh/id_ed25519`).

---

## Recent changes (this session)

- Swapped § 1 "Ninja Credit" to link to the new cinematic deck (`ninja-global-deck/`) instead of the old static page
- Added mouse-wheel scene navigation to the Ninja Credit + Selfie decks
- Added a "← Home" back button to all four case studies
- Deployed the whole site to GitHub Pages
- Wired the header **Resume** link to `assets/Naman-Gupta-Resume.pdf`
- Updated the header **LinkedIn** link to `https://www.linkedin.com/in/gupta-naman-iitkgp/`

---

## Known placeholders still to fill in

| Where | File | Needs |
|-------|------|-------|
| Ninja Credit deck brand label reads `WALMART` | `ninja-global-deck/ninjaglobal-app.jsx:21` | Confirm intended brand (others say `DIGIO`) |
| Three empty result stats ("—" / "add your number") | `ninja-connect/tradedesk.html:420-422` | Real GMV, throughput, efficiency numbers |
| Retargeting section uses a text placeholder cover | `index.html:496` | Real cover imagery |
| Old (unlinked) Ninja Credit static page has same "add your number" stats | `ninja-credit/ninjacredit.html:443-445` | Only matters if re-linked |


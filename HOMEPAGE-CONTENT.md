# Homepage — content, structure and flow

Everything on `index.html`, in the order a visitor meets it. Generated from the
live page, so if you edit the site this file needs updating with it.

- **Live:** https://namanbuilds.com/ (custom domain via `CNAME`; GitHub Pages origin is `namanguptaiitkgp.github.io/product-portfolio/`)
- **Source:** a single `index.html` — inline `<style>`, inline `<script>`, no build step
- **Audiences:** hiring managers for senior product roles, and founders hiring a product consultant

---

## Page flow at a glance

```
Header (sticky)
  └─ name · role · nav

Hero                      ← who I am, what I do, 3 actions
  └─ headline · subline · proof line · buttons

Proof bar                 ← 4 numbers + company row
  └─ the credibility hit, before any case study

Case studies (×4)         ← ordered by strategic value
  ├─ 1  Selfie & Liveness KYC      #cases
  ├─ 2  Ninja Credit
  ├─ 3  Onboarding Retargeting
  └─ 4  stock-tracker
       each: title · company · one-liner · "Open case" ·
             "20-second version" (collapsed) · media · "what I shipped" strip

Patent highlight          ← US 12,387,059, links to Google Patents

Work with me              #book
  ├─ heading + subhead
  ├─ 3 offer cards → Calendly
  └─ proof strip

How I work                ← 3 steps

Testimonials              ← present but display:none until real quotes exist

Earlier work              #earlier
  └─ Ninja Connect (no strip, no summary — deliberately secondary)

Closing CTA               ← email + LinkedIn

Footer                    ← name · email · location

Floating button           ← fixed; appears after the hero, hides over #book and the footer
```

**Three routes out of the page:** book a call (`#book` → Calendly), email
(`hello@namanbuilds.com`), or read the work (case study decks, resume).

---

## 1. Head / metadata

| Field | Value |
|---|---|
| `<title>` | Naman Gupta — Product Owner @ Digio \| ex-Capital One, Ninjacart \| Marketplaces & 0→1 products |
| `description` | Product Owner at Digio, previously Capital One, Ninjacart and Cogoport. Seven years building fintech, lending and marketplace products from the first decision through to real-world scale. |
| `canonical` / `og:url` | `https://namanbuilds.com/` |
| `og:image` | `https://namanbuilds.com/assets/og-preview.png` (1200×630, generated) |
| favicon | inline SVG "N" monogram — no file to host |

## 2. Header (sticky)

- **Name:** Naman Gupta
- **Role:** Product Owner @ Digio · ex-Capital One, Ninjacart
- **Nav:** Work with me → `#work` · LinkedIn ↗ · Resume → `resume/`

Gains a hairline border once the page scrolls. On phones the role line is
hidden and the "Work with me" link is dropped, so the bar does not wrap.

## 3. Hero

> **I turn *ambiguous* business problems into products that *work in the real world*.**
> *(italic serif on "ambiguous" and "work in the real world")*

Subline:
> Seven years across fintech, lending, logistics and marketplaces — building products from the first decision through to real-world scale.

*No proof line.* The numbers live in the proof bar immediately below; carrying
them in both places repeated three of the four figures one scroll apart.

Buttons: **Let's talk** → `#book` (primary) · **Explore my work** → `#cases` · **View resume** → `resume/`

## 4. Proof bar

| Number | Label |
|---|---|
| 2L+ | Daily KYC verifications through flows I own |
| ~$350M | Annual disbursals on a credit line I built from scratch |
| 6% → 2% | NPA reduction after I changed how credit was scored |
| 1 | US patent in deep learning, granted at Capital One |

Company row: IIT Kharagpur · Capital One · Ninjacart · Cogoport · Digio · ex-founder

---

## 5. Case studies

Each card is: name, company (revealed on hover), tag, a one-liner carrying a
number, an "Open case" link, a collapsible **20-second version**
(Context / My role / Key decision / Result + a tradeoff paragraph), the media
band, and a **what I shipped** strip (chips · stack · scale).

### 1 — Selfie & Liveness KYC · Digio · `#cases`
*A liveness check has two ways to fail: let a fraudster through, or turn away a real customer. I owned the line between them.*
→ `cinematic/index_2_light.html`

- **Context** — Regulated onboarding requires matching a live face to a government ID. Too loose and you onboard fraudsters; too strict and you lose genuine customers at the last step.
- **My role** — Product Owner for the selfie & liveness flow — capture UX, scoring thresholds, and the audit trail an auditor actually reads.
- **Key decision** — Score and keep every attempt instead of a single pass/fail. Retakes became evidence rather than friction.
- **Result** — 2L+ verifications a day, each with a liveness score, a face-match confidence and a timestamped attempt history.
- **Tradeoff** — Every point the liveness threshold moves trades fraud caught against genuine users rejected. Tuned for the lender's loss appetite, and made configurable rather than baked in.
- **Shipped:** Android app · iOS app · Selfie liveness · Synthetic-document detection · OCR · Fraud decisioning · No-code workflow builder
- **Stack:** Model thresholds tuned to the lender's loss appetite, not the cleanest demo. Event instrumentation per client and step.
- **Scale:** 2L+ verifications a day

### 2 — Ninja Credit · Ninjacart (Walmart-backed)
*Retailers with no credit history still needed working capital. We underwrote them on what they actually bought.*
→ `ninja-global-deck/Ninja Global Case Study.html`

- **Context** — Retailers buying fresh produce daily had no formal credit history, so banks wouldn't lend.
- **My role** — Product Manager, 0→1 — from the first underwriting rule to a live lending product at national scale.
- **Key decision** — Underwrite on observed buying behaviour rather than financial statements nobody had.
- **Result** — ~$350M in annual disbursals, NPAs down from 6% to 2%.
- **Tradeoff** — Lower NPAs and higher GMV pull in opposite directions. Limits down for thin-history buyers, up for proven ones.
- **Shipped:** Android app · iOS app · Ninja Global · Unified Credit-Line Framework · Payment Guarantee · LOS / LMS · Partner APIs
- **Stack:** Underwriting on observed transaction history, not statements. Karza · Razorpay · Xflow · Onfido.
- **Scale:** ~$350M annual disbursals · NPAs 6% → 2%

### 3 — Onboarding Retargeting · Digio
*Most KYC drop-offs never come back on their own. This finds who stalled, where, and sends the one nudge that restarts them.*
→ `retargeting/Retargeting Case Study Studio Blue.html`

- **Context** — Onboarding is a funnel with a dozen places to quit. Every abandoned journey is acquisition spend already paid for.
- **My role** — Product Owner — instrumenting the funnel, defining the drop-off taxonomy, designing the nudge logic.
- **Key decision** — Treat the *reason* for the drop-off as the trigger, not the drop-off itself.
- **Result** — Stalled journeys get a targeted nudge tied to the step that failed.
- **Tradeoff** — Nudges have a ceiling before they become spam; the cap per journey was a product decision, not a technical one.
- **Shipped:** Drop-off taxonomy · Funnel instrumentation · Triggered nudges
- **Stack:** The reason for the drop-off is the trigger. Capped messages per journey.
- **Scale:** *(none — no cleared number yet)*

### 4 — stock-tracker · Personal project
*Built and shipped solo: an AI research assistant that reads the news, checks fundamentals and tracks large-investor activity every morning. Proof I build the things I spec.*
→ external: `namanguptaiitkgp.github.io/stock-tracker/docs/how-it-works.html`

- **Shipped:** Daily portfolio brief · News ingestion · Fundamentals check · Large-investor tracking
- **Stack:** Built and shipped solo — spec through to running code. Runs every morning.
- *(no 20-second summary, no scale figure)*

---

## 6. Patent highlight

- **US Patent 12,387,059 · Capital One · Granted 2025**
- *Identifying zones of interest in text transcripts using deep learning*
- Co-inventor. Links to Google Patents (`US12387059B2`).

## 7. Work with me — `#book`

**A difficult product decision? Let's work through it.**
> Sometimes you need someone experienced to help decide what to build. Sometimes the product exists but users aren't getting through it. And sometimes a feature looks promising until you examine what happens when it gets something wrong. Fixed scope or ongoing, your call.

| Offer | Window | For |
|---|---|---|
| Product Discovery & Strategy | 2–4 weeks · fixed fee | Teams entering a new market, launching a product line, or unsure what to build next |
| Funnel & Growth Diagnostics | 1–3 weeks · fixed fee | Products where users drop off — onboarding, quote-to-booking, checkout, KYC |
| Fractional Product Lead / AI Advisory | Monthly retainer | Founders without a senior PM, or teams making their first big AI bet |

Every card ends in **Book a call ↗** → `https://calendly.com/namanbuilds/intro-call`.

Proof strip below the cards:
> Built and scaled products across fintech, lending, logistics and identity — Ninjacart (Walmart-backed), Cogoport, Capital One (US patent), Digio — and currently consulting for a Dubai-based freight-tech marketplace.

## 8. How I work

**Understand the problem. Make the call. Leave something usable.**

1. **Find the real problem** — One call to work out where the real cost sits.
2. **Decide with evidence** — The spec written from your data and users, with failure modes and success metrics attached.
3. **Make it actionable** — Specs, metrics, a prioritised list; not a slide deck that needs translating.

## 9. Testimonials

Section exists in the markup with `display:none`. Remove the style attribute to
reveal it — add real quotes with name, role and company first.

## 10. Earlier work — `#earlier`

**Earlier work** — *A commerce platform I built at Ninjacart, kept here for completeness.*
Holds **Ninja Connect** (chat-based commerce platform). Deliberately has no
strip and no summary, so it reads as secondary.

## 11. Closing CTA

**Have a product problem worth solving?**
> Hiring for a senior product role, or deciding what to build next? Tell me what you're working through and I'll give you an honest view of where I can help.

Buttons: **Email me ↗** (`mailto:hello@namanbuilds.com`) · **Connect on LinkedIn ↗**

## 12. Footer

`Naman Gupta — Product Owner @ Digio` · `hello@namanbuilds.com · India`

## 13. Floating button

"Hire me for a project ↗" → `#book`. Fixed bottom-right (24/24), pill, ink fill.
Appears once the hero scrolls out of view; hides again whenever `#book` or the
footer is on screen. On phones it becomes a full-width bottom bar with
safe-area padding, and `body` gets matching `padding-bottom` so it never covers
the footer. Has an `aria-label` and a `:focus-visible` outline.

---

## Behaviour (inline script)

| What | Detail |
|---|---|
| Header border | Added past 10px of scroll |
| Hero entrance | Eases up on load; skipped under `prefers-reduced-motion` |
| Background cycle | `--paper` moves through 6 daylight tints every 7s; skipped under `prefers-reduced-motion` |
| Floating button | Two `IntersectionObserver`s — one on the hero, one on `#book` + footer |
| Smooth scroll | `scroll-behavior:smooth`, disabled under `prefers-reduced-motion`; anchors use `scroll-margin-top:112px` to clear the sticky header |

---

## Known inconsistencies

**Resolved** in the editorial pass of 18 Oct 2026:

- ~~Footer and resume carried an older role title~~ — all three surfaces now read **Product Owner @ Digio**.
- ~~`description` duplicated `<title>`~~ — replaced with a real description.
- ~~"Before the AI work" and the AI-framed closer~~ — both rewritten to match the broader positioning.
- ~~Hero said 7 years, resume said 6+~~ — **seven years** everywhere, and the PDF regenerated.
- ~~Hero proof line repeated the proof bar~~ — removed; the numbers appear once.

**Still open — these need your facts, not copyediting:**

1. **Retargeting has no number** in its one-liner, result line or strip.
2. **The Selfie deck opens with "1.5 lakh selfies a day"** while the homepage says 2L+ verifications. These may measure different things — confirm before aligning.
3. **"Android app / iOS app" on the Digio strip** — if Digio ships SDKs embedded in clients' apps rather than its own store apps, these should read "SDK".
4. **The 2L+ and ~$350M figures** have not been confirmed public-safe since you last raised the question.

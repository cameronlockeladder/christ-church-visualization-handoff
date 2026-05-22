# Christ Church Oak Brook — Roof Restoration · PRD

## Original Problem Statement

> Build a landing page: https://github.com/cameronlockeladder/christ-church-visualization-handoff/tree/emergent-overlay-handoff

## Latest Iteration (2026-05-22 · v2)

User feedback requested:

- Board-only access gate (street number "501" as the code).
- Fix Christ Church + Locke & Ladder logos at the top-left, both visible at all times.
- All Inter — no serif anywhere.
- Move the color key inside the bounds of the photo with a slight gradient
  behind it. New color key: **Yellow = Crane, Blue = Scaffolding, Green =
  Dumpster, Orange = Materials & forklift path.**
- Hyper-functional copy. No AI-slop. A layperson in the church should
  understand each step in seconds.
- Add a Partners section after the timeline.
- Site-vibe Gemini reference behind a classy button (not immediately visible).
- Total Investment at the very bottom — one all-in number ($1,073,660),
  labelled "Total Investment", factual tone, no itemization, not the
  headline.

## What This Is

A static, board-facing interactive timeline for the Christ Church Oak
Brook roof restoration project (July – August 2026). Built as pure HTML +
CSS + vanilla JS. Three source files: `index.html`, `styles.css`,
`app.js`, plus an `assets/` directory.

## Architecture

| Concern        | Choice                                                     |
| -------------- | ---------------------------------------------------------- |
| Hosting target | Vercel (static)                                            |
| Stack          | Pure HTML, CSS, vanilla JS (no React, no build)            |
| Serving        | `serve` for local preview only                             |
| Backend        | Stubbed `/api/health` only — site is purely static         |
| Auth           | Session-only access gate · code = street number ("501")    |
| Fonts          | Inter (300 / 400 / 500 / 600 / 700)                        |

## Personas

- **Board member** (primary) — opens the page after the announcement,
  enters the street number, scrubs through 9 phase states, comes away with
  a clear understanding of what is on site, when, and what the project
  costs all-in.
- **Pastor / staff** (secondary) — answers congregant questions, sometimes
  shares the link.
- **Locke & Ladder operator** — uses it in board meetings as a sales /
  scope-confirmation artifact.

## Core Requirements

- 9 timeline steps matching the handoff manifest exactly.
- Stage image stack at 2392×1792 aspect ratio (base + photo overlays +
  recolorable mask overlays).
- Mask overlays recolor:
  - active → `#C8651E` (warm rust)
  - completed → `#3F7A50` (green)
- Color key inside the image (bottom-right) with a soft gradient behind it
  fading the road area so the legend is readable.
- Access gate gating the timeline.
- Plain-language copy on every step.
- Reference button → lightbox with the Gemini concept image plus a clear
  "not accurate for placement" disclaimer.
- Single all-in Total Investment at the bottom of the page.

## What's Been Implemented

### 2026-05-22 (v1)
- 9-step scrubber, mask-based recoloring, base image + overlay stack.
- Scrubber + tick navigation, prev/next, play/pause, keyboard arrow keys.

### 2026-05-22 (v2 — current)
- Session-only access gate (`501` unlocks).
- Fixed top-left brand pill — Christ Church wordmark + Locke & Ladder icon.
- Color key moved inside the photo with a corner gradient.
- Updated color key palette: yellow / blue / green / orange.
- Hyper-functional copy rewrite on every step and every note.
- Total Investment block at the bottom — $1,073,660 all-in, factual tone.
- Reference button + lightbox modal for the Gemini concept image.
- Partners section scaffolded — drop logos into `assets/partners/` and add
  entries to the `PARTNERS` array in `app.js`.
- All Inter (Cormorant Garamond removed).

### Verified

- Gate accepts `501` and stores access for the session.
- Gate rejects wrong codes with an inline error message + shake animation.
- Real-user (non-forced) clicks on each tick navigate to that step.
- Lightbox opens / closes via button, close X, and Escape key.
- All overlay assets return HTTP 200 and render correctly per step.
- Responsive layout holds on desktop, tablet, and mobile widths.

## Backlog / Next

### P0 — Waiting on user
- Upload partner logos to `assets/partners/` and update the `PARTNERS`
  array in `app.js`. Until then, the section shows a developer placeholder.

### P1 — Easy adds
- Replace placeholder copy in the gate if the church wants different
  wording.
- Swap in a transparent-background Christ Church logo if the current PNG
  reads dark on the warm header.

### P2
- Add a small date input that maps any date in 07/06 – 08/28 to the
  matching step.
- "Print / PDF" affordance for board handouts.

### P3
- Animated wipe-reveal between Existing and Complete states.
- Annotated phase map (per the older Claude Opus brief, deferred).

## Next Actions

1. Drop partner logos into `/app/frontend/assets/partners/` and add entries
   to `PARTNERS` in `app.js`. Site instantly renders them in the grid.
2. Deploy `/app/frontend/` to Vercel (or download just `index.html`,
   `styles.css`, `app.js`, and the `assets/` folder).

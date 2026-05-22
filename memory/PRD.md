# Christ Church Oak Brook — Roof Restoration · PRD

## Original Problem Statement

> Build a landing page: https://github.com/cameronlockeladder/christ-church-visualization-handoff/tree/emergent-overlay-handoff

## Iteration History

### v1 (2026-05-22)
- 9-step scrubber with mask-based recoloring, base image + overlay stack.
- Scrubber + tick navigation, prev/next, play/pause, keyboard arrow keys.

### v2 (2026-05-22)
- Session-only access gate (`501` unlocks).
- Fixed top-left brand pill — Christ Church wordmark + Locke & Ladder icon.
- Color key moved inside the photo with corner gradient.
- Updated color key palette: yellow / blue / green / orange.
- Hyper-functional copy rewrite on every step and every note.
- Total Investment block at the bottom — $1,073,660 all-in, factual tone.
- Reference button + lightbox modal for the Gemini concept image.
- All Inter (Cormorant Garamond removed).

### v3 (2026-05-22 — current)
- **Partner marquee**: 5 partner logos pulled from the handoff repo loop
  left-to-right, infinitely. Logos shown in natural brand colors — Bone
  Roofing's white-on-transparent logo gets a dark tile, all others get a
  warm cream tile.
- **Feathered legend gradient**: replaced the rectangular gradient with a
  radial gradient + radial mask so the corner softens away in every
  direction.
- **Date picker**: small "Pick a date" input above the stage; maps any
  date in the 07/06 – 08/28 window to the right step. Out-of-window dates
  clamp to existing (before) or complete (after).
- **Reference button repositioned** above the stage (between header and
  photo) per the new request.
- **Background watermark**: subtle Oak Brook street map fixed behind the
  page, edges softly masked via radial gradient.
- **Today's status chip** (auto-detect): shows "Project begins in N days"
  before the start, the current phase name during the project, or
  "Project complete" after.
- **Hard mobile optimization**: dedicated breakpoints at 820px, 640px,
  560px, and 380px. Date picker and reference button stack and stretch
  full-width on phones. Scrubber labels hide; dot row remains tappable.
  Touch-friendly tweaks on coarse pointers (bigger thumb, bigger
  buttons). Partner tiles shrink for mobile.

## Architecture

| Concern        | Choice                                                    |
| -------------- | --------------------------------------------------------- |
| Hosting target | Vercel (static)                                           |
| Stack          | Pure HTML, CSS, vanilla JS (no React, no build)           |
| Serving        | `serve` for local preview only                            |
| Backend        | Stubbed `/api/health` only — site is purely static        |
| Auth           | Session-only access gate · code = street number ("501")   |
| Fonts          | Inter (300 / 400 / 500 / 600 / 700)                       |

## File Map

```
/app/frontend/
├── index.html       # DOM + content (all sections)
├── styles.css       # Warm RH palette + heavy mobile breakpoints
├── app.js           # Gate, scrubber, date map, marquee, lightbox, today chip
└── assets/
    ├── brand/
    │   ├── christ-church-logo.png
    │   ├── locke-ladder-logo.png
    │   └── client/christ-church/oak-brook-streets.png  # bg watermark
    ├── partners/
    │   ├── imperial-crane.png
    │   ├── bone-roofing-supply.webp
    │   ├── prime-scaffold.png
    │   ├── great-lakes-kwik-space.png
    │   └── porta-potty-dogs.webp
    └── timeline-overlays/
        └── [12 overlay images, 2392×1792]
```

## Verified This Iteration

- Date picker → step mapping: 07/15 → Scaffolding setup, 08/08 → Steeple
  complete, 08/22 → Sanctuary 3 active, 09/15 → Complete. All pass.
- Marquee renders 10 tiles (5 logos × 2 for seamless loop), 38s linear
  infinite animation.
- Mobile at 390×844: brand pill compact, sections legible, partners
  marquee scaling correctly.
- Gate, lightbox, scrubber, prev/next/play/keyboard all still working
  after refactor.

## Backlog

### P1 — Easy adds
- Hover/pause the marquee on touch via a "tap to pause" UI hint
  (currently desktop-only via `:hover`).
- "Share with the board" mailto button that pre-fills the access code.
- Print stylesheet for board handouts.

### P2
- Annotated phase map (deferred from the original Claude Opus brief).
- Animated wipe-reveal between Existing and Complete states.

### P3
- Multi-language toggle if international congregants need it.

## Next Actions for User

1. Save the four source files plus `assets/` to GitHub.
2. Connect the repo to Vercel — framework preset "Other", no build
   command. Done.

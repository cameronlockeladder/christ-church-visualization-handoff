# Christ Church Oak Brook — Roof Restoration Timeline · PRD

## Original Problem Statement

> Build a landing page: https://github.com/cameronlockeladder/christ-church-visualization-handoff/tree/emergent-overlay-handoff

User clarifications gathered during kickoff:

- Use the repo as **reference** with creative liberty (not byte-for-byte).
- **Static** landing page only — no backend / no forms.
- Use the **content** that ships in the repo.
- Deliverable is **source HTML** the user will deploy via Vercel to their
  own domain.

## What This Actually Is

The "landing page" is, per the handoff brief
(`emergent-overlay-handoff/EMERGENT_PROMPT.md`), a board-facing interactive
**timeline scrubber** that explains the July–August 2026 roof restoration
project at Christ Church Oak Brook. Audience is the church board, not a
marketing visitor.

## Architecture

| Concern        | Choice                                                       |
| -------------- | ------------------------------------------------------------ |
| Hosting target | Vercel (static)                                              |
| Stack          | Pure HTML, CSS, vanilla JS (no React, no build)              |
| Serving        | `serve` for local preview only                               |
| Backend        | Stubbed `/api/health` only (not used by the site)            |
| Assets         | `/assets/timeline-overlays/` — 12 PNG/JPG layers at 2392×1792 |
| Fonts          | Inter (body) + Cormorant Garamond italic (display accents)   |

## Personas

- **Board member** (primary) — opens the page, scrubs through 9 phase
  states, leaves with a clear understanding of what equipment is on site
  and when.
- **Pastor / staff** (secondary) — uses it to answer congregant questions
  about disruption to Sunday services.
- **Locke Ladder team** (operator) — uses it as a sales / scope-confirmation
  artifact in board meetings.

## Core Requirements (static)

- 9 ordered timeline steps matching the handoff manifest:
  1. Existing view
  2. Scaffolding setup — 07/06–07/31 2026
  3. Steeple work — 08/03–08/07 2026
  4. Steeple complete
  5. Sanctuary 1 active — 08/10–08/28 2026
  6. Sanctuary 2 active
  7. Sanctuary 3 active
  8. Sanctuary 4 active
  9. Complete (after Phase 2)
- All overlays are stacked over the base image at exact same canvas size.
- Sanctuary masks recolor:
  - active → section's own color (#B56F39 / #8F7B34 / #4F7478 / #7A6092)
  - completed → green #3F7A50
- Equipment overlays (scaffolding, crane, dumpster, materials path) toggle
  per step per the manifest.
- Restoration Hardware visual feel: warm off-white paper, no glow, no neon,
  no marketing hero.
- Plain layperson copy on every step.
- Contract figure is intentionally left as "to be confirmed" per the brief.

## What's Been Implemented (2026-05-22)

- `/app/frontend/index.html`, `styles.css`, `app.js` — full timeline UI.
- 9-step scrubber with: drag, prev/next buttons, play/pause auto-advance,
  keyboard arrow keys, clickable tick markers, color key legend.
- `/app/frontend/assets/timeline-overlays/` — full set of overlay assets
  copied from the handoff.
- Static-site `yarn start` running through `serve` so the supervisor
  preview keeps working.
- `/app/frontend/README.md` — deployment instructions for Vercel.

### Verified

- All 9 steps render correct layer combinations and colors.
- All 12 overlay assets return HTTP 200.
- Real-user (non-forced) clicks on each tick navigate to that step.
- Prev/Next/Play/Keyboard controls all behave correctly.
- Responsive layout holds on 1400 / 1024 / 720 viewports.

## Backlog

### P1 — High value, simple

- Add a "Print / PDF" affordance for board members who want a hard copy of
  the current phase view.
- Add a small image lightbox on click — so a board member can pop the
  current stage out at full resolution.

### P2 — Once Locke Ladder is ready

- Drop in the **final contract figure** in the "Investment" card. Currently
  reads "Contract figure to be confirmed."
- Hook a **Print Date / Custom Date input** at the top that maps an input
  date to the matching step (per the handoff date logic — e.g. `08/22/2026`
  → Sanctuary 2 step).
- Replace the static after-roof-only overlay with a wipe/reveal animation
  (gesture-driven) between "existing" and "complete" states.

### P3 — Stretch

- Add a downloadable EagleView PDF link inside the "Phase 2 Inspection"
  card.
- Optional second page: full annotated phase map (per the
  CLAUDE_OPUS_4_7_DESIGN_PROMPT.md spec, deferred from this scope).

## Next Actions

1. Hand the three files (`index.html`, `styles.css`, `app.js`) plus the
   `assets/` folder to Vercel — site is deployable as-is.
2. Confirm final contract figure with Locke Ladder, then update the
   "Investment" card.
3. (Optional) Replace `Christ Church Oak Brook` branding with the actual
   church logo asset if/when provided.

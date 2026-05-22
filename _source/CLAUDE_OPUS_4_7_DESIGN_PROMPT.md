# Claude Opus 4.7 Design Prompt

You are building a board-facing interactive staging visualization for a Christ Church roofing/scaffold install. Prioritize visual clarity, accurate interpretation of provided source materials, and fast decision usefulness. This is for a church board/congregation audience, not an internal construction drawing.

## Non-Negotiable Context

Use this repo as the source of truth. Do not invent site placements that are not supported by the sketches, notes, aerials, or stills.

Important: one previous AI-generated annotated map had inaccurate placements. Treat files in `assets/reference-renders/` as style/structure references only unless explicitly marked source. Do not copy their placements blindly.

Correct color key:

- Blue = scaffolding
- Yellow circle = crane
- Green rectangle = dumpster
- Orange = material route
- Purple = forklift route

## Goal

Create a polished, interactive web prototype that lets a board member enter a date and understand what the Christ Church work site will look like on that date.

If the date is `08/22/2026`, the page must show Phase 2:

- sanctuary/eave scaffold remains active;
- north step-up scaffold remains if supported by the notes;
- steeple scaffold has been removed;
- crane is gone/off site;
- dumpster remains;
- forklift route is active from south staging/canister area to loading/work area;
- material route is active from material/loading area to roof/scaffold work zone;
- stained-glass plywood protection is temporary and removed for Sunday/services;
- board/security wall around scaffold zones remains.

## Deliverable

Build a single-page interactive webpage/prototype with these views:

1. Top control area:
   - date input;
   - current phase label;
   - small status summary.

2. Main visual area:
   - image slider using the stills in `assets/stills-webp/`;
   - default starting view should be source frame `0180`;
   - scrub/previous/next/play controls;
   - clean transition between images.

3. Phase map view:
   - use aerial/stills/sketches to create a manual, clean annotation map;
   - do not overload the map with paragraphs;
   - use numbered markers and a side panel for explanations;
   - include a clear legend with the required color key.

4. Date state logic:
   - July 6-31, 2026: scaffold setup;
   - August 3-7, 2026: Phase 1 steeple work, crane active;
   - August 10-28, 2026: Phase 2 sanctuary work, crane removed.

5. Board-facing answer panel:
   - what equipment is visible;
   - what access is affected;
   - where material/debris moves;
   - what is temporary;
   - what still needs confirmation.

## Source Files To Use First

- `source-notes/christ-church-staging-notes-breakdown-2026-05-21.md`
- `source-notes/christ-church-gemini-meeting-notes-2026-05-21.txt`
- `sketches/`
- `eagleview/`
- `assets/stills-selected/`
- `assets/stills-webp/`
- `prototype/frames-manifest.json`
- `source-manifests/stills-manifest.json`

Useful external model/context links:

- Photogrammetry: https://poly.cam/capture/37dadf33-79a0-4bc2-abda-0f3acabacdda
- Gaussian splat: https://poly.cam/capture/3c1da4a0-341f-4fa2-b9fc-a1afa6154d36

Use photogrammetry for geometry reference if needed. Use Gaussian splat for visual context only.

## Visual Direction

Make it form-over-function but still operationally useful:

- restrained, premium, construction-professional;
- dark charcoal UI, white text, gold accent is acceptable;
- use the real site imagery as the dominant visual;
- avoid decorative gradients/orbs;
- avoid in-app explanatory essays;
- use concise labels, numbered callouts, and side panels;
- do not put huge text blocks directly over the map.

## Accuracy Rules

If placement is uncertain, label it as "Confirm exact location" rather than pretending certainty.

Do not place:

- exact dumpster footprint;
- exact crane/outrigger footprint;
- exact porta potty;
- exact canister;
- exact crew parking;
- final forklift route;

unless the notes/sketches/aerials clearly support it. Use "proposed/confirm" language where necessary.

## Known Notes

- Material staging/canister should be in the far south parking lot near the tree line.
- Forklift route should avoid the main parking lot and daycare roundabout.
- Porta potty should be near north scaffold/bushy area with service access.
- Boom truck may lift sanctuary materials to adjacent flat roof in Phase 2.
- Dumpster remains after crane leaves.
- Crane is Phase 1 only.
- Board/security wall should be shown around scaffold zones.

## Output Quality Bar

The result should let Chris or a board member answer:

- Where will scaffolding be?
- When is the crane on site?
- What is still present on August 22, 2026?
- Where do materials and debris move?
- What parking/access areas are affected?
- What parts still require confirmation?

Make the prototype clean enough to share, but do not fake survey-level precision.

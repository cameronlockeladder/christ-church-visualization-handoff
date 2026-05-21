# Christ Church Visualization Handoff

Purpose-built handoff repo for creating a board-facing interactive staging visualization for the Christ Church install.

## What This Repo Contains

- `assets/stills-webp/` - all 205 drone stills converted to lightweight WebP for fast design/prototype use.
- `assets/stills-selected/` - higher-quality key view frames to start from.
- `prototype/` - current static image slider prototype. It starts at frame `0180` and removes source frames `0098-0106`.
- `sketches/` - Chris's rough hand sketches showing scaffold/crane/dumpster/route intent.
- `source-notes/` - meeting notes, transcript export, rough plan notes, and source email/doc files.
- `eagleview/` - EagleView PDF/pages and aerial reference.
- `photoshop-drafts/` - source/working PSD drafts when included.
- `assets/reference-renders/` - reference exports from earlier attempts. Treat rejected-placement images as structure/style references only, not placement truth.
- `source-manifests/` - machine-readable source paths, frame list, and working assumptions.

## Critical Accuracy Warning

Do not infer final construction placement from the AI-generated annotated map. It was rejected for inaccurate placement. Use the sketches, meeting notes, EagleView/aerials, and the still slider to manually place elements.

Correct color key from Cameron:

- Blue = scaffolding
- Yellow circle = crane
- Green rectangle = dumpster
- Orange = material route
- Purple = forklift route

## Date Logic

- `07/06/2026 - 07/31/2026`: scaffold setup
- `08/03/2026 - 08/07/2026`: Phase 1 steeple work, crane active, dumpster active
- `08/10/2026 - 08/28/2026`: Phase 2 sanctuary work, crane gone, steeple scaffold gone, dumpster remains, forklift/material routes active

If a user enters `08/22/2026`, show Phase 2:

- sanctuary/eave scaffold remains;
- steeple scaffold is removed;
- crane is removed/off site;
- dumpster remains;
- material route and forklift route are active;
- stained glass plywood protection is temporary and removed for services.

## Preferred Output

Create an interactive webpage/prototype, optimized for Claude Design handoff:

- date input at the top;
- phase status panel based on date;
- image rotation/slider using the stills;
- a manually correct annotated phase map;
- board-facing notes that answer likely questions without overcrowding the visual.

## Useful External Links

- Photogrammetry: https://poly.cam/capture/37dadf33-79a0-4bc2-abda-0f3acabacdda
- Gaussian splat: https://poly.cam/capture/3c1da4a0-341f-4fa2-b9fc-a1afa6154d36

Use photogrammetry for geometry reference if needed. Use the splat for visual context only.

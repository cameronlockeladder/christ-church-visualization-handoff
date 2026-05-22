# Prompt For Emergent

Build a standalone micro webpage for Christ Church Oak Brook that explains the roof project timeline, scope, and site sequence using a large image-based scrubber.

Use the assets in `assets/timeline-overlays/`. The base image and all overlays share the exact same canvas: 2392 x 1792. Stack every overlay directly over the base image with identical sizing and origin. Do not crop, reposition, or manually redraw the roof areas.

The four sanctuary overlays are solid blue PNG masks in the exact shape of each roof section. They are no longer empty transparent placeholders. Use those blue masks for the section geometry.

Style direction: warm off-whites, quiet Restoration Hardware feel, Inter font, plain layperson language. This should not feel like a tech dashboard. No hype. No marketing hero. No hover interactions. No neon outlines. No glows.

Core interaction:

Create one main timeline slider/scrubber. As the user scrubs, show the matching equipment and roof overlays. Text can sit on the image itself if readable.

Timeline steps:

1. Existing view
   - Show `base-existing-2392x1792.jpg`.
   - No overlays.

2. Scaffolding setup
   - Dates: 07/06/2026 - 07/31/2026.
   - Show `scaffolding-overlay.png`.
   - Explain that this is setup before active tear-off begins.

3. Steeple work
   - Dates: 08/03/2026 - 08/07/2026.
   - Show `scaffolding-overlay.png`, `crane-overlay.png`, `dumpster-overlay.png`, and `steeple-overlay.png`.
   - Explain that existing cedar is removed from the steeple, new Brava cedar begins, and debris goes through a chute to the dumpster.

4. Steeple complete
   - Date label: Upon completion of steeple.
   - Show `scaffolding-overlay.png`, `dumpster-overlay.png`, and completed steeple.
   - Do not show the crane.
   - Important: sanctuary scaffolding remains visible. Scaffolding remains around the sanctuary until both steeple and sanctuary work are complete.

5. Sanctuary 1 active
   - Dates: 08/10/2026 - 08/28/2026.
   - Show `scaffolding-overlay.png`, `dumpster-overlay.png`, `materials-path-overlay.png`, completed steeple, and `sanctuary-01-overlay.png` as active.

6. Sanctuary 2 active
   - Same date range: 08/10/2026 - 08/28/2026.
   - Sanctuary 1 is completed green.
   - Sanctuary 2 is active with its own color.

7. Sanctuary 3 active
   - Same date range: 08/10/2026 - 08/28/2026.
   - Sanctuary 1 and 2 are completed green.
   - Sanctuary 3 is active with its own color.

8. Sanctuary 4 active
   - Same date range: 08/10/2026 - 08/28/2026.
   - Sanctuary 1, 2, and 3 are completed green.
   - Sanctuary 4 is active with its own color.

9. Complete
   - Date label: After Phase 2 completion.
   - Hide equipment/progress overlays.
   - Wipe or reveal `after-roof-only-overlay.png` over the base image.

Suggested colors:

- Steeple active: `#AF6D2C`
- Sanctuary 1 active: `#B56F39`
- Sanctuary 2 active: `#8F7B34`
- Sanctuary 3 active: `#4F7478`
- Sanctuary 4 active: `#7A6092`
- Completed: `#3F7A50`
- Equipment/staging: muted warm gray/brown

Required copy points:

- 07/06/2026 - 07/31/2026: scaffolding setup.
- 08/03/2026 - 08/07/2026: tear off existing cedar on steeple, begin new Brava cedar, dispose existing roof through chute to dumpster.
- Upon steeple completion: steeple scaffolding is removed, crane departs, dumpster remains, sanctuary scaffolding remains.
- 08/10/2026 - 08/28/2026 Phase 2: sanctuary roof removed and rebuilt section by section with new Brava cedar and metal drip edge.
- Roof deck inspection and mitigation happen during Phase 2.
- Material staging moves from the dedicated parking lot to the flat roof.
- Boom truck is brought out only to lift material.
- Plywood protects stained glass during work.
- Plywood is removed during service times and is not permanently fixed to the wall.
- Stained glass remains functional for Sunday and any additional services.

Partner acknowledgement assets:

- Use partner logos from `assets/partner-logos/`.
- Use source/copy details from `notes/partner-credits.md` and `asset-manifest.json`.
- Keep this section plain and factual, not promotional.
- Use the Imperial Crane logo for the Imperial Crane / BJ Bohne line. BJ Bohne is an individual, not a separate logo asset.
- Bone Roofing Supply's official logo is white on transparency; place it on a darker warm neutral tile or band.

Do not invent a contract price. Leave price as a placeholder unless a final number is provided.

Reference caution:

`site-vibe-reference-gemini.png` is only a visual mood reference. It is not accurate enough for placement, scaffolding logic, or roof-area geometry.

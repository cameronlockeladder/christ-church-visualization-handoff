# Christ Church Oak Brook Emergent Overlay Handoff

This folder is the clean handoff for rebuilding the timeline page in Emergent.

Do not use the earlier HTML prototype as the source of truth. The important part is the exported image stack in `assets/timeline-overlays/` and the schedule notes in `notes/project-sequence.md`.

Partner acknowledgement logos are in `assets/partner-logos/`. Their source URLs and suggested credit copy are documented in `assets/partner-logos/README.md` and `notes/partner-credits.md`.

## Asset Rule

Every image in `assets/timeline-overlays/` is exported at the same canvas size:

- 2392 px wide
- 1792 px high
- aspect ratio `2392 / 1792`

Use the base image as the bottom layer. Place every PNG overlay directly over it with the same size and origin. Do not crop, stretch independently, offset, or hand-redraw the sanctuary shapes.

Recommended CSS behavior:

```css
.image-stage {
  position: relative;
  aspect-ratio: 2392 / 1792;
}

.image-stage img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

## Most Important Exports

- `sanctuary-01-overlay.png`
- `sanctuary-02-overlay.png`
- `sanctuary-03-overlay.png`
- `sanctuary-04-overlay.png`

These are the four sanctuary roof sections exported one at a time as transparent full-canvas PNG overlays.

They are intentionally solid blue masks. Use them directly as visible overlays, or recolor/tint them in code for active/completed states.

## Implementation Notes

- Use a timeline scrubber or slider, not hover.
- No glow/outline selection treatment.
- Color-code Sanctuary 1-4 while active.
- Completed sections should turn green.
- Scaffolding stays visible through steeple complete and all sanctuary work.
- The crane leaves after steeple completion.
- The dumpster remains for sanctuary roof removal.
- The complete state can wipe/reveal `after-roof-only-overlay.png`.
- `site-vibe-reference-gemini.png` is not accurate. Use it only as a visual mood reference, not for layout or placement.

## Source PSD

The working PSD is intentionally not committed here because it is very large.

Local source path:

`/Users/cameron/locke-ladder-v3/christ-church-price-scope-microsite/source/07-timeline-scrub-0223-working-copy.psd`

# Christ Church Oak Brook · Roof Restoration Timeline

A static, single-page interactive timeline visualization of the Christ Church
Oak Brook roof restoration project (July – August 2026). Built per the
handoff spec at `cameronlockeladder/christ-church-visualization-handoff` /
branch `emergent-overlay-handoff`.

## What This Is

- Pure HTML / CSS / JavaScript. No framework, no build step.
- Three source files:
  - `index.html` — DOM + content
  - `styles.css` — warm off-white visual system
  - `app.js` — 9-step timeline scrubber logic
- One asset folder: `assets/timeline-overlays/` (12 images, all 2392 × 1792).

## Run Locally

```bash
yarn install
yarn start
# Site is now served at http://localhost:3000
```

## Deploy To Vercel

Because this is a fully static site, deployment is trivial:

### Option A — Vercel CLI

```bash
# from /app/frontend
npx vercel deploy --prod
```

Vercel will detect "Other / static" and serve `index.html` as the root.

### Option B — Drag-and-drop

1. Zip the contents of `/app/frontend` **excluding** `node_modules` and
   `yarn.lock`:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets/`
2. Drag the folder into the Vercel dashboard (or run `vercel`).
3. Set the project's framework preset to **Other** and the output directory
   to the project root. No build command is needed.

### Option C — GitHub + Vercel

Push the three source files and the `assets/` folder to a GitHub repo,
then connect that repo to Vercel. Same "Other" preset.

## Notes On The Assets

All overlays in `assets/timeline-overlays/` share the same 2392 × 1792 canvas
and are stacked over `base-existing-2392x1792.jpg`.

The four sanctuary masks and the steeple mask are intentionally solid-color
PNGs. They are loaded via CSS `mask-image` so the JS can recolor them per
step (active color → green when completed) without re-rendering or
re-exporting the PNGs.

## Editing Copy

All step copy lives in the `STEPS` array near the top of `app.js`. Each step
declares its `label`, `dates`, `summary`, and bullet `items`. Change those
strings and the page updates immediately on refresh.

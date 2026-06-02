# Project presentation

Featured projects are loaded from the GitHub API and merged with local overlays in `src/lib/projects.ts`.

## Overlay entries

Each overlay is keyed by repository `name` (GitHub slug, case-sensitive):

- **summary** — Calm, 2–4 sentences: what it is, why it exists, stack or role, outcome or learnings.
- **stack** — Optional short list (shown as meta chips).
- **outcome** — Optional one-line result or takeaway.
- **screenshot** — `src` under `public/` (e.g. `/projects/my-app.png`) and descriptive **alt** text.

Repos without an overlay still get an expanded default summary from GitHub metadata and use `public/projects/placeholder.svg` until you add a real image.

## Screenshots

Place assets in `public/projects/`. Prefer WebP or PNG (~16:9), under ~400 KB. Replace `placeholder.svg` per repo by setting `screenshot.src` in the overlay.

# Genetic Daily Papers

Research reading site: https://papers.lucajiang.com

Astro static site for statistical genetics, GWAS/QTL integration, fine-mapping, cell-type regulation and relevant computational methods. Selection references are recorded in `src/data/research-profile.json` and `docs/selection-and-review.md`.

## Development and checks

```sh
npm ci
npm run dev
npm run build
```

Build runs content-reference checks, verifies and caches unchanged publisher figures, renders KaTeX at build time, and checks output links and paper counts. New reviews and issues default to unpublished. Set `published: true` only after content and assets have been checked.

## Content

Daily summaries: `src/content/daily/YYYY-MM-DD.md`.
Independent reviews: `src/content/papers/<lowercase-id>.md`.
Research and code conventions: `AGENTS.md`.
Third-party figure licenses: per-review metadata and `public/figures/NOTICE.md`.

The 2026-09-05 issue combines the previously added scE2G, LDSPEC and reference-panel reviews with the new IBD and glial reviews. Duplicate AB-PRS entries are consolidated; the old URL redirects to the reviewed page. Publication dates and method-backfill labels remain explicit.

## Deployment

Cloudflare Pages production branch: `master`; build: `npm run build`; output: `dist`.
GitHub Actions checks the matching public deployment after a production push. No scheduled paper generation is enabled by this code. Do not create or restart daily tasks without the user's explicit request.

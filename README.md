# Genetic Daily Papers

Statistical genetics, molecular QTL and cell/spatial genetics reading notes.

Production: https://papers.lucajiang.com

## Content

- `src/content/daily/YYYY-MM-DD.md`: dated issue with `published: true` and canonical paper IDs.
- `src/content/papers/<slug>.md`: independent review, real publication date, bibliography and figure attribution.
- `docs/selection-guide.md`: research scope and publication criteria.
- New reviews can place `[figure:1]` / `[figure:2]` next to the corresponding results; set `inlineFigures: true`.

## Build

Requires Node.js 22. Run `npm install` and `npm run build`.
The build retrieves verified image assets, checks Astro types, renders KaTeX and validates internal links, issue counts and inline figures. A failed check prevents deployment.

Cloudflare Pages listens to `master`, runs `npm run build`, and serves `dist`. GitHub Actions validates work branches before publishing. There is no scheduled paper-generation workflow in this repository; publishing remains manual during review.

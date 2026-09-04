# Genetic Daily Papers

A daily paper radar for statistical genetics, single-cell genomics, computational biology, QTL/GWAS resources, regulatory sequence models, and GPU-accelerated analysis.

The public site is intended to be served at `https://papers.lucajiang.com`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Cloudflare Pages settings:

- Production branch: `master`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

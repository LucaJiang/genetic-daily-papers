# September 15 publication validation

## Source and application identity
- Original production parent: b3f13bdccbd51ef9e7e7a4a006cd1b49c12138e1.
- Reviewed source commit: b4f9773091b7801508e21d447bff8d9265551cb3.
- Reviewed source tree: f083e9e466efd343afecb1128a329d6de62c6f02.
- Production differs from the reviewed application only by removal of temporary review workflows and addition of this audit record. Historical content, resource data, styles, application code, production build workflow and scheduler settings are unchanged.

## Build
The final review build completed successfully in GitHub Actions run 34958246574. It executed npm ci and the complete npm run build (content checks, figure cache validation, Astro check, Astro build, built-output validation, site validation and search validation).
- 64 HTML pages generated.
- 728 rendered math expressions site-wide; 128 across the four new paper pages (41, 35, 33, 19 respectively).
- Six new original figures, each with verified local SHA256 and figure metadata.
- 138 indexed search records; missing internal links, image errors and KaTeX errors: zero.
- Exactly four canonical paper links in the September 15 issue.

Build run: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/34958246574

## Browser
Chromium used the actual build artifact above, not a simplified mock-up. GitHub Actions run 34958642892 completed successfully.
- Ten routes at five viewport widths: 1440, 1024, 768, 390 and 320 pixels, for 50 route/viewport combinations.
- Routes: home, September 15 issue, all four new notes, archive, topics, resources and search.
- Checked successful HTTP responses, document overflow, all image loads, KaTeX errors, section anchors and exact issue membership.
- Opened mobile tables of contents, followed real section links and opened the six original figure images through their enlargement links.
- Ran 15 live-search checks across the viewport sizes using SPLENDID, DDHD1 and 105/178.
- No JavaScript page errors, missing images, document overflow, bad anchors or math errors were recorded.
- Desktop SPLENDID, desktop APOE original figure, mobile MPRA original figure and mobile issue screenshots were visually inspected; screenshot bundle covers all four notes at desktop/mobile widths.

Browser run: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/34958642892

## Source/figure integrity and limits
Locally compared pre-existing source files with the baseline: no changes. The six new original image SHA256 values match assets.json. MPRA extracted image pixels additionally match the uploaded PDF, including alpha, without resampling. APOE publisher PNGs were preserved byte-for-byte. The two proprietary journal articles use original-figure links instead of redistributed images.

MPRA independent supplementary material returned HTTP 429 and was not individually audited; the note explicitly states this. The other supplementary packages were acquired, but only the specifically identified methods, tables and figures were audited. No individual-level GWAS, PRS or MPRA analysis was rerun.

This record describes completed pre-publication checks. Production deployment is checked separately against the final master commit and Cloudflare status, not inferred from staging build success.

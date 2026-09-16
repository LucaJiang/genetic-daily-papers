# September 16 publication validation

## Scope and source identity
- Final approved issue: East Asian schizophrenia CNVs; IFNalpha clonal competition; CellDot spatial transcript decontamination.
- Production parent checked immediately before publishing: d07a4b3e74a2c2210565fee368cbdf85e557b7aa.
- Actual reviewed application commit: b9bafa969ef1751979babe3b2a1e272951fab894.
- Actual reviewed source tree: f84e658661256846ed661c0a8c2feaa148030d6f.
- The full-review workflow was triggered by 7e4524299664fe83557125c5c6a259dfbfb3c2cb, then committed normalization of CellDot topic tags before building b9bafa969ef1751979babe3b2a1e272951fab894. The artifact's source-commit.txt and source-tree.txt establish the application identity above.
- The production tree is the reviewed tree with four temporary source/build workflows removed and this validation record added. A later screenshot-only workflow is not part of that reviewed tree and is not included. No application, style, historical content, resource catalog, dependency, production build workflow or scheduler changes are intended.

## Full build
GitHub Actions run 35099859466 completed successfully, executing npm ci and the complete npm run build with content checks, local figure validation, Astro check/build, built-output validation, site validation and search validation.
- 68 HTML pages; 832 rendered math expressions site-wide.
- The three new notes render 104 math expressions: CNV 27; IFNalpha 24; CellDot 53.
- Ten new figure assets: seven original publisher PNGs and three complete CellDot figure-containing PDF pages. Their built image bytes match all ten SHA256 entries in assets.json.
- 142 search records; 85 image references site-wide; no reported bad internal links, image references, KaTeX errors or issue-count errors.
- September 16 issue references exactly three canonical papers in the approved order.

Run: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35099859466
Reviewed dist artifact ZIP SHA256: 6c5810b73a4f3e3c5157189e3e5149a2e97832847bac543b595cdb28f1cd8b56
Build/browser evidence ZIP SHA256: 3e65d0a41a9d5de339ddb818c487230b1499165dce29616fbf1f1dd229c325a8

## Browser and visual inspection
The same run served the actual Astro build in Chromium, not a mock-up.
- 11 routes at 1440, 1024, 768, 390 and 320 pixels: 55 successful route/viewport combinations.
- Routes cover home, September 16 issue, all three new notes, archive, topics, resources, search, September 15 issue and an existing SPLENDID note.
- Checked HTTP responses, document overflow, image loading, KaTeX errors, issue membership, section anchors and mobile table-of-contents navigation.
- Opened original-figure enlargement links and ran 20 live search checks across viewport sizes using NGENE, RFX3, 51/51 and CellDot.
- No JavaScript page errors or other browser-test errors were recorded.

One initial mobile CellDot screenshot was captured before the asynchronous image had painted despite complete/naturalWidth checks passing. Follow-up run 35100867199 downloaded the exact reviewed dist artifact, explicitly waited for image.decode(), animation frames and painting, and verified nonblank image pixels for all ten figures at 1440, 390 and 320 pixels: 30 successful figure/viewport raster checks. No site code change was required. Desktop and mobile article/issue screenshots and the corrected mobile CellDot figure screenshots were visually inspected. This does not claim every possible browser or viewport was tested.

Follow-up Chromium version: 153.0.8010.12.
Follow-up run: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35100867199
Decoded figure evidence ZIP SHA256: ee831c547809ed83089afb02a7ec5d3a6814d370ee2e488444a3fc9d1c371ee6

## Scientific source and image boundaries
Source review and specific paper/code inconsistencies are documented in docs/research-sources-2026-09-16.md and in the corresponding notes. CNV and IFNalpha primary text and identified supplements were reviewed; independent CellDot supplementary files could not be obtained and are explicitly marked unreviewed. None of the original biological data analyses or wet-lab experiments was rerun.

CNV images use CC BY 4.0. IFNalpha and CellDot images use CC BY-NC-ND 4.0, unchanged for noncommercial research commentary. Publisher PNGs were preserved byte-for-byte. CellDot assets are explicitly labeled as complete original PDF pages, rendered without cropping, annotation, recoloring or panel reconstruction; their pixels match the user-uploaded v1 PDF, including all original page content. Caption continuations remain linked to the original PDF.

This record documents completed pre-publication checks. Production push, master CI and Cloudflare deployment must be verified separately against the final production commit, not inferred from review-branch success.

# Figure verification

The 2026-09-05 notes cite Figures 4/5 (IBD), 3/4 (glial epigenome), and 3/7 (AB-PRS).
Their full text, publisher captions and original raster images were checked on 2026-09-05.
Each image was opened at full resolution and matched to its DOI, figure number, panels,
axes and local commentary before `imageVerified` was changed to `true`.

| Local asset | Primary-source check | Dimensions | SHA-256 |
| --- | --- | ---: | --- |
| `ibd-blood-gut-eqtl-fig4.png` | accepted manuscript, PDF page 9, Figure 4 | 1917 × 2500 | `9f6fe2a160437d3bc9a07bac803a7c9078bdde80bf555be13a83e796b1495ac0` |
| `ibd-blood-gut-eqtl-fig5.png` | accepted manuscript, PDF page 11, Figure 5 | 1864 × 2501 | `80f31600202963d42e03aa31fc0fc69a1a93477bf5d93824ac38c9fde7e8caac` |
| `glial-3d-epigenome-fig3.png` | version of record, PDF page 5, Figure 3 | 2167 × 1392 | `e097fd054a4e3e3c34adc9c206b687eab23dca986497db55f30d3eac84f18cea` |
| `glial-3d-epigenome-fig4.png` | version of record, PDF page 6, Figure 4 | 1524 × 974 | `bb5fa4fa638416cd54d332fa68af18067b5631733d09012038a6ebe4f01c0e82` |
| `ab-prs-adaptive-finetuning-fig3.png` | accepted manuscript, PDF page 6, Figure 3 | 1382 × 2414 | `f81e8c88f7916e384305f2328ad822d63dc0995fa2d7241bda22fb7e00e75be8` |
| `ab-prs-adaptive-finetuning-fig7.png` | accepted manuscript, PDF page 10, Figure 7 | 1732 × 2395 | `a4ef3325f3c6665f09ba11c2aa768be8a06c0f2827c2f561553c3ee547e04df4` |

The Nature Communications figures are unchanged under CC BY-NC-ND 4.0; the Nature
figures are unchanged under CC BY 4.0. No panel was cropped, redrawn or relabelled.

`npm run build` invokes the figure cache. It discovers the actual figure image from the
publisher's figure page and validates the raster file, size, origin and figure number.
No guessed CDN URL or generic article social preview is used. Fetch failure stops the
build; it cannot be hidden with a blank box, fake figure or automatic link fallback.

Accepted manuscripts may not yet have publisher figure pages. In that case:
1. Download the exact PDF URL in the paper metadata.
2. Use the original full, unchanged figure (including labels) from that article;
   do not redraw, fabricate, relabel or selectively manipulate the plotted data.
3. Save at the exact `assetPath` in the frontmatter. Keep all source/attribution fields.
4. Inspect the figure at full width and on a mobile viewport and set `imageVerified: true`
   after matching its number, panels and caption. Record PDF page/figure source in the commit.
5. Re-run `npm run build` and check `.radar/figure-check.json` for hashes/dimensions.

CC BY-NC-ND figures here are included as unchanged figures in a noncommercial academic
commentary; the separately written commentary is not a translated substitute for the paper.
Do not use figures with excluded third-party credit lines without appropriate permission.
Public figure files should be committed after verification to avoid dependency on remote
availability during every subsequent deployment. Do not commit `.radar`, `dist` or fonts.

The HTML and link checker is automated; scientific correspondence of panels must still be
visually checked. A valid PNG header alone does not prove that the correct figure was fetched.

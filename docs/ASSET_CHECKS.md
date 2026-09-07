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


## 2026-09-07 full-text notes

Eleven complete figures were extracted or rendered from the four user-provided PDFs and visually matched to their panels, axes, labels, legends and surrounding source captions. No data panel was removed, relabelled, recoloured or redrawn. Whitespace and surrounding article text were removed where needed; the CASTIE images retain the complete source page. The three final sc-pcQTL crops were independently rechecked after extending Figure 4 to retain every bottom-axis label.

| Local asset | Primary-source check | Dimensions | SHA-256 |
| --- | --- | ---: | --- |
| `beyond-exons-polygenicity-fig1.png` | `PIIS0002929726003137.pdf`, PDF p. 5, Figure 1; CC BY 4.0 | 1743 × 1281 | `6ecf4e95cdb52565f3cb3efae46cf935e5cb6e96b1452767dd4c5f647d3e0467` |
| `beyond-exons-polygenicity-fig3.png` | `PIIS0002929726003137.pdf`, PDF p. 8, Figure 3; CC BY 4.0 | 1743 × 1915 | `cf0cff746eb00a2426a1ffa2b500c20771261fb5be28610fb117809d06655690` |
| `castie-context-eqtl-fig3.png` | `2026.08.13.26360300v1.full.pdf`, PDF p. 35, Figure 3; CC BY 4.0 | 1224 × 1584 | `cdc7cd9b65ed07812887f86c05e5a392cd1f66b0b40bb58ff235081ff12c298d` |
| `castie-context-eqtl-fig4.png` | `2026.08.13.26360300v1.full.pdf`, PDF p. 37, Figure 4; CC BY 4.0 | 1224 × 1584 | `5ccd859ea5af92b39e5313b1d5f1ee1007a3a8f3af825a03bdd4f705ff0743f7` |
| `castie-context-eqtl-fig5.png` | `2026.08.13.26360300v1.full.pdf`, PDF p. 39, Figure 5; CC BY 4.0 | 1224 × 1584 | `982b014095c76e92c03e613ab4ef835add38f96f9eca1d376b9e704a769e1fcc` |
| `sc-pcqtl-multigene-fig2.png` | `2026.08.18.745314v1.full.pdf`, PDF p. 4, Figure 2; CC BY 4.0 | 1328 × 1465 | `4b218298289ab49fe1e0d982f05c0ca4b19ce7d0f24323678be99680f67a1bab` |
| `sc-pcqtl-multigene-fig3.png` | `2026.08.18.745314v1.full.pdf`, PDF p. 6, Figure 3; CC BY 4.0 | 1321 × 1349 | `5be127d0fff2b9b5d63e4653f6f870eee92f9f83a547d2215ff395e3599ab93b` |
| `sc-pcqtl-multigene-fig4.png` | `2026.08.18.745314v1.full.pdf`, PDF p. 7, Figure 4; CC BY 4.0 | 1314 × 1659 | `4d37aa0cd2456b99eaef5f1b6c2130ea216705a7c3a1dac128b6a51b589b4fb3` |
| `alphagenome-archaic-introgression-fig1.png` | `2026.08.31.748430v1.full.pdf`, PDF p. 13, Figure 1; CC BY-NC 4.0 | 1907 × 1940 | `cd52f2d9dceeb6a18f33bec3b520dc64e44781f9c927854168afac9858cbb4d4` |
| `alphagenome-archaic-introgression-fig2.png` | `2026.08.31.748430v1.full.pdf`, PDF p. 17, Figure 2; CC BY-NC 4.0 | 1967 × 1258 | `443ca4a9135eaa9b09eb8c94b7b140b4cc361d91d120ce0d88000ea5ccd07753` |
| `alphagenome-archaic-introgression-suppfig13.png` | `2026.08.31.748430v1.full.pdf`, PDF p. 49, Supplementary Figure 13; CC BY-NC 4.0 | 2007 × 2716 | `88cef2b82fdc6d46d9429c7c00438d459cf37d5bf79b461c454ec90ac0810454` |

The AlphaGenome figures are CC BY-NC 4.0 and are reproduced unchanged for noncommercial scholarly commentary. The other three papers carry CC BY 4.0. Attribution and license links are included in each figure. No uploaded full PDF is republished.

Browser QA limitation: the supervised preview reports running, but the cloud browser returns `net::ERR_BLOCKED_BY_CLIENT` for the prescribed preview URL and for the production domain. Desktop/mobile browser layout and interaction checks could not be completed. The failure is recorded as an environment limitation, not a successful visual check. Source-figure visual verification is complete; production build and HTML/image/search validation are required before publication.

## Tabula Sapiens 2.0 resource revision — 2026-09-07

The supplied formal Cell PDF `PIIS0092867426009372.pdf` (DOI
`10.1016/j.cell.2026.08.010`) was read through its STAR Methods. Figure 1 was
extracted unchanged from PDF page 3 (printed page 2, original image xref 13).
Both the complete PDF page and the extracted image were visually inspected:
the 28 tissue sectors, donor legend, cell-count tracks, age and sex tracks match
the resource commentary. The publication carries CC BY 4.0; attribution to the
authors and the original schematic artist B. Tojo is retained in the caption.

| Local asset | Dimensions | SHA-256 |
| --- | ---: | --- |
| `tabula-sapiens-2-fig1.png` | 1743 × 1887 | `50f6e5a371b271b75cccab1cc747fe7806dab5bd971b6ad479e83476fe4c201f` |

Exact donor and tissue counts were computed from the authors' Figure 1 source
CSV and independently checked against all 1,136,218 GEO metadata rows. No
numeric values were estimated from bar heights. The resource entry records
the source URLs, author-repository commit, platform and annotation scope
differences. The supplied full PDF is not republished.

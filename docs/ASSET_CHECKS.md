# Figure verification — 2026-09-05

Six full-size publisher PNGs were retrieved in the publication-evidence workflow, downloaded and visually inspected against the article text and figure captions. No curves, panels, labels or image bytes were edited. Expected SHA-256 values are pinned in each paper's metadata and checked by the prebuild script.

- IBD blood–gut eQTL: original Figure 5 (locus counts, CFTR and chromosome 5 association patterns) and Figure 4 (cross-tissue modules, CCL20 and CCL24). Source: s41467-026-76672-4 accepted manuscript. License CC BY-NC-ND 4.0, unchanged noncommercial scholarly commentary.
- Developing glial epigenome: original Figure 4 (SATB2/rs4449074 enhancer evidence) and Figure 3 (LHX2 perturbation). Source: s41586-026-10987-6. License CC BY 4.0.
- AB-PRS: original Figure 3 (UKBB, All of Us, eMERGE, PMBB evaluation) and Figure 7 (risk stratification). Source: s41467-026-77128-5 accepted manuscript. License CC BY-NC-ND 4.0, unchanged noncommercial scholarly commentary.

Images are presented alongside original commentary, with source links and attribution. Image dimensions: IBD fig4 1917x2500, fig5 1864x2501; glial fig3 2167x1392, fig4 1524x974; AB-PRS fig3 1382x2414, fig7 1732x2395. A successful image download is not a substitute for visual checking; these six were actually viewed before imageVerified was set. New figures require the same verification.

Existing published reviews retain their previously selected publisher images. The build caches them as local assets and refuses missing files. Exact retrieval and checksum results are recorded in .radar/figure-check.json during CI.

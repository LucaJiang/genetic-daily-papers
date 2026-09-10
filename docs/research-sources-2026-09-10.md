# 2026-09-10 source review

Approved scope: FM-GPT, MS multiancestry/spatiocellular genetics, and scAtlasPy. The user removed prop-coloc-cond; no replacement and no previously rejected candidates are included. Source review precedes publication. Production status must be checked separately from a source commit.

## Primary sources and scope

| Paper | Actual public date/status | Primary text reviewed |
| --- | --- | --- |
| FM-GPT | PLOS Genetics, 2026-09-08 | Formal HTML and XML; main Figures 1–5; supplemental Methods S1–S6; relevant S2 sensitivity and S5 gene-table cells. Main print-PDF endpoint returned 404, so no broken PDF button was added. No Gibbs rerun, full code audit or exhaustive spreadsheet review. |
| MS spatiocellular genetics | Nature Genetics, 2026-09-07 | Formal HTML/PDF and Methods; Figures 1–3 and relevant Extended Data; supplementary Figures 2–4 and cohort Table 1. No GWAS, HLA, scDRS or gsMap rerun, and no individual controlled-access data download. |
| scAtlasPy | bioRxiv v1 posted 2026-09-08 | User-provided 35-page PDF, main text/Methods/Figures and Extended Data Figures 1–7/Tables 1–3. Public PDF text matches page by page; selected figure pixels match at scale 3. Separate Supplementary Notes 1–2 and Tables 1–6 are not included in this attachment. Figshare metadata checked, but the approximately 8.18 GB archive was not downloaded or executed. |

Publication/version dates were checked in source content rather than inferred from DOI strings or this issue's date. The primary-source review artifact is run 34487150577, artifact 10156118626. Downloaded material is not automatically counted as read. Only the scope listed above is claimed.

## Interpretation checks retained in the notes

### FM-GPT

- Local GReX guides conditional factor means; the printed model retains nonzero factor residuals despite prose describing an exact span restriction. Do not silently remove the residual.
- Reference-training model and practical fixed PredictDB weights are distinguished. Gene and gene–factor indicators are not the same variable; continuous shrinkage/thresholding of loadings is not a calibrated exclusion test.
- Pólya–Gamma augmentation is conditional, not marginal Gaussianization. Binary and negative-binomial examples do not equally validate every claimed multinomial design.
- Factors/loadings are locus-specific. Omnibus gene PIP and BFDR cannot be converted to SNP credible sets or aligned factor-specific discoveries across loci.
- Simulation BFDR 0.1 versus empirical BFDR 0.15 preserved. S2c wrong-factor FDR values 0.31/0.44/0.58 and the 1%-case power 0.47 are retained rather than hidden behind a generic robustness claim.
- PAINTOR/CAVIAR use a one-factor phenotype and maximum cis-SNP PIP for gene ranking; this is not a matched native SNP fine-mapping benchmark. FOCUS/FOGS lack complete comparisons.
- Cortex discovery counts retain source inconsistencies: prose 18 genes/16 regions; Table 2 totals 15 regions; S5 has a duplicated VASH1 row and rounded BFDR threshold ambiguity. The five highlighted chromosome-17 genes occupy several regions, not one common block.
- Figure 4C counts regions; its ordinate is not a proportion. Pathway p<0.05 is nominal, separate from gene BFDR. EHR count and binary phenotype filters differ in S3.
- EHR uses three factors; two dominant heatmap patterns are not a two-factor model. Arbitrary/local factor signs limit the immune–metabolic tradeoff interpretation.

### MS spatiocellular genetics

- Cohort, ancestry and total counts checked in Table 1; 22 novel loci refers to overall analyses, not 22 new cross-ancestry-only discoveries.
- HLA fine-mapping is conditional classical-allele/amino-acid testing, not Bayesian PIP/credible sets. A position omnibus test includes all residue states.
- Cells, lesions, slides and donors remain separate units. scDRS uses cross-ancestry GWAS; gsMap uses EUR GWAS for its single-ancestry design.
- scDRS p-values and within-dataset BH FDR are distinguished. Supplementary Figure 4 shows PBMC CD4 T significance is not retained at every 500–1,500-gene cutoff.
- Astrocyte/stromal results after removing immune cells are not identical to full-dataset results. AIDA annotations are not assumed one-to-one with the patient PBMC labels.
- Twelve MS slides (8 active, 4 inactive) are the gsMap study; six control slides enter a different niche-composition analysis. Cauchy-combined p-values and differences in -log10(p) are not interaction-effect estimates or longitudinal trajectories.
- Cell composition correlations do not formally decompose state effects or prove cell–cell communication. Database link is taken from the publisher's actual hum0197 href, not a guessed URL.

### scAtlasPy

- Disk residence, near-sequential I/O, bounded shuffling and downstream approximation are separate contributions; no GPU-speed claim is made.
- Window/carry-over shuffling does not establish globally uniform independent sampling. JS divergence checks cell-line composition only.
- Full resolution means all retained cells receive outputs; UMAP and Louvain teachers use representative subsets, not full 100M-cell graph optimization.
- Workflow failures stop further scaling, so unrun larger settings are not measured failures. Server physical RAM is about 2 TiB; per-run cutoff is 512 GB RSS/10 hours, not the plotted 64 GB reference line.
- Throughput uses 2,000 measured 2,048-cell batches after 20 warmups; total runtime includes warmup. Retrieval memory includes workers. The 10.4x and 82.6% claims concern that comparison, not all downstream algorithms.
- HVG/PCA agreement is high, but UMAP-neighborhood Jaccard 0.140 and cluster counts 34/41 show nonidentity. Batch effects persist; rare-population preservation was not comprehensively established.
- HLCA core and subsample have different cell/donor counts; exact filtering/metric N is not silently reconciled. Main-text GB versus ED6 GiB is retained without invented conversion.
- 7.68-hour laptop workload includes import/PCA/outputs; it is not only prediction time. Marker examples are not donor-aware QTL or causality validation.

## Original figure assets

[assets.json](reviews/2026-09-10/assets.json) records five native PNG sources and four complete scAtlasPy appendix figure-page renders. FM-GPT's license is CC0; MS figures are CC BY-NC-ND 4.0 and remain byte-for-byte unchanged; scAtlasPy figures are CC BY 4.0. No experimental plot was reconstructed or generated.

[materialize-assets.py](reviews/2026-09-10/materialize-assets.py) requires the reviewed source hashes before creating files. [browser-check.py](reviews/2026-09-10/browser-check.py) tests the built site at five viewport widths. A successful script definition is not a passed test; results and production deployment are recorded only after execution.

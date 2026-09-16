# 2026-09-16 source review

## Approved scope
The user initially approved East Asian schizophrenia CNVs and IFNalpha clonal competition, then explicitly requested CellDot too. Final issue contains all three. No scheduled generation, resource catalog edits, or historical-note changes.

## Primary materials and limits
- Chen et al. Contribution of copy number variants to schizophrenia in East Asian populations. Nature Genetics, published 2026-09-11. DOI 10.1038/s41588-026-02732-6. User-uploaded 31-page PDF, publisher HTML, 20-page Supplementary Note, and selected burden/PRS/WES/ddPCR supplemental tables. Individual intensity plots not exhaustively re-audited; no individual-level reanalysis.
- Lama et al. Type 1 interferon perturbates clonal competition by reshaping human blood development. Nature Genetics, published 2026-09-15. DOI 10.1038/s41588-026-02751-3. Publisher 44-page PDF with Extended Data, HTML, and 19-page Supplementary Note. Independent spreadsheet retrieved but not exhaustively audited or recomputed. No experimental/model rerun.
- Chen et al. Accurate and scalable decontamination of imaging-based spatial transcriptomics via optimal transport. bioRxiv v1 posted 2026-09-15. DOI 10.64898/2026.09.09.750350. User-uploaded 29-page full text, Methods and main figures; matching dated bioRxiv PDF retrieved. Independent supplement attempt returned 404 after redirect and the direct full-PDF route returned 429; the dated PDF route succeeded. No claim of full supplementary review or reproduced real-data performance. Public software was read but not executed on biological data.

## Code evidence
CNV repository tree: 96e6006a220d631c99a3877a78c9b7b21021d5ae (yu-1011/EAS_SCZ_rCNV_analysis).
- global_burden/burden_loci_level.r, blob ac59b4b8f4fe130946205aa5c524152f066ccefb: binomial relmatGlmer, distinct from the printed linear model in Methods.
- gene_focus_assoc_meta/01_meta.sh, blob 7b0a29b211c3fe790be36cabf7f5d5a32a4c2f40: METAL SCHEME SAMPLESIZE, not inverse-variance OR pooling.
- gene_focus_assoc/04_random_phe_file.py, blob 101024b81cb28e69ad4c4a04e702335ec79afeea: full-column label permutation, without displayed stratification.
IFN repository tree: 6a372ba94e1295c067bc042efbc46717284b2a52 (AnnaNamLab/Type1_IFN_Perturbs_Clonal_Competition).
- figures/Fig7.R, blob 5e65be2edc655e87777a54e8fab708e8869b7a95: sample random effects for motif comparisons. Figure 7h code normalizes by Other, versus all HSPCs in the legend; drawing code uses lm/stat_cor, whereas the legend describes LMM. Both descriptions preserved with explicit uncertainty.
CellDot repository tree: 034c05ac71daf0b02997d1521520c12150b97329 (YangLabHKUST/CellDot).
- engine.py, blob 24dcddc93469604dd39e8c1fc2a9d6a2c4fd9786: sparse column aggregation, soft native scaling versus firm background scaling, and neighborhood hard decoding.
- config.py, blob bb7af5c96ab599d24d9c8db952b2964a36586c45: PW=0.3, PW_BG=1, NITER=200, K=14, R=15, BG_RADIUS=100 and BG_DEMAND=mass.
- prep.py, blob 8e62f7d0c5192dcd47ec2cb9580a027af08378c3: per-cell composition reference, pseudobulk platform calibration and row renormalization; extracellular pool not reassigned.

## Substantive interpretation checks
- Eight CNV loci first significant do not mean eight independently validated: four lacked WES/ddPCR material. Preserve NGENE negative, NSEG positive and nonsignificant KB interactions; do not characterize all as compensation.
- Gene-level CNV associations are not independent causal genes; averaging carrier rates over correlated genes is not a deduplicated population carrier rate.
- IFN state occupancy, functional differentiation assays, inferred trajectories and long-term clone fractions are different measurements; counts of cells are not counts of independent participants. Figure 6b is NS for the change in relative lineage bias.
- CellDot Eq.5's hard inequalities differ from the explicitly described soft-expression-capacity implementation. Strict convexity does not establish accuracy of a hard-decoded biological assignment. Reference concordance is not independent truth. Non-CellDot whole-section benchmark bars are mainly extrapolations, not completed runs.

## Figure integrity
Ten figures/figure pages, SHA256 recorded in docs/reviews/2026-09-16/assets.json.
- CNV Figures 2/3/4: CC BY 4.0, original publisher PNG bytes.
- IFN Figures 1/4/6/7: CC BY-NC-ND 4.0, original publisher PNG bytes, unchanged noncommercial use. Initial related-article thumbnail for Figure 1 was replaced before publication.
- CellDot Figures 2/3/6: complete original PDF pages 7/9/16 rendered at 144 dpi without crop, recoloring, annotations or panel reconstruction. Full-page pixels match the uploaded v1; continued captions are linked to the original PDF. Marked clearly as complete original figure pages, not extracted standalone figure rasters. CC BY-NC-ND 4.0, unchanged noncommercial research commentary.

Acquisition: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35095608806
Exact IFN/CNV figure identity: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35096765242
CellDot retrieval and full-page pixel check: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35098929057

# 2026-09-16 source review

## Approved scope
Publish only the two papers explicitly approved by the user: East Asian schizophrenia CNVs and IFNalpha clonal competition. CellDot was uploaded as additional material but is not part of this issue. No scheduler changes, resource catalog changes, or edits to historical notes.

## Primary materials
- Chen et al. Contribution of copy number variants to schizophrenia in East Asian populations. Nature Genetics, published 2026-09-11. DOI 10.1038/s41588-026-02732-6. User-uploaded 31-page PDF; publisher HTML; 20-page Supplementary Note; specific burden, PRS, WES and ddPCR supplemental tables. Individual intensity images were not exhaustively re-audited. No individual-level reanalysis.
- Lama et al. Type 1 interferon perturbates clonal competition by reshaping human blood development. Nature Genetics, published 2026-09-15. DOI 10.1038/s41588-026-02751-3. Publisher 44-page PDF including Extended Data, HTML, and 19-page Supplementary Note. The independent spreadsheet was retrieved but not exhaustively audited or recomputed. No single-cell experiment or model was rerun.

## Source-code checks
CNV analysis repository tree read: 96e6006a220d631c99a3877a78c9b7b21021d5ae (yu-1011/EAS_SCZ_rCNV_analysis).
- analysis_code/global_burden/burden_loci_level.r, blob ac59b4b8f4fe130946205aa5c524152f066ccefb: binomial relmatGlmer implementation, distinct from the linear model printed in Methods.
- analysis_code/gene_focus_assoc_meta/01_meta.sh, blob 7b0a29b211c3fe790be36cabf7f5d5a32a4c2f40: METAL SCHEME SAMPLESIZE, not inverse-variance pooling of ORs.
- analysis_code/gene_focus_assoc/04_random_phe_file.py, blob 101024b81cb28e69ad4c4a04e702335ec79afeea: full-column label permutation, without displayed stratification.
IFN repository tree read: 6a372ba94e1295c067bc042efbc46717284b2a52 (AnnaNamLab/Type1_IFN_Perturbs_Clonal_Competition).
- figures/Fig7.R, blob 5e65be2edc655e87777a54e8fab708e8869b7a95: sample random effects in motif comparisons; Figure 7h code uses Other as normalization denominator and contains lm/stat_cor drawing calls, differing from the all-HSPC denominator and LMM description in the figure legend. These differences are documented rather than silently harmonized.

## Substantive review corrections
- Eight CNV loci first reaching genome-wide significance are not eight loci all independently validated: only four had WES/ddPCR material. The four EAS-specific new regions lacked that orthogonal validation.
- CNV-PRS interaction differs across burden metrics. Preserve NGENE negative, NSEG positive, and nonsignificant KB result; do not describe all metrics as compensatory.
- Gene-level associations are not independent causal genes. Carrier frequency summaries over 12 correlated genes are not a deduplicated population carrier rate.
- IFN cell counts are not independent patient sample sizes. State occupancy, differentiation assays, inferred trajectories, and long-term clonal changes provide different evidence.
- Figure 6b labels the treatment-related change in relative lineage bias NS; do not invent a significant genotype-by-treatment interaction.

## Figure integrity
Seven publisher images are stored byte-for-byte, with SHA256 in docs/reviews/2026-09-16/assets.json. CNV Figures 2, 3, 4 are CC BY 4.0; IFN Figures 1, 4, 6, 7 are CC BY-NC-ND 4.0, used unchanged for noncommercial research commentary. Exact paper DOI and figure identity were checked; the initial related-article thumbnail returned for IFN Figure 1 was replaced by the correct original before publication. No cropping, recoloring, reconstruction, or re-encoding.

Acquisition workflow: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35095608806
Exact figure verification: https://github.com/LucaJiang/genetic-daily-papers/actions/runs/35096765242

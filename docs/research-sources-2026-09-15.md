# September 15, 2026 — source review and publication scope

## Approved issue
Four papers: SPLENDID; proximal variant-pair MPRA; APOE-stratified AD GWAS; All of Us multiancestry PRS. Publication authorized by the user after providing the missing three PDFs. Keep issue date 2026-09-15 distinct from actual publication dates (2026-09-14 for the three journal papers; 2026-09-11 for the bioRxiv preprint).

## Sources actually acquired
- SPLENDID: uploaded s41592-026-03235-2.pdf (20 pages); publisher Supplementary Information (36 pages), reporting summary and supplementary XLSX. Read main model and Methods, Extended Data, supplementary PC/screening/group-coordinate-descent/CMSA implementation and key sample-size, runtime, R2, ablation and selection tables. Do not claim rerunning controlled data.
- MPRA: uploaded 2026.09.10.750584v1.full.pdf (45 pages), plus public original downloaded once during source retrieval. The two PDFs differ in whole-file SHA but all extracted page texts and checked rendered figure pages are identical. Independent supplement download returned HTTP 429; Tables S1–S7 and independent supplementary figures have not been individually audited. Main text, Methods, and all six main figures were read.
- APOE: publisher HTML and full 19-page PDF; 110-page supplementary information; tables 1–20 XLSX. Focused source checks on sample definitions, stratified/interaction models, conditional analyses, DDHD1 eQTL thresholds, SMR, selected locus plots and supplementary discussion. Not every supplemental plot was audited. Peer-review files were obtained, not claimed to be fully reviewed.
- AoU: uploaded s41588-026-02734-4.pdf (15 pages); publisher supplementary figures (17 pages), tables and source-data XLSX. Read Methods, primary figures, key sample-size/performance/genetic-architecture tables and individual posterior-uncertainty metric. Do not equate this metric with empirical phenotype prediction R2.

Sources were fetched from the DOI pages and their linked publisher MediaObjects. Supplementary tables were inspected with artifact_tool. Source retrieval took place on a temporary research branch; temporary workflows and full source PDFs must not appear in the production tree.

## Main interpretation checks
1. SPLENDID cohort totals differ from phenotype-complete N. AoU array data, not all WGS variants, are input. Group L1 is a sum of group L2 norms. Coordinate descent is nonconvex optimization, not a global optimum guarantee. Pooled prediction has no required discrete labels but uses ancestry PCs. Sparse predictor selection is not causal fine-mapping.
2. SPLENDID source inconsistencies are preserved: rs1211375 in main text versus rs1213375 in Figure 4; displayed partial-R2 formula lacks the square; external adaptive-weight sign handling is not silently repaired. Gains are relative R2, not percentage points. LDL-C interaction ablation shows little incremental gain.
3. MPRA: 57% = 3408/5988 retained K562 sets; 59% = 105/178 selected high-confidence sets. Additivity is on log2 activity scale. CI non-overlap differs from one covariance-aware interaction test. DA FDR does not automatically control interaction FDR. Distinct overlapping fragments also change flanking sequence.
4. APOE: 29-locus threshold differs from genome-wide interaction threshold. DDHD1 unified interaction P=1.62e-6. The two stratified ROSMAP eQTLs are nominal and below neither gene-specific threshold. DDHD1 is not among the four genes passing the reported SMR/HEIDI analysis. Shared signal is not proof of mediation.
5. AoU: common HapMap3 analysis; single-cohort target validation; EUR LD approximation for meta-analysis PRS-CS; SBayesS polygenicity from UKB-EUR. Min–max scaled posterior estimation uncertainty must not be read as absolute predictive accuracy.

## Figure reuse
Six original figures only: APOE 1,3,4 (publisher PNG bytes, CC BY-NC-ND 4.0, unmodified noncommercial commentary) and MPRA 2,5,6 (lossless embedded raster/alpha extraction, CC BY 4.0). MPRA pixel SHA256 values match the uploaded PDF. See docs/reviews/2026-09-15/assets.json. No resizing, cropping, redrawing or data reconstruction in repository originals. Browser scaling does not replace the original download.
SPLENDID and AoU journal PDFs have exclusive publisher licences; their figures are linked, not republished.

## Verification boundaries
Content reviews do not constitute empirical re-analysis of GWAS, PRS or barcode data. Our equations explaining interactions/covariance and research proposals are marked as interpretation or proposed work. Preserve all historical notes, resource records and scheduler settings. Build and actual browser verification are separate from successful Cloudflare deployment; record each only after it has completed.

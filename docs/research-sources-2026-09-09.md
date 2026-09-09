# 2026-09-09 source review

Review completed on 2026-09-10 for the user-approved September 9 issue. Four main reading papers plus one full-text pQTL resource paper; no replacement titles or unapproved scheduled generation.

## Primary texts and publication status

| Paper ID | Primary source | Actual public date / status | Reading scope |
| --- | --- | --- | --- |
| alphagenome-atlas | [DeepMind report](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphagenome-atlas-a-predictive-map-of-every-possible-dna-letter-change-in-the-human-genome/alphagenome-atlas.pdf) | 2026-09-08; technical report, not labelled peer-reviewed | Main results, core Methods, relevant supplementary notes, Figures 3–4; not an exhaustive audit of every supplementary table or a UKB reanalysis. |
| gpn-star | [Nature](https://www.nature.com/articles/s41586-026-11005-5) | 2026-09-09 | Main text, Methods, supplementary architecture/training/calibration/benchmark/S-LDSC/DeepRVAT methods; Figures 2–3 and supplementary training table checked. No model training or association rerun. |
| within-family-ancestry | [Nature](https://www.nature.com/articles/s41586-026-11039-9) | 2026-09-09 | Main text, core Methods, Supplementary Note 1 coefficient derivation, Figures 2–3; supplementary simulations/tables not exhaustively recomputed. |
| iris-signaling | [Nature Methods](https://www.nature.com/articles/s41592-026-03213-8) | 2026-09-08 | Main text, Methods, relevant Extended Data and independent supplementary PDF; Figures 2/4. Source Data and supplementary spreadsheets not exhaustively checked; code not executed. |
| generation-scotland-ms-pqtl | [Nature Communications](https://www.nature.com/articles/s41467-026-76474-8) and [accepted PDF](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf) | 2026-09-09; Article in Press | Main text and Methods, Figure 1–2 and Table 1, DataShare metadata. No 66.42 GB archive download, file-schema verification or GWAS/MR rerun. |

Public publication dates were checked against publisher pages rather than PDF placeholders such as “xx xx xxxx”. Access failures in a general web reader were resolved by downloading the same public primary sources for local text extraction and visual review. Downloading a supplement is not counted as fully reviewing its contents.

## Important interpretation checks

### AlphaGenome Atlas

- Approximately 9 billion SNVs and over 100 million observed indels, not every possible indel.
- gnomAD FAF95_GRPMAX provides proxy training labels; AVI raw logit, PHRED rank, SHAP and clinical pathogenicity probability are not interchangeable.
- UKB protein analyses: 54,189 participants, 2,028 measured phenotypes retained; 595 baseline discoveries versus 728 with combined annotations. The approximately 22% increase is not AVI-only.
- Further single-variant adjustment leaves 241 associations, of which 177 are Atlas-derived. Do not confuse this denominator with all GWAS associations.
- Earlier internal UKB scoring version and partial final-version consistency checks retained explicitly.
- Common-variant conditioning MAF language differs between main text and Methods; do not silently reconcile it.
- All of Us: 25 testable associations, 4 nominally significant, none Bonferroni significant. The additional trait analysis uses AlphaGenome scores, not AVI.

### GPN-Star

- Three separately trained time scales: V/M/P, with 100/447/243 species and 128/256/256 bp contexts.
- Same-clade masking and cross-attention restrictions are part of avoiding trivial copying; conservation-weighted training is not annotation-free.
- Neutral calibration subtracts neutral LLR but divides entropy by neutral entropy. Pathogenicity, fine-mapped label ranking and S-LDSC use distinct scores.
- Existing high/low PIP labels evaluate ranking, not newly calibrated SuSiE posterior probabilities or credible-set coverage.
- DeepRVAT 383 to 402 mean discoveries across three initializations; replication comparison uses larger UKB studies, not a wholly independent external cohort.

### Within-family ancestry

- Paper's between-family coefficient is the additional family ancestry coefficient conditional on individual ancestry; in a centered formulation the total mean coefficient is bW+bB.
- Genetic IBD plus shared family random effects apply to the quantitative model; reported T2D log OR comes from a family-random-intercept logistic model.
- Counts of relatives, families and sibling pairs have different units. Effects per ancestry proportion 1 must not be presented as typical sibling differences.
- Low within-family variance, wide T2D intervals, coefficient correlation and non-significant results retained.
- cTIA is an unweighted allele count, not an effect-size-weighted PRS. Attenuation is not a formal causal mediation decomposition.
- Family design does not exclude genetically mediated social pathways or justify extrapolation to unadmixed population differences.

### IRIS

- Five separately classified pathways, not a six-pathway or single 32-class model. HH/SHH experimental conditions do not imply an equally validated HH classifier.
- Cell-level split, held-out screen, cross-lineage and cross-species tests are distinguished. Target-species data availability is reported.
- A classifier probability is not calibrated pathway intensity, and pseudotime reconstruction is not a longitudinal recording of an individual cell.
- Printed Methods p.12 visually inspected: TPR/FPR denominators, CE sign and ELBO notation have inconsistencies. This is not evidence that library implementation computed the metrics incorrectly; code was not executed.
- WNT stimulation is advanced from differentiation day 4; marker improvements do not establish complete functional equivalence to in-vivo respiratory mesenchyme.

### Generation Scotland

- 439 phenotypes = 133 unique protein mappings + 306 groups; the 1,199 cis/trans-classified signals are a subset of all 1,553 signals.
- Figure 1D shows cis association strength versus TSS distance, not a dedicated SERPINA1 locus plot. Figure 2A/B/C are Seer/SomaScan/Olink.
- Replication fractions and effect correlations use different, explicitly selected denominators.
- 31 MR associations involve 13 proteins and 17 outcomes; 15 have PPH4>0.8 and another 2>0.6. Instruments are not uniformly cis-only; shared variant evidence is not proof of mediation.
- [DataShare](https://datashare.ed.ac.uk/handle/10283/9082) availability date is 2026-02-01. September 9 is paper publication, not first release of the data.

## Assets and catalog

[assets.json](reviews/2026-09-09/assets.json) records source URLs, SHA-256 checks and PDF crop coordinates for ten original figures. All figure panels were visually inspected; native IRIS images remain byte-identical under CC BY-NC-ND 4.0. No generated or reconstructed experimental plots are used.

[resource-entry.json](reviews/2026-09-09/resource-entry.json) records the new bulk-blood / EUR / pQTL catalog entry, field-specific source indices and unverified file-level fields. Existing resource records and published history must remain unchanged.

A successful source commit does not establish production deployment. Build, browser inspection, final diff and production checks are separate steps.

# Selection and review standard

## Research scope

Rank by research question, not shared keywords. The main scope is statistical genetics: GWAS and molecular QTL integration; fine-mapping and colocalization; functional priors and regulatory mechanisms; trait-associated cell types/states and spatial locations; genetic architecture and polygenic prediction. Single-cell methods and algorithm acceleration are included when they offer a reusable statistical or computational contribution.

Use these public papers involving Jian Yang as methodological anchors, not as an exclusive author whitelist:

- [SMR/HEIDI](https://www.nature.com/articles/ng.3538): integration of GWAS and eQTL summary data, target-gene prioritization, and distinguishing linked from shared signals.
- [gsMap](https://www.nature.com/articles/s41586-025-08757-x): spatially resolved trait-associated cells and gene-to-SNP annotation.
- [MeDuSA](https://www.nature.com/articles/s43588-023-00487-2): mixed-model deconvolution of cell-state abundances and state-dependent transcriptional regulation.

Also track SuSiE/SuSiEx, DAP-G, functional/signed priors, credible-set coverage, LD mismatch, and regulatory sequence models such as AlphaGenome when directly relevant to genetic variants. Do not infer that the site or its owner is affiliated with the Yang laboratory.

## Selection

Prioritize relevant original research in Nature, Nature Genetics, Nature Methods, Nature Communications and comparable specialist journals. A journal name or a single-cell/foundation-model keyword alone is not sufficient. Strongly relevant preprints can be included with their actual version and peer-review status.

Use a recent-publication window first. Do not fill a quota with weakly relevant papers. Older papers may be selected as explicitly dated method backreads, never presented as newly published today. Store the issue date separately from the publication/version date. Avoid repeating an archived paper unless there is a substantive new version or a stated scientific reason.

Database coverage means new datasets, cohorts, reference panels, QTL releases or database papers. API migrations, routine UI changes and software-version announcements are not data releases. Acceleration coverage must identify the algorithmic bottleneck, computational change, end-to-end benchmark, hardware/memory cost and numerical checks; using a GPU is not itself sufficient.

## Review content

Read the primary paper and relevant methods. Keep the daily card short. Put the technical review on the independent paper page. Explain the model, assumptions, inference, actual data, effect sizes or performance, comparison methods, limits and specific connections to the research scope. Distinguish reported findings from proposed extensions.

Use familiar statistical-genetics terminology. Do not use `estimand`, `编辑结论`, `Figure 1/2 应该怎样读`, marketing slogans or explanations of why the website is designed a certain way. Figure headings should name the actual analysis, such as `OneK1K 中的遗传方差` or `实际填充准确率`.

Prefer real-data figures with useful axes, groups and comparisons; include workflow/simulation figures only when necessary. Read each selected figure. Preserve source, figure number, attribution and applicable reuse terms. Do not assume all publisher images have the same license. Place figures beside the corresponding discussion, with local cached assets and click-to-enlarge support.

## Publishing and validation

Daily entries default to `published: false`. Explicitly publish only when all referenced paper pages, figure assets, sources and checks are complete. Use lowercase paper IDs. Count cards from the same `papers` array used by navigation; a missing reference must fail the build, not be silently filtered.

Run the Astro build and `scripts/validate-site.mjs`. Check representative desktop, tablet and mobile layouts, actual image loading, KaTeX rendering, topic links, article anchors and figure zoom. Preserve historical issues. Do not add or reactivate a scheduled content-generation task without a new explicit request. A publication guard is not the same as disabling a ChatGPT scheduled task.

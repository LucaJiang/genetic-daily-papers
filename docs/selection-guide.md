# Paper selection and review guide

## Research scope

The primary reference is Jian Yang's statistical genetics research at Westlake University, together with the lab's existing reading themes: GWAS and molecular QTL integration, fine-mapping, cell-type-specific genetic regulation, and scalable statistical methods. This is not a general single-cell technology news feed.

Priority areas:

1. Genetic architecture and inference: heritability, mixed models, GWAS methods, rare variants, effect-size distributions, and polygenic prediction.
2. Mechanistic interpretation: eQTL/sQTL/pQTL, SMR and colocalization, multi-signal fine-mapping, functional priors, variant-to-gene links.
3. Single-cell and spatial genetics: trait-associated cells or states, single-cell QTL, expression deconvolution where it enables genetic inference, and spatial heritability enrichment.
4. Computation and data: algorithms that make these analyses materially faster or larger, and actual new cohorts, reference panels, molecular QTL data or database papers.

Regulatory sequence models and foundation models qualify when their outputs directly inform variant effects, relevant perturbations or genetic mechanisms. Generic representation learning, technology announcements, API changes and minor package releases are not sufficient.

## Public anchors

- Westlake Laboratory of Life Sciences and Biomedicine, Jian Yang group: https://www.wllsb.edu.cn/kxyj/yjdw/202303/t20230303_26125.shtml
- Yang lab publications: https://yanglab.westlake.edu.cn/publications/
- gsMap: Song et al., *Spatially resolved mapping of cells associated with human complex traits*. Nature (2025). https://www.nature.com/articles/s41586-025-08757-x
- SMR / HEIDI official documentation: https://yanglab.westlake.edu.cn/software/smr
- MeDuSA, mixed-model cell-state deconvolution: https://sls.westlake.edu.cn/en/NEWS/202307/t20230714_29833.shtml
- CIGMA: Chen et al., *Cell-type-specific eQTLs underlie the genetic architecture of complex traits*. Nature (2026). https://www.nature.com/articles/s41586-026-10577-6

## Selection rules

Read the question, model and real-data evidence before ranking. A matching keyword or prestigious journal is not enough. Among genuinely relevant articles, prioritize Nature, Nature Genetics, Nature Methods and comparable journals, while retaining important methods preprints and primary data releases.

Start with the last 48 hours and expand to 7 days. Do not invent a minimum daily quota. A highly relevant older paper may be included as `方法补读`, with its real publication date visible. A new resource paper and a new data release are different events; do not conflate their dates. Do not repeat previously reviewed papers as new items without a documented substantive update.

Maintain candidate provenance: source URL, publication/version date, relevance to one of the four areas above, and whether full text and real-data figures were inspected. Avoid filling an issue with unrelated foundation-model or technology papers when no high-quality new work is available.

## Review format

Use Chinese academic prose with standard statistical genetics terminology. Explain the research question, assumptions, method, real-data results, relevant comparisons and specific limitations. Do not add generic criticism mechanically. Clearly distinguish reported findings from proposed extensions. Avoid `estimand`, anonymous 'editorial conclusions', instructions about interface design, or ambiguous 'how to read Figure 1/2' headings.

Place results figures next to the corresponding analysis. Select real biological/clinical/cohort evidence before simulation and workflow figures. Identify data, axes, comparison, uncertainty and what the result supports. Do not merely paraphrase captions. Keep the original figure unmodified, attribute authors and source, and accurately record reuse terms. Do not label reserved-rights images as Creative Commons.

Equations use `$...$` or `$$...$$`, not code blocks. A schematic equation must be identified as a unified notation or simplification, not falsely attributed as an exact equation from the paper. Distinguish prediction, association, colocalization, variant PIP and mechanistic causality.

## Publishing and checks

Daily entries default to `published: false`. Publish only after all referenced independent reviews exist. All slugs must match normalized IDs. The build rejects missing references, duplicates, future-dated papers, unknown topic labels, invalid image downloads, unresolved local links, unrendered figure placeholders and invalid KaTeX output.

Today, Archive, Topics, Resources and RSS all use the same published content collection. Browser review must check mobile and desktop overflow, actual image dimensions, readable formulas, and the exact displayed card count. Daily automation is not enabled by this guide or by site builds. Site changes do not authorize resuming a paused scheduled task.

# Paper Radar: content and publication rules

Use Chinese prose for readers with statistical-genetics training. The profile in
`src/data/research-profile.json` defines the selection scope. Follow the user's explicit
requests over generic keyword matching. Do not publish the user's private project details.

## Selection

Start from GWAS–molecular-QTL integration, multi-signal fine-mapping/colocalization,
cell-type/state-specific genetic effects, functional variant-to-gene interpretation,
and complex-trait genetic architecture. Jian Yang's SMR/HEIDI, gsMap and MeDuSA are
methodological anchors, not papers to relabel as today's news. SuSiE, DAP-G and
regulatory sequence models are additional anchors from the user's reading history.
A general single-cell embedding paper needs a concrete connection to these problems.
Relevant high-impact journal articles receive priority; unrelated papers do not qualify
just because of the journal. Computational acceleration must change an actual algorithm,
data structure or computational bottleneck with a meaningful accuracy/runtime comparison.
Resource updates mean new datasets, samples, ancestry/tissue coverage, QTL types,
summary statistics or database papers; do not report API cosmetic changes.

## Scientific writing

Read primary full text when accessible, including methods and real-data results.
Record publication date separately from digest date; do not assume the issue date is
the online publication date. Record preprint/accepted-manuscript status. Do not use
"estimand", "编辑结论", marketing slogans, or explanations of how this website was designed.
Use sections named for the actual method or finding, not "Figure 1 应该怎样读".
Explain the model before critiquing it. Tie critique to the actual design, not a canned
list of pitfalls. Distinguish author results from suggestions for further research.
Never convert sequence scores to PIPs, colocalization to proof of mediation, or cell
counts to independent donor counts. Do not conflate DAP (disease association pattern)
with DAP-G. Preserve FDR thresholds when reporting discovery counts.

## Figures and math

Prioritize biological/clinical data, real loci and independent validation. Put figures
at `[[figure:figN]]` within relevant result sections. Do not put a full-page gallery
before the article. Use original figure numbering, informative captions and attribution.
Do not invent images or reconstruct experimental plots from prose. Respect image licences;
CC BY-NC-ND figures must be unchanged and used noncommercially. Figure source URLs must
identify the correct paper and figure; a generic article social image is not sufficient.
Images must exist locally and pass the asset checks before a production build succeeds.
Use `$...$` and `$$...$$` in Markdown, with single backslashes. Do not put formulas in
code blocks, raw HTML or competing client-side math engines. KaTeX is build-time only.

## Publishing

No scheduled generation should be enabled without a new explicit user request.
This file does NOT disable a ChatGPT Task. External scheduler state must be checked separately.
New daily issues and papers default to unpublished. Set `published: true` only after
source review. A resource brief based only on an abstract must say so and must not be
counted as a full paper analysis. Daily counts are derived from references, never copied
into a separate manually maintained list. Unknown IDs and case collisions fail validation.
Preserve old published history; do not silently delete or replace existing notes.
Run `npm run build`, inspect real browser output on desktop and mobile, then review the
diff before pushing. A source update is NOT a confirmed successful Cloudflare deployment.

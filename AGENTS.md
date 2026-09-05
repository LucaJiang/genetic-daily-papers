# Paper Radar maintenance

Keep scheduled research tasks disabled unless the user explicitly requests enabling them. Never add a cron trigger as part of website maintenance.

## Research scope
Use the user's previously discussed papers and Jian Yang / Westlake work as research anchors: SMR/HEIDI and GWAS–QTL integration, cell-type/state eQTL, gsMap and trait-associated spatial cells, SuSiE/fine-mapping/colocalization, regulatory variants and target genes, genetic architecture and PRS. Keep algorithm acceleration for actual single-cell/genetic workloads. Prefer methodologically relevant papers over generic keyword matches. Journal prestige is a preference, not a substitute for topic fit. Data releases mean new data, new cohorts, reference panels or database papers, not API/UI changes.

## Content
Daily dates are issue dates, not paper publication dates. Keep actual publication dates and version status. Do not fill quotas with weakly related papers. Preserve archives. Separate abstract-only resource briefs from full-paper reviews. Distinguish author results from proposed extensions. Use natural Chinese statistical-genetics terminology; no promotional interface prose, no invented editor, no `estimand`, no 'Figure 1 应该怎样读' headings.

Place licensed unmodified real-data figures beside the corresponding results. Explain dataset, panel, comparison, effect size and limitations. Never use fabricated plots or claim simulation is real data. All figure metadata must include source and attribution. Visually inspect originals before setting imageVerified:true. Preserve source bytes and check their SHA-256. Missing images block the build. Math is Markdown $...$ / $$...$$ rendered by KaTeX; never use fenced code for displayed mathematics.

## Publishing
Published defaults false. Set true only after content review. Daily references must resolve to published paper pages; never silently drop missing entries. Build and browser-test before merging master. Check desktop/mobile widths, complete images, internal links, KaTeX and article counts. Do not overwrite newer user commits or force-push. Do not change DNS or Cloudflare project settings.

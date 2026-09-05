# Genetic Daily Papers

Primary research interests: GWAS and molecular QTL integration; cell-type/state genetic effects; fine-mapping (SuSiE, DAP-G), colocalization and functional priors; genetic architecture and polygenic prediction. Jian Yang's SMR/HEIDI and gsMap work are research anchors, not a restriction to one author's papers. See src/data/research-profile.json.

Do not enable or create scheduled generation without a new explicit request. Git-push builds are deployment checks, not daily paper generation.

Preserve publication dates and distinguish issue date from article date. Prefer research-question relevance over keyword overlap; Nature/Nature Genetics/Nature Methods are prioritized when relevant. Resources mean new data, cohorts or database papers, not API/UI releases.

Write clear scholarly Chinese. No promotional site text, imaginary editor, or 'estimand'. Explain actual methods and real-data results before generic limitations. State when a formula is an explanatory simplification rather than an exact author equation. Separate observed findings from proposed follow-up analyses.

Daily entries link to standalone reviews. Counts are derived from papers arrays. Unknown IDs must stop publication. New entries default unpublished; only reviewed complete entries may set published:true. Use lowercase paper filenames and IDs; retain existing topic slugs such as QTL.

Place original real-data figures in corresponding result sections with [[figure:id]]. Preserve original images and panels, credit, license and source. Do not use placeholders, redraw experimental results, or set imageVerified without visual verification. A checksum mismatch or missing figure must stop the build. Do not commit font files or node_modules/dist/.astro/.radar.

Run npm run build and browser checks on actual Astro output at desktop and mobile widths before production. Check old issue counts (Sept3:3, Sept4:4) and Sept5:3 plus one separate resource brief; local links; image naturalWidth; KaTeX errors; body overflow; topic pages. Do not claim deployment until the matching commit passes Cloudflare checks.

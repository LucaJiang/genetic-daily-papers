import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkStripWebCitations from './src/plugins/remark-strip-web-citations.mjs';
import remarkCleanHeadings from './src/plugins/remark-clean-headings.mjs';
import remarkReviewFigures from './src/plugins/remark-review-figures.mjs';

export default defineConfig({
  site: 'https://papers.lucajiang.com',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkStripWebCitations,
      remarkCleanHeadings,
      remarkReviewFigures,
    ],
    rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: 'warn' }]],
  },
});

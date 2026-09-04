import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkStripWebCitations from './src/plugins/remark-strip-web-citations.mjs';

export default defineConfig({
  site: 'https://papers.lucajiang.com',
  markdown: {
    remarkPlugins: [remarkMath, remarkStripWebCitations],
    rehypePlugins: [rehypeKatex],
  },
});

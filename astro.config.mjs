import { defineConfig } from 'astro/config';
import remarkStripWebCitations from './src/plugins/remark-strip-web-citations.mjs';

export default defineConfig({
  site: 'https://papers.lucajiang.com',
  markdown: {
    remarkPlugins: [remarkStripWebCitations],
  },
});

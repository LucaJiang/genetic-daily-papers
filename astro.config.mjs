import {defineConfig} from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkStripWebCitations from './src/plugins/remark-strip-web-citations.mjs';
import remarkCleanHeadings from './src/plugins/remark-clean-headings.mjs';
import inlineFigures from './src/plugins/remark-inline-figures.mjs';
export default defineConfig({site:'https://papers.lucajiang.com',markdown:{remarkPlugins:[remarkMath,remarkStripWebCitations,remarkCleanHeadings,inlineFigures],rehypePlugins:[rehypeKatex]}});

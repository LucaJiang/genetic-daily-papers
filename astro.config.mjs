import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkReviewFigures from './src/plugins/remark-review-figures.mjs';
export default defineConfig({site:'https://papers.lucajiang.com',output:'static',trailingSlash:'always',markdown:{remarkPlugins:[remarkMath,remarkReviewFigures],rehypePlugins:[[rehypeKatex,{throwOnError:true,strict:'warn'}]]}});

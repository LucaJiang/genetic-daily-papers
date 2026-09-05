import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const figureSchema = z.object({
  url: z.string().url(), alt: z.string(), label: z.string().optional(),
  kind: z.enum(['real-data','validation','workflow','simulation','resource']).optional(),
  caption: z.string(), credit: z.string(), sourceUrl: z.string().url(), license: z.string().optional(), licenseUrl: z.string().url().optional(),
});
const daily = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/daily' }),
  schema: z.object({
    date: z.coerce.date(), title: z.string(), summary: z.string(),
    published: z.boolean().default(false), topics: z.array(z.string()).default([]),
    papers: z.array(z.string()).default([]),
  }),
});
const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(), shortTitle: z.string().optional(), authors: z.string(), date: z.coerce.date(),
    source: z.string(), version: z.string().optional(), doi: z.string().optional(),
    paperUrl: z.string().url(), codeUrl: z.string().url().optional(), resourceUrl: z.string().url().optional(),
    priority: z.enum(['must-read','worth-reading','skim']),
    readingType: z.enum(['本周新作','方法补读','数据资源']).optional(),
    kind: z.enum(['paper','resource']).default('paper'),
    summary: z.string(), whyItMatters: z.string(), keyResults: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]), peerReviewed: z.boolean().default(false),
    inlineFigures: z.boolean().default(false),
    figure: figureSchema.optional(), figures: z.array(figureSchema).default([]),
  }),
});
export const collections = { daily, papers };

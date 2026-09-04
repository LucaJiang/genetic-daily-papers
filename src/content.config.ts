import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const figureSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  caption: z.string(),
  credit: z.string(),
  sourceUrl: z.string().url(),
  license: z.string().optional(),
});

const daily = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/daily' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    summary: z.string(),
    topics: z.array(z.string()).default([]),
    papers: z.array(z.string()).default([]),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    authors: z.string(),
    date: z.coerce.date(),
    source: z.string(),
    version: z.string().optional(),
    doi: z.string().optional(),
    paperUrl: z.string().url(),
    codeUrl: z.string().url().optional(),
    priority: z.enum(['must-read', 'worth-reading', 'skim']),
    summary: z.string(),
    whyItMatters: z.string(),
    topics: z.array(z.string()).default([]),
    peerReviewed: z.boolean().default(false),
    figure: figureSchema.optional(),
  }),
});

export const collections = { daily, papers };

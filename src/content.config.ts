import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const figure = z.object({
  id: z.string().optional(),
  url: z.string().url().optional(),
  sourceUrl: z.string().url(),
  assetPath: z.string().optional(),
  alt: z.string(),
  label: z.string().optional(),
  caption: z.string(),
  credit: z.string(),
  license: z.string().optional(),
  licenseUrl: z.string().url().optional(),
  kind: z.enum(['real-data', 'validation', 'workflow', 'simulation', 'resource']).optional(),
  sourceCheck: z.string().optional(),
  imageVerified: z.boolean().optional(),
});

const brief = z.object({
  id: z.string(),
  title: z.string(),
  date: z.coerce.date(),
  source: z.string(),
  url: z.string().url(),
  doi: z.string().optional(),
  summary: z.string(),
  detail: z.string(),
  kind: z.string(),
  readingDepth: z.enum(['abstract', 'full-text']),
  topics: z.array(z.string()),
});

const daily = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/daily' }),
  schema: z.object({
    published: z.boolean().default(false),
    date: z.coerce.date(),
    title: z.string(),
    summary: z.string(),
    topics: z.array(z.string()).default([]),
    papers: z.array(z.string()).default([]),
    briefs: z.array(brief).default([]),
    searchWindowStart: z.string().optional(),
    searchWindowEnd: z.string().optional(),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    published: z.boolean().default(false),
    title: z.string(),
    shortTitle: z.string().optional(),
    authors: z.string(),
    date: z.coerce.date(),
    source: z.string(),
    version: z.string().optional(),
    versionDate: z.coerce.date().optional(),
    doi: z.string().optional(),
    paperUrl: z.string().url(),
    pdfUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
    resourceUrl: z.string().url().optional(),
    priority: z.enum(['must-read', 'worth-reading', 'skim']),
    readingType: z.enum(['本周新作', '方法补读', '数据资源']).optional(),
    kind: z.enum(['paper', 'resource']).default('paper'),
    summary: z.string(),
    whyItMatters: z.string(),
    keyResults: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    peerReviewed: z.boolean().default(false),
    inlineFigures: z.boolean().default(false),
    figure: figure.optional(),
    figures: z.array(figure).default([]),
    figureSet: z.string().optional(),
    reviewedAt: z.string().optional(),
    readingDepth: z.string().optional(),
  }),
});

export const collections = { daily, papers };

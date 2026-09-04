import { createHash } from 'node:crypto';
import type { CollectionEntry } from 'astro:content';
import rawOverrides from '../data/figure-overrides.json';

export type FigureKind = 'real-data' | 'validation' | 'workflow' | 'simulation' | 'resource';

export type PaperFigure = {
  url: string;
  alt: string;
  label?: string;
  caption: string;
  credit: string;
  sourceUrl: string;
  license?: string;
  kind?: FigureKind;
};

const overrides = rawOverrides as Record<string, PaperFigure[]>;
const overrideByNormalizedId = new Map(
  Object.entries(overrides).map(([id, figures]) => [id.toLowerCase(), figures]),
);
const kindRank: Record<FigureKind, number> = {
  'real-data': 0,
  validation: 1,
  workflow: 2,
  resource: 3,
  simulation: 4,
};

export function figureKindLabel(kind?: FigureKind): string {
  switch (kind) {
    case 'real-data': return '真实数据';
    case 'validation': return '技术验证';
    case 'workflow': return '方法流程';
    case 'simulation': return '模拟研究';
    case 'resource': return '数据库结构';
    default: return '论文图';
  }
}

export function figureReference(figure: PaperFigure, index: number): string {
  const match = figure.label?.match(/Figure\s*(\d+[A-Za-z]?)/i);
  return match ? `Figure ${match[1]}` : `Figure ${index + 1}`;
}

export function figureTitle(figure: PaperFigure, index: number): string {
  const label = figure.label ?? `Figure ${index + 1}`;
  return label
    .replace(/^(真实数据|方法流程|模拟|数据库|验证|方法)[：:]\s*/u, '')
    .replace(/^Figure\s*\d+[A-Za-z]?\s*[·:：-]\s*/i, '')
    .replace(/\s*[（(]Figure\s*\d+[A-Za-z]?[）)]\s*$/i, '')
    .trim();
}

export function figuresForPaper(paper: CollectionEntry<'papers'>): PaperFigure[] {
  const configured = overrideByNormalizedId.get(paper.id.toLowerCase());
  const figures = configured?.length
    ? configured
    : paper.data.figures.length
      ? paper.data.figures
      : paper.data.figure
        ? [paper.data.figure]
        : [];

  return [...figures].sort((a, b) => {
    const aRank = kindRank[(a.kind ?? inferKind(a.label)) as FigureKind];
    const bRank = kindRank[(b.kind ?? inferKind(b.label)) as FigureKind];
    return aRank - bRank;
  });
}

function inferKind(label?: string): FigureKind {
  if (!label) return 'real-data';
  if (/模拟|校准|simulation/i.test(label)) return 'simulation';
  if (/流程|框架|编码|workflow/i.test(label)) return 'workflow';
  if (/数据库|元数据|resource/i.test(label)) return 'resource';
  if (/验证|validation/i.test(label)) return 'validation';
  return 'real-data';
}

export function figureAssetUrl(remoteUrl: string): string {
  const parsed = new URL(remoteUrl);
  const match = parsed.pathname.match(/\.(png|jpe?g|webp)$/i);
  const extension = match?.[1]?.toLowerCase().replace('jpeg', 'jpg') ?? 'png';
  const digest = createHash('sha256').update(remoteUrl).digest('hex').slice(0, 24);
  return `/figures/${digest}.${extension}`;
}

import { catalog, isoDate } from './catalog';
import { topicBySlug } from '../data/topics';
import qtlResources from '../data/qtl-resources.json';
import { qtlGroups } from '../data/qtl-groups';
import { qtlAncestries } from '../data/qtl-ancestries';
import type { SearchDocument } from './search';

const plainText = (value: string) => value
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/\[\[figure:[^\]]+\]\]/g, ' ')
  .replace(/[\s\S]*?/g, ' ')
  .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/<[^>]*>/g, ' ')
  .replace(/[#*`$|\\]/g, ' ')
  .replace(/\s+/g, ' ').trim();

const topicNames = (slugs: string[]) => slugs.flatMap(slug => {
  const topic = topicBySlug[slug];
  return topic ? [slug, topic.label] : [slug];
});

export async function buildSearchIndex() {
  // Use the same publication rules as paper routes; drafts never enter the index.
  const { papers, issues, resolve } = await catalog();
  const documents: SearchDocument[] = papers.map(paper => ({
    id: `paper:${paper.id}`, type: 'paper',
    title: paper.data.shortTitle ?? paper.data.title,
    subtitle: paper.data.shortTitle ? paper.data.title : '',
    url: `/papers/${paper.id}/`,
    meta: [paper.data.authors, paper.data.source,
      `论文公开 ${isoDate(paper.data.date)}`,
      ...(paper.data.versionDate ? [`${paper.data.version ?? '版本'} 更新 ${isoDate(paper.data.versionDate)}`] : [])],
    tags: topicNames(paper.data.topics),
    summary: plainText(paper.data.summary),
    body: plainText([paper.data.whyItMatters, ...paper.data.keyResults, paper.data.doi,
      paper.data.paperUrl, paper.body].filter(Boolean).join(' ')),
    date: isoDate(paper.data.versionDate ?? paper.data.date),
  }));

  for (const resource of qtlResources) {
    const group = qtlGroups.find(group => group.id === resource.group);
    const ancestryLabels = resource.ancestryTags.map(id => qtlAncestries.find(a => a.id === id)?.label ?? id);
    documents.push({
      id: `resource:${resource.id}`, type: 'resource', title: resource.name, subtitle: '',
      url: `/resources/#${resource.id}`,
      meta: [group?.shortTitle ?? resource.category, ...ancestryLabels],
      tags: [resource.navLabel, resource.category, ...(resource.resourceTypes ?? resource.qtlTypes), ...resource.ancestryTags,
        ...ancestryLabels, group?.title ?? ''],
      summary: resource.summary,
      // Deliberately select reader-visible fields, excluding internal evidence notes.
      body: [resource.version, resource.tissue, resource.ancestry, resource.sampleSize,
        resource.cellsPerDonor, resource.assay, resource.depth, resource.access,
        resource.limitations, ...resource.sources.map(source => `${source.label} ${source.url}`),
        ...(resource.detailSections ?? []).flatMap(section => [section.title, ...(section.paragraphs ?? []),
          ...(section.table?.headers ?? []), ...(section.table?.rows.flat() ?? []), section.figure?.caption ?? ''])].join(' '),
      date: '',
    });
  }

  for (const issue of issues) {
    const date = isoDate(issue.data.date);
    documents.push({
      id: `daily:${issue.id}`, type: 'daily', title: issue.data.title, subtitle: '',
      url: `/daily/${issue.id}/`, meta: [`日报 ${date}`], tags: topicNames(issue.data.topics),
      summary: issue.data.summary,
      body: plainText([issue.body, ...resolve(issue).map(p => `${p.data.shortTitle ?? ''} ${p.data.title}`),
        ...issue.data.briefs.map(brief => brief.title)].join(' ')), date,
    });
    for (const brief of issue.data.briefs) documents.push({
      id: `brief:${brief.id}`, type: 'resource', title: brief.title, subtitle: '',
      url: `/resources/#brief-${brief.id}`, meta: ['资源简报', brief.source, isoDate(brief.date)],
      tags: topicNames(brief.topics), summary: plainText(brief.summary),
      body: plainText([brief.detail, brief.doi, brief.url].filter(Boolean).join(' ')),
      date: isoDate(brief.date),
    });
  }
  return { version: 1, documents };
}

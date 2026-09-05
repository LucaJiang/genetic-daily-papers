import { getCollection, type CollectionEntry } from 'astro:content';
import { topicBySlug } from '../data/topics';
export type Paper = CollectionEntry<'papers'>;
export const isoDate = (date: Date) => date.toISOString().slice(0,10);
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(date);
export async function catalog() {
  const all = await getCollection('papers');
  const byId = new Map<string, Paper>();
  for (const paper of all) {
    const normalized = paper.id.toLowerCase();
    if (byId.has(normalized)) throw new Error(`Case-insensitive paper ID collision: ${paper.id}`);
    byId.set(normalized, paper);
  }
  const issues = (await getCollection('daily')).filter(e => e.data.published).sort((a,b) => +b.data.date - +a.data.date);
  const briefIds = new Set<string>();
  for (const e of issues) {
    if (new Set(e.data.papers).size !== e.data.papers.length) throw new Error(`Duplicate papers in ${e.id}`);
    for (const topic of e.data.topics) if (!topicBySlug[topic]) throw new Error(`Unknown topic ${topic} in ${e.id}`);
    for (const brief of e.data.briefs) {
      if (briefIds.has(brief.id)) throw new Error(`Duplicate resource brief ${brief.id}`);
      briefIds.add(brief.id);
      for (const topic of brief.topics) if (!topicBySlug[topic]) throw new Error(`Unknown topic ${topic} in brief ${brief.id}`);
    }
    for (const id of e.data.papers) {
      if (id !== id.toLowerCase()) throw new Error(`Non-canonical paper ID ${id} in ${e.id}`);
      const p = byId.get(id);
      if (!p) throw new Error(`Missing paper ${id} referenced by ${e.id}`);
      if (!p.data.published) throw new Error(`Unpublished paper ${id} referenced by ${e.id}`);
      if (+p.data.date > +e.data.date) throw new Error(`Future paper ${id} in ${e.id}`);
      if (p.data.versionDate && +p.data.versionDate > +e.data.date) throw new Error(`Future paper version ${id} in ${e.id}`);
      for (const t of p.data.topics) if (!topicBySlug[t]) throw new Error(`Unknown topic ${t} in ${id}`);
    }
  }
  const referenced = new Set(issues.flatMap(e => e.data.papers));
  const papers = all.filter(p => referenced.has(p.id.toLowerCase())).sort((a,b) => +b.data.date - +a.data.date);
  return { issues, papers, byId, resolve: (entry: CollectionEntry<'daily'>): Paper[] => entry.data.papers.map(id => byId.get(id)!) };
}

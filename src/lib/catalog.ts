import { getCollection, type CollectionEntry } from 'astro:content';
import { topicBySlug } from '../data/topics';
export type Paper = CollectionEntry<'papers'>;
export const isoDate = (date: Date) => date.toISOString().slice(0,10);
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(date);
export async function catalog() {
  const all = await getCollection('papers');
  const byId = new Map(all.map(p => [p.id,p]));
  const issues = (await getCollection('daily')).filter(e => e.data.published).sort((a,b) => +b.data.date - +a.data.date);
  for (const e of issues) {
    if (new Set(e.data.papers).size !== e.data.papers.length) throw new Error(`Duplicate papers in ${e.id}`);
    for (const id of e.data.papers) {
      const p = byId.get(id);
      if (!p) throw new Error(`Missing paper ${id} referenced by ${e.id}`);
      if (+p.data.date > +e.data.date) throw new Error(`Future paper ${id} in ${e.id}`);
      for (const t of p.data.topics) if (!topicBySlug[t]) throw new Error(`Unknown topic ${t} in ${id}`);
    }
  }
  const referenced = new Set(issues.flatMap(e => e.data.papers));
  const papers = all.filter(p => referenced.has(p.id)).sort((a,b) => +b.data.date - +a.data.date);
  return { issues, papers, byId, resolve: (entry: CollectionEntry<'daily'>): Paper[] => entry.data.papers.map(id => byId.get(id)!) };
}

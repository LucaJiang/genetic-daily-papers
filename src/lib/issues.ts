import {getCollection,type CollectionEntry} from 'astro:content';
export const iso=(d:Date)=>d.toISOString().slice(0,10);
export const dateLabel=(d:Date)=>new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(d);
export async function publishedPapers(){return (await getCollection('papers')).filter(p=>p.data.published);}
export async function publishedIssues(){return (await getCollection('daily')).filter(d=>d.data.published).sort((a,b)=>+b.data.date-+a.data.date);}
export function resolvePapers(issue:CollectionEntry<'daily'>,all:CollectionEntry<'papers'>[]){const map=new Map(all.map(p=>[p.id,p]));if(new Set(issue.data.papers).size!==issue.data.papers.length)throw new Error(`Duplicate paper ID in ${issue.id}`);return issue.data.papers.map(id=>{const p=map.get(id);if(!p)throw new Error(`Missing or unpublished paper ${id} in ${issue.id}`);return p;});}

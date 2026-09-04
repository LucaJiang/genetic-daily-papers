import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const issues = (await getCollection('daily')).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: 'Genetic Daily Papers',
    description: 'Daily paper radar for statistical genetics, single-cell genomics and algorithm acceleration.',
    site: context.site,
    items: issues.map((issue) => ({
      title: issue.data.title,
      description: issue.data.summary,
      pubDate: issue.data.date,
      link: `/daily/${issue.id}/`
    }))
  });
}

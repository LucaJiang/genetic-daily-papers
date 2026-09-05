import rss from '@astrojs/rss';
import { publishedIssues } from '../lib/issues';

export async function GET(context) {
  return rss({
    title: 'Genetic Daily Papers',
    description: '统计遗传学与计算基因组学论文解读',
    site: context.site,
    items: (await publishedIssues()).map(e => ({
      title: e.data.title,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `/daily/${e.id}/`,
    })),
  });
}

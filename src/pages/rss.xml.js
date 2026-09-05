import rss from '@astrojs/rss';
import {catalog} from '../lib/catalog';
export async function GET(context){const {issues}=await catalog();return rss({title:'Genetic Daily Papers',description:'遗传统计与细胞组学论文解读',site:context.site,items:issues.map(e=>({title:e.data.title,description:e.data.summary,pubDate:e.data.date,link:`/daily/${e.id}/`}))});}

/** Cache unchanged publisher figures; missing or changed images stop publication. */
import {readFile,readdir,mkdir,writeFile,stat,rename} from 'node:fs/promises';
import {join,basename} from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from 'yaml';
import {figuresFor,assetFor} from '../src/lib/review-figures.mjs';
const allowed=new Set(['www.nature.com','nature.com','media.springernature.com','static-content.springer-cdn.com']);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x2F;/gi,'/').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const fullSize=url=>url.replace(/\/m\d+\//,'/full/').replace(/\/lw\d+\//,'/full/');
async function get(url,depth=0){if(depth>5)throw new Error('Too many redirects');const u=new URL(url);if(u.protocol!=='https:'||!allowed.has(u.hostname))throw new Error(`Unexpected image host ${u.hostname}`);const r=await fetch(u,{redirect:'manual',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'GeneticDailyPapers/1.0 (academic reading site; licensed figures)'}});if(r.status>=300&&r.status<400){const loc=r.headers.get('location');if(!loc)throw new Error('Redirect without Location');return get(new URL(loc,u).href,depth+1);}if(!r.ok)throw new Error(`HTTP ${r.status} ${url}`);return {r,url:u.href};}
function imageInfo(buf){
 if(buf.length<1000)throw new Error('Image file too short');
 if(buf.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return {type:'png',width:buf.readUInt32BE(16),height:buf.readUInt32BE(20)};
 if(buf[0]===255&&buf[1]===216){let i=2;while(i<buf.length-10){if(buf[i]!==255){i++;continue;}const mark=buf[i+1];if([0xc0,0xc1,0xc2].includes(mark))return {type:'jpg',height:buf.readUInt16BE(i+5),width:buf.readUInt16BE(i+7)};if([0xd8,0xd9].includes(mark)){i+=2;continue;}i+=2+buf.readUInt16BE(i+2);}}
 if(buf.subarray(0,4).toString()==='RIFF'&&buf.subarray(8,12).toString()==='WEBP')return {type:'webp',width:null,height:null};
 throw new Error('Not a recognized raster image (possibly an HTML error page)');
}
async function imageURL(f){if(f.url)return f.sha256?f.url:fullSize(f.url);const {r}=await get(f.sourceUrl),text=await r.text();const figNo=f.sourceUrl.match(/\/figures\/(\d+)/)?.[1];
 const candidates=[...text.matchAll(/(?:https:)?\/\/media\.springernature\.com\/[^\s"'<>]+/g)].map(m=>decode(m[0]).replace(/^\/\//,'https://'));
 const selected=candidates.find(s=>new RegExp(`_Fig${figNo}_HTML\\.(png|jpe?g)(?:[?]|$)`,'i').test(s));
 if(!selected)throw new Error(`No Figure ${figNo} image URL found; inspect the source PDF for ${f.assetPath}`);return fullSize(selected);
}
const all=new Map();for(const file of await readdir('src/content/papers')){if(!file.endsWith('.md'))continue;const raw=await readFile(join('src/content/papers',file),'utf8'),fm=raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);if(!fm)continue;const meta=parse(fm[1]);if(!meta.published)continue;for(const f of figuresFor(meta,basename(file,'.md').toLowerCase()))all.set(assetFor(f),f);}
await mkdir('public/figures',{recursive:true});await mkdir('.radar',{recursive:true});const report=[];const errors=[];
for(const [asset,f] of all){const dest=join('public',asset.slice(1));try{let bytes,url=f.url??f.sourceUrl,cached=false;try{if((await stat(dest)).size>1000){bytes=await readFile(dest);cached=true;const old=imageInfo(bytes);if(old.width!==null&&Math.max(old.width,old.height)<400){bytes=undefined;cached=false;}}}catch{}
 if(!bytes){url=await imageURL(f);const result=await get(url);url=result.url;bytes=Buffer.from(await result.r.arrayBuffer());}
 if(f.sha256&&createHash('sha256').update(bytes).digest('hex')!==f.sha256)throw new Error('Figure checksum differs from visually verified original');
 const info=imageInfo(bytes);if(info.width!==null&&Math.max(info.width,info.height)<400)throw new Error(`Figure resolution too small: ${info.width}×${info.height}`);
 if(!cached){await writeFile(dest+'.tmp',bytes);await rename(dest+'.tmp',dest);}
 report.push({asset,sourceUrl:f.sourceUrl,retrievedUrl:url,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,...info,cached});console.log(`[figure] ${cached?'local':'fetched'} ${asset}`);
 }catch(e){errors.push({asset,sourceUrl:f.sourceUrl,error:e.message});console.error(`[figure] FAILED ${asset}: ${e.message}`);}}
await writeFile('.radar/figure-check.json',JSON.stringify({checkedAt:new Date().toISOString(),images:report,errors},null,2)+'\n');
if(errors.length){console.error(`${errors.length} figures missing; publication stopped.`);process.exit(1);}console.log(`[figures] ${report.length}/${all.size} image files verified`);

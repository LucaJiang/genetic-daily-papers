import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const overrideFile=join(process.cwd(),'src/data/figure-overrides.json');
const overrides=existsSync(overrideFile)?JSON.parse(readFileSync(overrideFile,'utf8')):{};
const normalized=new Map(Object.entries(overrides).map(([key,value])=>[key.toLowerCase(),value]));
const rank={'real-data':0,validation:1,workflow:2,resource:3,simulation:4};
export function assetFor(f){
 if(f.assetPath){if(!/^\/figures\/[a-z0-9._-]+\.(png|jpg|jpeg|webp)$/i.test(f.assetPath))throw new Error('Invalid figure path');return f.assetPath;}
 if(!f.url)throw new Error(`No image path for ${f.sourceUrl}`);
 const ext=new URL(f.url).pathname.match(/\.(png|jpe?g|webp)$/i)?.[1].toLowerCase().replace('jpeg','jpg')??'png';
 return '/figures/'+createHash('sha256').update(f.url).digest('hex').slice(0,24)+'.'+ext;
}
export function figuresFor(meta,slug){
 const own=meta.figures??[];
 const list=own.some(f=>f.id)?own:(normalized.get(String(slug).toLowerCase())??(own.length?own:(meta.figure?[meta.figure]:[])));
 return list.map((f,i)=>({...f,id:f.id??('fig'+(f.sourceUrl?.match(/\/figures\/(\d+)/)?.[1]??i+1)),label:(f.label??`Figure ${i+1}`).replace(/^(真实数据|方法流程|模拟|数据库|验证|方法)[：:]\s*/u,''),kind:f.kind??'validation',assetPath:assetFor(f)})).sort((a,b)=>(rank[a.kind]??5)-(rank[b.kind]??5));
}
export function figureKind(kind){return {'real-data':'实证结果',validation:'验证',workflow:'方法流程',simulation:'模拟',resource:'数据资源'}[kind]??'论文图';}
export function htmlEscape(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function figureHTML(f){
 const esc=htmlEscape,src=assetFor(f);
 const licence=f.licenseUrl?` · <a href="${esc(f.licenseUrl)}" target="_blank" rel="noreferrer">${esc(f.license)}</a>`:(f.license?` · ${esc(f.license)}`:'');
 return `<figure class="inline-figure" id="${esc(f.id)}"><a href="${esc(src)}" target="_blank" rel="noreferrer" aria-label="放大：${esc(f.label)}"><img src="${esc(src)}" alt="${esc(f.alt)}" loading="lazy" decoding="async"></a><figcaption><span class="figure-type">${esc(figureKind(f.kind))}</span><strong>${esc(f.label)}</strong><p>${esc(f.caption)}</p><small>${esc(f.credit)}${licence} · 原图未修改 · <a href="${esc(f.sourceUrl)}" target="_blank" rel="noreferrer">原文图</a> · <a href="${esc(src)}" target="_blank" rel="noreferrer">放大</a></small></figcaption></figure>`;
}

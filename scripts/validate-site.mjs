import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
async function files(dir){const names=await readdir(dir,{withFileTypes:true});return (await Promise.all(names.map(n=>n.isDirectory()?files(join(dir,n.name)):[join(dir,n.name)]))).flat();}
const htmlFiles=(await files(root)).filter(f=>f.endsWith('.html'));
const failures=[];let mathCount=0;let imageCount=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 if(/class="[^"]*katex-error/.test(html))failures.push(`Invalid math in ${file}`);
 if(/\[figure:\d+\]/.test(html))failures.push(`Unrendered figure in ${file}`);
 if(/[\uE200\uE202\uE201]/.test(html))failures.push(`Chat-only citation in ${file}`);
 mathCount+=(html.match(/class="katex"/g)??[]).length;
 for(const match of html.matchAll(/<(a|img|link|script)\b[^>]*?\s(?:href|src)="([^"]+)"/g)){
   const tag=match[1], raw=match[2].replace(/&amp;/g,'&');
   if(/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(raw))continue;
   const path=decodeURIComponent(raw.split(/[?#]/)[0]);if(!path)continue;
   const target=path.startsWith('/')?join(root,path):join(dirname(file),path);
   try{const info=await stat(target);if(info.isDirectory())await stat(join(target,'index.html'));}
   catch{failures.push(`Missing local ${tag}: ${raw} in ${file}`);}
   if(tag==='img')imageCount++;
 }
}
const expected={'daily/2026-09-03/index.html':3,'daily/2026-09-04/index.html':4,'daily/2026-09-05/index.html':3};
for(const [path,count]of Object.entries(expected)){
 const html=await readFile(join(root,path),'utf8');const actual=(html.match(/data-paper-id=/g)??[]).length;
 if(actual!==count)failures.push(`${path}: expected ${count} entries, got ${actual}`);
}
for(const id of ['ibd-blood-gut-eqtl','glial-3d-epigenome','ab-prs-adaptive-finetuning']){
 const html=await readFile(join(root,'papers',id,'index.html'),'utf8');
 if((html.match(/class="inline-figure"/g)??[]).length!==2)failures.push(`${id}: expected 2 inline figures`);
 if(!html.includes('class="katex"'))failures.push(`${id}: missing rendered math`);
}
const latest=await readFile(join(root,'daily/2026-09-05/index.html'),'utf8');
if(!latest.includes('data-brief-id="maeea-2026"'))failures.push('daily/2026-09-05: missing MAEEA resource brief');
const report={pages:htmlFiles.length,renderedMath:mathCount,imageReferences:imageCount,errors:failures};
await writeFile(join(root,'quality-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length)throw new Error('Site validation failed');

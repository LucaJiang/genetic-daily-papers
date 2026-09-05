/** Compare the public deployment with the locally built release. No account access or writes. */
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {join,relative} from 'node:path';
import {createHash} from 'node:crypto';
const site='https://papers.lucajiang.com';
const sha=process.env.GITHUB_SHA??'manual';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
async function get(path){const u=new URL(path,site);u.searchParams.set('verify',sha);const r=await fetch(u,{signal:AbortSignal.timeout(25000),headers:{'Cache-Control':'no-cache'}});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);return Buffer.from(await r.arrayBuffer());}
async function walk(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);files.push(...(e.isDirectory()?await walk(p):[p]));}return files;}
const files=(await walk('dist')).filter(f=>f.endsWith('.html')&&!f.endsWith('404.html'));
const expectedHome=await readFile('dist/index.html','utf8');
const styles=[...expectedHome.matchAll(/href="(\/_astro\/[^" ]+\.css)"/g)].map(m=>m[1]);
const homeIds=[...expectedHome.matchAll(/data-paper-id="([^"]+)"/g)].map(m=>m[1]);
let ready=false,last='';
for(let attempt=0;attempt<18;attempt++){
 try{const html=(await get('/')).toString();if(styles.every(s=>html.includes(s))&&homeIds.every(id=>html.includes(`data-paper-id="${id}"`))){ready=true;break;}last='Waiting for matching home page and stylesheet';}
 catch(e){last=e.message;}
 console.log(`[live] ${last}`);await sleep(10000);
}
if(!ready)throw new Error(`Deployment not ready: ${last}`);
const report={checkedAt:new Date().toISOString(),commit:sha,site,pages:[],assets:[],errors:[]};
const assets=new Set(styles);
for(const file of files){const rel=relative('dist',file).replaceAll('\\','/');const path=rel==='index.html'?'/':'/'+rel.replace(/index\.html$/,'');try{
 const expected=await readFile(file,'utf8'),actual=(await get(path)).toString();
 const title=expected.match(/<title>([\s\S]*?)<\/title>/)?.[1];
 if(title&&!actual.includes(`<title>${title}</title>`))throw new Error('page title differs');
 for(const attr of ['data-paper-id','data-brief-id']){const pattern=new RegExp(`${attr}="([^"]+)"`,'g');const want=[...expected.matchAll(pattern)].map(m=>m[1]);const got=[...actual.matchAll(pattern)].map(m=>m[1]);if(JSON.stringify(want)!==JSON.stringify(got))throw new Error(`${attr} differs`);}
 if((actual.match(/class="katex"/g)??[]).length!==(expected.match(/class="katex"/g)??[]).length)throw new Error('math count differs');
 const wantImages=[...expected.matchAll(/<img[^>]*src="(\/figures\/[^" ]+)"/g)].map(m=>m[1]);for(const image of wantImages){if(!actual.includes(image))throw new Error(`missing image ${image}`);assets.add(image);}
 report.pages.push({path,status:200,figures:wantImages.length});console.log(`[live] PASS ${path}`);
 }catch(e){report.errors.push({path,error:e.message});}}
for(const path of assets){try{const actual=await get(path),expected=await readFile(join('dist',path.slice(1)));if(digest(actual)!==digest(expected))throw new Error('asset checksum differs');report.assets.push({path,sha256:digest(actual),bytes:actual.length});}catch(e){report.errors.push({path,error:e.message});}}
await mkdir('.radar',{recursive:true});await writeFile('.radar/live-check.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages.length,assets:report.assets.length,errors:report.errors},null,2));
if(report.errors.length)process.exit(1);

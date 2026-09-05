import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.REVIEW_BASE_URL??'http://127.0.0.1:4321';
const server=process.env.REVIEW_BASE_URL?null:spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4321'],{stdio:'ignore'});
const routes=['/','/daily/2026-09-03/','/daily/2026-09-04/','/daily/2026-09-05/','/papers/ibd-blood-gut-eqtl/','/papers/glial-3d-epigenome/','/papers/ab-prs-adaptive-finetuning/','/papers/cigma-cell-type-specific-eqtl/','/topics/','/archive/','/resources/'];
const widths=[1440,1024,768,390,320],report=[],errors=[];
await mkdir('.radar/qa',{recursive:true});let browser;
try{
 for(let i=0;i<80;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===79)throw new Error('Preview server not ready');await new Promise(r=>setTimeout(r,500));}
 browser=await chromium.launch({headless:true});const page=await browser.newPage();page.setDefaultTimeout(15000);
 for(const route of routes){for(const width of widths){
  await page.setViewportSize({width,height:900});const response=await page.goto(base+route,{waitUntil:'networkidle'});
  if(response?.status()!==200)errors.push(`${route}: HTTP ${response?.status()}`);
  await page.evaluate(()=>{for(const image of document.images)image.loading='eager';});
  await page.waitForFunction(()=>Array.from(document.images).every(image=>image.complete));
  await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(()=>{
   const images=Array.from(document.images);const headings=Array.from(document.querySelectorAll('.toc a,.mobile-toc a'));
   const clone=document.querySelector('.prose')?.cloneNode(true);clone?.querySelectorAll('.katex').forEach(el=>el.remove());
   return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cards:document.querySelectorAll('[data-paper-id]').length,briefs:document.querySelectorAll('[data-brief-id]').length,figures:document.querySelectorAll('.inline-figure').length,images:images.map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0,width:i.naturalWidth,height:i.naturalHeight})),katex:document.querySelectorAll('.katex').length,mathErrors:document.querySelectorAll('.katex-error').length,rawMath:/\$\$|\\\[|\\\]|\[\[figure:/.test(clone?.textContent??''),badAnchors:headings.filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash)};
  });
  if(result.scrollWidth>width+1)errors.push(`${route}@${width}: horizontal overflow ${result.scrollWidth}`);
  if(result.images.some(i=>!i.ok))errors.push(`${route}@${width}: broken image`);
  if(result.mathErrors||result.rawMath)errors.push(`${route}@${width}: math/figure syntax not rendered`);
  if(result.badAnchors.length)errors.push(`${route}@${width}: invalid TOC anchor`);
  const count=route.includes('2026-09-03')?3:route.includes('2026-09-04')?4:route.includes('2026-09-05')||route==='/'?3:null;
  if(count!==null&&result.cards!==count)errors.push(`${route}@${width}: ${result.cards} cards expected ${count}`);
  if((route==='/'||route==='/daily/2026-09-05/')&&result.briefs!==1)errors.push(`${route}: wrong resource count`);
  if(route.startsWith('/papers/')&&result.katex===0)errors.push(`${route}: no rendered math`);
  if(route.startsWith('/papers/')&&result.figures<2)errors.push(`${route}: less than two original figures`);
  report.push({route,...result});
  if([1440,390].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'.radar/qa/'+(route.replace(/^\/|\/$/g,'').replaceAll('/','-')||'home')+'-'+width+'.png',fullPage:true});}
 }}
 await page.goto(base+'/topics/');const links=await page.locator('.topic-card').evaluateAll(elements=>elements.map(a=>a.getAttribute('href')));
 for(const link of links){const r=await page.goto(base+link,{waitUntil:'networkidle'});if(r?.status()!==200)errors.push(`Topic link broken: ${link}`);}
 await writeFile('.radar/qa/browser-report.json',JSON.stringify({base,checkedAt:new Date().toISOString(),checks:report.length,topics:links.length,results:report,errors},null,2));
 console.log(`[browser] ${report.length} page/width checks; ${links.length} topic routes; ${errors.length} errors`);
 if(errors.length)throw new Error(errors.join('\n'));
}finally{await browser?.close();server?.kill();}

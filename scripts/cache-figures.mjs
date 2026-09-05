import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
const outputDir = new URL('../public/figures/', import.meta.url);
const papersDir = new URL('../src/content/papers/', import.meta.url);
await mkdir(outputDir, { recursive: true });
const urls = new Set();
const overrides = JSON.parse(await readFile(new URL('../src/data/figure-overrides.json', import.meta.url), 'utf8'));
for (const figures of Object.values(overrides)) for (const figure of figures) urls.add(figure.url);
for (const name of await readdir(papersDir)) {
  if (!name.endsWith('.md')) continue;
  const text = await readFile(new URL(name, papersDir), 'utf8');
  const frontmatter = text.split(/^---\s*$/m)[1] ?? '';
  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^\s*(?:-\s*)?url:\s*["'](https?:\/\/[^"']+)["']\s*$/);
    if (match) urls.add(match[1]);
  }
}
function assetName(url) {
  const parsed = new URL(url);
  const extension = (parsed.pathname.match(/\.(png|jpe?g|webp)$/i)?.[1] ?? 'png').toLowerCase().replace('jpeg', 'jpg');
  return createHash('sha256').update(url).digest('hex').slice(0, 24) + '.' + extension;
}
function validImage(bytes) {
  if (bytes.length < 1024) return false;
  return bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ||
    (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) ||
    (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP');
}
async function download(url) {
  const file = assetName(url); const target = new URL(file, outputDir);
  try { const existing = await readFile(target); if (validImage(existing)) return {url,file,bytes:existing.length}; } catch {}
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {signal:AbortSignal.timeout(25000), headers:{'User-Agent':'Mozilla/5.0','Accept':'image/png,image/jpeg,image/webp,*/*;q=0.8'}});
      if (!response.ok) throw new Error('HTTP '+response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!validImage(bytes)) throw new Error('Response is not a valid PNG, JPEG or WebP image');
      await writeFile(target, bytes);
      return {url,file,bytes:bytes.length};
    } catch (error) { lastError = error; }
  }
  throw new Error(`Failed to cache figure ${url}: ${lastError}`);
}
const queue = [...urls]; const results = []; const errors = [];
await Promise.all(Array.from({length:Math.min(4,queue.length)},async()=>{
  while(queue.length) { const url=queue.shift(); try { results.push(await download(url)); } catch(e) { errors.push(String(e)); } }
}));
await writeFile(new URL('manifest.json', outputDir),JSON.stringify(results.sort((a,b)=>a.file.localeCompare(b.file)),null,2));
console.log(`[figures] verified ${results.length}/${urls.size} images`);
if(errors.length) throw new Error(errors.join('\n'));

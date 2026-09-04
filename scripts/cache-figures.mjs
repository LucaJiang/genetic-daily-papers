import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('..', import.meta.url);
const outputDir = new URL('../public/figures/', import.meta.url);
const overridePath = new URL('../src/data/figure-overrides.json', import.meta.url);
const papersDir = new URL('../src/content/papers/', import.meta.url);

await mkdir(outputDir, { recursive: true });

const urls = new Set();
const overrides = JSON.parse(await readFile(overridePath, 'utf8'));
for (const figures of Object.values(overrides)) {
  for (const figure of figures) urls.add(figure.url);
}

for (const name of await readdir(papersDir)) {
  if (!/\.mdx?$/.test(name)) continue;
  const text = await readFile(new URL(name, papersDir), 'utf8');
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*(?:-\s*)?url:\s*["'](https?:\/\/[^"']+)["']\s*$/);
    if (match) urls.add(match[1]);
  }
}

function assetName(url) {
  const parsed = new URL(url);
  const match = parsed.pathname.match(/\.(png|jpe?g|webp)$/i);
  const extension = (match?.[1] ?? 'png').toLowerCase().replace('jpeg', 'jpg');
  const digest = createHash('sha256').update(url).digest('hex').slice(0, 24);
  return `${digest}.${extension}`;
}

async function download(url) {
  const target = new URL(assetName(url), outputDir);
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'user-agent': 'Genetic-Daily-Papers/1.0 (+https://papers.lucajiang.com)',
          accept: 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8',
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1024) throw new Error(`response too small (${bytes.length} bytes)`);
      await writeFile(target, bytes);
      return { url, file: assetName(url), bytes: bytes.length };
    } catch (error) {
      if (attempt === 3) {
        console.warn(`[figures] could not cache ${url}: ${error.message}`);
        return null;
      }
    } finally {
      clearTimeout(timer);
    }
  }
}

const results = [];
const queue = [...urls];
const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
  while (queue.length) {
    const url = queue.shift();
    const result = await download(url);
    if (result) results.push(result);
  }
});
await Promise.all(workers);
await writeFile(new URL('manifest.json', outputDir), JSON.stringify(results, null, 2));
console.log(`[figures] cached ${results.length}/${urls.size} images`);

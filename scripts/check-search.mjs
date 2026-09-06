import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import ts from 'typescript';

// Transpile the dependency-free search engine using the existing TypeScript dependency.
// This keeps the checks compatible with the site's Node 20/22 build environments.
const source = await readFile('src/lib/search.ts', 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
});
const { prepareSearch, searchDocuments, highlightParts, queryTokens, searchSnippet } =
  await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const serialized = await readFile('dist/search-index.json', 'utf8');
const { version, documents } = JSON.parse(serialized);
assert.equal(version, 1);
assert.equal(new Set(documents.map(document => document.id)).size, documents.length, 'Duplicate search records');
const resources = JSON.parse(await readFile('src/data/qtl-resources.json', 'utf8'));
assert.deepEqual(documents.filter(d => d.id.startsWith('resource:')).map(d => d.id).sort(),
  resources.map(resource => `resource:${resource.id}`).sort(), 'Every QTL resource must be searchable');

for (const [type, directory] of [['paper', 'papers'], ['daily', 'daily']]) {
  const entries = await readdir(join('dist', directory), { withFileTypes: true });
  const routes = entries.filter(entry => entry.isDirectory()).map(entry => `/${directory}/${entry.name}/`).sort();
  assert.deepEqual(documents.filter(d => d.type === type).map(d => d.url).sort(), routes,
    `Search must match published ${type} routes, excluding drafts`);
}
for (const document of documents) {
  assert.ok(document.url.startsWith('/') && !document.url.startsWith('//'), 'Search destinations must be internal');
  const [path, hash] = document.url.split('#');
  const html = await readFile(join('dist', path, 'index.html'), 'utf8');
  if (hash) assert.ok(html.includes(`id="${hash}"`), `Missing search anchor: ${document.url}`);
  assert.ok(html.includes('href="/search/"'), `Missing global search navigation: ${document.url}`);
}
const page = await readFile('dist/search/index.html', 'utf8');
const fingerprint = createHash('sha256').update(serialized).digest('hex').slice(0, 12);
assert.ok(page.includes(`/search-index.json?v=${fingerprint}`), 'Search page must use the current index version');
for (const resource of resources) {
  const internalNote = resource.evidence?.primaryAccess;
  if (internalNote) assert.ok(!serialized.includes(internalNote), 'Internal evidence notes must not enter the search index');
}

const index = prepareSearch(documents);
const search = query => searchDocuments(index, query).map(hit => hit.document);
assert.equal(search('ColocBoost')[0]?.id, 'paper:colocboost-multiomics', 'Named papers must outrank body mentions');
assert.equal(search('eQTL Catalogue')[0]?.id, 'resource:eqtl-catalogue', 'Named resources must outrank body mentions');
for (const id of ['resource:tenk10k-phase1-eqtl', 'resource:tenk10k-phase1-caqtl']) {
  assert.ok(search('TenK10K').some(document => document.id === id), `Missing ${id}`);
}
assert.ok(search('BBJ').some(document => document.type === 'resource'));
assert.ok(search('BLNK').some(document => document.id === 'paper:colocboost-multiomics'), 'Paper body must be searchable');
assert.match(searchSnippet(search('BLNK').find(document => document.id === 'paper:colocboost-multiomics'), queryTokens('BLNK')), /BLNK/);
assert.ok(search('东亚 eQTL').length > 0, 'Chinese ancestry + QTL search');
assert.ok(search('非洲').some(document => document.type === 'resource'));
assert.ok(search('2026-09-06').some(document => document.type === 'daily'));
assert.deepEqual(search('ＳｕＳｉＥ').map(d => d.id), search('susie').map(d => d.id), 'Full-width and case folding');
assert.deepEqual(search('scRNA–seq').map(d => d.id), search('scRNA-seq').map(d => d.id), 'Unicode dash folding');
assert.equal(search('ColocBoost zzzz-no-such-word').length, 0, 'All query terms must match');
for (const query of ['', '  ', '— / !', '<script>alert("unlikely-xss-payload")</script>']) assert.equal(search(query).length, 0);

const original = '使用 ＳｕＳｉＥ 和 scRNA–seq；café 🧬';
const parts = highlightParts(original, queryTokens('susie scrna-seq cafe'));
assert.equal(parts.map(part => part.text).join(''), original, 'Highlighting must preserve original text');
assert.deepEqual(parts.filter(part => part.matched).map(part => part.text), ['ＳｕＳｉＥ', 'scRNA–seq', 'café']);
const overlapping = highlightParts('eQTL Catalogue', queryTokens('eqtl "eqtl catalogue"'));
assert.deepEqual(overlapping, [{ text: 'eQTL Catalogue', matched: true }], 'Merge overlapping highlights');
assert.ok(!/\.innerHTML\s*=|insertAdjacentHTML/.test(await readFile('src/pages/search.astro', 'utf8')),
  'Render queries and search snippets as text');

console.log(`[search] ${documents.length} records: published coverage, resource anchors, ranking, Chinese/English queries, highlights and index version checked`);
console.log(`[search] index ${Math.round(Buffer.byteLength(serialized) / 1024)} KiB; gzip ${Math.round(gzipSync(serialized).length / 1024)} KiB`);

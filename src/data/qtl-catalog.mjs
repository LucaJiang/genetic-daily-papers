import base from './qtl-resources.json' with { type: 'json' };
import update from './qtl-resource-updates-2026-11-06.json' with { type: 'json' };

// Keep historical records intact; the page and search checks consume this same catalog.
const byId = new Map(base.map(resource => [resource.id, structuredClone(resource)]));
if (byId.size !== base.length) throw new Error('Duplicate historical resource IDs');
const patched = new Set();
for (const patch of update.patches) {
  const current = byId.get(patch.id);
  if (!current || patched.has(patch.id)) throw new Error(`Invalid resource patch: ${patch.id}`);
  patched.add(patch.id);
  byId.set(patch.id, {
    ...current, ...patch.set,
    sources: [...current.sources, ...patch.appendSources],
    detailSections: [...(current.detailSections ?? []), ...patch.appendDetails],
    evidence: { ...current.evidence, ...patch.evidence },
  });
}
const ids = new Set(byId.keys());
for (const resource of update.additions) {
  if (ids.has(resource.id)) throw new Error(`Duplicate added resource: ${resource.id}`);
  ids.add(resource.id);
}
const merged = [...structuredClone(update.additions), ...byId.values()];
const requiredStrings = ['id', 'name', 'version', 'category', 'group', 'navLabel', 'tissue',
  'summary', 'sampleSize', 'cellsPerDonor', 'assay', 'depth', 'access', 'limitations', 'ancestry'];
for (const resource of merged) {
  for (const key of requiredStrings) {
    if (typeof resource[key] !== 'string' || !resource[key].trim()) {
      throw new Error(`Missing resource field: ${resource.id}.${key}`);
    }
  }
  if (!Array.isArray(resource.qtlTypes) || !Array.isArray(resource.ancestryTags) || !resource.ancestryTags.length) {
    throw new Error(`Invalid resource tags: ${resource.id}`);
  }
  if (!resource.sources.length || resource.sources.some(source => !/^https?:\/\//.test(source.url))) {
    throw new Error(`Invalid resource sources: ${resource.id}`);
  }
  const references = [...Object.values(resource.fieldSources ?? {}),
    ...(resource.detailSections ?? []).map(section => section.sourceIndices ?? [])];
  for (const indices of references) for (const index of indices) {
    if (!Number.isInteger(index) || index < 0 || index >= resource.sources.length) {
      throw new Error(`Invalid source index: ${resource.id}[${index}]`);
    }
  }
}

// Runtime validation above covers the JSON boundary; retain the existing consumer shape.
const resources = /** @type {typeof base} */ (/** @type {unknown} */ (merged));
export const resourceUpdateDate = update.checkedAt;
export default resources;

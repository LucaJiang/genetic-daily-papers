export type SearchType = 'paper' | 'resource' | 'daily';

export interface SearchDocument {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  url: string;
  meta: string[];
  tags: string[];
  summary: string;
  body: string;
  date: string;
}

export const searchLabels: Record<SearchType, string> = {
  paper: '论文', resource: '数据资源', daily: '日报',
};

// Fold case, full-width characters and punctuation without segmenting Chinese.
export const foldSearchText = (value: string) => value.normalize('NFKD')
  .toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

export function queryTokens(query: string): string[] {
  return [...new Set([...query.slice(0, 200).matchAll(/"([^"]+)"|“([^”]+)”|(\S+)/gu)]
    .map(match => foldSearchText(match[1] ?? match[2] ?? match[3]))
    .filter(Boolean))];
}

export function prepareSearch(documents: SearchDocument[]) {
  return documents.map(document => ({
    document,
    fields: [
      [document.title, 18], [document.subtitle, 14], [document.tags.join(' '), 10],
      [document.summary, 6], [document.meta.join(' '), 4], [document.body, 1],
    ].map(([value, weight]) => ({ text: foldSearchText(String(value)), weight: Number(weight) })),
  }));
}

export function searchDocuments(index: ReturnType<typeof prepareSearch>, query: string) {
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  const phrase = tokens.join('');
  return index.flatMap(({ document, fields }) => {
    let score = 0;
    for (const token of tokens) {
      const match = fields.find(field => field.text.includes(token));
      if (!match) return [];
      score += match.weight;
    }
    if (fields[0].text === phrase) score += 80;
    else if (fields[0].text.includes(phrase)) score += 24;
    if (fields[1].text === phrase) score += 60;
    else if (fields[1].text.includes(phrase)) score += 16;
    return [{ document, score }];
  }).sort((a, b) => b.score - a.score || b.document.date.localeCompare(a.document.date)
    || a.document.title.localeCompare(b.document.title, 'zh-CN'));
}

// Retain offsets into the original text so highlighted NFKD matches stay accurate.
function foldedPositions(value: string) {
  let text = '', offset = 0;
  const starts: number[] = [], ends: number[] = [];
  for (const character of value) {
    const folded = foldSearchText(character);
    text += folded;
    for (let i = 0; i < folded.length; i++) {
      starts.push(offset);
      ends.push(offset + character.length);
    }
    offset += character.length;
  }
  return { text, starts, ends };
}

export function highlightParts(value: string, tokens: string[]) {
  const { text, starts, ends } = foldedPositions(value);
  const ranges: [number, number][] = [];
  for (const token of tokens.filter(Boolean)) {
    let from = 0, index: number;
    while ((index = text.indexOf(token, from)) !== -1) {
      ranges.push([starts[index], ends[index + token.length - 1]]);
      from = index + token.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged.at(-1);
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
  }
  const parts: { text: string; matched: boolean }[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) parts.push({ text: value.slice(cursor, start), matched: false });
    parts.push({ text: value.slice(start, end), matched: true });
    cursor = end;
  }
  if (cursor < value.length) parts.push({ text: value.slice(cursor), matched: false });
  return parts;
}

export function searchSnippet(document: SearchDocument, tokens: string[], length = 180) {
  const candidates = [document.summary, document.body, document.subtitle, document.meta.join(' '), document.tags.join(' ')];
  const value = candidates.find(text => tokens.some(token => foldSearchText(text).includes(token)))
    ?? document.summary;
  if (value.length <= length) return value;
  const folded = foldedPositions(value);
  const matches = tokens.map(token => folded.text.indexOf(token)).filter(index => index >= 0);
  const position = matches.length ? folded.starts[Math.min(...matches)] : 0;
  let start = Math.min(Math.max(0, position - 45), Math.max(0, value.length - length));
  if (start > 0 && /[\uDC00-\uDFFF]/.test(value[start])) start--;
  let end = Math.min(value.length, start + length);
  if (end < value.length && /[\uDC00-\uDFFF]/.test(value[end])) end++;
  return `${start ? '…' : ''}${value.slice(start, end)}${end < value.length ? '…' : ''}`;
}

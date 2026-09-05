"""One-time, idempotent migration of previously reviewed entries; no automatic selection."""
from pathlib import Path
import re
labels={
 'cigma-cell-type-specific-eqtl':'模拟与校准',
 'rare-variant-nonadditivity':'非加性遗传编码',
 'brain-context-lncrna-eqtl':'细胞背景相关的 lncRNA 调控',
 'scigma-spatial-multiomics':'图注意力与跨模态整合',
 'spatial-atac-hi-c':'小鼠脑空间结构',
 'malva-sequence-search':'序列索引与检索结果',
 'omicspred':'模型资源与预测应用',
}
paths=[Path('src/content/papers')/(s+'.md') for s in labels]
paths += [Path('src/content/daily')/(s+'.md') for s in ['2026-09-03','2026-09-04']]
for path in paths:
    text=path.read_text()
    header=re.match(r'^---\r?\n([\s\S]*?)\r?\n---',text)
    if not header: raise ValueError(f'Missing frontmatter: {path}')
    if not re.search(r'^published\s*:',header[1],re.M): text=text[:4]+'published: true\n'+text[4:]
    title=labels.get(path.stem,'图示结果')
    text=re.sub(r'(?m)^## Figure\s*\d+(?:\s*/\s*\d+)?\s*应该怎样读\s*$',f'## {title}',text)
    text=text.replace('## 最值得带走的结论','## 小结')
    path.write_text(text)
p=Path('src/content/papers/ab-prs-adaptive-finetuning.md')
p.write_text(p.read_text().replace('昨日收录的罕见变异','此前收录的罕见变异'))
print('Migrated 7 previously reviewed papers and 2 issues; no new entries auto-published.')

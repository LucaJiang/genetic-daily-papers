"""Migrate only the explicitly reviewed legacy issues; never publish unknown drafts."""
from pathlib import Path
import re
root=Path('src/content')
labels={'cigma-cell-type-specific-eqtl':'模拟与校准','rare-variant-nonadditivity':'非加性遗传编码','scigma-spatial-multiomics':'图注意力与跨模态整合','spatial-atac-hi-c':'小鼠脑空间结构','malva-sequence-search':'序列索引与检索结果','omicspred':'模型资源与预测应用','brain-context-lncrna-eqtl':'细胞背景相关的 lncRNA 调控'}
paths=[root/'papers'/f'{slug}.md' for slug in labels]+[root/'daily/2026-09-03.md',root/'daily/2026-09-04.md']
for path in paths:
    if not path.is_file(): raise SystemExit(f'Missing legacy file: {path}')
    text=path.read_text();match=re.match(r'^---\n([\s\S]*?)\n---',text)
    if not match: raise SystemExit(f'Invalid frontmatter: {path}')
    if not re.search(r'^published\s*:',match[1],re.M):text=text[:4]+'published: true\n'+text[4:]
    label=labels.get(path.stem,'图示结果')
    text=re.sub(r'(?m)^## Figure\s*\d+(?:\s*/\s*\d+)?\s*应该怎样读\s*$',f'## {label}',text)
    text=text.replace('## 最值得带走的结论','## 小结')
    path.write_text(text)
ab=root/'papers/ab-prs-adaptive-finetuning.md'
if ab.exists(): ab.write_text(ab.read_text().replace('与昨日收录的罕见变异','与此前收录的罕见变异'))
print('Reviewed legacy issues retained; no other drafts published.')

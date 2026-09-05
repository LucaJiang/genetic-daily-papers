"""Idempotent merge migration of known reviewed entries; never selects new papers."""
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
 'sce2g-enhancer-gene':'增强子–基因预测',
 'aou-anvil-reference-panel':'填充准确率',
 'ldspec-correlated-effects':'效应相关与遗传力',
}
paths=[Path('src/content/papers')/(s+'.md') for s in labels]
paths += [Path('src/content/daily')/(s+'.md') for s in ['2026-09-03','2026-09-04']]
for path in paths:
    text=path.read_text()
    header=re.match(r'^---\r?\n([\s\S]*?)\r?\n---',text)
    if not header: raise ValueError(f'Missing frontmatter: {path}')
    if not re.search(r'^published\s*:',header[1],re.M): text=text[:4]+'published: true\n'+text[4:]
    text=re.sub(r'(?m)^## Figure\s*\d+(?:\s*/\s*\d+)?\s*应该怎样读\s*$',f'## {labels.get(path.stem,"图示结果")}',text)
    text=text.replace('## 最值得带走的结论','## 小结')
    path.write_text(text)
old=Path('src/content/papers/ab-prs-adaptive-boosting.md')
if old.exists():
    text=old.read_text();fm=re.match(r'^---\n([\s\S]*?)\n---',text)
    if re.search(r'^published:',fm[1],re.M):text=re.sub(r'(?m)^published:.*$','published: false',text,count=1)
    else:text=text[:4]+'published: false\n'+text[4:]
    old.write_text(text)
p=Path('src/content/papers/ab-prs-adaptive-finetuning.md')
text=p.read_text().replace('昨日收录的罕见变异','此前收录的罕见变异')
text=text.replace(' g\\{E(Y_i)\\}=a+\\beta_0\\,\\mathrm{PRS}_{i}^{\\mathrm{pre}}\n +\\theta_{j1}\\mathbf{1}(G_{ij}=Aa)\n +\\theta_{j2}\\mathbf{1}(G_{ij}=aa).','\\begin{aligned}\n g\\{E(Y_i)\\}={}&a+\\beta_0\\,\\mathrm{PRS}_{i}^{\\mathrm{pre}}\\\\\n &+\\theta_{j1}\\mathbf{1}(G_{ij}=Aa)\\\\\n &+\\theta_{j2}\\mathbf{1}(G_{ij}=aa).\n\\end{aligned}')
p.write_text(text)
# Source-text fields are normalized before building, rather than silently transformed only in the UI.
print('Preserved 10 earlier reviewed papers, consolidated AB-PRS, and preserved both historical issues.')

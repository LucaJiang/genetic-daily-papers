function plainText(node) {
  if (!node || typeof node !== 'object') return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  return Array.isArray(node.children) ? node.children.map(plainText).join('') : '';
}

const fileRules = [
  [/cigma-cell-type-specific-eqtl/, 'Figure 2 应该怎样读', '置换检验与模拟校准'],
  [/spatial-atac-hi-c/, 'Figure 2 应该怎样读', '小鼠脑真实数据：空间分区与模态一致性'],
  [/rare-variant-nonadditivity/, 'Figure 1 应该怎样读', '非加性遗传编码'],
  [/malva-sequence-search/, 'Figure 1 应该怎样读', '查询流程与输出'],
  [/scigma-spatial-multiomics/, 'Figure 1 应该怎样读', '模型结构：空间图与跨模态注意力'],
  [/brain-context-lncRNA-eqtl|brain-context-lncrna-eqtl/i, '共定位结果应该怎样解释', '共定位结果'],
];

export default function remarkCleanHeadings() {
  return (tree, file) => {
    const path = String(file?.path ?? '');

    for (const node of tree.children ?? []) {
      if (node.type !== 'heading') continue;
      const text = plainText(node).trim();

      const matchedRule = fileRules.find(([pathPattern, source]) => pathPattern.test(path) && source === text);
      let replacement = matchedRule?.[2];

      if (!replacement) {
        const genericFigure = text.match(/^Figure\s*(\d+[A-Za-z]?)\s*应该怎样读$/i);
        if (genericFigure) replacement = `Figure ${genericFigure[1]}`;
      }

      if (!replacement && text === '共定位结果应该怎样解释') replacement = '共定位结果';
      if (replacement) node.children = [{ type: 'text', value: replacement }];
    }
  };
}

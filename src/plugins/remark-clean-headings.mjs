function plainText(node) {
  if (!node || typeof node !== 'object') return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  return Array.isArray(node.children) ? node.children.map(plainText).join('') : '';
}

const replacements = [
  [/^Figure\s*1\s*应该怎样读$/i, '方法流程'],
  [/^Figure\s*2\s*应该怎样读$/i, '真实数据结果'],
  [/^共定位结果应该怎样解释$/, '共定位结果'],
];

export default function remarkCleanHeadings() {
  return (tree, file) => {
    const path = String(file?.path ?? '');
    for (const node of tree.children ?? []) {
      if (node.type !== 'heading') continue;
      const text = plainText(node).trim();
      let replacement;

      if (/cigma-cell-type-specific-eqtl/.test(path) && text === 'Figure 2 应该怎样读') {
        replacement = '模拟与校准';
      } else if (/spatial-atac-hi-c/.test(path) && text === 'Figure 2 应该怎样读') {
        replacement = '小鼠脑真实数据';
      } else if (/rare-variant-nonadditivity/.test(path) && text === 'Figure 1 应该怎样读') {
        replacement = '正交遗传编码';
      } else {
        const matched = replacements.find(([pattern]) => pattern.test(text));
        replacement = matched?.[1];
      }

      if (replacement) node.children = [{ type: 'text', value: replacement }];
    }
  };
}

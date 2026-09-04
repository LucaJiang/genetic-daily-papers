const WEB_CITATION = /cite[^]*/g;

function visit(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'text' && typeof node.value === 'string') {
    node.value = node.value.replace(WEB_CITATION, '');
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child);
  }
}

export default function remarkStripWebCitations() {
  return (tree) => visit(tree);
}

export const topics = [
  { slug: 'statistical-methods', label: '统计方法与生物统计', shortLabel: '统计方法', description: '模型、推断、校准、多重检验和不确定性量化。', accent: 'plum' },
  { slug: 'statistical-genetics', label: '统计遗传学', shortLabel: '统计遗传学', description: '复杂性状、遗传效应异质性、群体结构和遗传架构。', accent: 'violet' },
  { slug: 'QTL', label: 'GWAS / QTL', shortLabel: 'GWAS / QTL', description: 'eQTL、sQTL、pQTL、context-dependent QTL 和分子性状。', accent: 'indigo' },
  { slug: 'fine-mapping', label: 'Fine-mapping 与共定位', shortLabel: 'Fine-mapping', description: 'SuSiE、credible sets、多因果信号、colocalization 和功能先验。', accent: 'blue' },
  { slug: 'single-cell', label: '单细胞与空间组学', shortLabel: '单细胞 / 空间', description: '单细胞、空间组学、多组学及其统计与计算方法。', accent: 'cyan' },
  { slug: 'foundation-models', label: 'Foundation Models', shortLabel: 'Foundation Models', description: '单细胞与基因组基础模型的训练、评估和应用。', accent: 'teal' },
  { slug: 'perturbation', label: 'Perturbation Modeling', shortLabel: 'Perturbation', description: 'Perturb-seq、药物扰动、反事实预测和细胞状态变化。', accent: 'emerald' },
  { slug: 'functional-annotation', label: '功能注释与调控模型', shortLabel: '功能注释', description: '变异功能评分、调控序列模型和遗传学整合。', accent: 'amber' },
  { slug: 'algorithm-acceleration', label: '算法加速', shortLabel: '算法加速', description: '运行时间、内存、I/O、稀疏计算、GPU 和并行实现。', accent: 'orange' },
  { slug: 'resources', label: '数据资源', shortLabel: '数据资源', description: 'GWAS/QTL 数据库、新队列、summary statistics 和多组学数据发布。', accent: 'rose' },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
export const topicBySlug = Object.fromEntries(topics.map((topic) => [topic.slug, topic])) as Record<string, (typeof topics)[number]>;
export const topicLabel = (slug: string) => topicBySlug[slug]?.shortLabel ?? slug;

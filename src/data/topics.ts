export const topics = [
  {
    slug: 'statistical-methods',
    label: '统计方法与生物统计',
    shortLabel: '统计方法',
    description: '广义线性模型、Bayesian inference、因果推断、校准、多重检验与不确定性量化。',
    accent: 'plum',
  },
  {
    slug: 'statistical-genetics',
    label: '统计遗传学',
    shortLabel: '统计遗传学',
    description: 'GWAS、QTL、遗传效应异质性、群体结构与可校准推断。',
    accent: 'violet',
  },
  {
    slug: 'QTL',
    label: 'GWAS / QTL',
    shortLabel: 'GWAS / QTL',
    description: 'eQTL、sQTL、pQTL、context-dependent QTL 与大型遗传资源。',
    accent: 'indigo',
  },
  {
    slug: 'fine-mapping',
    label: 'Fine-mapping 与共定位',
    shortLabel: 'Fine-mapping',
    description: 'SuSiE、credible sets、多因果信号、colocalization 与功能先验。',
    accent: 'blue',
  },
  {
    slug: 'single-cell',
    label: '单细胞与空间组学',
    shortLabel: '单细胞 / 空间',
    description: '单细胞、空间、多组学以及相应统计与计算方法。',
    accent: 'cyan',
  },
  {
    slug: 'foundation-models',
    label: 'Foundation Models',
    shortLabel: 'Foundation Models',
    description: '单细胞、基因组和调控序列基础模型的训练、评估与失效边界。',
    accent: 'teal',
  },
  {
    slug: 'perturbation',
    label: 'Perturbation Modeling',
    shortLabel: 'Perturbation',
    description: 'Perturb-seq、virtual cell、反事实预测和动态细胞状态建模。',
    accent: 'emerald',
  },
  {
    slug: 'functional-annotation',
    label: '功能注释与调控模型',
    shortLabel: '功能注释',
    description: '变异功能评分、调控序列模型、AlphaGenome 类输出及其遗传学整合。',
    accent: 'amber',
  },
  {
    slug: 'algorithm-acceleration',
    label: '算法加速',
    shortLabel: '算法加速',
    description: '从算子、稀疏结构、数据搬运、显存与并行策略评估真实加速收益。',
    accent: 'orange',
  },
  {
    slug: 'resources',
    label: '数据与软件资源',
    shortLabel: '资源更新',
    description: 'GWAS/QTL 数据库、summary statistics、API、软件版本与可复现基础设施。',
    accent: 'rose',
  },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];

export const topicBySlug = Object.fromEntries(
  topics.map((topic) => [topic.slug, topic]),
) as Record<string, (typeof topics)[number]>;

export const topicLabel = (slug: string) => topicBySlug[slug]?.shortLabel ?? slug;

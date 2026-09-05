export const topics = [
  {slug:'statistical-genetics',label:'遗传架构与统计模型',shortLabel:'遗传架构',description:'遗传力、混合模型、选择与复杂性状的效应分布。'},
  {slug:'QTL',label:'GWAS 与分子 QTL',shortLabel:'GWAS / QTL',description:'eQTL、sQTL、pQTL，以及细胞类型和状态依赖的遗传效应。'},
  {slug:'fine-mapping',label:'Fine-mapping 与共定位',shortLabel:'Fine-mapping',description:'因果变异、可信集合、多个关联信号与功能先验。'},
  {slug:'single-cell',label:'单细胞与空间遗传学',shortLabel:'单细胞 / 空间',description:'性状相关细胞、空间遗传信号与单细胞统计方法。'},
  {slug:'functional-annotation',label:'调控机制与靶基因',shortLabel:'调控与靶基因',description:'增强子–基因连接、变异功能预测与多组学证据整合。'},
  {slug:'polygenic-prediction',label:'多基因预测',shortLabel:'PRS',description:'多基因评分、模型更新、跨队列与跨祖源预测。'},
  {slug:'resources',label:'遗传与组学数据资源',shortLabel:'数据资源',description:'新队列、参考面板、QTL 图谱与实际数据发布。'},
  {slug:'algorithm-acceleration',label:'算法加速',shortLabel:'算法加速',description:'大规模遗传与单细胞分析的稀疏计算、GPU 和并行推断。'},
  {slug:'statistical-methods',label:'统计推断与方法',shortLabel:'统计方法',description:'关联检验、贝叶斯建模、多重检验与可扩展推断。'},
  {slug:'foundation-models',label:'基因组与细胞基础模型',shortLabel:'基础模型',description:'与变异效应、调控机制或遗传学问题直接相关的模型。'},
  {slug:'perturbation',label:'细胞扰动与功能验证',shortLabel:'扰动与验证',description:'基因扰动、CRISPR 实验与细胞状态变化。'},
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
export const topicBySlug = Object.fromEntries(topics.map(t => [t.slug,t])) as Record<string,(typeof topics)[number]>;
export const topicLabel = (slug: string) => topicBySlug[slug]?.shortLabel ?? slug;

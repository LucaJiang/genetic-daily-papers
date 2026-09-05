export const topics=[
{slug:'statistical-genetics',label:'统计遗传学',shortLabel:'统计遗传学',description:'遗传架构、遗传力与复杂性状。'},
{slug:'QTL',label:'GWAS 与分子 QTL',shortLabel:'GWAS / QTL',description:'eQTL、sQTL、pQTL 与疾病关联整合。'},
{slug:'fine-mapping',label:'精细定位与共定位',shortLabel:'Fine-mapping',description:'多因果信号、可信集合、共定位和功能先验。'},
{slug:'single-cell',label:'单细胞与空间遗传学',shortLabel:'单细胞 / 空间',description:'细胞类型、连续状态与性状相关的细胞背景。'},
{slug:'functional-annotation',label:'功能注释与调控变异',shortLabel:'功能注释',description:'调控序列、染色质互作和候选靶基因。'},
{slug:'statistical-methods',label:'统计方法',shortLabel:'统计方法',description:'混合模型、贝叶斯推断、检验与模型评估。'},
{slug:'polygenic-prediction',label:'多基因预测',shortLabel:'PRS',description:'PRS、非加性效应与跨队列预测。'},
{slug:'algorithm-acceleration',label:'算法加速',shortLabel:'算法加速',description:'稀疏计算、数值优化、GPU 和并行算法。'},
{slug:'resources',label:'数据资源',shortLabel:'数据资源',description:'新增队列、组织、祖源和分子表型数据。'},
{slug:'foundation-models',label:'基础模型',shortLabel:'基础模型',description:'与遗传调控和细胞表型相关的序列与细胞模型。'},
{slug:'perturbation',label:'扰动与细胞状态',shortLabel:'扰动',description:'扰动效应、表达变化与细胞状态。'}] as const;
export const topicLabel=(slug:string)=>topics.find(t=>t.slug===slug)?.shortLabel??slug;

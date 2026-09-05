export const qtlGroups = [
  { id: 'directories', title: '综合数据库与联盟', shortTitle: '综合目录', note: '跨研究查找数据、汇总统计与版本记录。目录的累计样本量不等于独立 donor 总数。' },
  { id: 'sc-immune', title: '单细胞 · 血液与免疫', shortTitle: '单细胞｜血液与免疫', note: 'PBMC、分选免疫细胞、刺激响应及免疫 multiome；覆盖表达、剪接与染色质可及性 QTL。' },
  { id: 'sc-brain', title: '单核 · 脑组织', shortTitle: '单核｜脑组织', note: '脑细胞类型、亚型与疾病状态相关 QTL。整合研究与其来源队列需核对 donor 重叠。' },
  { id: 'sc-tissue', title: '单细胞 / 单核 · 其他组织', shortTitle: '单细胞｜其他组织', note: '肺、脂肪等组织的群体单细胞遗传调控队列。图谱总规模与进入 QTL 分析的样本量分开记录。' },
  { id: 'cell-models', title: '细胞模型 · 细胞系与分化', shortTitle: '细胞模型｜iPSC / LCL', note: '体外细胞系、iPSC 和分化轨迹；具体条目标明单细胞或 bulk 测量。' },
  { id: 'bulk-blood', title: 'Bulk · 全血与 PBMC', shortTitle: 'Bulk｜全血与 PBMC', note: '血液群体表达与大样本 meta-analysis，包括 RNA-seq 和表达芯片。' },
  { id: 'bulk-immune', title: 'Bulk · 分选免疫细胞', shortTitle: 'Bulk｜分选免疫细胞', note: '纯化细胞群的测量与刺激实验；分选 bulk 不等同于单细胞测序。' },
  { id: 'bulk-brain', title: 'Bulk · 脑组织', shortTitle: 'Bulk｜脑组织', note: '脑组织表达及调控 QTL，可结合单核数据研究细胞组成与调控机制。' },
  { id: 'bulk-tissue', title: 'Bulk · 多组织与器官', shortTitle: 'Bulk｜多组织与器官', note: '多组织、胰岛、肾脏等组织特异 QTL；同一 donor 的多个组织不是独立个体。' },
];

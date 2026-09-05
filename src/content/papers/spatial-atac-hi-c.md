---
published: true
title: "Spatial chromatin architecture and accessibility co-profiling of mammalian tissues"
shortTitle: "Spatial-ATAC-Hi-C：同一组织位置联合测量开放染色质与三维基因组"
authors: "Ping Wang, Juan Wang, Qixuan Wang, Mark W. Youngblood, Yang Cheng, Bo Tao, Josiah Hiu-Yuen Wong, Yu Luan, Feng Yue et al."
date: 2026-09-01
source: "Nature Methods"
doi: "10.1038/s41592-026-03217-4"
paperUrl: "https://www.nature.com/articles/s41592-026-03217-4"
codeUrl: "https://github.com/wangjuan001/Spatial-ATAC-Hi-C"
priority: "must-read"
summary: "Spatial-ATAC-Hi-C 通过组织切片内限制性酶切、原位连接、Tn5 tagmentation 和二维微流控条形码，在同一 50 × 50 μm 像素中联合获得 ATAC fragments 与 Hi-C contacts。"
whyItMatters: "它把染色质可及性、三维互作和组织位置放到同一实验单位中，为解释疾病变异所处的开放元件及其潜在靶基因提供了新的测量层。"
keyResults:
  - "每个像素的 Hi-C contacts 中位数约 25,343–58,403，ATAC fragments 中位数约 34,596–90,465；每个像素平均约 3–21 个细胞。"
  - "与独立 bulk assays 比较，ATAC 信号相关性较高；6,492 个 chromatin loops（62%）与 in situ Hi-C 共享。"
  - "在胶质瘤样本中，方法解析了空间 CNV、SV 和克隆异质性，但当前分辨率仍非单细胞。"
topics:
  - single-cell
  - functional-annotation
  - statistical-methods
peerReviewed: true
figures:
  - url: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-026-03217-4/MediaObjects/41592_2026_3217_Fig1_HTML.png"
    alt: "Spatial-ATAC-Hi-C experimental workflow and technical validation of chromatin contacts and accessibility"
    label: "Figure 1 · 实验流程与技术验证"
    caption: "上半部分依次为固定、通透、DpnII/HinfI 酶切、原位连接、Tn5 tagmentation 和二维空间条形码；下半部分比较空间 Hi-C、常规 Hi-C 与 ATAC 信号。"
    credit: "Wang et al., Nature Methods (2026)"
    sourceUrl: "https://www.nature.com/articles/s41592-026-03217-4/figures/1"
    license: "CC BY-NC-ND 4.0，原图未修改"
  - url: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-026-03217-4/MediaObjects/41592_2026_3217_Fig2_HTML.png"
    alt: "Mouse brain spatial clusters derived from Hi-C and ATAC modalities compared with anatomical reference maps"
    label: "Figure 2 · 小鼠脑空间结构"
    caption: "Hi-C 的 gene-associating domain score 与 ATAC 的 gene activity score 分别聚类，二者都恢复主要脑区；下方 marker maps 用于判断聚类是否具有已知细胞类型含义。"
    credit: "Wang et al., Nature Methods (2026)"
    sourceUrl: "https://www.nature.com/articles/s41592-026-03217-4/figures/2"
    license: "CC BY-NC-ND 4.0，原图未修改"
---

## 研究问题

空间 ATAC-seq 可以定位开放染色质，却通常不能直接说明该调控元件与哪个启动子发生物理互作；空间 Hi-C 可以测量三维接触，却缺少同一位置的可及性信息。分别测量后再整合会受到切片差异、配准误差和细胞组成差异影响。

Spatial-ATAC-Hi-C 的目标是在同一组织位置同时读取两种信号，使每个空间像素都具有 ATAC fragments 和 Hi-C contact matrix。

## 实验流程

Figure 1a 给出核心步骤：

1. 冷冻组织切片固定并通透；
2. 使用 DpnII 和 HinfI 在细胞核内消化染色质；
3. 对空间接近的 DNA 末端进行原位连接，形成 Hi-C junction；
4. Tn5 对开放染色质进行 tagmentation；
5. 两组相互垂直的微流控通道依次加入 A、B 条形码；
6. 条形码交叉点定义空间像素，之后富集连接产物并建库测序。

50 条 A 通道与 50 条 B 通道形成 2,500 个像素，每个像素约 $50\times50\ \mu\mathrm{m}$，覆盖约 $5\times5\ \mathrm{mm}$ 的组织区域。

这里的实验单位是空间像素，而不是单细胞。不同样本中每个像素平均约 3–21 个细胞，因此信号仍包含局部细胞混合。

## 两种模态如何分析

ATAC 模态可构造 gene activity score，概括启动子和基因体附近开放片段。Hi-C 模态则使用 gene-associating domain score，概括基因体周围的接触强度。作者分别对两类 score 降维和聚类，再比较空间位置、组织学区域和已知 marker。

这不是一个严格的生成式联合模型：主要分析仍是分别从两种模态提取特征，再检查其空间一致性与互补信息。因而两种模态的 concordance 是结果之一，而不是由模型强制产生。

## 技术验证

每个像素获得的 total Hi-C contacts 中位数约为 25,343–58,403；ATAC fragments 中位数约为 34,596–90,465。88.1%–90.3% 的 contacts 位于同一染色体，24%–33.3% 为大于 10 kb 的长程互作。

与相邻组织的 bulk ATAC-seq 比较时，作者报告较高的信号相关性。Hi-C contact map 也与 in situ Hi-C 和不加空间条形码的对照实验一致。loop 层面共有 6,492 个 loops（62%）在 Spatial-ATAC-Hi-C 与 in situ Hi-C 间共享；方法特异 loops 中有更高比例锚点重叠开放染色质。

这些结果说明测量保留了两类预期信号，但 loop overlap 不应被理解为 38% 都是假阳性：不同测序深度、组织切片和 loop caller threshold 都会改变集合重叠。

## 小鼠脑空间结构
Figure 2a 与 2b 分别展示基于 Hi-C 和 ATAC 的聚类。重点不是两个 UMAP 是否完全相同，而是：

- 空间 cluster 是否与已知解剖区域相符；
- 两种模态在主要边界上是否一致；
- 差异区域能否由模态特异 marker 或 loop 解释。

Figure 2e 把单细胞 ATAC reference 与空间数据放在一起，用于注释兴奋性神经元、抑制性神经元和非神经元群。该步骤依赖 reference label 和 feature alignment，不能作为完全独立的验证。

## 肿瘤应用

在 glioblastoma 和 astrocytoma 样本中，作者从 Hi-C contact patterns 推断 CNV 和 SV，并与相邻切片 WGS 比较。空间像素级 CNV profile 可进一步聚类，显示同一肿瘤切片中不同克隆区域。论文还展示了 chr7 gain、chr10 loss、局部扩增和候选基因融合等已知胶质瘤事件。

这里的优势是把结构变异与局部染色质可及性放在空间背景中观察；局限是像素内多个细胞会把小克隆信号平均掉，CNV 推断分辨率也低于直接 WGS。

## 对统计遗传学的价值

Spatial-ATAC-Hi-C 本身没有人群基因型，不能直接做 QTL mapping。它更适合作为 GWAS / fine-mapping 的功能注释层：

1. 将 credible set variants 与组织和细胞群相关的 ATAC peaks 相交；
2. 使用同一空间区域的 chromatin contacts 提名潜在靶基因；
3. 检查候选 enhancer–gene link 是否在疾病相关组织区域增强；
4. 再与 eQTL、sQTL 或 perturbation 证据联合。

需要避免把“变异位于开放 peak 且 peak 与基因接触”直接写成因果链。开放、接触和表达调控仍是三层不同证据。

## 局限

- $50\times50\ \mu\mathrm{m}$ 像素通常包含多个细胞，不是单细胞分辨率；
- 目前捕获面积约 $5\times5\ \mathrm{mm}$；
- 尚未针对 FFPE 样本优化；
- Hi-C matrix 在单像素上仍稀疏，loop 与 SV 分析常需跨像素聚合；
- 组织切片间验证受到配准和局部组成差异影响；
- 实验流程复杂，批次效应和文库质量控制需要在多中心数据中进一步评估。

## 小结

这项技术把“开放元件在哪里”和“它可能接触哪个基因”放进同一空间测量中。对遗传学研究最实际的用途，是提高候选变异到候选靶基因的组织背景分辨率，而不是替代 QTL 或 fine-mapping。

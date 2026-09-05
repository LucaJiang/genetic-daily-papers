---
title: "A pre-train and fine-tune framework for adaptive boosting of pre-trained polygenic risk scores"
shortTitle: "AB-PRS：在已有多基因评分上学习遗漏的遗传信号"
authors: "Jie Hu, Raelynn Chen, Maxwell Salvatore et al."
date: 2026-08-29
source: "Nature Communications"
doi: "10.1038/s41467-026-77128-5"
paperUrl: "https://www.nature.com/articles/s41467-026-77128-5"
codeUrl: "https://github.com/Cedars-CIG/ABPRS"
priority: worth-reading
readingType: 本周新作
summary: "AB-PRS 在已有 PRS 条件下学习 SNP 编码，再用变量筛选与 boosting 补充遗漏的加性或非加性信号。它需要个体水平训练数据，外部队列实验也包含目标队列微调。"
whyItMatters: "与非加性遗传效应、多基因预测和高维变量选择直接相关；需要分清新增预测信息与新增因果发现。"
keyResults:
  - "真实数据涵盖 UK Biobank、All of Us、eMERGE 和 PMBB；外部评估使用 20% 目标队列数据微调。"
  - "收益依赖基础 PRS；AD 的较大改善部分来自补回被基础评分排除的 APOE 信号。"
topics: [polygenic-prediction, statistical-genetics, statistical-methods]
peerReviewed: true
inlineFigures: true
figures:
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-026-77128-5/MediaObjects/41467_2026_77128_Fig3_HTML.png"
    alt: "AB-PRS 与已有 PRS 在 UK Biobank、All of Us、eMERGE 和 PMBB 的疾病 AUC 与定量性状 R 平方比较"
    kind: real-data
    label: "Figure 3 · 四个队列中的实际预测表现"
    caption: "a 为 UK Biobank，b–d 分别为 All of Us、eMERGE、PMBB。每组上排是疾病 AUC，下排是定量性状 R²；粉色为原 PRS，绿色为 AB-PRS。外部队列含 20% 本地微调，不能当作冻结模型的零样本迁移。图注说明置信区间来自五次拆分/评估，比较的 P 值未做多重校正；并非所有差异都显著。"
    credit: "Hu et al., Nature Communications (2026)；原图未修改"
    sourceUrl: "https://www.nature.com/articles/s41467-026-77128-5_reference.pdf#page=6"
    license: "CC BY-NC-ND 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-026-77128-5/MediaObjects/41467_2026_77128_Fig7_HTML.png"
    alt: "四个队列中高低风险分组的比值比及极端定量表型的识别表现"
    kind: real-data
    label: "Figure 7 · 风险分层改善不等于风险概率已经校准"
    caption: "a 比较风险评分最高和最低 10% 人群的比值比；b 用 top recovery rate 评价极端定量表型的识别。两类指标支持排序或分层表现的比较，但均不直接检验预测概率与实际发生率的一致性。不同性状、性别和队列的增益并不统一。"
    credit: "Hu et al., Nature Communications (2026)；原图未修改"
    sourceUrl: "https://www.nature.com/articles/s41467-026-77128-5_reference.pdf#page=10"
    license: "CC BY-NC-ND 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
---

## 研究问题：已有 PRS 之外还剩下什么

一个已训练的 PRS 可能遗漏信号，原因既可能是非加性剂量关系，也可能只是源 GWAS 样本量不足、位点过滤、权重收缩或目标队列差异。AB-PRS 不重新从零训练整个评分，而是以现有 PRS 为基础，在有基因型和表型的个体数据中寻找额外预测信息。[1]

“额外”不等于“非加性”。这一点对于解释本文与罕见变异非加性检验的关系尤其重要。

## 方法：条件编码、变量选择与组合预测

对 SNP $j$，作者在包含原 PRS 的回归中加入杂合与另一纯合基因型的指示变量。以带截距的统一记号表示：

$$
g\{E(Y_i)\}=b_0+b_P\,PRS_i+
\theta_{j1}I(G_{ij}=1)+\theta_{j2}I(G_{ij}=2).
$$

根据表型选择线性或 logistic 模型，再将该 SNP 编为

$$
\theta SNP_j=(0,\widehat\theta_{j1},\widehat\theta_{j2}).
$$

这个编码描述在原 PRS 条件下仍有的关联模式。这里的“正交信号”应按条件回归来理解，不应额外推断所有变换后的基因型在样本中都严格两两正交，或已经排除了 LD 所引起的冗余。

随后，LASSO 在训练数据中筛选候选编码；验证数据上的 mirror statistics 用于过滤不稳定候选，最后通过 boosting 与原 PRS 组合。作者还采用自适应验证方案调整筛选参数。FDR 控制针对的是这一变量选择问题，不是“最终选中的 SNP 有固定比例是真正因果变异”。其适用性依赖原文的分样、模型与统计假设，不能只从用了 mirror statistics 就推断任意数据下都有效。[1]

## 实证结果：外部评估包含本地微调

[figure:1]

论文研究四个疾病和四个定量性状，比较来自 PGS Catalog、疾病联盟和 FinnGen 的基础评分。图 3 可以看到：有些基础评分明显受益，有些改进很小或不显著。因而结论应是**可以更新某些已有评分**，而不是已证明普遍优于充分训练的现代 PRS。[1]

更重要的是图注中的训练安排：外部队列每次使用 20% 数据微调，随后评价测试部分。因此它检验的是“原模型加目标队列数据”的适配能力，不是无需目标表型的跨队列迁移。五次评估的测试集合也可能重叠，误差线不能当作五个完全独立人群实验。

作者讨论部分还指出，AD 的基础评分排除了 APOE 区域，以便检验能否补回已知强信号。这解释了部分较大增益，也限制了外推：不能把这一正对照的改善都归因于发现了新的非加性生物学。

## 风险分层与概率校准要分开

[figure:2]

最高、最低风险组的比值比，衡量高分人群与低分人群的风险分离。Top recovery rate 衡量能否找回观测表型处于极端的人群。这两类指标主要涉及排序与分层。

真正的概率校准还需要比较预测风险与实际发生率，例如校准截距、斜率或校准曲线。模型可以提高 AUC，却仍系统性高估绝对风险。因此，图 7 不能单独支持“可直接用于临床绝对风险预测”的结论。

## 与非加性检验和 PRS 方法开发的关系

非加性关联检验通常问基因型剂量关系是否偏离加性；AB-PRS 问已有评分之外的剩余信号能否改善预测。一个遗漏的纯加性位点也可能被 AB-PRS 选中，两者并不矛盾。

较有意义的进一步比较，是给各方法相同的目标队列训练预算，分别评价：仅重新校准原 PRS、只补充加性位点、只补充非加性项，以及完整 AB-PRS。这样才能拆开“使用更多本地数据”的收益和“编码或筛选方式”的收益。最终测试集必须不参与编码学习、正则参数选择与模型挑选。

若将该框架扩展到跨祖源问题，还要处理效应异质性、LD 与频率差异。本文没有完成跨祖源微调验证，不能把在多个美国队列评估理解为已经证明跨祖源可迁移。[1]

## 局限与可借鉴点

算法需要目标训练数据的个体基因型和表型，不能只靠一个 summary-statistic 文件或现成 PRS 权重运行。稀有纯合基因型也会使类别效应估计不稳定。较弱的基础模型通常留出更大改进空间，所以应同时报告基础表现、绝对增益与训练样本量，而不只报告相对百分比。

可借鉴的是“在现有强模型条件下学习剩余信息”的研究设计，以及将筛选稳定性纳入模型更新。更需要核实的是每一步用到了哪些样本、选择的错误率控制目标是什么，以及增益能否在公平预算下复现。

## 参考文献

[1] Hu et al. [A pre-train and fine-tune framework for adaptive boosting of pre-trained polygenic risk scores](https://www.nature.com/articles/s41467-026-77128-5). Nature Communications, 2026-08-29。

[2] [Article in Press 全文](https://www.nature.com/articles/s41467-026-77128-5_reference.pdf). Fig. 3、Fig. 7、Discussion 与 Methods；外部 20% 微调安排见 Fig. 3 图注，APOE 正对照与跨祖源限制见 Discussion。

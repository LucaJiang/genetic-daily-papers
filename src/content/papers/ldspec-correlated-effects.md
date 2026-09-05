---
title: "Correlations between causal effect sizes of proximal SNPs vary with functional annotations and implicate stabilizing selection"
shortTitle: "LDSPEC：邻近 SNP 的因果效应可能并不独立"
authors: "Martin Jinye Zhang, Arun Durvasula, Colby Chiang et al."
date: 2026-08-13
source: "Nature Genetics"
doi: "10.1038/s41588-026-02712-w"
paperUrl: "https://www.nature.com/articles/s41588-026-02712-w"
codeUrl: "https://github.com/martinjzhang/ldspec-clean"
priority: must-read
readingType: 方法补读
summary: "LDSPEC 将 SNP 对的效应协方差纳入 LD score 回归，估计邻近变异的因果效应相关性。结果涉及遗传力分解，也提示功能 fine-mapping 与 PRS 中独立效应先验的适用边界。"
whyItMatters: "与 GREML、LDSC、遗传架构和功能先验直接相连；重点是加性模型内部的效应相关，而非基因型互作。"
keyResults:
  - "分析 70 个 UK Biobank 性状；低频、正 LD、相距 0–100 bp 的 SNP 对效应相关估计为 −0.37（标准误 0.09）。"
  - "29 个相对独立性状用于主要汇总，避免把高度相关表型当成独立重复。"
topics: [statistical-genetics, statistical-methods, fine-mapping, functional-annotation]
peerReviewed: true
inlineFigures: true
figures:
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02712-w/MediaObjects/41588_2026_2712_Fig2_HTML.png"
    alt: "29 个性状中按 LD 方向、等位基因频率、距离和基因功能关系分组的 SNP 对效应相关估计"
    kind: real-data
    label: "Figure 2 · 正 LD 的近邻变异常呈负向效应相关"
    caption: "上、下效应图分别分析正 LD 和负 LD 的 SNP 对；橙色为低频、蓝色为常见变异，误差线为 95% 置信区间。最底部给出各注释的实际距离分布。相同基因或启动子注释包含的距离并不相同，不能只凭柱高比较其生物学特异性。"
    credit: "Zhang et al., Nature Genetics (2026)；期刊原图，未修改"
    sourceUrl: "https://www.nature.com/articles/s41588-026-02712-w/figures/2"
    license: "版权归原作者与出版方"
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02712-w/MediaObjects/41588_2026_2712_Fig6_HTML.png"
    alt: "70 个疾病和性状中 SNP 遗传力与因果效应方差之和 SCV 的比较"
    kind: real-data
    label: "Figure 6 · 效应方差之和不等于 SNP 遗传力"
    caption: "每个点是一个性状。横轴为因果效应方差之和 SCV，纵轴为包含 LD 与效应协方差交叉项的 SNP 遗传力。大量点位于等值线下方，说明相关项可以降低总遗传方差。这不是同一个参数被两个方法分别高估或低估的简单比较。"
    credit: "Zhang et al., Nature Genetics (2026)；期刊原图，未修改"
    sourceUrl: "https://www.nature.com/articles/s41588-026-02712-w/figures/6"
    license: "版权归原作者与出版方"
---

## 研究问题：LD 相关不等于效应相关

附近 SNP 的基因型常存在 LD，这是关联分析需要处理的已知结构。LDSPEC 问的是另一个问题：**在考虑 LD 之后，这些 SNP 对性状的真实效应，在随机效应模型中是否仍有系统性的相关性？** 直接计算 GWAS 边际效应估计之间的相关，不能回答这个问题，因为同一因果信号本身就会通过 LD 传播。[1]

这一问题与遗传架构、负向选择和功能注释有关，尤其接近 GREML、LDSC 等方差分解方法的研究主线。

## 模型：保留加性形式，放宽独立先验

以标准化基因型矩阵 $X$ 表示加性模型：

$$
\mathbf y=X\boldsymbol\beta+\boldsymbol\varepsilon,
\qquad \operatorname{Cov}(\boldsymbol\beta)=\Sigma.
$$

常见独立随机效应模型把 $\Sigma$ 设为对角矩阵。LDSPEC 允许其中一部分非对角项不为零，用 SNP 对的距离、LD 方向、频率及功能注释描述这些协方差。**模型没有加入 $G_jG_k$ 这样的基因型交互项，因此效应相关不等于 epistasis。**

令 $r_{jk}$ 为有符号 LD，用统一记号可将关联统计量的期望概括为

$$
\begin{aligned}
E[z_j^2\mid X]\approx c_j
&+N\sum_k r_{jk}^2\operatorname{Var}(\beta_k)\\
&+2N\sum_{k<l}r_{jk}r_{jl}\operatorname{Cov}(\beta_k,\beta_l).
\end{aligned}
$$

第一行包含通常的 LD score 项；第二行包含 SNP 对的方向性 LD score。$c_j$ 表示残差及截距部分，不能在所有设置中机械固定为 1：原文区分样本内 LD 与参考 LD 的期望关系，并允许调整残余混杂。[1]

LDSPEC 对这些注释项做多元回归，以基因组 block jackknife 估计标准误。因果效应统一按**衍生等位基因**定向，因此正 LD 与负 LD 的比较具有明确方向；任意翻转部分效应等位基因会破坏这种解释。

## 实证结果：近邻变异与功能关系

[figure:1]

论文分析 70 个 UK Biobank 性状，主要跨性状汇总使用其中 29 个相对独立性状。图 2 中，低频、正 LD、相距 0–100 bp 的 SNP 对呈较强负相关；距离增大后总体减弱。具有相同功能关系的 SNP 对也可能在较长距离上保留相关性。[1]

这里的柱子是某一组 SNP 对的汇总效应相关，不是声称组内每一对 SNP 都有相反效应。宽置信区间还提示：低频组的估计精度有限，不能仅按点估计给注释排序。

作者使用 BioBank Japan 的独立性状与参考 LD 进行对照，并通过稳定化选择的前向模拟探索机制。模拟能说明某种选择模型可产生相似模式，不能唯一确定真实人群经历的选择过程。功能注释相关、LD 参考误差和替代演化机制仍需考虑。

## 遗传力为什么小于效应方差之和

[figure:2]

在标准化基因型下，令 $R$ 为 LD 矩阵，随机效应模型中的预期遗传方差为

$$
h^2=\operatorname{tr}(R\Sigma)
=\sum_k\Sigma_{kk}+2\sum_{k<l}r_{kl}\Sigma_{kl}.
$$

而因果效应方差之和为 $\mathrm{SCV}=\sum_k\Sigma_{kk}$。当正 LD 与负效应协方差共同出现，交叉项可以为负，从而使 $h^2<\mathrm{SCV}$。这是一条由模型得到的解释，不需要引入非加性基因型作用。

因此，图 6 不应被简化成“原来的遗传力估计都错了”。它指出：一旦放宽效应独立假设，SCV 与 SNP 遗传力不再是同一个量。比较不同方法时，应先确认它们估计的参数定义一致。

## 与 fine-mapping 和 PRS 的联系

常用精细定位和 PRS 模型通过 LD 描述基因型相关，同时对效应大小采用不同形式的独立或条件独立先验。LDSPEC 提供的结果，使“是否应允许某类邻近效应相关”成为值得检验的问题。但它输出的是注释层面的汇总参数，**并不直接输出新的 PIP 或可信集合**。[1]

一种可研究的扩展，是在保留多因果信号结构的同时，对具有共同调控功能的候选变异引入效应协方差。难点包括协方差矩阵的正定性、与 LD 本身的区分、注释参数的独立训练，以及后验校准。将负相关参数直接塞入一个现有先验，不足以保证推断正确。

计算上，方向性 LD score 涉及 SNP 对。需要利用局部窗口、稀疏注释和跨性状复用，而不是显式构造全基因组所有变异对的稠密矩阵。本文的计算对象也解释了为什么它与一般单 SNP 的 S-LDSC 实现并不完全相同。

## 局限

原文在非零效应相关模拟中观察到向零衰减，因而不能把所有点估计都视为无偏真值。多个 SNP 对注释的重叠会带来共线性；低频变异对参考 LD 的要求更高；祖先等位基因推断错误也可能改变方向解释。

最有价值的结论是独立效应假设值得接受实证检验，而不是用一个新的相关结构替换掉所有现有模型。进一步方法开发应以独立队列的预测表现、PIP 校准或可信集合覆盖率为评价标准。

## 参考文献

[1] Zhang et al. [Correlations between causal effect sizes of proximal SNPs vary with functional annotations and implicate stabilizing selection](https://www.nature.com/articles/s41588-026-02712-w). Nature Genetics, 2026. 正文版本与图 2、图 6。

[2] [作者接受稿全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC13479724/). 用于核对 Methods、方向性 LD score、样本内 LD 与参考 LD 的区别及模拟局限；与 2023 年预印本区分。

---
title: "GLORB: Robust Bayesian inference for differential expression under global expression shifts"
shortTitle: "GLORB：全局表达偏移下的稳健 Bayesian 差异表达"
authors: "R. L. Callahan, S. D. Coleman, T. T. M. Ngo"
date: 2026-09-03
source: "bioRxiv"
version: "v1"
doi: "10.64898/2026.08.28.747928"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.08.28.747928v1"
priority: "must-read"
summary: "GLORB 将 library-size uncertainty 与基因特异性差异表达放进 Bayesian GLM，在多数基因同向变化或总 RNA 含量改变时，试图避免常规相对归一化把全局生物学变化吸收到 size factor 中。"
whyItMatters: "它直面 RNA-seq 差异分析最容易被忽略的可识别性问题：仅凭相对计数，技术测序深度、总 RNA 量与全局表达偏移并不能自动区分；方法优劣取决于作者如何补充锚点、先验或结构假设。"
topics:
  - statistical-methods
  - single-cell
peerReviewed: false
---

## 编辑结论

这篇论文值得优先阅读，不是因为它又提出一种差异表达检验，而是因为它挑战了一个常被默认接受的工作假设：**大多数基因不发生差异表达，或者上调与下调大致平衡**。DESeq2 的 median-of-ratios 与 edgeR 的 TMM 都依赖某种形式的“多数基因可作为相对尺度锚点”。一旦大多数基因同向变化，或者处理导致每个细胞的总 RNA 含量整体改变，归一化因子可能同时吸收技术深度与真实的全局生物学变化。

作者将方法命名为 GLORB（Global-shift Robust Bayesian model），并报告两个 Bayesian 模型用于在全局上调场景下估计 generalized linear model 系数。根据目前公开的 v1 摘要，GLORB 在少数基因差异表达时与 DESeq2/TMM 的 library-size 处理一致，而在多数基偠同向变化时失真更小；由于不依赖逐基偠 geometric mean，它也被设计为适用于更稀疏的数据。

> **重要限定**：本文页面中关于完整 likelihood、先验层级和 posterior computation 的数学表达，是根据作者公开摘要所作的统计建模抽象，用来说明应当检查什么；不能替代论文中作者给出的精确定义。

## 1. 研究问题与 estimand

设 $Y_{gj}$ 表示基因 $g$ 在样本 $j$ 中的计数。常规 RNA-seq GLM 可抽象为

$$
Y_{gj} \sim \operatorname{NB}(\mu_{gj},\phi_g),
\qquad
\log \mu_{gj}=\log s_j+x_j^\top\beta_g,
$$

其中 $s_j$ 是样本尺度或有效 library size，$x_j$ 是实验设计矩阵，$\beta_g$ 是基因特异性效应。通常关注某个 contrast

$$
H_0:c^\top\beta_g=0.
$$

困难在于，观测计数只提供**相对丰度信息**。若处理使所有转录本近似乘上共同因子 $a_j$，则

$$
\mu_{gj}=s_j\,a_j\,q_{gj}
$$

中的技术尺度 $s_j$ 与生物学全局尺度 $a_j$ 在没有外部信息时只通过乘积出现。换言之，只看 count matrix，$s_j$ 与 $a_j$ 通常并不完全可识别。

因此，GLORB 真正需要解决的并不只是“换一个 normalization formula”，而是：

1. 用什么结构假设把技术 library size variation 与全局生物学 shift 分开；
2. 如何在这种分解下定义基因特异性 differential expression；
3. posterior uncertainty 是否把 size-factor uncertainty 传播到 $\beta_g$；
4. 最终的多重检验或 posterior decision rule 是否得到校准。

## 2. 模型与推断框架：应如何理解 GLORB

从公开描述看，GLORB 的核心应当可以理解为对尺度项做显式概率建模，而不是先估计一个固定 normalization factor，再把它当作无误差 offset。概念上，可写成

$$
\log \mu_{gj}
=
\ell_j + \alpha_j + x_j^\top\beta_g,
$$

其中：

- $\ell_j$ 表示测序深度或样本特异性 library-size component；
- $\alpha_j$ 表示条件相关的 global expression component；
- $\beta_g$ 表示超出全局偏移后的基因特异性 effect。

Bayesian 层级模型的潜在优势是，可以给 $\ell_j$、$\alpha_j$ 和 $\beta_g$ 指定不同的共享结构，并在 posterior 中联合传播不确定性。例如，$\beta_g$ 可以采用 shrinkage prior，以借助跨基因信息稳定小样本估计；全局成分则需要一个可识别约束或 informative prior。这里最关键的问题不是 prior 是否“Bayesian”，而是该 prior 是否实际上承担了归一化锚点的角色。

### 与 DESeq2 / TMM 的关系

作者报告：当仅少数基因差异表达旹，GLORB 对 library-size variation 的处理与 DESeq2 median-of-ratios 和 edgeR TMM 一致。这应被理解为一种**正常工作区间的一致性检查**：在常规归一化假设大致成立时，新模型不应系统改变结果。

更重要的比较区间是：

- 差异基因比例逐步从少数增加到多数；
- 上调与下调由平衡变为明显不平衡；
- 每个样本总 RNA 量发生条件相关变化；
- count matrix 的零比例和 library size heterogeneity 同时增加。

仅在这些条件下仍能保持 effect-size bias、coverage 和错误发现率，才能支持“global-shift robust”的主张。

## 3. 作者报告的证据

根据公开摘要，作者报告了三簻结果：

1. **少数基因变化时的兼容性**：GLORB 的 library-size variance 处理与 median-of-ratios/TMM 一致；
2. **多数基因同向变化时的稳健性**：在大多数基因上调或下调的场景，GLORB 对 differential expression 与线性模型系数的恢复失真更小；
3. **稀疏性适应**：不需要为每个基因计算 geometric mean，因此能处理零值更多的数据。

这些结果方向是合理的，但判断方法是否成熟，还需要在全文中核对：模拟是否直接由 GLORB 的生成模型产生；是否包含模型错设；结果是否按生物样本重复，而不是按基因或细胞数量夸大精度；Bayesian credible interval 的 frequentist coverage 与 posterior FDR 是否校净。

## 4. 统计学评估：最需要追问的四个问题

### 4.1 可识别性来自哪里？

没有 spike-in、绝对分子计数或可靠 housekeeping reference 时，全局表达改变与测序深度并不能从 compositional counts 中无条件分离。因而需要明确：

- 是否对全局 shift 的分布或条件结构给出先验；
- 是否假设一部分基因仍可作为 anchor；
- 是否利用样本级 library-size information、cell size 或其他 covariate；
- posterior 对这些假设是否敏感。

若这个问题没有被清晰回答，所谓“恢复全局变化”可能主要是由先验决定，而不是由数据识别。

### 4.2 估计目标是绝对变化还是相对变化？

差异表达常被含混地写成“基因上调”。实际上可能指：

- 每个样本中的相对 abundance 增加；
- 每个细胞的绝对 transcript count 增加；
- 在控制总 RNA 后的基因特异性变化；
- 超出 global shift 的 residual effect。

这些 estimand 不相同。GLORB 应明确其 $\beta_g$ 对应哪一种变化，以及在何种 reference scale 下解释。

### 4.3 推断单位是否正确？

若应用于单细胞数据，独立重复单位通常是 donor、sample 或 experimental replicate，而不是 cell。把数十万细胞当作独立样本会造成 pseudoreplication。即使 GLORB 能处理稀疏 count，也不代表它自动处理同一 donor 内细胞相关性。

合理应用通常需要：

- donor × cell type pseudobulk；或
- 在模型中加入 donor-level random effect / cluster-robust inference；或
- 在 posterior 层级中显式表示 sample 与 cell 两层变异。

### 4.4 多重检验如何定义？

Bayesian 模型可能基于 posterior probability、local false sign rate 或 posterior expected FDR 决策。需要核对：

- 阈值是按 $P(\beta_g\neq0\mid Y)$、$P(\beta_g>0\mid Y)$，还是 credible interval；
- 是否评估了 frequentist FDR 与 false sign rate；
- global shift prior 对发现数是否有系统影响。

## 5. 对统计遗传学的连接

GLORB 不是 QTL 方法，但其问题与 molecular QTL 分析高度相关。对于 allele-specific expression、stimulus-response eQTL 或 cell-state-specific eQTL，若处理改变总 RNA 含量，表达表型的 normalization 可能改变效应尺度，并进一步影响：

- marginal eQTL $z$-score；
- fine-mapping 的 Bayes factor；
- coloc 中 effect/variance 的可比性；
- 功能注释 enrichment 的方向与强度。

如果 expression phenotype 在样本间的全局尺度被错误吸收，后续 SuSiE 或 colocalization 并不会自动修复上游表型定义问题。因此，这篇论文值得作为“QTL 前处理不是纯工程细节”的案例来读。

## 6. 局限与可能失败的条件

- **先验敏感性**：全局尺度的不可识别部分可能由先验主导；
- **composition change**：bulk RNA-seq 中细胞组成变化可能表现为全局 shift，但这与单个细胞内 total RNA 改变是不同机制；
- **极小样本量**：Bayesian shrinkage 能稳定估计，但不能替代生物重复；
- **mean–variance model 错设**：若零膨胀、异方差或 outlier 结构未建模，posterior calibration 仍可能受损；
- **缺乏绝对尺度验证**：最好用 ERCC/spike-in、smFISH、UMI molecule calibration 或已知 total-RNA perturbation 验证。

## 7. 阅读与复现检查表

精读全文时，建议首先定位以下内容：

1. 两个 GLORB 模型的区别及其可识别约束；
2. library-size prior 与 global-shift prior 的具体形式；
3. posterior computation 是 MCMC、variational inference 还是近似积分；
4. 模拟是否包含 prior misspecification、composition shift 与不同 replicate 数；
5. effect-size bias、interval coverage、FDR 和运行时间是否同时报告；
6. 与 DESeq2、edgeR 之外，是否比较 spike-in aware 或 compositional methods；
7. 软件是否给出可复现的随机种子、默认 prior 与诊断指标。

**综合判断**：问题非常重要，统计切入点也正确；但最终可信度取决于作者是否正面处理全局尺度的可识别性，而不是仅以 Bayesian terminology 替代归一化假设。

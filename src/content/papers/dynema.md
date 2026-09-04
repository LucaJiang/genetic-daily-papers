---
title: "Efficient genome-wide mapping of reproducible, context-dependent eQTLs at single-cell resolution"
shortTitle: "Dynema: context-dependent eQTL mapping at single-cell resolution"
authors: "Jose Alquicira-Hernandez, Elizabeth Dorans, Yoshihiko Tomofuji, Aparna Nathan, Soumya Raychaudhuri"
source: "bioRxiv"
date: 2026-08-29
version: "v1"
priority: "must-read"
topics:
  - single-cell
  - statistical-genetics
  - QTL
  - fine-mapping
summary: "Dynema 在 cell-level count model 中估计 genotype-by-context interaction，并以 donor 为 cluster 构造稳健方差，从而在保留连续 cell-state variation 的同时避免把同一人的细胞当成独立遗传样本。"
why: "它正面处理 sc-eQTL 中最关键的 inferential tension：pseudobulk 会损失 cell-state 变化，而 naïve cell-level regression 又会产生严重 pseudoreplication；Dynema 给出了一条计算上可扩展、推断单位仍然清楚的中间路径。"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1"
doi: "10.64898/2026.08.25.747138"
figure:
  url: "https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1/F1.large.jpg"
  alt: "Figure 1 of the Dynema context-dependent single-cell eQTL paper"
  caption: "Dynema 的分析流程。读图时最重要的是区分 cell-level likelihood 与 donor-level uncertainty：表达观测发生在细胞层面，但基因型只在 donor 层面变化，因此独立遗传信息的数量主要由 donor 而不是 cell 数决定。"
  sourceUrl: "https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1"
  attribution: "原图来自作者的 bioRxiv 预印本；版权与许可见原文。"
---

## 一句话结论

Dynema 的核心不是“用更多细胞增加 eQTL 样本量”，而是利用细胞层面的连续 context 改善效应异质性的刻画，同时把标准误与假设检验仍然锚定在 donor cluster 上。它回答的是 **genotype effect 是否沿 cell state 系统变化**，而不是简单重复一个平均 cis-eQTL scan。

> **编辑判断**：这是近期最值得统计遗传学读者关注的 sc-eQTL 方法之一。真正的亮点是 estimand 和 dependence structure 的匹配；真正需要审慎的是 context 的估计误差、donor 数量以及后续 LD-aware inference。

## 研究问题：平均效应之外的动态遗传调控

常规 pseudobulk eQTL 在 donor × cell type 层面聚合表达，目标通常是一个 cell type 内的平均 genotype effect。它有两个优点：独立样本单位清楚，且可直接接入成熟的 linear-model / fine-mapping 工具。但聚合会压缩同一 cell type 内沿 activation、differentiation、disease severity 或其他连续状态变化的遗传效应。

Dynema 关注的目标可写为一个 interaction estimand：

$$
\beta_{GC,g}=\frac{\partial^2\log \mu_{ijg}}
{\partial G_i\,\partial C_{ij}},
$$

其中 \(i\) 表示 donor，\(j\) 表示 donor 内的 cell，\(g\) 表示 gene，\(G_i\) 是基因型，\(C_{ij}\) 是连续细胞状态。若 \(eta_{GC,g}\neq 0\)，则同一 variant 对基因表达的影响随 context 改变。

这个 estimand 与“不同离散 cell type 分别做 eQTL 后比较显著性”不同。后者把连续异质性离散化，并容易把 power difference 误判为 effect heterogeneity；interaction model 则直接检验效应斜率是否随 context 变化。

## 一个有用的模型化表示

论文的方法可以用下列 cell-level Poisson log-linear model 来理解：

$$
Y_{ijg}\sim\operatorname{Poisson}(\mu_{ijg}),
$$

$$
\log \mu_{ijg}
=\log s_{ij}
+\alpha_g
+\beta_{G,g}G_i
+\beta_{C,g}C_{ij}
+\beta_{GC,g}G_iC_{ij}
+\mathbf{x}_i^{\mathsf T}\boldsymbol\gamma_g
+\mathbf{z}_{ij}^{\mathsf T}\boldsymbol\eta_g.
$$

这里 \(s_{ij}\) 是 library-size offset；
\(\mathbf{x}_i\) 是 donor-level covariates，例如 ancestry PCs、batch 或临床变量；
\(\mathbf{z}_{ij}\) 是 cell-level nuisance covariates。主要检验对象是

$$
H_0:\beta_{GC,g}=0.
$$

需要强调：上式是理解方法结构的简化表达。实际实现中的 covariate construction、context parameterization 和快速算法应以论文与代码为准。

## 为什么不能把所有 cells 当独立样本

同一 donor 内所有细胞共享基因型、环境背景和大量未观测因素，因此

$$
\operatorname{Cov}(Y_{ijg},Y_{ikg}\mid G_i)\neq 0.
$$

若直接使用 ordinary model-based variance，把 \(n_{\text{cell}}\) 个细胞当作独立观测，标准误通常会随细胞数不合理地缩小，产生 pseudoreplication。极端情况下，一个只有几十个 donor、但每个 donor 有数万细胞的数据集会看起来像拥有数百万遗传样本。

Dynema 使用 donor-clustered robust variance estimator。其 sandwich 形式可概括为

$$
\widehat{\operatorname{Var}}(\widehat{\boldsymbol\beta})
=\mathbf{A}^{-1}
\left(\sum_{i=1}^{m}\mathbf{U}_i\mathbf{U}_i^{\mathsf T}\right)
\mathbf{A}^{-1},
$$

其中 \(m\) 是 donor 数，
\(\mathbf{U}_i\) 是 donor \(i\) 聚合后的 score contribution，
\(\mathbf{A}\) 是观测信息或其估计。这样做允许 donor 内相关结构被 misspecify，只要求不同 donor 之间近似独立。

### 这一步解决了什么

- 避免把 cell 数直接当作独立样本量；
- 允许在 cell level 保留连续 context；
- 对 donor 内方差结构提供一定稳健性；
- 使 interaction coefficient 的标准误与基因型实际变化层级一致。

### 这一步没有解决什么

- donor 数太少时，sandwich variance 仍可能偏小或分布近似较差；
- 未建模的 donor × context confounding 仍可能造成偏差；
- context 若由同一表达矩阵估计，会有 measurement error 与潜在 endogeneity；
- Poisson mean–variance 假设不准确时，点估计与效率仍需检查。

## Pseudobulk 与 Dynema 不是简单的替代关系

Pseudobulk 的 estimand 更接近 donor-level average expression effect。Dynema 的 estimand则是 cell-state-dependent slope。两者应被看成互补分析：

| 分析 | 主要目标 | 独立单位 | 优势 | 代价 |
|---|---|---|---|---|
| Pseudobulk eQTL | cell type 内平均效应 | donor | 校准成熟、易接 fine-mapping | 丢失细胞内连续异质性 |
| Naïve cell-level GLM | cell-level association | 错误地当作 cell | 表面 power 高 | 标准误失真、I 类错误膨胀 |
| Dynema | genotype × context interaction | donor cluster | 保留连续状态并修正相关性 | 对 context、donor 数和模型设定更敏感 |

因此，最有说服力的 workflow 不是只报告 Dynema-specific hits，而是同时给出平均 eQTL、context interaction、跨队列 replication 和条件分析。

## 作者报告的主要实证信号

作者在两个独立 T-cell 数据集中寻找可复现的 context-dependent eQTL，并报告部分信号会被传统 pseudobulk 分析遗漏。论文还讨论了在 lead eQTL 条件化后仍可观察到的动态信号，以及包括自身免疫相关位点在内的 colocalization 证据。

统计上，跨数据集 replication 比在单一 atlas 中获得极小 \(p\)-value 更重要，因为 interaction effect 很容易受到 context definition、cell composition 和 preprocessing 的影响。这里应重点查看：

- replication 是否要求 effect direction 一致；
- 两个数据集中的 context 是否由相同或可比的 procedure 定义；
- interaction effect 是否在相似细胞状态范围内估计；
- discovery 与 replication 的 donor ancestry、disease composition 和 assay 是否相近。

## 与 fine-mapping 的关系：不要把 marginal scan 当 causal resolution

Dynema 输出的是 variant–gene–context 的 marginal association evidence。一个显著 interaction variant 仍可能只是与真正 causal variant 处于 LD。因而它和 SuSiE 等 fine-mapping 方法解决的是不同层次的问题：

1. Dynema 估计 context-specific marginal score / effect；
2. LD-aware model 在一个 locus 内分解多个潜在 causal signals；
3. colocalization 判断 disease GWAS 与 context-dependent eQTL 是否共享 causal variant；
4. functional annotation 或 sequence-model score 可进入 prior，而不是替代 association likelihood。

一个理想的二阶段框架可以写成：先为每个 context basis 得到 summary statistics
\(\widehat{\boldsymbol\beta}_{GC}\) 与协方差，再在 variant 层使用

$$
\widehat{\boldsymbol\beta}_{GC}\mid\boldsymbol b
\approx N(\mathbf R\boldsymbol b,\mathbf V),
$$

其中 \(\mathbf R\) 表示 LD，
\(oldsymbol b\) 是 sparse causal effects。真正困难之处在于 \(\mathbf V\) 不一定是常规 GWAS 中的对角近似：interaction score 的不确定性来自 donor-clustered cell-level model，并可能跨 variants / contexts 相关。

### 对 SuSiE 的实际建议

不能直接把 cell 数填入 sample size，也不能把每个 context point 当作独立 phenotype。更稳妥的做法是：

- 用 donor-level genotype 和匹配 ancestry 的 LD reference；
- 明确 summary-statistic variance 的构造；
- 对多个 context basis 做 multivariate 或 hierarchical shrinkage；
- 用 simulation 检查 PIP 和 credible-set coverage，而不只比较 locus 数量；
- 将 AlphaGenome 等 functional score 放入 prior inclusion probability 时，做 held-out chromosome 或 cross-locus calibration，避免 annotation leakage。

## Context measurement error 是一个核心问题

许多 cell-state score 来自 PCA、latent embedding、trajectory 或 gene-set score，而这些量本身由表达数据估计。若用于构造 \(G_iC_{ij}\)，会产生至少三类风险：

1. **Attenuation**：经典 measurement error 可能把 interaction effect 向零收缩；
2. **Endogeneity**：若 context 使用目标 gene 或受同一 eQTL 强烈影响的 genes 构造，interaction 可能部分由 outcome 回流产生；
3. **Dataset dependence**：不同 atlas 学到的 latent axis 未必具有相同尺度与生物含义。

可考虑 cross-fitting：在不包含目标 gene 或不包含当前 donor 的数据上估计 context mapping，再用于 association scan。另一种策略是使用外部可解释的 cell-state marker 或实验设计中的时间 / stimulation dose，但这会牺牲灵活性。

## 多重检验与选择偏差

Genome-wide context-dependent eQTL scan 的检验数远大于普通 cis-eQTL：variant × gene × context basis 的组合会迅速膨胀。若先用同一数据筛选高变基因、候选 context 或 lead variants，再对筛选后的结果使用普通 \(p\)-value，可能产生 selection bias。

阅读时应区分：

- gene-level FDR 与 variant–gene pair FDR；
- interaction discovery 与 conditional secondary-signal discovery；
- discovery threshold 与 replication criterion；
- nominal colocalization posterior 与经过 locus selection 后的整体错误率。

对方法评估，QQ plot 不足以证明校准；还应在 null simulation、genotype permutation（保持 donor cluster）和不同 cell-number imbalance 下检验 type-I error。

## 计算复杂度与可扩展性

Cell-level GLM 的计算量近似随非零 count、候选 variant–gene pairs 和 context basis 数线性增长。真正的瓶颈通常不是单一矩阵乘法，而是：

- sparse count access 与 repeated offsets；
- donor-cluster score aggregation；
- 大量小 GLM 的调度开销；
- variant blocks 与 gene blocks 的内存布局；
- 多重检验结果的写出与排序。

从算法加速角度，最值得优化的是减少重复 sufficient statistics、按 cis-window 分块、复用 genotype/context products，以及将 score / Hessian accumulation 做成批量算子。GPU 是否有优势取决于能否把大量小问题合并成规则的 batched kernels；若每个 gene 的 cell subset 与 sparsity pattern 差异很大，CPU 多线程或专门的 sparse kernel 可能更实际。

## 局限与可能失败的条件

- donor 数少、cell 数极不平衡时，CRVE 的 finite-sample approximation 可能不可靠；
- context 范围在不同 genotype group 中缺乏 overlap 时，interaction 依赖外推；
- disease status 同时影响 context distribution 与 expression 时，需要清楚地区分 effect modification 与 confounding；
- 稀有 genotype 或低 MAF variant 会让 interaction 更不稳定；
- 单一线性 interaction 难以描述非单调动态效应；
- Poisson model 对 overdispersion / zero structure 的处理应通过 residual diagnostics 与 sensitivity analysis 验证；
- colocalization 若假设每个区域单 causal variant，可能与真实 allelic heterogeneity 不匹配。

## 对我们最有价值的研究方向

一个自然延伸是把连续 context effect 表示为 basis expansion：

$$
\beta_g(C)=\sum_{k=1}^{K} b_{gk}\phi_k(C),
$$

并对 \(oldsymbol b_g\) 使用 structured shrinkage，使相邻 context 的效应平滑，同时允许少量局部转折。随后在 locus 层做 multi-context fine-mapping，将“variant 是否 causal”和“效应如何随 context 变化”分开建模。

另一条路线是把 sequence-model annotation 作为 variant prior，但用 context-specific regulatory prediction：例如 AlphaGenome 在相关 cell type / assay 上的 allele-specific score，进入

$$
\operatorname{logit}(\pi_j)=\alpha_0+\alpha^{\mathsf T}\mathbf a_j,
$$

其中 \(\pi_j\) 是 variant \(j\) 的 prior inclusion probability，
\(\mathbf a_j\) 是功能注释。评估重点应是 credible-set coverage、PIP calibration 与跨染色体泛化，而不是仅看 credible set 是否变小。

## 阅读清单

- interaction 的精确定义与 context scaling；
- donor 数而非 cell 数；
- CRVE 是否有 small-sample correction；
- context 是否使用 outcome genes 构造；
- null calibration 与 cell-number imbalance simulation；
- replication 的 effect-size 一致性；
- conditional analysis 是否显式处理 LD；
- colocalization 是否允许 multiple causal signals。

**最终判断：Must Read。** 它把单细胞分辨率和 donor-level inference 放进同一框架，但后续 causal resolution 仍需要严谨的 LD-aware fine-mapping 与校准。

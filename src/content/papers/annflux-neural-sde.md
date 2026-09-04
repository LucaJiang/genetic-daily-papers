---
title: "AnnFlux: object-conditioned neural stochastic differential equations for single-cell perturbation dynamics"
shortTitle: "AnnFlux：用 object-conditioned neural SDE 建模单细胞扰动动力学"
authors: "Heesun Choi, Gaeun Byeon, Hayoon Park, Jongseo Park, Sungbin Lim, Joon-Yong An"
date: 2026-09-03
source: "bioRxiv"
version: "v1"
doi: "10.64898/2026.09.01.748703"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1"
priority: "worth-reading"
summary: "AnnFlux 将扰动预测表述为潜在细胞状态分布随时间的随机输运问题，并通过 perturbing-object 条件化的 drift/diffusion field 处理未见扰动与组合扰动；其主要统计风险在于稀疏时间点下 drift 与 diffusion 的弱可辨识性。"
whyItMatters: "它不再只预测扰动后的平均表达，而是试图估计条件状态分布的连续演化；这为 perturbation dynamics 提供了更合理的概率建模语言，也把‘轨迹是否真的由数据识别’这一问题推到台前。"
topics:
  - single-cell
  - perturbation
  - statistical-methods
peerReviewed: false
figure:
  url: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1/F1.large.jpg"
  alt: "AnnFlux Figure 1：object-conditioned neural SDE 的整体方法示意图"
  caption: "Figure 1 展示 AnnFlux 如何用 perturbing-object embedding 条件化潜在状态的随机微分方程。图中生成的连续路径是模型诱导的群体输运，不应直接解释为真实单细胞谱系。"
  credit: "Choi et al., Figure 1"
  sourceUrl: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1"
  license: "CC BY-NC-ND 4.0"
---

## 1. 研究目标：从静态端点转向条件分布演化

多数扰动数据只观察到不同时间或条件下的细胞横截面：

$$
\{X_{i0}\}_{i=1}^{n_0},\qquad \{X_{jt}\}_{j=1}^{n_t},
$$

而没有 longitudinal cell pairing。AnnFlux 因此不是估计某个细胞的 individual counterfactual，而是学习

$$
\mathcal P_0(X\mid c)\longmapsto \mathcal P_t(X\mid o,c),
$$

其中 $o$ 是 gene、drug 或其他 perturbing object，$c$ 是 cell context。其 estimand 是**给定扰动与上下文后，群体状态分布如何随时间变化**。

这个目标比预测均值更丰富：模型需要表示响应异质性、状态分叉与 rare states。不过它也更难识别。许多不同的随机动力系统可以产生近似相同的有限时间边际分布，因此“端点拟合好”并不自动意味着中间动力学正确。

## 2. Object-conditioned neural SDE

AnnFlux 在潜在空间中使用随机微分方程：

$$
\mathrm dZ_t=f_\theta(Z_t,t,o,c)\,\mathrm dt
+g_\theta(Z_t,t,o,c)\,\mathrm dW_t.
$$

- $f_\theta$ 是 drift，描述局部平均运动方向；
- $g_\theta$ 是 diffusion，描述随机异质性；
- $o$ 的 embedding 进入 drift/diffusion network，使不同扰动共享统计强度；
- $c$ 可容纳 cell type、batch 或 disease context。

这种 object conditioning 的主要动机是 unseen-object transfer：若两个扰动在 embedding space 中相近，模型可以共享动力学结构。但这是一个明确的先验假设，而不是由 held-out perturbation 数据本身保证的事实。外推能力取决于 embedding 是否与真实 response geometry 对齐。

## 3. 为什么 drift 与 diffusion 可能不可辨识

仅给定少数时间点的边际分布，常存在多组 $(f,g)$ 产生相似的 $\mathcal P_t$。直观上，更强的确定性 drift 加较弱 diffusion，可能与较弱 drift 加较强 diffusion 产生相近端点。

因此至少需要三类诊断：

1. **参数/随机种子稳定性**：不同初始化下 drift direction 是否一致；
2. **held-out intermediate time**：不仅留出终点，还留出中间时间验证路径；
3. **外部方向约束**：RNA velocity、lineage tracing 或 mechanistic prior 是否支持模型方向。

如果这些验证缺失，最稳妥的解释是“模型提供一个与观测边际分布相容的随机输运”，而不是“恢复了真实细胞命运轨迹”。

## 4. Unseen perturbation 与组合扰动

Object embedding 允许模型对未见扰动和组合扰动进行预测，但需要把三种难度分开：

- **interpolation**：held-out object 位于训练对象的 embedding 邻域；
- **extrapolation**：held-out object 位于训练支持集之外；
- **context transfer**：同一 object 在未见 cell background 中预测。

组合扰动还应与 additive baseline 比较。若

$$
\Delta_{A+B}\approx \Delta_A+\Delta_B,
$$

复杂 SDE 即使预测准确，也不代表学到 interaction。更严格的目标是估计

$$
I_{A,B}=\Delta_{A+B}-\Delta_A-\Delta_B,
$$

并检验 $I_{A,B}$ 在 independent biological replicates 中是否可重复。

## 5. 作者报告的验证应如何阅读

论文报告了时间序列插值、未见扰动、组合扰动和外部空间关联等实验。评价时不应只看 pooled cell-level distance，而要核对：

- train/test 是否按 donor、batch、cell line 或 perturbation replicate 拆分；
- rare-state mass 是否恢复，而不是只优化主群体均值；
- distributional metrics 是否被高变基因选择和 latent encoder 主导；
- 对 unseen object 的提升是否主要发生在 embedding-near 条件；
- intermediate-time prediction 是否真正在独立时间点验证。

论文还把预测的 IFN-response signature 与 pan-cancer spatial atlas 中 tertiary lymphoid structure 邻近性联系起来。这是有价值的 cross-dataset consistency check，但仍是关联证据：组织构成、肿瘤类型和免疫浸润都可能共同影响 signature 与空间位置，不能直接当作扰动机制的因果验证。

## 6. Benchmark 的独立样本单位

细胞数很大，但独立实验单位通常是 donor、cell line、time-course replicate 或 perturbation condition。若按 cell bootstrap，置信区间会过窄。更合适的做法是：

1. 在每个 biological replicate 内计算分布或 effect metric；
2. 再在 replicate 层面做 paired comparison；
3. 报告 across-replicate effect、置信区间和异质性；
4. 对未见扰动按 embedding distance 分层。

均值 MSE、top-DE overlap、Wasserstein/MMD 和 rare-state recovery 对应不同 estimand，不宜压成单一总分。

## 7. 与统计遗传学和调控模型的潜在连接

AnnFlux 的 object-conditioned idea 可以扩展到 genotype 或 fine-mapped regulatory perturbation：

$$
\mathrm dZ_t=f_\theta(Z_t,t,G_i,A_v,c)\,\mathrm dt
+g_\theta(Z_t,t,G_i,A_v,c)\,\mathrm dW_t,
$$

其中 $G_i$ 是 donor genotype，$A_v$ 是 variant annotation/sequence-model score。可研究 genotype × perturbation × cell-state interaction。

不过遗传学应用必须满足：donor 是独立样本单位；sequence score 只是 prior/annotation；association 仍需 LD-aware fine-mapping；观测性 QTL 数据缺少干预时间轴，不能自动支持 causal dynamics。

## 8. 最值得复现的检查

- donor/replicate-level split，而不是随机 cell split；
- 同时报 mean、distribution、rare-state 与 direction metrics；
- drift/diffusion 对 seed、latent dimension 和 network depth 的敏感性；
- held-out intermediate time 与 held-out endpoint 分开；
- unseen object 按 embedding distance 分层；
- 组合扰动与 additive、low-rank interaction baseline 比较；
- 外部空间验证调整 tissue composition、cancer type 与 batch；
- 使用真实时间序列或 lineage/velocity data 检查方向。

**综合判断：**AnnFlux 的概率建模表述值得精读，特别适合关注 virtual cell 与动态 perturbation modeling 的读者。当前最需要谨慎的是可辨识性：连续、漂亮的 latent trajectories 很容易产生，但只有在中间时间点、独立重复和外部方向信息都支持时，才适合赋予更强的生物动力学解释。
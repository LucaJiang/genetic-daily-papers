---
title: "Scaling recipes for single-cell RNA sequencing foundation models: when do scaling laws hold?"
shortTitle: "单细胞 foundation model 的 scaling recipes：何时存在可外推规律？"
authors: "Federico Borra, Giacomo Cirò, Arianna Castellini, Giovanni Gatti, Andrea Tangherloni, Francesca Meteora Buffa"
date: 2026-09-01
source: "bioRxiv"
version: "v1"
doi: "10.64898/2026.08.31.747783"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.08.31.747783v1"
priority: "must-read"
summary: "该研究考察单细胞 foundation models 的 loss–compute scaling、最优学习率与 architecture scaling，指出经验 scaling law 可以出现，但高度依赖模型 formulation，不能把语言模型的训练配方直接迁移到无自然 token 顺序的表达数据。"
whyItMatters: "它把‘做大模型’转化为一个可估计的设计问题：先用较小训练实验推断额外 compute 的边际回报，并联合选择深度、宽度与学习率，而不是盲目扩大参数量。"
topics:
  - single-cell
  - foundation-models
  - algorithm-acceleration
  - statistical-methods
peerReviewed: false
---

<div class="notice">本页严格区分“作者公开报告的结果”与“编辑性统计解读”。当前可核实材料包括预印本元数据及作者公开的方法摘要；在无法从索引稳定提取的数值或具体实验配置上，不作推测性补全。</div>

## 编辑结论

这篇论文值得读，不是因为它再次证明“loss 随 compute 下降”，而是因为它问了三个更有操作性的问题：

1. 单细胞表达数据上的 scaling relationship 是否稳定；
2. 最优 learning rate 是否随 model size 和 depth 有系统变化；
3. 当 compute budget 增加时，最优 architecture 是否也应该改变。

作者公开报告：scRNA-seq foundation model 中可以观察到 scaling laws，但不同 model formulations 的规律并不一致；最优学习率系统依赖模型规模和深度；architecture 应随 scale/compute 改变；语言模型中的某些经验关系在单细胞场景下幅度不同，且至少一个关系方向相反。

这意味着单细胞 foundation model 的“scale”不能只用 parameter count 表示。更合理的研究对象是：

$$
\mathcal R(C,N,D,\eta,\mathcal A,\mathcal O),
$$

其中 $C$ 是 compute，$N$ 是参数规模，$D$ 是训练数据量，$\eta$ 是 learning rate，$\mathcal A$ 是 architecture，$\mathcal O$ 是 objective/formulation。任何只改变 $N$、却不联合调整其余量的实验，都可能把超参数失配误认为“scaling 失败”。

## 1. 什么是这里的 scaling law？

经验 scaling law 常被写成：

$$
L(C)=L_{\infty}+A C^{-\alpha},
$$

或分别考察模型规模和数据规模：

$$
L(N)=L_{\infty}+A_N N^{-\alpha_N},
\qquad
L(D)=L_{\infty}+A_D D^{-\alpha_D}.
$$

这里的 $L$ 通常是 held-out pretraining loss，$L_{\infty}$ 表示在该 formulation 下不可约的近似下界。幂律关系最实用的目的不是画一条直线，而是回答：

> 在当前 regime 中，把 compute 增加 $k$ 倍，预期 loss 能下降多少？

若 $\alpha$ 可以从小规模 runs 中稳定估计，研究者就能在执行昂贵训练前评估 marginal return。

但对单细胞表达数据，至少有四个特殊问题：

- genes 没有像自然语言 token 那样唯一且有意义的顺序；
- count matrix 高度稀疏，并受 library size 和 measurement process 影响；
- cell distribution 由 tissue、donor、disease 与 protocol 混合形成；
- pretraining loss 未必与 downstream scientific estimand 对齐。

因此，能否观察到平滑 scaling，不仅依赖 compute，还依赖数据表示与 objective。

## 2. 为什么 model formulation 是 effect modifier

作者强调 scaling law 并非在所有 formulation 中同样出现。统计上，可以把 scaling exponent 写成 formulation-specific：

$$
L_f(C)=L_{\infty,f}+A_f C^{-\alpha_f},
$$

其中 $f$ 表示模型表示、目标函数或 architecture family。若不同 $f$ 的 $\alpha_f$ 和 $L_{\infty,f}$ 差异显著，单一“single-cell scaling exponent”就没有普适意义。

这类差异可能来自：

1. **tokenization/ordering bias**：把无自然顺序的 genes 强行当序列；
2. **loss weighting**：高表达 genes 或大量零值主导 objective；
3. **normalization leakage**：目标函数主要拟合 library size 或 batch；
4. **capacity mismatch**：architecture inductive bias 与 expression geometry 不匹配；
5. **data mixture**：新增数据量同时改变组织/物种/平台构成，使 $D$ 不再是单纯样本量。

所以一个 scaling experiment 必须先明确：穵竟在 scale 什么，以及 loss 的哪些部分在改善。

## 3. 学习率、深度与模型规模必须联合考虑

作者公开指出，最优 learning rate 系统依赖 model size 与 depth。这点很重要，因为常见的 benchmark 错误是：

- 固定同一 learning rate；
- 改变参数量或层数；
- 将训练不稳定或欠优化解释为大模型没有收益。

更合理的目标是估计：

$$
\eta^{\star} = h(N, H, C, B, \mathcal O),
$$

其中 $H$ 是 depth，$B$ 是 batch/token budget。对每个规模都进行完全独立的大范围 tuning 成本很高，因此 scaling recipe 的价值在于从小实验中拟合 $h(\cdot)$，而不是反复进行无结构 grid search。

但需要防止“winner's curse”：若对同一 validation set 反复选择学习率和 architecture，最终 loss 会乐观偏倚。最好使用三层数据划分：

1. training data 拟合参数；
2. tuning data 估计 recipe；
3. untouched extrapolation scale 检验 recipe 是否真能预测更大 run。

## 4. Architecture 应随 compute 改变

作者认为 compute 增加时，最优 architecture 本身也应变化。这意味着 compute-optimal frontier 不是简单的“固定网络、只放大宽度”。可以把问题写成：

$$
(\mathcal A^{\star},N^{\star},D^{\star},\eta^{\star})
=
\arg\min_{\mathcal A,N,D,\eta}
L(\mathcal A,N,D,\eta)
\quad\text{s.t.}\qquad\operatorname{FLOPs}\le C.
$$

在单细胞数据中，architecture selection 还应显式考虑：

- set/permutation invariance；
- dense 与 sparse input；
- gene vocabulary 的跨数据集一致性；
- encoder/decoder 是否主要花 compute 重建零值；
- attention 的 $O(G^2)$ 成本是否有足够信息回报；
- batch size 与显存对 optimizer noise scale 的影响。

这也是它与“算法加速”栏目的关系：更快 kernel 只是降低给定 architecture 的运行成本；而 compute-optimal design 决定应该把节省的预算投到 model size、data、depth 还是更多独立重复。

## 5. 如何验证 scaling law 不是视觉错觉

在 log–log 图上出现近似直线并不足够。建议至少检查：

### 5.1 Held-out scale extrapolation

用小规模 runs 拟合 $\alpha$，预测一个更大且完全未用于拟合的 run：

$$
\widehat L(C_{\text{large}})
\quad\text{vs.}\quad
L_{\text{observed}}(C_{\text{large}}).
$$

真正有价值的是预测误差，而不只是 in-sample $R^2$。

### 5.2 不确定性

每个 compute point 应有多个随机种子。由于昂贵 runs 数量通常很少，$\widehat\alpha$ 的区间可能很宽。应通过 nonlinear regression、bootstrap 或 hierarchical model 量化：

$$
\widehat\alpha \pm \text{uncertainty}.
$$

### 5.3 Regime change

小模型到中模型的规律未必延伸到更大规模。optimization instability、data saturation 或 architecture bottleneck 都可能导致分段 scaling。需要比较：

- 单幂律；
- 分段幂律；
- 含 irreducible floor 的模型；
- 非参数 trend。

### 5.4 Compute 的定义

GPU-hours 受硬件、kernel 和 utilization 影响；理论 FLOPs 又可能忽略稀疏性和通信。至少应同时报告：

- estimated FLOPs；
- wall-clock；
- accelerator type；
- peak memory；
- achieved throughput/utilization；
- preprocessing 与 I/O 成本。

## 6. Pretraining loss 不等于 biological utility

这是阅读时必须保留的主线。即使

$$
L_{\text{pretrain}}(C)
=
L_\infty+A C^{-\alpha}
$$

非常稳定，也不保证下游效用满足同样规律：

$$
U_{\text{downstream}}(C)
\not\equiv
\phi\bigl(L_{\text{pretrain}}(C)\bigr).
$$

原因包括：

- objective 改善来自更好预测 housekeeping genes；
- downstream task 依赖 rare genes 或 context-specific interactions；
- loss 的微小改善低于 biological/measurement noise；
- linear probe 无法提取预训练中隐含的信息；
- benchmark 已接近 ceiling；
- 预训练 corpus 与测试数据 overlap。

因此，这篇论文应与 scFoundry/practical-boundaries 一起看。前者回答 optimization scaling，后者检验这些表示是否在下游任务产生可重复增益。

## 7. 对算法加速研究的启发

从性能优化角度，论文最值得借鉴的是把 hardware optimization 放在更完整的 objective 中。假设某个 kernel 将 step time 减少 30%，有三种不同价值：

1. 同一模型更快结束；
2. 固定 wall-clock 下训练更多 tokens/cells；
3. 沿新的 compute-optimal frontier 改变 model/data allocation。

只有第三种能回答“算法优化是否改变了可达到的统计性能”。因此建议报告：

$$
\text{quality at fixed wall-clock}
\qquad\text{and}\qquad
\text{quality at fixed compute/data},
$$

而不只报告 step/s。

对�5细胞模型还需要拆分包括：

- CPU preprocessing；
- host-to-device transfer；
- sparse-to-dense conversion；
- attention/MLP kernels；
- data-loader stalls；
- distributed communication；
- validation 与 checkpoint I/O。

这个 2 倍 kernel speedup 可能在端到端训练中只带来很小收益，也可能通过允许更大 batch 改变优化 regime；两者必须实测。

## 8. 对统计遗传学模型的类比

Scaling 的思想也霂用于 QTL/fine-mapping，但“样本量”必须按独立遗传单位理解。込侈 sc-eQTL 中，增加 cells 不等价于增加 donors：

$$
N_{\text{cells}} \uparrow
\qquad\not\Rightarrow\quad
N_{\text{genotype-independent}} \uparrow.
$$

可以研究：

- donor 数增加时 association power 如何 scale；
- 每 donor 细胞数增加时 context resolution 如何 scale；
- 变异数、细胞状态复杂度和 inference compute 如何共同增长；
- summary-statistic approximation 的误差何时开始主导；
- GPU/parallelization 是否真正扩大可分析 locus/context 数，而非只增加重复细胞。

这类“statistical scaling law”比单纯的模型参数扩张更贴近生物统计问题。

## 9. 局限与应检查的细节

1. scaling exponent 是否有 seed-level uncertainty；
2. formulation 间是否使用相同数据、token budget 和调参预算；
3. 结果是否依赖特定 expression representation；
4. 大规模验证点是否真正 out-of-sample；
5. loss 改善集中在哪类 genes/cells；
6. compute 是否包含数据处理和低利用率区间；
7. downstream task 是否随 pretraining loss 同步改善；
8. 更复杂 architecture 的收益是否超过工程复杂度和复现成本。

**最终判断**：这篇论文的贡献是提供一个更可证伪的 scFM 训练设计框架。它支持“某些 formulation 下可预测地 scale”，但同时反对把 LLM recipe 机械迁移到单细胞数据。对于准备投入大量 GPU 预算的人，这是一篇应在训练前读、而不是训练后用来解释结果的论文。

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

<div class="notice">本文把作者明确报告的经验规律与本站的统计学解读分开。具体 exponent、最优学习率和架构配置应以原文表格、补充材料及复现实验为准；下面的方程主要用于说明 estimand 与验证逻辑，不把有限实验区间内的拟合曲线当作普适定律。</div>

## 1. 研究问题：单细胞模型的“规模”究竟指什么

在语言模型中，scaling law 常被写成测试损失随训练计算量下降的幂律：

$$
L(C)=L_\infty+A C^{-\alpha},
$$

其中 $C$ 是训练 compute，$L_\infty$ 是不可约损失，$\alpha$ 描述边际收益衰减。本文的问题不是简单检验 log–log 图能否近似直线，而是考察：

1. 单细胞表达数据中是否存在可重复的 loss–compute 规律；
2. 规律是否跨 model formulation 保持；
3. 最优学习率是否随参数规模、深度和 compute 系统变化；
4. 增加 compute 时，架构是否也必须同步改变；
5. 预训练损失下降能否转化为 downstream biological utility。

这几个问题不能混为一谈。即使某个 pretraining objective 的 held-out loss 可以平滑外推，也不意味着 cell-type annotation、rare-state detection、perturbation prediction 或 regulatory inference 会按同一 exponent 改善。

## 2. Scaling law 的统计对象

更准确的写法应显式条件于模型 formulation：

$$
L_f(C)=L_{\infty,f}+A_f C^{-\alpha_f},
$$

其中 $f$ 表示 tokenizer、gene ordering、objective、normalization、architecture family 和数据混合方式。若不同 $f$ 的 $\alpha_f$、$L_{\infty,f}$ 或可拟合区间明显不同，就不存在一个脱离 formulation 的“单细胞 scaling exponent”。

单细胞表达矩阵与自然语言有三个关键差异：

- genes 没有唯一自然顺序；
- count distribution 高度稀疏，并受 library size 与 measurement process 影响；
- cells 来自 donor、tissue、disease、platform 的分层混合，而不是同质 token stream。

因此，扩大数据规模 $D$ 往往同时改变数据组成。若大规模训练集引入更多组织或平台，loss 的变化混合了 sample size、domain diversity 与 measurement heterogeneity，不能只解释为 $D$ 的因果效应。

## 3. 最优学习率不是常数

作者重点讨论最优 learning rate 随模型规模和深度变化。概念上可写为

$$
\eta^*=h(N,H,C,B,\mathcal O),
$$

其中 $N$ 是参数量，$H$ 是深度，$B$ 是 batch/token budget，$\mathcal O$ 是 optimizer 与 objective。固定一个学习率比较不同规模模型，可能把 optimization mismatch 错当作 scaling failure；反过来，如果对每个模型进行不等量调参，也可能把 tuning budget 错当作 architecture advantage。

公平设计至少需要：

1. 对每个规模预先规定相近的 tuning budget；
2. tuning set 与最终 extrapolation set 分离；
3. 报告多个随机种子；
4. 记录 divergence、gradient clipping、warm-up 与 effective batch；
5. 将 optimizer state 和 mixed precision 纳入 memory/compute 核算。

若学习率由同一 held-out scale 反复选择，再用该 scale 验证 scaling law，会产生 winner's curse。更稳妥的是三层划分：训练小规模 runs、估计 recipe 的 tuning scales、完全未触碰的 extrapolation scale。

## 4. 为什么架构必须随 compute 改变

固定网络深度、只增加宽度或参数量，并不保证沿 compute-optimal frontier 前进。合理目标是

$$
(\mathcal A^*,N^*,D^*,\eta^*)=
\arg\min_{\mathcal A,N,D,\eta}L(\mathcal A,N,D,\eta)
\quad\text{s.t.}\quad \operatorname{Cost}(\mathcal A,N,D)\le C.
$$

对于单细胞数据，architecture choice 还要考虑：

- set/permutation invariance 是否合理；
- sparse count 是否被过早 densify；
- gene vocabulary 是否跨数据集一致；
- encoder/decoder 是否主要花 compute 重建大量零值；
- attention 的 $O(G^2)$ 成本是否带来相称的信息回报；
- batch size 对 optimizer noise scale 与 rare-cell representation 的影响。

因此，“更大模型”不能只用 parameter count 定义。两个参数量相近的模型，若 tokenization、sequence length、sparsity 和 activation memory 不同，其实际 FLOPs 与 wall-clock 成本可以相差很大。

## 5. 怎样验证 scaling law 不是视觉错觉

### 5.1 Held-out scale extrapolation

先用较小 compute runs 拟合 $L(C)$，再预测一个更大且未参与拟合的 run：

$$
\widehat L(C_{\mathrm{large}})
\quad\text{vs.}\quad
L_{\mathrm{observed}}(C_{\mathrm{large}}).
$$

真正有意义的是预测误差和不确定区间，而不是 in-sample $R^2$。

### 5.2 Seed-level uncertainty

昂贵 runs 通常随机种子很少，导致 exponent 区间很宽。应对每个 compute point 报告 seed-level variation，并用 nonlinear regression、bootstrap 或 hierarchical model 传播不确定性：

$$
L_{frs}=L_{\infty,f}+A_f C_r^{-\alpha_f}+u_{fr}+\epsilon_{frs},
$$

其中 $r$ 是 compute level，$s$ 是 seed，$u_{fr}$ 表示 scale-specific deviation。

### 5.3 Regime change

小模型到中模型的规律未必延伸到更大规模。optimization instability、data saturation 或 architecture bottleneck 都可能造成 piecewise scaling。应比较：

- 单一幂律；
- 分段幂律；
- 带不可约 floor 的模型；
- 非参数 trend。

模型选择应基于 held-out predictive performance，而不是只看哪条曲线最平滑。

## 6. Pretraining loss 不等于 biological utility

这是本文必须与 scFoundry 一起阅读的原因。Scaling recipes 主要回答 optimization scaling；scFoundry 检验这些表示在近百个数据集和多类任务中是否转化为实际增益。

可能出现

$$
L_{\mathrm{pretrain}}(C)\downarrow,
\qquad
\Delta_{\mathrm{downstream}}(C)\approx 0,
$$

原因包括：

- objective 主要改善 housekeeping genes 的重建；
- downstream task 依赖 rare genes 或 context-specific interactions；
- linear probe 无法读取预训练中隐含的信息；
- benchmark 已接近简单 baseline 的 ceiling；
- 训练语料与测试集重叠或高度相似；
- cell composition 改善 loss，却没有增加目标生物过程的信息。

因此 scaling paper 应同时报告至少一组与预训练损失不同层次的 downstream learning curves，而不是把 lower loss 直接写成 stronger biological representation。

## 7. 从算法加速角度应报告什么

本文最值得算法研究者借鉴的不是某个绝对 speedup，而是把性能问题放回 fixed-budget frontier。推荐同时报告：

1. estimated FLOPs 与实际 wall-clock；
2. accelerator 型号、GPU 数、数值精度和通信拓扑；
3. peak device memory 与 optimizer-state memory；
4. cells/s、nonzero counts/s 或 tokens/s；
5. data preprocessing、I/O 与 host-to-device transfer；
6. GPU utilization、kernel occupancy 与 data-loader stalls；
7. 固定 wall-clock 下的 held-out loss；
8. 固定 compute/data 下的 downstream utility。

单个 kernel 的 2× speedup 不一定改善 compute-optimal model。如果优化只让同一架构更快结束，可能应该把节省的预算重新分配给更多数据、不同深度或更充分的 tuning。真正的算法加速问题是：

$$
\max_{\mathcal A,N,D,\eta}\ U_{\mathrm{science}}
\quad\text{s.t.}\quad
\operatorname{WallClock}\le T,
\quad
\operatorname{Memory}\le M.
$$

其中 $U_{\mathrm{science}}$ 应是下游科学效用，而不只是 training throughput。

## 8. 对统计遗传学的直接启示

单细胞 QTL 研究也容易把“细胞数扩大”误写成“样本量扩大”。但 genotype-independent sample size 的主要上限仍是 donor 数：

$$
N_{\mathrm{cells}}\gg N_{\mathrm{donors}}
\quad\not\Rightarrow\quad
N_{\mathrm{genetic\,independent}}\gg N_{\mathrm{donors}}.
$$

更多 cells 提高每个 donor 的 cell-state resolution 和 expression estimation precision，却不会创造新的独立遗传重复。因此统计遗传学中的 scaling law 应分别建模：

- donors 增加对 association power 的影响；
- 每个 donor 的 cells 增加对 phenotype measurement error 的影响；
- contexts/bases 增加对 multiple testing 与 effect heterogeneity 的影响；
- loci、genes 与 cell states 增加对 compute/memory 的影响。

例如可写一个分层饱和模型：

$$
\operatorname{Var}(\widehat\beta)
\approx
\frac{\sigma^2_{\mathrm{between}}}{N_{\mathrm{donors}}}
+
\frac{\sigma^2_{\mathrm{within}}}{N_{\mathrm{donors}}\,\bar m},
$$

其中 $\bar m$ 是每个 donor 的有效细胞数。第二项可随细胞数下降，第一项不会。GPU 加速若只让每个 donor 处理更多 cells，可能很快遇到第一项主导的统计饱和。

## 9. 复现与审稿检查表

1. scaling exponent 是否有 seed-level 置信区间；
2. formulation、tokenization 与数据混合是否固定；
3. 每个规模是否使用相近的 tuning budget；
4. 是否存在完全未参与拟合的 held-out compute scale；
5. 是否比较单一与分段 scaling；
6. loss 改善集中在哪些 genes/cell states；
7. downstream utility 是否同步改善；
8. compute 是否包括 preprocessing、I/O 与 validation；
9. wall-clock、FLOPs、memory 和 throughput 是否同时报告；
10. 结果是否跨 dataset、donor、tissue 与 platform 外部验证；
11. 大模型增益是否超过简单 baseline 与其不确定区间；
12. 预训练数据是否可能包含测试集或近重复样本。

**综合判断：**这篇工作提供了一个值得验证的 scFM 训练设计框架：在特定 formulation 和有限 regime 内，loss 可以呈现可外推的 compute scaling，最优 learning rate 和 architecture 也会随规模改变。但其结论不应被简化成“单细胞大模型越大越好”。最可靠的使用方式是把 scaling recipe 当作预算分配工具，再用 scFoundry 类的多数据集、分 supervision regime benchmark 检验这些优化收益是否转化为可重复的生物学效用。
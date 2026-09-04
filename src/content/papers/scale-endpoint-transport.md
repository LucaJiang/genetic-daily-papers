---
title: "SCALE: Scalable Conditional Atlas-Level Endpoint Transport for virtual cell perturbation prediction"
shortTitle: "SCALE：面向大规模 virtual cell 的条件终点输运"
authors: "Shuizhou Chen, Lang Yu, Xueqin Lin, Xinjie Mao, Songming Zhang, Xinyu Gu, Hao Wu, Sheng Xu, Kedu Jin, Lei Bai, Quan Qian, Qin Chen, Qiang Gao, Siqi Sun, Zhangyang Gao"
date: 2026-09-03
source: "bioRxiv v2 / arXiv v3"
version: "bioRxiv v2；arXiv v3"
doi: "10.64898/2026.03.17.712536"
paperUrl: "https://arxiv.org/abs/2603.17380"
priority: "must-read"
summary: "SCALE 将未配对单细胞扰动预测定义为 control 与 treated population 之间的条件终点输运，并把 set-aware representation、endpoint-aligned supervision 与大规模数据调度联合设计；方法在部分 perturbation-specific 指标上明显优于 STATE，但并非在所有数据集和指标上占优。"
whyItMatters: "它同时触及 perturbation prediction 的 estimand、模型架构和系统吞吐量；尤其值得学习的是作者承认 transport path 只是计算构造，并用 cells/s 而非只用 epoch time 检查加速是否公平。"
topics:
  - single-cell
  - perturbation
  - foundation-models
  - algorithm-acceleration
peerReviewed: false
figure:
  url: "https://arxiv.org/html/2603.17380v3/figure-1.png"
  alt: "SCALE Figure 1：从未配对 control cell set 到 treated cell set 的条件群体输运框架"
  caption: "Figure 1 概括 SCALE 的统计目标：输入不是一一配对细胞，而是 control population、perturbation 与实验上下文；输出是 treated population 的条件分布。图中的中间 transport path 是训练构造，不应解释为真实细胞谱系。"
  credit: "Chen et al., Figure 1"
  sourceUrl: "https://arxiv.org/html/2603.17380v3#S2.F1"
  license: "CC BY 4.0"
---

## 1. 研究问题与 estimand

在典型 Perturb-seq 或药物筛选中，我们观察到的是未配对的 control cell set $X_0$ 与 treated cell set $X_1$。没有数据告诉我们某个 control cell 在扰动后对应哪一个 treated cell。因此，SCALE 合理地把目标写成条件群体分布：

$$
\widehat X_1 \sim p_\theta(X_1\mid X_0,c,p,b),
$$

其中 $c$ 是 cell type 或 cellular context，$p$ 是 perturbation，$b$ 是 batch/donor 等实验背景。这里的 estimand 是**给定 control population 与条件后的 treated population distribution**，而不是 individual-cell counterfactual，也不是可直接解释的真实轨迹。

这一区分非常重要。只要训练数据缺少 longitudinal cell pairing，任何生成出来的单细胞路径都主要由模型正则、潜在空间几何与条件编码决定；端点预测可以很好，但路径未必具有生物学可识别性。

## 2. 方法框架

### 2.1 Set-aware encoder

SCALE 先编码 gene-level information，再沿 cell dimension 聚合。核心约束是对 cell permutation 不敏感：如果 $P$ 是细胞顺序的置换，希望

$$
F(PX)=F(X)
$$

或在中间层满足相应的 permutation equivariance。否则模型会把没有生物学意义的输入排列当作信号。

这一设计也决定了 SCALE 与逐细胞条件生成模型的差异：它显式学习群体结构，包括 common response、rare states 与 context-dependent heterogeneity，而不是先对每个 cell 单独生成后再求平均。

### 2.2 Conditional endpoint transport

模型在潜在空间中构造从 $Z_0$ 到 $Z_1$ 的 surrogate path，例如

$$
Z_t=(1-t)Z_0+tZ_1,\qquad t\sim \mathrm{Unif}(0,1),
$$

并学习条件化 vector field 或 endpoint map。修订版强调 endpoint-oriented supervision：训练损失直接约束预测终点接近 observed treated population，避免只拟合中间速度场而终点漂移。

概念上可写成

$$
\widehat Z_1=h_\theta(Z_t,t,c,p,b),
\qquad
\mathcal L_{\mathrm{endpoint}}
=E\|\widehat Z_1-Z_1\|_2^2.
$$

实际实现还包含 reconstruction 与 distributional alignment 类约束。阅读时应核对这些损失的相对权重是否固定、是否按数据集调参，以及 ablation 是否在固定 compute budget 下进行。

### 2.3 条件注入

论文使用 attention/conditional blocks 注入 perturbation、cell type、batch 与时间。这个设计允许 perturbation effect 随 context 改变，但也引入更强的外推假设：未见 perturbation 或未见 cell line 必须在 embedding space 中与训练对象共享可迁移结构。

## 3. Benchmark 应如何解读

论文覆盖 Replogle–Nadig、PBMC 与 Tahoe-100M 等数据。三个 split 回答不同问题：

- Replogle–Nadig：主要考察 held-out perturbation，细胞背景较集中；
- PBMC：跨 donor/cytokine context，需区分 donor transfer 与 treatment transfer；
- Tahoe-100M：held-out cell line 更接近跨 cellular background 的 drug-response transfer。

不能把它们统一称为 “OOD generalization”。应分别报告训练与测试支持集、held-out 单位和条件覆盖，否则同一标签会掩盖难度差异。

## 4. 作者报告的结果

在 Replogle 数据中，SCALE 的七项指标均领先。文中报告 PDCorr 约为 0.751，而 STATE 约为 0.413；DEOver 约为 0.404，而 STATE 约为 0.229。这支持 SCALE 更能恢复 perturbation-specific response，而不仅是接近全局平均表达。

在 PBMC 数据中，SCALE 在 PDCorr、DEOver 与 DEPrec 上最好，但 STATE 的 MSE/MAE 更低，CPA 的方向一致性更高，scLAMBDA 的 LFC correlation 更高。这说明 reconstruction、response direction 与 differential-expression recovery 并不是同一个 estimand。

在 Tahoe-100M 中，SCALE 的 MSE、MAE、PDCorr 与 direction agreement 较强；但 STATE 在 DEOver/DEPrec 上更好，简单 additive baseline 的 LFC correlation 也可能更高。因此不应写成“SCALE 在所有 biological metrics 上全面占优”。

作者还用去除 cell-line 与 treatment average response 后的 residual response 检查 perturbation specificity。报告的 residual PCC、Direction@100、shared-response PCC 和 context-modulation PCC 均明显优于 STATE。这比原始表达相关性更有说服力，因为它减少了 cell-line mean 与 common treatment effect 对排名的主导。

## 5. 统计评估中最容易忽略的四点

### 5.1 独立样本单位

数百万 cells 可以稳定刻画一个条件内的分布，却不会把 donor、cell line 或 perturbation replicate 的数量变成数百万。置信区间、bootstrap 与模型比较应以 donor、cell line、condition 或 biological replicate 为单位，而不是 cell。

### 5.2 DE 指标依赖分析管线

DEOver/DEPrec 取决于 normalization、gene filtering、cell-level 或 pseudobulk DE、显著性阈值以及 effect-size threshold。若把 cells 当作独立重复，极小效应也可能被判为显著。更合适的是 donor/replicate-aware DE，或直接比较 condition-level log-fold change 与不确定性。

### 5.3 Endpoint 不等于 trajectory

SCALE 的数据监督主要来自端点。即使端点分布预测准确，也不能推出中间 path 与真实 cell dynamics 一致。轨迹主张需要独立时间点、lineage tracing、RNA velocity 或 intervention time course 支持。

### 5.4 组合外推需要 interaction baseline

对于组合扰动，至少应同时比较 additive、low-rank interaction 与条件生成模型。若组合效应主要近似相加，复杂模型可以在 MSE 上表现好，却并未学到 interaction。

## 6. 算法加速：12.51× 与 1.29× 为什么同时成立

作者把稀疏表达矩阵按 experimental condition 组织到 LMDB，并对 control pool 与 treated conditions 分离检索。修订版报告：

- epoch time：1298.43 s 降到 243.00 s；
- iteration rate：0.1540 增至 1.9259 iter/s，即约 12.51×；
- cell-normalized throughput：21,584.4 增至 27,818.2 cells/s，即约 1.29×。

两者不矛盾，因为优化前后每个 iteration/epoch 处理的有效 cells 数不同。对于 atlas-scale 单细胞训练，**cells/s、固定硬件下 wall-clock、峰值显存与相同数值精度**比 iteration/s 更公平。

真正可复用的工程思想包括：按 condition 存储稀疏矩阵、减少随机 sparse I/O、控制 control-pool sampling、避免无意义 sparse-to-dense 转换，并把 data-loader stalls、host-to-device transfer 与 GPU kernel time 分开 profile。当前结果是完整 pipeline 对完整 pipeline 的比较，不能直接归因于某个 CUDA kernel。

## 7. 与 QTL、fine-mapping 和调控模型的衔接

SCALE 本身不处理 genotype，但它对 response decomposition 很有启发。可以把 genotype 加入条件模型：

$$
\Delta_{p,c,g}=\alpha_{p,g}+u_{p,c,g},
$$

其中 $\alpha$ 是跨 context 的共享响应，$u$ 是 context-specific deviation。随后可研究 genotype × perturbation × cell-state interaction。

但遗传学应用必须把 donor 作为独立单位，并在 locus 内做 LD-aware fine-mapping。AlphaGenome 等 sequence-model score 更适合作为外部 annotation/prior，而不是 causal evidence。合理流程是：先获得 donor-aware effect 与协方差，再做 SuSiE-like multi-signal decomposition，最后检验 sequence score 是否改善校准后的 credible-set coverage 或 enrichment。

## 8. 复现与审稿检查表

1. 明确每个 benchmark 的 held-out 单位，不接受笼统 “OOD”；
2. 同时报告 average-expression、delta、distributional 与 rare-state metrics；
3. DE 指标使用 donor/replicate-aware pipeline；
4. 速度比较固定硬件、精度、batch、输出 cells 和训练目标；
5. 同时报 cells/s、wall-clock、peak memory 与 I/O 时间；
6. ablation 固定 compute budget；
7. 组合扰动与 additive/interaction baselines 比较；
8. 端点预测和真实动态轨迹的主张严格分开。

**综合判断：**SCALE 是这两天最值得精读的 single-cell method paper 之一。它的优势不是“统一 SOTA”，而是把 population-level estimand、perturbation specificity 与 atlas-scale systems design 放进了同一框架。结论也很清楚：在部分任务上显著领先，在另一些指标上 STATE 或简单 baseline 仍然更好；这一不均匀性恰好提示未来方法应按 estimand 而非单一平均排名设计。
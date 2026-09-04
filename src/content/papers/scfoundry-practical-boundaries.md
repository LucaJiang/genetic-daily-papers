---
title: "Accessible and reproducible deployment reveals the practical boundaries of single-cell foundation models"
shortTitle: "scFoundry：单细胞 foundation model 的可复现部署与实际边界"
authors: "Siyu Hou, Penghui Yang, Wenjing Ma, Jinxi Xiang, Jade Xiaoqing Wang, Hui Wan, Ying Ma, Xiang Zhou"
date: 2026-09-02
source: "bioRxiv"
version: "v2，实质性修订版"
doi: "10.64898/2026.01.06.698060"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.01.06.698060v2"
codeUrl: "https://github.com/Svvord/scFoundry"
priority: "must-read"
summary: "在统一、容器化的 scFoundry 工作流下，13 个单细胞 foundation models 与传统方法在近 100 个数据集上被系统比较；结论不是‘scFM 无用’，而是其优势强烈依赖 supervision regime、任务和表示几何，模型规模本身不是可靠的性能代理。"
whyItMatters: "它把 scFM 争论从单一 leaderboard 拉回到可复现部署、任务分层和不确定性：在哪些数据稀缺场景预训练有增益，哪些场景简单方法已经足够。"
topics:
  - single-cell
  - foundation-models
  - resources
  - statistical-methods
peerReviewed: false
figure:
  url: "https://www.biorxiv.org/content/10.64898/2026.01.06.698060v2/F1.large.jpg"
  alt: "scFoundry 原文 Figure 1：统一部署和评估单细胞 foundation models 的研究框架"
  caption: "原文 Figure 1，概览 scFoundry 的统一部署、任务与评估框架；图片未作修改。"
  credit: "Hou et al., bioRxiv (2026)"
  sourceUrl: "https://www.biorxiv.org/content/10.64898/2026.01.06.698060v2"
  license: "CC BY 4.0"
---

## 编辑结论

这是目前很适合用来校准 single-cell foundation model（scFM）预期的一篇工作。它没有简单回答“foundation model 好还是不好”，而是把问题拆成：

1. 在统一 preprocessing 和运行环境下，各模型能否被公平部署；
2. 预训练表示的增益是否依赖 supervision fraction；
3. 模型规模、预训练语料和 architecture 是否能解释性能；
4. embedding geometry 是否比 parameter count 更接近真正的性能决定因素；
5. scFM 在 spatial transfer 与 regulatory inference 中能否保留 context-specific biological signal。

作者在 v2 中系统比较 13 个 scFMs 和 established methods 放在多个任务和 supervision regimes 下比较。核心发现不是一个平均 rank，而是明显的 effect modification：

$$
\Delta_{m,d,t,s}
=
\operatorname{Perf}(\text{scFM}_m;d,t,s)
-
\operatorname{Perf}(\text{baseline};d,t,s),
$$

其中 $d$ 是 dataset，$t$ 是 task，$s$ 是 supervision regime。$\Delta$ 并非在所有 $d,t,s$ 上同号；预训练的收益尤其集中在 labeled data 极少的区域。

这比汇总一个全局均值更符合实际：foundation model 的价值可能主要来自 **sample efficiency**，而不是在充分监督条件下达到更高的 asymptotic accuracy。

## 2. Benchmark 的覆盖范围

公开 v2 摘要报告：

- 13 个 single-cell foundation models；
- established methods 作为比较；
- 近 100 个数据集；
- biological contexts、training regimes 和 downstream tasks 的系统评估；
- zero-shot performance 与 representation geometry 的联系；
- rare-cell annotation、open-set detection、spatial-domain recovery 和 gene/regulatory representation 等任务。

scFoundry 当前公开仓库还提供：

- `embed`：zero-shot embeddings，以及 PCA、scVI 和 integration references；
- `transfer`：在 frozen embedding 上进行 prototype、kNN、logistic regression 或 MLP label transfer；
- `finetune`：只对真正更新模型参数的方法执行 fine-tuning；
- `benchmark`：计算 biological conservation 与 batch mixing 指标；
- `geometry`：计算 effective dimension、anisotropy、$R_{NX}$、intrinsic dimension 和 partial $\eta^2$ 等表示几何量。

公开 benchmark 页面覆盖 Tabula Sapiens v2 的 26 个组织、548,977 个细胞。这部分更像可复现基准基础设施，而不是论文全部近 100 个数据集的唯一组成。

## 3. 主要结论怎样解释

### 3.1 模型规模不是可靠的性能代理

作者报告，更大的 parameter count、更复杂 architecture、更大的 pretraining corpus 或更复杂 input encoding，并没有稳定转化为更好的 downstream performance。

这个结论应当解释为：在当前评估范围内，模型规模与下游性能之间缺少稳定、可迁移的单调关系。它**不等价于**证明“扩大模型永远没有用”，因为 model size 与以下因素高度混杂：

- objective；
- tokenizer / gene ordering；
- pretraining data quality；
- optimization quality；
- checkpoint selection；
- inference recipe；
- 任务与预训练目标的 alignment。

所以这里是跨模型的 observational comparison，不是对 parameter scaling 的随机实验。更严格的 scaling 结论需要在同一模型族内控制其余因素，只改变 compute、data 与 parameter allocation。

### 3.2 表示几何比参数量更接近机制层解释

作者报告，embedding geometry 的某些可测性质能够跨模型解释 zero-shot performance 差异。这是一个重要方向，因为它把“哪个模型赢了”转化为“什么样的 representation 容易被简单决策规则利用”。

但这里仍要区分：

- geometry metric 与 performance 的相关性；
- geometry 是 causal mechanism，还是共同受 preprocessing / objective 影响的中介或伴随量；
- 指标是否在新数据集、新任务和不同 cell composition 下外部验证。

理想分析应在 dataset level 做 out-of-sample prediction：用一部分数据集拟合 geometry–performance 关系，在完全未见数据集上检验其解释力，而不是只在所有点上报告相关系数。

### 3.3 优势集中在极低监督场景

作者报告 scFM 最清楚的优势出现在：

- rare-cell annotation；
- source-absent cell state 的 open-set detection；
- labeled examples 极少的监督区间。

这符合预训练的一般作用：当目标数据本身提供的监督信息少时，外部 representation prior 的边集受限啊中于实际作用性；限蔅多数据集不同行的人����S�R��fC�V+����/��W�*����o�fC�R�^���c�B��B��"[�j��3�VӚVÚ6���o�fC�R�Z��W�j��/�z7�fC�V+����o�fC�R��S�Z�v�F��r�j�����3�k���^ۦ^Ӗ�ǖ�3�j��3�;��o�fC�R��ӚRӒ�K�k�����������w���~����&�r'�⏒�k�j�R��"�v��S�&c�j����s�R���ۚr�^Ӿ�o�fC�R�R��"ߚ������T理想分析应在 dataset level 做 out-of-sample prediction：用一部分数据集拟合 geometry–performance 关系，在完全未见数据集上检验其解释力，而不是只在所有点上报告相关系数。

### 3.3 优势集中在极低监督场景

作者报告 scFM 最清楚的优势出现在：

- rare-cell annotation；
- source-absent cell state 的 open-set detection；
- labeled examples 极少的监督区间。

这符合预训练的一般作用：当目标数据本身提供的监督信息少时，外部 representation prior 的边际价值最大。随着 labeled sample size 增加，简单模型可能迅速追平。

因此 benchmark 最应该画的是 learning curve：

$$
\operatorname{Perf}_m(n_{\text{label}}),
$$

而不是只在一个任意的 label fraction 上比较。真正有用的 summary 可能是达到某个性能阈值所需的 labels 数，或曲线下面积，而不是单点 accuracy。

### 3.4 Spatial transfer 与 regulatory interpretation 的边界

作者报告 scFM representations 对 spatial-domain recovery 的 transfer 不稳定；gene embeddings 可以捕获 broad functional relatedness，但不能可靠恢复 context-specific regulatory relationships。

这提醒我们：

- 共表达/功能相似性不等于调控方向；
- cell-level pretraining objective 未必识别 TF–target 的 context-specific causal edge；
- 一个 embedding 在 annotation 上好，并不意味着它适合作为 regulatory network 或 variant-to-gene evidence。

对于统计遗传学尤其重要：不能仅因为 scFM embedding 将某些 genes 放得很近，就把它当作 colocalization、fine-mapping 或 mediation 的独立证据。

## 4. 统计上最需要注意的 benchmark unit

单细胞 benchmark 最大的伪精确来源，是把 cell 当成独立重复。对跨方法比较，真正的独立单位通常更接近：

- dataset；
- donor；
- tissue；
- batch；
- held-out biological condition。

若一个模型在同一 dataset 的 500,000 个 cells 上略优，不应得到比 20 个独立 datasets 上重复出现的微小增益更大的证据权重。

建议用 hierarchical view 表达：

$$
y_{m,d,r}
=
\mu + \alpha_m + u_d + (\alpha u)_{m,d} + \epsilon_{m,d,r},
$$

其中 $m$ 表示 method，$d$ 表示 dataset，$r$ 表示重复或 split。重点应是 method effect 在 datasets 间的分布，以及 dataset-by-method heterogeneity，而不是把所有 cells pool 成一个巨大样本。

## 5. 公平比较还需要哪些条件

### 5.1 Pretraining leakage

若测试数据或高度相似 donor/tissue 已存在于某模型的预训练 corpus，zero-shot 结果可能受数据重叠影响。即使没有完全重复，atlas-level near-duplicate 也可能降低真正的 domain shift。

需要尽可能记录：

- pretraining corpus 的 accession 与版本；
- test dataset 是否直接或间接包含；
- gene vocabulary 和 reference atlas 是否共享标签体系；
- 时间截断 benchmark，确保测试数据晚于 checkpoint。

### 5.2 Hyperparameter budget

classical baselines 不应只用 default，而 scFM 获得大量 tuning；反之亦然。公平比较需要：

- 相近的 tuning budget；
- 明确 frozen / linear probe / full fine-tune；
- 统一 split；
- 记录 compute 与 memory；
- 覄先定义 primary metric。

### 5.3 Multiple tasks 与多重比较

近 100 个数据集、多任务、多模型、多 metrics 会产生大量比较。即便不进行传统显著性检验，也应避免从海量结果中只挑有利 setting。

最有说服力的是预先定义任务层级，并报告：

- paired effect distribution；
- uncertainty interval；
- win/tie/loss，但附 effect size；
- sensitivity to metric choice；
- dataset-level leave-one-out 稳定性。

## 6. scFoundry 的工程价值

scFoundry 不应被归类为“GPU 加速方法”。它主要解决的是 reproducible orchestration：

- Nextflow 管理任务和 provenance；
- pinned containers 隔离冲突依赖；
- workstation 与 HPC 使用相同接口；
- 原始 AnnData 输入与统一输出；
- 可重复运行 embedding、transfer、fine-tune、benchmark 与 geometry probes。

这会减少大量环境维护成本，但容器化本身不保证：

- 更高 GPU utilization；
- 更低显存；
- 更快 sparse operations；
- 更好的 multi-GPU scaling。

因此本站把它放在“数据与软件资源”，而不是“算法加速”。算法加速栏目只在有可核实的 kernel、throughput、memory 或 complexity 改进时标记。

## 7. 与 Scaling recipes 的互补关系

这篇论文最好和同日收录的 scaling paper 一起读：

- **Scaling recipes** 研究同一类训练过程中的 loss–compute 规律；
- **scFoundry/practical boundaries** 研究预训练表示在实际 biological tasks 中何时转化为收益。

两者并不冲突。完全可能存在：

$$
L_{\text{pretrain}}(C) \downarrow
\qquad\text{但}\qquad
\Delta_{\text{downstream}}(C) \approx 0,
$$

因为预训练 objective 与目标任务之间存在 representation bottleneck，或简单 baseline 已接近任务可达到的上限。

对新模型论文，最低要求是同时报告：

1. optimization/scaling curve；
2. downstream learning curve；
3. classical baseline；
4. compute、memory 与 deployment cost；
5. dataset-level uncertainty。

## 8. 对统计遗传学研究的启发

Foundation model embedding 若要用于 fine-mapping、QTL 或 variant-to-gene prioritization，应被视为一个**待校准的 annotation**，而不是 causal evidence。可以考虑：

$$
\operatorname{logit}\Pr(\gamma_j=1)
= \alpha_0 + \alpha^{\top} A_j,
$$

其中 $A_j$ 包含 sequence-model score、cell-state embedding-derived annotation 等，$\gamma_j$ 是变异 causal indicator。

但必须在独立 loci 上评估：

- enrichment 是否超越传统 chromatin/QTL annotations；
- calibration 与 credible-set coverage 是否改善；
- performance 是否跨 ancestry、tissue 和 cell state；
- annotation 是否泄漏 downstream labels；
- 加入模型 score 后是否只是缩小 credible set，却牺牲 coverage。

这与该文的核心精神一致：**不要把规模或表示本身当作价值，必须验证它在明确 estimand 和外部数据中的增量信息。**

## 9. 适用边界与最终判断

主要局限包括：

1. 跨模型 size–performance 关系是 observational，不能单独支持 scaling causal claim；
2. 近 100 个数据集仍不能代表所有组织、物种、疾病与 sequencing protocols；
3. leaderboard 受 metrics、split 与 tuning budget 影响；
4. embedding geometry 的解释关系需要独立外部验证；
5. 预训练语料透明度与潜在 leakage 仍是整个领域的问题；
6. 任务平均结果可能掩盖某些模型在特定 setting 的优势。

**最终判断**：这是必读的 benchmark/infra paper。它最重要的贡献不是宣布一个胜者，而是将 scFM 的适用范围描述为 supervision、任务、数据与 representation geometry 的函数。对做方法的人，这比追逐单一榜单更有参考价值。

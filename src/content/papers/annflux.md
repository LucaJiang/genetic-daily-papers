---
title: "AnnFlux: object-conditioned neural stochastic differential equations for single-cell perturbation dynamics"
shortTitle: "AnnFlux: neural SDEs for perturbation dynamics"
authors: "Heesun Choi, Gaeun Byeon, Hayoon Park, Jongseo Park, Sungbin Lim, Joon-Yong An"
source: "bioRxiv"
date: 2026-09-03
version: "v1"
priority: "worth-reading"
topics:
  - single-cell
  - perturbation
  - foundation-models
summary: "AnnFlux 用 perturbing-object-conditioned neural SDE 描述细胞群体分布随时间的演化，把 gene / drug embedding 注入 drift 与 diffusion，从而支持未见时间点、未见干预和组合干预的分布预测。"
why: "它把常见的 control-to-endpoint 回归提升为连续时间的 distribution transport；这使模型能够讨论动态路径与群体异质性，但也带来 drift–diffusion 可识别性和“预测不等于因果干预”的关键问题。"
paperUrl: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1"
doi: "10.64898/2026.09.01.748703"
figure:
  url: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1/F1.large.jpg"
  alt: "Figure 1 of the AnnFlux neural SDE perturbation model"
  caption: "AnnFlux 的概念流程：把细胞状态映射到 latent space，以 perturbing object 与时间作为条件学习随机动力系统，再将预测分布解码回可观测空间。读图时应特别区分 observed endpoint distributions、latent trajectories 和模型隐含的 intervention interpretation。"
  sourceUrl: "https://www.biorxiv.org/content/10.64898/2026.09.01.748703v1"
  attribution: "原图来自作者的 bioRxiv 预印本；版权与许可见原文。"
---

## 一句话结论

AnnFlux 把单细胞 perturbation prediction 写成一个条件随机动力系统：给定初始细胞群体、时间和 perturbing object，预测整个人群分布如何在 latent state space 中演化，而不只是输出一个平均表达向量或固定 endpoint。

> **编辑判断**：方法的建模语言很适合时间序列与组合干预，但论文的可信度不应只由漂亮的 latent trajectories 决定。真正要检查的是：训练数据是否足以识别动态方向、held-out split 是否真的跨干预、预测分布是否校准，以及 external spatial association 是否能支持机制解释。

## 研究问题：从 endpoint mapping 到 population dynamics

许多单细胞 perturbation 模型学习

$$
X_{\mathrm{control}}, o \longmapsto X_{\mathrm{perturbed}},
$$

其中 \(o\) 是 gene knockout、drug 或其他 intervention。若训练数据只有 control 与终点，这种模型可以很好地预测平均变化，却未必描述细胞群体经过了怎样的路径，也不自然区分 deterministic response 与 population heterogeneity。

AnnFlux 关注更强的目标：估计条件分布族

$$
\left\{p_t(z\mid o,c): t\in[0,T]\right\},
$$

其中 \(z\) 是 latent cell state，\(o\) 是 perturbing object，\(c\) 可以表示 cell context 或其他条件。目标不仅是终点均值，而是随时间变化的整个分布。

## 核心模型：object-conditioned neural SDE

方法可以概括为

$$
\mathrm dz_t
=f_{\theta}(z_t,t,e_o,c)\,\mathrm dt
+g_{\theta}(z_t,t,e_o,c)\,\mathrm dW_t,
$$

其中：

- \(f_{\theta}\) 是 drift，描述在给定 perturbation 下细胞状态的系统性移动；
- \(g_{\theta}\) 是 diffusion，描述未观测异质性与随机扩散；
- \(e_o\) 是 gene / drug 的 object embedding；
- \(W_t\) 是 Wiener process。

如果存在 encoder \(E\) 与 decoder \(D\)，则观测表达 \(x\) 先映射为 \(z=E(x)\)，SDE 在 latent space 中演化，最后由 \(D(z_t)\) 生成可观测预测。这样能降低维度，但也把可识别性问题部分转移到 latent representation：不同 latent geometries 可能产生相似的重构与终点分布。

## 分布演化的统计含义

SDE 对应的密度满足 Fokker–Planck 方程：

$$
\frac{\partial p_t(z)}{\partial t}
=-\nabla\!\cdot\!\left(f_{\theta}(z,t)p_t(z)\right)
+\frac{1}{2}\nabla^2\!:\!\left(G_{\theta}(z,t)p_t(z)\right),
$$

其中 \(G_{\theta}=g_{\theta}g_{\theta}^{\mathsf T}\)。这说明模型实际上在学习两类机制：一类改变分布中心或方向，另一类改变分散度、分支与不确定性。

然而，若只观察少数离散时间点的 unpaired cells，多个 drift / diffusion 组合可能产生相似的边际分布。因此，拟合 \(p_{t_0}\) 与 \(p_{t_1}\) 并不保证中间 trajectory 唯一。

## Perturbing-object conditioning 为什么重要

把每个 intervention 仅编码成 one-hot ID，只能对训练中出现过的干预做插值。AnnFlux 使用先验知识或预训练表示构造 object embedding，使相似 genes / drugs 在条件空间中共享信息，并尝试预测 unseen interventions。

统计上，这隐含一个 exchangeability / smoothness assumption：

$$
\|e_{o_1}-e_{o_2}\|\text{ 小}
\quad\Rightarrow\quad
f(\cdot,e_{o_1})\approx f(\cdot,e_{o_2}).
$$

是否合理取决于 embedding 的来源。序列相似、pathway 相似、chemical structure 相似和转录响应相似代表不同的邻近关系；若 embedding 使用了与测试 perturbation 相关的 downstream 数据，可能形成信息泄漏。

因此，unseen-perturbation generalization 的含义必须结合 split 设计解释：是随机留出对象、留出整个 pathway、留出特定 cell context，还是留出与训练对象距离很远的 intervention？

## 预测目标不自动具有因果含义

模型输入被称作 perturbation，并不意味着输出就是可识别的 causal effect。要把

$$
p(X_t\mid O=o)
$$

解释为

$$
p(X_t\mid \operatorname{do}(O=o)),
$$

仍需要实验分配、无干扰、测量一致性和选择机制等假设。在随机 CRISPR / drug screen 中，因果解释通常比观察性 atlas 更合理；但 guide efficiency、multiplicity、survivorship、batch 和 cell-cycle selection 仍会改变观测分布。

AnnFlux 更稳妥的定位是 **conditional generative prediction under an experimental regime**。当模型跨 cell line、donor 或 assay 外推时，因果 transportability 需要额外论证。

## 作者报告的主要实验

作者报告模型能够对 EMT time course 中留出的时间点做插值，预测训练中未见的 perturbations，并对 held-out perturbation combinations 生成群体分布。论文还将 IFN-response 相关预测与独立 pan-cancer spatial atlas 中的 tertiary lymphoid structure proximity 联系起来。

这些实验分别对应不同难度：

1. **时间插值**：测试已见动态区间内的平滑性；
2. **对象外推**：测试 object embedding 是否支持新 gene / drug；
3. **组合干预**：测试模型能否超越单干预效应的简单叠加；
4. **外部 spatial association**：测试模型预测的 signature 是否在独立组织环境中有一致关联。

第四类证据有生物学启发性，但不能单独证明 learned drift 是真实机制。空间共现可能受 cell composition、tumor type、inflammation 与 sampling density 等共同因素影响。

## Benchmark 应以 perturbation 为重复单位

在 distribution prediction 中，单个 cell 不是独立 benchmark replicate。更合理的层级是 perturbation × cell context × dataset。假设对每个 held-out perturbation \(o\) 有距离指标 \(D_o\)，应比较

$$
\Delta_o=D_o^{\mathrm{AnnFlux}}-D_o^{\mathrm{baseline}},
$$

并报告 \(\Delta_o\) 在干预对象上的分布，而不是把所有 cells 聚在一起计算极窄置信区间。

组合干预尤其应采用结构化 split：若组合 \(A+B\) 被留出，但 \(A+C\)、\(B+C\) 以及高度相似对象大量存在，任务仍可能主要是局部插值。更严格的设计包括留出 entire perturbation family 或 pathway。

## 用什么指标评价 distributional fidelity

均值相关系数不足以评价分布生成。至少应覆盖：

- 均值与 differential-expression direction；
- gene-wise variance / covariance；
- cell-state proportion；
- Wasserstein、energy distance、MMD 等分布距离；
- rare-state recall；
- calibration 或 posterior predictive coverage；
- biological pathway consistency。

不同指标强调不同几何。Wasserstein distance 对全局 transport 敏感，MMD 依赖 kernel，classifier two-sample test 可能受 classifier capacity 影响。因此，任何单一指标上的领先都应配合可解释的 marginal diagnostics。

## Drift 与 diffusion 的可识别性

若没有 lineage tracing 或 dense time sampling，drift 与 diffusion 往往弱可识别。举例说，更强的 deterministic drift 配合较小 diffusion，可能与较弱 drift 配合较大 diffusion产生相似终点分布。

可考虑的诊断包括：

- 使用不同随机种子和初始化检查 vector field 稳定性；
- 对时间点稀疏程度做 simulation；
- 用已知动力系统生成数据，检验 drift recovery 而不只检验 endpoint fit；
- 报告 trajectory-level uncertainty；
- 在 lineage / metabolic labeling 数据上做独立验证；
- 比较 deterministic ODE、SDE 与 static transport baseline。

如果多个 dynamics 都能解释观测数据，论文应把 trajectory 视为 model-dependent explanation，而不是唯一生物路径。

## Combination generalization 的关键检验

组合预测可能来自三种机制：

1. 加性：
   \(f_{A+B}\approx f_A+f_B\)；
2. 低阶交互：在 object embedding 上学习平滑非线性；
3. 真正 context-dependent epistasis：A 改变 B 的作用方向或强度。

若要证明第三种，需要与 additive、Bliss / Loewe 类参考或显式 interaction baseline 比较，并报告 interaction-dominated combinations 上的性能。否则总体分数可能主要由近似加性的组合驱动。

## 与统计遗传学的连接

AnnFlux 本身不是 QTL 方法，但它提供了一个可用于 genotype-informed perturbation modeling 的动态层。假设 variant \(v\) 或 polygenic context 改变 drift，可以扩展为

$$
\mathrm dz_t=
 f_{\theta}(z_t,t,e_o,G_i)\,\mathrm dt
+g_{\theta}(z_t,t,e_o,G_i)\,\mathrm dW_t.
$$

这将 estimand 从静态 \(G\times E\) interaction 扩展到 genotype 对动态 response path 的调节。实际应用中必须以 donor 为独立单位，并避免把 donor 内大量 cells 当作 genotype replication。

另一种连接是使用 fine-mapped variants 或 AlphaGenome-derived regulatory score定义 object prior，但这些注释应影响模型的 regularization / prior，而不应被当作已确证的 causal label。

## 算法加速与计算瓶颈

Neural SDE 训练通常比普通 feed-forward prediction 更昂贵，因为需要数值积分、随机路径采样和反向传播。主要瓶颈可能包括：

- SDE solver 的时间步数与 adaptive control；
- 多 Monte Carlo paths；
- latent dimension；
- adjoint gradient 的数值误差与内存权衡；
- 大规模细胞 minibatch 的分布距离估计；
- object embedding 查询与组合条件。

GPU 优化应报告 solver step count、function evaluations、effective batch size、峰值显存和端到端时间。单纯报告 accelerator 型号或每 epoch 时间不足以判断算法可扩展性。

可以考虑：

- vectorized path simulation；
- fixed-step solver 与误差控制的 sensitivity analysis；
- distribution loss 的低方差 minibatch estimator；
- mixed precision 对 SDE stability 的影响；
- 对 drift / diffusion network 做 kernel fusion；
- 将多个 perturbations 规则地 batch，而不是频繁启动小 kernel。

## 局限与可能失败的条件

- 只有 endpoint、没有中间时间点时，动态路径弱可识别；
- object embedding 与真实作用机制不对齐时，unseen perturbation 外推会失效；
- cell-state composition shift 可能被误当作 cell-intrinsic dynamics；
- decoder reconstruction error 会与 dynamics error 混合；
- 组合干预超出训练 embedding 的 convex hull 时，预测可能不稳定；
- guide efficiency、drug dose 和 exposure time 若未建模，会造成 intervention heterogeneity；
- 训练数据来自单一 cell line 时，跨 donor / tissue transportability 有限；
- spatial validation 是关联性证据，不能单独确认 dynamic mechanism。

## 对我们最有价值的研究延伸

一个值得做的统计扩展是把 object-level uncertainty 与 trajectory uncertainty分开：

$$
\operatorname{Var}(z_t\mid o)
=\mathbb{E}_{e_o}[\operatorname{Var}(z_t\mid e_o)]
+\operatorname{Var}_{e_o}[\mathbb{E}(z_t\mid e_o)].
$$

第一项是给定 object representation 后的 process uncertainty，第二项来自 object embedding / unseen perturbation mapping 的不确定性。当前很多模型只通过随机采样展示第一项，却没有校准第二项。

另一个方向是设计 donor-held-out、pathway-held-out、combination-held-out 的三维 benchmark，并以 perturbation 为 block 做 paired comparison。这样才能回答模型在何种外推距离下仍然提供增量信息。

## 阅读清单

- timepoint 是否足以约束 dynamics；
- object embedding 的来源与潜在泄漏；
- held-out perturbation 的结构化距离；
- distribution metric 是否覆盖 covariance 与 rare states；
- baseline 是否包含 static transport、ODE 和 additive combination；
- uncertainty 是否经过 calibration；
- external spatial result 是否调整 tumor type 与 composition；
- 运行成本是否包含 solver 与采样开销。

**最终判断：Worth Reading。** 建模框架很有启发性，但动态机制的可信度取决于可识别性、split 设计与不确定性验证，而不只是终点分布拟合。

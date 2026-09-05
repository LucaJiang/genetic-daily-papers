---
published: true
title: "Deviations from genetic additivity driven by rare variants at biobank scale"
shortTitle: "罕见变异非加性效应的 biobank-scale 检验"
authors: "Frederik H. Lassen, Samvida S. Venkatesh, Nikolas A. Baya, Cecilia M. Lindgren, Duncan S. Palmer et al."
date: 2026-08-29
source: "Nature Communications"
doi: "10.1038/s41467-026-76151-w"
paperUrl: "https://www.nature.com/articles/s41467-026-76151-w"
priority: "must-read"
summary: "论文构造与加性基因型编码正交的非加性编码，并将两者接入线性混合模型，在近 40 万 UK Biobank 样本中检验罕见变异的剂量–表型关系是否偏离加性。"
whyItMatters: "罕见变异研究常默认 0、1、2 个风险等位基因产生线性剂量效应；该方法允许在不依赖 Hardy–Weinberg equilibrium 的情况下检验隐性、显性或部分隐性模式。"
keyResults:
  - "分析最多 399,943 名 UK Biobank 参与者、2,906 个血浆蛋白和 55 个定量性状。"
  - "约三分之一的同源 gene–protein 关系显示非线性剂量响应。"
  - "FUT10 罕见变异的隐性肺功能关联在 All of Us 中获得复制；联合 2-d.f. 检验在部分隐性效应下提高功效。"
topics:
  - statistical-genetics
  - statistical-methods
peerReviewed: true
figures:
  - url: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-76151-w/MediaObjects/41467_2026_76151_Fig1_HTML.png"
    alt: "Overview of orthogonal allelic recoding for testing additive and nonadditive rare variant effects"
    label: "Figure 1 · 正交遗传编码"
    caption: "方法保留加性剂量编码，并构造一个在观测样本中与截距和加性编码正交的第二编码，用它表示偏离线性剂量响应的部分。"
    credit: "Lassen et al., Nature Communications (2026)"
    sourceUrl: "https://www.nature.com/articles/s41467-026-76151-w/figures/1"
    license: "CC BY 4.0，原图未修改"
  - url: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-76151-w/MediaObjects/41467_2026_76151_Fig2_HTML.png"
    alt: "Biobank-scale results for nonlinear gene dose-response relationships in plasma proteins"
    label: "Figure 2 · 蛋白剂量响应"
    caption: "结果图比较加性与非加性成分，并显示哪些基因–蛋白关系的杂合与双等位基因携带者不符合线性外推。"
    credit: "Lassen et al., Nature Communications (2026)"
    sourceUrl: "https://www.nature.com/articles/s41467-026-76151-w/figures/2"
    license: "CC BY 4.0，原图未修改"
---

## 研究问题

在常规 GWAS 或 rare-variant burden test 中，基因型通常编码为风险等位基因数 $x\in\{0,1,2\}$，模型默认从 0 到 1 再到 2 个等位基因的表型变化为线性。这一假设计算简单、对大多数常见变异具有良好功效，但会错过隐性、显性以及介于两者之间的剂量关系。

罕见变异下，直接加入传统 dominance coding 容易遇到两个问题：纯合稀有基因型很少，且加性与非加性编码可能相关；很多推导还依赖 Hardy–Weinberg equilibrium，而 biobank 中的祖源混合、亲缘关系和选择过程会破坏该近似。

## 正交 allelic recoding

论文保留加性剂量 $x$，再从第二个基因型函数出发构造 $z$，并在实际分析样本中把 $z$ 对截距和 $x$ 做残差化，使

$$
\sum_i z_i=0,
\qquad
\sum_i x_i z_i=0.
$$

随后拟合

$$
y=X\beta+\beta_A x+\beta_N z+u+\varepsilon,
$$

其中 $u$ 是由 genetic relationship matrix 描述的随机效应。$\beta_A$ 表示沿 0–1–2 剂量轴的线性成分，$\beta_N$ 表示无法由该直线解释的偏离。

正交化有两个直接好处：

1. 加入非加性项后，加性效应的含义不因编码相关而大幅改变；
2. 可以把加性与非加性平方和、方差或联合检验更清楚地分开。

这里的“正交”是相对于观测样本中的设计矩阵，而不是一个关于生物机制的先验结论。它保证统计分解稳定，但不会自动区分分子层面的 dominance、compound heterozygosity、haploinsufficiency 或 threshold effect。

## 检验策略

论文讨论至少两类检验：

- 单独检验 $\beta_N=0$，寻找明确偏离加性的信号；
- 联合检验 $\beta_A=\beta_N=0$，使用 2 个自由度捕获未知的剂量模式。

若真实效应近似纯加性，1-d.f. 加性检验通常更有效；若效应部分隐性或同时含线性与非线性成分，联合 2-d.f. 检验可能获得更高功效。论文的价值在于把这两类检验放在同一 LMM 框架中，而不是主张所有罕见变异都应使用 2-d.f. 模型。

## 数据与主要结果

作者在最多 399,943 名 UK Biobank 参与者中分析 2,906 个血浆蛋白和 55 个定量性状。蛋白分析特别适合检查 gene dosage：当 cis 区域或同源基因中的罕见变异直接改变对应蛋白水平时，可以比较杂合与双等位基因携带者是否符合线性外推。

作者报告约三分之一的同源 gene–protein 关系具有可检测的非线性剂量响应，并观察到多种部分隐性模式。FUT10 罕见变异与肺功能降低的隐性关联在 All of Us 中获得复制，说明该框架并非只在 UK Biobank 内部产生统计信号。

## 非加性遗传编码
先看横轴上的基因型或 burden 状态，再区分两条信息：

- 加性轴描述每增加一个等位基因的平均线性变化；
- 正交轴只描述杂合和双等位基因组相对于这条直线的剩余偏离。

因此，显著的 $\beta_N$ 不意味着加性效应为零。部分隐性信号通常同时包含 $\beta_A$ 与 $\beta_N$，这也是联合检验可能优于单一 recessive coding 的原因。

## rare-variant analysis 中需要特别检查的地方

### 有效样本量由稀有基因型决定

总样本数接近 40 万并不代表每个检验都具有 40 万人的信息量。对隐性效应，决定功效的是双等位基因携带者数量；对基因 burden，结果还依赖哪些变异被归入同一基因、是否允许不同方向和不同效应大小。

### burden 定义可能混合不同机制

把多个 pLoF 或 damaging missense 变异合并可增加携带者数量，但如果变异影响不同 transcript、不同蛋白结构域，甚至产生相反方向的效应，统一 burden 会稀释或扭曲非加性模式。

### 外部复制必须保持编码一致

在第二队列中复制时，需要保持 allele orientation、变异过滤、burden mask、祖源处理和表型转换一致。仅复制基因名称而更换 burden 定义，不能检验同一个统计效应。

## 与复杂性状研究的联系

该框架可以作为 rare-variant association 的扩展层：先用加性或 burden 模型建立主要信号，再检查是否存在可重复的非线性剂量关系。它不替代常见变异 GWAS、fine-mapping 或功能注释；相反，它针对的是同一变异或同一基因 burden 中的 genotype–phenotype mapping 形式。

在药物靶点研究中，隐性或部分隐性剂量曲线尤其重要：杂合失活的表型不能直接线性外推到完全抑制。但遗传剂量与药物剂量并不等价，治疗推断仍需要组织特异性、发育时点和补偿机制的证据。

## 局限

- 非加性检验对稀有纯合子和 compound genotype 数量极其敏感；
- 大量基因、mask、性状和编码会扩大多重检验负担；
- 选择最显著剂量模式后再解释其生物学容易产生 winner's curse；
- 正交统计分解不能单独识别分子机制；
- 对二分类疾病、极端不平衡表型和非常稀有 burden，正态近似及 LMM 校准需要额外评估。

## 小结

这篇论文提供的是一个可扩展的“是否偏离加性”检验，而不是对罕见变异遗传模式的统一答案。对每个阳性结果，最重要的仍是报告三类基因型的实际人数、效应和置信区间，并在外部队列中复制同一编码下的剂量曲线。

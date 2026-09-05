---
published: true
title: "Mapping enhancer–gene regulatory interactions from single-cell data"
shortTitle: "scE2G：将非编码变异连接到细胞类型特异的靶基因"
authors: "Maya U. Sheth, Wei-Lin Qiu, X. Rosa Ma et al."
date: 2026-08-03
source: "Nature Genetics"
doi: "10.1038/s41588-026-02695-8"
paperUrl: "https://www.nature.com/articles/s41588-026-02695-8"
codeUrl: "https://github.com/EngreitzLab/scE2G"
priority: must-read
readingType: 方法补读
summary: "scE2G 用 CRISPR 实验训练增强子–基因连接模型，将单细胞 ATAC、配对 RNA 和基因组距离结合起来，为 GWAS 可信集合提供靶基因与细胞类型假说。"
whyItMatters: "直接连接单细胞功能注释、GWAS fine-mapping 与靶基因定位，可与 gsMap、共定位和调控序列模型对照阅读。"
keyResults:
  - "在 1,892 个非编码 GWAS 可信集合中，458 个集合的最强预测连接并非指向最近的 TSS。"
  - "真实 CRISPR、精细定位 eQTL 与 GWAS 靶基因基准分别检验不同层面的证据。"
topics: [functional-annotation, fine-mapping, single-cell, QTL]
peerReviewed: true
inlineFigures: true
figures:
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02695-8/MediaObjects/41588_2026_2695_Fig2_HTML.png"
    alt: "scE2G 与距离、ABC、SCENT、SCENIC+ 等方法在真实 CRISPR、eQTL 和 GWAS 基准中的比较"
    kind: real-data
    label: "Figure 2 · 从 CRISPR 验证到 GWAS 靶基因预测"
    caption: "b–d 比较 CRISPR 连接预测，d 是独立于训练集的实验集合；e–f 用精细定位 eQTL 检验连接富集与召回；h–i 比较单独使用 E2G 和与 PoPS 取交集后的靶基因预测。取交集提高精确率，但会漏掉更多可信集合。三组基准的阳性定义不同，不能直接把它们的数值当成同一种准确率。"
    credit: "Sheth et al., Nature Genetics (2026)；原图未修改"
    sourceUrl: "https://www.nature.com/articles/s41588-026-02695-8/figures/2"
    license: "CC BY 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  - url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02695-8/MediaObjects/41588_2026_2695_Fig5_HTML.png"
    alt: "细胞类型匹配的 eQTL 富集、血糖与红细胞性状的细胞类型富集，以及 IL15 和 INPP4B 位点的调控连接"
    kind: real-data
    label: "Figure 5 · 细胞背景如何改变候选靶基因的解释"
    caption: "b–c 中，同类细胞的预测比不匹配细胞具有更高的 eQTL 富集与召回。d–e 分别显示血糖相关变异在胰岛细胞、MCV 相关变异在红系细胞中的富集。f–h 将淋巴细胞计数的可信集合、ATAC 信号、增强子连接、PoPS 和序列基序放在同一位点；这些是相互补充的证据，不是对因果链的直接验证。"
    credit: "Sheth et al., Nature Genetics (2026)；原图未修改"
    sourceUrl: "https://www.nature.com/articles/s41588-026-02695-8/figures/5"
    license: "CC BY 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
---

## 研究问题：一个可信集合可能作用于哪个基因？

GWAS 精细定位把关联区域缩小为一组候选变异，但非编码变异的靶基因仍可能在很远的位置。仅按最近基因注释，会忽略远距离调控；仅看 ATAC peak，则无法知道该开放元件影响哪个启动子。scE2G 预测的是**特定细胞类型中的增强子–基因连接**，不是 SNP 的因果后验概率。[1]

这与单纯改善细胞聚类不同：它的输入可以来自单细胞多组学，输出却直接服务于遗传位点的机制解释。

## 方法：由 CRISPR 监督，而非只计算相关性

scE2G 的基本模型是逻辑回归分类器。以统一符号表示，一个候选元件–基因对的分数为

$$
s_{egc}=\operatorname{logit}^{-1}\!\left(b_0+\mathbf{x}_{egc}^{\mathsf T}\mathbf b\right),
$$

其中 $e$、$g$、$c$ 分别表示调控元件、基因和细胞类型。训练标签来自 CRISPR 扰动后目标基因是否发生表达变化。因此，这个分数首先是训练任务下的连接预测分数，不能未经校准就当成“该变异通过此基因致病”的概率。

ATAC 版本结合六类特征：由单细胞聚合信号构造的 ABC 分数、元件可及性、启动子可及性、元件到 TSS 的距离、二者之间的基因密度，以及启动子是否属于广泛表达类别。ABC 将元件活性与距离相关的接触近似结合起来，不要求每个细胞类型都另有 Hi-C 数据。[1]

Multiome 版本进一步利用**同一细胞类型内部**的可及性–表达 Kendall 相关性。作者将它与 ABC 信号整合为 ARC-E2G 特征，降低相关性特征对测序深度的敏感性。这里不是把所有细胞类型混在一起，依靠细胞类型之间的均值差异制造很高的相关性。

训练使用按染色体留出的交叉验证，并通过特征选择组合预测因子。按染色体拆分比随机拆分元件–基因对更能避免相邻位点或共享调控结构同时进入训练与测试，但独立实验集合仍是更重要的验证。

## 实证结果：三个基准分别支持什么

[figure:1]

**CRISPR 基准**检验元件扰动是否影响基因。图 2d 的留出实验集合比训练集曲线更值得优先观察：scE2G 保持较高的加权 AUPRC，但优势并不意味着所有远距离连接都能正确恢复。图 2c 进一步按距离分组，避免模型仅凭“近的更可能”获得好成绩。

**eQTL 基准**检验预测连接是否更常覆盖指向同一基因的精细定位变异。它比单看开放染色质重叠更接近靶基因问题，但精细定位本身仍有不确定性，而且部分真实调控连接在现有 eQTL 样本量下无法检出。

**GWAS 基准**利用有独立编码变异支持的候选基因作为参照。图 2h–i 显示，与 PoPS 取交集后，精确率上升而召回下降。这应被理解为筛选阈值的取舍，而不是“两个方法同意就已经证明因果”。[1]

## 位点实例：IL15 与 INPP4B

[figure:2]

淋巴细胞计数相关的 rs7696969 位于 INPP4B 内含子。scE2G 在多个淋巴系细胞中将该元件连接到 INPP4B 和 IL15；两者的启动子距变异都很远，分别约 441 kb 和 769 kb。图 5f 的弧线表示预测连接，不是直接测得的染色质接触。

该位点还有不同层面的支持：PoPS 提名相同的两个基因，变异具有 eQTL/染色质可及性 QTL 证据，并改变候选 TP73 基序。**这些结果支持进一步验证两个靶基因，而不是已经排除了其中一个。** 论文没有用该例证明完整的“变异—增强子—基因—性状”中介链。[1]

## 与 gsMap、SuSiE 和 AlphaGenome 的衔接

gsMap 把细胞或空间位置的基因表达特异性映射到 SNP 注释，再检验性状遗传力富集。scE2G 提供的细胞类型特异连接，可作为这一映射步骤的候选替代或补充。真正需要比较的是：换用连接后，性状–细胞结果在独立组织、不同连接阈值与不同距离基准下是否稳定，而不是仅增加连接数。[2]

在 SuSiE 分析之后，可以用 scE2G 为可信集合里的变异提名靶基因。把分数进一步用作功能先验则是另一项建模工作：需要独立训练先验、控制注释间相关性，并在未参与训练的位点检查可信集合覆盖率。直接将 PIP 乘以连接分数，不会自动得到校准的联合因果概率。

调控序列模型回答的是“等位基因改变如何影响某种分子信号”，scE2G 回答的是“这个元件可能连接哪个基因”。二者互补，但任何组合都仍需独立 QTL 或扰动证据验证。这是可探索的研究方向，不是本文已经实现的结果。

## 局限与适用条件

模型依赖 CRISPR 训练集合的细胞背景、元件覆盖和阳性定义。低效应、超远距离、缺乏典型增强子特征或作用于广泛表达基因的连接仍较难预测。单细胞相关性还可能受到测序深度、残余状态差异和技术质量影响。

因此，实际应用时应同时保留一个距离基准、按细胞类型报告性能，并区分连接预测、变异精细定位和疾病中介推断。三者相互支持，但不是同一项统计任务。

## 参考文献

[1] Sheth et al. [Mapping enhancer–gene regulatory interactions from single-cell data](https://www.nature.com/articles/s41588-026-02695-8). Nature Genetics, 2026. 正文、Methods、Fig. 2 与 Fig. 5。

[2] Song et al. [Spatially resolved mapping of cells associated with human complex traits](https://www.nature.com/articles/s41586-025-08757-x). Nature, 2025. gsMap 的 SNP–gene 注释与 S-LDSC 框架。

---
title: "A 515,579-Genome Reference Panel Improves Rare-Variant Imputation Across Multiple Underrepresented Populations"
shortTitle: "All of Us + AnVIL：51.6 万人参考面板的低频变异填充表现"
authors: "Franjo Ivankovic, Arthur Ko, M. Morgan Aster et al."
date: 2026-08-31
source: "medRxiv"
version: "v1"
doi: "10.64898/2026.08.25.26361247"
paperUrl: "https://www.medrxiv.org/content/10.64898/2026.08.25.26361247v1"
resourceUrl: "https://allofus-anvil-imputation.broadinstitute.org/"
priority: must-read
readingType: 数据资源
kind: resource
summary: "新资源论文整合 All of Us 与 AnVIL 的 515,579 个基因组，提供多祖源填充服务。对低频变异的收益取决于目标群体，不能仅按参考面板总人数判断。"
whyItMatters: "参考面板的祖源覆盖与变异可填充性直接影响 GWAS、QTL 和 fine-mapping 的候选变异集合。"
keyResults:
  - "参考面板约 51.6 万人；主要准确率验证只有 42 个独立的芯片–WGS 配对样本。"
  - "与 TOPMed 的比较在五个验证群体中改善，但 AFR-SoS 群体仍以 TOPMed 较好。"
topics: [resources, QTL, fine-mapping, statistical-genetics]
peerReviewed: false
inlineFigures: true
figures:
  - url: "https://www.medrxiv.org/content/medrxiv/early/2026/08/31/2026.08.25.26361247/F3.large.jpg"
    alt: "按祖源、等位基因频率和 Beagle 质量阈值分组的 SNV 与 indel 实际填充准确率"
    kind: real-data
    label: "Figure 3 · 实际准确率与软件质量分数并不相同"
    caption: "横轴是按祖源分组的 gnomAD 等位基因频率，纵轴是填充剂量与 WGS 真值的经验平方相关。颜色表示软件推断质量 IR² 的筛选阈值；上、下部分分别为 SNV 与 indel。提高 IR² 阈值能提高保留集合的准确率，但也会丢失变异，不能只比较曲线高度。"
    credit: "Ivankovic et al., medRxiv v1 (2026)；原图未修改"
    sourceUrl: "https://www.medrxiv.org/content/10.64898/2026.08.25.26361247v1.full#F3"
    license: "CC BY 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  - url: "https://www.medrxiv.org/content/medrxiv/early/2026/08/31/2026.08.25.26361247/F4.large.jpg"
    alt: "All of Us 加 AnVIL 与 TOPMed 在六个验证群体中的填充准确率曲线对比"
    kind: real-data
    label: "Figure 4 · 面板规模与群体匹配的不同作用"
    caption: "实线圆点为 All of Us + AnVIL，虚线三角为 TOPMed；同色曲线使用相同 IR² 筛选阈值。多数群体的低频变异表现改善，但 AFR-SoS 不是如此。AFR-US 与 AFR-SoS 的差异说明，将所有非洲相关祖源样本合并成一个类别，会掩盖重要的参考匹配差异。"
    credit: "Ivankovic et al., medRxiv v1 (2026)；原图未修改"
    sourceUrl: "https://www.medrxiv.org/content/10.64898/2026.08.25.26361247v1.full#F4"
    license: "CC BY 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
---

## 新增的是参考数据，不是接口变化

这篇 8 月 31 日发布的预印本报告了 All of Us + AnVIL 填充参考面板。它由 All of Us CDR v8 的 414,830 个基因组与 AnVIL 中 100,749 个基因组联合定相，覆盖约 6.65 亿个高质量常染色体位点。多等位位点拆分后的变异数与位点数不同，不能混用。[1,2]

资源服务在论文发表前已经有公开说明，因此本期将它作为**新发表的资源论文**收录，并不声称面板今天才上线。用户得到的是填充服务与结果，而不是参考人群的个体水平基因型下载。[2]

## 面板构建与可用范围

作者用 Hail 分别质控两套数据，再合并并使用 Beagle 5.5 定相。两套数据使用过不同的变异检测流程，质控字段因此并非完全相同。最终单倍型经 RESHAPE 模拟重组处理，以降低披露原始个体单倍型的风险。论文版本的服务限于常染色体。[1]

参考样本中，约 25.4 万人最接近欧洲参考群体，约 10.2 万人最接近非洲参考群体；东亚相关组为 13,226 人。总样本量很大并不等于每个目标人群都有同样充分的覆盖。

## 实际数据验证：先区分两种 R²

论文主要准确率评估使用 42 个未进入参考面板的芯片–WGS 配对样本。以 WGS 剂量为参照，经验准确率概括为

$$
ER^2=\operatorname{cor}\!\left(\widehat G,G_{\mathrm{WGS}}\right)^2.
$$

Beagle 输出的 $IR^2$（DR2 字段）则是软件对填充质量的推断。它无需真实 WGS，但不能代替有真值的评估。图中的经验结果按祖源与频率区间汇总，不应被解释成对每一个超低频位点都已经获得稳定的验证。

[figure:1]

采用 $IR^2>0.3$ 后，SNV 在多数验证群体中可在较低频率保持较高经验相关；但图 3 明确存在东亚组例外，indel 的表现也弱于 SNV。**“能够输出低频变异”与“该变异已经足够准确，可以进入关联分析”是两回事。**[1]

42 个验证样本对于检查流程和跨群体差异有价值，但不足以保证所有群体、芯片平台和稀有变异频率区间都得到充分代表。尤其不能从面板中有几十万参考样本，推导出准确率验证也有同样的样本量。

## 与 TOPMed 的比较：并非所有群体都更好

[figure:2]

同一批独立样本用于两个服务的比较。作者在六个验证群体中的五个观察到总体改善，但来自撒哈拉以南非洲背景的 AFR-SoS 组仍以 TOPMed 表现较好。AFR-US 组则受益于新面板。这一反差是本篇最有实际意义的结果之一：参考面板是否覆盖目标群体的单倍型结构，不能用“非欧洲样本总量”概括。[1]

还需要分开两种比较：**共同位点上的准确率**与**新增可填充位点的覆盖**。只在两个面板的交集上比较，会遗漏新面板独有位点的收益；反过来，直接比较通过各自质量阈值后的全体结果，也会把集合构成变化误当成准确率变化。

## 对 GWAS、QTL 与精细定位意味着什么

重新填充可能使原先缺失的候选变异进入 GWAS 或 QTL 分析，从而改变一个位点内的关联峰和可信集合。但更密的变异集合本身不保证可信集合更小：新增的高度相关变异也可能分摊后验概率。

对已有队列，可优先选择若干已知关联位点和一组有 WGS 的独立样本，比较旧、新面板的剂量、缺失率、质量阈值与效应估计，再决定是否全队列重新处理。精细定位时还要保证关联统计量、LD 与变异集合一致；填充参考面板不能自动充当可下载的 LD 参考数据。

论文还检查了既往 WGS 研究中、常规填充未覆盖的性状关联变异。这是覆盖面的证据，不是新完成的一轮 GWAS。将“参考面板中存在某个位点”进一步转化为可信的新增关联，仍需要目标队列中的质量检查和关联检验。

## 使用条件与局限

该资源通过云端服务使用。输入、权限和存储要求应以官方说明为准；本次没有上传任何用户基因型数据。参考样本的隐私保护处理、芯片标记密度、目标群体代表性以及祖源分类方式，都可能影响实际结果。

对东亚或混合祖源队列，更合理的选择依据是本队列的验证结果，而不是面板总规模排名。本文尚未经过同行评议，尤其是极低频变异性能，应结合更大独立验证集再判断。

## 参考文献

[1] Ivankovic et al. [A 515,579-Genome Reference Panel Improves Rare-Variant Imputation Across Multiple Underrepresented Populations](https://www.medrxiv.org/content/10.64898/2026.08.25.26361247v1.full). medRxiv v1, 2026-08-31. 正文、Fig. 3–4 与配对验证样本说明。

[2] Broad Institute Scientific Services. [About the reference panel](https://broadscientificservices.zendesk.com/hc/en-us/articles/39921694846619-About-the-reference-panel). 面板构成及服务说明；与论文发布日期分开记录。

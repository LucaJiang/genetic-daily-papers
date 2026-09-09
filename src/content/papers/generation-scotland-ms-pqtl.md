---
{
  "published": true,
  "title": "Genome-wide analysis of 439 mass spectrometry-based proteomic profiles in a population of 15,035 Scottish individuals",
  "shortTitle": "Generation Scotland：15,035 人的质谱 pQTL 资源",
  "authors": "Anne Richmond, Josephine A. Robertson, Hannah M. Smith, Robert F. Hillary et al.",
  "date": "2026-09-09",
  "source": "Nature Communications",
  "version": "Article in Press／已接受提前公开版本；数据于 2026-02-01 开放",
  "doi": "10.1038/s41467-026-76474-8",
  "paperUrl": "https://www.nature.com/articles/s41467-026-76474-8",
  "pdfUrl": "https://www.nature.com/articles/s41467-026-76474-8_reference.pdf",
  "codeUrl": "https://doi.org/10.5281/zenodo.20082557",
  "resourceUrl": "https://datashare.ed.ac.uk/handle/10283/9082",
  "priority": "worth-reading",
  "readingType": "数据资源",
  "kind": "resource",
  "summary": "在 Generation Scotland 的 15,035 名参与者中，对 439 项血清质谱测量表型开展 fastGWA 与 COJO 分析，报告 1,553 个独立信号。439 项并非 439 个可唯一解释的蛋白：其中 133 项唯一映射，306 项为蛋白组。该资源补充抗体/适配体平台，但跨平台覆盖、分组歧义与 trans 工具变量限制需保留。",
  "whyItMatters": "提供 Olink/SomaScan 之外、偏向高丰度血清蛋白的开放 pQTL 汇总统计，可用于跨平台核验及 GWAS–pQTL 整合。今日更新是论文发表，数据本身自 2026 年 2 月已可获取。",
  "keyResults": [
    "15,035 人；439 项测量由 133 个唯一映射蛋白与 306 个蛋白组构成，不能按 439 个独立单蛋白靶点解释。",
    "fastGWA 的阈值为 P<1.2×10⁻¹⁰；398 项表型有显著 pQTL，COJO 得到 1,553 个独立 SNP 信号。",
    "Olink、SomaScan、Seer 既有 pQTL 的可比较关联复制比例分别为 23.1%、23.3%、40%；高效应相关仅在成功复制子集计算。",
    "31 项显著 MR 关联涉及 13 个蛋白与 17 个结局；15 项共定位 PPH4>0.8，另 2 项>0.6。MR 与共定位仍不等于证实蛋白介导机制。"
  ],
  "topics": ["QTL", "resources", "statistical-genetics", "functional-annotation"],
  "peerReviewed": true,
  "inlineFigures": true,
  "reviewedAt": "2026-09-10",
  "readingDepth": "已接受版本正文与 Methods、Figure 1–2、数据存储记录；独立补充表和 66.42 GB 汇总统计压缩包未逐项核验",
  "figures": [
    {
      "id": "fig1", "label": "Figure 1 · 独立 pQTL、频率效应与 TSS 距离",
      "sourceUrl": "https://www.nature.com/articles/s41467-026-76474-8_reference.pdf#page=3",
      "assetPath": "/figures/generation-scotland-ms-pqtl-fig1.png",
      "alt": "原论文 Figure 1 的四个面板，展示 pQTL 分布、cis/trans 效应与频率，以及 cis 关联强度与 TSS 距离。",
      "caption": "显著 SNP–表型关联数、条件独立信号数和被测表型数是不同计数单位。cis/trans 的 656/543 子集统计不能直接替代全部 1,553 个信号；D 展示 cis 关联强度与各自 TSS 的距离，并不是单个 SERPINA1 位点图。",
      "credit": "Richmond et al., Nature Communications (2026), Article in Press, Figure 1, PDF p.3.",
      "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "kind": "resource", "sourceCheck": "已接受 PDF p.3 的 Figure 1 完整 A–D 面板与图注已核对；仅提取图区，未重绘。", "imageVerified": true
    },
    {
      "id": "fig2", "label": "Figure 2 · 跨蛋白测量平台的效应比较",
      "sourceUrl": "https://www.nature.com/articles/s41467-026-76474-8_reference.pdf#page=4",
      "assetPath": "/figures/generation-scotland-ms-pqtl-fig2.png",
      "alt": "原论文 Figure 2，A、B、C 分别比较成功复制的质谱 pQTL 与 Seer、SomaScan 和 Olink 的标准化效应。",
      "caption": "相关系数 0.94、0.90、0.89 来自成功复制的关联子集，而不是所有 439 项测量，也不是平台间所有蛋白浓度的一致性。需要结合 Table 1 的覆盖范围与可复制分母一起解读。",
      "credit": "Richmond et al., Nature Communications (2026), Article in Press, Figure 2, PDF p.4.",
      "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "kind": "validation", "sourceCheck": "已接受 PDF p.4 的 Figure 2 完整 A–C 面板及同页 Table 1 已目视核验。", "imageVerified": true
    }
  ]
}
---

## 资源定位：补充高丰度血清蛋白，而非替代其他平台

大规模 pQTL 研究多依赖 Olink 或 SomaScan 等预设靶标平台。本文使用液相色谱–串联质谱，偏向测量血清中较高丰度的蛋白及其可观测肽段组合，为跨平台分析提供补充。它并不声称覆盖整个蛋白组，也不意味着质谱对所有蛋白都比抗体或适配体更准确。[已接受版本正文](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf)

**时间要分开记录**：论文于 2026-09-09 提前公开，属于 Article in Press；Edinburgh DataShare 记录显示汇总统计在 **2026-02-01** 已可获取。因此本期是论文发表后的资源核读，不是把既有数据重新标成今天首次发布。[数据记录](https://datashare.ed.ac.uk/handle/10283/9082)

## 439 项测量究竟是什么

分析包括 **15,035 名同时有遗传资料与血清蛋白测量的 Generation Scotland 参与者**。队列具有家庭结构，约 58% 为女性，中位年龄 49 岁，年龄范围 18–99 岁。单细胞数量、每位供者细胞数或 RNA 测序深度不适用于这个资源。

439 项表型由 **133 个唯一映射到一个 UniProt 蛋白标识的测量**，以及 **306 个 protein groups** 构成。后者进一步包括 199 个同基因异构体相关分组和 107 个涉及不同蛋白的分组。组内共享肽段使部分测量不能唯一分配给一个蛋白或具体异构体。

同一个基因还可能对应多个不同肽段集合，甚至同时存在唯一映射测量和若干分组测量。因此，不能一方面将 439 项都叫作唯一蛋白，另一方面又只按 gene symbol 去重而丢掉不同测量。用于共定位或 MR 时，至少应保留原始测量名称、蛋白/基因映射以及是否为 group 的标识。[正文，Proteomic phenotypes 与 Discussion](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf#page=2)

## 从质谱数据到关联表型

测量采用 LC–MS/MS、Scanning SWATH 数据采集和 DIA-NN 分析。文中描述了约 3 分钟梯度、前体层面 1% FDR 与 gene-group 层面的 1% q 值控制，使用池化质控样本进行批内校正，并处理批间差异。分析前对蛋白表型作秩逆正态转换。

这些处理决定效应是在变换后的测量尺度上解释，而非原始血清浓度的绝对单位。蛋白分组歧义、可检测丰度、肽段识别与批次校正仍会影响表型定义，不能把“无需抗体结合”写成“没有任何测量偏差”。[Methods，Protein quantification 与 data processing](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf)

## fastGWA 与 COJO：关联发现和独立信号分开

作者使用 **GCTA 1.94.1 的 fastGWA**，固定效应包括年龄、性别和 20 个遗传主成分，稀疏 GRM 以 0.05 为截断值处理亲缘相关。Methods 的遗传变异过滤包括 MAF >1%、imputation INFO >0.4；显著性阈值为

$$
P<1.2\times10^{-10},
$$

约对应 $5\times10^{-8}/439$ 的蛋白表型数校正。cis 定义为目标基因 **TSS 两侧各 1 Mb**，不是所有文章都通用的“基因边界两侧 1 Mb”。多蛋白 group 的靶基因归属又需要额外谨慎。

显著 SNP–表型配对有 **199,489 项**，**398/439 项表型**至少有一个显著 pQTL。进一步用 GCTA-COJO、Generation Scotland 自身的基因型 LD 参考及 10 Mb 窗口做条件分析，得到 **1,553 个条件独立信号**。这些是统计独立关联，不等于已经精细定位出 1,553 个因果变异。

[[figure:fig1]]

正文在可唯一归属的蛋白子集中报告 1,199 个信号，其中 656 个 cis、543 个 trans。这个子集口径与全部 1,553 个信号不同，不应在资源表中直接把 656+543 写成全部 cis/trans 分解。SERPINA1 区域有 17 个独立信号，对应 140 项蛋白表型的 181 项关联，是多表型 trans 结构值得重点检查的区域。

文中效应大小与频率的关系也来自经过显著性选择的发现集合；不能只凭这种负相关就断言所有蛋白均受某种强度的负选择。[Results 与 Methods，GWAS and conditional analysis](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf#page=3)

## 跨平台复制：覆盖分母与成功子集要同时看

与本研究可重叠的测量靶标包括 Olink 58 项、SomaScan 75 项、Seer 114 项；其中在本研究达到显著性的分别有 51、69、22 项。另一个计数层面是可用于比较的既有 pQTL 关联：Olink 199 项、SomaScan 275 项、Seer 25 项。

按作者的位点邻近、方向及 LD 匹配规则，复制的关联分别为 **46/199（23.1%）、64/275（23.3%）、10/25（40%）**。这里的分母不是全部平台蛋白数，也不是本研究的全部 1,553 个信号。原文对部分 LD 匹配指标使用了较宽泛的表述；复现时应以实现和输出为准，不将其自动等同于 LD score regression 中的 LD score。

[[figure:fig2]]

在成功复制的子集内，效应相关分别为 **0.94、0.90、0.89**。这个条件性结果支持部分遗传效应在平台之间一致，但不能转写成“所有蛋白跨平台相关都超过 0.89”。覆盖范围、测量靶标、检出功效和蛋白分组都可能影响复制比例；本文也没有提供另一批完全相同质谱流程的大规模独立队列复制。[Table 1 与 Figure 2，PDF p.4](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf#page=4)

## MR 与共定位：筛选候选机制，而不是确认介导关系

作者对 398 项有 pQTL 的蛋白表型与 79 项结局进行两样本 MR。显著结果要求 IVW $P<1.59\times10^{-6}$、至少一种其他方法达到名义显著，以及至少三个 SNP 工具变量；还进行方向性及其他敏感性分析。工具变量并非统一限制为 cis，因此 trans 多效性是解释时的重要问题。

最终 **31 项蛋白–结局关联涉及 13 个蛋白和 17 个结局**。局部共定位中，15 项满足 PPH4 >0.8，另有 2 项超过 0.6；不能把全部 31 项都说成已获强共定位支持，更不能把 0.6 与 0.8 的证据阈值合并后不加说明。

ABF 共定位支持的是研究区域中两种关联与共享变异假设相容，并不证明蛋白位于 SNP 影响结局的因果路径上。这里也不是自动完成了多因果变异条件化的 coloc-SuSiE 分析。像 SERPINA1 这样的广泛 trans 结构提示，敏感性检验与共定位都不能独自保证工具变量的排除限制成立。本文的措辞应保留为候选或 putative causal associations，而不是确定药物靶点。[正文 MR、colocalization 与 Methods](https://www.nature.com/articles/s41467-026-76474-8_reference.pdf)

## 数据获取与使用前必须核对的内容

公开汇总统计位于 [Edinburgh DataShare](https://datashare.ed.ac.uk/handle/10283/9082)，数据 DOI 为 **10.7488/ds/8011**，记录中的 `summarydata.zip` 约 **66.42 GB**。这并不意味着个体级基因型或临床资料可自由下载；个体数据需要遵守 Generation Scotland 的申请和使用条件。分析代码另有 [Zenodo 记录](https://doi.org/10.5281/zenodo.20082557)。

本次没有下载并逐列检查整个压缩包，因此尚未核实每个文件的列名、基因组坐标版本、等位基因方向或逐表型有效样本量。开展 SuSiE、共定位或 SMR 前，应先检查实际 README 与统计文件，再匹配基因组版本、effect allele、频率、样本量和祖源相符的 LD 参考。**HRC 填补参考的名称不能直接替代坐标版本核验。**

资源已按 bulk／血液蛋白 QTL、欧洲祖源与质谱平台收录到[数据资源目录](/resources/#generation-scotland-ms-pqtl)。相比单纯多加一条数据库链接，保留测量单位与 group 映射信息更有助于避免后续整合中的错误解释。

## 阅读范围与来源

依据 2026-09-09 的已接受提前公开 PDF 编写，已阅读正文和核心 Methods，核对 Figure 1–2 及 Table 1，并核验 DataShare 的开放日期、数据入口与文件规模。独立补充数据表和大型汇总统计压缩包未逐项核验，也未重新运行 GWAS、MR 或共定位；不能把这些未完成的工作计入已验证范围。

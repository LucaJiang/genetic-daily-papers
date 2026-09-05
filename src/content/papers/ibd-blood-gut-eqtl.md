---
title: "Cell-type specific analyses in blood and gut identify cis-eQTL matching 140 IBD risk loci and entrectinib as repurposing candidate"
shortTitle: "血液与肠道 eQTL：补上 IBD 风险位点的细胞类型背景"
authors: "Hélène Perée, Viacheslav A. Petrov, Yumie Tokunaga et al."
date: 2026-09-01
source: "Nature Communications"
version: "Article in Press"
doi: "10.1038/s41467-026-76672-4"
paperUrl: "https://www.nature.com/articles/s41467-026-76672-4"
pdfUrl: "https://www.nature.com/articles/s41467-026-76672-4_reference.pdf"
priority: must-read
summary: "在血液和肠道的细胞类型中比较 cis-eQTL 与 IBD GWAS 关联模式，共为 140 个风险位点找到匹配信号。肠道特异调控补充了仅研究外周血会遗漏的候选基因。"
whyItMatters: "直接涉及分子 QTL 与 GWAS 的整合、细胞类型特异调控及多信号位点解释，与 SMR、共定位和单细胞遗传学密切相关。"
keyResults:
  - "27 类血液细胞群与 43 类肠道细胞；肠道 eQTL 主分析为 57 名个体。"
  - "FDR ≤ 0.05：119 个风险位点、379 个基因；放宽至 0.10：140 个位点、556 个基因。"
  - "140 个位点中，30 个仅在肠道、33 个仅在血液、77 个在两者中获得匹配。"
topics: [statistical-genetics, QTL, fine-mapping, single-cell]
peerReviewed: true
published: true
figureSet: ibd-blood-gut-eqtl
reviewedAt: "2026-09-05"
readingDepth: full-text
figures:
  - id: fig5
    kind: real-data
    label: "140 个 IBD 位点及 CFTR、IRGM 区域的关联匹配（Figure 5）"
    caption: "A 区分严格与较宽松 FDR 阈值下的位点和基因数量。D 展示 CFTR 的肠道 eQTL 与溃疡性结肠炎信号；F 展示相邻位点在不同细胞背景中对应 CD74、IRGM 和 TNIP1 的不同关联模式。应比较区域内整组变异的信号，而不是只看最高的点。"
    alt: "140 个 IBD 位点及 CFTR、IRGM 区域的关联匹配（Figure 5）"
    sourceUrl: "https://www.nature.com/articles/s41467-026-76672-4/figures/5"
    assetPath: "/figures/ibd-blood-gut-eqtl-fig5.png"
    credit: "Perée et al., Nature Communications (2026)"
    license: "CC BY-NC-ND 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
    sourceCheck: full-text-caption-and-original-image
    imageVerified: true
    url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-026-76672-4/MediaObjects/41467_2026_76672_Fig5_HTML.png"
    sha256: "80f31600202963d42e03aa31fc0fc69a1a93477bf5d93824ac38c9fde7e8caac"
  - id: fig4
    kind: real-data
    label: "血液与肠道调控模块的共享和差异（Figure 4）"
    caption: "真实样本中，部分调控模块跨组织共享，另一些只在肠道细胞群中检出。模块共享表示区域关联模式相近，并不等于模块内每个变异都已完成精细定位。"
    alt: "血液与肠道调控模块的共享和差异（Figure 4）"
    sourceUrl: "https://www.nature.com/articles/s41467-026-76672-4/figures/4"
    assetPath: "/figures/ibd-blood-gut-eqtl-fig4.png"
    credit: "Perée et al., Nature Communications (2026)"
    license: "CC BY-NC-ND 4.0"
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
    sourceCheck: full-text-caption-and-original-image
    imageVerified: true
    url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-026-76672-4/MediaObjects/41467_2026_76672_Fig4_HTML.png"
    sha256: "9f6fe2a160437d3bc9a07bac803a7c9078bdde80bf555be13a83e796b1495ac0"
---

## 核心发现

研究 IBD 的调控机制，只增加外周血样本量并不一定能覆盖肠道中的遗传效应。这项研究将分选血液细胞的表达数据与肠道单细胞数据结合，在疾病相关细胞背景中寻找与 GWAS 一致的 cis-eQTL。作者共为 206 个受检风险位点中的 140 个找到匹配信号，但其中包含较宽松阈值下的结果：采用 FDR 不超过 0.05 时，对应的是 **119 个位点、379 个基因**。[1]

这里值得关注的不只是多找到了多少基因，而是同一基因座中的调控信号可能随细胞类型改变。即使两个细胞群都表达同一个基因，驱动表达差异的遗传信号也不一定相同。

## 数据和分析单位

血液部分覆盖 27 类分选细胞群，肠道部分覆盖 43 类细胞；文章比较分析中血液 PBMC 数据来自 187 名个体，肠道 eQTL 实际分析为 57 名个体。不同细胞类型的有效样本数和测量深度不必相同，不能把这里的细胞类型数与个体数相乘，当作关联分析的样本量。[1]

两种组织还使用了不同表达测量与细胞分类策略。因此，血液与肠道发现数的差异，既包含组织背景，也包含细胞分辨率、表达量和检出功效的影响。本文提供的是增加疾病相关细胞类型的实证价值，而不是“57 人优于数万人”的普遍结论。

## 从 eQTL 到调控模块，再与 GWAS 匹配

作者先在不同细胞群中计算 cis-eQTL，将一个区域内变异与表达的关联模式称为 **eQTL association pattern（EAP）**。关联模式相近的结果被组织为调控模块，随后比较模块在哪些细胞群中活跃，在哪些细胞群中消失或切换。

疾病 GWAS 的区域关联模式称为 **disease association pattern（DAP）**。这里的 DAP 是关联模式的缩写，**不是 DAP-G 精细定位算法**。方法比较 DAP 与 EAP 的一致性，以带方向的匹配统计量 $\theta$ 及置换结果筛选候选基因；论文对 $|\theta|\geq 0.6$ 的匹配进一步估计 FDR。[1]

这比“GWAS lead SNP 恰好也是某个 eQTL”利用了更多区域信息。但 $\theta$ 不是 SuSiE 的后验纳入概率，也不是 coloc 的共享因果变异后验概率。不同方法的阈值不能直接互换。

## IBD 风险位点的实际结果

[[figure:fig5]]

**Figure 5A** 将血液、肠道和合并分析分开报告。较宽松的两层结果共涉及 140 个位点、556 个基因，其中 77 个位点在血液和肠道中都有匹配，33 个仅在血液中获得匹配，30 个仅在肠道中获得匹配。更严格的一层结果是 119 个位点、379 个基因。展示这些数字时必须同时保留 FDR 阈值，不能将 556 个基因全部表述为已经确定的致病基因。[1]

**Figure 5D 的 CFTR 位点**更能说明细胞背景的作用：与溃疡性结肠炎风险信号相匹配的表达关联出现在分泌型过渡扩增前体细胞和肠道基质细胞中。这个例子把位点、基因、细胞背景和效应方向放在一起，比仅报告基因名单更有解释力。图中的区域匹配仍然是遗传关联证据，并未独立证明 CFTR 表达完全介导该位点的疾病效应。

**Figure 5F 的染色体 5 区域**展示两个相邻风险信号，以及 CD74、IRGM、TNIP1 在不同血液或肠道细胞群中的匹配模式。一个风险区域可能对应多个候选基因，或者同一基因在不同细胞类型中由不同信号驱动。这也是仅按最近基因注释、或只比较一个 lead SNP 容易遗漏的信息。[1]

## 为什么组织覆盖范围重要

[[figure:fig4]]

Figure 4D–E 的 CCL20 显示，同为记忆 CD4 T 细胞，肠道与血液的 eQTL 峰及基因型–表达关系并不完全相同。Figure 4F–G 的 CCL24 在肠道髓系细胞中呈现清晰的基因型–表达关系，在三类外周血单核细胞中则未检出同样的信号。单独的“不显著”仍不足以证明效应为零，但这些例子说明组织环境是检验遗传调控时不可省略的信息。[1]

文章将本研究与约三万人的欧洲祖源 PBMC eQTL 资源进行相同匹配分析。大样本 PBMC 资源得到 55 个匹配位点；本研究自己的 PBMC 数据为 32 个，扩展到全部血液细胞群后为 110 个，再加入肠道后为 140 个。[1]

这个比较首先说明，大样本仍然能提高同类组织数据的发现能力；同时，细胞类型覆盖可以补上增加单一组织样本量无法直接获得的信息。比较不是严格控制其他因素的抽样实验，因而不能只保留最后两个数字，忽略测量平台、细胞分辨率和分析集合的区别。

## 与 SMR、共定位和 SuSiE 的联系

本文与 SMR/HEIDI 关注同一类下游问题：GWAS 风险信号可能通过哪些分子表型和细胞背景起作用。但方法并不相同。本文主要依据区域关联模式及置换匹配；SMR/HEIDI 使用汇总统计量进行分子表型与性状的关联及异质性检验。[1,2]

对 Figure 5F 这样的复杂区域，进一步分析应保留多个独立关联信号，并使用匹配祖源的 LD。在分别完成 GWAS 和 eQTL 的多信号精细定位后，再进行成分层面的共定位，可以检查区域匹配是否由同一个信号支持。这是可开展的后续分析，不是本文已经完成的 SuSiE 结果。

## 哪些结论还不能下

匹配到多个基因，不代表这些基因都介导疾病；共调控和 LD 都可能产生多个相容候选。文章也讨论了这一问题，并以既有罕见变异和功能研究评估候选集合是否富集真实疾病基因。[1]

标题中的 entrectinib 来自 NEK7 等靶点的遗传、表达和既有药理证据整合，是**药物再利用候选**，不是已经证实有效的 IBD 治疗方案。本文的推荐价值主要在组织与细胞类型分辨的 QTL–GWAS 整合，而不在临床用药结论。

## 参考资料

[1] Perée et al. Nature Communications, 2026-09-01. [论文](https://www.nature.com/articles/s41467-026-76672-4) · [接受稿全文](https://www.nature.com/articles/s41467-026-76672-4_reference.pdf)。主要依据 Results、Methods 及 Figures 4–5 图注。

[2] Yang Lab. [SMR / HEIDI](https://yanglab.westlake.edu.cn/software/smr) · [SMR Portal](https://yanglab.westlake.edu.cn/smr-portal/)。此处用于方法比较，并非今日数据更新。

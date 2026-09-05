---
{
  "published": true,
  "title": "Integrative multi-omics QTL colocalization maps regulatory architecture in aging human brain",
  "shortTitle": "ColocBoost：联合定位跨细胞类型、跨组学的共享遗传信号",
  "authors": "Cao, X.; Sun, H.; Feng, R.; Mazumder, R.; Najar, C. F. B. A.; Li, Y. I.; De Jager, P. L.; Bennett, D. A.; The Alzheimer's Disease Functional Genomics Consortium; Dey, K. K.; Wang, G.",
  "date": "2025-04-20",
  "source": "medRxiv",
  "version": "v3",
  "versionDate": "2026-09-04",
  "doi": "10.1101/2025.04.17.25326042",
  "paperUrl": "https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3",
  "pdfUrl": "https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf",
  "codeUrl": "https://github.com/StatFunGen/colocboost",
  "resourceUrl": "https://github.com/StatFunGen/colocboost-paper",
  "priority": "must-read",
  "readingType": "方法补读",
  "summary": "ColocBoost 用多任务梯度提升同时选择变异与共享性状，支持多信号共定位。v3 于 9 月 4 日修订；本次核对 v3 摘要，方法细节与原图依据可读 v2 全文。",
  "whyItMatters": "适合比较联合建模与先 fine-map 再共定位的功效、错误控制及变异定位不确定性。",
  "keyResults": [
    "v3 摘要保留 17 组脑相关 QTL 与 16,503 个不同共定位事件的报告。",
    "VCP 是算法聚合支持度，不能直接当作贝叶斯 PIP；95% CoS 也不是实证 FDR 保证。"
  ],
  "topics": [
    "fine-mapping",
    "QTL",
    "single-cell",
    "statistical-methods",
    "functional-annotation"
  ],
  "peerReviewed": false,
  "figures": [
    {
      "id": "fig2",
      "kind": "simulation",
      "label": "v2 Figure 2 · 共定位功效与错误发现率",
      "caption": "v2 Figure 2：模拟中的功效、FDR 及变异层面精确率—召回率。a、d、e 红虚线为 FDR 0.05。不是 v3 新增结果。",
      "alt": "v2 Figure 2：模拟中的功效、FDR 及变异层面精确率—召回率。a、d、e 红虚线为 FDR 0.05。不是 v3 新增结果。",
      "sourceUrl": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/126a45eb540c/nihpp-2025.04.17.25326042v2-f0002.jpg",
      "url": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/126a45eb540c/nihpp-2025.04.17.25326042v2-f0002.jpg",
      "assetPath": "/figures/colocboost-multiomics-v2-fig2.jpg",
      "credit": "Cao et al., medRxiv v2 (2025-05-06)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v2-full-text-and-original-figure",
      "imageVerified": true
    },
    {
      "id": "fig6",
      "kind": "real-data",
      "label": "v2 Figure 6 · AD–QTL 共定位与 BLNK、CTSH 位点",
      "caption": "v2 Figure 6：AD-xQTL 共定位结果。a 对比不同分析得到的集合；g、h 为 BLNK 与 CTSH。不是 v3 新增结果。",
      "alt": "v2 Figure 6：AD-xQTL 共定位结果。a 对比不同分析得到的集合；g、h 为 BLNK 与 CTSH。不是 v3 新增结果。",
      "sourceUrl": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/0392eaab0259/nihpp-2025.04.17.25326042v2-f0006.jpg",
      "url": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/0392eaab0259/nihpp-2025.04.17.25326042v2-f0006.jpg",
      "assetPath": "/figures/colocboost-multiomics-v2-fig6.jpg",
      "credit": "Cao et al., medRxiv v2 (2025-05-06)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v2-full-text-and-original-figure",
      "imageVerified": true
    }
  ],
  "reviewedAt": "2026-09-06",
  "readingDepth": "v2-full-text-v3-abstract"
}
---

**2026-09-06 选读｜预印本修订**。原稿于 2025-04-20 首次公开，v3 于 2026-09-04 更新，尚未经过同行评审。官方 API 中 v3 与 v2 摘要一致；以下核心方法、详细结果和图片依据可读的 v2 全文，v3 全文的具体修改尚未核验。[最新版本](https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3) · [v2 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12083576/)

## 多信号共定位中的跨性状借力

单细胞 QTL 常受 donor 数量和稀有细胞检测功效限制：一个变异在 bulk 中信号很强，在某类细胞或疾病 GWAS 中可能较弱；同一区域还可能存在多个相互连锁的因果变异。ColocBoost 将变异选择和共享性状识别放进同一个拟合过程，研究重点是如何借助跨性状信息提高功效，同时避免把 LD 造成的信号重叠误判为共定位。它与先分别 fine-map、再做两性状共定位的分析路线形成了有价值的比较。

## 模型与算法

对性状 $l$，模型为 $Y_l=X_l\beta_l+\epsilon_l$。共定位对应同一变异在两个或更多性状中具有非零效应，允许一个区域内有多个效应以及不同的性状共享组合。输入可为个体层基因型与表型，也可为汇总统计和匹配的 LD 数据。

每轮梯度提升利用残差选出候选变异，再通过 Single-Effect Coupler（SEC）判断哪些性状可以联合更新。**LD 平滑**把一次更新的权重分配给邻近的高 LD 变异，保留因果位置的不确定性；它并不能让共定位摆脱对 LD 质量的依赖。**延迟联合更新（D-SEC）**先处理可能遮蔽共享信号的性状特异效应，待残差更新后再决定共享关系，以减少过早耦合导致的误判。疾病优先模式还用 E-SEC 优先考虑与目标 GWAS 信号相容的更新，防止较强的分子 QTL 主导早期拟合。

拟合结束后，算法聚合指向同一 LD 信号的 SEC，得到事件权重 $W_j^{(s)}$。CoS 是按权重排序、累计达到默认 0.95 的变异集合，并关联一组共享性状；VCP 则按 $1-\prod_s(1-W_j^{(s)})$ 汇总一个变异在不同事件中的支持度。**VCP 来自算法权重，不应直接解释成贝叶斯 PIP；95% CoS 也不等于真实数据的 FDR 已被保证在 5%。**

## ROSMAP 基因型模拟中的校准与功效

v2 用真实 ROSMAP 基因型设计模拟。它把两类错误都计入 CoS 层面的 FDR：集合未包含真实因果变异，或把至少一个不共享该效应的性状纳入集合。作者报告主要模拟中平均功效为 0.934，FDR 低于 5%；弱疾病信号场景较能体现联合建模的优势。这是特定模拟条件下的经验表现，不能外推成所有遗传结构下的理论保证；比较方法的 CoS 部分由作者根据其输出构造，阅读时也应检查阈值和评价口径。

[[figure:fig2]]


## ROSMAP 多组学与 AD 共定位

研究整合 17 组 QTL：6 类脑细胞的单核 RNA-seq pseudobulk eQTL、4 组 bulk eQTL、6 组 productive/unproductive sQTL，以及 1 组脑组织 pQTL。v3 摘要仍报告平均样本量 595、16,503 个不同共定位事件，以及相关变异对 57 个复杂性状约 10.7 倍的遗传力富集；平均样本量并不意味着所有模态来自同一批完整配对的 donor。

以下为 **v2 Table 2** 的具体样本量，不能以单个平均值替代：

| 数据 | donor 数量 |
|---|---:|
| 6 类细胞 pseudobulk eQTL | 各 419 |
| bulk eQTL：DLPFC / AC / PCC / 单核细胞 | 784 / 593 / 441 / 226 |
| bulk sQTL：DLPFC / AC / PCC，各含两类剪接 | 806 / 603 / 449 |
| DLPFC pQTL | 416 |

在 v2 的 AD 联合分析中，188 个共定位事件归并为 120 个不同位点；成对 COLOC 结果的并集为 48 个。BLNK 的示例尤其有启发：其 CoS 含 22 个高 LD 变异，最高 VCP 仅 0.095，按单变异分数筛选会漏掉集合层面的证据。CTSH 则展示多个效应及不同细胞、剪接和蛋白性状的共享组合。这些结果支持候选调控机制，尚不能证明分子表型介导疾病风险。

[[figure:fig6]]


## 对方法开发的启发与边界

最值得追问的是：在样本重叠、LD 不匹配及强弱效应共存时，借力何时有益、何时引入错误。当前实现默认不显式建模跨性状残差相关；大量高度相关的 ATAC 或甲基化特征仍有扩展性问题。功能验证部分使用 K562 的 CRISPR 数据，不能等同于脑细胞中的直接验证。v2 尚未把功能注释纳入 SEC，因此可考虑用 AlphaGenome 等预测构造平滑或耦合权重，再以独立模拟检查功效和校准——这是进一步的方法设想，并非论文已完成的工作。

**数值口径提示：**v2 正文另列 18,654 个事件、16,504 个不同 CoS，与摘要的 16,503 不完全一致；上文保留各自来源，不将这些口径混用。v3 全文是否修正仍待核验。

**代码与复现：**[ColocBoost R 包](https://github.com/StatFunGen/colocboost) · [官方教程](https://statfungen.github.io/colocboost/) · [论文分析代码与数据](https://github.com/StatFunGen/colocboost-paper) · [数值结果存档](https://doi.org/10.5281/zenodo.15215225)

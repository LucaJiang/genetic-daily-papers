---
{
  "published": true,
  "title": "Efficient genome-wide mapping of reproducible, context-dependent eQTLs at single-cell resolution",
  "shortTitle": "Dynema：在连续细胞状态中检验遗传调控效应",
  "authors": "Jose Alquicira-Hernandez, Elizabeth Dorans, Yoshihiko Tomofuji, Aparna Nathan, Soumya Raychaudhuri",
  "date": "2026-08-29",
  "source": "bioRxiv",
  "version": "v1",
  "doi": "10.64898/2026.08.25.747138",
  "paperUrl": "https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1",
  "pdfUrl": "https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1.full.pdf",
  "codeUrl": "https://github.com/immunogenomics/Dynema.jl",
  "priority": "must-read",
  "readingType": "本周新作",
  "summary": "Dynema 在逐细胞 Poisson 模型中检验基因型与细胞状态的交互，以 donor 聚类稳健方差处理个体内相关性，寻找 pseudobulk 可能平均掉的状态依赖 eQTL。",
  "whyItMatters": "直接连接单细胞计数建模、细胞状态交互、稳健推断及疾病位点共定位。",
  "keyResults": [
    "在 TBRU 与 OneK1K 的 T 细胞中检验细胞毒性、调节／活化及中央记忆状态。",
    "作者报告跨队列复现的状态依赖 eQTL，部分信号独立于领先主效应变异。"
  ],
  "topics": [
    "QTL",
    "single-cell",
    "statistical-methods",
    "fine-mapping"
  ],
  "peerReviewed": false,
  "figures": [],
  "reviewedAt": "2026-09-06",
  "readingDepth": "abstract"
}
---

**论文简报｜2026-08-29，bioRxiv v1，尚未经同行评议。** 本文依据 bioRxiv 官方摘要、作者软件文档和公开分析脚本整理；尚未取得可读全文，不属于全文精读。

## 单细胞计数与 donor 层面推断

Dynema 关注的统计问题是：同一变异对基因表达的影响，是否沿细胞状态连续变化？将细胞按 donor 和细胞类型汇总为 pseudobulk，有利于个体层面的关联分析，但较粗的分组可能平均掉仅存在于部分状态的遗传效应。Dynema 保留逐细胞计数，在 Poisson 模型中纳入基因型、细胞状态及其交互项，并以 donor 为单位计算聚类稳健方差（CRVE），处理同一个体多个细胞之间的相关性。[论文及官方元数据](https://api.biorxiv.org/details/biorxiv/10.64898/2026.08.25.747138)

作者区分三种检验：主效应检验；给定主效应后，一个或多个“基因型×状态”的交互检验；将主效应与交互项一同检验的 total-effect 检验。因此，“检测到遗传效应”与“证明效应随状态变化”对应不同零假设。CRVE 的关键是避免将细胞数直接当成独立个体数。作者软件另提供 score bootstrap，以应对 donor 数较少或各 donor 细胞数极不均衡的场景；这不是任意小样本均能可靠推断的保证。[作者文档](https://github.com/immunogenomics/Dynema.jl)

## T 细胞状态中的可复现遗传效应

真实数据分析使用 TBRU 与 OneK1K 的 T 细胞，考察细胞毒性、调节／活化及中央记忆三个状态维度。作者报告了跨队列可复现的状态依赖 eQTL；部分信号未被 pseudobulk 检测到，另一些在条件于领先主效应变异后仍存在。摘要还报告 TSPAN32 等自身免疫相关位点与状态依赖 eQTL 的共定位。这里的证据支持共享遗传信号，不能直接解释为已经验证的致病机制。[作者分析仓库](https://github.com/immunogenomics/Dynema_analysis)、[论文](https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1)

## 状态表示与检验校准

对单细胞统计方法研究，值得进一步检查的是：状态表示如何构建，donor 层面重抽样如何校准交互检验，以及多自由度检验怎样进入共定位分析。稳健方差也不能自动修正均值模型、细胞状态或混杂因素的错误设定。目前不报告精确样本量、速度倍数或共定位后验概率；这些细节需取得全文后核对。

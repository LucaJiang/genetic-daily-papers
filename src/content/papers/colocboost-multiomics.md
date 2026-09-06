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
  "summary": "ColocBoost 在多任务梯度提升中联合选择变异和共享性状，以 LD 平滑保留定位不确定性。v3 全文补充了概率校准与分样本重现证据，并明确较强残差相关可能造成 FDR 膨胀。",
  "whyItMatters": "适合比较联合建模与先 fine-map 再共定位的功效、错误控制及变异定位不确定性。",
  "keyResults": [
    "17 组 QTL：正文报告 18,654 个事件、16,504 个不同 CoS；摘要仍为 16,503，口径差异需保留。",
    "AD 分析的 188 个事件对应 120 个位点，COLOC-union 为 48；VCP 类似 PIP，但不是贝叶斯后验 PIP。"
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
      "label": "v3 Figure 2 · 共定位功效与概率校准",
      "caption": "原文 Figure 2（v3）：模拟中的多性状共定位性能。a 比较 2、5、10、20 个性状及不同因果变异数下的功效与 FDR；b 展示异质效应、LD 代理产生最强边际信号以及弱 GWAS 效应的实例；c 比较变异层面的精确率–召回率；d、e 分别检验疾病优先模式及与 OPERA 的基因层面对比。f、g 仅针对单性状特例 FineBoost，比较 VPA 与 SuSiE PIP 及各自的模拟校准；这些结果不等于多性状 VCP 的一般校准保证。",
      "alt": "原文 Figure 2（v3）：模拟中的多性状共定位性能。a 比较 2、5、10、20 个性状及不同因果变异数下的功效与 FDR；b 展示异质效应、LD 代理产生最强边际信号以及弱 GWAS 效应的实例；c 比较变异层面的精确率–召回率；d、e 分别检验疾病优先模式及与 OPERA 的基因层面对比。f、g 仅针对单性状特例 FineBoost，比较 VPA 与 SuSiE PIP 及各自的模拟校准；这些结果不等于多性状 VCP 的一般校准保证。",
      "sourceUrl": "https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf#page=9",
      "assetPath": "/figures/colocboost-multiomics-v3-fig2.png",
      "credit": "Cao et al., medRxiv v3 (2026-09-04), Figure 2",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v3-full-text-and-original-figure",
      "imageVerified": true
    },
    {
      "id": "fig6",
      "kind": "real-data",
      "label": "v3 Figure 6 · AD 共定位与 BLNK、CTSH 位点",
      "caption": "原文 Figure 6（v3）：AD GWAS 与 xQTL 的共定位结果。a 比较 ColocBoost、COLOC-union 与 AD 精细定位集合的重叠；b、c 分别显示关联强度和距基因 TSS 的分布；d 以 ENCODE-rE2G 预测的增强子–基因链接作为外部参照比较精确率和召回率；e、f 展示跨 xQTL 的共定位配置与全基因组 MaxVCP。g 的 BLNK 实例表明高 LD 可使概率分散于整个 CoS；h 的 CTSH 显示同一位点存在不同的跨细胞类型和分子层共定位配置。功能链接和共定位支持机制假说，但不能据此确认疾病介导关系。",
      "alt": "原文 Figure 6（v3）：AD GWAS 与 xQTL 的共定位结果。a 比较 ColocBoost、COLOC-union 与 AD 精细定位集合的重叠；b、c 分别显示关联强度和距基因 TSS 的分布；d 以 ENCODE-rE2G 预测的增强子–基因链接作为外部参照比较精确率和召回率；e、f 展示跨 xQTL 的共定位配置与全基因组 MaxVCP。g 的 BLNK 实例表明高 LD 可使概率分散于整个 CoS；h 的 CTSH 显示同一位点存在不同的跨细胞类型和分子层共定位配置。功能链接和共定位支持机制假说，但不能据此确认疾病介导关系。",
      "sourceUrl": "https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf#page=26",
      "assetPath": "/figures/colocboost-multiomics-v3-fig6.png",
      "credit": "Cao et al., medRxiv v3 (2026-09-04), Figure 6",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v3-full-text-and-original-figure",
      "imageVerified": true
    }
  ],
  "reviewedAt": "2026-09-06",
  "readingDepth": "full-text"
}
---

**v3 全文解读｜2026-09-06 选读。** 原稿于 2025-04-20 首次公开，v3 于 2026-09-04 更新，尚未经同行评议。本次按 v3 正文、Methods、Table 2 和原图重新核验；所读 61 页 PDF 含补充图表图注，但不含独立 Supplementary Note 正文及补充数值表，相关补充实验按主文报告解释。[v3 论文](https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3) · [全文 PDF](https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf)

## 多信号共定位中的跨性状借力

单细胞 QTL 常受 donor 数量和稀有细胞检测功效限制：一个变异在 bulk 中信号很强，在某类细胞或疾病 GWAS 中可能较弱；同一区域还可能存在多个相互连锁的因果变异。ColocBoost 将变异选择和共享性状识别放进同一个拟合过程，研究重点是如何借助跨性状信息提高功效，同时避免把 LD 造成的信号重叠误判为共定位。它与先分别 fine-map、再做两性状共定位的分析路线形成了有价值的比较。

## 多任务回归与自适应联合更新

对性状 $l$，模型为 $Y_l=X_l\beta_l+\epsilon_l$，其中表型居中、基因型标准化，不同性状可以有不同样本量。共定位对应同一变异在两个或更多性状中具有非零效应；同一区域允许多个效应及不同的共享性状组合。输入可为个体层数据，也可为汇总统计与适配的 LD 信息。

每轮迭代在残差上寻找能同时改善多个性状拟合的变异，再决定哪些性状应共同更新。Single-Effect Coupler（SEC）并非仅凭两个 lead SNP 的 LD 高便宣布共定位：v3 的两性状说明同时考虑候选变异相同或高度相关，以及 profile likelihood 所反映的效应相近程度，再执行以下操作。

| 残差中的候选关系 | 更新方式 |
|---|---|
| 联合候选与两侧最佳候选均相容 | 用 SEC 联合安排弱更新，并保留各性状的平滑权重 |
| 联合候选与两侧均不相容 | 分别更新各自的最佳变异 |
| 一侧被更强的性状特异信号主导 | 用 D-SEC 暂缓联合更新，先处理强信号，再比较更新后的残差 |

这种递进过程旨在减少强信号遮蔽弱共享效应，以及 LD 导致的边际关联误配；一次迭代的相容性判断本身并不是共享因果变异的正式检验。疾病优先模式的 E-SEC 则以目标 GWAS 当前最佳候选为起点，在相容的分子性状中重新寻找联合候选，优先拟合与疾病有关的共享分量。

## 从 LD 平滑概率到 CoS 与 VCP

v3 对不确定性的构造给出了更完整的解释。对单个性状的一轮更新，算法用平滑概率分布替代硬选一个 SNP：

$$
\omega_j^{(k)}=
\frac{\delta_j^{(k)}\exp\{a_j^{(k)}/\tau\}}
{\sum_m\delta_m^{(k)}\exp\{a_m^{(k)}/\tau\}}.
$$

$a_j^{(k)}$ 来自变异与当前残差的关联强度，$\delta_j^{(k)}$ 同时利用与最佳候选的 LD 和残差关联证据，$\tau$ 控制分布的集中程度。这里的“proximity”主要指 LD 关系，而非基因组物理距离。作者将其解释为由平滑优化导出的 Gibbs 分布，明确区别于贝叶斯模型下的后验。

拟合后，算法把相关 SEC 轮次聚为单效应分量 $s$，按 profile log-likelihood 的改善量加权平均各轮概率，得到性状内的 $\xi_{jl}^{(s)}$。随后对共享性状集合 $T(s)$ 进行对数汇合并归一化：

$$
\xi_j^{(s)}\propto
\exp\left\{\frac{\nu}{|T(s)|}
\sum_{l\in T(s)}\log\xi_{jl}^{(s)}\right\},
\qquad \nu=1.5\ \text{为默认值}.
$$

**CoS（Colocalization Confidence Set）**按 $\xi_j^{(s)}$ 排序，取累计质量达到默认 0.95 的最小变异集合，并保留其共享性状配置；此外还过滤低 LD 纯度和贡献过小的分量。**VCP**再跨分量聚合：

$$
\operatorname{VCP}_j=1-\prod_s\left(1-\xi_j^{(s)}\right).
$$

因此 VCP 并非任意的排序分数，而是有明确概率构造和经验评估的变异层面共定位量；其用途类似 PIP，但**不是由完整贝叶斯生成模型计算的后验包含概率**。跨分量聚合采用条件独立近似，不能只因逐步残差拟合就把独立性视为已证明。95% 累计质量也不自动给出所有场景下的 95% 频率学覆盖或 FDR≤5% 保证。

## ROSMAP 基因型模拟中的校准与功效

模拟使用 1,162 名 ROSMAP 个体的真实基因型，选取不同 TAD 中的 1,287 个 cis 区域，考察多个因果变异和不同共享性状配置。xQTL 主实验将每个因果变异的表型方差解释比例设为 5%；较弱的目标性状在主要疾病优先实验中设为 2%–4%。这些设定用于在给定样本量下比较强弱信号，不是对真实 GWAS 效应大小分布的完整模拟。

CoS 层面的 FDR 同时惩罚两类错误：集合未包含真实因果变异，或共享配置纳入了不共享该效应的性状。功效按正确捕获的真实变异–性状关系评估，不能与单纯的位点检出率混用。v3 延续主实验平均功效 0.934、FDR 低于 5% 的报告；在部分两性状场景 COLOC v5 表现相近，弱目标性状和较复杂配置更能体现联合建模的收益。

比较设置也影响解释：作者为 COLOC 等方法从变异概率构造类似的 95% 集合，COLOC 的共享假设要求高于其他假设，而非一律采用 $PP.H4>0.8$。与 OPERA 的比较则统一到基因／区域层面，不能把不同粒度的功效直接并列。

v3 Figure 2f–g 增补了单性状特例 **FineBoost** 的概率评估：其 VPA 与 SuSiE PIP 在图示模拟中相关约为 0.97–0.99，分箱概率与观测因果频率也较吻合。这加强了单性状概率解释的经验依据，但不能代替多性状 VCP 在各种残差相关和共享配置下的校准检查。

[[figure:fig2]]


## ROSMAP 的 17 组 QTL 与多组学信息增益

研究分析 16,928 个基因，整合 6 类脑细胞的单核 RNA-seq pseudobulk eQTL、4 组 bulk eQTL、6 组 productive／unproductive sQTL，以及 1 组 pQTL。bulk eQTL 中包含外周单核细胞，因此并非所有测定都来自脑组织。以下为 **v3 Table 2** 的实际分析样本量：

| 数据 | donor 数量 |
|---|---:|
| 6 类细胞 pseudobulk eQTL | 各 419 |
| bulk eQTL：DLPFC / AC / PCC / 单核细胞 | 784 / 593 / 441 / 226 |
| bulk sQTL：DLPFC / AC / PCC，各含两类剪接 | 806 / 603 / 449 |
| DLPFC pQTL | 416 |

AC 沿用原表缩写，Methods 与 Table 2 对其全称存在不同表述。作者概述中的平均样本量 595 也不能直接由这 17 组样本量的简单平均重现，故以分层规模为准，不将其解释为完整配对的多组学 donor 数。

v3 正文报告 **18,654 个共定位事件，涉及 11,257 个基因、16,504 个不同的 95% CoS**；摘要仍为 16,503 个不同事件。事件数、基因数和去重集合数应分别理解，摘要与正文去重计数相差 1 的原因仍不明确。

10,237 个事件涉及至少一类脑细胞 eQTL。仅保留 10 个 eQTL context 的消融分析能发现其中 82.1%，其余 17.9% 需要加入 sQTL／pQTL 后才能检出。这支持跨分子层的统计信息增益；但“只在一类细胞检出”仍可能反映功效差异，不能直接推断其他细胞中的效应严格为零。

## 分样本重现与外部功能证据

v3 将 ROSMAP DLPFC eQTL 数据随机拆分后，与同一份 AD GWAS 共定位：二分之间共享的位点为 ColocBoost 26 个、COLOC 14 个。另将 UKB LDL GWAS 二分并固定 GTEx 肝脏 eQTL，跨分组共享位点分别为 30 和 19 个，完整数据发现的恢复率分别为 65.7% 和 51.5%。这是固定另一侧数据时的重现性分析；完整数据的发现不是已知真值，不能把恢复率解释成准确率或独立外部验证。

功能支持来自不同证据层级：K562 CRISPRi／STING-seq 的调控元件–基因关系、脑组织 promoter-capture Hi-C 的物理接触，以及 ENCODE-rE2G 的预测 enhancer–gene links。与这些目录的一致性提供相互补充的支持，但不能据此声称所有新增脑或 AD 位点都已完成相关细胞背景中的实验验证。

作者还把 VCP 汇总为连续功能注释，在 57 个复杂性状的 S-LDSC 中评估遗传力富集及条件贡献。富集说明注释与遗传力分布有关，不是这些分子表型介导疾病遗传力的比例。

## AD 共定位：集合层面证据与变异定位不确定性

AD 联合分析的 **188 个事件对应 120 个不同位点**，成对 COLOC 结果并集（COLOC-union）为 48 个，因此 2.5 倍是位点层面的比较。Figure 6a 中有 63 个 ColocBoost 位点未与同一 GWAS 的 fine-mapping 集合重叠；正文的 61.8% 存在分母疑义，这里保留可由原图核对的计数。

遗传力的比较对象也必须区分：正文报告 ColocBoost 集合对应的 AD 遗传力接近 COLOC-union 的两倍；**将 ColocBoost 与 GWAS fine-mapping 集合取并集**后，估计解释量是单独 fine-mapping 的约 1.6 倍。不能把这两句合并成“ColocBoost 单独比 fine-mapping 高两倍”；作者也提醒单疾病 LDSC 估计可能不稳定。

**BLNK** 的 AD 关联为提示性水平（$p=1.1\times10^{-7}$）。其 CoS 包含 22 个高 LD 变异，最高 VCP 仅 0.095，却有集合层面的 AD、微胶质细胞及 bulk eQTL 共享证据。若仅用 VCP>0.1 筛选单变异，会漏掉这个集合；反过来，检测到 CoS 也不意味着已经确定其中某个变异为因果变异。

**CTSH** 有三组 CoS，其中只有一组与 AD 共享，同时涉及星形胶质细胞、兴奋性神经元 eQTL、unproductive sQTL 和 pQTL。该组含两个高相关变异（$r=0.975$），其中 rs2289702 的 VCP 为 0.415；另外两组并未与 AD 共定位。表达、剪接和蛋白效应的对应关系为调控机制提供线索，尚不能据此确定唯一因果变异、作用方向或中介链条。

[[figure:fig6]]


## 对方法开发的启发与边界

当前默认实现不显式建模跨性状残差相关。v3 Discussion 明确报告：**残差相关 $\rho\geq0.7$ 时，部分因果配置会出现 FDR 膨胀**。ROSMAP 中较低的估计残差相关不能转化为“样本重叠总是安全”；共享样本和残差相关是相关但不同的问题。

LD 参考不匹配同样会影响定位和错误控制。v3 报告的不同 LD panel 敏感性实验主要针对单性状 FineBoost，不能直接推广为多性状 GWAS–xQTL 联合分析的保证。大量高度相关的 ATAC 或甲基化特征仍有计算扩展问题，当前线性模型也不能自动捕获非线性调控关系。

对方法开发，可考虑把 AlphaGenome 等功能预测作为平滑或联合更新的辅助信息，但需要重新检查信息重复使用、概率校准和 FDR。v3 将功能注释引入 SEC 仍列为未来方向，这不是当前版本已完成的功能。

**代码与复现：**[ColocBoost R 包](https://github.com/StatFunGen/colocboost) · [官方教程](https://statfungen.github.io/colocboost/) · [论文分析代码与数据](https://github.com/StatFunGen/colocboost-paper) · [数值结果存档](https://doi.org/10.5281/zenodo.15215225)

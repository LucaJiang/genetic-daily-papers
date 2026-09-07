---
{
  "published": true,
  "title": "Using sequence-to-function models to interpret archaic hominin introgression",
  "shortTitle": "AlphaGenome：古人类渗入变异的功能预测与实验边界",
  "authors": "Maddy Comerford et al.",
  "date": "2026-09-01",
  "source": "bioRxiv",
  "version": "v1",
  "doi": "10.64898/2026.08.31.748430",
  "paperUrl": "https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1",
  "pdfUrl": "https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1.full.pdf",
  "codeUrl": "https://gitlab.svi.edu.au/igr-lab/asnps_alphgen/",
  "priority": "worth-reading",
  "readingType": "本周新作",
  "summary": "用巴布亚 LCL 和 MPRA 验证 AlphaGenome 对古人类渗入变异的预测：基线活性预测良好，等位基因表达效应相关接近零，可及性效应有较弱且依实验终点变化的支持。",
  "whyItMatters": "直接检验序列模型分数能否迁移到真实变异效应，并区分背景活性、局部调控潜力与内源基因表达三个任务。",
  "keyResults": [
    "LCL 变异效应相关：RNA ρ=0.012，ATAC ρ=0.111；良好的基线活性预测没有自动转化为准确的等位基因效应预测。",
    "同一批 67 个 ATAC 变异中，预测与 MPRA 的相关为 0.562，与 LCL 可及性差异为 0.075，实验终点影响验证结论。"
  ],
  "topics": [
    "foundation-models",
    "functional-annotation",
    "statistical-genetics"
  ],
  "peerReviewed": false,
  "inlineFigures": true,
  "figures": [
    {
      "id": "fig1",
      "kind": "validation",
      "label": "Figure 1 · LCL 中的等位基因效应验证",
      "caption": "A/B 比较 RNA 与 ATAC 效应相关，C/D 展示极端预测分数筛选后的方向一致率。E 实际纵轴为 Spearman ρ，F 首组为 TSS 距离；与原图注部分表述不一致，这里以图面和结果正文为准。",
      "alt": "A/B 比较 RNA 与 ATAC 效应相关，C/D 展示极端预测分数筛选后的方向一致率。E 实际纵轴为 Spearman ρ，F 首组为 TSS 距离；与原图注部分表述不一致，这里以图面和结果正文为准。",
      "sourceUrl": "https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1.full.pdf#page=13",
      "assetPath": "/figures/alphagenome-archaic-introgression-fig1.png",
      "credit": "Comerford et al., bioRxiv v1 (2026-09-01), Figure 1",
      "license": "CC BY-NC 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
      "sourceCheck": "uploaded-full-text-and-complete-original-figure; PDF page 13",
      "imageVerified": true
    },
    {
      "id": "fig2",
      "kind": "validation",
      "label": "Figure 2 · MPRA 与内源 LCL 测量的差异",
      "caption": "A 实际为相关系数森林图，区分 RNA/ATAC、渗入来源与差异活性集合，并非原图注所称的绝对分位数分布。B 固定共有变异比较两类实验终点，避免用不同集合的相关系数直接推断优势。",
      "alt": "A 实际为相关系数森林图，区分 RNA/ATAC、渗入来源与差异活性集合，并非原图注所称的绝对分位数分布。B 固定共有变异比较两类实验终点，避免用不同集合的相关系数直接推断优势。",
      "sourceUrl": "https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1.full.pdf#page=17",
      "assetPath": "/figures/alphagenome-archaic-introgression-fig2.png",
      "credit": "Comerford et al., bioRxiv v1 (2026-09-01), Figure 2",
      "license": "CC BY-NC 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
      "sourceCheck": "uploaded-full-text-and-complete-original-figure; PDF page 17",
      "imageVerified": true
    },
    {
      "id": "suppfig13",
      "kind": "real-data",
      "label": "Supplementary Figure 13 · 单倍型上的极端 ATAC 分数",
      "caption": "完整保留 JAK1、TAB2、DUSP5 与 LOXL2 四个区域。每个点为单 SNP、每行为 biosample，橙绿对应相反方向的极端分数；星号为校正后的富集信号。这些是单变异预测的聚集，不是整条单倍型的联合效应曲线。",
      "alt": "完整保留 JAK1、TAB2、DUSP5 与 LOXL2 四个区域。每个点为单 SNP、每行为 biosample，橙绿对应相反方向的极端分数；星号为校正后的富集信号。这些是单变异预测的聚集，不是整条单倍型的联合效应曲线。",
      "sourceUrl": "https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1.full.pdf#page=49",
      "assetPath": "/figures/alphagenome-archaic-introgression-suppfig13.png",
      "credit": "Comerford et al., bioRxiv v1 (2026-09-01), Supplementary Figure 13",
      "license": "CC BY-NC 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
      "sourceCheck": "uploaded-full-text-and-complete-original-figure; PDF page 49",
      "imageVerified": true
    }
  ],
  "reviewedAt": "2026-09-07",
  "readingDepth": "full-text"
}
---

**全文解读｜bioRxiv v1，2026-09-01 公开，尚未经同行评议。** 本文依据 50 页 PDF 主文、Methods、主图 1–5 和补图 1–13。末页仅有补充表 1–8 的标题，没有表格内容，完整 track 清单及候选列表尚未逐项核验。[论文与 PDF](https://www.biorxiv.org/content/10.64898/2026.08.31.748430v1) · [分析代码](https://gitlab.svi.edu.au/igr-lab/asnps_alphgen/)

## 研究问题与数据

本文检验：在人群功能基因组数据较少的场景中，AlphaGenome 能否帮助筛选古人类渗入产生的功能变异？需要区分两个任务：预测一个区域通常是否开放、一个基因通常是否表达；预测改变某个等位基因后，可及性或表达会怎样变化。前者准确，并不保证后者准确。

作者借助 **249 位巴布亚新几内亚个体**的既有全基因组测序识别渗入单倍型，再聚焦具有实验细胞系的 **11 位巴布亚祖源供者**。渗入鉴定结合与古人类共享、在 YRI 中缺失的变异、LD 分块、不完全谱系分选检验及与古人类基因组的相似性；排除少于 5 个 SNP 的单倍型等低可信片段。最终分析 **144,139 个 aSNP**，按来源分为 Denisovan 52,705 个、Neanderthal 1KG 40,583 个和 Neanderthal PNG 50,851 个；总集合中有 67,170 个在这 11 人中呈多态性。后两组分别指也见于千人基因组大陆欧亚人群、或仅在本研究巴布亚样本中检出的尼安德特人样单倍型，不是供者的两种当代祖源。

新生成的实验数据为 **11 个 LCL 的 ATAC-seq、其中 9 个 LCL 的 RNA-seq**。模型使用 GM12878 这一欧洲样祖源供者来源 LCL 的预测轨道。作者讨论了训练资源 GTEx、ENCODE 的祖源代表性局限；本文是既有模型的外部实验评估，没有重新训练 AlphaGenome，也没有提供能量化祖源训练覆盖度的样本清单。

## 从序列到分数，具体比较的是什么

作者通过 `dna_model.score_variant`，以变异为中心输入约 **1 Mb 序列**。除表示基线活性的 ACTIVE 分数外，RNA 使用 `GeneMaskLFCScorer`，ATAC 使用 `CenterMaskScorer` 生成等位基因间的预测 log₂ fold change。ATAC 的计分区域是变异中心 **501 bp**；RNA 结果保留选定变异—基因配对和 polyA-plus 输出。结果部分描述：落在蛋白编码基因内时保留该基因，否则选择最近 TSS 对应基因，得到 **129,004 个 aSNP、6,094 个基因**的表达预测。

差异分数统一定向为“渗入等位基因相对非渗入等位基因”，正值表示渗入等位基因预测活性更高。这个定向与参考/替代等位基因、正负链是不同的问题；正文没有交代同一 biosample 内多轨道和正负链的具体合并实现，不能自行补写成取最大值或平均。

同一轨道内可检查 raw score；跨组织比较使用经验分位数 $q$，参照约 **30 万个、至少一个 gnomAD v3 人群 AF ≥ 0.01** 的背景变异。差异分数的 $q$ 有符号，作者以 $|q|\geq0.9$ 等阈值定义极端分数。**$q$ 是相对背景的排序，既不是检验 p 值，也不是因果概率或 PIP。** 文中 98.3% 的 RNA 原始预测满足 $|\log_2FC|<0.01$，因此很高的分位数也可能对应很小的表达变化。

实验比较则按是否携带渗入等位基因分组，以 Hedges’ $g$ 衡量组间差异，结果部分要求两组都有足够供者计算方差。这是经小样本校正的标准化均值差，**不等于 log₂FC，也不是大样本 eQTL 回归系数**。筛选后有 RNA 8,407 个 aSNP、对应 651 个基因；ATAC 1,520 个可测 aSNP。每个位点分组会变化，小样本、连锁以及整个人的遗传背景都会影响实验比较。

## 最值得看的验证结果

基线预测表现良好：判别实验中表达基因的 AUROC 为 **0.942**，判别开放染色质为 **0.956**；预测表达与平均实测表达的 Spearman $\rho=0.80$，预测可及性与平均实测峰强度的 $\rho=0.71$。但变异效应预测明显更难：

| 实验比较 | RNA 预测 | ATAC 预测 |
|---|---:|---:|
| 与巴布亚 LCL 的 Hedges’ $g$ 相关 | $\rho=0.012$，$p=0.270$ | $\rho=0.111$，$p=1.1\times10^{-5}$ |
| LCL 效应方向一致率 | 50.5%，单侧二项 $p=0.186$ | 52.6%，单侧二项 $p=0.022$ |
| 与 MPRA 的等位基因效应相关，Fig. 2A 可比较集合 | $\rho=0.072$，$n=1,879$ | $\rho=0.230$，$n=1,951$ |
| 限于 MPRA 差异活性变异 | $\rho=0.155$，$n=178$ | $\rho=0.435$，$n=180$ |

这里的随机方向基线是 **50%**，不是“预测零表达”。RNA 即使只看预测效应绝对值较大的变异，方向一致率也没有明显改善。ATAC 的整体相关虽显著，效应量仍弱；集中到预测最极端的变异后，方向一致性明显提高，适合支持候选优先级，不能解读成对任意变异都有可靠预测。

[[figure:fig1]]

MPRA 来自既有独立实验，最初测试 17,078 个在巴布亚人群 AF > 0.15 的渗入变异；1,951 个被判定具有活性，其中 180 个具有等位基因差异活性。它比较两种等位基因置于**染色体外报告载体**后的报告基因表达，测量短序列的调控潜力；LCL 实验测量的是供者细胞内的内源表达与可及性，包含连锁变异、cis/trans 背景和染色质环境。报告基因表达不是对应内源靶基因表达，ATAC 预测与 MPRA 相关也不等于正确预测了靶基因。

在同时具有 MPRA 与 LCL 数据的 **67 个 ATAC 变异**上，同一模型分数与 MPRA 的相关为 **0.562**，与 LCL 可及性差异仅 **0.075**；配对 bootstrap 的相关差异约 0.49，图中 $p=0.0001$。RNA 的共有集合为 179 个，两类实验相关均缺乏稳健证据。这个配对比较比横跨不同变异集合比较更有说服力，但集合仍很小。MPRA 差异活性变异的方向一致率为 ATAC **67.2%**、RNA **56.7%**；RNA 相关的 bootstrap 区间跨零，不能只依据一个名义 p 值强调成功。

[[figure:fig2]]

## 组织与单倍型分析能支持到哪一步

作者进一步得到 15 类 biosample 的 ATAC 预测和 20 类的 RNA 预测；实验验证仍主要限于 LCL。鉴于 RNA 效应表现，后续功能筛选集中使用 ATAC。50,010 个 aSNP 在至少一个 biosample 中满足 $|q|\geq0.9$；其中 14,818 个只在一种 biosample 中达到阈值。组织分组大体反映免疫、非免疫及永生化细胞系差异，但这是**预测的组织结构**，不是新增多组织实验验证。

单倍型分析也不是把整条渗入单倍型一起输入模型。作者先分别预测单 SNP，再统计每条单倍型有多少个极端分数。除简单二项模型外，还用 TSS 距离和 HOMER 注释建模每个 SNP 超阈值的概率：

$$
\operatorname{logit}(p_i)=\beta_0+\beta_1\log_{10}(d_i)+\beta_{\mathrm{annotation}(i)}.
$$

随后用 Poisson-binomial 分布比较观察到的极端 SNP 数与期望，按 biosample×阈值分别进行 BH 校正。$|q|\geq0.9$ 时，60,341 个可检验组合中有 **186 条单倍型、369 个单倍型×biosample 组合**出现过量信号。该基线假定 Bernoulli 项独立；局部序列环境及连锁相关使它更适合描述聚集、排序候选，而不能据此确定多个独立因果变异。

**JAK1、TAB2 是邻近候选基因案例。** 补图 13 的 JAK1 附近丹尼索瓦单倍型含 56 个 aSNP、跨度 136 kb、AF 0.30，TSS 在片段下游 54 kb；TAB2 附近片段含 45 个 aSNP、跨度 53 kb、AF 0.19，TSS 在下游 50 kb。二者在免疫 biosample 中有较多极端 ATAC 分数，但同一片段同时可有正、负预测。这没有证明片段整体提高或降低 JAK1/TAB2 表达，更没有完成变异到靶基因的实验验证。

[[figure:suppfig13]]

## 可以迁移到功能注释研究的想法

**以下是方法启发，并非本文已经验证的结果。** 可以保留组织匹配的 ATAC raw score 与 $|q|$，结合实测 peak、距 TSS 距离和 enhancer–gene 链接，作为可分解的候选注释；用独立 caQTL、精细定位变异或扰动实验检查各注释的增益，并按基因座划分训练验证集，防止 LD 泄漏。要区分“局部序列有调控潜力”“目标组织可及性改变”“影响哪个基因”这三个环节，避免用一个分数替代整条证据链。

若进一步用于 fine-mapping，应通过独立数据学习和校准注释先验，评估可信集合覆盖、PIP 校准及注释对 LD 的敏感性；**本文没有把 AlphaGenome 分数放入 SuSiE，也没有报告 PIP 的改进。** RNA 的负结果同样只能限定在这里的渗入变异、小样本 LCL 和基因配对方案，不能外推为 AlphaGenome 表达预测普遍无效。作者也指出：已精细定位 eQTL 富含真正具有可测效应的变异，与本研究未经功能富集的渗入 SNP 集合不同。

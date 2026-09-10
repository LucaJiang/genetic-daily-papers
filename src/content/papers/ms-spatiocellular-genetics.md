---
{
  "published": true,
  "title": "Multiancestry genome-wide association and multiomics analyses elucidate spatiocellular features of multiple sclerosis genetics",
  "shortTitle": "MS 遗传学：从跨祖源 GWAS 到细胞亚群与病灶空间",
  "authors": "Rintaro Fujimoto, Kotaro Ogawa, Shinichi Namba et al.",
  "date": "2026-09-07",
  "source": "Nature Genetics",
  "doi": "10.1038/s41588-026-02741-5",
  "paperUrl": "https://www.nature.com/articles/s41588-026-02741-5",
  "pdfUrl": "https://www.nature.com/articles/s41588-026-02741-5.pdf",
  "resourceUrl": "https://humandbs.biosciencedbc.jp/en/hum0197-latest",
  "priority": "must-read",
  "readingType": "本周新作",
  "kind": "paper",
  "summary": "将日本、欧洲、非洲和美洲祖源的 MS GWAS 与患者 PBMC、脑病灶单核及空间转录组连接起来。scDRS 使用跨祖源结果定位 CD4 T 亚群和内皮细胞，gsMap 使用欧洲祖源结果比较活动与非活动病灶。重点是多基因证据怎样映射到细胞和空间，而不是将富集直接解释成细胞特异 eQTL 或因果机制。",
  "whyItMatters": "提供一条完整的 GWAS→基因集→细胞亚群→空间微环境分析链，并明确区分 scDRS 与 gsMap 的祖源输入、单细胞和供体计数、空间显著性与因果解释。",
  "keyResults": [
    "各 GWAS 分析合计报告 22 个新易感位点；跨祖源 meta-analysis 包含 29,374 个病例、1,843,563 个对照，检出 156 个显著位点。",
    "PBMC 来自 20 名 MS 患者、163,541 个细胞；脑单核数据为 6 名患者的 7 个病灶、74,686 个细胞。",
    "scDRS 将 MHC 外的前 1,000 个 MAGMA 基因与 1,000 组 Monte Carlo 对照基因集结合，在各数据集内控制细胞类型检验的 BH FDR。",
    "gsMap 联合分析 8 张活动性与 4 张非活动性病灶切片，血管浸润区和病灶边缘的 MS 关联最突出；切片不是独立供体计数。"
  ],
  "topics": ["QTL", "single-cell", "statistical-genetics", "fine-mapping", "functional-annotation", "resources"],
  "peerReviewed": true,
  "inlineFigures": true,
  "reviewedAt": "2026-09-10",
  "readingDepth": "正式版正文/PDF、Methods、Figures 1–3、相关 Extended Data、补充 Figures 2–4 与 Supplementary Table 1；未重跑 GWAS、scDRS 或 gsMap，未逐项核查全部 HLA 结果表",
  "figures": [
    {
      "id": "fig1", "label": "Figure 1 · 单祖源与跨祖源 MS GWAS",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02741-5/MediaObjects/41588_2026_2741_Fig1_HTML.png",
      "sourceUrl": "https://www.nature.com/articles/s41588-026-02741-5/figures/1",
      "assetPath": "/figures/ms-spatiocellular-fig1.png",
      "alt": "MS 原论文 Figure 1，依次为日本、欧洲、非洲祖源和跨祖源 GWAS 的 Manhattan 图。",
      "caption": "a–d 分别为日本、欧洲、非洲和跨祖源分析，虚线为 p=5×10⁻⁸，红色标记新位点。不同祖源的病例数差异很大，显著位点数量不能直接比较为遗传贡献大小；d 的跨祖源总数也不是四个同等规模队列。",
      "credit": "Fujimoto, Ogawa et al., Nature Genetics (2026), Figure 1.",
      "license": "CC BY-NC-ND 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "kind": "real-data", "imageVerified": true,
      "sourceCheck": "使用出版商原始 PNG，未改色、裁切、重绘或重新编码；主文和补充表 1 已对照。"
    },
    {
      "id": "fig3", "label": "Figure 3 · scDRS 细胞关联与 gsMap 空间关联",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02741-5/MediaObjects/41588_2026_2741_Fig3_HTML.png",
      "sourceUrl": "https://www.nature.com/articles/s41588-026-02741-5/figures/3",
      "assetPath": "/figures/ms-spatiocellular-fig3.png",
      "alt": "MS 原论文 Figure 3，PBMC 和脑病灶细胞的 scDRS 分数，以及活动/非活动病灶的 gsMap 空间结果。",
      "caption": "a–d 使用跨祖源 GWAS；b、d 横轴为未校正 p 值的 −log10，深蓝表示各数据集内 BH FDR<0.05。e–g 使用欧洲祖源 GWAS；f 按活动状态用 Cauchy 方法合并 spot p 值，g 比较两种状态的关联显著性。不同状态的 −log10(p) 差异不是直接的交互效应估计，也不是纵向追踪同一病灶。",
      "credit": "Fujimoto, Ogawa et al., Nature Genetics (2026), Figure 3.",
      "license": "CC BY-NC-ND 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "kind": "real-data", "imageVerified": true,
      "sourceCheck": "完整 a–g 面板与图注已核查；本地资产与出版商原始 PNG 字节一致。"
    }
  ]
}
---

## 核心问题：易感性信号落在哪些细胞和空间微环境

这项研究把多发性硬化（MS）的群体遗传学与患者组织中的细胞、空间异质性联系起来。它包含三个相连但不同的层次：跨祖源 GWAS 寻找易感位点；HLA 条件分析细化 MHC 关联；用 scDRS 和 gsMap 将多基因信号映射到细胞类型及病灶微环境。**后两者不是在这些细胞中重新做 eQTL，也不是给每个细胞计算个体遗传风险。**[正文与 Methods](https://www.nature.com/articles/s41588-026-02741-5)

论文的价值不只在新位点数量，而在于如何将遗传信息接到真实的患者单细胞和病灶空间数据，并保留祖源、组织来源和统计检验层次之间的区别。

## GWAS 数据：四个祖源，并非四个同等规模样本

日本分析来自两个队列：627 个病例与 52,019 个对照，以及 61 个病例与 153,180 个对照。合计 **688 个病例、205,199 个对照**，保留约 886 万个满足插补质量和频率条件的变异。欧洲祖源 meta-analysis 包含 **27,572 个病例、1,436,801 个对照**；非洲祖源包含 **819 个病例、155,904 个对照**；美洲祖源的 All of Us 数据贡献 295 个病例与 45,659 个对照。[Supplementary Table 1](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41588-026-02741-5/MediaObjects/41588_2026_2741_MOESM3_ESM.xlsx)

跨祖源汇总的报告样本量为 **29,374 个病例、1,843,563 个对照**。欧洲祖源仍提供绝大多数病例；不能仅根据总对照数很大，就认为各祖源都有相近的检验功效。补充表也注明部分既往欧洲研究样本重叠，因此简单相加每一行并不能自动得到独立样本量。

作者将汇总统计统一到 hg19，核对链方向，按 MAF>0.5%、插补质量 R²>0.7 筛选，并要求变异至少出现在两个数据集。主要采用 METAL 固定效应 meta-analysis；涉及样本重叠时使用 RE2C 中的 Lin–Sullivan 方法。FUMA 定义独立关联位点，新位点按 lead variant 周围 ±250 kb 是否含既往报告变异判定。[Methods，GWAS meta-analysis](https://www.nature.com/articles/s41588-026-02741-5#Sec16)

## 新位点与祖源差异：先分清发现口径

日本分析检出 MHC 和 11q24 两个达到 p<5×10⁻⁸ 的位点。11q24 的 rs2199759 报告 OR=1.58、p=2.1×10⁻⁸，是本文在日本数据中发现的新关联。作者结合附近 ETS1 的既往功能证据提出调控解释，但本文没有直接证实该变异到 ETS1 的增强子作用链，不能把位置与已有生物学知识当作实验验证。

欧洲和非洲单祖源分析分别检出 153 和 2 个显著位点；跨祖源分析检出 **156 个位点**，其中三个新位点未在单祖源分析中达到显著。**22 个新易感位点是作者对各分析的整体报告口径，不是说跨祖源分析在既有单祖源结果之外又新增 22 个。**

[[figure:fig1]]

在欧洲显著且可在日本检测的 125 个位点中，24 个在日本名义显著，11 个表现出名义效应异质性；效应大小的 Spearman 相关为 0.67。rs2199759 在其他人群中未见相同关联，为进一步研究祖源相关调控提供线索，但“一个祖源显著、另一个不显著”本身不能单独证实祖源特异因果效应，仍要考虑频率、插补、样本量与正式异质性检验。

## HLA 精细定位：经典等位基因和氨基酸位点的联合条件分析

作者以 **1,118 人的日本 HLA 参考面板**进行 DEEP*HLA 插补，同时分析两位、四位经典 HLA 等位基因及氨基酸多态性。此处的 fine-mapping 是基于 logistic 回归的前向条件分析，不是给出 SNP PIP 或 Bayesian credible set。

对于有 $m$ 个残基状态的氨基酸位置，作者用 $m-1$ 自由度的似然比 omnibus 检验；条件于某个位置时，纳入该位置全部氨基酸状态，而非只放入一个最显著残基。分析依次识别 **HLA-DQβ1 第 9 位、HLA-DQA1*03:01、HLA-DRB1*15:01、HLA-DQβ1 第 125 位**相关的四个条件信号。四项条件化后，HLA 变异不再达到全基因组显著，但仍有 SNP rs9266359 达到 p=2.6×10⁻⁸。[Figure 2 与 HLA Methods](https://www.nature.com/articles/s41588-026-02741-5#Fig2)

作者还将非加性条件项加入模型，仍识别到同样的四项关联。只分析经典 HLA 或只分析氨基酸，会得到不同的条件信号集合；HLA-DQA1*03:01 与 DQβ1 第 57 位丙氨酸的 LD 较高。论文未能从模型比较中明确判定一个唯一最优模型，因而四个条件信号不应被等同为四个已经独立实验确证的因果因素。

## scDRS 的输入与检验：基因集富集而非细胞基因型关联

患者 PBMC 来自 **20 人、163,541 个细胞**，注释为 8 个大类与 29 个细分类型。脑病灶单核数据来自 **6 名患者的 7 个病灶、74,686 个细胞**；去除 T、B 和髓系细胞后剩 66,402 个细胞。这些细胞数与供体数不能互换。

scDRS 使用**跨祖源 GWAS meta-analysis**。作者先用 MAGMA 计算基因关联，将 MHC 区域（chr6:25–34 Mb）以外排名前 **1,000 个基因**作为候选疾病基因集；然后聚合每个细胞中的相关表达，构造 **1,000 组 Monte Carlo 对照分数**，归一化后进行单细胞和细胞类型层面的分析。协变量包括每细胞检测到的基因数、年龄和性别，细胞类型检验在各数据集内用 BH 控制 **FDR<0.05**。[Methods，Detection of cell types associated with MS](https://www.nature.com/articles/s41588-026-02741-5)

因此，显著性表示这些细胞携带更集中的疾病关联基因表达信号，不是患者病例/对照差异表达，也不是直接在该细胞类型发现了 cis-eQTL。跨祖源 GWAS 提供基因排序，并不意味着同时估计了每个祖源、每种细胞状态的遗传调控效应。

## PBMC 和脑病灶：CD4 T 谱系与非免疫细胞的证据

PBMC 中，CD4⁺ T 细胞达到显著；细分后包括 naive CD4 T、中央记忆 T、效应记忆 T，以及 memory Treg。图中给出的是名义 p 值，例如 memory Treg 为 0.0040，而深蓝颜色表示通过 BH FDR。作者观察到 memory Treg 的关联强于 naive Treg；这不是两个亚型之间差异的直接检验，不能仅凭一个显著另一个不显著断言二者效应不同。

作者使用 AIDA phase 1 Data Freeze v2 的 **1,219,548 个细胞**重复分析，支持 CD4 T 谱系相关性。AIDA 的注释从多个层级重新组合，不能把注释名称相近直接视为每个亚型都一一对应。

脑病灶中，T 细胞、髓系细胞、内皮细胞和 B 细胞通过 FDR；相应名义 p 值为 0.0010、0.0010、0.0040、0.0070。去除免疫细胞后重新分析，内皮仍显著，星形胶质与基质细胞也出现显著信号。后者属于**改变分析细胞集合后的结果**，不是完整脑细胞分析中本来就同样显著。[正文与 Supplementary Figures 2–3](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41588-026-02741-5/MediaObjects/41588_2026_2741_MOESM1_ESM.pdf)

敏感性分析将 MAGMA 基因数改为 500–1,500。总体排序有相似性，但不能概括成所有门槛下显著结论完全不变：Supplementary Figure 4 中，PBMC CD4 T 在 500 和 1,500 基因时标为 FDR≥0.05。该图支持一定的模式稳定性，不支持阈值选择完全无关紧要。

## gsMap 联合切片分析：空间特异性如何连接到 GWAS

空间部分来自 10x Visium 的 **12 张 MS 病灶切片：8 张活动性、4 张非活动性**。作者使用原研究定义的六种 niche：血管浸润区（VI）、病灶边缘（LR）、病灶核心（LC）、斑块周围白质（PPWM）、室管膜及灰质。这里的 spot 可能混合多种细胞，niche 也不是单一细胞类型。

与 scDRS 不同，**gsMap 使用欧洲祖源 GWAS meta-analysis**，原因是该方法按单祖源 GWAS 设计。作者没有将混合祖源汇总结果直接交给单祖源 LD 建模步骤。使用 joint analysis mode 后，流程为：跨 12 张切片建立统一均值参照；学习 spot 的潜在表示；为每个 spot 寻找同质邻域并生成基因特异性分数；依据 TSS 信息把分数映射到 SNP 注释；计算分层 LD score 并执行空间 LD score regression；最后在相同病灶状态下用 **Cauchy combination** 汇总 spot p 值，得到 niche 层面结果。[Methods，Spatially resolved mapping](https://www.nature.com/articles/s41588-026-02741-5)

这种联合模式减少了逐切片独立处理造成的尺度不可比，但不会自动让多个切片或多个 spot 成为独立患者，也不等于已经拟合供体层面的随机效应。

[[figure:fig3]]

## 活动病灶的血管浸润区和边缘最突出

活动性病灶中，VI、LR、LC、PPWM 的组合 p 值分别为 **2.9×10⁻¹²、5.0×10⁻¹¹、5.2×10⁻⁷、3.9×10⁻⁶**。非活动性病灶的相应值为 **2.0×10⁻⁹、4.5×10⁻⁵、0.0010、0.019**。VI 与 LR 的活动性相关模式最明显。VI 富含内皮、基质和免疫细胞，LR 富含髓系细胞，与血管周围浸润和脱髓鞘的组织结构相联系。

但两组样本分别有 8 和 4 张切片，Figure 3f–g 比较的是关联的显著性，不是一个校准后的“活动状态×遗传效应”交互系数。**较小的 p 值不直接表示较大的遗传效应**，也不能把不同病灶的横断面比较写成同一病灶随时间发展的纵向轨迹。

作者另外使用类风湿关节炎、系统性红斑狼疮、溃疡性结肠炎、克罗恩病、过敏等免疫表型，以及阿尔茨海默病、抑郁和 LDL 等对照表型的 GWAS，观察到活动病灶 VI/LR 对 MS 的关联更突出。该比较支持疾病相关的空间模式，但不同 GWAS 功效及遗传结构仍影响 −log10(p) 的可比性。

## 细胞组成与细胞状态尚未被分解成因果贡献

作者将 gsMap 显著性与原研究的细胞比例反卷积结果对照。VI 中基质细胞比例的 Spearman 相关为 **0.43**，LR 中髓系细胞比例的相关为 **0.69**，但没有一种细胞比例单独解释全部空间模式。作者据此提出细胞组成和细胞间空间关系可能共同参与。[Extended Data Figure 9](https://www.nature.com/articles/s41588-026-02741-5#Fig12)

这仍不是对“组成变化”和“细胞内状态变化”的正式分解；相关图也不是对细胞间作用的直接检验。更稳妥的解读是：空间结果提供了下一步需验证的组织情境，尚不能从一个显著 niche 直接跳到特定基因、细胞间配体–受体作用或表达介导机制。

用于确定各 niche 典型细胞组成的另一步分析，还加入了 **6 张对照切片**，按切片平均比例后进行 Wilcoxon 比较与 BH 校正。它的样本集合与上述 12 张 MS 切片的 gsMap 易感性分析不同，不能混成一个“18 张病灶切片”的主分析。

## 数据复用与研究边界

论文将新 GWAS 汇总统计和 PBMC 单细胞数据指向 NBDC Human Database 的 **hum0197**；BBJ 基因型另指向 hum0014/hum0311。AIDA 使用其公开 CELLxGENE 数据，MS 脑单核和空间数据来自原研究的 UCSC Cell Browser。这些是可追溯的数据入口，不代表所有个体级数据都可匿名直接下载。[Data availability](https://www.nature.com/articles/s41588-026-02741-5#data-availability)

研究没有按 MS 病程和亚型进一步拆分 GWAS，部分病例由 ICD-10 确定，作者明确承认诊断不确定性。其 polygenic 映射主要回答“遗传信号富集于何种细胞/空间情境”，尚未识别所有驱动基因和通路。这与细胞状态特异 eQTL、共定位或功能干预是互补证据，而非替代关系。

本页已阅读正式版正文、Methods、相关主图和 Extended Data，并核查补充 Figures 2–4 及队列表 1。未重新运行 GWAS/HLA/scDRS/gsMap，未逐项核查全部 HLA 补充结果，也未下载受控个体数据。两张转载主图使用出版商原始文件，按 CC BY-NC-ND 4.0 保留完整内容和署名，不改色、不重绘。

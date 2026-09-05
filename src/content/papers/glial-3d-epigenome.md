---
{
  "title": "3D epigenome of glial cell types in developing human cortex",
  "shortTitle": "脑发育三维表观组：把风险变异连接到细胞类型与靶基因",
  "authors": "Ian R. Jones, Li Wang, Michael Kosicki et al.",
  "date": "2026-09-02",
  "source": "Nature",
  "doi": "10.1038/s41586-026-10987-6",
  "paperUrl": "https://www.nature.com/articles/s41586-026-10987-6",
  "priority": "must-read",
  "summary": "在四类发育期胶质细胞群中整合开放染色质、DNA 甲基化和启动子互作，连接候选调控元件与靶基因；再结合序列模型和体内实验检验精神分裂症风险变异。",
  "whyItMatters": "与 GWAS 功能注释、变异到靶基因映射及 AlphaGenome 类序列预测的实验验证直接相关。",
  "keyResults": [
    "四类细胞群：vRG、oRG、少突胶质前体细胞和小胶质细胞；PLAC-seq 互作分析分辨率为 2 kb。",
    "11,360 个预先优选的精神分裂症变异中，929 个落在可及区域，112 个被预测影响可及性。",
    "rs4449074 风险等位基因降低小鼠胚胎报告实验中的增强子活性；不能据此把全部 112 个预测变异视为因果变异。"
  ],
  "topics": [
    "statistical-genetics",
    "functional-annotation",
    "single-cell",
    "fine-mapping"
  ],
  "peerReviewed": true,
  "figures": [
    {
      "id": "fig4",
      "kind": "real-data",
      "label": "SATB2 区域的风险变异与体内增强子实验（Figure 4）",
      "caption": "A 为细胞类型相关调控元件中的性状遗传力富集。B 将 rs4449074 所在开放区域与 SATB2 的染色质互作放在同一基因组位置比较。C 对照参考 C 与风险 T 的序列重要性分数和小鼠胚胎报告结果。模型预测、物理接触和功能实验是不同层次的证据。",
      "alt": "SATB2 区域的风险变异与体内增强子实验（Figure 4）",
      "sourceUrl": "https://www.nature.com/articles/s41586-026-10987-6/figures/4",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-026-10987-6/MediaObjects/41586_2026_10987_Fig4_HTML.png",
      "assetPath": "/figures/glial-3d-epigenome-fig4.png",
      "credit": "Jones et al., Nature (2026)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "full-text-and-caption",
      "imageVerified": true
    },
    {
      "id": "fig3",
      "kind": "real-data",
      "label": "LHX2 扰动后的转录变化与细胞组成（Figure 3）",
      "caption": "C–E 展示敲低 LHX2 后的表达及细胞类型转录变化；F–G 分别展示 oRG 比例和 G1 期比例。独立实验重复数为 4，细胞数不能替代生物学重复数。",
      "alt": "LHX2 扰动后的转录变化与细胞组成（Figure 3）",
      "sourceUrl": "https://www.nature.com/articles/s41586-026-10987-6/figures/3",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-026-10987-6/MediaObjects/41586_2026_10987_Fig3_HTML.png",
      "assetPath": "/figures/glial-3d-epigenome-fig3.png",
      "credit": "Jones et al., Nature (2026)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "full-text-and-caption",
      "imageVerified": true
    }
  ],
  "published": true,
  "figureSet": "glial-3d-epigenome",
  "reviewedAt": "2026-09-05",
  "readingDepth": "full-text"
}
---

## 核心发现

非编码 GWAS 位点的解释需要回答两个相连但不同的问题：风险变异在哪类细胞中影响调控元件，以及这个元件可能调控哪个基因。本文将细胞类型分选、三维染色质互作和序列功能预测结合，提供了从调控注释走到具体变异实验的实例。最值得关注的是 **SATB2 区域 rs4449074 的等位基因比较**，而不只是新生成了多少张表观组图谱。[1]

## 四类细胞群与测量数据

作者从发育期人类皮层分选 ventricular radial glia（vRG）、outer radial glia（oRG）、少突胶质前体细胞（OPC）和小胶质细胞（MG），测量 RNA-seq、ATAC-seq、全基因组亚硫酸氢盐测序，以及 H3K4me3 介导的 PLAC-seq。后者主要观察启动子相关的染色质互作，分析分辨率为 2 kb。[1]

vRG 和 oRG 来自孕 15–18 周的 6 名供体；OPC 和 MG 来自孕 22–24 周的 9 名供体，各测量有 2–4 个重复。这是分选细胞群的多组学测量，并非每个细胞同时测得所有组学，也不是人群尺度的单细胞 eQTL 研究。不同细胞群还对应不同发育时间，跨群差异可能包含发育阶段的贡献。

## 如何连接调控元件和基因

研究将同时开放、低甲基化的区域定义为候选顺式调控元件（cCRE），再使用 PLAC-seq 将远端区域连接到具有 H3K4me3 标记的启动子。这样可以区别“变异落在开放区域”和“该区域有证据接触某个启动子”。最近的基因不必就是该元件的靶基因。[1]

随后，作者以参与启动子互作的 cCRE 构建注释，用 LD score regression 检查神经精神性状的遗传力富集。发育期小胶质细胞的这类元件富集阿尔茨海默病遗传信号，vRG、oRG 和 OPC 则在精神分裂症等性状中呈现富集。遗传力富集说明一类注释对性状遗传贡献较高，不会直接确定其中某个 SNP 的因果概率。

## SATB2 位点：从序列预测到实验

[[figure:fig4]]

在 Figure 4 中，**A 是注释层面的富集，B–C 才进一步落到单个位点和等位基因**。B 将 rs4449074 所在的开放染色质与 SATB2 区域互作对应；C 将参考等位基因 C 与风险等位基因 T 放在相同序列背景下比较，再展示小鼠胚胎增强子报告实验。风险 T 的报告活性降低，与模型预测的调控扰动方向一致。[1]

这条证据链比只看一个序列评分强得多，但还不能直接证明“该变异通过改变 SATB2 表达完全介导疾病风险”。染色质接触提供候选靶基因关系，报告实验说明序列在特定实验背景下有功能差异；疾病中介还需要人类细胞中的内源位点扰动、表达效应及遗传证据。

文章还比较了少量人类供体的可及性：2 名杂合携带者与 2 名参考纯合者的变化方向一致，但没有达到统计显著性。因此，这部分不能写成已获得显著的人类 caQTL 验证。[1]

## 序列模型做了什么

作者训练细胞类型特异的 gapped k-mer SVM，根据 DNA 序列预测染色质可及性，再用 deltaSVM、in silico mutagenesis 和 GkmExplain 评估等位基因变化。它不是 AlphaGenome，也没有联合输出表达、剪接和三维互作的全部预测轨迹。[1]

以便于理解的写法，某个细胞类型 $c$ 中的等位基因评分差可概括为

$$
\Delta_{v,c}=f_c(S_{v,\mathrm{alt}})-f_c(S_{v,\mathrm{ref}}).
$$

这里 $f_c$ 是序列模型，$S$ 是只替换目标变异的序列背景。这是对“等位基因差异预测”的概括，不是论文中三个评分方法的共同精确公式。$\Delta_{v,c}$ 也不是 eQTL 回归系数，更不是后验纳入概率。

精神分裂症分析从 DeepGWAS 预先优选的 11,360 个变异出发，929 个在至少一个细胞群中位于可及区域，其中 112 个被预测改变可及性。这个漏斗依次引入了关联优选、实验可及性和序列预测，不能把最后的 112 个统称为“实验确认的因果变异”。[1]

## LHX2 扰动：细胞状态与组成的实际变化

[[figure:fig3]]

作者敲低 LHX2 后进行单细胞 RNA 测序，用 scDist 比较不同细胞群的转录变化，并用 scCODA 分析细胞组成。较强的 shRNA 处理使 oRG 和星形胶质相关群体出现较大的转录变化，oRG 在采获细胞中的相对比例及 G1 期细胞比例也改变。[1]

这部分结果连接了调控网络和细胞表型，但“某类细胞比例增加”不等于它的绝对细胞数增加。Figure 3 的独立实验重复数为 4；细胞水平表达检验中的很小 P 值不应被当成拥有大量独立供体的证据。比较效应大小、重复间一致性和组成模型结果，比单看显著性更有用。

## 对功能精细定位的启发

与基于表达特异性和 GWAS 富集定位相关细胞的 gsMap 相比，本文继续提供了更接近单个位点的染色质与等位基因证据。两者可以形成“性状相关细胞 → 调控元件 → 候选变异和靶基因”的互补分析，而不是互相替代。[1,2]

对 SuSiE 或其他功能精细定位方法，可以考虑将细胞类型特异可及性、启动子接触及序列差异评分作为不同注释，评估它们是否改善可信集合与功能验证结果。由于本文的候选变异已经经过关联优选，不能在同一批优选位点上拟合先验后再宣称独立提升；应留出染色体或独立位点进行验证。这是进一步的研究建议，不是本文已经证明的算法改进。

## 参考资料

[1] Jones et al. *3D epigenome of glial cell types in developing human cortex*. Nature, 2026-09-02. [全文与 Methods](https://www.nature.com/articles/s41586-026-10987-6)。重点依据 Figures 3–4 及相应 Results；原图按 CC BY 4.0 署名使用。

[2] *Spatially resolved mapping of cells associated with human complex traits*. Nature, 2025. [gsMap 论文](https://www.nature.com/articles/s41586-025-08757-x)。作为相关方法，不计入今日新作。

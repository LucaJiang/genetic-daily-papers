---
{
  "published": true,
  "title": "All of Us diversity and scale yield context-dependent improvements in polygenic prediction",
  "shortTitle": "AoU 多祖源 PRS：更大训练集为何未必更好",
  "authors": "Kristin Tsuo, Zhuozheng Shi, Tian Ge et al.; Ying Wang and Alicia R. Martin",
  "date": "2026-09-14",
  "source": "Nature Genetics",
  "version": "Version of record",
  "versionDate": "2026-09-14",
  "doi": "10.1038/s41588-026-02734-4",
  "paperUrl": "https://www.nature.com/articles/s41588-026-02734-4",
  "pdfUrl": "https://www.nature.com/articles/s41588-026-02734-4.pdf",
  "codeUrl": "https://github.com/ktsuo/aou-prs",
  "resourceUrl": "https://doi.org/10.5281/zenodo.21008908",
  "priority": "worth-reading",
  "readingType": "本周新作",
  "kind": "paper",
  "peerReviewed": true,
  "summary": "比较AoU、UKB及其单祖源/多祖源组合在32个性状中的PRS表现。增加训练样本量通常有帮助，但大效应祖源富集变异和队列差异会改变最优组合；Figure 5的个体指标测量后验估计不确定性，不是个体表型预测R²。",
  "whyItMatters": "与SPLENDID配读，可区分模型如何表达异质性和训练数据如何借用信息。对跨祖源QTL整合的启示是：样本量、LD、效应共享程度与验证目标必须一起考虑。",
  "keyResults": [
    "使用AoU v7的245,388份WGS所对应队列，但关联与PRS分析聚焦常见HapMap3变异；不是对全体罕见WGS变异的预测评估。",
    "AoU-AFR中跨biobank多祖源PRS的定量性状中位incremental R²为0.021，对比AoU-only 0.013和UKB-only 0.016；部分血细胞性状反而以AoU-only更优。",
    "个人PRS后验方差经SNP遗传力归一化再做min–max缩放；数值接近1不代表接近完美预测，也不替代外部校准。"
  ],
  "topics": ["polygenic-prediction", "statistical-genetics", "QTL", "statistical-methods"],
  "inlineFigures": false,
  "reviewedAt": "2026-09-15",
  "readingDepth": "核读上传期刊全文、Methods、主图1–5，检查补充图和关键样本量/PRS/遗传架构表；未重跑受控个体数据。"
}
---

## 这是一项训练数据策略研究，不是新的 PRS 算法

本文在 All of Us（AoU）中评估多个来源的 PRS，核心问题是：**应该优先增加总样本量，还是保持训练数据与目标人群的相似性？**作者没有给出一个对所有性状都最优的答案，而是结合 SNP 遗传力、跨人群遗传相关、少数祖源富集的大效应位点和队列差异解释条件性的收益。

因此，它与 [SPLENDID](/papers/splendid-continuous-ancestry/) 的关注点互补。SPLENDID 研究如何在模型内部表达连续异质性；本文研究用何种 ancestry–biobank 数据组合训练已有模型。两篇的训练方向、调参方式、变异集合和 LD 参考不同，不能直接用两篇图中的 R² 给算法排名。

## 样本划分和表型筛选决定了结果的适用范围

作者使用 AoU **v7** 中 245,388 份 WGS 对应的人群，并结合 Pan-UKB。样本经祖源推断、质量控制与训练—测试分离后，Methods 给出的 AoU 训练组规模为 EUR 111,850、AFR 43,926、AMR 33,330；具体性状的有效样本量进一步取决于可用测量和病例数。

在三个主要组中各留出 5,000 名无关个体；训练集中与测试个体 kinship coefficient>0.1 的样本被移除。训练中仍允许其他相关个体，由相应 GWAS 方法处理。CSA 2,138 人和 EAS 5,009 人仅作目标评估，未贡献本研究的 ancestry-matched discovery GWAS。后文个体级分析还加入未被分配到这些祖源组的个体。

这里的祖源标签来自投影到 HGDP/1000G PCs 后的分类，是针对分析任务的遗传相似性描述，不应与种族、族裔身份或国家标签互换。作者又在初始类别内排除祖源离群者，因此通常的分组性能分析并未无条件覆盖整个人类连续祖源空间。

**245,388份WGS不是每个性状的训练样本量，也不是每项PRS使用了全部测序变异。**分析限定常见 HapMap3 变异，并应用 MAF、缺失率和 HWE 过滤。它主要检验常见变异 PRS 的跨数据集可迁移性，而非 rare-variant burden 或全基因组功能先验模型。

表型选择同样不是随机抽取32种性状。作者先从 Pan-UKB 高质量表型中，筛出多祖源 GWAS 顶部位点解释方差较高的一批候选，再按 AoU 可用性和研究意义选取14个定量性状、18个二分类表型。这使设计适合研究多祖源增益，但也意味着血细胞和祖源富集位点的突出表现不能直接外推到所有性状。

AoU 的 EHR 处理包括最近测量、单位标准化和极端值去除；部分单位信息为空的记录仍被保留。这样的决策扩大样本量，也留下真实世界表型测量误差与队列异质性。来源：主文 Figure 1、Methods、Supplementary Table 1。

## GWAS、meta-analysis 与 PRS 的实际分析链

在 AoU 各祖源训练组内，以 REGENIE 拟合关联，调整年龄、性别及10个PCs；定量表型做 inverse-rank normalization。然后用 METAL 进行逆方差加权固定效应 meta-analysis，构造单祖源、单 biobank 多祖源，以及 AoU+UKB 的跨 biobank 多祖源结果。

对单个 SNP 的固定效应合并可概括为

$$
\widehat\beta_{j,\mathrm{meta}}=
\frac{\sum_a\widehat\beta_{ja}/s_{ja}^{2}}{\sum_a1/s_{ja}^{2}},
$$

其中 $a$ 表示参与的 ancestry–cohort 组合。该表达式也揭示了潜在取舍：当一个很大的队列主导权重时，合并估计将主要反映该队列；若它对目标群体不是最佳代理，更多样本并不自动带来最好的预测。

作者比较三种 PRS 构建策略。P+T 先按 LD 剪枝再按 P 值阈值选择 SNP；PRS-CS 使用连续收缩先验，结合汇总统计与 LD 估计收缩后的效应；PRS-CSx 联合利用多个祖源的 GWAS 和各自 LD 信息。PRS-CS/PRS-CSx 使用 auto 方式估计全局收缩参数，不等于所有下游组合与验证决策都不需要检查。

特别需要保留的实现细节是：**对多祖源 meta-analysis 后的 PRS-CS，作者使用欧洲祖源 LD 参考**，理由是其中 EUR 样本占多数，且援引此前评估支持这一近似。单祖源分析和 PRS-CSx 则使用相应祖源的参考。这不是把多祖源数据的真实 LD 精确压缩成一个共同矩阵，而是一种实用近似；如果评价祖源富集位点的表现，必须考虑该近似与合并效应共同发挥的作用。

P+T 在目标数据中再分调参与测试两半来选择阈值，而 PRS-CS 的自动收缩流程不同。比较时应核对各方法实际用于评估的样本，而不是假设每根性能柱均来自完全相同的有效 N。来源：主文 Methods 与 Supplementary Tables 4–9。

## 遗传架构如何帮助解释样本量的边际收益

作者使用匹配样本量的 GCTA-GREML 比较13个定量性状的 SNP 遗传力（排除样本量不足的 reticulocyte percentage），并以 LDSC 和 Popcorn 分别考察相关遗传架构指标。SBayesS 用 UKB-EUR 汇总数据估计多基因性。这些方法对应不同输入与假设；不能把一个群体的多基因性估计当作另一个群体的实测因果变异比例。

原文给出的跨祖源预测近似为

$$
R^2\approx
\frac{r_g^2h_d^2h_t^2}{h_d^2+M_d/N_d},
$$

其中 $h_d^2,h_t^2$ 是 discovery 和 target 中的 SNP 遗传力，$r_g$ 为跨人群遗传相关，$M_d$ 表示独立染色体片段数量，$N_d$ 为发现样本量。$M_d$ 不是 SBayesS 的非零效应 SNP 数，两个概念不能互换。

这个近似不是本文所有 PRS 设置的精确性能定律，但提供一个有用的解释：增大 $N_d$ 只能减小抽样误差项；在该模型假设下，即使 $N_d$ 很大，目标遗传力和跨群体相关仍限制可达到的表现。真实数据里还叠加 LD 参考、表型测量和队列选择的影响。

匹配 N 的 GREML 结果在 AoU 组间总体接近，但部分血细胞性状差异较大；AoU-EUR 与 UKB-EUR 的对应估计也非完全一致。由于模型、表型尺度及输入数据不同，不宜将完整样本 LDSC 与匹配样本 GREML 的每个数值直接相减作为一个纯粹的 biobank 效应。跨祖源 $r_g<1$ 也不能单独归因为生物学因果效应改变：需要结合效应定义、频率、LD、估计误差与模型适配来解释。

## 主要结果：多数情况受益，但没有普适最优的合并策略

在 AoU 内部，ancestry-matched 的发现数据通常在相应目标组中表现更好，匹配训练样本量的敏感性分析支持这一趋势。但把大规模 UKB-EUR 纳入后，样本量优势对许多性状十分重要。因此，“匹配祖源比样本量永远重要”与“样本越大越好”都不是这篇论文的结论。

在 AoU-AFR 目标中，跨 biobank 多祖源模型的定量性状中位 incremental R²为 **0.021**，高于 AoU-only 多祖源的 **0.013** 和 UKB-only 多祖源的 **0.016**。这是跨性状汇总，不表示32个表型中每个都改善。

反例集中在 MCH、MCV、WBC 和 neutrophil count 等包含大效应祖源富集位点的性状。部分性状由 AoU-only 多祖源训练得到更好的预测，相对 UKB-EUR 的增益超过四倍。作者将 neutrophil count 的 DARC 区域、MCH/MCV 的 ITFG3 附近信号与这些改善联系起来。较大样本数带来的标准误缩小，并不一定补偿合并权重偏向不同效应/标记结构的代价。

[主文 Figure 4](https://www.nature.com/articles/s41588-026-02734-4/figures/4) 的每列是一个性状、每行是训练来源；最优格子的分布而非总体平均，是本研究的重点。图中星号采用相对 UKB-EUR 的两侧比较，阈值为0.05，不应重新描述为严格控制全表所有比较之后的普遍优胜结论。

在方法选择上，PRS-CSx 对 AoU-AFR 定量性状的中位 R²有约0.008的提升，但在部分其他组和二分类性状中收益有限，因而正文重点呈现 PRS-CS。这个结果依赖本文样本、auto设置和参考面板，不能据此给出“PRS-CS总比PRS-CSx更适合跨祖源”的一般建议。

## 评估指标：群体增量解释度与个体后验不确定性必须分开

对于定量性状，作者报告相对协变量基线的增量解释度：

$$
\Delta R^2=R^2(Y\sim C+\mathrm{PRS})-R^2(Y\sim C),
$$

其中 $C$ 包含年龄、性别和PCs。对于二分类表型，作者报告 PRS 本身的 AUC，以及 Nagelkerke 和 liability-scale R²等指标；置信区间由1,000次bootstrap估计。这些指标不直接等于临床绝对风险校准，也不反映一个综合临床风险模型的全部性能。

Figure 5 则使用完全不同的量。PRS-CS在1,000次MCMC、500次burn-in、间隔5次保留后产生100组效应样本。对个体 $i$、发现数据源 $d$、性状 $t$，用这些样本生成100个PRS，定义

$$
U_{idt}=\operatorname{Var}_{b=1,\ldots,100}
\left(\mathrm{PRS}^{(b)}_{idt}\right),
$$

再计算作者称为 individual-level accuracy 的量

$$
A_{idt}=1-
\frac{U_{idt}}{\widehat h^2_{t,\mathrm{AoU\text{-}EUR}}
\operatorname{Var}(Y_{\mathrm{resid},t})}.
$$

这里反映的是**模型下个人PRS的效应估计不确定性相对一个遗传方差尺度的大小**，不是从该个体一个实测表型中计算出的预测 R²。分母使用 AoU-EUR 的 LDSC 遗传力；跨群体解释时应注意遗传方差与该共同归一化尺度未必完全适配。

为显示六个性状和两个发现来源的曲线，作者又对全部相关个体、性状和来源共同做 min–max normalization：

$$
A^{\mathrm{scaled}}_{idt}=
\frac{A_{idt}-A_{\min}}{A_{\max}-A_{\min}}.
$$

因此图中接近1，表示在展示的集合中相对不确定性较小，**不是预测接近完美，不是解释近100%表型方差，也不是已完成公平校准**。原文Figure 5图注已明确说明这一点。后验方差小的错误模型仍可能产生有偏而自信的分数；要验证真实可迁移性，仍须依靠独立表型和校准分析。

## 连续祖源曲线：血细胞性状的改善与 BMI 的反例

个体遗传距离定义为 PC 空间中到发现数据中心的欧氏距离。Figure 5 的横轴对两个预测来源使用 AoU 多祖源发现人群中心作为共同参照，而不是分别以两个不同中心计算后直接混合。

在上述缩放尺度上，neutrophil count 的衰减斜率从 AoU-EUR PRS 的−2.63变为多祖源PRS的−0.02；WBC从−2.06变为−0.01。作者将平缓曲线与多祖源样本更好估计大效应祖源富集变异相联系。MCV也得到改善，但并非所有性状如此：BMI的对应斜率从−0.63变为−0.72，反而更陡。

[主文 Figure 5](https://www.nature.com/articles/s41588-026-02734-4/figures/5) 因而支持的是**后验不确定性随遗传距离的变化具有性状依赖性**。不能把血细胞性状的曲线外推到所有疾病，也不能因跨群体曲线更平坦就宣布所有个体的临床预测误差相等。

## 对证据强弱的综合评价

设计的优点是把训练来源、祖源、方法和性状架构放在同一评价系统中，并通过匹配样本量、遗传力与基因座证据帮助理解结果。它比简单展示多祖源PRS总体优于单祖源更有信息量。

主要边界有四个。第一，表型经过有利于研究多祖源收益的选择，不能把平均改善当作随机性状的期望收益。第二，所有主要目标评估来自AoU，跨biobank独立训练不等于已经在多个独立目标biobank验证；EHR和入选差异可能影响结果。第三，多祖源固定效应汇总再配欧洲LD是一种具体建模方案，发现某合并方案不优，不等于所有跨祖源信息共享都不优。第四，个体后验指标是模型依赖的补充诊断，不能替代预测误差与区间覆盖率。

此外，SBayesS的多基因性来自UKB-EUR，不应拿它直接证明AFR的因果支持集有多稀疏；血细胞中的大效应位点也不足以代表高度多基因的复杂精神疾病。二分类结果受病例数与表型定义影响，本文对它们的结论本来就较为克制。

## 与 SPLENDID 配读及对跨祖源 QTL 的启示

以下是研究设想，不是本文已验证的方法。

两篇论文共同提示，信息共享应是需要检验的模型选择，而非样本量增加后的自动操作。在跨祖源QTL中，可以区分全共享效应、祖源依赖偏离与少量大效应异质位点，再让共享强度随证据调整；这比直接将全部样本固定效应合并后，把非显著结果判为“无QTL”更有针对性。

但预测最优与定位最优未必相同。合并数据增加预测精度，可能主要依赖标签关联；fine-mapping还需要局部LD匹配、多个因果信号和后验校准。应分别评价预测误差、位点内定位与跨祖源效应覆盖，而不是用一个PRS的R²代替全部指标。

一个可实施的验证框架是：按donor和biobank留出，在连续PC邻域中评估表现；并比较只增加多数群体样本、增加目标相似样本、改变效应共享模型和更新LD参考的独立收益。对于单细胞QTL，还需把细胞数与独立donor数分开，避免将一个人更多细胞带来的测量精度改善误认为跨人群遗传信息增加。

最重要的研究问题不是“要不要纳入其他祖源”，而是**在何种模型、局部遗传结构和验证目标下借用多少信息**。

## 阅读结论、来源与数据

**评价：**这篇论文的价值在于为多祖源数据整合提供反例和条件，而非新算法本身。与SPLENDID一起读，能够避免把全部收益归因于更复杂模型，也避免把更大meta-analysis视为无条件更优。Figure 5的尺度核对尤其重要，误读它会把后验估计确定性变成不存在的近完美个人预测。

已核读15页上传PDF的正文、Methods和主图1–5，检查补充图及补充表1、6、8–10中的关键设计与结果。未重跑受控个体数据、重新估计遗传力或检验PRS校准；已取得的同行评审文件也不作为本笔记逐项审查完成的依据。

- [期刊正文和补充材料](https://www.nature.com/articles/s41588-026-02734-4)
- [Supplementary Information](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41588-026-02734-4/MediaObjects/41588_2026_2734_MOESM1_ESM.pdf)
- [Supplementary Tables](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41588-026-02734-4/MediaObjects/41588_2026_2734_MOESM4_ESM.xlsx)
- [作者分析代码](https://github.com/ktsuo/aou-prs)
- [PRS-CS权重与代码存档](https://doi.org/10.5281/zenodo.21008908)

期刊图像和全文受出版商专有许可约束，本页提供原文图链接，不重新分发其全文或图片。

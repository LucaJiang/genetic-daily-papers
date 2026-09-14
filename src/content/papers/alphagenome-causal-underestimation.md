---
{
  "title": "Causal variant underestimation is a major overlooked driver of sequence-to-function model underperformance",
  "shortTitle": "AlphaGenome：候选因果变异低估与功能先验",
  "authors": "Shiron Drusinsky, Katherine S. Pollard",
  "date": "2026-09-11",
  "source": "bioRxiv",
  "doi": "10.64898/2026.09.08.750172",
  "priority": "must-read",
  "summary": "在 GTEx Whole Blood 中，将高 PIP 候选与同一基因附近的背景变异直接比较，解释 AlphaGenome 为何可有尚可的总体 eQTL 相关，却不能稳定预测个体表达差异。重点是位点内相对效应、模型 fold 稳定性及功能先验的使用边界，而不是为所有分数寻找一个统一放大常数。",
  "whyItMatters": "直接关系到调控序列模型如何为多信号精细定位提供辅助信息：低分不宜硬排除候选；prominence 的归一化、先验强度与后验校准需要分别处理。",
  "keyResults": [
    "主要子集为 258 个基因、366 个 fm-eQTL–gene 对及 321 个 MPM-eSNV–gene 对；预测比较基于同一批 71 名测试者。",
    "43.3% 的 MPM-eSNV 比同窗口全部 non-eQTL 对照预测幅度更大；这个比例不是 credible-set coverage。",
    "50–100 倍重构实验同时利用已知 fm-eQTL 身份与观察效应方向，是诊断实验而非可部署校准器。",
    "最高约 0.1% prominence 区间富集候选因果变异，但不是已校准的 FPR、PIP 或全基因组 precision。"
  ],
  "topics": [
    "fine-mapping",
    "functional-annotation",
    "foundation-models",
    "QTL",
    "statistical-methods"
  ],
  "readingDepth": "上传的 21 页 v1 正文、Methods、主图 1–3 及补图 1–7；复核 Fig.S5 图内 AIFM3 与图注 PPP1R17 的不一致；未重跑模型或取得逐变异预测文件。",
  "published": true,
  "version": "bioRxiv v1",
  "versionDate": "2026-09-11",
  "paperUrl": "https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1",
  "pdfUrl": "https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf",
  "readingType": "本周新作",
  "kind": "paper",
  "peerReviewed": false,
  "inlineFigures": false,
  "reviewedAt": "2026-09-14"
}
---

**原文**：Shiron Drusinsky、Katherine S. Pollard. *Causal variant underestimation is a major overlooked driver of sequence-to-function model underperformance*. bioRxiv，2026-09-11，v1，尚未经同行评审。  
**DOI**：[10.64898/2026.09.08.750172](https://doi.org/10.64898/2026.09.08.750172)  
**阅读依据**：用户上传的 21 页 PDF；正文、Methods、Figures 1–3、Supplementary Figures 1–7。下文的“统计解读”“研究设想”是本笔记的分析，不是作者已经验证的结论。正文以“候选因果变异”指代统计精细定位支持的变异，不把 PIP 标签当作实验真值。

## 1. 这篇论文改变的是评价问题，而不是提出一个新的 fine-mapping 模型

论文的主要贡献，是把评价对象从“不同位点的已知 eQTL 能否被总体区分”转向“同一个基因附近，真正重要的变异能否压过大量背景变异”。研究对象是 AlphaGenome 的序列到表达预测，不是 AlphaMissense，也不是对 AlphaGenome Atlas/AVI 整套评分体系的检验。[原文 §1–2.1，pp.1–4](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=1)

这里要分清三件事。首先，预测的 log fold change 与 GTEx 归一化表达的 eQTL 回归系数不在同一量纲，不能直接用两者的数值比判断绝对校准。其次，位点内候选变异的相对大小和排序，决定功能评分能否为 fine-mapping 提供区分度。第三，将一个人的所有局部变异共同输入模型后得到的表达预测，还受到 LD、等位基因频率以及多个变异预测误差的共同影响。本文最有力的证据针对第二、第三件事，而不是简单证明“所有效应均应乘某个常数”。

**我的总体判断**：这是一篇有价值的模型诊断论文。它对“低功能评分可以排除因果候选”的做法提出了直接反证；但并未证明序列模型作为统计 fine-mapping 的辅助注释没有价值，也没有建立一个可直接使用的 PIP 校准方法。

## 2. 数据设计：训练个体、测试个体和变异—基因对必须分开

| 分析层次 | 实际数据与筛选 | 解释范围 |
|---|---|---|
| 个体表达预测 | GTEx v8 Whole Blood；可用配对 WGS/RNA-seq 共 670 人；elastic net 用 530 人训练，71 人测试 | 本文比较基于同一批 71 人；Methods 未交代剩余 69 人在本分析中的角色，不能自行补成验证集 |
| 较宽基因集合 | elastic net 跨个体相关达到约 0.3 的 713 个基因 | Figure 2D 的符号翻转计数来自这个集合 |
| 主要 fm-eQTL 分析 | 258 个基因，366 个 fm-eQTL–eGene 对，321 个 MPM-eSNV–eGene 对 | 不等于 366 个互相独立的基因或位点 |
| fm-eQTL 标签 | GTEx 提供的 CAVIAR 结果，PIP > 0.9；eQTL 数据中的 SNV 为 MAF ≥ 1% | 统计因果标签；不覆盖罕见变异、indel 或全部调控机制 |
| 富集分析 | 430 个 fm-eQTL–gene 对，涉及 306 个基因、419 个不同 SNV | 此处不再要求 elastic net 相关 > 0.3，分母不同 |
| 局部可及性分析 | GEUVADIS LCL：304 个 variant–eGene 对，272 个不同变异、299 个基因 | 同时满足 fm-eQTL、caQTL、位于相应 ATAC peak 的条件 |

这些数字来自 Methods（pp.12–15）。最重要的设计限制是：主要集合先挑选了局部基因型能预测表达的基因。因此，结果适合回答“在存在较强局部遗传信号的基因中，序列模型为何仍失败”，不适合直接估计全基因组、所有组织的失败比例。

此外，elastic net 在目标组织的个体表达标签上训练，AlphaGenome 则依赖预训练的功能组学映射。前者是数据集内监督学习基线，后者是预训练序列模型的迁移应用。这个比较合理地衡量可达到的预测水平，但不是相同监督信息下的模型容量对照，更不能把 elastic net 的 SNP 权重当成因果效应真值。

## 3. 模型与算法：作者究竟计算了什么

### 3.1 从序列预测到单变异分数

主要实验使用 AlphaGenome 的 PyTorch 实现及 distilled `all_folds` 模型。输入是以基因 TSS 为中心的 **131,072 bp 总长窗口**，不是 TSS 两侧各 131 kb。RNA-seq 输出使用 Whole Blood track、gene-body mask、128 bp bins，由 `GeneMaskLFCScorer` 汇总 REF 与 ALT 序列的表达差异。分数方向是 ALT 相对 REF 的效应。[Methods，p.12](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=12)

记该分数为 $s_{jg}$，表示变异 $j$ 对基因 $g$ 的预测 log fold change。它既不是 GWAS 的效应系数，也不是“此变异因果”的后验概率。本文没有重新训练 AlphaGenome；其方法创新主要在诊断性指标、对照设计和反事实重构。

### 3.2 Elastic net 是预测基线，不是 fine-mapping 金标准

为了说明该基线的统计结构，可将标准 elastic net 目标写为：

$$
\min_{a,\boldsymbol b}\;\frac{1}{2n}\|\boldsymbol y-a\boldsymbol 1-X\boldsymbol b\|_2^2
+\lambda\left[\eta\|\boldsymbol b\|_1+\frac{1-\eta}{2}\|\boldsymbol b\|_2^2\right].
$$

这是对所用方法的标准数学说明，不是原文逐字给出的公式。原文报告逐基因使用 `ElasticNetCV`、`max_iter=2000`，输入是同一窗口内的 0/1/2 基因型；没有完整列出所有超参数与搜索网格，不能推定每个参数都经过独立调优。[Methods，pp.12–13](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=12)

在 71 名测试者上，作者计算预测与观察表达的 Pearson 相关，记为 $r_{EN,g}$ 与 $r_{AG,g}$。其相对表现损失为：

$$
U_g=\frac{r_{EN,g}-r_{AG,g}}{r_{EN,g}}.
$$

$U_g=0$ 表示两者相关相同，$U_g=1$ 表示 AlphaGenome 相关为零，负相关可使 $U_g>1$。**它是相关系数的相对差，不是解释方差损失，更不是遗传力损失。**

### 3.3 MPM-eSNV：尽量允许序列模型“选中另一个合理候选”

对每个高 PIP fm-eQTL，作者查找与其 $r^2\geq0.9$ 的 LD buddies，并允许用预测效应绝对值更大的变异替换，得到 maximum predicted magnitude eSNV。多个 fm-eQTL 被同一个 LD buddy 替代时去重，因此 366 对变为 321 对，不能把这个数量差全解释为“替换了多少变异”。作者另报告 321 对中仅 36 对的候选因替换而不同。[§2.1；Methods，pp.13–14](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=13)

这是一个**有意有利于 AlphaGenome 的敏感性分析**：弱预测不能轻易被解释为“模型只是选择了另一个高度连锁的变异”。但它没有穷举所有多因果配置，也不能消除原始 PIP 的模型依赖性。补充图 S1B 的 1 Mb 扩展仍观察到弱预测；这支持窗口截断不是全部解释，却不是所有 1 Mb 个人基因组任务的全面验证。

### 3.4 Prominence：将分数放回同一基因的背景中

作者定义：

$$
q_{jg}=\log_2\frac{|s_{jg}|}{\operatorname{median}_{k\in W_g}|s_{kg}|}.
$$

例如 $q=5$ 表示预测幅度是该基因窗口内中位变异的 32 倍。这个量消除了基因间的一部分评分尺度差异，但它是**相对幅度**，不是位点内名次，也不包含 LD、MAF 或模型不确定性。零分数和零分母的具体处理在 Methods 中没有详细报告，复现时需要查代码，不能擅加伪计数后说是原算法。[Methods，p.13](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=13)

Figure 1G 的“non-eQTL”对照，要求同一基因附近、MAF ≥ 5%，且未出现在该基因的 GTEx 显著关联列表中。这比跨位点随机对照更接近 fine-mapping 的真实竞争对象；但“未显著”仍不等于“效应为零”。

## 4. 实证结果：为什么总体相关尚可，位点内识别仍会失败

### 4.1 SHROOM1 展示了问题的具体形态

Figure 1B–C 与 Supplementary Figure 1C 中，SHROOM1 的高 PIP eQTL 有明显的观察关联，但其预测表达效应接近附近背景变异；模型也没有在高度 LD 的其他候选上放置足够强的效应。这个基因的跨个体相关为 AlphaGenome **0.055**、elastic net **0.581**。这是“已知局部遗传信号没有在预测中获得足够权重”的具体例子，而不仅是两个软件总分不同。[Fig.1；Fig.S1，pp.5、16](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=5)

在主要集合中，只有 **43.3% 的 MPM-eSNV** 比同窗口所有 non-eQTL 对照的预测效应更强；另外 56.7% 被一个或多个对照超过。即使前者胜出，有些领先幅度也很小。这里的比例不是统计 fine-mapping 的 credible-set coverage，因为作者并没有构建或评价 posterior credible sets。[Fig.1G](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf)

Supplementary Figure 1A 进一步显示，366 个 fm-eQTL 的 signed Spearman 相关为 **0.449**，unsigned 相关仅 **0.026**。因此，总体带符号相关不能替代效应幅度与位点内区分能力的评估。作者使用“high leverage”描述部分预测良好的点对整体指标的作用；统计上这里应理解为子集驱动整体秩相关表现，而非线性回归中单个数值离群点的杠杆值。

### 4.2 模型间符号翻转，比“稳定地预测反方向”更常见

作者对四个 cross-validation fold 模型分别预测。在 713 个基因中，distilled 模型产生负跨个体相关的 162 个基因里，113 个在至少一个 fold 中变正，49 个没有；原先为正的 551 个基因里，232 个在至少一个 fold 中变负。[Fig.2D，p.7](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=7)

这支持的解释是：许多位点缺少强、稳定的因果候选贡献，附近弱预测的组合足以使总体方向改变。Supplementary Figures 3–5 同时提供了不稳定的例子，以及 ACKR1 这类有突出候选效应、预测相对稳定的例子；Supplementary Figure 7 检查了“某 fold 未见过该基因”并不是变化的唯一来源。另有一处图内标注需要保留：Supplementary Figure 5 的右列标题写 AIFM3，图注却写 PPP1R17。由于本次未取得逐基因结果文件，不能替作者确定第二个例子的基因身份，也不将图注的 49.5% 基线数值擅自移给 AIFM3。[Fig.S5，p.19](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=19)

但四个交叉验证模型**不是因果效应后验的四个独立样本**。它们的离散程度是模型敏感性证据，不是已校准的标准误；至少一次翻转的机会也会随模型数量增加。因此，不能据此为任一变异给出正式的符号错误概率。

### 4.3 “放大 50–100 倍”是带有真实标签的诊断实验

作者将个人表达预测线性重构为：

$$
\widetilde y_{ig}^{(r)}=\sum_{j\in W_g}x_{ij}s_{jg}^{(r)},
$$

其中 $r$ 表示模型 fold。随后，仅对**已知 fm-eQTL** 的幅度乘以系数，并且根据观察 eQTL 方向纠正预测符号，背景变异评分保持不变。平均而言，提高 50–100 倍后，预测可接近基线；最弱的一组可能需要 1,000 倍。[§2.3；Methods，p.14；Fig.3A](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=14)

这不是可部署的校准方法：部署时既不知道哪些变异真因果，也没有真方向。它还同时改变幅度和符号，并使用加性线性重构，而非重跑非线性模型。因此，它支持“相对权重不足足以解释相当一部分失效”，但不能单独识别幅度低估的全部因果贡献。更严格的后续实验应分别做仅改符号、仅改幅度、两者同时改变的消融。

### 4.4 局部调控识别与靶基因连接：两处可能的瓶颈

在 304 个 LCL eQTL–caQTL 对中，作者用预测可及性效应、观察可及性/表达效应以及 TSS 距离，回归预测表达效应的幅度；Methods 对变量作 log10 变换。按 Figure 3D 的幅度分析，其结构可示意为：

$$
\log|s^{RNA}_j|=a+b_1\log|s^{ATAC}_j|+b_2\log|\widehat\beta^{RNA}_j|
+b_3\log|\widehat\beta^{ATAC}_j|+b_4\log d_j+e_j.
$$

此式用于解释图中的回归结构；Methods 没有完整交代零值处理和所有实现细节。RNA 预测使用 TSS 中心 1 Mb 窗口及 EBV-transformed lymphocyte track；ATAC 使用变异中心 1 Mb 输入、GM12878 track，在 501 bp mask 内汇总。[Methods，pp.14–15](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=14)

预测可及性效应的系数显著为正，$P=1.3\times10^{-17}$；Figure 3D 标注模型 $R^2=0.316$。弱表达预测还富集于远离 TSS 的变异。两者分别支持局部功能识别不足、远端调控连接不足的解释。

**评价**：这属于条件相关分析，不是对 enhancer→gene 传递路径的因果分解。两个预测来自相关的模型输出，且样本经过 eQTL、caQTL、ATAC peak 的共同筛选；某个 SNP 同时显著关联两种表型，也不自动证明它们共享同一因果信号或存在可及性中介。因此，作者提出的两类瓶颈有合理证据，但尚未被相互独立的干预实验证实。

## 5. 如何评价结论强度

最扎实的结论是：在所研究的血液 eQTL 集合中，大量高 PIP 候选的预测效应在同位点背景中并不突出，而且弱预测的方向和个人表达预测对模型 fold 敏感。MPM 替换、1 Mb 敏感性检查以及具体位点实例，使这比一张总体相关散点图更有说服力。

需要收窄的，是“个人表达预测就是 fine-mapping”和“最强 0.1% 预测普遍可信”两种表述。

**个人表达预测与因果定位相关，但并不等价。** 为说明 LD 的作用，考虑本笔记的简化加性模型：真实遗传成分为 $X\boldsymbol b$，预测成分为 $X\widehat{\boldsymbol b}$，基因型协方差为 $\Sigma$。两者的相关是：

$$
\operatorname{Corr}(X\boldsymbol b,X\widehat{\boldsymbol b})=
\frac{\boldsymbol b^\top\Sigma\widehat{\boldsymbol b}}
{\sqrt{(\boldsymbol b^\top\Sigma\boldsymbol b)(\widehat{\boldsymbol b}^\top\Sigma\widehat{\boldsymbol b})}}.
$$

在高 LD 下，把权重放在错误的 tagging SNP 上仍可能获得高预测相关；反过来，少数因果候选排序正确，也不保证其他背景误差、MAF 加权和表达噪声不影响个人预测。这个公式是统计解读，不是论文提出的模型。它说明还需要直接的位点内排序、多信号 posterior 和独立验证。

**最高 0.1% 是经验分数尾部，不是 0.1% FPR。** 富集分析以 430 个 fm-eQTL–gene 对及 MAF/TSS 距离匹配对照进行，10,000 次重采样；最高 prominence 区间富集明显且方向更稳定。但这不等于在新组织、新祖源或新变异类别上拥有已知 precision/FDR，也不是临床可用的概率。相反，低于阈值时的高漏检倾向意味着不应把低分当作非因果证据。[Fig.3B；Methods，p.15](https://www.biorxiv.org/content/10.64898/2026.09.08.750172v1.full.pdf#page=15)

还有一个需要复现时确认的环节：基因筛选与最终报告均依赖 elastic net 的预测相关，正文没有额外报告一个独立的最终筛选验证集。若最终 $r\geq0.3$ 过滤也使用这 71 人，基线表现会受到测试集条件选择影响。它不会自动否定位点内实例，但会限制表现差距和失败比例的外推。

## 6. 对 AlphaGenome × SuSiE 研究的具体启示

### 6.1 功能注释适合提供正证据，不宜作为硬排除条件

以下是研究设想，本文没有拟合。对于一个含 $m$ 个候选变异的位点，可考虑带均匀底座的先验：

$$
\pi_j=\frac{1-\rho}{m}+\rho\frac{\exp\{\lambda f_j\}}{\sum_{k=1}^{m}\exp\{\lambda f_k\}},
\qquad 0\leq\rho<1.
$$

$f_j$ 可以结合评分、模型间稳定性和调控上下文；$\rho$ 控制相信注释到何种程度，$\lambda$ 控制集中程度。这只是待检验的参数化，不是本文验证的最佳先验。关键是给模型低估的候选保留非零机会，并让关联数据与 LD 决定后验；$\pi_j$ 本身仍不是 PIP。

应在独立位点或留一染色体设计中学习参数，避免用同一批 GTEx PIP 训练先验后，又用同一批关联数据证明提高了 PIP“准确性”。评价需要同时报告模拟真值下的 PIP 校准和 credible-set coverage、集合大小、召回，以及真实数据中的独立队列或功能证据。后两者不能取代模拟中的真实覆盖率。

### 6.2 对数幅度的基因内归一化，不会改变固定强度的线性 softmax 先验

这是本文指标对方法开发的一个重要数学限制。若同一个基因的所有候选用同一中位数归一化，且采用线性 softmax：

$$
\pi_j\propto\exp(\lambda q_{jg}),
$$

则代入 $q_{jg}=\log_2|s_{jg}|-\log_2 m_g$ 后，所有候选共享的 $-\log_2 m_g$ 在归一化中**完全抵消**。这一结论要求候选共用同一个背景中位数，而且先验强度参数固定。同位点的幅度排序也不改变。

**这里比较的是 prominence 与同一预测幅度的对数，而不是与未经变换的 raw score 比较。** 对原始有符号分数、原始幅度和对数幅度分别做 softmax，一般会得到不同先验；绝对值和对数这两步本身已改变评分映射。不能将“共同加性常数抵消”扩大成“任何 raw score 与 prominence 先验都相同”。

因此，prominence 对跨基因尺度比较、识别模型是否“有把握”可能有帮助，却不能单凭减去背景中位数修复位点内错排。真正可能有效的是依据位点可靠性调整先验强度、采用非线性或截断映射、引入独立功能特征和模型稳定性；这些变化都需要独立验证，不能仅更换指标名称。

### 6.3 将局部功能与 enhancer–gene 连接分开验证

对于单细胞 QTL，可分别评价细胞类型匹配的 caQTL/TF-binding 证据与 enhancer–gene 配对，再检验它们能否解释 eQTL。这比把多个高度相关的 AlphaGenome tracks 直接当作独立证据相乘更合理。可先从匹配细胞类型的 eQTL–caQTL 共定位与实验支持集合开始，但需要保留多信号和测量不确定性。

**最直接可做的验证**不是把全部评分乘 100，而是在同一批位点中比较：无功能先验、原始评分先验、带底座且限制强度的先验，以及加入模型稳定性的先验；在固定 fine-mapping 模型和 LD 输入下，观察是否减少漏掉的高置信候选，同时不损失校准。

## 7. 阅读边界与复现状态

这份 PDF 包含主要分析的 Methods 与七张补充图；未运行 AlphaGenome、未重新训练 elastic net，也未取得作者逐变异预测文件。论文称处理后绘图数据将在 publication 时提供，因此当前稿中的全部数值均是对原文结果的核读，不是本次重新估计。

方法学价值主要在于：**功能模型的低分应当表达“模型未识别出效应”，而不是自动表达“该变异没有效应”。** 对统计遗传学而言，这会直接影响先验强度、阴性证据使用方式，以及校准与预测性能应如何分别评价。

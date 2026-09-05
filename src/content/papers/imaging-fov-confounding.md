---
{
  "published": true,
  "title": "Field-of-view confounding shapes genetic discovery from self-supervised cardiac-imaging phenotypes",
  "shortTitle": "影像表征中的视野混杂与 GWAS 推断",
  "authors": "Devansh Pandey, Vagheesh M. Narasimhan",
  "date": "2026-09-04",
  "source": "medRxiv",
  "version": "v1",
  "doi": "10.64898/2026.09.01.26361959",
  "paperUrl": "https://www.medrxiv.org/content/10.64898/2026.09.01.26361959v1",
  "pdfUrl": "https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.01.26361959.full.pdf",
  "codeUrl": "https://github.com/Devanshpandey/ssl-imaging-genetics",
  "priority": "worth-reading",
  "summary": "心脏 MRI 的自监督表示同时编码体型与扫描条件。作者比较限定视野、降维前残差化和关联阶段调整，说明统计量校准并不保证表型只对应目标生物学。",
  "whyItMatters": "检验学习到的高维表征接入 GWAS 时的表型定义、混杂控制和信息损失。",
  "keyResults": [
    "影像分析处理 69,932 名受试者；主要校正后 GWAS 为 53,436 名欧洲祖源受试者。",
    "101 个 omnibus 关联位点在排除 PC4 驱动位点及 MHC 后保留 84 个；敏感性分析主要来自同一队列。"
  ],
  "topics": [
    "statistical-genetics",
    "statistical-methods",
    "foundation-models"
  ],
  "peerReviewed": false,
  "figures": [
    {
      "id": "fig2",
      "kind": "real-data",
      "label": "Figure 2 · 处理流程、残留混杂与心脏信息保留",
      "caption": "校正顺序的实证比较：裁剪与残差化降低非线性 BMI/身高信息，保留的真实心脏表型信息依表型而异；11/11 与 1/11 仅对应预指定位置候选位点集合。",
      "alt": "校正顺序的实证比较：裁剪与残差化降低非线性 BMI/身高信息，保留的真实心脏表型信息依表型而异；11/11 与 1/11 仅对应预指定位置候选位点集合。",
      "sourceUrl": "https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.01.26361959.full.pdf#page=6",
      "assetPath": "/figures/imaging-fov-confounding-fig2.png",
      "credit": "Pandey & Narasimhan (2026), Figure 2；v1",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v1-full-text-and-original-figure",
      "imageVerified": true
    },
    {
      "id": "fig3",
      "kind": "real-data",
      "label": "Figure 3 · 遗传位点与敏感性分析",
      "caption": "校正后 omnibus 检出 101 位点，PC4/MHC 过滤后 84 位点；敏感性分析、留出中心及另一编码器种子支持队列内稳健性，尚不是外部独立复制。",
      "alt": "校正后 omnibus 检出 101 位点，PC4/MHC 过滤后 84 位点；敏感性分析、留出中心及另一编码器种子支持队列内稳健性，尚不是外部独立复制。",
      "sourceUrl": "https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.01.26361959.full.pdf#page=8",
      "assetPath": "/figures/imaging-fov-confounding-fig3.png",
      "credit": "Pandey & Narasimhan (2026), Figure 3；v1",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceCheck": "v1-full-text-and-original-figure",
      "imageVerified": true
    }
  ],
  "reviewedAt": "2026-09-06",
  "readingDepth": "full-text"
}
---

已核对 v1 全文、主要方法与原始结果图。该研究尚未经同行评议。

## 研究问题与数据

自监督学习能把心脏 MRI 转成遗传分析表型，但重建图像的目标并不要求表示只包含心脏。胸廓、体型和扫描中心也可能进入 embedding。本研究处理 UK Biobank **69,932 名受试者的 cine-MRI**，每人包含二、三、四腔长轴视图；这是影像样本规模，**主要校正后 GWAS 的 N 为 53,436**，限于欧洲祖源。Video-MAE 提取每人 2,304 维表示，PCA 保留 20 个轴，再使用 REGENIE 开展关联分析。

## GWAS 校准为什么没发现问题

原始表示的 20 个轴中，18 个达到作者定义的 SNP 遗传力显著标准（z > 3）。但首轴的主要位点是 FTO，与 BMI 的遗传相关为 −0.735；另一个轴涉及 WNT16/LRP5 等骨骼或身高相关区域，尽管该轴 LDSC 截距为 0.995。

这里首先是**表型定义与研究目标不一致**：若学到的轴确实包含体型，检出体型遗传效应可以是对该轴的真实关联，而非必然的一类错误。LDSC 截距和 genomic control 用于考察关联统计量的膨胀，不能证明表型在生物学上只代表心脏。作者所谓 phenotype-level confounding，需要与常规 GWAS 群体分层混杂区分理解。

## 为什么处理顺序重要

作者先依据图像随心动周期的变化定位心脏、裁掉大部分胸廓视野，并重新训练编码器；随后逐列将表示对年龄、年龄平方、性别、BMI、身高及影像中心作 OLS 残差化，再标准化并 PCA。以满列秩协变量矩阵 $X$ 和表示矩阵 $E$ 为例，这一步可用统一记号写为 $R=(I-X(X^\top X)^{-1}X^\top)E$。它只消除指定协变量的线性投影，不能保证统计独立。

PCA 按方差保留方向。若体型主导原始 embedding 的方差，保留的前 20 个方向会优先容纳体型信息；GWAS 阶段追加协变量，无法重新找回压缩时未保留的心脏方向。裁剪与残差化也具有互补性：仅残差化时，非线性探针仍能预测 BMI（R² = 0.64）；两者结合后降为 0.18，身高为 0.09。不能仅凭线性相关接近零便宣布混杂消失。

## 实证结果与代价

[[figure:fig2]]

Figure 2 同时展示效益和代价：只在 GWAS 调整 BMI、身高及中心，虽然压低 FTO 信号，但仅检出 11 个预指定心脏位置候选位点中的 1 个；裁剪并在 PCA 前残差化后检出 11/11。这是特定候选集合的比较，不能解释为全基因组敏感性从 9% 提升至 100%。而且两个流程同时改变了裁剪、编码器和校正顺序，证据支持整套流程的改善，不能将全部增益孤立归因于先后顺序。

校正后的 20 轴 omnibus 检验发现 101 个位点；排除残留体脂遗传相关较强的 PC4 驱动位点及 MHC 后剩 84 个。与 36 种专家影像表型在约 33,000 人匹配样本量比较时，33 个位点中 19 个未在专家表型达到显著；这表示该比较下的新增关联，不能自动等同于新因果基因。

[[figure:fig3]]

Figure 3 的交叉拟合保留 99% 的主分析位点，另一随机种子编码器保留 86%；这些主要是同一队列内稳健性证据。另一方面，左室射血分数的可预测 R² 保留 88%，左室质量仅保留 25%：体型与真实心脏结构本就相关，残差化也会删除目标生物学的一部分。

## 对单细胞方法研究的启发

可迁移的思路是：在将 foundation-model embedding 接入 QTL/GWAS 前，先检查 batch、donor 属性、测序条件及目标生物学信息在哪些方向共存，并比较降维前处理与关联阶段调整。**这是一种由本文推导的研究设计建议，论文并未验证单细胞场景。**应先明确目标效应，再选择要移除的变量；本文亦没有证明残差化总能改善因果推断。尚缺外部影像加基因型队列与跨祖源验证，未测量的混杂可残留，位置注释也不等于因果基因定位。

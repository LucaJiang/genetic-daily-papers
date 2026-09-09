---
{
  "published": true,
  "title": "Reconstructing signaling histories of single cells via perturbation screens and transfer learning",
  "shortTitle": "IRIS：从组合刺激实验学习可迁移的单细胞信号响应",
  "authors": "Nicholas T. Hutchins, Miram Meziane, Claire Lu, Maisam Mitalipova, David S. Fischer and Pulin Li",
  "date": "2026-09-08",
  "source": "Nature Methods",
  "doi": "10.1038/s41592-026-03213-8",
  "paperUrl": "https://www.nature.com/articles/s41592-026-03213-8",
  "pdfUrl": "https://www.nature.com/articles/s41592-026-03213-8.pdf",
  "codeUrl": "https://github.com/Pulin-Li-Lab/IRIS-signaling-inference",
  "priority": "worth-reading",
  "readingType": "本周新作",
  "kind": "paper",
  "summary": "用组合信号刺激实验训练 scANVI 条件变分自编码器与分类器，从单细胞转录组推断 WNT、BMP、FGF、TGF-β、RA 的激活标签。研究通过整套筛选留出、跨胚层和跨物种测试，再据预测调整呼吸间充质分化的 WNT 刺激时机；所谓信号历史仍依赖谱系和伪时间，而不是单个细胞的直接纵向记录。",
  "whyItMatters": "适合关注扰动建模、跨域泛化与实验闭环的单细胞方法研究。关键不是换了一个基础网络，而是刺激设计、标签定义、整域留出和外部实验分别提供什么证据。",
  "keyResults": [
    "五条通路分别进行二分类，0.5 阈值后组成 32 种联合状态；实验中的 HH/SHH 未纳入最终五通路推断。",
    "除随机细胞划分外，还做五套生物筛选的留一测试、内胚层到中胚层及小鼠到人类迁移；少量目标物种数据可帮助跨物种预测。",
    "小鼠 E9.0 前肠离体刺激支持 WNT 对呼吸间充质标记的作用；在人类分化实验中将 WNT 提前并延长，改善了相关标记表达。",
    "输出是训练刺激标签的分类概率，不是校准后的通路强度；既往刺激残留及其他通路共享响应会影响解释。"
  ],
  "topics": ["single-cell", "perturbation", "statistical-methods"],
  "peerReviewed": true,
  "inlineFigures": true,
  "reviewedAt": "2026-09-10",
  "readingDepth": "正文、Methods、相关 Extended Data 与原图，并查阅独立补充 PDF；未逐项核完补充数据表，未执行作者代码",
  "figures": [
    {
      "id": "fig2", "label": "Figure 2 · 留出筛选、跨谱系与跨物种泛化",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41592-026-03213-8/MediaObjects/41592_2026_3213_Fig2_HTML.png",
      "sourceUrl": "https://www.nature.com/articles/s41592-026-03213-8/figures/2",
      "assetPath": "/figures/iris-signaling-fig2.png",
      "alt": "IRIS 原论文 Figure 2，包括跨筛选、跨谱系和跨物种测试设置与性能比较。",
      "caption": "不同面板改变的是训练数据覆盖范围，不是同一随机细胞拆分的重复展示。跨物种加入少量人类筛选数据后的提升，必须与完全没有目标物种数据的设置区分。",
      "credit": "Hutchins et al., Nature Methods (2026), Figure 2. Original image reproduced unchanged for non-commercial scholarly discussion.",
      "license": "CC BY-NC-ND 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "kind": "validation", "sourceCheck": "出版商原始 PNG，未裁切、重绘或改变面板；已与 Figure 2 图注和测试方法核对。", "imageVerified": true
    },
    {
      "id": "fig4", "label": "Figure 4 · 从 WNT 预测到前肠与分化实验",
      "url": "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41592-026-03213-8/MediaObjects/41592_2026_3213_Fig4_HTML.png",
      "sourceUrl": "https://www.nature.com/articles/s41592-026-03213-8/figures/4",
      "assetPath": "/figures/iris-signaling-fig4.png",
      "alt": "IRIS 原论文 Figure 4，展示小鼠前肠 WNT 实验、修改的人类分化流程及呼吸间充质标记。",
      "caption": "体内图谱预测、离体刺激和人类分化改进构成不同层面的证据。读出以标记基因表达为主；它们并不等于已获得与体内细胞完全等价、功能成熟的呼吸间充质。",
      "credit": "Hutchins et al., Nature Methods (2026), Figure 4. Original image reproduced unchanged for non-commercial scholarly discussion.",
      "license": "CC BY-NC-ND 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "kind": "validation", "sourceCheck": "出版商原始 PNG，未裁切、重绘或改变面板；已与 Figure 4 图注、Results 和实验方法核对。", "imageVerified": true
    }
  ]
}
---

## 推断的对象：细胞内转录响应，不是配体–受体通讯

IRIS 全称为 **Intracellular Response to Infer Signaling State**。研究先在体外用已知信号组合刺激干细胞，测量单细胞转录组，再训练模型根据转录响应预测信号激活状态。它问的是“这个细胞的表达状态是否像接受过某类刺激”，而不是“哪个邻近细胞通过哪个配体向它发送了信号”。[正文](https://www.nature.com/articles/s41592-026-03213-8)

这一响应侧视角与配体–受体分析互补：配体表达未必导致受体细胞实际响应，而相似转录响应又可能由不同上游机制产生。IRIS 也没有直接测量磷酸化水平、信号传导通量或暴露剂量；后文所有分类概率都必须在这个标签定义下理解。

## 组合刺激如何提供训练标签

实验围绕 WNT、BMP、FGF、TGF-β、RA 和 HH/SHH 六条发育通路，通过激活或抑制条件组成刺激组合。最终推断模型只纳入 **前五条通路**；HH 因相应刺激细胞和可利用信号不足，没有进入最终五通路分类。因此不能把它写成对六条通路均完成相同水平验证的模型。

训练资料包括两个小鼠筛选阶段 mP_d1、mE_d2，以及新增的人类 hM_d4、hM_d7、hE_d8。它们覆盖中胚层、内胚层等不同细胞背景与刺激历史。小鼠数据还有一个混合技术批次；做生物筛选留出时，作者排除了这一与其他筛选重叠的混合批次，避免把“技术批次”误当成全新实验背景。

hM_d4 涉及两个连续阶段、六条通路的组合，理论上有 $2^{12}$ 种二元配置，作者并未穷举。其 96 种条件由 4 个既有分化流程、38 个单通路改变条件及 54 个保持较大 Hamming 距离的随机组合构成。hM_d7 则组合 RA/SHH 与其余四条通路的状态形成 64 种条件；hE_d8 从确定性内胚层继续接受 64 种刺激组合。实验设计的价值，是用有限条件覆盖不同背景中的信号响应，而不是单一细胞类型上的一次激动剂比较。[Results 与 Methods，Combinatorial signaling screens](https://www.nature.com/articles/s41592-026-03213-8#Methods)

## 模型：条件潜在空间与五个二元响应标签

IRIS 基于论文使用版本的 **scANVI / scvi-tools 0.20.3**。输入 $X$ 为原始表达计数，条件 $S$ 可包含批次、物种或细胞类别的编码。条件变分自编码器把 $X,S$ 映射到潜在表示 $Z$，并在给定潜在状态和条件后重构表达；论文使用零膨胀负二项观测模型。分类器从潜在表示学习通路标签，表达重构与标签训练共同约束潜在空间。

每条通路都是一个二元分类任务。输出超过 0.5 时判为 ON，再把五条通路的结果组合成五位二进制状态，所以最多有 $2^5=32$ 种联合标签。这不是单个 32 类分类器，也不能把各通路 sigmoid 概率直接解释为独立、已校准的真实激活概率。

作者比较 1–3 层、不同隐藏宽度和 10–60 维潜在空间，以留出小鼠批次的 AUPRC 选择结构，并训练 200 个 epoch。这里的条件建模旨在减轻批次或物种差异，但不能保证潜在空间自动完全去除混杂，尤其当刺激条件与谱系变化密切相连时。

**论文公式有需要复现者注意的地方。** 正式 Methods 的 TPR/FPR 分母均印成 TP+FP，其中所谓 TPR 实际对应 precision；交叉熵式也没有写出通常用于最小化目标的负号。ELBO 的重构项记号及最小化表述同样存在不一致。本次已目视核对 PDF 原页面，不是文本抽取造成的变化。作者说明实际使用 sklearn、scvi-tools 等实现；这些排版或记号问题本身并不能证明代码算错。复现时应核对代码与库调用，不能把这些印刷公式原样当作实现规范，也不应在解读中默默替作者修正。[Methods，模型、评价指标与超参数，PDF p.12](https://www.nature.com/articles/s41592-026-03213-8.pdf#page=12)

## 从随机细胞划分到真正跨数据域测试

最容易取得好结果的是同一筛选中的 80%/20% 随机细胞划分，因为训练和测试共享实验、刺激分布及谱系。作者不仅做了这一层测试，还逐步改变训练与目标数据的关系。

第一层是 **整套筛选留出**：在五套生物筛选中轮流留出一套，检查模型能否迁移到未用该筛选标签训练的背景。第二层是 **跨谱系**：以内胚层筛选训练，在人类中胚层筛选中评估。第三层是 **跨物种**：用小鼠资料预测人类，再比较加入少量人类内胚层资料后，预测另一人类中胚层目标的变化。加入约 10% 的人类 hE_d8 数据能够帮助转移，但这已不再是完全没有目标物种资料的设置。

[[figure:fig2]]

与 response-gene 求和相比，IRIS 能使用更广的表达响应；与采用相近搜索范围的 SVM、随机森林、elastic net 等比较时，优势则依赖训练资料和迁移难度。在常规同分布或资料充分的设置中，差别可能相近或较小；在资料受限、跨物种设置中更能体现条件潜在表示的价值。不能把论文概括成 IRIS 在所有测试上都大幅优于所有基线。

此外，“测试标签留出”与“无标签目标表达是否参与表示学习”是不同问题。正文的表示学习描述与 Methods 的训练/测试说明应结合具体试验代码理解；本次未执行代码，所以不把所有结果一概描述成完全不接触目标表达的严格归纳式测试。[Figure 2；Methods，Setup of the model tests](https://www.nature.com/articles/s41592-026-03213-8#Fig2)

## 响应分布广泛，不等于每个相关基因都是因果传感器

作者通过按互信息、表达量等排序后置乱基因表达，观察到在移除大量基因信息之前仍可保留预测能力。这支持信号响应信息分散于较广的转录组，而不是只依赖少数经典 response genes；但置乱分析并没有证明这些基因分别是通路的直接靶基因，也没有识别表达变化的因果方向。

顺序刺激的残留效应更直接影响“当前状态”标签。先前刺激会使部分 BMP、WNT、TGF-β 的假阳性率增加；RA 与 FGF 的模式并不完全相同。一个细胞可能在撤除刺激后仍保留表达响应，或者因其他通路共享下游转录程序而被判为 ON。论文也讨论 FGF 与其他受体酪氨酸激酶通路共享信号成分的可能影响。因此分类错误既可能来自模型，也可能来自刺激方案标签与实际细胞状态之间的不完全对应。[Results 与 Discussion](https://www.nature.com/articles/s41592-026-03213-8)

## “信号历史”通过谱系与伪时间重建

模型应用于小鼠原肠胚及之后的胚胎图谱，先得到各细胞的五通路分类，再沿谱系或伪时间汇总和可视化。扩散分量与谱系排列参考已知标记和发育注释，之后进行分箱或平滑。

所以，历史重建需要额外相信细胞谱系关系与顺序足够准确。这里观察的是不同细胞在不同采样状态下的表达，不是同一细胞经过时间的直接纵向测量。经典 RA、WNT、FGF 发育轴模式的重现，是外部合理性检查；它既不能证明每个细胞的暴露时间被准确找回，也不能把平滑曲线解释为精确的信号动力学参数。

## WNT 实验：由预测提出可检验的分化修改

在 E9–E9.5 图谱中，IRIS 提示 WNT/BMP 响应在呼吸间充质相关细胞中富集。作者进一步对小鼠 **E9.0 前肠离体培养 24 小时**，比较 WNT 激活与抑制：CHIR 条件促进相关区域的 Tbx4/Foxf1 表达，而 C59 抑制条件使 Tbx4 信号明显减少。这个实验支持 WNT 与呼吸间充质标记形成相关，但并不逐一验证模型推断出的全部通路历史。

在人类干细胞分化中，既有方案较晚才再次激活 WNT；IRIS 提示其作用可能开始于呼吸命运承诺阶段。作者据此从 **分化第 4 天**开始更早、更长时间地激活 WNT，观察到 TBX4 增强，并进一步寻找保留 FOXF1 等标记的适中刺激强度。高 WNT 会降低 FOXF1，所以并非刺激越强越好。相关现象在不同 hES/hiPS 细胞系中得到支持。

[[figure:fig4]]

Figure 4 的定量包含三个生物学重复，图注还说明实验重复执行；单细胞荧光读数不能自动算作更多独立生物学重复。论文展示的是标记表达和分化状态改善，作者也明确承认单独调整 WNT 不足以保证所得细胞在功能上完全等价于体内呼吸间充质。[Figure 4 与正文 p.9](https://www.nature.com/articles/s41592-026-03213-8#Fig4)

## 对扰动模型研究的启发

这项工作最值得借鉴的是 **可解释的实验标签、整域留出、跨背景迁移和实验反馈** 的组合，而不是把 scANVI 换成更大模型就自然解决泛化问题。后续若比较不同模型，应固定刺激覆盖、谱系拆分和目标数据可见性，另外检查概率校准、刺激时长与残留响应，而不只报告 AUPRC。

与 GWAS/QTL 整合的联系目前属于方法延伸：可以把推断的信号状态作为细胞环境表征候选，但必须考虑状态估计误差及其与基因表达共同构造造成的关联。本文没有完成信号状态 QTL 或基因–环境交互检验，不宜把这一潜在用途写成已验证成果。

## 阅读范围与来源

已阅读正文、Methods 和相关 Extended Data，核对 Figure 2、4 原图，并查阅独立补充 PDF。未逐项核完所有补充数据表及 Source Data，也没有执行作者代码。代码入口为[IRIS-signaling-inference](https://github.com/Pulin-Li-Lab/IRIS-signaling-inference)。原图按 CC BY-NC-ND 4.0 保留完整内容，不重绘、不改面板，仅用于非商业科研解读。

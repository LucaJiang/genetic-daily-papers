# 2026-09-08 全文来源与核对记录

状态：用户于 2026-09-08 明确确认“发布”；四篇论文和 daily 已设为 published:true，按已审阅的完整 notes 发布。线上部署结果另行核验。

本期基于用户上传的四份全文；检索与推荐日期为 2026-09-08，保留各论文实际在线日期。以下为内容审阅记录，不作为论文正文展示。


## GSR

- 已逐页读完 PDF 1–25。p1 摘要、作者、日期、license；p4–13 Results/Discussion；p14–20 Methods；p20–24 references；p24–25 data availability、独立补充文件清单。正文实际文字页为 1–2、4–5、7、9–10、12–25，图页为 3、6、8、11。
- 已按 PDF skill 渲染并目視核查 p3、6、7、8、11、14、18、20。算法行列和及实际交换从 p14 与 Fig1 核实；经验 p、SES、FPR 公式从 p18 图像核实；GTEx 公式从 p20 图像核实。
- Supplementary File 1（补充方法、Fig S1–S20、表；正文可见 Table S1–S5）与 Files 2–6（相关结果及四法原始/调整结果）仅列名称，没有内容。各 GWAS 的有效 N、UKB 排除是否正确落实、top pathways 名称、精确逐项相关、PS 排名完整结果均未独立核查。
- 60.8% 与 79.3% 只在摘要给出。根据 Fig6/Methods 覆盖范围推算，总比较数应为 2×(8×3+5)+2×(12×3+9)=148，疾病比较数 58；报告百分比与 90/148、46/58 四舍五入吻合。但 File2 不在附件，不能证实缺失项、相等项及作者是否按此计数，正文未擅自把这些推算当成原文明确分母。
- Fig1 图示写 GTEx 46 human tissues，但 p20 Methods 写从 50 个组织筛选后剩 45 个；正文按 Methods 写处理逻辑，未报一个确证的组织总数。Fig1 用 BioRender 制作（p24），未选择该图作为转载资产。
- Fig2 原图上方两行部分 2.5%–97.5% 范围超出坐标上限；原图图注已明确说明。这是源图本身的显示限制，不是本次裁切丢失，不应重绘或将其当置信区间。
- p9 称将 GSA-MiXeR 的候选集设为其他三法 top 500 并集，而 Fig6 图注概称 top 500。正文保留 Methods/Results 中更精确的并集说明。
- p14 交换步数公式排版的 logarithm 括号不清晰；未尝试从抽取文本复原或把可能不正确的公式写进 notes。作者实际写 BiRewire v3.30、accuracy=0.00005、max.iter="n"；正文未给每个重复的 mixing diagnostics。
- 代码链接按 p24 Data Availability 核实，未下载或检查仓库实现。
- Methods 有“Genomic swap randomization”标题、正文个别写“gene set randomization”，标题/摘要正式名称是 Gene Swap Randomization，notes 统一后者。
- Fig5 p8 可视数字：MAGMA r=0.851, p=4.46e-04；Pascal r=0.794, p=0.002；PRSet r=0.865, p=0.003。图中每个点是性状，不是每条通路；正文仅引用 r 并明确指标。

## 原图资产与图注（编辑用）

均为用户提供的 medRxiv v1 原图页面 3 倍忠实渲染，裁去页眉与外围正文，没有重绘、改色或删除图内面板。三个最终文件均已 view_image 完整目视，轴标题、刻度、图例和面板标签保留。Credit: Alanna C. Cote, Reagan Kesting, Judit García-González and Paul F. O’Reilly, medRxiv (2026), 原图未修改。License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ 。Source URL: https://www.medrxiv.org/content/10.64898/2026.09.03.26362206v1.full.pdf 。

| id | 文件 | PDF 页 | 尺寸 | 中文精确图注 |
| --- | --- | --- | --- | --- |
| fig2 | gsr-fig2.png | 6 | 1635×1656 | Figure 2：MAGMA、Pascal 和 PRSet 在保留基因频率与通路大小的 GSR 随机通路（紫）及仅保留大小的 PS 随机通路（绿）下，原方法名义 p<0.05 比例在通路间的分布。每条通路作 1,000 次随机化，菱形为跨通路均值，横虚线为 0.05，彩色竖线为通路 FPR 分布的 2.5%–97.5% 范围；部分范围在源图中超出纵轴显示上限。PRSet 不包含 AD、IBD、SCZ。此图不是 GSR 经验 p 值的校准检验。 |
| fig3 | gsr-fig3.png | 7 | 1689×429 | Figure 3：CAD、HDL 与乳腺癌的 MAGMA 通路 QQ 图。黑点为真实通路结果，紫色为 GSR、绿色为 PS 随机结果在每个排序位置的中位数；阴影为该位置 1,000 次随机结果的 2.5%–97.5% 分位范围，黑虚线为均匀零分布期望。真实结果尾部仍可超过 GSR 参照，但这是排序分布比较，不是单条通路的置信区间。 |
| fig6 | gsr-fig6.png | 11 | 1635×1743 | Figure 6：A，原始排序（蓝圈）与 GSR 排序（红圈）同四类外部证据的 Spearman 相关；黑色填充表示该相关名义 p<0.05，并不检验调整增益是否显著。B，按方法和验证资源汇总的跨性状平均相关，误差条为均值标准误。PRSet 排除 AD、IBD、SCZ；疾病基准各覆盖 8 个性状（PRSet 5 个）。通常使用原方法 top 500 候选，GSA-MiXeR 的候选是其他三法 top 500 的并集。 |


## GLORB

- 版本与授权：PDF 页 1 页眉明确 v1 posted September 3, 2026；CC BY 4.0 International，https://creativecommons.org/licenses/by/4.0/。Credit：Callahan, Coleman and Ngo, bioRxiv (2026), doi:10.64898/2026.08.28.747928。
- p4：两模型适用条件；SF >20% 基因不变；non-SF 强调技术尺度与组别独立。
- p5–8：两种 NB GLM、混合先验、非 SF 离散度、Figure 1 与 Tables 1–2。p7、p8 公式已经 2 倍页面渲染目視核对。p7 的 σδ² 与 p8 Table 1 的 σδ 不一致；τ 的完整分布未给出；保留该边界而不补造公式。
- p9–10 Figure 2：LIHC 样本 50/371；EV/Protein 测量 56/112；ATAC 17 组数为 8、6、5、3、7、7、6、8、7、3、6、4、5、5、25、19、8，合计 142。未在笔记中将分级 RNA 测量数当独立 donor 数。
- p11–14：模拟与真实数据结论；Figure 3 的对照偏移案例；Figure 4。p14 图片已目视核对全部 A–F、数值与图例。
- p15：VI 不确定性低估、接近全部基因变化时尺度识别的限制；单细胞和 10–100 倍扩展仅为讨论。
- p16–18：推断、初始化、模拟、阈值、预处理；p16–17 公式已目视核对。仿真 dispersion 正确为 $(5/\mu+0.01)\epsilon_g$，不是 $5/\mu+0.01\epsilon_g$，文本提取丢失括号，正文笔记没有重复这一无必要细节。
- p21–27：Supplementary Figures S1–S7 已读。重点目视 p21 S1、p24 S4、p26 S6、p27 S7；p27 起为参考文献，PDF 至 p37 完整。
- p11 原文“0.55% or higher”与模拟轴不符，应按 55% 理解；笔记不照抄。
- p14 图注混用 posterior likelihood、FC=1 与 Methods 的 log2FC 门槛；笔记以 Methods $P(|LFC|\ge1)\ge0.95$ 和邻近 log2FC 说明解释，并不将之等同 BH FDR。
- p14/S5b 的 20,701、9,703 为上调数，不是 total DE；上下调合计分别 21,902、11,649。
- p24 S4 图注将 Scale 称为 variance，但图轴是 posterior σ；笔记按标准差解释。S4 第一排 C 与标题原生重叠，忠实保留，没有改写原图。
- 原文没有独立完整支持 >20% 条件的识别证明、后验覆盖率基准、频率学 FDR 基准、GPU 速度基准、稀疏度扫描；不能据摘要补造这些结论。
- 独立核对作者当前官方代码 commit `21dd4de85dc746dfabb1ca18bae95f46bd514271`：`model_jax.py` line 40 `Normal(0,[5.0,0.05])` 中 0.05 是 SD，符合 Table 1 而非 p7 文字方差；`core_jax.py` lines 228–233 的 `plesser` 为 `Normal(abs(m),s).cdf(cutoff)`，与严格 $P(|\beta|<c)$ 缺少下尾项的差异已写入正文。本文没有重算论文结果；当前实现不能自动代表论文作图时的精确版本。永久链接：https://github.com/rowancallahan/global_upreg_seq/blob/21dd4de85dc746dfabb1ca18bae95f46bd514271/src/global_upreg_seq/model_jax.py 和 https://github.com/rowancallahan/global_upreg_seq/blob/21dd4de85dc746dfabb1ca18bae95f46bd514271/src/global_upreg_seq/core_jax.py 。README 中 $F>1$ 初始化未完成经核实。本文正文的“full design matrix”表述不等于现有软件对任意设计已经验证。
- 另核实 NumPyro 0.20.0 官方源码 `NegativeBinomial2` 第二参数是 concentration $k$，方差 $\mu+\mu^2/k$，见 https://github.com/pyro-ppl/numpyro/blob/0.20.0/numpyro/distributions/conjugate.py 。上述当前作者代码 `model_jax.py` line 56 直接传 alpha 作为该参数，non-SF lines 83–86 传 `alpha_gene*(1+sample_alpha)`；增加样本因子会降低条件方差，与 PDF p6 的 $\phi_n\alpha_g$ 表示增加过度离散度不一致。此处仅是当前实现与论文解释的对照，不是完整软件审计，也未证实论文生成图表的历史版本就是该 commit。

原图均从 PDF 的完整 figure 区域 3 倍忠实渲染，保留所有 panel、坐标与图例，只去除正文和英文图注；没有重画或改变数据。均已最终 view_image 目视核对。尺寸与 SHA256 另存 glorb-figures.json。

1. `glorb-fig4.png`，PDF p14，1389×1257。中文图注：**Figure 4｜仿真与真实数据验证。** A 比较每组 3 或 50 个样本、不同 DE 比例下的灵敏度和特异度；B–D 以血浆 RNA 的 ERCC 归一化为参照，比较常规 DESeq2 与 non-SF GLORB 的 LFC 和上下调发现数；E–F 比较 LIHC 的效应分布及方向性发现数。ERCC 结果提供外部尺度参照，LIHC 的更多上调发现本身不构成真值验证。图中的 20,701 与 9,703 是上调基因数。
2. `glorb-figS4.png`，PDF p24，1314×1719。中文图注：**Supplementary Figure S4｜non-SF 模型对优化随机种子的敏感性。** 同一模拟数据重复推断五次，各行展示负 ELBO 损失、后验均值与标准差，以及真实和估计 log2FC 的比较。五次 AUROC 为 0.7710、0.7508、0.6615、0.6753、0.6632，说明曲线下降及较小最终损失不足以保证相同恢复质量。第一排 C 标签与标题的轻微重叠来自原图。
3. `glorb-figS6.png`，PDF p26，1314×867。中文图注：**Supplementary Figure S6｜技术尺度跨组不一致时的效应偏差。** 行表示病例 size-factor 分布相对对照约 0.5、1.5、2 倍，列为每组 3、5、10、25 个样本；纵轴是平均 log2FC 误差，点为不同模拟数据的中位数，竖线表示范围，每份数据仅使用第一次推断。non-SF 在部分设置仍有方向性偏差，支持将技术可交换性作为适用前提。


## 突变率与 VEP

- PDF 共 14 页，包括 1 页封面；纸本页码比 PDF 页码少 1。已阅读主文、Methods、Figures 1–5、Discussion、参考文献。独立 supplemental text、Figures S1–S5、Tables S1–S10 未包含在附件中，未声称直接审阅；上述补充结果仅引用主文对应报告。
- 日期：官方 AJHG 摘要页检索结果明确为 2026-09-03，https://www.cell.com/ajhg/abstract/S0002-9297%2826%2900312-5 。PDF 封面和页脚 2026-10-01 属于卷期日期；PDF 第 12 页给出 received 2026-03-31、accepted 2026-08-13。
- PDF 第 3 页：Roulette 输入、de novo 774,930、dbNSFP 版本、转录本统一、不同方法的 40,135,489–69,402,158 条记录与 11,567–18,110 基因，共同 13,470,525 条记录与 6,659 基因；正文共同数量印作“1,3470,525”，以 Figure 2A 正确分组数字为准。
- PDF 第 3–4 页：DMS 预处理、416 结构域、Tsuboyama 独立处理、HD 定义、rank regression 与 HC3。第 4 页两条公式已目视核实。基于秩的数学式为对论文框架的展开表达，原文仅写 VEP score ~ DMS score + MR / HD，没有指定秩是否进一步归一化，正文不比较回归系数数值大小。
- PDF 第 5 页 Figure 1E 原图上半部标签为 **phyloP 100way vertebrate**，原图注却写 **17-way primate**；解读以图内标签为准，不改原图。图内 $p=0$ 只是数值报告，不写成概率严格为零。
- PDF 第 6–7 页：82%、50 方法分类、HD 结果与 Figure 2A 的 4 个 Bonferroni 不显著方法。Figure 2B 是 ESM1v；Figure 2A/5 是 ESM1b，避免混写。
- PDF 第 8–9 页：DMS 三组相关、Figure 4 样本数、25 显著负／18 显著正残余关联、17/18 核苷酸模型、45/14 基因约束结果。Figure 4B 图注把 Beltran 来源称 416 genes，但 Methods 实际说 416 domains；本文保留结构域单位，121 基因只用于 Figure 5 共同交集。
- PDF 第 10 页：Figure 5 的 n=29,399、121 基因、50 分数比较；第 11 页作者明确承认稳定性不能覆盖全部功能效应、现代人类 MR 不是历史跨物种过程的精确代理。
- PDF 第 4 页 Methods 说明基因富集使用单侧 Fisher、0.5 伪计数、按 log2 OR 排序、不加权 preranked GSEA；GO/HPO 5–5,000 基因，保留 FDR<0.05 且 NES>0 项，以 Jaccard≥0.30 聚类减冗余。主文未直接列出所有基因与本体项对应关系，缺补充表，故不逐项复述所谓疾病风险。

### 原图记录（不并入正文）

两图均从用户提供 PDF 对完整图形区域做忠实渲染；未重绘、未改变数值、未删除 panel。原文图注另作中文学术解读。已使用 view_image 目视检查所有 panel、图例、坐标轴与文字，imageVerified=true。

**Figure 1：**文件 `vep-fig1.png`，PDF 第 5 页／文内第 4 页；1482×1038 px；裁切 PDF 区域 [54,34,548,380] pt，3×渲染。包含 A–E 全部面板、两类机制示意、完整比对和 Hamming distance 图例、四个 phyloP 图及全部横纵轴。中文图注：**突变率既影响中性替换期望，也影响统计功效。**A–D 概括系统发育与序列频率方法可能继承的关联；E 的四重简并同义位点给出近中性对照。图内 100-way vertebrate 标签与英文原图注的 17-way primate 存在不一致，本解读采用图内标签。

SHA256：`b1563645c7b6ae5e94a03470fefbaa87489958bde39921380badc0c9a5566362`。

**Figure 4：**文件 `vep-fig4.png`，PDF 第 9 页／文内第 8 页；1482×897 px；裁切 PDF 区域 [54,34,548,333] pt，3×渲染。A、B 左右两图与 C 全部保留，含六类核苷酸替换图例与横纵轴。中文图注：**DMS 中突变可达性与蛋白稳定性损失的弱关联。**A 使用位点 Roulette 率；B 改用三核苷酸 de novo 平均率并在独立稳定性数据中检验；C 比较不同最小 Hamming distance。各 panel 使用的变异集合不同，样本数不可互换；误差线为分箱均值 SEM。

SHA256：`beff29443e8651d3e718904979aa9e0ab3a2cd2a2c0dcd0c68406eef6e34bfef`。

两图来源：https://doi.org/10.1016/j.ajhg.2026.08.011 。Credit：Loay et al., The American Journal of Human Genetics (2026), Figures 1 and 4. © 2026 American Society of Human Genetics; published by Elsevier Inc. **All rights reserved.** PDF 无 CC BY 或其他开放转载许可。license 应填写 All rights reserved；licenseUrl 不伪填 CC 链接，可指向论文来源。本次选取供论文评论的两幅必要图，版权仍归原权利人；不将完整 PDF 纳入网站或另行公开分发。


## MILK

### 页码与材料范围

页码均为上传 PDF 页码。文件共 98 页：正文及主图 1–6 在 p1–29；按主图分组的 Supplementary Figures 在 p30–68；Methods 1–6 在 p69–94；参考文献 p95–98。

已重点核读：算法 p4–6、69–70；胎儿抽样、metacell 与 scVI/scArches p6–9、72–77；发育结果与设计 p9–12、77–82；Census 评测 p12–16、82–86；疾病系数、DEG 与局部一致性 p18–21、86–91；跨物种 p23–24、92–94。关键补充材料为 p32 的 Supp Fig 2.1f（比较次数），p36–37 的 Supp Figs 2.5–2.6（抽样/汇总），p45 的 Supp Fig 4.1（标签覆盖），p47–50 的 Supp Figs 4.3–4.5（评分、距离与 IG）。这些关键图及 p75、85、87 公式已结合页面图像核对；部分补图 PDF 文字层存在乱码，未把乱码当作缺页，也未声称逐面板复核了所有补图。

没有单独附上的 Supplementary Tables；正文亦未发现明确按编号引用的此类表格。Zenodo 的代码输出、原始模型 checkpoint、运行日志和独立数据表未随本 PDF 提供，本次未据此做重复运行。不能从材料完整度推断已有运行时间或峰值内存表。

需保留的不一致：

- Methods 4.2 在相邻两句中分别给 cache upper limit 50,000 和 10,000，无法仅凭 PDF 决定 Census 实际配置。
- Methods 4.1 的总数为 44,265,932；Methods 4.5 分母写 44,265,933，差 1 个细胞。正文使用前者并统一约 44M。
- Methods 4.7 的 IG 文字描述与所列公式减法方向相反；Fig 4h 与 p85 公式均是父节点熵减加权子节点熵，本文据此解释；补图 4.5 明确说明对照归一化为差值。
- 作者称代表为 medoid，却定义为距 centroid 最近的对象；不替作者补写严格距离和最优化保证。
- Fig 1c 称 MNIST；Methods 1.3 实际调用 sklearn.datasets.load_digits 的 1,797 个 8×8 手写数字，不能当作标准 70,000 张 MNIST 规模测试。
- Fig 6 主文代表树约 40 万；Methods 6.2 给多个目标规模，Methods 6.6/6.7 又以目标 100 万描述部分分析。未强行将所有跨物种分析统一成同一个实际 n。

### 原图记录

三张图均完整保留原有面板、坐标标签与图内图例；仅从 PDF 裁去页面边缘及正文图注，未改变图内内容。最终 PNG 均已重新打开目视核实。原文许可证为 **CC BY 4.0**，credit：Brett Kiyota et al., bioRxiv 2026，DOI 10.64898/2026.08.31.747971；licenseUrl：https://creativecommons.org/licenses/by/4.0/；sourceUrl：https://www.biorxiv.org/content/10.64898/2026.08.31.747971v1.full.pdf。

- `milk-fig1.png`，Figure 1，PDF p5，A–C。建议图注：**分组与递归建树。** A 展示以距离阈值决定建立新组或加入现有代表；B 展示分区并行、代表更新、条件性跨分区合并及缓存；C 为手写数字示例。图中每条树边代表算法分组合并，不能解释为生物谱系。期望紧接“分区顺序扫描怎样形成全局树”。
- `milk-fig2.png`，Figure 2，PDF p7（原始完整图注跨 p7–8），A–H。建议图注：**胎儿图谱抽样与信号保留。** A–C 为 15 器官的分组和压缩过程，D 区分无标签与标签均衡选择，E–F 比较 regulon 信号和协方差子空间，G–H 评估 scVI 参考图谱及 query 到同类邻居距离。E–F 图旁数字是抽样比例曲线 AUC；已有标签时 MILK 与均衡随机的差异明显小于无标签场景。紧接抽样结果。
- `milk-fig4.png`，Figure 4，PDF p13（原始完整图注跨 p13–14），A–I。建议图注：**Census 嵌入的抽样后比较。** A–D 展示既有模型嵌入、代表覆盖率和按 clade 大小加权，E–G 为多分辨率聚类评价，H–I 为树上的标签信息增益。图 A 的 >70M 为 Census 整体规模，本文去重 primary data 输入约 44M；模型排名应按作者 biological/batch 标签定义理解。紧接模型排名与其边界。

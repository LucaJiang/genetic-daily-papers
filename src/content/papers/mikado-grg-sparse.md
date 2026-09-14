---
{
  "title": "Sparse Linear Algebra Accelerates Genotype Representation Graph Computation at Biobank Scale",
  "shortTitle": "Mikado：GRG 稀疏三角求解与推断校准",
  "authors": "Yifan Li, Qingyao Sun, Drew DeHaas et al.",
  "date": "2026-09-12",
  "source": "bioRxiv",
  "doi": "10.64898/2026.09.10.750583",
  "priority": "must-read",
  "summary": "利用 GRG 的 multi-tree 结构，将隐式基因型矩阵乘法改写为稀疏三角求解，通过分层和 wavefront 调度调用 MKL/cuSPARSE。PCA 与 BOLT-LMM-inf 的迭代计算受益显著；笔记分开解释代数等价、数值一致性、统计校准以及准备和数据移动成本。",
  "whyItMatters": "适合借鉴到 donor 级基因型算子、多表型关联和重复模拟，但不能将内核加速直接外推到所有单细胞 QTL 或局部 SuSiE-RSS 工作流。",
  "keyResults": [
    "AoU 内核比较最高 473 倍的基线为单线程 GRGL；同 GPU 的对照单独报告。",
    "AoU 全常染色体 PCA 为四张 A100 上 180 秒，对比 GRGL 的 5,391 秒；不是单卡结果。",
    "chr11 普通 GWAS 中 Mikado CPU 34 秒、GPU 46 秒，说明装载成本可以使 CPU 更合适。",
    "BOLT 逐 SNP 精细误差和 17 个阈值差异来自校准尺度对齐后的诊断，不代表两种独立校准输出原本逐项相同。"
  ],
  "topics": [
    "algorithm-acceleration",
    "statistical-genetics",
    "statistical-methods"
  ],
  "readingDepth": "上传的 32 页 v1 正文、Methods、主图、Extended Data Figures 1–4、Supplementary Note 5、补充表及参数；复核 PCA tol-record 与 BOLT 校准尺度；未编译、重跑基准或访问受控个体数据。",
  "published": true,
  "version": "bioRxiv v1",
  "versionDate": "2026-09-12",
  "paperUrl": "https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1",
  "pdfUrl": "https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf",
  "readingType": "本周新作",
  "kind": "paper",
  "peerReviewed": false,
  "inlineFigures": false,
  "reviewedAt": "2026-09-14",
  "codeUrl": "https://github.com/CornellHPC/Mikado/releases/tag/v0.2"
}
---

**原文**：Yifan Li、Qingyao Sun 等. *Sparse Linear Algebra Accelerates Genotype Representation Graph Computation at Biobank Scale*. bioRxiv，2026-09-12，v1，尚未经同行评审。  
**DOI**：[10.64898/2026.09.10.750583](https://doi.org/10.64898/2026.09.10.750583)  
**阅读依据**：用户上传的 32 页 PDF，包括正文、Methods、主图 1–4、Extended Data Figures 1–4、数值分析 Supplementary Note 5、补充表 1–14 与实验参数。本文记载的运行结果未在本次阅读中重跑。

## 1. 核心贡献：不是新的关联模型，而是同一模型的不同计算表示

Mikado 并没有提出新的 GWAS 似然或新的遗传力估计目标。它把 genotype representation graph（GRG）上的传播改写为标准稀疏线性代数，使遗传数据的共享结构能够被 CPU/GPU 内核利用。最值得保留的创新链条是：

**共享基因型结构 → 隐式矩阵乘法 → 稀疏三角求解 → 分块 SpMV/SpMM → 按依赖就绪调度。**

GRG 压缩及图上直接计算来自此前工作；本文新增的是适于并行硬件的代数表述、排序/调度策略及其后端实现。因此，比较 PLINK 与 Mikado 得到的总加速，不能全部归因于本文的 GPU 方法；与既有 GRGL 后端的比较才更接近新增贡献。[Introduction；§2.1，pp.2–5](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=2)

**我的总体判断**：代数核心清楚，应用也确实覆盖统计遗传学的主要瓶颈。最令人信服的是对已有 GRG 的迭代计算加速；最需要审慎解读的是“端到端”的成本边界，以及用极高相关性概括统计推断完全等价。

## 2. 图—矩阵等价关系：为什么无需展开基因型矩阵

### 2.1 GRG 编码的不是任意稀疏基因型矩阵

设 $G\in\{0,1\}^{n_h\times m}$ 是单倍体基因型矩阵，$n_h$ 为单倍型数，$m$ 为变异数；对于 $N$ 个常染色体二倍体个体，通常 $n_h=2N$。GRG 的样本位于叶节点，变异映射到图节点，某变异节点能到达某样本节点，当且仅当该样本携带变异。[§2.1；Methods §4.1](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

GRG 是 **multi-tree DAG**：一个节点可以有多个父节点，但任意有序节点对之间至多有一条有向路径。这条限制是数学等价成立的关键，不是可以省去的图论细节。

按逆拓扑顺序编号，使后代编号小于祖先。令 $A_{uv}=1$ 表示祖先节点 $u$ 指向后代节点 $v$，则 $A$ 为严格下三角矩阵。因为图无环，$A$ 幂零：

$$
T=(I-A)^{-1}=I+A+A^2+\cdots+A^H,
$$

其中 $H$ 可取最长有向路径长度。一般 DAG 中，右侧会统计路径数；GRG 的唯一有向路径性质使它恰好是 0/1 可达关系。**不能把任意有多条路径的 DAG 直接代入后，仍声称得到二元基因型。** 论文讨论的 linear ARG 若有多路径，则需要带符号权重等不同的代数处理。[§2.1；Discussion，p.9](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=9)

### 2.2 选择矩阵把样本、变异与图节点联系起来

令图共有 $K$ 个节点，$S\in\mathbb R^{n_h\times K}$ 选择样本节点，$M\in\mathbb R^{m\times K}$ 将图节点映射到变异，则原文的核心恒等式为：

$$
G=ST^\top M^\top,
$$

$$
Gv=S\big[(I-A)^{-\top}(M^\top v)\big],\qquad
G^\top w=M\big[(I-A)^{-1}(S^\top w)\big].
$$

操作上，先把输入散布到对应图节点，再做三角求解，最后取回样本或变异结果。二倍体剂量可以通过对两条单倍型的求和吸收进样本映射，不必另行物化一个 $N\times m$ 矩阵。[原文式(1)，p.4](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=4)

这里的逆矩阵只用于说明恒等关系。**算法绝不显式构造 $T$ 或求一个稠密逆矩阵**；那会把压缩优势全部消耗掉。

### 2.3 计算量降低来自共享中间结果，GPU 收益来自并行实现

一个简单成本模型是：单个右端向量的图传播需要与节点数、边数及输入输出大小近似线性的工作量，而非逐项扫描稠密 $n_hm$ 元素。本笔记可将其粗略写为 $O(K+E+n_h+m)$；具体耗时还取决于内存访问、分块、稀疏库与缓存。这是成本解释，不是对任意数据集的统一复杂度加速保证。

重复共享的子图让一次中间计算为多个样本服务；这主要来自 GRG 表示。Mikado 进一步改变这些工作在硬件上的执行方式。一个数据集如果图很大、可共享性很弱，或只需一次很小的局部计算，并不会因为使用 GRG/GPU 就自动获益。

## 3. 算法：分层减少串行深度，wavefront 减少不必要等待

作者按节点到叶子的最长路径高度分层，同层内用原 DFS postorder 标签打破平局，以同时保留局部性。相同高度没有依赖边，故 $A$ 的对角块为零；非零的 $A_{km}$ 将源层 $m$ 的结果传向目标层 $k$。[Fig.1；Methods §4.2](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

三层例子对应：

$$
x_0=b_0,\qquad
x_1=b_1+A_{10}x_0,\qquad
x_2=b_2+A_{20}x_0+A_{21}x_1.
$$

传统 level-set 调度把层与层之间设为全局屏障。Mikado 则在 $x_0$ 完成时就启动 $A_{20}x_0$，而不必等待 $x_1$；当 $x_1$ 完成，再启动 $A_{21}x_1$。目标层须等所有必需贡献积累完毕后，才能声明完成。这样既没有忽略依赖，也避免独立工作等待较慢层。[Algorithms 1–2，pp.10–11]

GPU 实现用 cuSPARSE SpMM、CUDA streams/events 编排这些块；CPU 后端用 MKL 的 inspector–executor 稀疏 BLAS。由于 $A$ 的非零值都是 1，作者通过共享全 1 数组与虚拟内存 aliasing 避免反复储存值数组。MKL 的 `optimize` 可改善部分多线程情形，但需要额外内存，不能把它理解为免费开关。[Methods §4.3](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

原文将顺序深度从节点级降至高度级，并指出构建出的 biobank GRG 高度通常约 30、随样本规模近似对数增长。这里应理解为所用 GRG 构建结构的性质与经验表现；任意 DAG 的高度并不必然是 $O(\log n)$。正文使用的 “diameter” 表述也较宽松，调度论证需要的是**最长依赖链**，不是通常无向图的最短路直径。

## 4. 为什么 PCA 和混合模型最受益

以下公式是对原文应用的标准统计结构说明；论文没有逐项写出所有标准化和协变量投影实现。

### 4.1 标准化不会迫使基因型矩阵变成稠密对象

设二倍体基因型为 $B$，各列均值为 $\mu$、尺度矩阵为对角阵 $D$，则：

$$
Z=(B-\boldsymbol1\mu^\top)D^{-1}.
$$

于是：

$$
Zv=B(D^{-1}v)-\boldsymbol1(\mu^\top D^{-1}v),
$$

$$
Z^\top u=D^{-1}\left[B^\top u-\mu(\boldsymbol1^\top u)\right].
$$

中心化与缩放可以在隐式乘法之外作为低成本向量运算完成。PCA 需要反复应用 $ZZ^\top$ 或 $Z^\top Z$；不必先生成全体样本的稠密 GRM。论文主要使用 SciPy/CuPy 的 implicitly restarted Lanczos，并另测 LOBPCG 的块向量情形。[Methods §4.4；Fig.3C](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

### 4.2 BOLT-LMM-inf 加速的对象是协方差算子

经典 infinitesimal LMM 可写为：

$$
y=C\alpha+u+\varepsilon,\quad
u\sim N(0,\sigma_g^2K_g),\quad
\varepsilon\sim N(0,\sigma_e^2I),\quad K_g=\frac1mZZ^\top.
$$

CG 所需的基本协方差乘法是：

$$
Vv=\frac{\sigma_g^2}{m}Z(Z^\top v)+\sigma_e^2v.
$$

所以一次协方差算子应用包含一次 $Z^\top v$ 和一次 $Z(\cdot)$；协变量处理与 LOCO 再附加相应投影或染色体排除。原文 Methods §4.4 用 $GG^\top x=y$ 简写计算核心，但那不是带残差方差的完整 LMM 方程。

遗传力估计、Monte Carlo 近似和 LOCO 校准需要许多轮此类运算，因而每次乘法节约的成本可被反复放大。**本文实测的是 BOLT-LMM-inf，不是完整混合先验 BOLT-LMM，也不是严重病例不平衡下的二元性状 GLMM。** 同一个计算后端不能替代这些模型之间的统计区别。[§2.3.2；Methods §4.4](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

## 5. 实证数据：全队列 PCA 与身高 LMM 并不是同一个样本集

| 数据/用途 | 样本与变异 | 必须保留的范围 |
|---|---|---|
| AoU v8 原始 phased 数据 | 414,830 人；870,337,413 个变异；22 条常染色体 | 内核和主要 PCA 基准；不是 83 万独立人 |
| AoU BOLT 过滤后基因型 | 220,760 名 EUR 个体；44,626,943 个 SNP | MAF ≥ $5\times10^{-5}$、HWE $P\geq10^{-12}$，移除多等位及非 SNP 位点 |
| AoU 身高 LMM | 上述集合中 208,382 人有身高 | 包括测量及自报身高，协变量为性别、年龄及前 10 PCs |
| 模拟 200k、500k | 四群体人口史模型，CEU/CHB/JPT/YRI 各占相同比例 | 全常染色体用于扩展性；200k 的 BOLT 比较仅 chr19–22 |
| 1000 Genomes | 3,202 人 | 小规模正确性及运行基准；不同任务有不同变异过滤 |

来源：Methods §4.5–4.6、Supplementary Tables 1–8，pp.13–14、24–27。这里的 ancestry 标签属于作者的数据分组。不能把在多祖源基因型上的 PCA 测试，解释成身高 LMM 已在所有祖源中完成推断验证。

GRG 的 lossless 指对输入基因型的精确编码，并不意味着原始分型和相位没有误差。本文主要基于 phased calls，未系统评估把基因型剂量不确定性、复杂缺失机制或不同相位误差模式纳入统计模型后的行为。

特别要注意，主要 PCA 用几乎未过滤的 WGS 变异，这是很强的计算压力测试；但并未证明“全变异 PCA”优于特定分析中采用适当 MAF、LD、长程 LD 区域控制后的群体结构校正。这篇论文解决的是**怎么算**，没有系统比较不同 PCA 变异选择策略的统计效果。

## 6. 速度结果应按基线、硬件和计算阶段拆开

| 实验 | 作者报告的比较 | 合理解释 |
|---|---|---|
| AoU 核心乘法，$k=1$ | 单 A100 相对单线程 GRGL：向上几何均值 452×、向下 326×；最高向上 473× | GPU 与单线程 CPU 的内核比较，不是所有 GWAS 端到端 473× |
| 同为 GPU，模拟 500k | 相对直接 SpTRSV：向上 2.8×、向下 1.3×；相对优化 graph-first 约 3.2× | 更直接隔离分块调度相对其他 GPU 方案的贡献 |
| AoU 全常染色体 PCA，10 PCs | 四张 A100：180 秒；GRGL：5,391 秒；约 30× | 这一结果不是单卡完成；作者云价格下约 1.00 美元对 4.72 美元 |
| AoU 身高 BOLT-LMM-inf | 单张 A100 相对 GRGL 端到端 18.7×，作者计算的成本效率约 11.7× | 官方 BOLT 在该 AoU 配置未运行，不能报告对它的实测加速比 |
| 模拟 200k、chr19–22 BOLT | 相对官方 BOLT 约 1,480×；GRGL 自身约 19.4× | 大幅度包含 GRG 表示收益；不是 AoU 的官方 BOLT 对照 |
| AoU chr11 单次普通 GWAS | Mikado CPU 34 秒、GPU 46 秒、GRGL 60 秒、PLINK2 4,457 秒 | CPU 快于 GPU；I/O/装载成为主要开销 |

这些结果来自 Figures 2–4、Extended Figure 3 与相应图注。作者所称 end-to-end **排除了预先将云端数据暂存到 RAM disk 的时间**；GWAS/BOLT 对照还排除了结果写出时间。它们也不是“从原始 VCF 开始，含首次 GRG 构建”的全工作流成本。云费用是论文实验时的计价，不是当前报价。[Methods §4.5；Figs.3–4；Extended Fig.3](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

可以用一个成本分解概括这一现象：

$$
T_{\rm total}=T_{\rm prepare}+T_{\rm load}+qT_{\rm matvec}+T_{\rm other}.
$$

这是本笔记的解释式。$q$ 很大时，PCA/LMM 可摊薄准备成本；$q$ 很小时，内核再快也难以减少全部耗时。对于已有重复分析需求的 cohort，预处理成本可摊销；只做一个很小的 cis 区域时则未必。

另外，官方 BOLT 的基准命令设有 `--maxModelSnps <N_TOTAL_SNPS>`。因此该对照允许把全部基准 SNP 纳入建模，**不能将 1,480× 直接外推成相对任何常用 BOLT 工作流的普遍比值**。建模 SNP 数、测试 SNP 数、任务参数必须匹配。[Extended Section 3，p.30](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=30)

## 7. 统计正确性：相关接近 1，不等于原始 P 值逐项相同

### 7.1 作者确实进行了多层一致性检查

普通 GWAS 在 1000 Genomes 的对照中，各统计量 $R^2>0.999$，报告最大绝对误差小于 $10^{-5}$。PCA 对齐特征向量符号后，与 GRGL 的前 10 PCs 余弦相似度报告为 1.000；与 PLINK2 的 AoU 比较限于前 6 PCs，原因是作者观察到 PLINK2 后四个主成分跨运行不稳定。[Methods §4.6](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

此外，PCA 的 GPU 基准使用 `--tol-record` 读取对应 GRGL 运行记录，以对齐 CuPy 求解器的停止准则。这是原文明确报告的基准设计，有助于避免用不同收敛精度交换速度，但也意味着其比较不是完全独立默认参数下的黑盒运行。复现时应保留该设置，另行评估不借助参考停止记录时的收敛与性能；不能只核对随机种子和 PC 数。[Extended Section 3，p.29](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=29)

对于 BOLT 模拟，真值 $h^2=0.6$，官方 BOLT 与 Mikado 估计分别为 **0.579444** 和 **0.577319**。这支持两个实现结果接近，但单次模拟点估计没有给出抽样误差、重复模拟偏差或覆盖率，因此不应独立表述为“证明无偏且统计功效完全保持”。

### 7.2 补充材料中的诊断图使用了校准尺度对齐

两种实现分别采用 Boost 和 NumPy 的随机数生成器；相同 seed 不产生相同 Monte Carlo 探针及校准 SNP。Supplementary Note 5 报告，这一次运行的校准因子为 1.09367 与 1.053465，比例 **1.038164**。为了隔离逐 SNP 数值运算差异，作者仅在诊断图中把 Mikado 的统计量放到官方 BOLT 的本次校准尺度上。[pp.22–23]

尺度对齐后，3,391,600 个 SNP 的比较得到：过原点斜率 0.999955，$R^2=0.999999871$；绝对 $\chi^2$ 误差中位数 0.00171、99 百分位 0.0256、最大值 0.425；在 $P<5\times10^{-8}$ 时有 45,818 个共同显著调用和 17 个阈值跨越差异。

**这些误差与 17 个差异属于尺度对齐后的比较，不是两种实现各自完成内部校准、但尚未对齐参考尺度时的原始输出一致性报告。** Mikado 的原始结果已有其自身的内部校准；“未对齐到 BOLT 本次尺度”不等于“未校准”。 日常运行 Mikado 无需官方 BOLT 结果，作者也没有要求用户额外乘这个比值。对齐是比较工具，不是生产流程步骤。

统计上，相关系数对统一正比例缩放不敏感，因而 $R^2$ 极高本身不能检验绝对校准。一个约 3.8% 的整体尺度差异仍可能改变靠近显著阈值的 P 值。进一步验证应在**不借助参考输出缩放**的条件下，重复零假设及备择模拟，分开报告 Monte Carlo 变异、数值误差、type-I error、功效和阈值决策的一致性。这是针对现有证据边界提出的验证要求，并非断言 Mikado 的统计量失效。

## 8. 内存、数据移动与复现条件

`.grg_spmv` 尚未使用原生 GRG 的 delta encoding，体积约为其 1.9 倍；CPU 基准中常见内存开销为 GRGL 的 1.6–2.0 倍，开启 MKL 优化可进一步上升。[Methods §4.3；Fig.3D](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

GPU 可将不同染色体分配到不同设备，当前描述不是把一条超大 GRG 任意切分到多卡。作者还实现并测试了 host-memory streaming：双缓冲按需搬运块。强制 streaming 相对于 resident，在 A100 上慢逾 6 倍，在 GH200 上不到 3 倍。放大核对 Extended Figure 2 的柱上标值后，A100 向上为 1,547/192 ≈ 8.06 倍、向下为 1,647/267 ≈ 6.17 倍；GH200 则为 268/104 ≈ 2.58 倍和 364/146 ≈ 2.49 倍，**与图注一致**。这些比值是本笔记从原图标值计算，不能将相邻平台的柱子错配。这说明设备容量限制可以缓解，但性能将依赖 CPU–GPU 链路带宽；不能把 Discussion 中的扩展愿景误写成 streaming 还完全不存在。[Extended Fig.2，p.20；Methods §4.3](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf#page=20)

多右端向量也不保证平滑获益。Figure 2 图注明确报告 $k=1\to2$ 时 GPU 耗时向上增加 7.5 倍、向下增加 3.4 倍，而 $k=2\to16$ 只再增加 1.4/1.7 倍，反映稀疏库内核切换。故在多表型 QTL 中，batch size 应实测，不能照搬深度学习中的“大 batch 一定更快”。

原文实验依赖 float64，并注明特定 cuSPARSE 版本修复数值精度问题。代码资源固定到 [Mikado v0.2](https://github.com/CornellHPC/Mikado/releases/tag/v0.2)，附 grgl/grapp/grg-spmv 版本与 Docker/benchmark 文件。该说明来自上传论文；本次没有编译、执行或独立审计这些实现，不能保证任意环境直接运行。[Methods §4.5–4.6；Extended Sections 2–3](https://www.biorxiv.org/content/10.64898/2026.09.10.750583v1.full.pdf)

## 9. 对我们的单细胞 QTL 与算法优化研究有什么启示

### 9.1 先找到反复调用的线性算子，再决定加速后端

最适合迁移的不是“GRG”三个字，而是把统计计算接口抽象为 $Zv$、$Z^\top u$、协方差算子和必要的预条件器。这样可在不改变模型的情况下，对比显式矩阵、压缩图、CPU 稀疏库和 GPU 后端，并让同一套正确性测试覆盖它们。

对于单细胞 QTL，基因型在 donor 层重复，不能把细胞数当成独立遗传样本数。以下是本笔记的可研究结构，不是 Mikado 已实现的单细胞模型：设 $H$ 为细胞到 donor 的关联矩阵，donor 级标准化基因型为 $Z_d$，则某类 donor 遗传随机效应在细胞层诱导的协方差为：

$$
K_{cell}=H\frac{Z_dZ_d^\top}{m}H^\top.
$$

应用于向量时：

$$
K_{cell}v=\frac1mHZ_d\left[Z_d^\top(H^\top v)\right].
$$

可以先把细胞信息汇总到 donor，再进行压缩基因型计算，最后映回细胞；不必把每个 donor 的基因型复制到所有细胞。但完整模型仍可能需要 donor 随机截距、状态依赖效应、细胞层异方差或非高斯观测模型，不能用这个代数恒等式代替它们。

### 9.2 多表型与重复模拟可能比单次 cis 扫描更有收益

同一 cohort 的多个基因、细胞类型、环境状态以及 null simulations，能够重复使用准备好的 genotype operator；这更符合 Mikado 的摊销条件。相反，只有几百个 donor、每次几千个局部 SNP 的 cis-eQTL，显式 dense BLAS/GPU 矩阵乘法可能更简单也更快。

SuSiE-RSS 等已在局部 summary statistics 与 LD 上工作的分析，也不会仅因为全基因组 $Gv$ 加速就自然获得相同收益。需要先确定瓶颈是在构建 LD、反复个体级拟合，还是局部后验更新；不能把算子适用性与完整方法加速混为一谈。

### 9.3 Benchmark 应区分三个层次

最小可行验证应同时回答：**代数是否一致、统计推断是否一致、真实工作流是否更便宜**。小矩阵显式对照可检查 REF/ALT、样本顺序、二倍体合并、中心化和缺失值；重复模拟检查 type-I error 和功效；真实数据记录构图/转换、载入、设备传输、求解、写出、峰值内存及多轮摊销。

本文提供了第一层的清楚代数和不少第二层数值证据，也展示第三层的巨大潜力；我们的工作若进一步把零假设校准、极不平衡或多层相关结构、全成本摊销补全，会比单报某个 GPU speedup 更具有统计方法学说服力。

## 10. 原文中影响复现的表述差异

正文 §4.4 将普通 GWAS 写成 kernel-bound，但 Extended Figure 3 和 Discussion 明确说该实测任务主要由装载支配；本笔记以具体运行分解解释该结果。§2.2 对 $k=1\to2$ 的“sublinear”描述也不能替代 Figure 2 图注中的实际倍数。

Methods 规定保留达到 MAF 阈值的变异，而 Supplementary Tables 5、7 的表题却写成删除 $\mathrm{MAF}\geq$ 阈值；复现时应核对脚本，不能默默选一种解释。另有 AoU `.grg_spmv` 总体积正文 193 GB、补充表 1 为 197 GB，以及 1000 Genomes 变异总数正文与表 4 不同。本笔记不自行替作者统一这些口径，也没有用这些差异否定代数核心。

**最终评价**：Mikado 的价值是证明了一种可复用的统计计算重构：既不展开压缩基因型，也不改变上层模型，通过标准算子实现显著加速。对我们最重要的不是“所有任务上 GPU”，而是识别重复算子、保存统计假设，并把数值一致性与推断校准分别验证。

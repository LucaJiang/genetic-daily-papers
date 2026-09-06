# 来源与核验范围 · 2026-09-06

本期按用户确认归入 2026-09-06；检索截止 2026-09-05。论文实际公开日期与日报日期分开，ColocBoost 另记录版本更新日期。

| 论文 | 核验范围 | 说明 |
|---|---|---|
| Dynema | 用户补充的 v1 全文、Methods、Supplementary Notes 1–2 与原图 | 已由简报更新为全文解读；59 页 PDF 未含补充图、数值表本体。 |
| ColocBoost | 用户补充的 v3 全文、Methods、Table 2 与原图 | 已替换基于 v2 的解读与图；61 页 PDF 未含独立 Supplementary Note 及补充数值表。 |
| 非线性 ML 与标准 PRS | medRxiv 全文 PDF/JATS、作者代码 | 未完整核验补充材料；记录评价集重新拟合校准模型的范围。 |
| 空间转录组 CNA 评测 | Nature Communications 接受稿全文 | Article in Press；未逐一核验全部补充材料。区分切片、donor 和参考标准。 |

## 论文与版本

- **Efficient genome-wide mapping of reproducible, context-dependent eQTLs at single-cell resolution**：2026-08-29。https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1
  - 代码：https://github.com/immunogenomics/Dynema.jl
- **Integrative multi-omics QTL colocalization maps regulatory architecture in aging human brain**：2025-04-20；v3 更新 2026-09-04。https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3
  - 代码：https://github.com/StatFunGen/colocboost
- **Genetic Architecture and Sample Size Impact Relative Performance of Nonlinear Machine Learning and Standard Polygenic Risk Scores**：2026-09-03。https://www.medrxiv.org/content/10.64898/2026.08.29.26361109v1
  - 代码：https://github.com/JZhu919/NonlinearMLvsStandardPRS
- **Benchmarking copy number alteration inference methods for spatial transcriptomics**：2026-09-05。https://www.nature.com/articles/s41467-026-77500-5
  - 代码：https://github.com/YangLabHKUST/ST-CNABench

## 原图来源与完整性

当前 9 张原图均已视觉核对；没有生成、放大重绘或重建数据图。PRS 图来自作者仓库；CNA 图保留接受稿完整页面。Dynema 新增 Figure 2、6、7，ColocBoost Figure 2、6 已替换为 v3 PDF 的原生完整嵌入图，保留面板、文字和原始分辨率，透明蒙版按原 PDF 白底呈现。历史 v2 图片保留在版本历史中，不再由本期文章引用。

| 文件 | 原图与许可 | 尺寸 | SHA-256 |
|---|---|---|---|
| `nonlinear-ml-standard-prs-fig2.png` | [Figure 2 · 交互方差与样本量对预测的影响](https://github.com/JZhu919/NonlinearMLvsStandardPRS/blob/01f2f33421a754273fe8900cb2d916823830a622/simulation/figures/lambdaI_comparison_all.png) · CC BY 4.0 | 3600 × 4500 | `450dcc807926de4070eb82738816c3f9a40ef0127167ebd54eaa9c64b29be443` |
| `nonlinear-ml-standard-prs-fig4.png` | [Figure 4 · UKB 缺血性心脏病预测](https://github.com/JZhu919/NonlinearMLvsStandardPRS/blob/01f2f33421a754273fe8900cb2d916823830a622/ukb_ihd/figures/incremental_metrics_test_4x2.png) · CC BY 4.0 | 2850 × 2550 | `0af62e3482429cd915f73a13adad213de1241a04f7eb7d68694627cacb660bd2` |
| `spatial-cna-benchmark-fig2.png` | [Figure 2 · CNA 谱与事件恢复](https://www.nature.com/articles/s41467-026-77500-5_reference.pdf#page=4) · CC BY-NC-ND 4.0 | 1241 × 1648 | `bc48a6ac67796540a2b061c1c0d92f095bd957b4f4f5013c3f70e0d426a0e073` |
| `spatial-cna-benchmark-fig6.png` | [Figure 6 · 任务表现与数据条件](https://www.nature.com/articles/s41467-026-77500-5_reference.pdf#page=12) · CC BY-NC-ND 4.0 | 1241 × 1648 | `622354e81fc5f9531a32dd541fe13984abb8d4b8eb0fd6e5d4862c5b919daa64` |

| `dynema-context-eqtl-v1-fig2.png` | [Figure 2 · 统计校准、计算时间与功效](https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1.full.pdf#page=51) · CC BY-NC-ND 4.0 | 1331 × 1394 | `7c61465de5b4b1c4441dd64e2a041c09aef1b66f808a1022e090922d36bbbc1b` |
| `dynema-context-eqtl-v1-fig6.png` | [Figure 6 · 全 cis 扫描与条件交互信号](https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1.full.pdf#page=55) · CC BY-NC-ND 4.0 | 972 × 1174 | `4c012593bb9a78b797896200e753ab059701c82967b95021db107fc4c09e6d70` |
| `dynema-context-eqtl-v1-fig7.png` | [Figure 7 · TSPAN32、CTSS 与自身免疫病共定位](https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1.full.pdf#page=56) · CC BY-NC-ND 4.0 | 1020 × 1400 | `bfa9eecdbcf36b7a5d3504f6f62c2f3c86d60bfc8dca41ca1ccadb3b7e41180b` |
| `colocboost-multiomics-v3-fig2.png` | [v3 Figure 2 · 共定位功效与概率校准](https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf#page=9) · CC BY 4.0 | 1946 × 2640 | `c6cf56bed01a5bf7f6558c3a8935638e3ba9d5bf26fff02deb8c3ba3c96fd637` |
| `colocboost-multiomics-v3-fig6.png` | [v3 Figure 6 · AD 共定位与 BLNK、CTSH 位点](https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3.full.pdf#page=26) · CC BY 4.0 | 1831 × 2697 | `2c0da26d7f10c2c2059f98ce40c0b39b09f7d77bab61bbb2e80e10a7ba9de8ad` |

## 全文补充与版本核验

- Dynema：主效应检验使用无交互模型；多状态交互和总效应为 3/4 d.f.。记录条件独立判定、CTSS 图文 PP.H4 的不一致及多自由度统计量进入 coloc 的说明不足。
- ColocBoost：解释平滑概率到 VCP 的层次，区分 FineBoost 单性状校准与多性状 VCP；补充强残差相关下 FDR 膨胀和分样本重现的范围。保留 16,503/16,504 的差异，并校正 AD 位点数量与遗传力比较对象。
- 全文补充保留两篇原有 URL、9 月 6 日归档和真实发表／修订日期。没有新增重复论文或改变历史日报的引用数量。

## 构建核验

此前两篇全文补充后的生产构建通过内容、公式、图片及搜索检查，原图已逐一视觉核验。按用户相关性反馈移除一篇后，9 月 6 日保留 4 篇；本次删除的内容引用、页面数量、图片和搜索一致性检查由发布流水线重新执行。此前浏览器预览被环境拦截，未将桌面及移动端视觉复核记为通过。

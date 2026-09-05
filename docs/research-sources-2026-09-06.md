# 来源与核验范围 · 2026-09-06

本期按用户确认归入 2026-09-06；检索截止 2026-09-05。论文实际公开日期与日报日期分开，ColocBoost 另记录版本更新日期。

| 论文 | 核验范围 | 说明 |
|---|---|---|
| Dynema | bioRxiv 官方摘要、作者文档与代码 | 全文请求返回 429；以论文简报发布，不作为全文精读。 |
| ColocBoost | v3 官方摘要、可读 v2 全文和原图 | v3 全文返回 403。方法、详细结果及图片均标明依据 v2，不推断 v3 具体修改。 |
| 非线性 ML 与标准 PRS | medRxiv 全文 PDF/JATS、作者代码 | 未完整核验补充材料；记录评价集重新拟合校准模型的范围。 |
| 影像视野混杂 | medRxiv 全文 PDF/JATS | 区分表征分析 69,932 人与主 GWAS 53,436 人；区分裁剪、重新训练和残差化顺序的组合变化。 |
| 空间转录组 CNA 评测 | Nature Communications 接受稿全文 | Article in Press；未逐一核验全部补充材料。区分切片、donor 和参考标准。 |

## 论文与版本

- **Efficient genome-wide mapping of reproducible, context-dependent eQTLs at single-cell resolution**：2026-08-29。https://www.biorxiv.org/content/10.64898/2026.08.25.747138v1
  - 代码：https://github.com/immunogenomics/Dynema.jl
- **Integrative multi-omics QTL colocalization maps regulatory architecture in aging human brain**：2025-04-20；v3 更新 2026-09-04。https://www.medrxiv.org/content/10.1101/2025.04.17.25326042v3
  - 代码：https://github.com/StatFunGen/colocboost
- **Genetic Architecture and Sample Size Impact Relative Performance of Nonlinear Machine Learning and Standard Polygenic Risk Scores**：2026-09-03。https://www.medrxiv.org/content/10.64898/2026.08.29.26361109v1
  - 代码：https://github.com/JZhu919/NonlinearMLvsStandardPRS
- **Field-of-view confounding shapes genetic discovery from self-supervised cardiac-imaging phenotypes**：2026-09-04。https://www.medrxiv.org/content/10.64898/2026.09.01.26361959v1
  - 代码：https://github.com/Devanshpandey/ssl-imaging-genetics
- **Benchmarking copy number alteration inference methods for spatial transcriptomics**：2026-09-05。https://www.nature.com/articles/s41467-026-77500-5
  - 代码：https://github.com/YangLabHKUST/ST-CNABench

## 原图来源与完整性

8 张原图均已视觉核对；没有生成、放大重绘或重建数据图。PRS 图来自作者仓库；影像图保留完整原图并裁去页面外边距；CNA 图保留接受稿完整页面；ColocBoost 使用 PMC v2 原始 JPEG。ColocBoost 可读整图分辨率有限，未用不完整 panel 冒充整图。

| 文件 | 原图与许可 | 尺寸 | SHA-256 |
|---|---|---|---|
| `colocboost-multiomics-v2-fig2.jpg` | [v2 Figure 2 · 共定位功效与错误发现率](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/126a45eb540c/nihpp-2025.04.17.25326042v2-f0002.jpg) · CC BY 4.0 | 655 × 720 | `ea826d5107f713af33c52614e71f5b2916e5f7ad92ea3222a46309c89d027234` |
| `colocboost-multiomics-v2-fig6.jpg` | [v2 Figure 6 · AD–QTL 共定位与 BLNK、CTSH 位点](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4fba/12083576/0392eaab0259/nihpp-2025.04.17.25326042v2-f0006.jpg) · CC BY 4.0 | 611 × 899 | `56fc377b3b90881f32692bcfb273978a5ed1a1f20139e4a4a826a7ffc19284b8` |
| `nonlinear-ml-standard-prs-fig2.png` | [Figure 2 · 交互方差与样本量对预测的影响](https://github.com/JZhu919/NonlinearMLvsStandardPRS/blob/01f2f33421a754273fe8900cb2d916823830a622/simulation/figures/lambdaI_comparison_all.png) · CC BY 4.0 | 3600 × 4500 | `450dcc807926de4070eb82738816c3f9a40ef0127167ebd54eaa9c64b29be443` |
| `nonlinear-ml-standard-prs-fig4.png` | [Figure 4 · UKB 缺血性心脏病预测](https://github.com/JZhu919/NonlinearMLvsStandardPRS/blob/01f2f33421a754273fe8900cb2d916823830a622/ukb_ihd/figures/incremental_metrics_test_4x2.png) · CC BY 4.0 | 2850 × 2550 | `0af62e3482429cd915f73a13adad213de1241a04f7eb7d68694627cacb660bd2` |
| `imaging-fov-confounding-fig2.png` | [Figure 2 · 处理流程、残留混杂与心脏信息保留](https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.01.26361959.full.pdf#page=6) · CC BY 4.0 | 1431 × 1365 | `d7f7a9e4cc416a4c4c944fea9f2a687fc86c27b2edb12aedca94e989118fab17` |
| `imaging-fov-confounding-fig3.png` | [Figure 3 · 遗传位点与敏感性分析](https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.01.26361959.full.pdf#page=8) · CC BY 4.0 | 1431 × 1164 | `5c0637d1e3cb74ba9e1c8ccfe332d9f910b18302a4c88c058f3bf7ffb38e9c03` |
| `spatial-cna-benchmark-fig2.png` | [Figure 2 · CNA 谱与事件恢复](https://www.nature.com/articles/s41467-026-77500-5_reference.pdf#page=4) · CC BY-NC-ND 4.0 | 1241 × 1648 | `bc48a6ac67796540a2b061c1c0d92f095bd957b4f4f5013c3f70e0d426a0e073` |
| `spatial-cna-benchmark-fig6.png` | [Figure 6 · 任务表现与数据条件](https://www.nature.com/articles/s41467-026-77500-5_reference.pdf#page=12) · CC BY-NC-ND 4.0 | 1241 × 1648 | `622354e81fc5f9531a32dd541fe13984abb8d4b8eb0fd6e5d4862c5b919daa64` |

## 构建核验

生产构建通过内容、Astro 类型、静态产物、公式与图片检查。浏览器预览服务运行正常，但浏览器访问被环境拦截，未完成本次桌面及移动端视觉复核；没有将此记为通过。

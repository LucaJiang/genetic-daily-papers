# Genetic Daily Papers

Statistical genetics, molecular QTL and cell/spatial genetics reading notes.

Production: [papers.lucajiang.com](https://papers.lucajiang.com)

## 用 GPT Astra 复现为自己的研究网站

想沿用本站的论文精读、按日归档、数据资源目录和全文搜索，换成**你自己的研究领域、文章和数据**？可以让 GPT Astra 在你自己的 fork 中完成迁移。

**[完整指南：可复制的开场 Prompt、研究画像与多轮对话示例 →](docs/reproduce-with-astra.md)**

1. Fork 本仓库，准备自己的仓库地址、站名和部署目标；在使用 Astra 的环境中提供仓库访问，以及需要的网页检索、PDF 阅读和代码执行能力。
2. 填写指南中的研究画像：核心问题、应收录的论文及理由、看似相关但应排除的反例、数据资源字段、语言和时间窗口。
3. 复制开场 Prompt，让 Astra 读取仓库并给出首批候选；用你的反馈校准选文标准，再确认要精读的文章。
4. 上传必要的全文或最新版 PDF，要求它同步迁移领域配置、资源结构、示例内容和测试，并交付可检查的草稿。
5. 审阅内容和预览后，明确授权发布到你自己的仓库与网站；之后用指南中的短提示词更新论文、数据和刊期。

本站当前的 QTL 资源字段、遗传学选题规则和部分测试样例需要随领域一起调整。Fork 不会自动连接你的托管账号，也不会自动开始每日搜论文。指南包含这些迁移步骤和发布边界。

## Content

- `src/content/daily/YYYY-MM-DD.md`: dated issues referencing canonical paper IDs; new issues start with `published: false`.
- `src/content/papers/<slug>.md`: independent reviews with real publication dates, bibliography and figure attribution; new reviews start unpublished.
- A paper appears in the public catalog when it is published and referenced by a published issue.
- `src/data/research-profile.json`, [selection guide](docs/selection-guide.md) and [review standard](docs/selection-and-review.md): research scope and editorial rules.
- `src/data/qtl-resources.json`: resource directory; all entries are public when deployed, with no per-resource draft flag.
- Place `[[figure:figN]]` beside the relevant result, matching the corresponding `figures[].id`, and provide a verified local image asset.

## Build

Requires Node.js 22. In the repository directory:

```bash
npm ci
npm run build
npm run preview
```

The build retrieves configured figure assets, checks Astro types, renders KaTeX and validates content, internal links, issue counts, inline figures and search. A failed check prevents deployment.

Cloudflare Pages listens to `master`, runs `npm run build`, and serves `dist`. GitHub Actions validates pull requests to `master` and pushes to the branches configured in [.github/workflows/build.yml](.github/workflows/build.yml). Fork owners must connect their own hosting project and check the production branch.

There is no scheduled paper-generation workflow in this repository; publishing remains manual during review.

## License

Repository code is covered by [LICENSE](LICENSE). Check the separate reuse terms for third-party papers, figures and datasets.

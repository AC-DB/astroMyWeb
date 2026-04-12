# astroMyWeb

![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)
![pnpm >= 10](https://img.shields.io/badge/pnpm-%3E%3D10-blue)
[![DeepWiki](https://img.shields.io/badge/DeepWiki-saicaca)](https://deepwiki.com/ac-db/astroMyWeb)

本项目基于 [Astro](https://astro.build) 框架与 [Fuwari](https://github.com/saicaca/fuwari) 静态博客模板开发。

[**🖥️在线预览(Vercel）**](https://www.atsuko.top/)

![Preview Image](https://raw.githubusercontent.com/ac-db/resource/main/astroMyWeb/home.png)

## 常用开发命令

在项目根目录下，使用 `pnpm` 运行以下常用命令：

| Command                           | Action                            |
|:----------------------------------|:----------------------------------|
| `pnpm install` 并 `pnpm add sharp` | 安装依赖                              |
| `pnpm dev`                        | 在 `localhost:4321` 启动本地开发服务器  |
| `pnpm build`                      | 构建网站至 `./dist/`                   |
| `pnpm check`                      | 检查语法问题                           |
| `pnpm format`                     | 格式化代码                             |
| `pnpm preview`                    | 本地预览已构建的网站                    |
| `pnpm new-post <filename>`        | 创建新文章至 `src/content/posts/`      |
| `pnpm astro ...`                  | 执行 `astro add`, `astro check` 等指令 |
| `pnpm astro --help`               | 显示 Astro CLI 帮助                    |

## 帖子前言

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # 仅当帖子的语言与“config.ts”中的网站语言不同时才设置
---
```

## 核心代码结构指南

如果你需要修改博客功能或样式，请主要关注 `src` 目录：

```text
 MyWeb/
 ├── src/                         # 源代码目录
 │   ├── assets/                  # 静态资产 (图片)
 │   ├── components/              # Astro/Svelte 组件库
 │   │   ├── widget/              # 小部件组件 (TOC, Tags, SideBar等)
 │   │   ├── control/             # 控制组件 (Button, Pagination等)
 │   │   ├── misc/                # 杂项组件 (Markdown包装等)
 │   │   └── *.astro/.svelte      # 主组件 (Footer, Navbar等)
 │   ├── content/                 # 内容管理 (Astro Content Collections)
 │   │   ├── posts/               # 博客文章 (Markdown)
 │   │   ├── spec/                # 特殊页面 (about.md)
 │   │   └── config.ts            # 内容配置
 │   ├── layouts/                 # 页面布局组件
 │   │   ├── Layout.astro         # 主布局
 │   │   └── MainGridLayout.astro # 网格布局
 │   ├── pages/                   # 路由页面 (Astro路由)
 │   │   ├── [...]page.astro      # 分页首页
 │   │   ├── posts/[...slug].astro # 文章详情页
 │   │   ├── archive.astro        # 档案页
 │   │   ├── about.astro          # 关于页
 │   │   ├── rss.xml.ts           # RSS订阅
 │   │   └── robots.txt.ts        # 爬虫协议
 │   ├── i18n/                    # 国际化模块
 │   │   ├── translation.ts       # 翻译接口
 │   │   ├── i18nKey.ts           # 翻译键
 │   │   └── languages/           # 8种语言支持
 │   ├── styles/                   # 样式文件
 │   │   ├── main.css             # 主样式
 │   │   ├── markdown.css         # Markdown样式
 │   │   ├── variables.styl       # Stylus变量
 │   │   └── *.css                # 特定功能样式
 │   ├── plugins/                 # Markdown处理插件
 │   │   ├── remark-*.mjs/js      # Remark插件
 │   │   ├── rehype-*.mjs         # Rehype插件
 │   │   └── expressive-code/     # 代码块增强
 │   ├── types/                    # TypeScript类型定义
 │   ├── constants/                # 常量定义
 │   ├── utils/                    # 工具函数库
 │   ├── config.ts                 # 主配置文件
 │   └── *.d.ts                    # 类型声明文件
 │
 ├── public/                       # 公共资源 (直接复制到dist)
 ├── docs/                         # 文档目录
 ├── scripts/                      # 脚本文件 (new-post.js等)
 ├── dist/                         # 构建输出目录
 │
 ├── 配置文件:
 │   ├── astro.config.mjs         # Astro配置 (集成、markdown插件)
 │   ├── tsconfig.json            # TypeScript配置
 │   ├── tailwind.config.cjs      # Tailwind CSS配置
 │   ├── postcss.config.mjs       # PostCSS配置
 │   ├── svelte.config.js         # Svelte配置
 │   ├── biome.json               # Biome代码格式化工具配置
 │   └── pagefind.yml             # 搜索配置
 │
 └── package.json                 # 项目依赖及脚本
```

## 技术栈

| 分类         | 技术                            |
|--------------|---------------------------------|
| 静态生成器   | Astro 5.16.4                    |
| UI框架       | Svelte 5.45.5                   |
| 样式         | Tailwind CSS 3.4 + Stylus       |
| Markdown     | markdown-it + Remark/Rehype插件 |
| 代码展示     | Expressive Code                 |
| 搜索         | Pagefind                        |
| 图标         | Iconify + Font Awesome          |
| 数学公式     | KaTeX                           |
| 页面转换     | Swup.js                         |
| 图片处理     | Sharp                           |
| 代码质量     | Biome + TypeScript              |

## Markdown 扩展语法

Astro 除了默认支持 [GitHub Flavored Markdown](https://github.github.com/gfm/) 之外，还新增了以下几项 Markdown 功能：

- 警告([预览和使用](https://fuwari.vercel.app/posts/markdown-extended/#admonitions))
- GitHub 代码库卡片([预览和使用](https://fuwari.vercel.app/posts/markdown-extended/#github-repository-cards))
- 使用 Expressive Code 增强代码块([预览](https://fuwari.vercel.app/posts/expressive-code/) / [文档](https://expressive-code.com/))

## 许可证协议

本项目遵循 MIT 许可证。

基于开源项目 [Fuwari](https://github.com/saicaca/fuwari) 开发，感谢原作者的开源贡献。


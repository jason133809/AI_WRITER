# AI 写作助手

## 项目简介

一个基于 Next.js 和 OpenRouter API 的 AI 写作助手，帮助用户快速生成高质量文本内容。

## 技术栈

- Next.js 13+ (App Router)
- React
- Tailwind CSS
- shadcn/ui
- OpenRouter API

## 功能特性

- 多模型选择支持
- 可自定义语气和角色
- 响应式设计
- 实时结果展示
- 一键复制功能

## 开发进度

详见 [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md)

## 本地运行

1. 克隆项目

```bash
git clone <repo-url>
cd ai_writer
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 添加 OPENROUTER_API_KEY
```

4. 启动开发服务器

```bash
npm run dev
```

5. 访问 http://localhost:3000

## 环境变量

- `OPENROUTER_API_KEY`: OpenRouter API 密钥

## 部署

项目配置为可直接部署到 Vercel。

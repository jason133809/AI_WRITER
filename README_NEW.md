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

- 多模型选择支持 (DeepSeek R1, Mistral 7B 等)
- 可自定义语气和角色
- 响应式设计，支持移动端
- 实时结果展示
- 一键复制功能
- 高级设置 (语言、语气、角色)

## 开发进度

详见 [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md)

## 本地运行

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

1. 克隆项目

```bash
git clone <repo-url>
cd ai_writer
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加你的 OpenRouter API Key:

```env
OPENROUTER_API_KEY=your_actual_openrouter_api_key
SITE_URL=http://localhost:3000
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

5. 访问应用
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 获取 OpenRouter API Key

1. 访问 [OpenRouter](https://openrouter.ai/)
2. 注册账号并登录
3. 在控制台获取 API Key
4. 将 API Key 添加到 `.env.local` 文件中

## 环境变量

- `OPENROUTER_API_KEY`: OpenRouter API 密钥 (必需)
- `SITE_URL`: 网站 URL，用于 API 请求头 (可选，默认为 localhost:3000)

## 支持的 AI 模型

- DeepSeek R1 (免费)
- Mistral 7B Instruct (免费)
- 更多模型可在代码中配置

## 部署

### Vercel 部署

1. Fork 或下载项目到你的 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量 `OPENROUTER_API_KEY`
4. 点击部署

### 其他平台

项目使用标准 Next.js 配置，支持部署到任何支持 Node.js 的平台。

## 项目结构

```
src/
├── app/                  # Next.js App Router
│   ├── api/generate/    # API 路由
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页
├── components/ui/       # UI 组件
└── lib/                # 工具函数
```

## 开发指南

- 使用 TypeScript 进行类型安全开发
- 使用 Tailwind CSS 进行样式开发
- 使用 shadcn/ui 组件库
- API 路由使用 Edge Runtime 提高性能

## 贡献

欢迎提交 Issue 和 Pull Request！

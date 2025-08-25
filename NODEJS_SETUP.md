# Node.js 环境安装指南

## 当前状态

项目代码已经完成，但需要安装 Node.js 环境来运行。

## 安装 Node.js

### 方式 1: 官方网站下载

1. 访问 https://nodejs.org/
2. 下载 LTS 版本 (推荐 18.x 或更高版本)
3. 运行安装程序，按默认设置安装
4. 重启命令行窗口

### 方式 2: 使用包管理器 (推荐)

如果你有巧克力包管理器 (Chocolatey):

```cmd
choco install nodejs
```

如果你有 Scoop:

```cmd
scoop install nodejs
```

### 方式 3: 使用 winget (Windows 10/11)

```cmd
winget install OpenJS.NodeJS
```

## 验证安装

安装完成后，重新打开命令行，运行：

```cmd
node --version
npm --version
```

## 安装完成后的步骤

1. 安装项目依赖

```cmd
cd d:\project\ai_writer
npm install
```

2. 配置环境变量
   编辑 `.env.local` 文件，添加你的 OpenRouter API Key

3. 启动开发服务器

```cmd
npm run dev
```

4. 访问应用
   打开浏览器访问 http://localhost:3000

## 获取 OpenRouter API Key

1. 访问 https://openrouter.ai/
2. 注册账号并登录
3. 在控制台获取免费的 API Key
4. 将 API Key 添加到 `.env.local` 文件中

## 项目已完成的功能

- ✅ 完整的 Next.js 项目结构
- ✅ AI 写作表单界面
- ✅ OpenRouter API 集成
- ✅ 响应式设计
- ✅ 错误处理和 Loading 状态
- ✅ 复制功能
- ✅ 部署配置

等你安装好 Node.js 后，项目就可以立即运行了！

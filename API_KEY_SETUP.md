# 🔑 OpenRouter API Key 配置指南

## 步骤 1: 获取免费 API Key

### 访问 OpenRouter 官网

1. 打开浏览器，访问: https://openrouter.ai/
2. 点击右上角 "Sign In" 或 "Get Started"

### 注册账号

1. 可以使用以下方式注册：
   - Google 账号登录
   - GitHub 账号登录
   - 邮箱注册
2. 完成账号验证

### 获取 API Key

1. 登录后，点击右上角头像进入控制台
2. 在左侧菜单找到 "API Keys" 或 "Keys"
3. 点击 "Create Key" 或 "+ New Key"
4. 为密钥起个名字，如 "ai-writer-demo"
5. 复制生成的 API Key (sk-or-v1-开头的长字符串)

## 步骤 2: 配置本地环境变量

### 方式 1: 编辑.env.local 文件

1. 在项目根目录找到 `.env.local` 文件
2. 用记事本或代码编辑器打开
3. 找到这一行：
   ```
   OPENROUTER_API_KEY=sk-or-v1-demo-key-for-testing
   ```
4. 替换为你的真实 API Key：
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```
5. 保存文件

### 方式 2: 使用命令行配置

```cmd
cd d:\project\ai_writer
echo OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here > .env.local
echo SITE_URL=http://localhost:3000 >> .env.local
```

## 步骤 3: 验证配置

运行以下命令验证配置：

```cmd
cd d:\project\ai_writer
type .env.local
```

应该看到类似输出：

```
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
SITE_URL=http://localhost:3000
```

## 🆓 免费额度说明

OpenRouter 为新用户提供免费试用额度：

- 每月免费请求次数限制
- 支持多种免费模型
- 无需绑定信用卡

## 🔒 安全提醒

- ⚠️ 不要将 API Key 分享给他人
- ⚠️ 不要将.env.local 文件提交到公开的代码仓库
- ⚠️ 如果 Key 泄露，及时在 OpenRouter 控制台删除

## 🚀 配置完成后

API Key 配置完成后，就可以启动项目了：

```cmd
npm run dev
```

访问 http://localhost:3000 开始使用 AI 写作助手！

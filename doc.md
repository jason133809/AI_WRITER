# AI 写作助手 Demo – MVP PRD

技术栈：Next.js 13+/App Router · React · Tailwind CSS · shadcn/ui · OpenRouter

---

## 1. 产品愿景

帮助创作者在 **30 秒** 内生成高质量、符合语境的文本草稿；核心卖点是  
“极简交互 + 免费模型 + 可自定义语气/角色”。

---

## 2. 目标用户

- 自媒体写作者
- 学生 / 研究人员
- 市场营销 / 新媒体运营

---

## 3. MVP 目标

- 单页应用（SPA 体验）
- 必须：模型选择、主题关键词、主题描述、生成按钮
- 可选：高级设置（语言、语气、角色）
- 成功调用 **OpenRouter** API 并展示返回结果

---

## 4. 核心功能

### 4.1 表单输入

| 字段       | 组件          | 说明                                                                                                                 |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| 模型选择   | `<Select>`    | 默认 `deepseek/deepseek-r1-0528:free`<br>可选：`deepseek/deepseek-r1-0528:free` / `moootai/kimi-k2-free`             |
| 主题关键词 | `<Input>`     | 多关键词用逗号分隔                                                                                                   |
| 主题描述   | `<Textarea>`  | 最长 500 字                                                                                                          |
| 高级设置   | `<Accordion>` | 语言 (中文 / English / Japanese …)<br>语气 (正式 / 友好 / 幽默 / 技术)<br>角色 (营销专家 / 教师 / 产品经理 / 律师 …) |
| 生成按钮   | `<Button>`    | 显示 Loading & Disabled 状态                                                                                         |

### 4.2 结果区

- Skeleton Loading
- Markdown / 富文本展示
- 复制到剪贴板按钮

### 4.3 OpenRouter 调用

- 由 `/app/api/generate/route.ts` (Edge Function) 代理
- 接收前端 JSON，拼装 Chat 报文，返回 `content` 字符串

---

## 5. 交互流程

1. 用户进入页面 → 显示简化表单
2. 输入模型、关键词、描述（可展开高级设置）
3. 点击 **生成内容** → 前端 POST `/api/generate`
4. 后端 fetch OpenRouter → 返回文本
5. 前端渲染 + 支持复制

---

## 6. 信息架构 & UI 组件 (shadcn/ui)

- `<Card>` 整体容器
- `<Form>` 表单
  - `<FormField><Select>` 模型
  - `<FormField><Input>` 关键词
  - `<FormField><Textarea>` 描述
  - `<Accordion>` 高级设置 (Select ×3)
- `<Button>` 提交
- `<Skeleton>` 加载占位
- `<ScrollArea>` 结果区
- `<Button variant="outline">` Copy

---

## 7. 数据格式

### 7.1 前端请求 (POST /api/generate)

```json
{
  "model": "deepseek/deepseek-r1-0528:free",
  "keywords": ["AI", "写作"],
  "description": "需要一篇介绍 AI 写作趋势的文章",
  "language": "zh",
  "tone": "formal",
  "role": "教师"
}
```

---

### 7.2 代理向 OpenRouter

```json
{
  "model": "<model>",
  "messages": [
    {
      "role": "system",
      "content": "You are a <role> writing in <language> with a <tone> tone."
    },
    {
      "role": "user",
      "content": "关键词: ... 描述: ..."
    }
  ]
}
```

---

## 8. 非功能需求

- 响应时间 ≤ 5 s（网络正常）
- 移动端兼容 ≥ 375 px
- 状态持久化：useState + URLSearchParams（刷新不丢失输入）

---

## 9. 里程碑 & 工时（7 人/日）

| Day | 任务                              |
| --- | --------------------------------- |
| 1   | 初始化项目脚手架 & 安装 shadcn/ui |
| 2   | 完成表单 & UI                     |
| 3   | API 代理 / 环境变量 (.env)        |
| 4   | 结果渲染 + Loading & Error        |
| 5   | Copy 功能 + 样式微调              |
| 6   | QA / 自测                         |
| 7   | 打包部署 (Vercel)                 |

---

## 10. Backlog（MVP 之外）

- 用户登录 & token 额度管理
- 历史记录 / 草稿保存
- Markdown 导出 & 编辑器集成
- Prompt Library 模板库
- 多段落 / 大纲模式

---

## 11. 风险 & 缓解

| 风险            | 缓解措施                      |
| --------------- | ----------------------------- |
| 模型限流        | 增加队列 & 重试               |
| CORS / 网络问题 | 统一 serverless 代理          |
| 费用超支        | 环境区分 (dev key / prod key) |

---

## 12. 验收标准

- 未填写必填项时「生成」按钮禁用
- 成功生成后可查看 & 复制内容
- 切换模型无需刷新再次生成
- 移动端无横向滚动
- README 提供本地运行指南（≤ 5 步）

```

```

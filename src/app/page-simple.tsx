'use client'

import { useState } from 'react'

interface FormData {
  model: string
  keywords: string
  description: string
  language: string
  tone: string
  role: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    model: 'deepseek/deepseek-r1-0528:free',
    keywords: '',
    description: '',
    language: 'zh',
    tone: 'formal',
    role: '写作专家'
  })
  
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const models = [
    { value: 'deepseek/deepseek-r1-0528:free', label: 'DeepSeek R1 (免费)' },
    { value: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (免费)' }
  ]

  const languages = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' }
  ]

  const tones = [
    { value: 'formal', label: '正式' },
    { value: 'friendly', label: '友好' },
    { value: 'humorous', label: '幽默' },
    { value: 'technical', label: '技术' }
  ]

  const roles = [
    { value: '写作专家', label: '写作专家' },
    { value: '营销专家', label: '营销专家' },
    { value: '教师', label: '教师' },
    { value: '产品经理', label: '产品经理' },
    { value: '律师', label: '律师' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.keywords.trim() || !formData.description.trim()) {
      setError('请填写关键词和主题描述')
      return
    }

    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: formData.model,
          keywords: formData.keywords.split(',').map(k => k.trim()),
          description: formData.description,
          language: formData.language,
          tone: formData.tone,
          role: formData.role
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'API调用失败')
      }

      setResult(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result)
      alert('内容已复制到剪贴板！')
    } catch (err) {
      console.error('复制失败:', err)
      alert('复制失败，请手动选择复制')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI 写作助手
          </h1>
          <p className="text-gray-600">
            基于 AI 的智能写作助手，帮助您快速生成高质量内容
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入表单 */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">内容生成设置</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 模型选择 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AI 模型
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {models.map(model => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 关键词 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    主题关键词 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="多个关键词用逗号分隔，如：AI,写作,技术"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* 主题描述 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    主题描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="请详细描述您想要生成的内容..."
                    rows={4}
                    maxLength={500}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/500
                  </div>
                </div>

                {/* 高级设置 */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {showAdvanced ? '隐藏' : '显示'}高级设置
                  </button>
                </div>

                {showAdvanced && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                    {/* 语言 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        输出语言
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {languages.map(lang => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 语气 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        写作语气
                      </label>
                      <select
                        value={formData.tone}
                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {tones.map(tone => (
                          <option key={tone.value} value={tone.value}>
                            {tone.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 角色 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        写作角色
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {roles.map(role => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !formData.keywords.trim() || !formData.description.trim()}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '生成中...' : '生成内容'}
                </button>
              </form>
            </div>
          </div>

          {/* 结果展示 */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">生成结果</h2>
              
              {loading && (
                <div className="space-y-3">
                  <div className="animate-pulse rounded-md bg-gray-200 h-4 w-full"></div>
                  <div className="animate-pulse rounded-md bg-gray-200 h-4 w-full"></div>
                  <div className="animate-pulse rounded-md bg-gray-200 h-4 w-3/4"></div>
                  <div className="animate-pulse rounded-md bg-gray-200 h-4 w-full"></div>
                  <div className="animate-pulse rounded-md bg-gray-200 h-4 w-2/3"></div>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-md border">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {result}
                    </pre>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                  >
                    复制到剪贴板
                  </button>
                </div>
              )}

              {!loading && !result && (
                <div className="text-center text-gray-500 py-8">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p>填写左侧表单并点击"生成内容"开始创作</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="bg-white rounded-lg border shadow-sm mt-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">使用说明</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📝 填写要求</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 关键词：用逗号分隔多个关键词</li>
                  <li>• 描述：详细说明想要的内容类型</li>
                  <li>• 高级设置：可自定义语言、语气和角色</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚀 功能特色</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 支持多种免费AI模型</li>
                  <li>• 实时生成，快速响应</li>
                  <li>• 一键复制，方便使用</li>
                  <li>• 移动端完全适配</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

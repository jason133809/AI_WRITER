'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// 模型选项
const models = [
  { value: 'deepseek/deepseek-r1-0528:free', label: 'DeepSeek R1 (免费)' },
  { value: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (免费)' },
]

// 语言选项
const languages = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]

// 语气选项
const tones = [
  { value: 'formal', label: '正式' },
  { value: 'friendly', label: '友好' },
  { value: 'humorous', label: '幽默' },
  { value: 'technical', label: '技术' },
]

// 角色选项
const roles = [
  { value: '营销专家', label: '营销专家' },
  { value: '教师', label: '教师' },
  { value: '产品经理', label: '产品经理' },
  { value: '律师', label: '律师' },
  { value: '技术专家', label: '技术专家' },
]

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
    role: '教师',
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.keywords.trim() || !formData.description.trim()) {
      alert('请填写关键词和主题描述')
      return
    }

    setIsLoading(true)
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
          role: formData.role,
        }),
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      setResult(data.content)
    } catch (error) {
      console.error('Error:', error)
      alert('生成失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    alert('已复制到剪贴板')
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 写作助手</h1>
          <p className="text-gray-600">30秒生成高质量文本内容</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：表单 */}
          <Card>
            <CardHeader>
              <CardTitle>内容生成设置</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 模型选择 */}
                <div>
                  <label className="block text-sm font-medium mb-2">AI 模型</label>
                  <select
                    value={formData.model}
                    onChange={(e) => updateFormData('model', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-medium mb-2">主题关键词 *</label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => updateFormData('keywords', e.target.value)}
                    placeholder="例如：AI, 写作, 技术 (多个关键词用逗号分隔)"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 主题描述 */}
                <div>
                  <label className="block text-sm font-medium mb-2">主题描述 *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="请详细描述您想要生成的内容..."
                    rows={4}
                    maxLength={500}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                    {showAdvanced ? '收起' : '展开'} 高级设置
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-md">
                      {/* 语言 */}
                      <div>
                        <label className="block text-sm font-medium mb-2">语言</label>
                        <select
                          value={formData.language}
                          onChange={(e) => updateFormData('language', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
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
                        <label className="block text-sm font-medium mb-2">语气</label>
                        <select
                          value={formData.tone}
                          onChange={(e) => updateFormData('tone', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
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
                        <label className="block text-sm font-medium mb-2">角色</label>
                        <select
                          value={formData.role}
                          onChange={(e) => updateFormData('role', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
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
                </div>

                {/* 生成按钮 */}
                <Button
                  type="submit"
                  disabled={isLoading || !formData.keywords.trim() || !formData.description.trim()}
                  className="w-full"
                >
                  {isLoading ? '生成中...' : '生成内容'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 右侧：结果 */}
          <Card>
            <CardHeader>
              <CardTitle>生成结果</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : result ? (
                <div>
                  <div className="bg-white p-4 rounded-md border min-h-48 max-h-96 overflow-y-auto whitespace-pre-wrap">
                    {result}
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="mt-4 w-full"
                  >
                    复制到剪贴板
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  填写左侧表单并点击"生成内容"开始创作
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

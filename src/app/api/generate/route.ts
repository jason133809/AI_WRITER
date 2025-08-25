import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface RequestBody {
  model: string
  keywords: string[]
  description: string
  language: string
  tone: string
  role: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { model, keywords, description, language, tone, role } = body

    // 构建系统提示
    const systemPrompt = `你是一位专业的${role}，请用${language === 'zh' ? '中文' : language === 'en' ? 'English' : '日本語'}以${tone === 'formal' ? '正式' : tone === 'friendly' ? '友好' : tone === 'humorous' ? '幽默' : '技术'}的语气进行写作。`

    // 构建用户提示
    const userPrompt = `关键词: ${keywords.join(', ')}

主题描述: ${description}

请根据上述关键词和描述，生成一篇高质量的文章内容。文章应该结构清晰、内容丰富、符合主题要求。`

    // 调用OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': 'AI Writer'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API Error:', errorData)
      throw new Error(`OpenRouter API Error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter API')
    }

    return NextResponse.json({
      content: data.choices[0].message.content
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

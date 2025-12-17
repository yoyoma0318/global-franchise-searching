import { NextResponse } from 'next/server'
import { recentNews } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const dealType = searchParams.get('dealType')

  let news = recentNews

  if (dealType) {
    news = news.filter(item => item.dealType === dealType)
  }

  return NextResponse.json(news.slice(0, limit))
}


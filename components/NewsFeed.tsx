'use client'

import { useState } from 'react'
import { NewsItem } from '@/types'
import { recentNews } from '@/lib/data'
import { Newspaper, ExternalLink, TrendingUp } from 'lucide-react'

export default function NewsFeed() {
  const [news] = useState<NewsItem[]>(recentNews)

  const getDealTypeColor = (type?: string) => {
    switch (type) {
      case 'MF':
        return 'bg-blue-500/20 text-blue-400'
      case 'JV':
        return 'bg-purple-500/20 text-purple-400'
      case 'M&A':
        return 'bg-green-500/20 text-green-400'
      case 'expansion':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* 눈에 띄는 헤더 */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Newspaper className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                최신 뉴스 & 딜
              </h3>
              <p className="text-xs text-gray-400 mt-1">실시간 업데이트되는 Living Database</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

      <div className="flex-1 overflow-y-auto space-y-3">
        {news.map(item => (
          <div
            key={item.id}
            className="bg-[#242424] rounded-lg p-4 hover:bg-[#2a2a2a] hover:border-l-4 hover:border-l-blue-500 transition-all cursor-pointer border-l-4 border-transparent"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold flex-1">{item.title}</h4>
              {item.dealType && (
                <span
                  className={`text-xs px-2 py-1 rounded ml-2 ${getDealTypeColor(
                    item.dealType
                  )}`}
                >
                  {item.dealType}
                </span>
              )}
            </div>

            {item.summary && (
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                {item.summary}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{item.source}</span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">{item.publishedAt}</span>
              </div>
              {item.tags.length > 0 && (
                <div className="flex gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}


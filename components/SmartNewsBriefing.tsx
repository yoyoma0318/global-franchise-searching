'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Zap, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  link: string
  source: string
  published_at?: any
  summary?: string
}

export default function SmartNewsBriefing() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = collection(db, 'market_intel')
        const q = query(newsRef, orderBy('collected_at', 'desc'), limit(10))
        const snapshot = await getDocs(q)

        const newsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsItem[]

        setNews(newsData)
      } catch (error) {
        console.error('뉴스 로딩 실패:', error)
        // Fallback data
        setNews([
          { id: '1', title: 'Starbucks expands to 100 new locations in Southeast Asia', link: '#', source: 'Reuters' },
          { id: '2', title: 'McDonald\'s announces $2B investment in Asian markets', link: '#', source: 'Bloomberg' },
          { id: '3', title: 'Korean coffee chain Mega Coffee enters Vietnam market', link: '#', source: 'Korea Herald' },
        ])
      }
    }

    fetchNews()
  }, [])

  // Auto-rotate headlines every 4 seconds
  useEffect(() => {
    if (news.length === 0 || isExpanded) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [news.length, isExpanded])

  const handleNewsClick = (link: string) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  if (news.length === 0) return null

  return (
    <div className="absolute top-6 left-6 z-30">
      {/* Main Card */}
      <div
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl"
        style={{ width: '380px' }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 border-b border-stone-200 cursor-pointer flex items-center justify-between bg-gradient-to-r from-emerald-50 to-orange-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-800">Market Briefing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{news.length} updates</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-600" />
            )}
          </div>
        </div>

        {/* Current Headline (Collapsed) */}
        {!isExpanded && (
          <div
            className={`px-4 py-3 cursor-pointer hover:bg-stone-50 transition-all duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => handleNewsClick(news[currentIndex]?.link)}
          >
            <p className="text-sm text-slate-800 line-clamp-2 leading-relaxed">
              {news[currentIndex]?.title}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-emerald-600 font-medium">
                {news[currentIndex]?.source}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        )}

        {/* Expanded List */}
        {isExpanded && (
          <div className="max-h-96 overflow-y-auto">
            {news.map((item, index) => (
              <div
                key={item.id}
                className="px-4 py-3 border-b border-stone-100 last:border-0 cursor-pointer hover:bg-stone-50 transition-colors group"
                onClick={() => handleNewsClick(item.link)}
              >
                <p className="text-sm text-slate-800 line-clamp-2 leading-relaxed mb-2">
                  {item.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-medium">
                    {item.source}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle indicator dots */}
      {!isExpanded && (
        <div className="flex justify-center gap-1 mt-2">
          {news.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex % 5 ? 'bg-emerald-600 w-4' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

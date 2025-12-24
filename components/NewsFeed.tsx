'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ExternalLink } from 'lucide-react'

interface NewsTickerItem {
  id: string
  title: string
  link: string
  source: string
  published_at?: any
  keyword?: string
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsTickerItem[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = collection(db, 'market_intel')
        const q = query(newsRef, orderBy('collected_at', 'desc'), limit(20))
        const snapshot = await getDocs(q)

        const newsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsTickerItem[]

        setNews(newsData)
      } catch (error) {
        console.error('뉴스 로딩 실패:', error)
        // Fallback to sample data
        setNews([
          { id: '1', title: 'Starbucks expands to 100 new locations in Southeast Asia', link: '#', source: 'Reuters' },
          { id: '2', title: 'McDonald\'s announces $2B investment in Asian markets', link: '#', source: 'Bloomberg' },
          { id: '3', title: 'Korean coffee chain Mega Coffee enters Vietnam market', link: '#', source: 'Korea Herald' },
        ])
      }
    }

    fetchNews()
  }, [])

  const handleNewsClick = (link: string) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-md border-t border-red-500/50 shadow-2xl">
      <div className="overflow-hidden h-12">
        <div
          className={`flex items-center h-full ${isHovered ? '' : 'animate-marquee'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* LIVE Badge */}
          <div className="flex-shrink-0 px-4 py-2 bg-red-600/20 border-r border-red-500/30 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-red-400 tracking-wider">LIVE INTEL</span>
          </div>

          {/* News Items - Duplicate for seamless loop */}
          {[...news, ...news].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleNewsClick(item.link)}
              className="flex-shrink-0 px-6 py-2 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-400">
                  [{item.source || 'News'}]
                </span>
                <span className="text-sm text-white font-medium">
                  {item.title}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-px h-4 bg-gray-700 mx-2"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  )
}


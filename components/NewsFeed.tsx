'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { NewspaperIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  published_at: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Firestore 실시간 구독
    const q = query(collection(db, 'market_intel'), orderBy('published_at', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(items);
    });
    return () => unsubscribe();
  }, []);

  // 4초 간격 롤링 애니메이션
  useEffect(() => {
    if (isHovered || news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [news.length, isHovered]);

  if (news.length === 0) return null;

  return (
    <div 
      className="group w-80 perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 카드 (Dark Glassmorphism) */}
      <div className={`
        bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl transition-all duration-300
        ${isHovered ? 'rounded-b-none' : 'hover:scale-[1.02]'}
      `}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <NewspaperIcon className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">Market Briefing</span>
          </div>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] text-stone-400 font-medium">LIVE</span>
          </div>
        </div>

        {/* 롤링 헤드라인 */}
        <div className="h-12 flex items-center relative overflow-hidden">
          {news.map((item, idx) => (
            <div 
              key={item.id}
              className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                idx === currentIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-emerald-300 line-clamp-2 leading-snug">
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 드롭다운 리스트 (Hover시 펼쳐짐) */}
      <div className={`
        absolute top-full left-0 right-0 bg-stone-900/95 backdrop-blur-xl border-x border-b border-white/10 rounded-b-2xl overflow-hidden transition-all duration-300 origin-top z-30
        ${isHovered ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-2 flex flex-col gap-1 max-h-80 overflow-y-auto">
          {news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-xl hover:bg-white/10 group/item transition-colors block"
            >
              <p className="text-xs text-stone-400 mb-1 flex justify-between">
                <span className="truncate max-w-[120px]">{item.source || 'Global News'}</span>
                <span>{item.published_at ? new Date(item.published_at).toLocaleDateString() : ''}</span>
              </p>
              <p className="text-sm text-stone-200 group-hover/item:text-emerald-300 transition-colors line-clamp-2">
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
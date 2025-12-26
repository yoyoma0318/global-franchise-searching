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

export default function NewsFeed({ currentRegion }: { currentRegion?: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Firestore에서 최신 뉴스 5개 가져오기
    const q = query(collection(db, 'market_intel'), orderBy('published_at', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(items);
    });
    return () => unsubscribe();
  }, []);

  if (news.length === 0) return null;

  // 평소에는 상위 3개만 노출, 마우스를 올리면(isExpanded) 전체 노출
  const displayNews = isExpanded ? news : news.slice(0, 3);

  return (
    <div 
      className="flex flex-col gap-0 w-80 transition-all duration-300 font-sans"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 1. 헤더 (Briefing Badge) */}
      <div className="flex items-center justify-between bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-t-xl shadow-lg border-b border-slate-700 z-10">
        <div className="flex items-center gap-2">
          <NewspaperIcon className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold tracking-wide uppercase">Market Briefing</span>
        </div>
        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold border border-orange-500/30 animate-pulse">
          LIVE
        </span>
      </div>

      {/* 2. 뉴스 리스트 스택 (White Glass) */}
      <div className="bg-white/95 backdrop-blur-md rounded-b-xl shadow-2xl border-x border-b border-slate-200 overflow-hidden flex flex-col divide-y divide-slate-100">
        {displayNews.map((item) => (
          <a 
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 hover:bg-indigo-50 transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1.5">
              {/* 소스 태그 (예: [Global], [Bloomberg]) */}
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {item.source || 'Global'}
              </span>
              <span className="text-[10px] text-slate-400">
                {item.published_at ? new Date(item.published_at).toLocaleDateString() : ''}
              </span>
            </div>
            {/* 뉴스 제목 */}
            <h4 className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 line-clamp-2">
              {item.title}
            </h4>
          </a>
        ))}
        
        {/* 3. 확장 안내 힌트 (Hover 안 했을 때만 보임) */}
        {!isExpanded && news.length > 3 && (
          <div className="bg-slate-50 py-1.5 text-center text-[10px] text-slate-400 font-medium border-t border-slate-100 uppercase tracking-wider">
            Hover to see more
          </div>
        )}
      </div>
    </div>
  );
}
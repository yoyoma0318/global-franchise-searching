'use client';

import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// 데이터 타입 정의
interface Company {
  id: string;
  name: string;
  category: string;
  region: string;
  country?: string;
  metrics?: {
    revenue?: string;
    store_count?: number;
  };
  status?: string;
}

export default function CompanyList({ companies }: { companies: Company[] }) {
  return (
    // 그리드 레이아웃: 화면 크기에 따라 1열 ~ 4열로 자동 조정됨
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      
      {companies.map((company) => (
        <div 
          key={company.id}
          className="group bg-white border border-stone-200 rounded-xl p-5 hover:border-emerald-500 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-all cursor-pointer relative overflow-hidden"
        >
          {/* 우측 상단: 상장 여부 뱃지 */}
          <div className="absolute top-4 right-4">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
              company.status === 'Listed' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'
            }`}>
              {company.status || 'Private'}
            </span>
          </div>

          {/* 회사 정보 영역 */}
          <div className="mb-4">
            {/* 로고 (이니셜) */}
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-lg font-bold text-stone-600 mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              {company.name.charAt(0)}
            </div>
            {/* 회사명 */}
            <h3 className="font-bold text-stone-800 text-lg truncate pr-16">{company.name}</h3>
            {/* 카테고리 및 지역 */}
            <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mt-1">
              {company.category} • {company.region}
            </p>
          </div>

          {/* 하단 통계 및 화살표 */}
          <div className="flex items-end justify-between border-t border-stone-100 pt-3 mt-3">
            <div>
              <p className="text-[10px] text-stone-400 font-semibold uppercase">Total Stores</p>
              <p className="font-bold text-stone-800 font-mono text-lg">
                {company.metrics?.store_count?.toLocaleString() || '-'}
              </p>
            </div>
            {/* 화살표 아이콘 */}
            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
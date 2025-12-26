'use client';

import React from 'react';
import { BuildingOfficeIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/solid';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
      {companies.map((company) => (
        <div 
          key={company.id}
          className="group bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer relative"
        >
          {/* 상장 여부 뱃지 */}
          <div className="absolute top-4 right-4">
            <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
              company.status === 'Listed' 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {company.status || 'Private'}
            </span>
          </div>

          {/* 헤더: 로고 및 회사명 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center text-xl font-bold border border-indigo-100">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-bold text-slate-900 text-base truncate">{company.name}</h3>
              <p className="text-slate-500 text-xs font-medium uppercase mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {company.category}
              </p>
            </div>
          </div>

          {/* 데이터 그리드: 매장수 & 매출 */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 mt-2">
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1 mb-1">
                <HomeIcon className="w-3 h-3" /> Stores
              </p>
              <p className="font-bold text-slate-800 text-sm">
                {company.metrics?.store_count?.toLocaleString() || '-'}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1 mb-1">
                <CurrencyDollarIcon className="w-3 h-3" /> Revenue
              </p>
              <p className="font-bold text-slate-800 text-sm truncate">
                {company.metrics?.revenue || '-'}
              </p>
            </div>
          </div>

          {/* 호버 효과 (투명 오버레이) */}
          <div className="absolute inset-0 bg-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
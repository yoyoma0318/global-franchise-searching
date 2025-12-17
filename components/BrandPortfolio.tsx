'use client'

import { Company } from '@/types'
import { Package } from 'lucide-react'

interface BrandPortfolioProps {
  company: Company | null
  onBrandClick?: (brandId: string) => void
  selectedBrandId?: string | null
}

export default function BrandPortfolio({ company, onBrandClick, selectedBrandId }: BrandPortfolioProps) {
  if (!company) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">기업을 선택하면 포트폴리오를 확인할 수 있습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Package className="w-5 h-5" />
          브랜드 포트폴리오
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {company.brands.map(brand => (
          <div
            key={brand.id}
            onClick={(e) => {
              e.stopPropagation()
              console.log('Brand clicked:', brand.id, brand.name)
              onBrandClick?.(brand.id)
            }}
            className={`rounded-lg p-3 hover:bg-[#2a2a2a] border transition-all cursor-pointer ${
              selectedBrandId === brand.id
                ? 'bg-blue-500/20 border-blue-500'
                : 'bg-[#242424] border-transparent hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold">{brand.name}</h4>
              {brand.storeCount !== undefined && (
                <span className="text-xs font-bold text-blue-400">
                  {brand.storeCount.toLocaleString()}개점
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                {brand.category}
              </span>
              {brand.marketPosition && (
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                  {brand.marketPosition}
                </span>
              )}
              {brand.description && (
                <span className="text-xs text-gray-400 truncate flex-1">
                  {brand.description}
                </span>
              )}
            </div>
            {onBrandClick && (
              <p className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                클릭하여 지도에서 점포 확인 →
              </p>
            )}
          </div>
        ))}
      </div>

      {company.portfolio && company.portfolio.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">포트폴리오 상세</h4>
          <div className="space-y-2">
            {company.portfolio.map((item, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{item.brandName}</p>
                  <p className="text-xs text-gray-400">
                    {item.storeCount}개 매장
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : item.status === 'planned'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


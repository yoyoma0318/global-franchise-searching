'use client'

import { FilterState, Country, Category } from '@/types'
import { Filter, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import { companies } from '@/lib/data'

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const countries: { value: Country; label: string }[] = [
  { value: 'indonesia', label: '인도네시아' },
  { value: 'malaysia', label: '말레이시아' },
  { value: 'hong-kong', label: '홍콩' },
  { value: 'philippines', label: '필리핀' },
  { value: 'vietnam', label: '베트남' },
  { value: 'thailand', label: '태국' },
  { value: 'singapore', label: '싱가포르' },
  { value: 'taiwan', label: '대만' },
]

const categories: { value: Category; label: string }[] = [
  { value: 'coffee', label: '커피' },
  { value: 'bakery', label: '베이커리' },
  { value: 'chicken', label: '치킨' },
  { value: 'pizza', label: '피자' },
  { value: 'qsr', label: 'QSR' },
  { value: 'casual-dining', label: '캐주얼 다이닝' },
]

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  // 필터링된 결과 계산
  const filteredCount = useMemo(() => {
    let filtered = companies
    if (filters.countries && filters.countries.length > 0) {
      filtered = filtered.filter(c => filters.countries!.includes(c.country))
    }
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(c =>
        c.brands.some(brand => filters.categories!.includes(brand.category))
      )
    }
    if (filters.minRevenue) {
      filtered = filtered.filter(c => c.revenue && c.revenue >= filters.minRevenue!)
    }
    if (filters.isPublic !== undefined) {
      filtered = filtered.filter(c => c.isPublic === filters.isPublic)
    }
    return filtered.length
  }, [filters])

  const handleCountryToggle = (country: Country) => {
    const current = filters.countries || []
    const updated = current.includes(country)
      ? current.filter(c => c !== country)
      : [...current, country]
    onFiltersChange({ ...filters, countries: updated.length > 0 ? updated : undefined })
  }

  const handleCategoryToggle = (category: Category) => {
    const current = filters.categories || []
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category]
    onFiltersChange({ ...filters, categories: updated.length > 0 ? updated : undefined })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFilterCount =
    (filters.countries?.length || 0) +
    (filters.categories?.length || 0) +
    (filters.minRevenue ? 1 : 0) +
    (filters.isPublic !== undefined ? 1 : 0)

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Filter className="w-4 h-4 text-blue-400" />
          필터
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Countries */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-gray-300">국가</h4>
          <div className="space-y-1.5">
            {countries.map(country => (
              <button
                key={country.value}
                onClick={() => handleCountryToggle(country.value)}
                className={`w-full text-xs px-2 py-1.5 rounded border transition-colors text-left ${
                  filters.countries?.includes(country.value)
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-[#242424] border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {country.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-gray-300">카테고리</h4>
          <div className="space-y-1.5">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryToggle(category.value)}
                className={`w-full text-xs px-2 py-1.5 rounded border transition-colors text-left ${
                  filters.categories?.includes(category.value)
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'bg-[#242424] border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Range */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-gray-300">최소 매출</h4>
          <div className="relative">
            <input
              type="number"
              value={filters.minRevenue || ''}
              onChange={e =>
                onFiltersChange({
                  ...filters,
                  minRevenue: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="100"
              className="w-full bg-[#242424] border border-gray-700 rounded px-2 py-1.5 pr-12 text-xs focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              USD M
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">(USD 백만 달러 기준)</p>
        </div>

        {/* Public Status */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-gray-300">상장 여부</h4>
          <div className="space-y-1.5">
            <button
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  isPublic: filters.isPublic === true ? undefined : true,
                })
              }
              className={`w-full text-xs px-2 py-1.5 rounded border transition-colors ${
                filters.isPublic === true
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-[#242424] border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              상장
            </button>
            <button
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  isPublic: filters.isPublic === false ? undefined : false,
                })
              }
              className={`w-full text-xs px-2 py-1.5 rounded border transition-colors ${
                filters.isPublic === false
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-[#242424] border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              비상장
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-xs text-center">
          <div className="text-gray-300 mb-1">
            {activeFilterCount > 0 ? `${activeFilterCount}개 필터 적용` : '필터 없음'}
          </div>
          <div className={`font-semibold ${filteredCount > 0 ? 'text-blue-400' : 'text-gray-400'}`}>
            {filteredCount}개 기업 표시
          </div>
        </div>
      </div>
    </div>
  )
}


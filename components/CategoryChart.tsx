'use client'

import { Country } from '@/types'
import { getBrandsByCategory, companies } from '@/lib/data'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Coffee, UtensilsCrossed, Cake } from 'lucide-react'

interface CategoryChartProps {
  country?: Country
}

export default function CategoryChart({ country }: CategoryChartProps) {
  const categories = ['coffee', 'bakery', 'chicken', 'pizza', 'qsr']
  const categoryLabels: Record<string, string> = {
    coffee: '커피',
    bakery: '베이커리',
    chicken: '치킨',
    pizza: '피자',
    qsr: 'QSR',
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    coffee: <Coffee className="w-4 h-4" />,
    bakery: <Cake className="w-4 h-4" />,
    chicken: <UtensilsCrossed className="w-4 h-4" />,
    pizza: <UtensilsCrossed className="w-4 h-4" />,
    qsr: <UtensilsCrossed className="w-4 h-4" />,
  }

  const data = categories.map(category => {
    const brands = getBrandsByCategory(category, country)
    return {
      category: categoryLabels[category] || category,
      count: brands.length,
      icon: categoryIcons[category],
    }
  })

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  // 총 매장 수 계산
  const totalStores = data.reduce((sum, item) => {
    const brands = getBrandsByCategory(item.category.toLowerCase().replace('커피', 'coffee').replace('베이커리', 'bakery').replace('치킨', 'chicken').replace('피자', 'pizza'), country)
    const storeCount = brands.reduce((acc, brand) => acc + (brand.storeCount || 0), 0)
    return sum + storeCount
  }, 0)

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <h3 className="text-base font-bold mb-1">카테고리별 통계</h3>
        <p className="text-xs text-gray-400 mb-2">
          {country ? (
            <>
              {country === 'indonesia' && '인도네시아'}
              {country === 'malaysia' && '말레이시아'}
              {country === 'hong-kong' && '홍콩'}
              {country === 'philippines' && '필리핀'}
              {country === 'vietnam' && '베트남'}
              {country === 'thailand' && '태국'}
              {country === 'singapore' && '싱가포르'}
              {country === 'taiwan' && '대만'}
              {!['indonesia', 'malaysia', 'hong-kong', 'philippines', 'vietnam', 'thailand', 'singapore', 'taiwan'].includes(country) && country}
              {' '}지역 기준
            </>
          ) : (
            '전체 지역 기준'
          )}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>브랜드 수</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>총 매장 수</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[150px] mb-3 max-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            barCategoryGap="20%"
          >
            <XAxis 
              type="number" 
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              hide
            />
            <YAxis
              dataKey="category"
              type="category"
              width={60}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: '#ededed',
                fontSize: '11px',
                padding: '8px',
              }}
              labelFormatter={(label) => `카테고리: ${label}`}
              formatter={(value: number) => [`${value}개 브랜드`, '브랜드 수']}
            />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]} 
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => {
          // 카테고리 이름을 영어로 변환
          const categoryMap: Record<string, string> = {
            '커피': 'coffee',
            '베이커리': 'bakery',
            '치킨': 'chicken',
            '피자': 'pizza',
            'QSR': 'qsr',
          }
          const categoryEn = categoryMap[item.category] || item.category.toLowerCase()
          const brands = getBrandsByCategory(categoryEn, country)
          const storeCount = brands.reduce((acc, brand) => acc + (brand.storeCount || 0), 0)
          return (
            <div
              key={item.category}
              className="bg-[#242424] rounded-lg p-3 border border-gray-700/50 hover:border-gray-600 transition-colors"
            >
              {/* 카테고리 헤더 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-blue-400">{item.icon}</div>
                <span className="text-sm font-semibold text-gray-200">{item.category}</span>
              </div>
              
              {/* 통계 정보 - 명확한 레이블과 함께 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 브랜드 수 */}
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-blue-400">{item.count}</span>
                    <span className="text-xs text-gray-400">개</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">브랜드</p>
                </div>
                
                {/* 총 매장 수 */}
                {storeCount > 0 ? (
                  <div className="bg-[#1a1a1a] rounded p-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-green-400">{storeCount.toLocaleString()}</span>
                      <span className="text-xs text-gray-400">개</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">총 매장</p>
                  </div>
                ) : (
                  <div className="bg-[#1a1a1a] rounded p-2 opacity-50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-500">-</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">매장 정보 없음</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


'use client'

import { useMemo } from 'react'
import { Company, Country, Category } from '@/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import { Coffee, UtensilsCrossed, Cake, Pizza, Store, TrendingUp } from 'lucide-react'

interface CategoryChartProps {
  companies: Company[]
  selectedCountry?: Country
  loading?: boolean
}

export default function CategoryChart({ companies, selectedCountry, loading }: CategoryChartProps) {
  // 카테고리 설정
  const categoryLabels: Record<Category, string> = {
    coffee: '커피',
    bakery: '베이커리',
    chicken: '치킨',
    pizza: '피자',
    qsr: 'QSR',
    'casual-dining': '캐주얼 다이닝',
    'premium-dining': '프리미엄 다이닝',
    beverages: '음료',
    dessert: '디저트',
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    coffee: <Coffee className="w-4 h-4" />,
    bakery: <Cake className="w-4 h-4" />,
    chicken: <UtensilsCrossed className="w-4 h-4" />,
    pizza: <Pizza className="w-4 h-4" />,
    qsr: <UtensilsCrossed className="w-4 h-4" />,
  }

  const countryLabels: Record<Country, string> = {
    indonesia: '인도네시아',
    malaysia: '말레이시아',
    'hong-kong': '홍콩',
    philippines: '필리핀',
    vietnam: '베트남',
    thailand: '태국',
    singapore: '싱가포르',
    taiwan: '대만',
  }

  // 지역명 생성
  const regionName = selectedCountry ? countryLabels[selectedCountry] : 'Global'

  // 선택된 지역의 회사들 필터링 (useMemo로 최적화)
  const filteredCompanies = useMemo(() => {
    if (!selectedCountry) return companies
    return companies.filter(c => c.country === selectedCountry)
  }, [companies, selectedCountry])

  // 카테고리별 데이터 계산 (useMemo로 최적화)
  const categoryData = useMemo(() => {
    const categoryMap = new Map<Category, { count: number; storeCount: number }>()

    filteredCompanies.forEach(company => {
      company.brands.forEach(brand => {
        const existing = categoryMap.get(brand.category) || { count: 0, storeCount: 0 }
        categoryMap.set(brand.category, {
          count: existing.count + 1,
          storeCount: existing.storeCount + (brand.storeCount || 0),
        })
      })
    })

    return Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        categoryLabel: categoryLabels[category] || category,
        brandCount: data.count,
        storeCount: data.storeCount,
        icon: categoryIcons[category],
      }))
      .sort((a, b) => b.brandCount - a.brandCount)
  }, [filteredCompanies])

  // Top 5 회사 (매장 수 기준)
  const top5Companies = useMemo(() => {
    return filteredCompanies
      .map(company => {
        const totalStores = company.brands.reduce((sum, brand) => sum + (brand.storeCount || 0), 0)
        return {
          name: company.name,
          storeCount: totalStores,
          brandCount: company.brands.length,
        }
      })
      .filter(c => c.storeCount > 0)
      .sort((a, b) => b.storeCount - a.storeCount)
      .slice(0, 5)
  }, [filteredCompanies])

  const chartColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f43f5e']

  // 로딩 상태
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  // 데이터 부족 예외 처리
  if (filteredCompanies.length === 0 || categoryData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-xs">
          <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Not enough data for analytics
          </h3>
          <p className="text-sm text-gray-500">
            {selectedCountry
              ? `No company data available for ${regionName}`
              : 'No company data available'}
          </p>
        </div>
      </div>
    )
  }

  // 데이터가 1개뿐인 경우
  if (categoryData.length === 1 && top5Companies.length <= 1) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-xs">
          <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Limited data available
          </h3>
          <p className="text-sm text-gray-500">
            Need more data points for meaningful analytics
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      {/* 헤더 - 동적 지역명 포함 */}
      <div className="mb-4">
        <h3 className="text-base font-bold mb-1">
          {regionName} Category Distribution
        </h3>
        <p className="text-xs text-gray-400">
          {filteredCompanies.length} companies • {categoryData.length} categories
        </p>
      </div>

      {/* 카테고리별 브랜드 수 차트 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Category Share (Brand Count)
        </h4>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="brandCount"
                nameKey="categoryLabel"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={({ categoryLabel, brandCount }) =>
                  `${categoryLabel}: ${brandCount}`
                }
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string) => [
                  `${value} brands`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 회사 (매장 수) */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          {regionName} Top 5 Companies (Store Count)
        </h4>
        {top5Companies.length > 0 ? (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top5Companies}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={{ stroke: '#404040' }}
                  label={{ value: 'Store Count', position: 'bottom', fill: '#6b7280', fontSize: 10 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fill: '#d1d5db', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    fontSize: '12px',
                    padding: '10px',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  formatter={(value: number, name: string, props: any) => {
                    if (name === 'storeCount') {
                      return [
                        `${value.toLocaleString()} stores`,
                        `${props.payload.brandCount} brands`,
                      ]
                    }
                    return [value, name]
                  }}
                  labelFormatter={(label) => `Company: ${label}`}
                />
                <Bar dataKey="storeCount" radius={[0, 4, 4, 0]} maxBarSize={30}>
                  {top5Companies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            No store count data available
          </div>
        )}
      </div>

      {/* 카테고리 상세 정보 */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Category Details</h4>
        {categoryData.slice(0, 5).map((item, index) => (
          <div
            key={item.category}
            className="bg-[#242424] rounded-lg p-3 border border-gray-700/50 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: chartColors[index % chartColors.length] }}
                />
                <span className="text-sm font-medium text-gray-200">{item.categoryLabel}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="font-semibold text-blue-400">{item.brandCount}</div>
                  <div className="text-gray-500">brands</div>
                </div>
                {item.storeCount > 0 && (
                  <div className="text-right">
                    <div className="font-semibold text-green-400">
                      {item.storeCount.toLocaleString()}
                    </div>
                    <div className="text-gray-500">stores</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

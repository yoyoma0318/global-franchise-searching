'use client'

import { Company } from '@/types'
import { Building2, Globe, TrendingUp, MapPin } from 'lucide-react'

interface CompanyProfileProps {
  company: Company | null
}

export default function CompanyProfile({ company }: CompanyProfileProps) {
  if (!company) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">지도를 클릭하여 기업을 선택하세요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
        {company.nameLocal && (
          <p className="text-sm text-gray-400">{company.nameLocal}</p>
        )}
      </div>

      <div className="space-y-4">
        {/* Basic Info */}
        <div className="bg-[#242424] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold">위치</span>
          </div>
          <p className="text-sm text-gray-300">
            {company.city || 'N/A'}, {company.country}
          </p>
        </div>

        {/* Financial Info */}
        {(company.revenue || company.marketCap) && (
          <div className="bg-[#242424] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold">재무 정보</span>
            </div>
            <div className="space-y-2">
              {company.revenue && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">매출</span>
                  <span className="text-sm font-semibold">${company.revenue}M</span>
                </div>
              )}
              {company.marketCap && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">시가총액</span>
                  <span className="text-sm font-semibold">${company.marketCap}M</span>
                </div>
              )}
              {company.isPublic && company.stockSymbol && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">상장</span>
                  <span className="text-sm font-semibold">{company.stockSymbol}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-[#242424] rounded-lg p-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            {company.description}
          </p>
        </div>

        {/* Website */}
        {company.website && (
          <div className="bg-[#242424] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                공식 웹사이트
              </a>
            </div>
          </div>
        )}

        {/* Brands Count */}
        <div className="bg-[#242424] rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">보유 브랜드</span>
            <span className="text-lg font-bold">{company.brands.length}개</span>
          </div>
          {company.brands.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-1">주요 브랜드:</p>
              <div className="flex flex-wrap gap-1">
                {company.brands.slice(0, 5).map(brand => (
                  <span key={brand.id} className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                    {brand.name}
                  </span>
                ))}
                {company.brands.length > 5 && (
                  <span className="text-xs px-2 py-0.5 text-gray-400">
                    +{company.brands.length - 5}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        {company.contactInfo && (
          <div className="bg-[#242424] rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">연락처 정보</h4>
            {company.contactInfo.email && (
              <p className="text-xs text-gray-300 mb-1">📧 {company.contactInfo.email}</p>
            )}
            {company.contactInfo.phone && (
              <p className="text-xs text-gray-300 mb-1">📞 {company.contactInfo.phone}</p>
            )}
            {company.contactInfo.decisionMakers && company.contactInfo.decisionMakers.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-1">의사결정권자:</p>
                {company.contactInfo.decisionMakers.map((dm, idx) => (
                  <p key={idx} className="text-xs text-gray-300">
                    {dm.name} ({dm.title})
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portfolio Summary */}
        {company.portfolio && company.portfolio.length > 0 && (
          <div className="bg-[#242424] rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">포트폴리오 요약</h4>
            <div className="space-y-1">
              {company.portfolio.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">{item.brandName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{item.storeCount}개점</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      item.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      item.status === 'planned' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


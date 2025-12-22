'use client'

import { Company } from '@/types'
import { Building2, MapPin, TrendingUp } from 'lucide-react'

interface CompanyListProps {
  companies: Company[]
  selectedCompanyId?: string | null
  onCompanyClick?: (companyId: string) => void
  loading?: boolean
}

export default function CompanyList({
  companies,
  selectedCompanyId,
  onCompanyClick,
  loading = false
}: CompanyListProps) {
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No companies found</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-800">
      {companies.map((company) => (
        <div
          key={company.id}
          className={`p-4 cursor-pointer transition-all hover:bg-gray-800/50 ${
            selectedCompanyId === company.id
              ? 'bg-blue-500/10 border-l-4 border-blue-500'
              : ''
          }`}
          onClick={() => onCompanyClick?.(company.id)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Company Name */}
              <h3 className="font-semibold text-white truncate mb-1">
                {company.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                <MapPin className="w-3 h-3" />
                <span className="capitalize">
                  {company.city ? `${company.city}, ` : ''}
                  {company.country.replace('-', ' ')}
                </span>
              </div>

              {/* Brands */}
              <div className="flex flex-wrap gap-1 mb-2">
                {company.brands.slice(0, 3).map((brand) => (
                  <span
                    key={brand.id}
                    className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300"
                  >
                    {brand.name}
                  </span>
                ))}
                {company.brands.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400">
                    +{company.brands.length - 3} more
                  </span>
                )}
              </div>

              {/* Revenue */}
              {company.revenue && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>${company.revenue}M revenue</span>
                </div>
              )}
            </div>

            {/* Logo or Icon */}
            <div className="flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

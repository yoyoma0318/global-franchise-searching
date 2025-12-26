'use client'

import { Company } from '@/types'
import { Building2, MapPin, TrendingUp, X } from 'lucide-react'

interface MarketInsightPanelProps {
  isOpen: boolean
  onClose: () => void
  companies: Company[]
  region: string
  onCompanySelect: (companyId: string) => void
}

export default function MarketInsightPanel({
  isOpen,
  onClose,
  companies,
  region,
  onCompanySelect,
}: MarketInsightPanelProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '65vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{region} Market</h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  {companies.length} companies • Active franchises
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto" style={{ height: 'calc(65vh - 140px)' }}>
          {companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Data Yet</h3>
              <p className="text-sm text-slate-600 max-w-sm">
                We're still collecting company data for this region. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => onCompanySelect(company.id)}
                  className="group bg-white rounded-xl border border-stone-200 p-4 cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
                >
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {company.country}
                      </p>
                    </div>
                    {company.isPublic && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                        Public
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-stone-50 rounded-lg p-2">
                      <p className="text-xs text-slate-600 mb-0.5">Brands</p>
                      <p className="text-lg font-bold text-slate-900">{company.brands.length}</p>
                    </div>
                    {company.revenue && (
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-slate-600 mb-0.5">Revenue</p>
                        <p className="text-lg font-bold text-emerald-700">
                          ${company.revenue}M
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  {company.brands.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {company.brands.slice(0, 3).map((brand, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-md"
                        >
                          {brand.category}
                        </span>
                      ))}
                      {company.brands.length > 3 && (
                        <span className="px-2 py-0.5 bg-stone-100 text-slate-600 text-xs rounded-md">
                          +{company.brands.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Growth Indicator */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs text-slate-600">Click for details</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

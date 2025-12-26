'use client'

import { Company } from '@/types'
import { X, ExternalLink, MapPin, DollarSign, Building2, Users, Globe, TrendingUp } from 'lucide-react'

interface CompanyDetailDrawerProps {
  company: Company | null
  isOpen: boolean
  onClose: () => void
}

export default function CompanyDetailDrawer({ company, isOpen, onClose }: CompanyDetailDrawerProps) {
  if (!company) return null

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '480px' }}
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Company Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end gap-4">
              {/* Logo Placeholder */}
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="flex-1 mb-2">
                <h1 className="text-2xl font-bold text-white mb-1">{company.name}</h1>
                <p className="text-sm text-emerald-100 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-12rem)] overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-stone-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-600">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {company.revenue ? `$${company.revenue}M` : 'N/A'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-medium text-slate-600">Brands</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{company.brands.length}</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {company.isPublic && (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Publicly Traded
              </span>
            )}
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-lg">
              {company.brands.length} Active Brands
            </span>
          </div>

          {/* Description */}
          {company.description && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-600" />
                About
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{company.description}</p>
            </div>
          )}

          {/* Website */}
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors mb-6"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Visit Website</span>
            </a>
          )}

          {/* Brands Portfolio */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              Brand Portfolio
            </h3>
            <div className="space-y-3">
              {company.brands.map((brand, index) => (
                <div
                  key={index}
                  className="bg-stone-50 rounded-xl p-4 border border-stone-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{brand.name}</h4>
                      <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        {brand.category}
                      </span>
                    </div>
                    {brand.storeCount && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{brand.storeCount}</p>
                        <p className="text-xs text-slate-600">stores</p>
                      </div>
                    )}
                  </div>
                  {brand.description && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {brand.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          {(company.email || company.phone) && (
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600" />
                Contact
              </h3>
              <div className="space-y-2 text-sm text-slate-700">
                {company.email && (
                  <p className="flex items-center gap-2">
                    <span className="text-slate-600">Email:</span>
                    <a href={`mailto:${company.email}`} className="text-emerald-600 hover:underline">
                      {company.email}
                    </a>
                  </p>
                )}
                {company.phone && (
                  <p className="flex items-center gap-2">
                    <span className="text-slate-600">Phone:</span>
                    <a href={`tel:${company.phone}`} className="text-emerald-600 hover:underline">
                      {company.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

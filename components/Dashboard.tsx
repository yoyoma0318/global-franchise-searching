'use client'

import { useState } from 'react'
import MapView from './MapView'
import CompanyProfile from './CompanyProfile'
import BrandPortfolio from './BrandPortfolio'
import NewsFeed from './NewsFeed'
import CategoryChart from './CategoryChart'
import FilterPanel from './FilterPanel'
import { Company, MapViewState, FilterState } from '@/types'
import { companies, getCompanyById } from '@/lib/data'

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [mapState, setMapState] = useState<MapViewState>({
    zoom: 4,
    center: { lat: 3.1390, lng: 101.6869 }, // Southeast Asia center
    viewLevel: 'region',
  })
  const [filters, setFilters] = useState<FilterState>({})
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)

  const handleCompanySelect = (companyId: string) => {
    const company = getCompanyById(companyId)
    if (company) {
      setSelectedCompany(company)
      setMapState({
        ...mapState,
        center: company.headquarters,
        zoom: 10,
        selectedCompany: companyId,
      })
    }
  }

  const handleMapClick = (companyId?: string) => {
    if (companyId) {
      handleCompanySelect(companyId)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Global Franchise Searching
          </h1>
          <p className="text-gray-400">
            양방향 매칭 플랫폼: 글로벌 F&B 시장 진출을 위한 전략적 아키텍처
          </p>
        </header>

        {/* Main Layout - 지도를 크게, 필터를 작게 */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)] relative z-0">
          {/* Left Sidebar - 필터 (작게) */}
          <div className="col-span-2 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden relative z-10">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Center - 지도 (크게) */}
          <div className="col-span-7 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden relative z-0">
            <MapView
              mapState={mapState}
              onMapStateChange={setMapState}
              onCompanyClick={handleMapClick}
              filters={filters}
              selectedBrandId={selectedBrandId}
            />
          </div>

          {/* Right Sidebar - 정보 패널들 */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Company Profile */}
            <div className="flex-1 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden min-h-[350px]">
              <CompanyProfile company={selectedCompany} />
            </div>

            {/* Brand Portfolio */}
            <div className="flex-1 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden min-h-[250px]">
              <BrandPortfolio 
                company={selectedCompany} 
                selectedBrandId={selectedBrandId}
                onBrandClick={(brandId) => {
                  setSelectedBrandId(selectedBrandId === brandId ? null : brandId)
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - 뉴스와 차트 */}
        <div className="grid grid-cols-12 gap-4 mt-4 relative z-20">
          {/* News Feed - 더 눈에 띄게 */}
          <div className="col-span-7 bg-gradient-to-br from-[#1a1a1a] to-[#1f1f2e] rounded-lg border-2 border-blue-500/30 overflow-hidden shadow-lg shadow-blue-500/10 relative z-20">
            <NewsFeed />
          </div>

          {/* Category Chart - 독립적으로 */}
          <div className="col-span-5 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden relative z-20">
            <CategoryChart country={mapState.selectedCountry} />
          </div>
        </div>
      </div>
    </div>
  )
}


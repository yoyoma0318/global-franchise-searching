'use client'

import { useState, useMemo } from 'react'
import Header from './Header'
import MapView from './MapView'
import CompanyProfile from './CompanyProfile'
import BrandPortfolio from './BrandPortfolio'
import NewsFeed from './NewsFeed'
import CategoryChart from './CategoryChart'
import FilterPanel from './FilterPanel'
import DraggablePanel from './DraggablePanel'
import { Company, MapViewState, FilterState } from '@/types'
import { useCompanies } from '@/hooks'

/**
 * Dashboard component using Firebase for data
 * This is a refactored version that separates concerns and uses custom hooks
 */
export default function DashboardFirebase() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [mapState, setMapState] = useState<MapViewState>({
    zoom: 4,
    center: { lat: 3.1390, lng: 101.6869 }, // Southeast Asia center
    viewLevel: 'region',
  })
  const [filters, setFilters] = useState<FilterState>({})
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)

  // Fetch companies from Firebase with filters
  // Set realtime to true for live updates, false for one-time fetch
  const { companies, loading, error } = useCompanies(filters, false)

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)
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

  // Calculate filtered count for header
  const filteredCount = useMemo(() => {
    return companies.length
  }, [companies])

  const totalCount = useMemo(() => {
    // This would ideally come from a total companies query
    // For now, using the same as filtered
    return companies.length
  }, [companies])

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed] overflow-hidden">
      {/* Header with Map Info - z-20 */}
      <Header
        mapState={mapState}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />

      {/* Show loading or error states */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#0a0a0a]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading companies...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500 rounded-lg p-4 max-w-md">
          <p className="text-red-400">Error loading data: {error.message}</p>
          <p className="text-sm text-gray-400 mt-2">
            Make sure Firebase is configured in your .env.local file
          </p>
        </div>
      )}

      {/* Full-Screen Map - z-0 */}
      {!loading && (
        <>
          <div className="absolute inset-0 z-0">
            <MapView
              mapState={mapState}
              onMapStateChange={setMapState}
              onCompanyClick={handleMapClick}
              filters={filters}
              selectedBrandId={selectedBrandId}
            />
          </div>

          {/* Floating Panel: Filter (Top-Left) */}
          <DraggablePanel
            title="필터"
            initialPosition={{ top: 90, left: 16 }}
            width="384px"
            className="max-h-[calc(100vh-120px)]"
          >
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </DraggablePanel>

          {/* Floating Panel: Category Chart (Top-Right) */}
          <DraggablePanel
            title="카테고리 분석"
            initialPosition={{ top: 90, right: 16 }}
            width="360px"
            className="max-h-96"
          >
            <CategoryChart
              companies={companies}
              selectedCountry={mapState.selectedCountry}
              loading={loading}
            />
          </DraggablePanel>

          {/* Floating Panel: Company Info (Right-Bottom) */}
          <DraggablePanel
            title="기업 정보"
            initialPosition={{ bottom: 70, right: 16 }}
            width="384px"
            className="max-h-[calc(100vh-180px)]"
          >
            <div className="overflow-y-auto max-h-[300px]">
              <CompanyProfile company={selectedCompany} />
            </div>
            <div className="border-t border-white/10 mt-2 pt-2">
              <BrandPortfolio
                company={selectedCompany}
                selectedBrandId={selectedBrandId}
                onBrandClick={(brandId) => {
                  setSelectedBrandId(selectedBrandId === brandId ? null : brandId)
                }}
              />
            </div>
          </DraggablePanel>

          {/* Live News Ticker (Fixed Bottom) */}
          <NewsFeed />
        </>
      )}
    </div>
  )
}

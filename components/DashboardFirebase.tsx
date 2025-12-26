'use client'

import { useState, useMemo } from 'react'
import Header from './Header'
import MapView from './MapView'
import CategoryChart from './CategoryChart'
import FilterPanel from './FilterPanel'
import DraggablePanel from './DraggablePanel'
import SmartNewsBriefing from './SmartNewsBriefing'
import MarketInsightPanel from './MarketInsightPanel'
import CompanyDetailDrawer from './CompanyDetailDrawer'
import NewsFeed from './NewsFeed'
import { Company, MapViewState, FilterState } from '@/types'
import { useCompanies } from '@/hooks'

/**
 * Dashboard component using Firebase for data
 * Modern F&B Hospitality & Intelligence design with floating panels
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
  const [isMarketPanelOpen, setIsMarketPanelOpen] = useState(false)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('Southeast Asia')

  // Fetch companies from Firebase with filters
  // Set realtime to true for live updates, false for one-time fetch
  const { companies, loading, error } = useCompanies(filters, false)

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)
    if (company) {
      setSelectedCompany(company)
      setIsDetailDrawerOpen(true)
      setIsMarketPanelOpen(false)
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
    } else {
      // Clicked on map (not on a marker) - open market panel
      setIsMarketPanelOpen(true)
    }
  }

  const handleCloseDetailDrawer = () => {
    setIsDetailDrawerOpen(false)
    setSelectedCompany(null)
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

          {/* Smart News Briefing - Top Left */}
          <SmartNewsBriefing />

          {/* Floating Panel: Filter (Top-Left, next to news) */}
          <DraggablePanel
            title="필터"
            initialPosition={{ top: 90, left: 420 }}
            width="320px"
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

          {/* Market Insight Panel - Bottom Sheet */}
          <MarketInsightPanel
            isOpen={isMarketPanelOpen}
            onClose={() => setIsMarketPanelOpen(false)}
            companies={companies}
            region={selectedRegion}
            onCompanySelect={handleCompanySelect}
          />

          {/* Company Detail Drawer - Right Side */}
          <CompanyDetailDrawer
            company={selectedCompany}
            isOpen={isDetailDrawerOpen}
            onClose={handleCloseDetailDrawer}
          />

          {/* Live News Ticker (Fixed Bottom) */}
          <NewsFeed />
        </>
      )}
    </div>
  )
}

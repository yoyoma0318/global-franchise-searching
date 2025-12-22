'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import MapView from './MapView'
import CompanyProfile from './CompanyProfile'
import BrandPortfolio from './BrandPortfolio'
import NewsFeed from './NewsFeed'
import CategoryChart from './CategoryChart'
import FilterPanel from './FilterPanel'
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header Component */}
        <Header />

        {/* Show loading or error states */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading companies...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">Error loading data: {error.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              Make sure Firebase is configured in your .env.local file
            </p>
          </div>
        )}

        {/* Main Layout */}
        {!loading && (
          <>
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)] relative z-0">
              {/* Left Sidebar - Filter Panel */}
              <Sidebar className="col-span-2 relative z-10">
                <FilterPanel filters={filters} onFiltersChange={setFilters} />
              </Sidebar>

              {/* Center - Map View */}
              <div className="col-span-7 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden relative z-0">
                <MapView
                  mapState={mapState}
                  onMapStateChange={setMapState}
                  onCompanyClick={handleMapClick}
                  filters={filters}
                  selectedBrandId={selectedBrandId}
                />
              </div>

              {/* Right Sidebar - Info Panels */}
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

            {/* Bottom Row - News and Chart */}
            <div className="grid grid-cols-12 gap-4 mt-4 relative z-20">
              {/* News Feed */}
              <div className="col-span-7 bg-gradient-to-br from-[#1a1a1a] to-[#1f1f2e] rounded-lg border-2 border-blue-500/30 overflow-hidden shadow-lg shadow-blue-500/10 relative z-20">
                <NewsFeed />
              </div>

              {/* Category Chart */}
              <div className="col-span-5 bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden relative z-20">
                <CategoryChart
                  companies={companies}
                  selectedCountry={mapState.selectedCountry}
                  loading={loading}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

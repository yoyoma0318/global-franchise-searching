'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { MapViewState, FilterState, Company } from '@/types'
import { companies } from '@/lib/data'
import { Building2 } from 'lucide-react'

interface MapViewProps {
  mapState: MapViewState
  onMapStateChange: (state: MapViewState) => void
  onCompanyClick: (companyId?: string) => void
  filters: FilterState
  selectedBrandId?: string | null
}

export default function MapView({
  mapState,
  onMapStateChange,
  onCompanyClick,
  filters,
  selectedBrandId,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isUpdatingRef = useRef(false) // 프로그래밍 방식 업데이트 추적
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]) // 리스너 참조 저장
  const mapStateRef = useRef(mapState) // 최신 mapState 참조를 위한 ref
  
  // mapState가 변경될 때마다 ref 업데이트
  useEffect(() => {
    mapStateRef.current = mapState
  }, [mapState])

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
      
      if (!apiKey) {
        console.error('Google Maps API key is not set. Please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable in Netlify.')
        setIsLoading(false)
        return
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places'],
      })

      try {
        await loader.load()
        
        if (!window.google) {
          throw new Error('Google Maps API failed to load')
        }
        
        const google = window.google

        const newMap = new google.maps.Map(mapRef.current, {
          center: mapState.center,
          zoom: mapState.zoom,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242424' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#000000' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#1a1a1a' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#2d2d2d' }],
            },
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
        })

        // Add zoom change listener
        const zoomListener = newMap.addListener('zoom_changed', () => {
          if (isUpdatingRef.current) return // 프로그래밍 방식 업데이트 중이면 무시
          
          const zoom = newMap.getZoom() || 4
          const center = newMap.getCenter()
          let viewLevel: MapViewState['viewLevel'] = 'region'
          if (zoom >= 10) viewLevel = 'district'
          else if (zoom >= 7) viewLevel = 'city'
          else if (zoom >= 5) viewLevel = 'country'
          else viewLevel = 'region'

          // 지도에서 직접 값을 읽어서 업데이트 (ref를 통해 최신 상태 참조)
          onMapStateChange({
            zoom,
            center: center ? {
              lat: center.lat(),
              lng: center.lng(),
            } : mapStateRef.current.center,
            viewLevel,
            selectedCountry: mapStateRef.current.selectedCountry,
            selectedCompany: mapStateRef.current.selectedCompany,
          })
        })

        // Add center change listener
        const centerListener = newMap.addListener('center_changed', () => {
          if (isUpdatingRef.current) return // 프로그래밍 방식 업데이트 중이면 무시
          
          const center = newMap.getCenter()
          if (center) {
            // 지도에서 직접 값을 읽어서 업데이트 (ref를 통해 최신 상태 참조)
            onMapStateChange({
              ...mapStateRef.current,
              center: {
                lat: center.lat(),
                lng: center.lng(),
              },
            })
          }
        })

        // 리스너 참조 저장
        listenersRef.current = [zoomListener, centerListener]

        setMap(newMap)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setIsLoading(false)
      }
    }

    initMap()

    // Cleanup: 리스너 제거
    return () => {
      listenersRef.current.forEach(listener => {
        google.maps.event.removeListener(listener)
      })
      listenersRef.current = []
    }
  }, [])

  // Update map when mapState changes (외부에서 온 변경만)
  useEffect(() => {
    if (!map) return

    const currentCenter = map.getCenter()
    const currentZoom = map.getZoom()
    
    // 실제로 변경이 필요한지 확인
    const centerChanged = 
      !currentCenter || 
      Math.abs(currentCenter.lat() - mapState.center.lat) > 0.0001 ||
      Math.abs(currentCenter.lng() - mapState.center.lng) > 0.0001
    
    const zoomChanged = currentZoom !== mapState.zoom

    if (centerChanged || zoomChanged) {
      isUpdatingRef.current = true // 프로그래밍 방식 업데이트 시작
      
      if (centerChanged) {
        map.setCenter(mapState.center)
      }
      if (zoomChanged) {
        map.setZoom(mapState.zoom)
      }
      
      // 다음 틱에서 플래그 해제
      setTimeout(() => {
        isUpdatingRef.current = false
      }, 100)
    }
  }, [map, mapState.center.lat, mapState.center.lng, mapState.zoom])

  // Create markers for companies
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null))

    // Filter companies based on filters
    let filteredCompanies = companies
    if (filters.countries && filters.countries.length > 0) {
      filteredCompanies = filteredCompanies.filter(c =>
        filters.countries!.includes(c.country)
      )
    }
    if (filters.categories && filters.categories.length > 0) {
      filteredCompanies = filteredCompanies.filter(c =>
        c.brands.some(brand => filters.categories!.includes(brand.category))
      )
    }
    if (filters.minRevenue) {
      filteredCompanies = filteredCompanies.filter(
        c => c.revenue && c.revenue >= filters.minRevenue!
      )
    }
    if (filters.isPublic !== undefined) {
      filteredCompanies = filteredCompanies.filter(
        c => c.isPublic === filters.isPublic
      )
    }

    // 브랜드 필터링: 특정 브랜드가 선택된 경우 해당 브랜드를 보유한 회사만 표시
    if (selectedBrandId) {
      filteredCompanies = filteredCompanies.filter(c =>
        c.brands.some(brand => brand.id === selectedBrandId)
      )
    }

    // Create markers based on view level - 모든 줌 레벨에서 마커 표시
    const newMarkers: google.maps.Marker[] = []

    // 모든 줌 레벨에서 마커 표시
    filteredCompanies.forEach(company => {
      // 선택된 브랜드가 있으면 해당 브랜드의 점포 위치를 표시 (현재는 본사 위치만)
      const selectedBrand = selectedBrandId 
        ? company.brands.find(b => b.id === selectedBrandId)
        : null

      const marker = new google.maps.Marker({
        position: company.headquarters,
        map,
        title: selectedBrand ? `${selectedBrand.name} - ${company.name}` : company.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="15" fill="${selectedBrand ? '#10b981' : '#3b82f6'}" stroke="#ffffff" stroke-width="2"/>
              <path d="M20 12 L26 20 L20 28 L14 20 Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        },
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color: #000; padding: 10px; min-width: 200px;">
            <h3 style="margin: 0 0 6px 0; font-weight: bold; font-size: 14px;">${company.name}</h3>
            ${selectedBrand ? `
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #10b981; font-weight: bold;">
                🏪 ${selectedBrand.name}${selectedBrand.storeCount ? ` (${selectedBrand.storeCount}개점)` : ''}
              </p>
            ` : ''}
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
              📍 ${company.city || 'N/A'}, ${company.country}
            </p>
            ${company.revenue ? `
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
                💰 매출: $${company.revenue}M USD
              </p>
            ` : ''}
            ${company.brands.length > 0 && !selectedBrand ? `
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #888;">
                브랜드: ${company.brands.slice(0, 3).map(b => b.name).join(', ')}${company.brands.length > 3 ? '...' : ''}
              </p>
            ` : ''}
            <p style="margin: 6px 0 0 0; font-size: 11px; color: #3b82f6; cursor: pointer;">
              클릭하여 상세 정보 보기 →
            </p>
          </div>
        `,
      })

      marker.addListener('click', () => {
        onCompanyClick(company.id)
        infoWindow.open(map, marker)
      })

      // 마커에 호버 효과 추가
      marker.addListener('mouseover', () => {
        marker.setIcon({
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="18" fill="#60a5fa" stroke="#ffffff" stroke-width="2"/>
              <path d="M24 14 L30 24 L24 34 L18 24 Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 24),
        })
      })

      marker.addListener('mouseout', () => {
        marker.setIcon({
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="15" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <path d="M20 12 L26 20 L20 28 L14 20 Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        })
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }, [map, mapState.viewLevel, filters, onCompanyClick, selectedBrandId])

  return (
    <div className="relative w-full h-full" style={{ zIndex: 0 }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" style={{ position: 'relative', zIndex: 0 }} />
    </div>
  )
}


'use client'

import { MapViewState } from '@/types'
import { MapPin, Layers, ZoomIn } from 'lucide-react'

interface HeaderProps {
  title?: string
  subtitle?: string
  mapState?: MapViewState
  filteredCount?: number
  totalCount?: number
}

export default function Header({
  title = 'Global F&B Partner Connect',
  subtitle = '양방향 매칭 플랫폼: 글로벌 F&B 시장 진출을 위한 전략적 아키텍처',
  mapState,
  filteredCount,
  totalCount,
}: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>

        {/* Map Info */}
        {mapState && (
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">View:</span>
              <span className="text-white font-semibold">{mapState.viewLevel}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <ZoomIn className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300">Zoom:</span>
              <span className="text-white font-semibold">{mapState.zoom.toFixed(1)}</span>
            </div>
            {filteredCount !== undefined && totalCount !== undefined && (
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Showing:</span>
                <span className="text-white font-semibold">
                  {filteredCount}/{totalCount}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

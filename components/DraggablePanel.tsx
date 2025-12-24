'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { GripVertical } from 'lucide-react'

interface DraggablePanelProps {
  children: ReactNode
  title?: string
  initialPosition: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  width?: string
  className?: string
}

export default function DraggablePanel({
  children,
  title,
  initialPosition,
  width = 'auto',
  className = '',
}: DraggablePanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(initialPosition)
  const dragRef = useRef<{ startX: number; startY: number; startPos: typeof initialPosition }>({
    startX: 0,
    startY: 0,
    startPos: initialPosition,
  })
  const panelRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPos: { ...position },
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !panelRef.current) return

      const deltaX = e.clientX - dragRef.current.startX
      const deltaY = e.clientY - dragRef.current.startY

      const newPosition: typeof position = {}

      // Calculate new position based on which edge was originally set
      if (dragRef.current.startPos.left !== undefined) {
        newPosition.left = Math.max(0, dragRef.current.startPos.left + deltaX)
      } else if (dragRef.current.startPos.right !== undefined) {
        newPosition.right = Math.max(0, dragRef.current.startPos.right - deltaX)
      }

      if (dragRef.current.startPos.top !== undefined) {
        newPosition.top = Math.max(0, dragRef.current.startPos.top + deltaY)
      } else if (dragRef.current.startPos.bottom !== undefined) {
        newPosition.bottom = Math.max(0, dragRef.current.startPos.bottom - deltaY)
      }

      // Constrain to viewport bounds
      const rect = panelRef.current.getBoundingClientRect()
      const maxX = window.innerWidth - rect.width
      const maxY = window.innerHeight - rect.height

      if (newPosition.left !== undefined) {
        newPosition.left = Math.min(newPosition.left, maxX)
      }
      if (newPosition.top !== undefined) {
        newPosition.top = Math.min(newPosition.top, maxY)
      }

      setPosition(newPosition)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, position])

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    width: width,
    ...position,
  }

  return (
    <div
      ref={panelRef}
      style={positionStyle}
      onMouseDown={handleMouseDown}
      className={`
        ${isDragging ? 'z-30 cursor-grabbing' : 'z-10 cursor-default'}
        ${isDragging ? '' : 'transition-all duration-200'}
        bg-[#1a1a1a]/95 backdrop-blur-md
        rounded-xl shadow-2xl
        border border-gray-700/50
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div className="drag-handle cursor-move bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
        </div>
      )}
      <div className={title ? '' : 'drag-handle cursor-move'}>
        {children}
      </div>
    </div>
  )
}

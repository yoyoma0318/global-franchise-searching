'use client'

import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
  className?: string
}

export default function Sidebar({ children, className = '' }: SidebarProps) {
  return (
    <aside
      className={`bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden ${className}`}
    >
      {children}
    </aside>
  )
}

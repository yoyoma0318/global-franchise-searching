import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Global Franchise Searching - F&B Market Intelligence Platform',
  description: '양방향 매칭 플랫폼: 글로벌 F&B 시장 진출을 위한 전략적 아키텍처',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <body>{children}</body>
    </html>
  )
}


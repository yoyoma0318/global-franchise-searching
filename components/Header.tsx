'use client'

interface HeaderProps {
  title?: string
  subtitle?: string
}

export default function Header({
  title = 'Global F&B Partner Connect',
  subtitle = '양방향 매칭 플랫폼: 글로벌 F&B 시장 진출을 위한 전략적 아키텍처'
}: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        {/* Optional: Add user profile or actions here */}
        <div className="flex items-center gap-4">
          {/* Placeholder for future features like notifications, user menu, etc. */}
        </div>
      </div>
    </header>
  )
}

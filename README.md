# Global Franchise Searching (GFS)

글로벌 F&B 시장 진출을 위한 양방향 매칭 플랫폼

## 개요

이 플랫폼은 한국 F&B 브랜드의 해외 진출(Outbound)과 글로벌 기업의 한국 브랜드 유치(Inbound)를 위한 전략적 매칭 도구입니다. Google Maps 기반의 줌인 인터페이스와 자동화된 비즈니스 인텔리전스를 결합하여 정보 비대칭성을 해소하고 거래 비용을 낮춥니다.

## 주요 기능

### 1. Google Maps 기반 줌인 인터페이스
- **Region View**: 대륙 레벨에서 히트맵 및 클러스터링
- **Country View**: 국가별 주요 F&B 지주사 본사 위치 표시
- **City/District View**: 개별 매장 레벨 데이터 및 경쟁 분석

### 2. Bento Grid 대시보드
- 중앙 지도 모듈
- 기업 프로필 카드
- 브랜드 포트폴리오 모듈
- 실시간 뉴스 피드
- 카테고리별 차트
- 필터 패널

### 3. 자동화 워크플로우 (Make.com 연동)
- **아웃바운드**: 한국 브랜드 → 해외 파트너 발굴
- **인바운드**: 글로벌 기업 → 한국 브랜드 소싱

### 4. Living Database
- 실시간 업데이트되는 기업 정보
- 최신 MF/JV 딜 분석
- 뉴스 및 트렌드 모니터링

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps Platform API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Automation**: Make.com (API 연동 준비)

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
DATABASE_URL=your_database_url_here
APOLLO_API_KEY=your_apollo_api_key_here
VERIDION_API_KEY=your_veridion_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
├── app/
│   ├── api/              # API 라우트
│   │   ├── companies/    # 기업 데이터 API
│   │   ├── automation/   # Make.com 자동화 API
│   │   ├── news/         # 뉴스 피드 API
│   │   └── deals/        # 딜 데이터 API
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/
│   ├── Dashboard.tsx     # 메인 대시보드
│   ├── MapView.tsx       # Google Maps 컴포넌트
│   ├── CompanyProfile.tsx # 기업 프로필 카드
│   ├── BrandPortfolio.tsx # 브랜드 포트폴리오
│   ├── NewsFeed.tsx      # 뉴스 피드
│   ├── CategoryChart.tsx # 카테고리 차트
│   └── FilterPanel.tsx   # 필터 패널
├── lib/
│   └── data.ts           # 샘플 데이터
├── types/
│   └── index.ts          # TypeScript 타입 정의
└── package.json
```

## 주요 데이터

### 지원 국가
- 인도네시아 (Indonesia)
- 말레이시아 (Malaysia)
- 홍콩 (Hong Kong)
- 필리핀 (Philippines)

### 주요 기업 예시
- **인도네시아**: Lippo Group, Map Boga, Ismaya Group, Nachindo
- **말레이시아**: Berjaya Food, QL Resources, Heineken Malaysia
- **홍콩**: Maxim's Caterers, Cafe de Coral Holdings
- **필리핀**: Jollibee Foods Corporation

## Make.com 자동화 연동

### 아웃바운드 워크플로우
1. 타겟 기업 선정 → `/api/companies`
2. 연락처 확보 → `/api/automation/outreach` (action: `get-contacts`)
3. 리포트 생성 → `/api/automation/outreach` (action: `generate-report`)
4. 멀티채널 발송 → Gmail/PhantomBuster 연동
5. 미팅 어레인지 → `/api/automation/outreach` (action: `schedule-meeting`)

### 인바운드 워크플로우
1. 니즈 파악 → 키워드 모니터링
2. 브랜드 스카우팅 → `/api/automation/inbound`
3. 매칭 및 알림 → 자동 리포트 생성
4. 인바운드 리포트 → 월간 트렌드 리포트

## 향후 개발 계획

- [ ] 데이터베이스 연동 (PostgreSQL/MongoDB)
- [ ] Google Places API 그리드 타일링 구현
- [ ] Veridion/Apollo.io API 통합
- [ ] OpenAI GPT-4 리포트 생성 기능
- [ ] 실시간 뉴스 스크래핑 (Google News API)
- [ ] 사용자 인증 및 권한 관리
- [ ] 북미 및 중동 시장 확장

## 라이선스

이 프로젝트는 내부 사용을 위한 것입니다.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.


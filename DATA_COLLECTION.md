# 데이터 수집 전략 및 가이드

## 개요

Global Franchise Searching 플랫폼은 'Living Database'를 지향합니다. 정적인 데이터가 아닌 지속적으로 업데이트되는 실시간 데이터베이스 구축이 핵심입니다.

## 데이터 소스 및 수집 방법

### 1. 기업 기본 정보 수집

#### A. 공개 데이터 소스
- **주식시장 정보**: 각 국가의 증권거래소 공시
  - 인도네시아: IDX (Indonesia Stock Exchange)
  - 말레이시아: Bursa Malaysia
  - 홍콩: HKEX (Hong Kong Exchanges)
  - 필리핀: PSE (Philippine Stock Exchange)
  - 태국: SET (Stock Exchange of Thailand)
  - 베트남: HOSE/HNX

- **기업 공시 및 연간 보고서**
  - 재무 정보 (매출, 시가총액)
  - 브랜드 포트폴리오
  - 신규 계약 및 파트너십

#### B. B2B 데이터 제공업체 API
- **Apollo.io**
  - 연락처 정보 (이메일, LinkedIn)
  - 의사결정권자 정보
  - 기업 프로필 데이터
  
- **Veridion**
  - 기업 데이터베이스
  - 매장 위치 정보
  - 브랜드-기업 매핑

- **Clearbit**
  - 기업 정보 강화
  - 도메인 기반 데이터

### 2. 브랜드 및 매장 정보 수집

#### A. Google Places API (Grid Tiling 전략)
```javascript
// 그리드 타일링 알고리즘 예시
async function collectStoreLocations(city, brandName) {
  const gridSize = 0.005; // 약 500m
  const bounds = getCityBounds(city);
  const stores = [];
  
  for (let lat = bounds.south; lat < bounds.north; lat += gridSize) {
    for (let lng = bounds.west; lng < bounds.east; lng += gridSize) {
      const results = await googlePlacesAPI.nearbySearch({
        location: { lat, lng },
        radius: 500,
        keyword: brandName,
        type: 'restaurant'
      });
      stores.push(...results);
    }
  }
  
  return deduplicateStores(stores);
}
```

#### B. 웹 스크래핑 (합법적 범위 내)
- 공식 웹사이트의 매장 찾기 페이지
- 프랜차이즈 공시 정보
- 쇼핑몰 테넌트 목록

⚠️ **주의**: Google Maps ToS 준수, robots.txt 확인, rate limiting 준수

### 3. 뉴스 및 딜 정보 수집

#### A. Google News API
```javascript
// 뉴스 수집 예시
const news = await googleNewsAPI.search({
  q: 'Jollibee franchise Indonesia',
  language: 'en',
  sortBy: 'date'
});
```

#### B. RSS 피드 모니터링
- F&B 산업 전문 매체
- 각 국가의 비즈니스 뉴스
- 증권사 리서치 리포트

#### C. 소셜 미디어 모니터링
- LinkedIn: 기업 공지사항
- Twitter/X: 실시간 뉴스
- Instagram: 브랜드 런칭 공지

### 4. 실시간 데이터 업데이트 전략

#### A. 스케줄링 (Make.com / Zapier)
```
매일 오전 9시:
1. 최신 뉴스 수집
2. 주식시장 공시 확인
3. 매장 수 업데이트 (주 1회)

매주 월요일:
1. 전체 데이터 검증
2. 중복 제거
3. 데이터 품질 체크
```

#### B. 웹훅 (Webhook) 활용
- Google Alerts → Make.com 웹훅
- 뉴스 API → 실시간 업데이트
- 주식 공시 → 자동 알림

## 데이터베이스 스키마 설계

### PostgreSQL 스키마 예시

```sql
-- Companies 테이블
CREATE TABLE companies (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_local VARCHAR(255),
  country VARCHAR(50) NOT NULL,
  city VARCHAR(100),
  headquarters_lat DECIMAL(10, 8),
  headquarters_lng DECIMAL(11, 8),
  revenue DECIMAL(12, 2), -- USD millions
  market_cap DECIMAL(12, 2),
  is_public BOOLEAN DEFAULT FALSE,
  stock_symbol VARCHAR(20),
  description TEXT,
  website VARCHAR(255),
  logo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Brands 테이블
CREATE TABLE brands (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  operator_id VARCHAR(50) REFERENCES companies(id),
  store_count INTEGER,
  logo_url VARCHAR(255),
  description TEXT,
  market_position VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Stores 테이블 (개별 매장 위치)
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  brand_id VARCHAR(50) REFERENCES brands(id),
  company_id VARCHAR(50) REFERENCES companies(id),
  name VARCHAR(255),
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  city VARCHAR(100),
  country VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  google_place_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- News 테이블
CREATE TABLE news (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  source VARCHAR(255),
  published_at TIMESTAMP,
  url TEXT,
  summary TEXT,
  deal_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Deals 테이블
CREATE TABLE deals (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  brand_id VARCHAR(50) REFERENCES brands(id),
  partner_id VARCHAR(50) REFERENCES companies(id),
  country VARCHAR(50),
  announced_date DATE,
  status VARCHAR(20),
  value DECIMAL(12, 2),
  description TEXT,
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact Info 테이블
CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  company_id VARCHAR(50) REFERENCES companies(id),
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Decision Makers 테이블
CREATE TABLE decision_makers (
  id SERIAL PRIMARY KEY,
  company_id VARCHAR(50) REFERENCES companies(id),
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  email VARCHAR(255),
  linkedin_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API 통합 가이드

### 1. Apollo.io 연동

```typescript
// app/api/data/apollo/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const companyName = searchParams.get('company')
  
  const response = await fetch(
    `https://api.apollo.io/v1/mixed_people/search`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': process.env.APOLLO_API_KEY || '',
      },
      body: JSON.stringify({
        organization_name: companyName,
        person_titles: ['Business Development', 'Strategic Partnership'],
      }),
    }
  )
  
  const data = await response.json()
  return NextResponse.json(data)
}
```

### 2. Veridion 연동

```typescript
// app/api/data/veridion/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get('id')
  
  const response = await fetch(
    `https://data.veridion.com/search/v2/companies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.VERIDION_API_KEY || '',
      },
      body: JSON.stringify({
        filters: {
          company_id: [companyId],
        },
      }),
    }
  )
  
  const data = await response.json()
  return NextResponse.json(data)
}
```

### 3. Google Places API 그리드 검색

```typescript
// lib/google-places.ts
import { Loader } from '@googlemaps/js-api-loader'

export async function searchStoresInCity(
  city: string,
  brandName: string
): Promise<StoreLocation[]> {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    libraries: ['places'],
  })
  
  await loader.load()
  const placesService = new google.maps.places.PlacesService(
    document.createElement('div')
  )
  
  // 그리드 타일링 구현
  const stores: StoreLocation[] = []
  // ... 구현
  return stores
}
```

## 데이터 수집 자동화 (Make.com)

### 워크플로우 예시

1. **일일 뉴스 수집**
   - 트리거: 매일 오전 9시
   - Google News API 호출
   - OpenAI로 요약 생성
   - 데이터베이스 저장

2. **주간 매장 수 업데이트**
   - 트리거: 매주 월요일
   - Google Places API 그리드 검색
   - 중복 제거
   - 데이터베이스 업데이트

3. **기업 정보 강화**
   - 트리거: 새 기업 추가 시
   - Apollo.io로 연락처 수집
   - Veridion으로 데이터 보강
   - 데이터베이스 업데이트

## 데이터 품질 관리

### 1. 검증 규칙
- 매출 정보는 공식 공시 확인
- 매장 수는 Google Places + 공식 웹사이트 교차 검증
- 연락처는 최소 2개 소스 확인

### 2. 중복 제거
- Google Place ID 기준
- 기업명 + 국가 조합 기준
- 브랜드명 + 운영사 조합 기준

### 3. 정기 점검
- 월 1회 전체 데이터 검증
- 분기별 데이터 소스 재확인
- 연간 데이터 아카이빙

## 비용 관리

### 예상 월간 비용
- Google Maps API: $200-500 (사용량에 따라)
- Apollo.io: $99-499/월
- Veridion: $500-2000/월
- 데이터베이스 호스팅: $50-200/월

### 비용 최적화
- 캐싱 전략 활용
- API 호출 최소화
- 배치 처리 활용

## 다음 단계

1. **즉시 구현 가능**
   - Google News API 연동
   - RSS 피드 수집
   - 기본 데이터베이스 스키마 구축

2. **단기 (1-2개월)**
   - Apollo.io/Veridion API 연동
   - Google Places 그리드 검색 구현
   - Make.com 자동화 워크플로우 구축

3. **중기 (3-6개월)**
   - 실시간 데이터 업데이트 시스템
   - 데이터 품질 관리 자동화
   - 사용자 피드백 기반 데이터 보강


# 데이터 수집기 (Data Collector)

Global Franchise Searching 프로젝트를 위한 자동 데이터 수집 시스템입니다.

## 📋 파일 구성

- `main.py` - 기업 정보 수집기 (Google Places API 사용)
- `news_collector.py` - 뉴스 수집기 (Google News RSS 사용)
- `requirements.txt` - Python 의존성 패키지
- `README.md` - 이 문서

## 🚀 설치 방법

### 1. Python 환경 설정

```bash
# Python 3.8 이상 필요
python3 --version

# 가상환경 생성 (권장)
python3 -m venv venv

# 가상환경 활성화
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate
```

### 2. 의존성 설치

```bash
cd collector
pip install -r requirements.txt
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하거나 다음 환경 변수를 설정하세요:

```bash
# Google Maps API Key
export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# Firebase Admin SDK 인증 (JSON 키 파일 경로)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/firebase-admin-key.json"
```

**Firebase Admin SDK 키 파일 받는 방법:**
1. Firebase Console (https://console.firebase.google.com) 접속
2. 프로젝트 선택
3. 프로젝트 설정 > 서비스 계정 탭
4. "새 비공개 키 생성" 클릭
5. 다운로드된 JSON 파일을 안전한 위치에 저장
6. 해당 경로를 `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수로 설정

## 📱 사용 방법

### A. 뉴스 수집기 (news_collector.py)

Google News RSS에서 F&B 관련 뉴스를 수집합니다.

```bash
python collector/news_collector.py
```

**기능:**
- 다음 키워드로 뉴스 검색:
  - F&B Franchise Expansion Asia
  - Restaurant M&A
  - K-Food Global
  - Coffee Chain Expansion
  - Quick Service Restaurant Asia
  - Food Franchise Investment
- Firestore `market_intel` 컬렉션에 저장
- 중복된 링크는 자동으로 건너뛰기
- 수집 정보: 제목, 링크, 발행일, 출처, 요약

**출력 예시:**
```
============================================================
🚀 뉴스 수집 시작
============================================================
🔍 수집 중... 키워드: 'F&B Franchise Expansion Asia'
   ✅ [reuters.com] Major restaurant chain expands to Southeast...
   ✅ [bloomberg.com] Food franchise investments surge in Asia...
   📊 완료: 15개 수집, 3개 스킵

============================================================
✅ 수집 완료! 총 45개의 뉴스 수집됨
============================================================
```

### B. 기업 정보 수집기 (main.py)

Google Places API를 사용하여 전 세계 주요 도시의 프랜차이즈 기업 정보를 수집합니다.

```bash
python collector/main.py
```

**실행 시 3가지 모드 선택:**

#### 1. 연속 수집 모드 (추천)
- 10분마다 자동으로 도시와 키워드를 랜덤 선택하여 수집
- 무한 루프로 계속 실행 (Ctrl+C로 중단)
- 백그라운드 실행 가능

```bash
선택 (1/2/3): 1

🔄 연속 수집 모드 시작 (10분 간격)
   중단하려면 Ctrl+C를 누르세요

🌍 대상: Tokyo
🔑 키워드: Top Rated Franchise

  🔍 수집 중... [Tokyo] - 'Top Rated Franchise'
     ✅ Starbucks Coffee Japan
     ✅ McDonald's Corporation
     ✅ Yoshinoya Holdings
     📊 12개 수집, 5개 스킵

✅ 사이클 완료! 12개의 기업 데이터 수집
```

#### 2. 전체 스캔 모드
- 모든 도시 × 모든 키워드 조합을 1회 실행
- 대량 데이터 수집 시 유용 (시간이 오래 걸릴 수 있음)

```bash
선택 (1/2/3): 2

🌐 전체 스캔 모드 시작

📍 도시: Seoul
  🔍 수집 중... [Seoul] - 'Top Rated Franchise'
  ...
```

#### 3. 단일 실행
- 랜덤 도시/키워드 조합으로 1회만 실행
- 테스트 용도로 적합

**대상 도시:**
- Seoul, Tokyo, Singapore, Bangkok
- Ho Chi Minh, Manila, Jakarta, Kuala Lumpur
- New York, London

**검색 키워드:**
- Top Rated Franchise
- Restaurant Group HQ
- Popular Coffee Chain
- Best Bakery Chain
- Famous Fast Food Chain
- International Restaurant Brand
- Food Franchise Company
- Global F&B Company

**수집 데이터:**
- 기업명, 주소, 본사 위치(위도/경도)
- 평점, 리뷰 수
- 웹사이트, 전화번호
- 영업 상태, 가격대
- Firestore `companies` 컬렉션에 저장
- 중복 체크 (기업명 기준)

## 🔧 백그라운드 실행

연속 수집 모드를 백그라운드에서 실행하려면:

```bash
# macOS/Linux
nohup python collector/main.py > collector.log 2>&1 &

# 실행 중인 프로세스 확인
ps aux | grep main.py

# 프로세스 종료
kill <process_id>
```

## 📊 데이터 구조

### market_intel 컬렉션 (뉴스)
```json
{
  "title": "McDonald's expands to Vietnam",
  "link": "https://...",
  "published_at": "2024-12-24T10:00:00Z",
  "source": "reuters.com",
  "summary": "McDonald's announces...",
  "keyword": "Restaurant M&A",
  "collected_at": "2024-12-24T10:30:00Z",
  "type": "news"
}
```

### companies 컬렉션 (기업)
```json
{
  "name": "Starbucks Coffee",
  "normalized_name": "starbucks coffee",
  "place_id": "ChIJ...",
  "address": "123 Main St, Seattle, WA",
  "city": "Seattle",
  "headquarters": { "lat": 47.6062, "lng": -122.3321 },
  "rating": 4.5,
  "user_ratings_total": 1234,
  "website": "https://starbucks.com",
  "phone": "+1 206-123-4567",
  "types": ["restaurant", "cafe", "food"],
  "collected_at": "2024-12-24T10:30:00Z",
  "source": "google_places",
  "status": "pending_verification"
}
```

## ⚠️ 주의사항

1. **API 사용량 제한**
   - Google Maps Places API는 무료 할당량 제한이 있습니다
   - 연속 수집 모드 사용 시 요금 발생 가능
   - [Google Cloud Console](https://console.cloud.google.com)에서 사용량 모니터링

2. **Rate Limiting**
   - 각 요청 사이에 적절한 지연 시간 설정됨
   - Google 서버에 부하를 주지 않도록 주의

3. **데이터 품질**
   - 자동 수집된 데이터는 검증이 필요할 수 있습니다
   - `status: "pending_verification"` 필드로 표시됨

4. **중복 체크**
   - 기업명 기준으로 중복 체크
   - 같은 브랜드의 다른 매장도 중복으로 간주될 수 있음

## 🐛 문제 해결

### "GOOGLE_MAPS_API_KEY not set" 에러
```bash
export GOOGLE_MAPS_API_KEY="your_api_key_here"
```

### Firebase 인증 에러
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/full/path/to/firebase-key.json"
```

### 의존성 설치 에러
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 📈 향후 개선 사항

- [ ] 웹 스크래핑 추가 (기업 웹사이트에서 상세 정보)
- [ ] 소셜 미디어 데이터 수집
- [ ] AI 기반 데이터 검증 및 보강
- [ ] 실시간 대시보드 연동
- [ ] 다국어 뉴스 수집

## 📞 문의

문제가 발생하거나 개선 제안이 있으시면 이슈를 등록해주세요.

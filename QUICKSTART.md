# 빠른 시작 가이드

## 1단계: 환경 설정

### Google Maps API 키 발급
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "APIs & Services" > "Library"에서 다음 API 활성화:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. "Credentials"에서 API 키 생성
5. **중요: API 키 제한 설정** (아래 "보안 설정" 섹션 참조)

### 환경 변수 파일 생성
프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=여기에_발급받은_API_키_입력
```

⚠️ **보안 주의사항**:
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- API 키를 코드, 이메일, 채팅, 공개 저장소에 공유하지 마세요
- 팀원과 공유할 때는 안전한 비밀번호 관리 도구 사용 (예: 1Password, Bitwarden)

## 2단계: 의존성 설치

```bash
npm install
```

## 3단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 주요 기능 테스트

### 1. 지도 줌인/줌아웃
- 마우스 휠 또는 지도 컨트롤을 사용하여 줌 레벨 변경
- 줌 레벨에 따라 자동으로 표시되는 정보 변경:
  - **4-5**: Region View (국가별 기업 마커)
  - **5-7**: Country View (도시별 기업 위치)
  - **7-10**: City View (상세 위치)
  - **10+**: District View (개별 매장)

### 2. 기업 선택
- 지도上的 마커 클릭하여 기업 정보 확인
- 기업 프로필 카드에서 상세 정보 확인
- 브랜드 포트폴리오 모듈에서 보유 브랜드 확인

### 3. 필터 사용
- 국가별 필터링
- 카테고리별 필터링
- 매출 규모 필터링
- 상장/비상장 필터링

### 4. 뉴스 피드 확인
- 최신 MF/JV 딜 정보 확인
- 딜 타입별 색상 구분:
  - MF (Master Franchise): 파란색
  - JV (Joint Venture): 보라색
  - M&A: 초록색
  - Expansion: 노란색

## API 엔드포인트 테스트

### 기업 목록 조회
```bash
curl http://localhost:3000/api/companies
```

### 특정 국가 기업 조회
```bash
curl http://localhost:3000/api/companies?country=indonesia
```

### 특정 기업 조회
```bash
curl http://localhost:3000/api/companies?id=lippo-group
```

### 최신 뉴스 조회
```bash
curl http://localhost:3000/api/news
```

### 딜 정보 조회
```bash
curl http://localhost:3000/api/deals
```

## Make.com 연동 테스트

### 아웃바운드 리포트 생성
```bash
curl -X POST http://localhost:3000/api/automation/outreach \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "lippo-group",
    "action": "generate-report"
  }'
```

### 연락처 정보 조회
```bash
curl -X POST http://localhost:3000/api/automation/outreach \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "berjaya-food",
    "action": "get-contacts"
  }'
```

### 인바운드 브랜드 매칭
```bash
curl -X POST http://localhost:3000/api/automation/inbound \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "jollibee",
    "keywords": ["coffee", "bakery"],
    "category": "coffee"
  }'
```

## 🔒 API 키 보안 설정 (필수)

Google Maps API 키는 프론트엔드에서 사용되므로 브라우저에 노출됩니다. 하지만 제한 설정을 통해 보안을 강화할 수 있습니다.

### 1. API 키 제한 설정 (Google Cloud Console)

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. "APIs & Services" > "Credentials" 이동
3. 생성한 API 키 클릭
4. **"애플리케이션 제한사항"** 섹션에서:
   - **"Websites"** 옵션 선택 (라디오 버튼 클릭)
   - 선택하면 아래에 "웹사이트 제한사항" 입력 필드가 나타납니다
   - **"웹사이트 제한사항"**에 다음을 한 줄씩 추가:
     ```
     http://localhost:3000/*
     http://localhost:3000
     ```
   - 프로덕션 도메인이 있다면 추가:
     ```
     https://yourdomain.com/*
     https://yourdomain.com
     ```
   - **참고**: 
     - `*`는 와일드카드로 모든 경로를 허용합니다
     - 개발 중에는 `localhost`만 추가해도 충분합니다
     - 각 URL은 별도의 줄에 입력합니다

5. **"API 제한사항"** 섹션에서:
   - "키 제한" 선택
   - 다음 API만 선택:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - 다른 API는 선택 해제

6. "저장" 클릭

### 2. 추가 보안 권장사항

- ✅ **쿼터 제한 설정**: Google Cloud Console에서 일일 사용량 제한 설정
- ✅ **알림 설정**: 비정상적인 사용량 감지 시 이메일 알림 활성화
- ✅ **정기 모니터링**: Google Cloud Console의 "사용량" 대시보드에서 API 사용량 확인
- ✅ **환경별 키 분리**: 개발용과 프로덕션용 API 키를 별도로 생성

### 3. API 키가 유출된 경우

만약 API 키가 실수로 공개되었다면:

1. **즉시 Google Cloud Console에서 해당 키 삭제**
2. **새로운 API 키 생성**
3. **`.env.local` 파일 업데이트**
4. **Git 히스토리 확인**: 만약 실수로 커밋했다면 `git filter-branch` 또는 BFG Repo-Cleaner 사용

### 4. 프로덕션 배포 시

- Vercel, Netlify 등 배포 플랫폼의 환경 변수 설정 사용
- 환경 변수를 코드에 직접 하드코딩하지 않기
- CI/CD 파이프라인에서 안전한 비밀 관리 도구 사용

## 문제 해결

### Google Maps가 로드되지 않는 경우
1. `.env.local` 파일에 API 키가 올바르게 설정되었는지 확인
2. Google Cloud Console에서 API가 활성화되었는지 확인
3. API 키 제한 설정이 올바른지 확인
4. 브라우저 콘솔에서 에러 메시지 확인

### 타입 에러가 발생하는 경우
```bash
npm run build
```
명령어로 타입 체크 실행

### 스타일이 적용되지 않는 경우
Tailwind CSS가 제대로 설정되었는지 확인:
```bash
npm run dev
```
개발 서버 재시작

## 다음 단계

1. 실제 데이터베이스 연동 (PostgreSQL/MongoDB)
2. 외부 API 통합 (Apollo.io, Veridion)
3. OpenAI GPT-4 리포트 생성 기능 구현
4. 사용자 인증 시스템 추가
5. 실시간 데이터 업데이트 구현


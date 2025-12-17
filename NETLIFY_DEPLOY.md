# Netlify 배포 가이드

## 배포 전 체크리스트

### 1. 필수 파일 확인
- ✅ `netlify.toml` - Netlify 설정 파일
- ✅ `.nvmrc` - Node 버전 고정 (18)
- ✅ `package.json` - `@netlify/plugin-nextjs` 플러그인 포함

### 1-1. 터미널에서 의존성 설치 (필수)

터미널 사용이 처음이시라면 `TERMINAL_GUIDE.md` 파일을 먼저 읽어보세요.

**단계별 실행:**

1. **터미널 열기**
   - Mac: `Cmd + Space` → "터미널" 입력 → Enter
   - 또는 Finder > 응용 프로그램 > 유틸리티 > 터미널

2. **프로젝트 폴더로 이동**
   ```bash
   cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
   ```
   - 위 명령어를 복사(Cmd+C) → 터미널에 붙여넣기(Cmd+V) → Enter

3. **의존성 설치**
   ```bash
   npm install
   ```
   - 위 명령어를 복사 → 붙여넣기 → Enter
   - 몇 분 정도 소요됩니다
   - 완료되면 "added X packages" 메시지가 표시됩니다

### 2. 환경 변수 설정

Netlify 대시보드에서 다음 환경 변수를 설정해야 합니다:

**Site settings > Environment variables**에서 추가:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Netlify 사이트 설정

**Site settings > Build & deploy > Build settings**에서:

1. **Build command**: `npm run build` (기본값, netlify.toml에 설정됨)
2. **Publish directory**: **비워두기** 또는 삭제 (플러그인이 자동 관리)
   - ⚠️ **중요**: `.next` 폴더로 설정하지 마세요!

### 4. 배포 방법

#### 방법 1: Git 연동 (권장)
1. GitHub/GitLab/Bitbucket에 코드 푸시
2. Netlify에서 "New site from Git" 선택
3. 저장소 연결
4. 빌드 설정은 자동으로 감지됨 (netlify.toml 사용)

#### 방법 2: 수동 배포
1. 로컬에서 빌드 테스트:
   ```bash
   npm install
   npm run build
   ```
2. Netlify 대시보드에서 "Deploy manually" 선택
3. `.next` 폴더가 아닌 **프로젝트 루트 폴더**를 드래그 앤 드롭

## 문제 해결

### 에러: "Publish directory .next is incorrect"
- **해결**: Netlify 사이트 설정에서 Publish directory를 삭제하거나 비워두세요
- 플러그인이 자동으로 관리합니다

### 에러: "Node version mismatch"
- **해결**: `.nvmrc` 파일이 프로젝트 루트에 있는지 확인
- 또는 Netlify 사이트 설정에서 Node 버전을 18로 설정

### 에러: "Google Maps API key not found"
- **해결**: Netlify 환경 변수에 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 추가
- 환경 변수 추가 후 재배포 필요

### 빌드 실패: "Module not found"
- **해결**: 
  ```bash
  npm install
  ```
  모든 의존성이 설치되었는지 확인

## 배포 후 확인

1. 사이트가 정상적으로 로드되는지 확인
2. Google Maps가 표시되는지 확인
3. 필터 및 지도 기능이 작동하는지 테스트

## 추가 참고사항

- Netlify는 자동으로 Next.js 최적화를 수행합니다
- SSR/ISR 기능이 정상적으로 작동합니다
- 환경 변수는 빌드 타임에 주입됩니다


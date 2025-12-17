# Netlify Publish Directory 문제 해결

## 문제 상황
- Publish directory 필드가 Netlify UI에서 보이지 않음
- 하지만 여전히 "publish directory is pointing to the base directory" 에러 발생

## 원인 분석
Netlify가 자동으로 프로젝트 루트를 Publish directory로 감지했을 가능성이 있습니다.

## 해결 방법

### 방법 1: 사이트 삭제 후 재생성 (가장 확실한 방법)

1. **기존 사이트 삭제**
   - Netlify 대시보드에서 사이트 선택
   - **Site settings** > **General** > 맨 아래로 스크롤
   - **"Delete this site"** 클릭
   - 확인

2. **새 사이트 생성**
   - **"Add new site"** 클릭
   - **"Deploy manually"** 선택
   - 프로젝트 폴더 전체를 드래그 앤 드롭
   - 이번에는 Publish directory를 설정하지 않음

3. **환경 변수 설정**
   - Site settings > Environment variables
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 추가

### 방법 2: Netlify CLI 사용 (고급)

터미널에서 다음 명령어 실행:

```bash
# Netlify CLI 설치 (처음 한 번만)
npm install -g netlify-cli

# Netlify 로그인
netlify login

# 사이트 연결
netlify link

# Publish directory 제거
netlify sites:update --publish-dir ""
```

### 방법 3: netlify.toml에 명시적으로 설정

현재 netlify.toml은 올바르게 설정되어 있습니다. 
하지만 에러가 계속 발생한다면, 명시적으로 설정을 추가할 수 있습니다:

```toml
[build]
  command = "npm run build"
  # publish는 설정하지 않음 - 플러그인이 자동 관리

[[plugins]]
  package = "@netlify/plugin-nextjs"
  
[build.environment]
  NODE_VERSION = "18"
```

## 확인 사항

### 1. netlify.toml 파일 위치
- 프로젝트 루트에 있어야 합니다
- `/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS/netlify.toml`

### 2. package.json 확인
- `@netlify/plugin-nextjs`가 devDependencies에 있는지 확인

### 3. 배포 로그 확인
- Deploys 탭에서 실패한 배포 클릭
- 전체 에러 메시지 확인
- "publish directory" 관련 메시지 찾기

## 권장 해결 순서

1. ✅ **먼저 시도**: 사이트 삭제 후 재생성 (방법 1)
   - 가장 확실하고 빠름
   - 기존 설정이 초기화됨

2. ✅ **대안**: Git 연동 사용
   - GitHub에 코드 푸시
   - Netlify에서 Git 연동
   - netlify.toml이 자동으로 인식됨

3. ✅ **고급**: Netlify CLI 사용 (방법 2)
   - 터미널에서 직접 설정 변경

## Git 연동 방법 (추천)

Git 연동을 사용하면 netlify.toml이 자동으로 인식되어 설정 문제가 적습니다:

1. **GitHub에 저장소 생성**
   - https://github.com 접속
   - "New repository" 클릭
   - 저장소 이름 입력 후 생성

2. **로컬에서 GitHub에 푸시**
   ```bash
   git remote add origin https://github.com/사용자명/저장소명.git
   git branch -M main
   git push -u origin main
   ```

3. **Netlify에서 Git 연동**
   - Netlify 대시보드 > "Add new site" > "Import an existing project"
   - GitHub 선택 및 인증
   - 저장소 선택
   - 빌드 설정은 자동 감지됨

## 현재 상태 확인

현재 프로젝트는 올바르게 설정되어 있습니다:
- ✅ netlify.toml 파일 존재
- ✅ Next.js 플러그인 설정됨
- ✅ Node 버전 고정됨
- ✅ Publish directory 명시되지 않음 (올바름)

문제는 Netlify 사이트 설정에 있을 가능성이 높습니다.

## 다음 단계

**가장 빠른 해결책:**
1. Netlify에서 기존 사이트 삭제
2. 새로 사이트 생성 (수동 배포)
3. 환경 변수 설정
4. 재배포

이렇게 하면 깨끗한 상태에서 시작할 수 있습니다.


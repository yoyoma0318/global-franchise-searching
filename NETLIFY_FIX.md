# Netlify 배포 에러 해결 가이드

## 에러 메시지
```
Plugin "@netlify/plugin-nextjs" failed
Error: Your publish directory is pointing to the base directory of your site.
```

## 원인
Netlify 사이트 설정에서 **Publish directory**가 프로젝트 루트 디렉토리로 설정되어 있거나, 잘못된 값이 설정되어 있습니다.

## 해결 방법

### 방법 1: Netlify 대시보드에서 설정 제거 (권장)

1. **Netlify 대시보드 접속**
   - https://app.netlify.com 접속
   - 배포 실패한 사이트 선택

2. **사이트 설정 열기**
   - 왼쪽 메뉴에서 **"Site settings"** 클릭
   - 또는 사이트 이름 옆의 **⚙️ (설정 아이콘)** 클릭

3. **Build & deploy 설정**
   - **"Build & deploy"** 메뉴 클릭
   - **"Build settings"** 섹션으로 스크롤

4. **Publish directory 삭제**
   - **"Publish directory"** 필드 찾기
   - 필드에 값이 있으면 **완전히 삭제** (비워두기)
   - 또는 **"Clear"** 버튼 클릭
   - **"Save"** 버튼 클릭

5. **재배포**
   - 상단 메뉴에서 **"Deploys"** 탭 클릭
   - **"Trigger deploy"** > **"Deploy site"** 클릭

### 방법 2: netlify.toml에서 명시적으로 제거

이미 `netlify.toml` 파일이 올바르게 설정되어 있습니다. 
Publish directory가 명시되지 않았으므로 플러그인이 자동으로 관리합니다.

### 확인 사항

배포 전에 다음을 확인하세요:

1. ✅ **Publish directory가 비어있는지**
   - Netlify UI에서 확인
   - 값이 있으면 삭제

2. ✅ **Build command가 `npm run build`인지**
   - netlify.toml에 설정되어 있음

3. ✅ **환경 변수 설정**
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 설정 확인

## 올바른 설정 예시

### Netlify UI 설정
```
Build command: npm run build
Publish directory: (비어있음) ← 중요!
```

### netlify.toml (이미 올바르게 설정됨)
```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

## 추가 문제 해결

### 여전히 에러가 발생하는 경우

1. **Netlify 사이트 삭제 후 재생성**
   - 기존 사이트 삭제
   - 새로 사이트 생성
   - 설정을 올바르게 적용

2. **로컬 빌드 테스트**
   ```bash
   npm run build
   ```
   - 로컬에서 빌드가 성공하는지 확인
   - 에러가 있으면 먼저 해결

3. **Netlify 로그 확인**
   - Deploys 탭에서 실패한 배포 클릭
   - "Deploy log" 확인
   - 구체적인 에러 메시지 확인

## 성공 확인

배포가 성공하면:
- ✅ "Published" 상태로 표시
- ✅ 사이트 URL이 생성됨
- ✅ 사이트가 정상적으로 로드됨



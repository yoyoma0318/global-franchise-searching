# Netlify UI에서 Publish Directory 찾기 가이드

## Publish Directory 필드 위치

Netlify UI가 업데이트되면서 Publish directory 필드의 위치가 변경되었을 수 있습니다.

## 방법 1: Build settings에서 찾기

1. **사이트 대시보드 접속**
   - https://app.netlify.com 접속
   - `global-franchise-matching` 사이트 선택

2. **Site settings로 이동**
   - 왼쪽 사이드바에서 **"Site configuration"** 또는 **"Configuration"** 클릭
   - 또는 상단 메뉴에서 **"Site settings"** 클릭

3. **Build & deploy 섹션**
   - **"Build & deploy"** 메뉴 클릭
   - **"Build settings"** 섹션으로 스크롤

4. **Advanced build settings 확장**
   - "Build settings" 섹션 하단에 **"Show advanced"** 또는 **"Edit settings"** 버튼 클릭
   - 또는 **"Advanced"** 섹션을 펼치기
   - 여기에 **"Publish directory"** 필드가 있을 수 있습니다

## 방법 2: Configuration > Deploys에서 찾기

1. **Configuration 메뉴**
   - 왼쪽 사이드바에서 **"Configuration"** 클릭
   - **"Deploys"** 서브메뉴 클릭

2. **Build settings 확인**
   - "Build settings" 섹션 확인
   - "Edit settings" 버튼이 있으면 클릭

## 방법 3: Publish Directory가 없는 경우

Publish directory 필드가 보이지 않는다면:

### 옵션 A: 이미 올바르게 설정되어 있을 수 있음
- Next.js 플러그인을 사용하면 자동으로 관리됩니다
- 필드가 없어도 정상일 수 있습니다

### 옵션 B: netlify.toml 파일로 확인
- 프로젝트 루트의 `netlify.toml` 파일 확인
- Publish directory가 명시되어 있지 않으면 정상입니다

### 옵션 C: 수동으로 설정 제거 (필요한 경우)
- Netlify CLI 사용:
  ```bash
  netlify sites:update --publish-dir ""
  ```

## 현재 설정 확인 방법

### 1. netlify.toml 파일 확인
프로젝트의 `netlify.toml` 파일을 확인하세요. 현재 설정:
```toml
[build]
  command = "npm run build"
  # Publish directory는 명시하지 않습니다

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

이 설정이 올바릅니다. Publish directory가 명시되지 않았으므로 플러그인이 자동으로 관리합니다.

### 2. 배포 로그 확인
- Deploys 탭에서 최신 배포 클릭
- "Deploy log" 확인
- 에러 메시지가 여전히 나타나는지 확인

## 해결 방법

### 만약 여전히 같은 에러가 발생한다면:

1. **netlify.toml에 명시적으로 설정 추가**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"  # Next.js 플러그인이 자동으로 처리하지만 명시적으로 설정
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **또는 완전히 제거하고 플러그인에 맡기기**
   - netlify.toml에서 publish 설정이 있는지 확인
   - 있다면 삭제

## 권장 해결책

현재 `netlify.toml` 파일이 올바르게 설정되어 있으므로:

1. **Netlify에서 사이트 삭제 후 재생성**
   - 기존 사이트 삭제
   - 새로 사이트 생성
   - 폴더를 다시 드래그 앤 드롭

2. **또는 Git 연동 사용**
   - GitHub에 코드 푸시
   - Netlify에서 Git 연동
   - netlify.toml이 자동으로 인식됨

## 빠른 확인 체크리스트

- [ ] netlify.toml 파일이 프로젝트 루트에 있는지
- [ ] @netlify/plugin-nextjs가 package.json에 있는지
- [ ] .nvmrc 파일이 있는지 (Node 18)
- [ ] 환경 변수 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY가 설정되어 있는지

## 다음 단계

1. 현재 netlify.toml 설정이 올바른지 확인
2. 배포를 다시 시도
3. 여전히 에러가 발생하면 배포 로그의 전체 에러 메시지를 확인



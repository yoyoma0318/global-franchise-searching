# Netlify Google Maps 에러 해결 가이드

## 문제
"This page can't load Google Maps correctly" 에러 발생

## 원인
1. Netlify 환경 변수가 설정되지 않았거나 잘못 설정됨
2. Google Maps API 키의 HTTP 리퍼러 제한에 Netlify 도메인이 포함되지 않음

---

## 해결 방법

### 1단계: Netlify 환경 변수 설정

1. **Netlify 대시보드 접속**
   - https://app.netlify.com 접속
   - `global-franchise-matching` 사이트 선택

2. **Site settings로 이동**
   - 왼쪽 메뉴에서 **"Site configuration"** 또는 **"Site settings"** 클릭

3. **Environment variables 메뉴**
   - **"Environment variables"** 메뉴 클릭
   - 또는 **"Build & deploy"** > **"Environment"** 섹션

4. **환경 변수 추가**
   - **"Add variable"** 또는 **"Add environment variable"** 버튼 클릭
   - 다음 정보 입력:
     - **Key**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
     - **Value**: (Google Maps API 키)
     - **Scopes**: 
       - ✅ **Production** 체크
       - ✅ **Deploy previews** 체크 (선택사항)
       - ✅ **Branch deploys** 체크 (선택사항)
   - **"Save"** 클릭

5. **재배포**
   - **"Deploys"** 탭으로 이동
   - **"Trigger deploy"** > **"Deploy site"** 클릭
   - 또는 최신 배포의 **"Clear cache and retry deploy"** 클릭

---

### 2단계: Google Maps API 키 제한 설정 확인

Google Maps API 키가 Netlify 도메인에서 작동하도록 설정해야 합니다.

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com 접속
   - 프로젝트 선택

2. **API 및 서비스 > 사용자 인증 정보**
   - 왼쪽 메뉴에서 **"API 및 서비스"** > **"사용자 인증 정보"** 클릭
   - 사용 중인 API 키 클릭

3. **애플리케이션 제한사항 확인**
   - **"애플리케이션 제한사항"** 섹션 확인
   - **"HTTP 리퍼러(웹사이트)"** 선택되어 있는지 확인

4. **웹사이트 제한사항에 Netlify 도메인 추가**
   - **"웹사이트 제한사항"** 섹션에서 **"항목 추가"** 클릭
   - 다음 패턴들을 추가:
     ```
     https://your-site-name.netlify.app/*
     https://*.netlify.app/*
     ```
   
   **실제 예시:**
   ```
   https://global-franchise-matching.netlify.app/*
   https://*.netlify.app/*
   ```

5. **저장**
   - **"저장"** 버튼 클릭
   - 변경사항이 적용되는 데 몇 분 정도 소요될 수 있습니다

---

### 3단계: API 활성화 확인

필요한 API가 활성화되어 있는지 확인:

1. **API 및 서비스 > 라이브러리**
   - 왼쪽 메뉴에서 **"API 및 서비스"** > **"라이브러리"** 클릭

2. **필수 API 활성화 확인**
   - 다음 API들이 활성화되어 있어야 합니다:
     - ✅ **Maps JavaScript API**
     - ✅ **Places API** (선택사항이지만 권장)
     - ✅ **Geocoding API** (선택사항이지만 권장)

3. **API 활성화**
   - 활성화되지 않은 API가 있으면 클릭하여 **"사용 설정"** 클릭

---

### 4단계: 재배포 및 확인

1. **Netlify 재배포**
   - 환경 변수 설정 후 **"Trigger deploy"** 클릭
   - 또는 사이트 설정에서 **"Clear cache and retry deploy"** 클릭

2. **배포 완료 대기**
   - 배포가 완료될 때까지 대기 (보통 1-2분)

3. **사이트 확인**
   - 배포된 사이트 URL로 접속
   - Google Maps가 정상적으로 로드되는지 확인

---

## 문제 해결 체크리스트

- [ ] Netlify 환경 변수에 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`가 설정되어 있는가?
- [ ] 환경 변수의 Scopes에 **Production**이 체크되어 있는가?
- [ ] Google Maps API 키의 HTTP 리퍼러 제한에 Netlify 도메인이 추가되어 있는가?
- [ ] Maps JavaScript API가 활성화되어 있는가?
- [ ] 재배포를 실행했는가?

---

## 추가 확인 사항

### 브라우저 콘솔 확인

사이트에서 F12를 눌러 개발자 도구를 열고 Console 탭에서 에러 메시지 확인:

**일반적인 에러 메시지:**
- `Google Maps JavaScript API error: RefererNotAllowedMapError`
  - → HTTP 리퍼러 제한 문제
- `Google Maps JavaScript API error: ApiNotActivatedMapError`
  - → API가 활성화되지 않음
- `Google Maps JavaScript API error: InvalidKeyMapError`
  - → API 키가 잘못되었거나 환경 변수가 설정되지 않음

### Netlify 빌드 로그 확인

Netlify 대시보드에서 배포 로그 확인:
- 환경 변수가 제대로 주입되었는지 확인
- 빌드 에러가 없는지 확인

---

## 빠른 해결 요약

1. **Netlify**: Site settings > Environment variables > `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 추가
2. **Google Cloud**: API 키 제한 설정 > HTTP 리퍼러 > Netlify 도메인 추가
3. **재배포**: Netlify에서 재배포 실행

---

## 참고

- 환경 변수 변경 후에는 반드시 재배포해야 합니다
- Google Maps API 키 제한 설정 변경은 즉시 적용되지만, 캐시 때문에 몇 분 걸릴 수 있습니다
- 브라우저 캐시를 지우고 다시 시도해보세요 (Cmd+Shift+R 또는 Ctrl+Shift+R)



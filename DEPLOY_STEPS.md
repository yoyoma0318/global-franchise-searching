# Netlify 배포 단계별 가이드

## ✅ 완료된 단계

1. ✅ npm install 완료
2. ✅ Git 저장소 초기화 완료
3. ✅ 파일 커밋 완료

## 다음 단계: Netlify 배포

Netlify에 배포하는 방법은 **2가지**가 있습니다:

---

## 방법 1: 수동 배포 (Git 없이, 가장 간단)

### 장점
- GitHub 계정 불필요
- 즉시 배포 가능
- 가장 빠른 방법

### 단계

1. **Netlify 웹사이트 접속**
   - https://www.netlify.com 접속
   - 로그인 (Google 계정으로 간단히 가입 가능)

2. **수동 배포 시작**
   - 대시보드에서 "Add new site" 클릭
   - "Deploy manually" 선택

3. **폴더 드래그 앤 드롭**
   - Finder에서 프로젝트 폴더 열기:
     ```
     /Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS
     ```
   - **전체 폴더**를 Netlify 창에 드래그 앤 드롭
   - ⚠️ **중요**: `.next` 폴더가 아닌 **프로젝트 루트 폴더** 전체를 드롭하세요

4. **환경 변수 설정**
   - 배포가 시작되면 "Site settings" 클릭
   - "Environment variables" 메뉴 선택
   - "Add variable" 클릭
   - 다음 추가:
     - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
     - Value: (Google Maps API 키 입력)
   - "Save" 클릭

5. **사이트 설정 확인**
   - "Build & deploy" > "Build settings" 메뉴
   - **Publish directory**가 비어있는지 확인 (`.next`로 설정되어 있으면 삭제)
   - Build command는 `npm run build`로 설정되어 있어야 함

6. **재배포**
   - "Deploys" 탭으로 이동
   - "Trigger deploy" > "Deploy site" 클릭

---

## 방법 2: Git 연동 배포 (GitHub 사용)

### 장점
- 자동 배포 (코드 변경 시 자동 업데이트)
- 버전 관리
- 협업에 유리

### 사전 준비
- GitHub 계정 필요
- GitHub에 저장소 생성 필요

### 단계

1. **GitHub에 저장소 생성**
   - https://github.com 접속
   - "New repository" 클릭
   - 저장소 이름 입력 (예: `global-franchise-searching`)
   - "Create repository" 클릭

2. **로컬 저장소와 GitHub 연결**
   ```bash
   git remote add origin https://github.com/사용자명/저장소명.git
   git branch -M main
   git push -u origin main
   ```

3. **Netlify에서 Git 연동**
   - Netlify 대시보드에서 "Add new site" > "Import an existing project"
   - GitHub 선택 및 인증
   - 저장소 선택
   - 빌드 설정은 자동 감지됨 (netlify.toml 사용)

4. **환경 변수 설정** (방법 1과 동일)

---

## ⚠️ 중요: Netlify 사이트 설정 확인

배포 전에 반드시 확인해야 할 사항:

### 1. Publish Directory 설정
- **Site settings** > **Build & deploy** > **Build settings**
- **Publish directory** 필드를 **비워두기** (삭제)
- ⚠️ `.next`로 설정되어 있으면 반드시 삭제하세요!

### 2. Build Command
- `npm run build`로 설정되어 있어야 함
- netlify.toml 파일에 이미 설정되어 있음

### 3. Node Version
- `.nvmrc` 파일이 있으면 자동으로 Node 18 사용
- 또는 Netlify 설정에서 Node 18로 수동 설정

---

## 배포 후 확인사항

1. ✅ 사이트가 정상적으로 로드되는지 확인
2. ✅ Google Maps가 표시되는지 확인
3. ✅ 필터 기능이 작동하는지 테스트
4. ✅ 지도 마커가 표시되는지 확인

---

## 문제 해결

### "Publish directory .next is incorrect" 에러
- **해결**: Netlify 사이트 설정에서 Publish directory 삭제

### "Google Maps not loading" 에러
- **해결**: 환경 변수에 API 키가 올바르게 설정되었는지 확인

### 빌드 실패
- **해결**: Netlify 로그에서 에러 메시지 확인
- 대부분 Node 버전이나 의존성 문제

---

## 빠른 참조: 필수 명령어

```bash
# 프로젝트 폴더로 이동
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"

# 의존성 설치 (이미 완료)
npm install

# 로컬 빌드 테스트
npm run build

# 개발 서버 실행
npm run dev
```

---

## 추천 방법

**처음 배포라면 방법 1 (수동 배포)을 추천합니다:**
- 가장 간단하고 빠름
- Git 지식 불필요
- 즉시 배포 가능


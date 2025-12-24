# GitHub에 코드 푸시하기 (단계별 가이드)

## 사전 준비

- GitHub 계정 필요 (없으면 https://github.com 에서 가입)
- Git이 설치되어 있어야 함 (이미 확인됨: `git version 2.50.1`)

---

## 1단계: GitHub에 저장소 생성

### 1-1. GitHub 웹사이트 접속
1. 브라우저에서 https://github.com 접속
2. 로그인 (또는 회원가입)

### 1-2. 새 저장소 생성
1. 오른쪽 상단의 **"+"** 아이콘 클릭
2. **"New repository"** 선택

### 1-3. 저장소 정보 입력
- **Repository name**: `global-franchise-searching` (또는 원하는 이름)
- **Description**: (선택사항) "Global F&B Market Intelligence Platform"
- **Public** 또는 **Private** 선택
  - Public: 누구나 볼 수 있음 (무료)
  - Private: 본인만 볼 수 있음 (무료)
- ⚠️ **중요**: "Initialize this repository with a README" 체크하지 마세요
  - 이미 로컬에 코드가 있으므로 체크하지 않습니다
- **"Create repository"** 버튼 클릭

### 1-4. 저장소 URL 복사
저장소가 생성되면 다음 페이지가 표시됩니다:
```
Quick setup — if you've done this kind of thing before
https://github.com/사용자명/global-franchise-searching.git
```
이 URL을 복사해두세요.

---

## 2단계: 로컬에서 GitHub 연결

### 2-1. 터미널 열기
- `Cmd + Space` → "터미널" 입력 → Enter

### 2-2. 프로젝트 폴더로 이동
터미널에 다음 명령어 입력:
```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```
Enter 키 누르기

### 2-3. GitHub 저장소 연결
터미널에 다음 명령어 입력 (사용자명과 저장소명을 실제 값으로 변경):
```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

**예시:**
```bash
git remote add origin https://github.com/markkim/global-franchise-searching.git
```

⚠️ **중요**: 
- `사용자명`을 본인의 GitHub 사용자명으로 변경
- `저장소명`을 1단계에서 만든 저장소 이름으로 변경

### 2-4. 브랜치 이름 변경 (필요한 경우)
```bash
git branch -M main
```

### 2-5. GitHub에 푸시
```bash
git push -u origin main
```

**처음 푸시 시:**
- GitHub 사용자명 입력 요청
- GitHub 비밀번호 또는 Personal Access Token 입력 요청
  - 비밀번호 대신 Personal Access Token 사용 권장

---

## 3단계: GitHub 인증 (Personal Access Token)

### 3-1. Personal Access Token 생성

1. **GitHub 웹사이트 접속**
   - https://github.com 로그인

2. **Settings로 이동**
   - 오른쪽 상단 프로필 사진 클릭
   - **"Settings"** 선택

3. **Developer settings**
   - 왼쪽 메뉴 맨 아래 **"Developer settings"** 클릭

4. **Personal access tokens**
   - **"Personal access tokens"** 클릭
   - **"Tokens (classic)"** 선택

5. **Generate new token**
   - **"Generate new token"** > **"Generate new token (classic)"** 클릭

6. **토큰 설정**
   - **Note**: "Netlify Deployment" (설명)
   - **Expiration**: 원하는 기간 선택 (예: 90 days)
   - **Scopes**: 다음 체크:
     - ✅ `repo` (전체 체크)
   - **"Generate token"** 클릭

7. **토큰 복사**
   - ⚠️ **중요**: 이 토큰은 한 번만 표시됩니다!
   - 토큰을 복사해서 안전한 곳에 저장

### 3-2. 푸시 시 토큰 사용

터미널에서 `git push` 실행 시:
- **Username**: GitHub 사용자명 입력
- **Password**: 비밀번호가 아닌 **Personal Access Token** 입력

---

## 전체 명령어 순서 (한 번에 복사)

터미널에서 순서대로 실행:

```bash
# 1. 프로젝트 폴더로 이동
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"

# 2. GitHub 저장소 연결 (사용자명과 저장소명 변경 필요)
git remote add origin https://github.com/사용자명/저장소명.git

# 3. 브랜치 이름 확인/변경
git branch -M main

# 4. GitHub에 푸시
git push -u origin main
```

---

## 문제 해결

### "remote origin already exists" 에러
```bash
# 기존 연결 제거
git remote remove origin

# 다시 연결
git remote add origin https://github.com/사용자명/저장소명.git
```

### "Authentication failed" 에러
- Personal Access Token을 사용했는지 확인
- 토큰이 만료되지 않았는지 확인
- 토큰에 `repo` 권한이 있는지 확인

### "Permission denied" 에러
- 저장소가 Private인 경우 본인 계정으로 로그인했는지 확인
- 저장소 이름이 정확한지 확인

---

## 성공 확인

푸시가 성공하면:
1. 터미널에 "Writing objects: 100%" 메시지 표시
2. GitHub 웹사이트에서 저장소 페이지 새로고침
3. 파일들이 표시됨

---

## 다음 단계: Netlify Git 연동

GitHub에 푸시가 완료되면:

1. **Netlify 대시보드 접속**
   - https://app.netlify.com

2. **"Add new site"** 클릭
   - **"Import an existing project"** 선택

3. **GitHub 선택 및 인증**
   - GitHub 아이콘 클릭
   - 인증 완료

4. **저장소 선택**
   - `global-franchise-searching` 저장소 선택

5. **빌드 설정**
   - 자동으로 감지됨 (netlify.toml 사용)
   - **"Deploy site"** 클릭

6. **환경 변수 설정**
   - Site settings > Environment variables
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 추가

---

## 빠른 참조

### 저장소 URL 형식
```
https://github.com/사용자명/저장소명.git
```

### 주요 Git 명령어
```bash
git status          # 현재 상태 확인
git add .          # 모든 변경사항 추가
git commit -m "메시지"  # 커밋
git push            # GitHub에 푸시
git pull            # GitHub에서 가져오기
```



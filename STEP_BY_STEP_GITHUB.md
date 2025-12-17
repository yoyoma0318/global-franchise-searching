# GitHub 푸시 완전 가이드 (처음부터 끝까지)

## 현재 상태 확인 ✅

- ✅ Git 저장소가 이미 초기화되어 있습니다
- ✅ 프로젝트 폴더 위치가 올바릅니다
- ✅ 파일들이 커밋되어 있습니다

---

## 1단계: GitHub에 저장소 생성 (웹 브라우저에서)

### 1-1. GitHub 접속
1. 브라우저에서 https://github.com 열기
2. 로그인 (또는 회원가입)

### 1-2. 새 저장소 만들기
1. 오른쪽 상단의 **"+"** 아이콘 클릭
2. **"New repository"** 선택

### 1-3. 저장소 정보 입력
- **Repository name**: `global-franchise-searching`
  - 소문자와 하이픈(-)만 사용
  - 공백 없이
- **Description**: (선택사항) "Global F&B Market Intelligence Platform"
- **Public** 또는 **Private** 선택
- ⚠️ **중요**: 
  - "Add a README file" 체크하지 마세요
  - "Add .gitignore" 체크하지 마세요
  - "Choose a license" 선택하지 마세요
- **"Create repository"** 버튼 클릭

### 1-4. 저장소 URL 확인
저장소가 생성되면 다음 페이지가 나타납니다:

```
Quick setup — if you've done this kind of thing before
```

여기에 다음과 같은 URL이 표시됩니다:
```
https://github.com/사용자명/global-franchise-searching.git
```

**이 URL을 복사해두세요!**

예시:
- 사용자명이 `markkim`이면: `https://github.com/markkim/global-franchise-searching.git`

---

## 2단계: 터미널에서 GitHub 연결

### 2-1. 터미널 열기
- `Cmd + Space` → "터미널" 입력 → Enter

### 2-2. 프로젝트 폴더로 이동
터미널에 다음 명령어를 **정확히** 입력:

```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

**입력 방법:**
1. 위 명령어를 복사 (Cmd+C)
2. 터미널 클릭
3. 붙여넣기 (Cmd+V)
4. Enter 키 누르기

### 2-3. 현재 위치 확인
다음 명령어로 확인:

```bash
pwd
```

**예상 결과:**
```
/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS
```

### 2-4. Git 저장소 확인
다음 명령어로 확인:

```bash
git status
```

**예상 결과:**
```
On branch main
nothing to commit, working tree clean
```

또는 파일 목록이 표시됩니다.

### 2-5. GitHub 저장소 연결
**1단계에서 복사한 URL**을 사용하여 다음 명령어 입력:

```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

**실제 예시** (사용자명이 `markkim`이고 저장소명이 `global-franchise-searching`인 경우):
```bash
git remote add origin https://github.com/markkim/global-franchise-searching.git
```

**입력 방법:**
1. `git remote add origin ` 까지 입력
2. 1단계에서 복사한 URL 붙여넣기
3. Enter 키 누르기

### 2-6. 연결 확인
다음 명령어로 확인:

```bash
git remote -v
```

**예상 결과:**
```
origin  https://github.com/사용자명/저장소명.git (fetch)
origin  https://github.com/사용자명/저장소명.git (push)
```

### 2-7. 브랜치 이름 확인/변경
```bash
git branch -M main
```

### 2-8. GitHub에 푸시
```bash
git push -u origin main
```

**인증 요청:**
- **Username**: GitHub 사용자명 입력
- **Password**: 비밀번호가 아닌 **Personal Access Token** 입력 (아래 참고)

---

## 3단계: Personal Access Token 생성 (필수)

GitHub는 비밀번호 대신 Personal Access Token을 사용합니다.

### 3-1. GitHub 웹사이트에서 토큰 생성

1. **GitHub 접속**
   - https://github.com 로그인

2. **Settings로 이동**
   - 오른쪽 상단 프로필 사진 클릭
   - **"Settings"** 선택

3. **Developer settings**
   - 왼쪽 메뉴 맨 아래로 스크롤
   - **"Developer settings"** 클릭

4. **Personal access tokens**
   - **"Personal access tokens"** 클릭
   - **"Tokens (classic)"** 선택

5. **Generate new token**
   - **"Generate new token"** 버튼 클릭
   - 또는 **"Generate new token (classic)"** 클릭

6. **토큰 설정**
   - **Note**: `Netlify Deployment` (설명)
   - **Expiration**: `90 days` 또는 원하는 기간 선택
   - **Scopes**: 
     - ✅ `repo` 체크 (전체 체크)
   - **"Generate token"** 버튼 클릭

7. **토큰 복사**
   - ⚠️ **중요**: 이 토큰은 **한 번만** 표시됩니다!
   - `ghp_`로 시작하는 긴 문자열을 복사
   - 안전한 곳에 저장 (메모장 등)

### 3-2. 푸시 시 토큰 사용

`git push -u origin main` 실행 시:
- **Username**: GitHub 사용자명 입력 (예: `markkim`)
- **Password**: 비밀번호가 아닌 **복사한 토큰** 붙여넣기

---

## 전체 명령어 순서 (복사해서 사용)

터미널에서 **한 줄씩** 실행하세요:

```bash
# 1. 프로젝트 폴더로 이동
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

```bash
# 2. 현재 위치 확인
pwd
```

```bash
# 3. Git 상태 확인
git status
```

```bash
# 4. GitHub 저장소 연결 (URL을 실제 값으로 변경!)
git remote add origin https://github.com/사용자명/저장소명.git
```

```bash
# 5. 연결 확인
git remote -v
```

```bash
# 6. 브랜치 이름 확인
git branch -M main
```

```bash
# 7. GitHub에 푸시
git push -u origin main
```

---

## 문제 해결

### "fatal: not a git repository"
**해결:**
```bash
# 프로젝트 폴더로 이동
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"

# Git 저장소 확인
ls -la .git
```

### "fatal: remote origin already exists"
**해결:**
```bash
# 기존 연결 제거
git remote remove origin

# 다시 연결
git remote add origin https://github.com/사용자명/저장소명.git
```

### "Authentication failed"
**해결:**
- Personal Access Token을 사용했는지 확인
- 토큰이 만료되지 않았는지 확인
- 토큰에 `repo` 권한이 있는지 확인

---

## 성공 확인

푸시가 성공하면:
1. 터미널에 다음과 같은 메시지 표시:
   ```
   Writing objects: 100% (35/35), done.
   To https://github.com/사용자명/저장소명.git
    * [new branch]      main -> main
   ```

2. GitHub 웹사이트에서 저장소 페이지 새로고침
3. 파일들이 표시됨

---

## 다음 단계

GitHub 푸시가 완료되면:
1. Netlify에서 Git 연동 시작
2. 자동 배포 설정


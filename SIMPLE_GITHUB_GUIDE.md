# GitHub 푸시 간단 가이드 (3단계)

## 현재 상태
- ✅ Git 저장소 준비 완료
- ✅ 파일 커밋 완료
- ⏳ GitHub 저장소 연결 필요

---

## 단계 1: GitHub에 저장소 만들기 (웹 브라우저)

### 1. GitHub 접속
- https://github.com 접속
- 로그인

### 2. 새 저장소 만들기
1. 오른쪽 상단 **"+"** 클릭
2. **"New repository"** 선택

### 3. 정보 입력
- **Repository name**: `global-franchise-searching`
- **Public** 또는 **Private** 선택
- ⚠️ **체크하지 마세요**: README, .gitignore, License
- **"Create repository"** 클릭

### 4. URL 복사
생성된 페이지에서 이 URL을 복사하세요:
```
https://github.com/사용자명/global-franchise-searching.git
```

**예시:**
- 사용자명이 `markkim`이면: `https://github.com/markkim/global-franchise-searching.git`

---

## 단계 2: 터미널에서 연결하기

### 터미널 열기
- `Cmd + Space` → "터미널" 입력 → Enter

### 명령어 실행 (순서대로)

**1. 프로젝트 폴더로 이동**
```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

**2. GitHub 저장소 연결**
위에서 복사한 URL을 사용하여:
```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

**실제 예시** (본인의 URL로 변경):
```bash
git remote add origin https://github.com/markkim/global-franchise-searching.git
```

**3. 연결 확인**
```bash
git remote -v
```

**4. GitHub에 푸시**
```bash
git push -u origin main
```

---

## 단계 3: 인증하기

`git push` 실행 시:

1. **Username**: GitHub 사용자명 입력
2. **Password**: 
   - ⚠️ 비밀번호가 아닙니다!
   - Personal Access Token 필요 (아래 참고)

### Personal Access Token 만들기

1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token (classic)" 클릭
3. Note: `Netlify` 입력
4. Scopes: `repo` 체크
5. "Generate token" 클릭
6. 토큰 복사 (한 번만 표시됨!)
7. 푸시 시 Password에 토큰 붙여넣기

---

## 성공 확인

푸시 성공 시:
- 터미널에 "Writing objects: 100%" 메시지
- GitHub 웹사이트에서 파일 확인 가능

---

## 빠른 참조: 전체 명령어

```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
git remote add origin https://github.com/사용자명/저장소명.git
git remote -v
git push -u origin main
```

⚠️ **중요**: `사용자명`과 `저장소명`을 실제 값으로 변경하세요!



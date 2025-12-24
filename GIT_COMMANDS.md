# Git 명령어 올바른 사용법

## ⚠️ 중요: 명령어 앞에 `git`을 붙여야 합니다

### 잘못된 예시 ❌
```bash
remote add origin https://github.com/...
```
→ `bash: remote: command not found` 에러 발생

### 올바른 예시 ✅
```bash
git remote add origin https://github.com/...
```

---

## 올바른 명령어 순서

### 1. 프로젝트 폴더로 이동
```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

### 2. GitHub 저장소 연결
```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

**예시:**
```bash
git remote add origin https://github.com/markkim/global-franchise-searching.git
```

### 3. 브랜치 이름 확인/변경
```bash
git branch -M main
```

### 4. GitHub에 푸시
```bash
git push -u origin main
```

---

## 명령어 입력 팁

### 1. `bash` 명령어는 입력하지 마세요
- 터미널이 열리면 바로 명령어를 입력하면 됩니다
- `bash-3.2$` 프롬프트가 보여도 `bash`를 다시 입력할 필요 없습니다

### 2. 명령어는 한 줄씩 입력
- 한 번에 하나의 명령어만 입력
- Enter 키를 누르면 실행됩니다

### 3. 복사/붙여넣기 사용
- 명령어를 복사(Cmd+C)해서 터미널에 붙여넣기(Cmd+V)
- 오타를 줄일 수 있습니다

---

## 전체 과정 (복사해서 사용)

터미널에 다음을 **한 줄씩** 입력하세요:

```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

```bash
git remote add origin https://github.com/사용자명/저장소명.git
```
⚠️ `사용자명`과 `저장소명`을 실제 값으로 변경하세요!

```bash
git branch -M main
```

```bash
git push -u origin main
```

---

## 에러 해결

### "remote: command not found"
- **원인**: `git`을 빼먹었습니다
- **해결**: `git remote add origin ...` 형식으로 입력

### "fatal: remote origin already exists"
- **원인**: 이미 연결되어 있습니다
- **해결**: 
  ```bash
  git remote remove origin
  git remote add origin https://github.com/사용자명/저장소명.git
  ```

### "fatal: not a git repository"
- **원인**: 프로젝트 폴더가 아닌 곳에 있습니다
- **해결**: 
  ```bash
  cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
  ```

---

## 확인 명령어

### 현재 위치 확인
```bash
pwd
```

### Git 저장소 상태 확인
```bash
git status
```

### 연결된 원격 저장소 확인
```bash
git remote -v
```

---

## 다음 단계

명령어 실행이 완료되면:
1. GitHub 웹사이트에서 파일이 업로드되었는지 확인
2. Netlify에서 Git 연동 시작



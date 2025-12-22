# 다음 단계: GitHub 푸시 및 Netlify 배포

## ✅ 현재 완료된 작업
- ✅ Git 저장소 초기화 완료
- ✅ 원격 저장소 연결 완료: `https://github.com/yoyoma0318/global-franchise-searching.git`
- ✅ 파일 커밋 완료

---

## 🚀 다음 작업: GitHub에 푸시하기

### 터미널에서 실행할 명령어

터미널에 다음 명령어를 입력하세요:

```bash
git push -u origin main
```

### 인증 정보 입력

명령어 실행 후 다음을 입력하라는 메시지가 나타납니다:

1. **Username for 'https://github.com':**
   ```
   yoyoma0318
   ```
   - 입력 후 Enter

2. **Password for 'https://yoyoma0318@github.com':**
   - ⚠️ **비밀번호가 아닙니다!**
   - Personal Access Token을 붙여넣기
   - Enter

### Personal Access Token이 없다면

1. GitHub 웹사이트 접속: https://github.com
2. 오른쪽 상단 프로필 사진 클릭 > **Settings**
3. 왼쪽 메뉴 맨 아래 **Developer settings** 클릭
4. **Personal access tokens** > **Tokens (classic)** 선택
5. **Generate new token (classic)** 클릭
6. 설정:
   - **Note**: `Netlify Deployment`
   - **Expiration**: `90 days` (또는 원하는 기간)
   - **Scopes**: ✅ `repo` 체크
7. **Generate token** 클릭
8. 토큰 복사 (한 번만 표시됨!)
9. 푸시 시 Password에 토큰 붙여넣기

---

## ✅ 성공 확인

푸시가 성공하면 터미널에 다음과 같은 메시지가 표시됩니다:

```
Enumerating objects: 35, done.
Counting objects: 100% (35/35), done.
Writing objects: 100% (35/35), done.
To https://github.com/yoyoma0318/global-franchise-searching.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

그리고 GitHub 웹사이트에서 파일들이 보입니다!

---

## 🌐 다음 단계: Netlify 배포

GitHub 푸시가 완료되면 Netlify에 배포합니다:

### 1. Netlify 대시보드 접속
- https://app.netlify.com 접속
- 로그인

### 2. 새 사이트 생성
- **"Add new site"** 클릭
- **"Import an existing project"** 선택

### 3. GitHub 연동
- **GitHub** 아이콘 클릭
- GitHub 인증 완료
- 저장소 선택: `yoyoma0318/global-franchise-searching`

### 4. 빌드 설정
- 자동으로 감지됨 (netlify.toml 파일 사용)
- **"Deploy site"** 클릭

### 5. 환경 변수 설정
- 배포 시작 후 **"Site settings"** 클릭
- **"Environment variables"** 메뉴 선택
- **"Add variable"** 클릭
- 다음 추가:
  - **Key**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
  - **Value**: (Google Maps API 키)
- **"Save"** 클릭

### 6. 재배포
- **"Deploys"** 탭으로 이동
- **"Trigger deploy"** > **"Deploy site"** 클릭

### 7. 배포 완료
- 배포가 완료되면 사이트 URL이 생성됩니다
- URL을 클릭하여 사이트 확인!

---

## 📋 체크리스트

- [ ] GitHub에 푸시 완료
- [ ] GitHub 웹사이트에서 파일 확인
- [ ] Netlify에서 Git 연동 완료
- [ ] 환경 변수 설정 완료
- [ ] 배포 성공 확인
- [ ] 사이트가 정상 작동하는지 확인

---

## 🆘 문제 해결

### "Authentication failed"
- Personal Access Token을 사용했는지 확인
- 토큰이 만료되지 않았는지 확인

### "Repository not found"
- 저장소가 Private인 경우 본인 계정으로 로그인했는지 확인
- 저장소 이름이 정확한지 확인

### Netlify 배포 실패
- 환경 변수가 설정되었는지 확인
- 배포 로그에서 에러 메시지 확인


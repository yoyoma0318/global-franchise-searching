# GitHub 푸시 완료 가이드

## ✅ 완료된 작업
- ✅ 원격 저장소 연결 완료
- ✅ URL이 올바르게 설정됨: `https://github.com/yoyoma0318/global-franchise-searching.git`

## 다음 단계: GitHub에 푸시하기

### 터미널에서 다음 명령어 실행:

```bash
git push -u origin main
```

### 인증 정보 입력

명령어 실행 후 다음을 입력하라는 메시지가 나타납니다:

1. **Username for 'https://github.com':**
   - `yoyoma0318` 입력
   - Enter 키 누르기

2. **Password for 'https://yoyoma0318@github.com':**
   - ⚠️ **비밀번호가 아닙니다!**
   - Personal Access Token을 붙여넣기
   - Enter 키 누르기

### Personal Access Token이 없다면

1. GitHub 웹사이트 접속
2. Settings > Developer settings > Personal access tokens > Tokens (classic)
3. "Generate new token (classic)" 클릭
4. Note: `Netlify` 입력
5. Scopes: `repo` 체크
6. "Generate token" 클릭
7. 토큰 복사 (한 번만 표시됨!)
8. 푸시 시 Password에 토큰 붙여넣기

## 성공 확인

푸시가 성공하면:
- 터미널에 "Writing objects: 100%" 메시지 표시
- GitHub 웹사이트에서 파일 확인 가능

## 다음 단계: Netlify 배포

GitHub 푸시가 완료되면:

1. **Netlify 대시보드 접속**
   - https://app.netlify.com

2. **"Add new site"** 클릭
   - **"Import an existing project"** 선택

3. **GitHub 선택 및 인증**
   - GitHub 아이콘 클릭
   - 인증 완료

4. **저장소 선택**
   - `yoyoma0318/global-franchise-searching` 선택

5. **빌드 설정**
   - 자동으로 감지됨 (netlify.toml 사용)
   - **"Deploy site"** 클릭

6. **환경 변수 설정**
   - Site settings > Environment variables
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 추가
   - 값 입력 후 Save

7. **배포 완료 대기**
   - 배포가 완료되면 사이트 URL이 생성됨

## 문제 해결

### "Authentication failed"
- Personal Access Token을 사용했는지 확인
- 토큰에 `repo` 권한이 있는지 확인

### "Repository not found"
- 저장소가 Private인 경우 본인 계정으로 로그인했는지 확인
- 저장소 이름이 정확한지 확인


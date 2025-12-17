# 터미널 사용 가이드 (단계별)

## 터미널이란?

터미널(Terminal)은 컴퓨터에 명령어를 입력하여 작업을 수행하는 프로그램입니다. Mac에서는 "터미널" 앱을 사용합니다.

## 1단계: 터미널 열기

### Mac에서 터미널 열기 방법

**방법 1: Spotlight 검색 사용 (가장 빠름)**
1. 키보드에서 `Cmd + Space` (Command + 스페이스바) 누르기
2. "터미널" 또는 "Terminal" 입력
3. Enter 키 누르기

**방법 2: Finder에서 찾기**
1. Finder 열기
2. 왼쪽 사이드바에서 "응용 프로그램" 클릭
3. "유틸리티" 폴더 열기
4. "터미널" 더블클릭

**방법 3: Launchpad 사용**
1. F4 키 누르거나 트랙패드에서 4손가락으로 모으기
2. "기타" 폴더 열기
3. "터미널" 클릭

## 2단계: 프로젝트 폴더로 이동

터미널이 열리면 다음 명령어를 입력합니다:

```bash
cd "/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS"
```

### 명령어 입력 방법
1. 터미널 창을 클릭하여 커서가 깜빡이도록 합니다
2. 위 명령어를 복사(Cmd+C)한 후 터미널에 붙여넣기(Cmd+V)
3. Enter 키를 누릅니다

### 확인 방법
명령어 실행 후 터미널에 다음과 같이 표시되면 성공:
```
/Users/markkim/Desktop/Program_DV/Global Franchise Searching GFS %
```

## 3단계: npm install 실행

프로젝트 폴더로 이동한 후, 다음 명령어를 입력합니다:

```bash
npm install
```

### 실행 과정
1. 명령어 입력 후 Enter 키 누르기
2. 의존성 패키지 설치가 시작됩니다
3. 몇 분 정도 소요될 수 있습니다
4. 완료되면 터미널에 다시 입력할 수 있는 상태가 됩니다

### 성공 확인
설치가 완료되면 다음과 같은 메시지가 표시됩니다:
```
added 431 packages, and audited 432 packages in 30s
```

또는 에러 없이 명령어 입력 대기 상태로 돌아오면 성공입니다.

## 4단계: Git 명령어 실행 (배포 전)

### Git이 설치되어 있는지 확인

```bash
git --version
```

- Git이 설치되어 있으면: `git version 2.x.x` 같은 메시지가 표시됩니다
- Git이 없으면: "command not found" 메시지가 표시됩니다

### Git 설치 (필요한 경우)

Mac에는 보통 Git이 기본 설치되어 있지만, 없다면:
1. [Git 공식 웹사이트](https://git-scm.com/download/mac)에서 다운로드
2. 또는 Xcode Command Line Tools 설치:
   ```bash
   xcode-select --install
   ```

### 변경사항 커밋 및 푸시

**1. 변경사항 확인**
```bash
git status
```

**2. 모든 변경사항 추가**
```bash
git add .
```

**3. 커밋 (변경사항 저장)**
```bash
git commit -m "Add Netlify deployment configuration"
```

**4. 원격 저장소에 푸시 (GitHub 등에 업로드)**
```bash
git push
```

⚠️ **주의**: `git push`는 원격 저장소가 설정되어 있어야 합니다.

## 터미널 명령어 기본 사용법

### 자주 사용하는 명령어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `cd` | 폴더 이동 | `cd Desktop` |
| `ls` | 현재 폴더의 파일 목록 보기 | `ls` |
| `pwd` | 현재 위치 확인 | `pwd` |
| `clear` | 화면 지우기 | `clear` |

### 명령어 입력 팁

1. **자동완성**: Tab 키를 누르면 파일/폴더 이름이 자동완성됩니다
2. **이전 명령어**: 위/아래 화살표 키로 이전 명령어를 다시 불러올 수 있습니다
3. **복사/붙여넣기**: 
   - 복사: `Cmd + C`
   - 붙여넣기: `Cmd + V` (터미널에서)
4. **명령어 취소**: `Ctrl + C`로 실행 중인 명령어를 중단할 수 있습니다

## 문제 해결

### "command not found" 에러
- 명령어를 잘못 입력했거나, 해당 프로그램이 설치되지 않은 경우입니다
- `npm`이 없다면 Node.js를 설치해야 합니다

### "permission denied" 에러
- 권한 문제입니다. `sudo`를 사용하거나 관리자 권한이 필요할 수 있습니다

### 폴더를 찾을 수 없을 때
- `pwd` 명령어로 현재 위치 확인
- `ls` 명령어로 현재 폴더의 파일 목록 확인
- 정확한 경로로 다시 이동

## 다음 단계

터미널 명령어 실행이 완료되면:
1. Netlify 대시보드로 이동
2. 사이트 설정에서 Publish directory 제거
3. 환경 변수 설정
4. 재배포

자세한 내용은 `NETLIFY_DEPLOY.md` 파일을 참고하세요.


# 보안 가이드

## API 키 관리

### ❌ 절대 하지 말아야 할 것

1. **API 키를 코드에 하드코딩**
   ```typescript
   // 나쁜 예시 ❌
   const API_KEY = "AIzaSy..."
   ```

2. **Git에 커밋**
   - `.env.local` 파일은 이미 `.gitignore`에 포함되어 있지만, 확인하세요
   - 실수로 커밋했다면 즉시 삭제하고 새 키 생성

3. **공개 채널에 공유**
   - 이메일, Slack, Discord 등 공개 채널에 API 키 공유 금지
   - 스크린샷에 API 키 노출 주의

4. **공개 저장소에 업로드**
   - GitHub, GitLab 등 공개 저장소에 API 키 포함 금지

### ✅ 올바른 방법

1. **환경 변수 사용**
   ```env
   # .env.local (Git에 커밋하지 않음)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```

2. **안전한 공유 방법**
   - 1Password, Bitwarden 등 비밀번호 관리 도구 사용
   - 팀 내부의 암호화된 채널 사용
   - 직접 전달 (화면 공유, 전화 등)

3. **API 키 제한 설정**
   - HTTP 리퍼러 제한
   - API 제한 (필요한 API만 활성화)
   - IP 주소 제한 (가능한 경우)

## 환경 변수 확인

프로젝트의 `.gitignore` 파일에 다음이 포함되어 있는지 확인:

```gitignore
# local env files
.env*.local
.env
```

## API 키 유출 대응 절차

1. **즉시 조치**
   - Google Cloud Console에서 해당 키 삭제
   - 새 API 키 생성
   - `.env.local` 업데이트

2. **피해 평가**
   - Google Cloud Console의 "사용량" 대시보드 확인
   - 비정상적인 사용량 확인

3. **예방 조치**
   - 쿼터 제한 설정
   - 알림 설정 활성화
   - 정기적인 보안 감사

## 프로덕션 배포 보안

### Vercel 배포 시

1. Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
2. 환경 변수 추가:
   - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value: API 키 값
   - Environment: Production, Preview, Development 선택

### 다른 플랫폼 배포 시

각 플랫폼의 환경 변수 설정 기능 사용:
- Netlify: Site settings > Environment variables
- AWS: Systems Manager Parameter Store 또는 Secrets Manager
- Docker: Docker secrets 사용

## 추가 보안 권장사항

1. **정기적인 키 순환**: 3-6개월마다 API 키 교체
2. **최소 권한 원칙**: 필요한 API만 활성화
3. **모니터링**: 비정상적인 사용 패턴 감지
4. **문서화**: 팀 내 보안 정책 문서화 및 공유


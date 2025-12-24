# TypeScript 타입 에러 수정 완료

## ✅ 수정 완료

### 문제
- `Deal` 인터페이스의 `status` 타입에 `'planned'`가 없었음
- `Deal` 인터페이스의 `type` 타입에 `'New Entry'`와 `'New Brand'`가 없었음

### 해결
1. `types/index.ts` 파일의 `Deal` 인터페이스 수정:
   - `status` 타입에 `'planned'` 추가
   - `type` 타입에 `'New Entry'`, `'New Brand'`, `'Franchise'` 추가

### 변경 내용

**이전:**
```typescript
status: 'announced' | 'in-progress' | 'completed' | 'cancelled'
type: 'MF' | 'JV' | 'M&A' | 'expansion'
```

**수정 후:**
```typescript
status: 'announced' | 'in-progress' | 'completed' | 'cancelled' | 'planned'
type: 'MF' | 'JV' | 'M&A' | 'expansion' | 'New Entry' | 'New Brand' | 'Franchise'
```

## ✅ 빌드 확인

로컬 빌드 테스트 성공:
```bash
npm run build
✓ Compiled successfully
✓ Generating static pages (9/9)
```

## 다음 단계

1. ✅ 변경사항 커밋 완료
2. ✅ GitHub에 푸시 완료
3. ⏳ Netlify에서 자동 재배포 대기
   - GitHub에 푸시하면 Netlify가 자동으로 재배포를 시작합니다
   - 배포가 성공하면 사이트가 정상 작동합니다

## 확인 방법

1. Netlify 대시보드에서 배포 상태 확인
2. 배포가 성공하면 사이트 URL로 접속하여 확인
3. TypeScript 에러가 더 이상 발생하지 않는지 확인



# Firebase 권한 문제 해결 가이드

## 문제
```
PERMISSION_DENIED: Missing or insufficient permissions
```

## 원인
Firestore 보안 규칙이 데이터 쓰기를 허용하지 않습니다.

## 해결 방법

### 방법 1: Firestore 보안 규칙 수정 (개발 환경용)

⚠️ **주의**: 이 방법은 개발 환경에서만 사용하세요. 프로덕션에서는 인증을 사용해야 합니다.

1. **Firebase Console 접속**
   - https://console.firebase.google.com 접속
   - 프로젝트 선택: `global-franchise-connect`

2. **Firestore Database로 이동**
   - 왼쪽 메뉴에서 **"Firestore Database"** 클릭
   - **"규칙"** 탭 클릭

3. **보안 규칙 수정**
   - 현재 규칙을 다음으로 변경:

   **개발 환경용 (임시):**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   ⚠️ **경고**: 이 규칙은 모든 읽기/쓰기를 허용합니다. 개발 환경에서만 사용하세요!

4. **게시**
   - **"게시"** 버튼 클릭

5. **스크립트 재실행**
   ```bash
   node scripts/seed-data.js
   ```

### 방법 2: Firebase Admin SDK 사용 (권장)

더 안전한 방법은 Firebase Admin SDK를 사용하는 것입니다. 이 방법은 서버 사이드에서만 실행되며, 관리자 권한이 필요합니다.

#### 2-1. Admin SDK 설정

1. **Firebase Console에서 서비스 계정 키 생성**
   - Firebase Console > 프로젝트 설정 > 서비스 계정
   - **"새 비공개 키 생성"** 클릭
   - JSON 파일 다운로드

2. **서비스 계정 키 파일 저장**
   - 다운로드한 JSON 파일을 프로젝트 루트에 `firebase-admin-key.json`으로 저장
   - ⚠️ `.gitignore`에 추가되어 있는지 확인

3. **스크립트 수정**
   - `scripts/seed-data.js`를 Admin SDK를 사용하도록 수정

### 방법 3: Firebase 인증 사용

인증된 사용자만 쓰기를 허용하도록 설정:

1. **Firestore 보안 규칙 수정**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /companies/{companyId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

2. **인증 토큰 사용**
   - 스크립트에서 Firebase 인증을 사용하여 토큰 획득
   - 또는 Firebase CLI를 사용하여 인증

---

## 빠른 해결 (개발 환경)

개발 환경에서 빠르게 테스트하려면:

1. **Firebase Console 접속**
   - https://console.firebase.google.com
   - 프로젝트: `global-franchise-connect`

2. **Firestore Database > 규칙**
   - 다음 규칙으로 변경:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

3. **게시** 클릭

4. **스크립트 재실행**
   ```bash
   node scripts/seed-data.js
   ```

---

## 프로덕션 환경 권장 설정

프로덕션에서는 다음과 같은 보안 규칙을 사용하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /companies/{companyId} {
      // 모든 사용자가 읽을 수 있음
      allow read: if true;
      
      // 인증된 사용자만 쓸 수 있음
      allow write: if request.auth != null;
      
      // 또는 특정 역할의 사용자만
      // allow write: if request.auth != null && 
      //   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 확인 사항

- [ ] Firebase 프로젝트가 올바르게 선택되었는지 확인
- [ ] `.env.local` 파일에 Firebase 설정이 올바르게 되어 있는지 확인
- [ ] Firestore 보안 규칙이 쓰기를 허용하는지 확인
- [ ] Firestore Database가 생성되어 있는지 확인

---

## 다음 단계

권한 문제가 해결되면:
1. 스크립트가 성공적으로 실행됩니다
2. Firestore에 데이터가 저장됩니다
3. 앱에서 데이터를 읽을 수 있습니다


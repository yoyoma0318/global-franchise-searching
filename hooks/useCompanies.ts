import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, FirestoreError } from 'firebase/firestore';

export interface Company {
  id: string;
  name: string;
  category: string;
  region: string;
  country?: string;
  description?: string;
  status?: string;
  metrics?: {
    revenue?: string;
    store_count?: number;
  };
  brands?: { name: string; category: string }[];
  // 필요한 필드들을 유연하게 정의
  [key: string]: any; 
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // 1. 기본 쿼리: 회사 컬렉션을 가져옵니다.
    // (복잡한 필터나 정렬은 클라이언트에서 처리하여 인덱스 에러를 방지합니다)
    const q = query(collection(db, 'companies'));

    // 2. 실시간 구독 (onSnapshot)
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedCompanies: Company[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Company));

        console.log(`✅ Fetched ${fetchedCompanies.length} companies from Firestore.`);
        setCompanies(fetchedCompanies);
        setLoading(false); // 로딩 끝!
      },
      (err: FirestoreError) => {
        console.error("❌ Firestore Error:", err);
        // 에러가 나도 로딩은 끝내야 화면이 나옵니다.
        setError(err.message); 
        setLoading(false); 
      }
    );

    // 컴포넌트가 사라질 때 구독 해제
    return () => unsubscribe();
  }, []);

  return { companies, loading, error };
}
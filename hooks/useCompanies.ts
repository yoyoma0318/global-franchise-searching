import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  QueryConstraint,
  orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Company, FilterState } from '@/types'

export interface UseCompaniesResult {
  companies: Company[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to fetch companies from Firebase Firestore
 * Supports real-time updates and filtering
 *
 * @param filters - Optional filter state to filter companies
 * @param realtime - Enable real-time updates (default: false)
 */
export function useCompanies(
  filters?: FilterState,
  realtime: boolean = false
): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query with filters
      const constraints: QueryConstraint[] = []

      if (filters?.countries && filters.countries.length > 0) {
        constraints.push(where('country', 'in', filters.countries))
      }

      if (filters?.isPublic !== undefined) {
        constraints.push(where('isPublic', '==', filters.isPublic))
      }

      if (filters?.minRevenue !== undefined) {
        constraints.push(where('revenue', '>=', filters.minRevenue))
      }

      if (filters?.maxRevenue !== undefined) {
        constraints.push(where('revenue', '<=', filters.maxRevenue))
      }

      // Add ordering
      constraints.push(orderBy('name', 'asc'))

      const companiesRef = collection(db, 'companies')
      const q = query(companiesRef, ...constraints)
      const querySnapshot = await getDocs(q)

      const companiesData: Company[] = []
      querySnapshot.forEach((doc) => {
        companiesData.push({ id: doc.id, ...doc.data() } as Company)
      })

      // Client-side filtering for categories (since we can't use 'in' with brand categories in a simple way)
      let filteredCompanies = companiesData
      if (filters?.categories && filters.categories.length > 0) {
        filteredCompanies = companiesData.filter(company =>
          company.brands.some(brand =>
            filters.categories?.includes(brand.category)
          )
        )
      }

      setCompanies(filteredCompanies)
    } catch (err) {
      console.error('Error fetching companies:', err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (realtime) {
      // Real-time listener
      const constraints: QueryConstraint[] = []

      if (filters?.countries && filters.countries.length > 0) {
        constraints.push(where('country', 'in', filters.countries))
      }

      if (filters?.isPublic !== undefined) {
        constraints.push(where('isPublic', '==', filters.isPublic))
      }

      constraints.push(orderBy('name', 'asc'))

      const companiesRef = collection(db, 'companies')
      const q = query(companiesRef, ...constraints)

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const companiesData: Company[] = []
          querySnapshot.forEach((doc) => {
            companiesData.push({ id: doc.id, ...doc.data() } as Company)
          })

          // Client-side filtering for categories
          let filteredCompanies = companiesData
          if (filters?.categories && filters.categories.length > 0) {
            filteredCompanies = companiesData.filter(company =>
              company.brands.some(brand =>
                filters.categories?.includes(brand.category)
              )
            )
          }

          setCompanies(filteredCompanies)
          setLoading(false)
        },
        (err) => {
          console.error('Error in real-time listener:', err)
          setError(err as Error)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } else {
      // One-time fetch
      fetchCompanies()
    }
  }, [filters, realtime])

  return {
    companies,
    loading,
    error,
    refetch: fetchCompanies,
  }
}

/**
 * Helper function to get a single company by ID
 */
export function useCompany(companyId: string | null) {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!companyId) {
      setCompany(null)
      setLoading(false)
      return
    }

    const fetchCompany = async () => {
      try {
        setLoading(true)
        const companiesRef = collection(db, 'companies')
        const q = query(companiesRef, where('id', '==', companyId))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          setCompany({ id: doc.id, ...doc.data() } as Company)
        } else {
          setCompany(null)
        }
      } catch (err) {
        console.error('Error fetching company:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [companyId])

  return { company, loading, error }
}

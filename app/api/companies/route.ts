import { NextResponse } from 'next/server'
import { companies, getCompanyById, getCompaniesByCountry } from '@/lib/data'
import { Country } from '@/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country') as Country | null
  const id = searchParams.get('id')

  if (id) {
    const company = getCompanyById(id)
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }
    return NextResponse.json(company)
  }

  if (country) {
    const filteredCompanies = getCompaniesByCountry(country)
    return NextResponse.json(filteredCompanies)
  }

  return NextResponse.json(companies)
}


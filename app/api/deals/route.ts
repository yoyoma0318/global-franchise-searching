import { NextResponse } from 'next/server'
import { recentDeals } from '@/lib/data'
import { Country } from '@/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country') as Country | null
  const type = searchParams.get('type')

  let deals = recentDeals

  if (country) {
    deals = deals.filter(deal => deal.country === country)
  }

  if (type) {
    deals = deals.filter(deal => deal.type === type)
  }

  return NextResponse.json(deals)
}


// Core data types for the platform

export type Region = 'asia' | 'europe' | 'americas' | 'middle-east'

export type Country = 
  | 'indonesia' 
  | 'malaysia' 
  | 'hong-kong' 
  | 'philippines'
  | 'singapore'
  | 'thailand'
  | 'vietnam'
  | 'taiwan'

export type Category = 
  | 'coffee' 
  | 'bakery' 
  | 'chicken' 
  | 'pizza' 
  | 'qsr' 
  | 'casual-dining' 
  | 'premium-dining'
  | 'beverages'
  | 'dessert'

export interface Company {
  id: string
  name: string
  nameLocal?: string
  country: Country
  city?: string
  headquarters: {
    lat: number
    lng: number
  }
  revenue?: number // in USD millions
  marketCap?: number // in USD millions
  isPublic: boolean
  stockSymbol?: string
  description: string
  website?: string
  logo?: string
  brands: Brand[]
  recentNews: NewsItem[]
  contactInfo?: ContactInfo
  portfolio: PortfolioItem[]
}

export interface Brand {
  id: string
  name: string
  category: Category
  operator: string // Company ID
  storeCount?: number
  logo?: string
  description?: string
  marketPosition?: 'leader' | 'challenger' | 'niche'
}

export interface PortfolioItem {
  brandId: string
  brandName: string
  storeCount: number
  launchDate?: string
  status: 'active' | 'planned' | 'closed'
}

export interface NewsItem {
  id: string
  title: string
  source: string
  publishedAt: string
  url: string
  summary?: string
  tags: string[]
  dealType?: 'MF' | 'JV' | 'M&A' | 'expansion'
  companies?: string[] // Company IDs
}

export interface Deal {
  id: string
  type: 'MF' | 'JV' | 'M&A' | 'expansion' | 'New Entry' | 'New Brand' | 'Franchise'
  brandId: string
  brandName: string
  partnerId: string
  partnerName: string
  country: Country
  announcedDate: string
  status: 'announced' | 'in-progress' | 'completed' | 'cancelled' | 'planned'
  value?: number // in USD
  description: string
  source: string
}

export interface ContactInfo {
  email?: string
  linkedin?: string
  phone?: string
  decisionMakers?: DecisionMaker[]
}

export interface DecisionMaker {
  name: string
  title: string
  email?: string
  linkedin?: string
}

export interface MapViewState {
  zoom: number
  center: {
    lat: number
    lng: number
  }
  viewLevel: 'region' | 'country' | 'city' | 'district'
  selectedCountry?: Country
  selectedCompany?: string
}

export interface FilterState {
  countries?: Country[]
  categories?: Category[]
  minRevenue?: number
  maxRevenue?: number
  isPublic?: boolean
  hasLicense?: string[] // e.g., 'alcohol', 'halal'
}


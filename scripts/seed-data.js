#!/usr/bin/env node

/**
 * Seed Firestore Database with Sample Data
 *
 * This script migrates data from lib/data.ts to Firebase Firestore
 * Uses Firebase Client SDK and loads credentials from .env.local
 *
 * Usage: node scripts/seed-data.js
 */

require('dotenv').config({ path: '.env.local' })
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, setDoc, writeBatch } = require('firebase/firestore')

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Error: Firebase configuration is missing!')
  console.error('Make sure your .env.local file has all the required NEXT_PUBLIC_FIREBASE_* variables')
  process.exit(1)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample data (extracted from lib/data.ts)
const companies = [
  {
    id: 'lippo-group',
    name: 'Lippo Group',
    nameLocal: 'Lippo Group',
    country: 'indonesia',
    city: 'Jakarta',
    headquarters: { lat: -6.2088, lng: 106.8456 },
    revenue: 5000,
    isPublic: true,
    stockSymbol: 'LMIRT',
    description: '인도네시아 최대 쇼핑몰 운영사로, F&B 브랜드에게 입지를 제공하는 권력자',
    website: 'https://www.lippogroup.com',
    brands: [
      { id: 'maxx-coffee', name: 'Maxx Coffee', category: 'coffee', operator: 'lippo-group' }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'maxx-coffee', brandName: 'Maxx Coffee', storeCount: 50, status: 'active' }
    ]
  },
  {
    id: 'map-boga',
    name: 'PT Map Boga Adiperkasa Tbk',
    nameLocal: 'MAP Boga',
    country: 'indonesia',
    city: 'Jakarta',
    headquarters: { lat: -6.2088, lng: 106.8456 },
    revenue: 196,
    marketCap: 1200,
    isPublic: true,
    stockSymbol: 'MAPB',
    description: '프리미엄 브랜드의 요람. 글로벌 A급 브랜드의 마스터 프랜차이즈 독점권 보유. 800+ 매장 운영',
    website: 'https://www.mbai.co.id',
    brands: [
      { id: 'starbucks-id', name: 'Starbucks', category: 'coffee', operator: 'map-boga', storeCount: 400 },
      { id: 'subway-id', name: 'Subway', category: 'qsr', operator: 'map-boga' },
      { id: 'krispy-kreme-id', name: 'Krispy Kreme', category: 'dessert', operator: 'map-boga' },
      { id: 'genki-sushi-id', name: 'Genki Sushi', category: 'casual-dining', operator: 'map-boga' },
      { id: 'paul-bakery-id', name: 'Paul Bakery', category: 'bakery', operator: 'map-boga' },
      { id: 'godiva-id', name: 'Godiva', category: 'dessert', operator: 'map-boga' }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'starbucks-id', brandName: 'Starbucks', storeCount: 400, status: 'active' },
      { brandId: 'subway-id', brandName: 'Subway', storeCount: 100, status: 'active' },
      { brandId: 'krispy-kreme-id', brandName: 'Krispy Kreme', storeCount: 50, status: 'active' }
    ],
    contactInfo: {
      email: 'corporatesecretary@mbai.co.id',
      decisionMakers: [
        { name: 'Liryawati', title: 'Corporate Secretary', email: 'corporatesecretary@mbai.co.id' }
      ]
    }
  },
  {
    id: 'ismaya-group',
    name: 'Ismaya Group',
    nameLocal: 'Ismaya Group',
    country: 'indonesia',
    city: 'Jakarta',
    headquarters: { lat: -6.2088, lng: 106.8456 },
    revenue: 150,
    isPublic: false,
    description: '라이프스타일과 엔터테인먼트. 먹는 것을 넘어 즐기는 문화를 파는 기업',
    brands: [
      { id: 'skye', name: 'SKYE', category: 'premium-dining', operator: 'ismaya-group' },
      { id: 'social-house', name: 'Social House', category: 'casual-dining', operator: 'ismaya-group' },
      { id: 'haraku-ramen', name: 'Haraku Ramen', category: 'casual-dining', operator: 'ismaya-group' },
      { id: 'djournal-coffee', name: 'Djournal Coffee', category: 'coffee', operator: 'ismaya-group' }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'info@ismayagroup.com'
    }
  },
  {
    id: 'nachindo',
    name: 'Nachindo',
    nameLocal: 'Nachindo',
    country: 'indonesia',
    city: 'Jakarta',
    headquarters: { lat: -6.2088, lng: 106.8456 },
    revenue: 50,
    isPublic: false,
    description: '테이프 제조 기반의 산업 기업에서 외식업으로 확장. BHC 치킨과 마스터 프랜차이즈 계약 체결',
    brands: [
      { id: 'bhc-chicken-id', name: 'BHC Chicken', category: 'chicken', operator: 'nachindo' }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'bhc-chicken-id', brandName: 'BHC Chicken', storeCount: 0, status: 'planned' }
    ]
  },
  {
    id: 'berjaya-food',
    name: 'Berjaya Food Berhad',
    nameLocal: 'Berjaya Food',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 182,
    marketCap: 800,
    isPublic: true,
    stockSymbol: 'BJFOOD',
    description: '말레이시아 F&B의 제왕. 글로벌 브랜드의 현지화를 가장 성공적으로 수행. Paris Baguette 태국/브루나이 진출 파트너',
    website: 'https://www.berjaya.com',
    brands: [
      { id: 'starbucks-my', name: 'Starbucks', category: 'coffee', operator: 'berjaya-food', storeCount: 300 },
      { id: 'kenny-rogers', name: 'Kenny Rogers ROASTERS', category: 'qsr', operator: 'berjaya-food' },
      { id: 'jollibean', name: 'Jollibean', category: 'qsr', operator: 'berjaya-food' },
      { id: 'paris-baguette-my', name: 'Paris Baguette', category: 'bakery', operator: 'berjaya-food' }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'starbucks-my', brandName: 'Starbucks', storeCount: 300, status: 'active' },
      { brandId: 'paris-baguette-my', brandName: 'Paris Baguette', storeCount: 20, status: 'active' }
    ]
  },
  {
    id: 'ql-resources',
    name: 'QL Resources',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 1200,
    marketCap: 2000,
    isPublic: true,
    stockSymbol: 'QL',
    description: '농수산물 가공 기업에서 시작해 FamilyMart를 들여와 편의점 시장을 QSR 형태로 혁신',
    brands: [
      { id: 'familymart-my', name: 'FamilyMart', category: 'qsr', operator: 'ql-resources' }
    ],
    recentNews: [],
    portfolio: []
  },
  {
    id: 'heineken-malaysia',
    name: 'Heineken Malaysia',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 400,
    isPublic: true,
    stockSymbol: 'HEIM',
    description: '말레이시아 주식시장에 상장된 주류 기업',
    brands: [],
    recentNews: [],
    portfolio: []
  },
  {
    id: 'maxims-caterers',
    name: "Maxim's Caterers",
    nameLocal: '맥심 그룹',
    country: 'hong-kong',
    city: 'Hong Kong',
    headquarters: { lat: 22.3193, lng: 114.1694 },
    revenue: 1800,
    isPublic: false,
    description: '프리미엄의 상징. 홍콩 디즈니랜드의 식음료 운영부터 공항 케이터링까지 전방위적 장악력. 홍콩 시장 점유율 13.5%',
    website: 'https://www.maxims.com.hk',
    brands: [
      { id: 'starbucks-hk', name: 'Starbucks', category: 'coffee', operator: 'maxims-caterers', storeCount: 300 },
      { id: 'starbucks-vn', name: 'Starbucks', category: 'coffee', operator: 'maxims-caterers', storeCount: 100 },
      { id: 'starbucks-th', name: 'Starbucks', category: 'coffee', operator: 'maxims-caterers', storeCount: 50 },
      { id: 'shake-shack-hk', name: 'Shake Shack', category: 'qsr', operator: 'maxims-caterers', storeCount: 10 },
      { id: 'genki-sushi-hk', name: 'Genki Sushi', category: 'casual-dining', operator: 'maxims-caterers' },
      { id: 'ippudo-hk', name: 'IPPUDO', category: 'casual-dining', operator: 'maxims-caterers' },
      { id: 'cheesecake-factory-hk', name: 'The Cheesecake Factory', category: 'casual-dining', operator: 'maxims-caterers' }
    ],
    recentNews: [],
    contactInfo: {
      email: 'pr@maxims.com.hk',
      decisionMakers: [
        { name: 'Fiona Kwok', title: 'PR/Comms', email: 'pr@maxims.com.hk' }
      ]
    },
    portfolio: []
  },
  {
    id: 'cafe-de-coral',
    name: 'Cafe de Coral Holdings',
    nameLocal: '카페 드 코랄',
    country: 'hong-kong',
    city: 'Hong Kong',
    headquarters: { lat: 22.3193, lng: 114.1694 },
    revenue: 600,
    marketCap: 1500,
    isPublic: true,
    stockSymbol: '341',
    description: '매스 마켓의 강자. 빠르고 저렴한 식사를 제공하는 데 특화',
    brands: [
      { id: 'cafe-de-coral-brand', name: 'Cafe de Coral', category: 'qsr', operator: 'cafe-de-coral' },
      { id: 'spaghetti-house', name: 'The Spaghetti House', category: 'casual-dining', operator: 'cafe-de-coral' }
    ],
    recentNews: [],
    portfolio: []
  },
  {
    id: 'jollibee',
    name: 'Jollibee Foods Corporation',
    nameLocal: 'Jollibee',
    country: 'philippines',
    city: 'Manila',
    headquarters: { lat: 14.5995, lng: 120.9842 },
    revenue: 3000,
    marketCap: 5000,
    isPublic: true,
    stockSymbol: 'JFC',
    description: '아시아의 인수합병 포식자. 한국 브랜드를 통째로 인수하여 글로벌화시키는 투자자. Highlands Coffee EBITDA PHP 1.91B (9M 2025)',
    website: 'https://www.jollibee.com.ph',
    brands: [
      { id: 'jollibee-brand', name: 'Jollibee', category: 'qsr', operator: 'jollibee' },
      { id: 'compose-coffee', name: 'Compose Coffee', category: 'coffee', operator: 'jollibee' },
      { id: 'smashburger', name: 'Smashburger', category: 'qsr', operator: 'jollibee' },
      { id: 'coffee-bean-tea-leaf', name: 'Coffee Bean & Tea Leaf', category: 'coffee', operator: 'jollibee' },
      { id: 'tim-ho-wan', name: 'Tim Ho Wan', category: 'casual-dining', operator: 'jollibee' },
      { id: 'highlands-coffee', name: 'Highlands Coffee', category: 'coffee', operator: 'jollibee' }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'compose-coffee', brandName: 'Compose Coffee', storeCount: 100, status: 'active' }
    ],
    contactInfo: {
      email: 'ir@jollibee.com.ph',
      decisionMakers: [
        { name: 'Richard Shin', title: 'CFO', email: 'ir@jollibee.com.ph' },
        { name: 'Corporate Office', title: 'President Office', email: 'president@jollibee.com.ph' },
        { name: 'Real Estate Team', title: 'Property/Leasing', email: 'realestate@jollibee.com.ph' },
        { name: 'Purchasing Team', title: 'Procurement', email: 'purchasing.feedback@jollibee.com.ph' }
      ]
    }
  },
  {
    id: 'highlands-coffee-vn',
    name: 'Highlands Coffee',
    nameLocal: 'Highlands Coffee',
    country: 'vietnam',
    city: 'Ho Chi Minh City',
    headquarters: { lat: 10.8231, lng: 106.6297 },
    revenue: 150,
    isPublic: false,
    description: '베트남 최대 커피 체인. Jollibee Foods Corporation의 자회사로 베트남 커피 시장을 선도',
    brands: [
      { id: 'highlands-coffee-brand', name: 'Highlands Coffee', category: 'coffee', operator: 'highlands-coffee-vn', storeCount: 500 }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'highlands-coffee-brand', brandName: 'Highlands Coffee', storeCount: 500, status: 'active' }
    ]
  },
  {
    id: 'trung-nguyen',
    name: 'Trung Nguyen',
    nameLocal: 'Trung Nguyên',
    country: 'vietnam',
    city: 'Ho Chi Minh City',
    headquarters: { lat: 10.8231, lng: 106.6297 },
    revenue: 200,
    isPublic: false,
    description: '베트남 대표 로컬 커피 브랜드. 프리미엄 커피와 전통 베트남 커피를 모두 제공',
    brands: [
      { id: 'trung-nguyen-brand', name: 'Trung Nguyen', category: 'coffee', operator: 'trung-nguyen', storeCount: 300 }
    ],
    recentNews: [],
    portfolio: []
  },
  {
    id: 'central-group',
    name: 'Central Group',
    nameLocal: 'เซ็นทรัล กรุ๊ป',
    country: 'thailand',
    city: 'Bangkok',
    headquarters: { lat: 13.7563, lng: 100.5018 },
    revenue: 8000,
    marketCap: 12000,
    isPublic: true,
    stockSymbol: 'CENTEL',
    description: '태국 최대 소매 그룹. 쇼핑몰 운영과 F&B 브랜드 운영을 동시에 하는 종합 그룹',
    website: 'https://www.central.co.th',
    brands: [
      { id: 'starbucks-th-central', name: 'Starbucks', category: 'coffee', operator: 'central-group', storeCount: 350 },
      { id: 'swensens-th', name: "Swensen's", category: 'dessert', operator: 'central-group', storeCount: 200 },
      { id: 'the-pizza-company', name: "The Pizza Company", category: 'pizza', operator: 'central-group', storeCount: 150 }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'starbucks-th-central', brandName: 'Starbucks', storeCount: 350, status: 'active' },
      { brandId: 'swensens-th', brandName: "Swensen's", storeCount: 200, status: 'active' }
    ]
  },
  {
    id: 'minor-food-group',
    name: 'Minor Food Group',
    nameLocal: 'ไมเนอร์ ฟู้ด กรุ๊ป',
    country: 'thailand',
    city: 'Bangkok',
    headquarters: { lat: 13.7563, lng: 100.5018 },
    revenue: 1200,
    marketCap: 2000,
    isPublic: true,
    stockSymbol: 'MINT',
    description: '태국 최대 F&B 운영사. Pizza Hut, Swensen\'s, Dairy Queen 등 글로벌 브랜드 운영. Core Profit THB 3.46B (1H 2025, +22% YoY). The Steak & More 런칭 예정',
    website: 'https://www.minorfood.com',
    brands: [
      { id: 'pizza-hut-th', name: 'Pizza Hut', category: 'pizza', operator: 'minor-food-group', storeCount: 180 },
      { id: 'dairy-queen-th', name: 'Dairy Queen', category: 'dessert', operator: 'minor-food-group', storeCount: 120 },
      { id: 'swensens-minor', name: "Swensen's", category: 'dessert', operator: 'minor-food-group', storeCount: 100 }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'pizza-hut-th', brandName: 'Pizza Hut', storeCount: 180, status: 'active' },
      { brandId: 'dairy-queen-th', brandName: 'Dairy Queen', storeCount: 120, status: 'active' }
    ],
    contactInfo: {
      decisionMakers: [
        { name: 'Namida Artispong', title: 'Director, Investor Relations', email: 'namida_ar@minor.com' },
        { name: 'Alisa Kulsena', title: 'Manager, Investor Relations', email: 'alisa_ku@minor.com' }
      ]
    }
  },
  {
    id: 'qsr-brands',
    name: 'QSR Brands (M) Holdings',
    nameLocal: 'QSR Brands',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 1400,
    isPublic: false,
    description: 'KFC (Malaysia/SG/Brunei/Cambodia), Pizza Hut 운영. 1,270+ 매장. Food Technology Company로 전환 목표',
    website: 'https://www.qsrbrands.com',
    brands: [
      { id: 'kfc-my', name: 'KFC', category: 'chicken', operator: 'qsr-brands', storeCount: 800 },
      { id: 'pizza-hut-my', name: 'Pizza Hut', category: 'pizza', operator: 'qsr-brands', storeCount: 470 }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'email.us@qsrbrands.com.my'
    }
  },
  {
    id: 'golden-gate-group',
    name: 'Golden Gate Group',
    nameLocal: 'Golden Gate',
    country: 'vietnam',
    city: 'Hanoi',
    headquarters: { lat: 21.0285, lng: 105.8542 },
    revenue: 250,
    isPublic: false,
    description: '베트남 주요 F&B 그룹. 500+ 레스토랑 운영. The Coffee House 인수 완료 (99.98% 지분)',
    website: 'https://www.ggg.com.vn',
    brands: [
      { id: 'kichi-kichi', name: 'Kichi-Kichi', category: 'casual-dining', operator: 'golden-gate-group', storeCount: 150 },
      { id: 'gogi-house', name: 'Gogi House', category: 'casual-dining', operator: 'golden-gate-group', storeCount: 100 },
      { id: 'manwah', name: 'Manwah', category: 'casual-dining', operator: 'golden-gate-group', storeCount: 80 },
      { id: 'the-coffee-house', name: 'The Coffee House', category: 'coffee', operator: 'golden-gate-group', storeCount: 170 }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'support.hn@ggg.com.vn'
    }
  },
  {
    id: 'loob-holding',
    name: 'Loob Holding',
    nameLocal: 'Loob',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 50,
    isPublic: false,
    description: 'Tealive, Bask Bear Coffee, WonderBrew 운영. 900+ 매장, 연간 50M 컵 판매',
    website: 'https://www.loob.com.my',
    brands: [
      { id: 'tealive', name: 'Tealive', category: 'beverages', operator: 'loob-holding', storeCount: 700 },
      { id: 'bask-bear', name: 'Bask Bear Coffee', category: 'coffee', operator: 'loob-holding', storeCount: 150 },
      { id: 'wonderbrew', name: 'WonderBrew', category: 'beverages', operator: 'loob-holding', storeCount: 50 }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'enquiry@loob.com.my',
      decisionMakers: [
        { name: 'Sue Liew', title: 'Franchise/Biz Dev', email: 'sueliew@loob.com.my' },
        { name: 'Luke', title: 'Franchise/Biz Dev', email: 'luke@loob.com.my' }
      ]
    }
  },
  {
    id: 'bistro-group',
    name: 'The Bistro Group',
    nameLocal: 'Bistro Group',
    country: 'philippines',
    city: 'Manila',
    headquarters: { lat: 14.5995, lng: 120.9842 },
    revenue: 200,
    isPublic: false,
    description: 'TGI Fridays, Italianni\'s, Texas Roadhouse, Denny\'s, Hard Rock Cafe 운영. 200+ 매장, 28개 컨셉',
    website: 'https://www.bistro.com.ph',
    brands: [
      { id: 'tgi-fridays', name: 'TGI Fridays', category: 'casual-dining', operator: 'bistro-group', storeCount: 50 },
      { id: 'italiannis', name: "Italianni's", category: 'casual-dining', operator: 'bistro-group', storeCount: 30 },
      { id: 'texas-roadhouse', name: 'Texas Roadhouse', category: 'casual-dining', operator: 'bistro-group', storeCount: 20 },
      { id: 'dennys', name: "Denny's", category: 'casual-dining', operator: 'bistro-group', storeCount: 15 },
      { id: 'hard-rock', name: 'Hard Rock Cafe', category: 'casual-dining', operator: 'bistro-group', storeCount: 10 }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'vanessam@bistro.com.ph',
      decisionMakers: [
        { name: 'Vanessa M', title: 'Marketing/Dev', email: 'vanessam@bistro.com.ph' }
      ]
    }
  },
  {
    id: 'tunglok-group',
    name: 'TungLok Group',
    nameLocal: 'TungLok',
    country: 'singapore',
    city: 'Singapore',
    headquarters: { lat: 1.3521, lng: 103.8198 },
    revenue: 59,
    marketCap: 59,
    isPublic: true,
    stockSymbol: '540',
    description: 'TungLok Seafood, Dancing Crab, QIN, Douraku Sushi 운영',
    website: 'https://www.tunglok.com',
    brands: [
      { id: 'tunglok-seafood', name: 'TungLok Seafood', category: 'casual-dining', operator: 'tunglok-group', storeCount: 20 },
      { id: 'dancing-crab', name: 'Dancing Crab', category: 'casual-dining', operator: 'tunglok-group', storeCount: 10 },
      { id: 'qin', name: 'QIN', category: 'casual-dining', operator: 'tunglok-group', storeCount: 8 },
      { id: 'douraku-sushi', name: 'Douraku Sushi', category: 'casual-dining', operator: 'tunglok-group', storeCount: 5 }
    ],
    recentNews: [],
    portfolio: [],
    contactInfo: {
      email: 'tlpdpa@tunglok.com',
      decisionMakers: [
        { name: 'Carolyn Tan', title: 'SVP, Business Development', email: 'tlpdpa@tunglok.com' }
      ]
    }
  },
  {
    id: 'gourmet-master',
    name: 'Gourmet Master Co. Ltd',
    nameLocal: '85°C',
    country: 'taiwan',
    city: 'Taipei',
    headquarters: { lat: 25.0330, lng: 121.5654 },
    revenue: 1910,
    isPublic: true,
    stockSymbol: '2723',
    description: '85°C Bakery Cafe 운영. 1000+ 매장. 중국 내 저수익 매장 폐점 및 미국 시장 확장 집중 (86개 → 90개)',
    website: 'https://www.85cafe.com',
    brands: [
      { id: '85c-bakery', name: '85°C Bakery Cafe', category: 'bakery', operator: 'gourmet-master', storeCount: 1000 }
    ],
    recentNews: [],
    portfolio: []
  },
  {
    id: 'wowprime',
    name: 'Wowprime Corp',
    nameLocal: '王品集團',
    country: 'taiwan',
    city: 'Taipei',
    headquarters: { lat: 25.0330, lng: 121.5654 },
    revenue: 730,
    isPublic: true,
    stockSymbol: '2727',
    description: 'Wang Steak, TASTY, 12 Hotpot 운영',
    website: 'https://www.wowprime.com',
    brands: [
      { id: 'wang-steak', name: 'Wang Steak', category: 'premium-dining', operator: 'wowprime', storeCount: 50 },
      { id: 'tasty', name: 'TASTY', category: 'casual-dining', operator: 'wowprime', storeCount: 30 },
      { id: '12-hotpot', name: '12 Hotpot', category: 'casual-dining', operator: 'wowprime', storeCount: 20 }
    ],
    recentNews: [],
    portfolio: []
  }
]

async function seedData() {
  console.log('🌱 Starting data seeding...\n')
  console.log(`📍 Firebase Project: ${firebaseConfig.projectId}`)
  console.log(`📦 Total companies to seed: ${companies.length}\n`)

  try {
    // Use batched writes for better performance
    // Firestore allows max 500 operations per batch
    const batchSize = 500
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < companies.length; i += batchSize) {
      const batch = writeBatch(db)
      const batchCompanies = companies.slice(i, i + batchSize)

      for (const company of batchCompanies) {
        const docRef = doc(db, 'companies', company.id)
        batch.set(docRef, company)
      }

      try {
        await batch.commit()
        successCount += batchCompanies.length
        console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: Seeded ${batchCompanies.length} companies`)
      } catch (error) {
        errorCount += batchCompanies.length
        console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message)
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log('🎉 Seeding completed!')
    console.log(`✅ Successfully seeded: ${successCount} companies`)
    if (errorCount > 0) {
      console.log(`❌ Failed: ${errorCount} companies`)
    }
    console.log('='.repeat(50))
    console.log('\n💡 Next steps:')
    console.log('   1. Check your Firestore console to verify the data')
    console.log('   2. Refresh your app at http://localhost:3001')
    console.log('   3. You should see all companies on the map!\n')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Fatal error during seeding:', error)
    process.exit(1)
  }
}

// Run the seed function
seedData()

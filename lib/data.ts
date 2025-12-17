import { Company, Brand, Deal, NewsItem, Country } from '@/types'

// Sample data based on the report
export const companies: Company[] = [
  // Indonesia
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
    revenue: 196, // Rev $196M (TTM Mar 2025)
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
  // Malaysia
  {
    id: 'berjaya-food',
    name: 'Berjaya Food Berhad',
    nameLocal: 'Berjaya Food',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 182, // Rev RM 182M (Q2 2025) ≈ $40M USD
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
  // Hong Kong
  {
    id: 'maxims-caterers',
    name: "Maxim's Caterers",
    nameLocal: '맥심 그룹',
    country: 'hong-kong',
    city: 'Hong Kong',
    headquarters: { lat: 22.3193, lng: 114.1694 },
    revenue: 1800, // Est. Revenue $1.8B+
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
  // Philippines
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
  // Vietnam
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
  // Thailand
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
      { id: 'starbucks-th', name: 'Starbucks', category: 'coffee', operator: 'central-group', storeCount: 350 },
      { id: 'swensens-th', name: "Swensen's", category: 'dessert', operator: 'central-group', storeCount: 200 },
      { id: 'the-pizza-company', name: "The Pizza Company", category: 'pizza', operator: 'central-group', storeCount: 150 }
    ],
    recentNews: [],
    portfolio: [
      { brandId: 'starbucks-th', brandName: 'Starbucks', storeCount: 350, status: 'active' },
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
  // New Companies from Google Sheets
  {
    id: 'qsr-brands',
    name: 'QSR Brands (M) Holdings',
    nameLocal: 'QSR Brands',
    country: 'malaysia',
    city: 'Kuala Lumpur',
    headquarters: { lat: 3.1390, lng: 101.6869 },
    revenue: 1400, // Est. Valuation $1.4B
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
    revenue: 250, // Rev VND 6.29T (2023) ≈ $250M USD
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
    revenue: 59, // Market Cap SGD 59M
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
    revenue: 1910, // Rev NT$ 19.1B ≈ $610M USD
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
    revenue: 730, // Rev TWD 22.85B (TTM) ≈ $730M USD
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

export const recentDeals: Deal[] = [
  {
    id: 'bhc-nachindo',
    type: 'MF',
    brandId: 'bhc-chicken-id',
    brandName: 'BHC Chicken',
    partnerId: 'nachindo',
    partnerName: 'Nachindo',
    country: 'indonesia',
    announcedDate: '2024-12-01',
    status: 'completed',
    description: '한국 1위 치킨 브랜드가 테이프 제조 기반의 Nachindo와 마스터 프랜차이즈 계약 체결',
    source: 'Industry News'
  },
  {
    id: 'compose-jollibee',
    type: 'M&A',
    brandId: 'compose-coffee',
    brandName: 'Compose Coffee',
    partnerId: 'jollibee',
    partnerName: 'Jollibee Foods Corporation',
    country: 'philippines',
    announcedDate: '2024-06-01',
    status: 'completed',
    value: 340,
    description: 'JFC가 한국 저가 커피 브랜드 컴포즈커피의 지분 70%를 약 3억 4천만 달러에 인수',
    source: 'Financial Times'
  },
  {
    id: 'lotteria-serai',
    type: 'MF',
    brandId: 'lotteria',
    brandName: 'Lotteria',
    partnerId: 'serai-group',
    partnerName: 'Serai Group',
    country: 'malaysia',
    announcedDate: '2024-09-01',
    status: 'in-progress',
    description: '롯데리아가 말레이시아 재진출을 위해 현지 Serai Group과 마스터 프랜차이즈 계약. 5년 내 30개 매장 목표',
    source: 'Business News'
  },
  {
    id: 'golden-gate-coffee-house',
    type: 'M&A',
    brandId: 'the-coffee-house',
    brandName: 'The Coffee House',
    partnerId: 'golden-gate-group',
    partnerName: 'Golden Gate Group',
    country: 'vietnam',
    announcedDate: '2025-01-01',
    status: 'completed',
    value: 10.5,
    description: '베트남 커피 체인 The Coffee House 지분 99.98% 인수 (약 $10.5M). 커피 시장 점유율 확대 목적',
    source: 'Market Intelligence'
  },
  {
    id: 'maxims-shake-shack-vn',
    type: 'MF',
    brandId: 'shake-shack-hk',
    brandName: 'Shake Shack',
    partnerId: 'maxims-caterers',
    partnerName: "Maxim's Caterers",
    country: 'vietnam',
    announcedDate: '2025-01-01',
    status: 'planned',
    description: '베트남(2026년 첫 오픈, 2035년까지 15개점) 및 태국 쉐이크쉑 확장 가속화',
    source: 'Market Intelligence'
  },
  {
    id: 'berjaya-paris-baguette',
    type: 'MF',
    brandId: 'paris-baguette-my',
    brandName: 'Paris Baguette',
    partnerId: 'berjaya-food',
    partnerName: 'Berjaya Food Berhad',
    country: 'thailand',
    announcedDate: '2024-12-01',
    status: 'in-progress',
    description: '태국, 브루나이 시장 진출을 위한 마스터 프랜차이즈 계약 체결 (SPC그룹과 파트너십)',
    source: 'Market Intelligence'
  },
  {
    id: 'bistro-fogo',
    type: 'New Entry',
    brandId: 'fogo-de-chao',
    brandName: 'Fogo de Chão',
    partnerId: 'bistro-group',
    partnerName: 'The Bistro Group',
    country: 'philippines',
    announcedDate: '2025-01-01',
    status: 'planned',
    description: '브라질 스테이크 하우스 Fogo de Chão 및 Dave & Buster\'s 필리핀 도입 예정',
    source: 'Market Intelligence'
  },
  {
    id: 'minor-steak-more',
    type: 'New Brand',
    brandId: 'steak-more',
    brandName: 'The Steak & More',
    partnerId: 'minor-food-group',
    partnerName: 'Minor Food Group',
    country: 'thailand',
    announcedDate: '2025-01-01',
    status: 'planned',
    description: '가성비 스테이크 하우스 브랜드 The Steak & More 런칭 예정. 태국 내수 및 해외 확장',
    source: 'Market Intelligence'
  }
]

export const recentNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'BHC 치킨, 인도네시아 진출 확정',
    source: 'F&B Weekly',
    publishedAt: '2024-12-15',
    url: '#',
    summary: 'BHC 치킨이 Nachindo와의 마스터 프랜차이즈 계약을 통해 인도네시아 시장 진출을 확정했습니다.',
    tags: ['chicken', 'indonesia', 'MF'],
    dealType: 'MF',
    companies: ['nachindo']
  },
  {
    id: 'news-2',
    title: 'Jollibee의 컴포즈커피 인수, 동남아 저가 커피 시장 경쟁 심화 예고',
    source: 'Market Intelligence',
    publishedAt: '2024-06-10',
    url: '#',
    summary: 'Jollibee의 컴포즈커피 인수는 동남아 저가 커피 시장의 경쟁 심화를 예고합니다.',
    tags: ['coffee', 'philippines', 'M&A'],
    dealType: 'M&A',
    companies: ['jollibee']
  },
  {
    id: 'news-3',
    title: 'Lippo Malls, 유상증자로 자본 확충... F&B 테넌트 유치 적극화',
    source: 'Real Estate News',
    publishedAt: '2024-11-20',
    url: '#',
    summary: 'Lippo Malls Indonesia Retail Trust(LMIRT)가 유상증자를 통해 자본을 확충하며 몰 내 공실을 채울 강력한 F&B 콘텐츠를 필요로 함',
    tags: ['indonesia', 'real-estate', 'expansion'],
    companies: ['lippo-group']
  },
  {
    id: 'news-4',
    title: 'Golden Gate Group, The Coffee House 99.98% 지분 인수 완료',
    source: 'Market Intelligence',
    publishedAt: '2025-01-15',
    url: '#',
    summary: '베트남 Golden Gate Group이 커피 체인 The Coffee House를 약 $10.5M에 인수하여 커피 시장 점유율 확대',
    tags: ['vietnam', 'coffee', 'M&A'],
    dealType: 'M&A',
    companies: ['golden-gate-group']
  },
  {
    id: 'news-5',
    title: "Maxim's, Shake Shack 베트남/태국 확장 가속화",
    source: 'Market Intelligence',
    publishedAt: '2025-01-10',
    url: '#',
    summary: 'Maxim\'s Caterers가 Shake Shack을 베트남(2026년 첫 오픈, 2035년까지 15개점) 및 태국에 확장',
    tags: ['hong-kong', 'vietnam', 'thailand', 'expansion'],
    dealType: 'expansion',
    companies: ['maxims-caterers']
  },
  {
    id: 'news-6',
    title: 'Berjaya Food, Paris Baguette 태국/브루나이 진출',
    source: 'Market Intelligence',
    publishedAt: '2024-12-20',
    url: '#',
    summary: 'Berjaya Food가 SPC그룹과 파트너십을 맺고 Paris Baguette를 태국과 브루나이 시장에 진출',
    tags: ['malaysia', 'thailand', 'MF'],
    dealType: 'MF',
    companies: ['berjaya-food']
  }
]

export function getCompaniesByCountry(country: Country): Company[] {
  return companies.filter(c => c.country === country)
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id)
}

export function getBrandsByCategory(category: string, country?: Country): Brand[] {
  const allBrands: Brand[] = []
  companies.forEach(company => {
    if (!country || company.country === country) {
      company.brands.forEach(brand => {
        if (brand.category === category) {
          allBrands.push(brand)
        }
      })
    }
  })
  return allBrands
}


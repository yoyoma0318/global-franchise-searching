# Project Structure

## Overview

This is a Next.js 14 application for the **Global F&B Partner Connect** platform, featuring Firebase integration, Google Maps, and real-time data updates.

## Directory Structure

```
global-franchise-searching/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── Header.tsx               # ✨ NEW - Page header component
│   ├── Sidebar.tsx              # ✨ NEW - Sidebar wrapper
│   ├── CompanyList.tsx          # ✨ NEW - Company list view
│   ├── Dashboard.tsx            # Original dashboard (static data)
│   ├── DashboardFirebase.tsx    # ✨ NEW - Dashboard with Firebase
│   ├── MapView.tsx              # Google Maps integration
│   ├── CompanyProfile.tsx       # Company detail view
│   ├── BrandPortfolio.tsx       # Brand portfolio display
│   ├── NewsFeed.tsx             # News feed component
│   ├── CategoryChart.tsx        # Category analytics
│   ├── FilterPanel.tsx          # Filter controls
│   └── utils.ts                 # Utility functions
├── hooks/                        # ✨ NEW - Custom React hooks
│   ├── index.ts                 # Hook exports
│   └── useCompanies.ts          # Firebase companies hook
├── lib/                          # Libraries and utilities
│   ├── firebase.ts              # ✨ NEW - Firebase configuration
│   └── data.ts                  # Static data (for development)
├── types/                        # TypeScript type definitions
│   ├── index.ts                 # Core types (Company, Brand, etc.)
│   └── google-maps.d.ts         # Google Maps types
├── public/                       # Static assets
├── .env.local                    # ✨ UPDATED - Environment variables
├── FIREBASE_SETUP.md            # ✨ NEW - Firebase setup guide
├── PROJECT_STRUCTURE.md         # ✨ NEW - This file
├── package.json                 # Dependencies
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Key Components

### 🎯 Core Components

| Component | File | Purpose |
|-----------|------|---------|
| **Header** | `components/Header.tsx` | Page header with title and subtitle |
| **Sidebar** | `components/Sidebar.tsx` | Sidebar container component |
| **Dashboard** | `components/Dashboard.tsx` | Main dashboard (static data) |
| **DashboardFirebase** | `components/DashboardFirebase.tsx` | Main dashboard (Firebase data) |
| **MapView** | `components/MapView.tsx` | Google Maps integration |
| **CompanyList** | `components/CompanyList.tsx` | List view of companies |
| **CompanyProfile** | `components/CompanyProfile.tsx` | Detailed company information |
| **BrandPortfolio** | `components/BrandPortfolio.tsx` | Brand portfolio display |
| **FilterPanel** | `components/FilterPanel.tsx` | Search and filter controls |
| **NewsFeed** | `components/NewsFeed.tsx` | Industry news feed |
| **CategoryChart** | `components/CategoryChart.tsx` | Category analytics charts |

### 🪝 Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| **useCompanies** | `hooks/useCompanies.ts` | Fetch companies from Firebase with filters |
| **useCompany** | `hooks/useCompanies.ts` | Fetch single company by ID |

### 📚 Libraries

| Library | File | Purpose |
|---------|------|---------|
| **Firebase** | `lib/firebase.ts` | Firebase initialization and exports |
| **Data** | `lib/data.ts` | Static data for development |

## Technology Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

### Data & Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (ready to use)
- **Storage**: Firebase Storage (ready to use)

### UI & Maps
- **Maps**: Google Maps JavaScript API
- **Charts**: Recharts
- **Icons**: Lucide React

### Development
- **Package Manager**: npm
- **Node Version**: 18.x
- **Linting**: ESLint

## Environment Variables

Required variables in `.env.local`:

```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Data Flow

### Static Data Flow (Development)
```
lib/data.ts → Dashboard.tsx → Components
```

### Firebase Data Flow (Production)
```
Firestore → useCompanies hook → DashboardFirebase.tsx → Components
```

## Component Architecture

### Dashboard Composition

```
DashboardFirebase
├── Header
├── Grid Layout
│   ├── Sidebar
│   │   └── FilterPanel
│   ├── MapView
│   └── Info Panels
│       ├── CompanyProfile
│       └── BrandPortfolio
└── Bottom Row
    ├── NewsFeed
    └── CategoryChart
```

## Type System

Core types defined in `types/index.ts`:

- **Company**: Main company entity
- **Brand**: Brand information
- **NewsItem**: News article
- **Deal**: Business deal/transaction
- **FilterState**: Filter configuration
- **MapViewState**: Map state management

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.local` and add your API keys

### 3. Choose Data Source

**Option A: Static Data (Quick Start)**
```tsx
// app/page.tsx
import Dashboard from '@/components/Dashboard'
```

**Option B: Firebase Data (Production)**
```tsx
// app/page.tsx
import Dashboard from '@/components/DashboardFirebase'
```

### 4. Run Development Server
```bash
npm run dev
```

## Firebase Setup

Follow the detailed guide in `FIREBASE_SETUP.md` to:
1. Create a Firebase project
2. Set up Firestore database
3. Configure security rules
4. Migrate data
5. Enable authentication (optional)

## Future Enhancements

- [ ] User authentication system
- [ ] Admin panel for data management
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Export functionality (PDF, Excel)
- [ ] Multi-language support
- [ ] Mobile responsive optimization
- [ ] PWA features

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Notes

- All Firebase-related components have "Firebase" suffix
- Components are modular and can be used independently
- The project supports both static and real-time data
- Map markers are automatically generated from company locations
- Charts update based on selected country/region

## Support

For issues or questions:
- Check `FIREBASE_SETUP.md` for Firebase configuration
- Review `types/index.ts` for data structures
- Examine `hooks/useCompanies.ts` for data fetching logic

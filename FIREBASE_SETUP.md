# Firebase Setup Guide

This guide will help you set up Firebase for the Global F&B Partner Connect platform.

## Prerequisites

- A Google account
- Node.js 18.x or higher installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., `global-fb-partner-connect`)
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project, click the **web icon** (</>) to add a web app
2. Give your app a nickname (e.g., `Global F&B Web App`)
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**

## Step 3: Get Your Firebase Config

After registering your app, you'll see a config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 4: Update Your .env.local File

Copy the values from your Firebase config and paste them into your `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **"Build" > "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll update rules later)
4. Select a location (choose one closest to your users)
5. Click **"Enable"**

## Step 6: Configure Firestore Security Rules

1. Go to **"Firestore Database" > "Rules"**
2. For development, you can use these relaxed rules (⚠️ **Change for production!**):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 7: Set Up Firestore Data Structure

Create a `companies` collection with the following structure:

### Collection: `companies`

Each document should have these fields:

```json
{
  "id": "string",
  "name": "string",
  "nameLocal": "string (optional)",
  "country": "string (indonesia|malaysia|hong-kong|philippines|singapore|thailand|vietnam|taiwan)",
  "city": "string (optional)",
  "headquarters": {
    "lat": "number",
    "lng": "number"
  },
  "revenue": "number (optional)",
  "marketCap": "number (optional)",
  "isPublic": "boolean",
  "stockSymbol": "string (optional)",
  "description": "string",
  "website": "string (optional)",
  "logo": "string (optional)",
  "brands": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "operator": "string",
      "storeCount": "number (optional)",
      "logo": "string (optional)",
      "description": "string (optional)",
      "marketPosition": "string (leader|challenger|niche, optional)"
    }
  ],
  "recentNews": [
    {
      "id": "string",
      "title": "string",
      "source": "string",
      "publishedAt": "string",
      "url": "string",
      "summary": "string (optional)",
      "tags": ["array of strings"],
      "dealType": "string (MF|JV|M&A|expansion, optional)",
      "companies": ["array of company IDs, optional"]
    }
  ],
  "contactInfo": {
    "email": "string (optional)",
    "linkedin": "string (optional)",
    "phone": "string (optional)",
    "decisionMakers": [
      {
        "name": "string",
        "title": "string",
        "email": "string (optional)",
        "linkedin": "string (optional)"
      }
    ]
  },
  "portfolio": [
    {
      "brandId": "string",
      "brandName": "string",
      "storeCount": "number",
      "launchDate": "string (optional)",
      "status": "string (active|planned|closed)"
    }
  ]
}
```

## Step 8: Optional - Set Up Firebase Authentication

If you want to add user authentication later:

1. Go to **"Build" > "Authentication"**
2. Click **"Get started"**
3. Enable sign-in methods (Email/Password, Google, etc.)

## Step 9: Migrate Existing Data

If you have existing data in `lib/data.ts`, you can migrate it to Firestore:

1. Go to Firestore Console
2. Manually add documents, or
3. Use the Firebase Admin SDK to bulk import data

## Step 10: Test Your Setup

1. Make sure your `.env.local` is configured
2. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```
3. The app should now connect to Firebase!

## Switching Between Static and Firebase Data

The project includes two Dashboard components:

- **`Dashboard.tsx`** - Uses static data from `lib/data.ts` (for development)
- **`DashboardFirebase.tsx`** - Uses Firebase data via `useCompanies` hook

To switch to Firebase, update `app/page.tsx`:

```tsx
// From:
import Dashboard from '@/components/Dashboard'

// To:
import Dashboard from '@/components/DashboardFirebase'
```

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your API key in `.env.local` is correct
- Make sure environment variables start with `NEXT_PUBLIC_`

### "Missing or insufficient permissions"
- Update your Firestore security rules
- Make sure you're authenticated if rules require it

### Data not loading
- Check browser console for errors
- Verify Firestore has data in the `companies` collection
- Check that collection and field names match exactly

## Next Steps

- [ ] Set up Firebase Authentication
- [ ] Create admin panel to manage companies
- [ ] Set up Cloud Functions for data processing
- [ ] Enable Firebase Hosting for deployment
- [ ] Set up Firebase Storage for logo uploads

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Get Started](https://firebase.google.com/docs/firestore/quickstart)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

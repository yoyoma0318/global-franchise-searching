#!/usr/bin/env python3
"""
Company Data Collector for Global Franchise Searching
Continuously collects franchise and restaurant data from multiple cities using Google Places API
"""

import googlemaps
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os
import time
import schedule
from typing import List, Dict
import random
import sys
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

# Target cities for data collection
TARGET_CITIES = [
    'Seoul',
    'Tokyo',
    'Singapore',
    'Bangkok',
    'Ho Chi Minh',
    'Manila',
    'Jakarta',
    'Kuala Lumpur',
    'New York',
    'London'
]

# Search keywords
SEARCH_KEYWORDS = [
    'Top Rated Franchise',
    'Restaurant Group HQ',
    'Popular Coffee Chain',
    'Best Bakery Chain',
    'Famous Fast Food Chain',
    'International Restaurant Brand',
    'Food Franchise Company',
    'Global F&B Company'
]

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized"""
    if not firebase_admin._apps:
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        project_id = os.getenv('NEXT_PUBLIC_FIREBASE_PROJECT_ID') or os.getenv('FIREBASE_PROJECT_ID')
        
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'projectId': project_id
            })
        else:
            # Try to use Application Default Credentials
            try:
                if project_id:
                    cred = credentials.ApplicationDefault()
                    firebase_admin.initialize_app(cred, {
                        'projectId': project_id
                    })
                else:
                    raise ValueError("Firebase project ID not found. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or FIREBASE_PROJECT_ID in .env.local")
            except Exception as e:
                print(f"\n❌ Firebase 인증 설정 필요:")
                print(f"   1. Firebase Console에서 서비스 계정 키 파일을 다운로드하세요")
                print(f"   2. 환경 변수 GOOGLE_APPLICATION_CREDENTIALS에 파일 경로를 설정하세요")
                print(f"   3. 또는 Application Default Credentials를 설정하세요")
                print(f"   에러: {str(e)}\n")
                raise

    return firestore.client()

# Initialize Google Maps client
def initialize_google_maps():
    """Initialize Google Maps API client"""
    api_key = os.getenv('GOOGLE_MAPS_API_KEY') or os.getenv('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_MAPS_API_KEY or NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable not set. Set it in .env.local")

    return googlemaps.Client(key=api_key)

def normalize_company_name(name):
    """Normalize company name for duplicate checking"""
    # Remove common suffixes and convert to lowercase
    normalized = name.lower()
    suffixes = [' inc', ' ltd', ' llc', ' corporation', ' corp', ' co.', ' restaurant', ' cafe', ' coffee']
    for suffix in suffixes:
        normalized = normalized.replace(suffix, '')
    return normalized.strip()

def check_company_exists(db, company_name):
    """Check if company already exists in database"""
    normalized_name = normalize_company_name(company_name)

    # Query companies collection
    companies_ref = db.collection('companies')
    query = companies_ref.where('normalized_name', '==', normalized_name).limit(1)
    results = query.get()

    return len(list(results)) > 0

def extract_company_data(place, city):
    """Extract and structure company data from Google Places result"""
    try:
        # Basic information
        company_data = {
            'name': place.get('name', ''),
            'normalized_name': normalize_company_name(place.get('name', '')),
            'place_id': place.get('place_id', ''),
            'address': place.get('formatted_address', ''),
            'city': city,
            'rating': place.get('rating'),
            'user_ratings_total': place.get('user_ratings_total', 0),
            'types': place.get('types', []),
            'collected_at': datetime.now(),
            'source': 'google_places',
            'status': 'pending_verification'
        }

        # Location data
        if 'geometry' in place:
            location = place['geometry'].get('location', {})
            company_data['headquarters'] = {
                'lat': location.get('lat', 0),
                'lng': location.get('lng', 0)
            }

        # Contact information
        if 'formatted_phone_number' in place:
            company_data['phone'] = place['formatted_phone_number']

        if 'website' in place:
            company_data['website'] = place['website']

        # Business status
        if 'business_status' in place:
            company_data['business_status'] = place['business_status']

        # Opening hours
        if 'opening_hours' in place:
            company_data['is_open'] = place['opening_hours'].get('open_now', False)

        # Price level
        if 'price_level' in place:
            company_data['price_level'] = place['price_level']

        return company_data

    except Exception as e:
        print(f"      ❌ 데이터 추출 에러: {str(e)}")
        return None

def collect_from_city_keyword(gmaps, db, city, keyword):
    """Collect companies for a specific city and keyword"""
    print(f"  🔍 수집 중... [{city}] - '{keyword}'")

    try:
        # Search for places
        query = f"{keyword} in {city}"
        places_result = gmaps.places(query=query, type='restaurant')

        if not places_result.get('results'):
            print(f"     ⚠️  결과 없음")
            return 0

        collected_count = 0
        skipped_count = 0

        for place in places_result['results']:
            try:
                company_name = place.get('name', '')

                # Check if company already exists
                if check_company_exists(db, company_name):
                    skipped_count += 1
                    continue

                # Get detailed place information
                place_id = place.get('place_id')
                place_details = gmaps.place(place_id=place_id, fields=[
                    'name', 'formatted_address', 'formatted_phone_number',
                    'website', 'rating', 'user_ratings_total', 'geometry',
                    'type', 'business_status', 'opening_hours', 'price_level'
                ])

                if place_details.get('status') != 'OK':
                    continue

                detailed_place = place_details.get('result', {})
                
                # Add types from original search result (not available in place details fields)
                if 'types' in place:
                    detailed_place['types'] = place.get('types', [])

                # Extract company data
                company_data = extract_company_data(detailed_place, city)

                if company_data:
                    # Save to Firestore
                    db.collection('companies').add(company_data)
                    collected_count += 1
                    print(f"     ✅ {company_name}")

                # Rate limiting
                time.sleep(0.5)

            except Exception as e:
                print(f"     ❌ 에러 (항목 처리): {str(e)}")
                continue

        print(f"     📊 {collected_count}개 수집, {skipped_count}개 스킵\n")
        return collected_count

    except Exception as e:
        print(f"     ❌ 에러: {str(e)}\n")
        return 0

def collect_data_cycle():
    """Run one complete data collection cycle"""
    print("\n" + "=" * 70)
    print(f"🚀 데이터 수집 사이클 시작 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    try:
        # Initialize services
        db = initialize_firebase()
        gmaps = initialize_google_maps()

        # Randomly select a city and keyword to vary collection
        city = random.choice(TARGET_CITIES)
        keyword = random.choice(SEARCH_KEYWORDS)

        print(f"\n🌍 대상: {city}")
        print(f"🔑 키워드: {keyword}\n")

        # Collect data
        total_collected = collect_from_city_keyword(gmaps, db, city, keyword)

        print("=" * 70)
        print(f"✅ 사이클 완료! {total_collected}개의 기업 데이터 수집")
        print("=" * 70)

        return total_collected

    except Exception as e:
        print(f"\n❌ 사이클 에러: {str(e)}")
        import traceback
        traceback.print_exc()
        return 0

def run_full_scan():
    """Run a full scan of all cities and keywords"""
    print("\n" + "=" * 70)
    print("🌐 전체 스캔 모드 시작")
    print("=" * 70)

    try:
        db = initialize_firebase()
        gmaps = initialize_google_maps()

        total_collected = 0

        for city in TARGET_CITIES:
            print(f"\n📍 도시: {city}")
            for keyword in SEARCH_KEYWORDS:
                collected = collect_from_city_keyword(gmaps, db, city, keyword)
                total_collected += collected
                time.sleep(2)  # Rate limiting between requests

        print("\n" + "=" * 70)
        print(f"✅ 전체 스캔 완료! 총 {total_collected}개의 기업 데이터 수집")
        print("=" * 70)

        return total_collected

    except Exception as e:
        print(f"\n❌ 전체 스캔 에러: {str(e)}")
        import traceback
        traceback.print_exc()
        return 0

def main():
    """Main function - continuous collection mode"""
    print("\n" + "🎯" * 35)
    print("  Global Franchise Data Collector")
    print("🎯" * 35)
    
    # Check for command line argument
    if len(sys.argv) > 1:
        mode = sys.argv[1].strip()
    else:
        print("\n모드 선택:")
        print("  1. 연속 수집 모드 (10분마다 자동 실행)")
        print("  2. 전체 스캔 모드 (모든 도시/키워드 1회 실행)")
        print("  3. 단일 실행 (1회만 실행)")
        try:
            mode = input("\n선택 (1/2/3): ").strip()
        except EOFError:
            # Default to single run mode if no input available
            print("\n입력 없음, 기본값으로 단일 실행 모드 선택")
            mode = "3"

    try:
        if mode == "1":
            # Continuous collection mode
            print("\n🔄 연속 수집 모드 시작 (10분 간격)")
            print("   중단하려면 Ctrl+C를 누르세요\n")

            # Run immediately
            collect_data_cycle()

            # Schedule every 10 minutes
            schedule.every(10).minutes.do(collect_data_cycle)

            # Continuous loop
            while True:
                schedule.run_pending()
                time.sleep(1)

        elif mode == "2":
            # Full scan mode
            print("\n🌐 전체 스캔 모드 실행 중...\n")
            run_full_scan()

        else:
            # Single run mode
            print("\n▶️  단일 실행 모드\n")
            collect_data_cycle()

    except KeyboardInterrupt:
        print("\n\n⚠️  사용자에 의해 중단됨")
        print("👋 수집기 종료\n")
    except Exception as e:
        print(f"\n❌ 에러 발생: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

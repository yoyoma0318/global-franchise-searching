#!/usr/bin/env python3
"""
News Collector for Global Franchise Searching
Collects news from Google News RSS feeds and stores in Firestore
"""

import feedparser
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from urllib.parse import quote
import os
import time
import hashlib
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized"""
    if not firebase_admin._apps:
        # Get credentials from environment or use default
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        project_id = os.getenv('NEXT_PUBLIC_FIREBASE_PROJECT_ID') or os.getenv('FIREBASE_PROJECT_ID')

        if cred_path and os.path.exists(cred_path):
            print(f"✓ Firebase 인증 파일 발견: {cred_path}")
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'projectId': project_id
            })
        else:
            print("⚠️  GOOGLE_APPLICATION_CREDENTIALS not set, using Application Default Credentials")
            if project_id:
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred, {
                    'projectId': project_id
                })
            else:
                raise ValueError("Firebase project ID not found. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local")

    return firestore.client()

# RSS Feed URLs for Google News
NEWS_TOPICS = [
    {
        'name': 'Restaurant Industry Asia',
        'url': 'https://news.google.com/rss/search?q=Restaurant+Industry+Asia&hl=en-US&gl=US&ceid=US:en'
    },
    {
        'name': 'F&B Franchise Expansion',
        'url': 'https://news.google.com/rss/search?q=F%26B+Franchise+Expansion&hl=en-US&gl=US&ceid=US:en'
    },
    {
        'name': 'Restaurant M&A Asia',
        'url': 'https://news.google.com/rss/search?q=Restaurant+M%26A+Asia&hl=en-US&gl=US&ceid=US:en'
    }
]

def generate_article_id(link):
    """Generate unique ID from article link"""
    return hashlib.md5(link.encode()).hexdigest()

def parse_published_date(date_string):
    """Parse published date from RSS feed"""
    try:
        from email.utils import parsedate_to_datetime
        return parsedate_to_datetime(date_string)
    except:
        return datetime.now()

def collect_news_from_topic(db, topic_name, rss_url):
    """Collect news from a specific RSS feed"""
    print(f"\n🔍 수집 시작... 토픽: '{topic_name}'")
    print(f"   RSS: {rss_url}")

    try:
        # Parse RSS feed
        feed = feedparser.parse(rss_url)

        if not feed.entries:
            print(f"   ⚠️  뉴스 없음")
            return 0

        collected_count = 0
        skipped_count = 0

        # Get reference to market_intel collection
        market_intel_ref = db.collection('market_intel')

        for entry in feed.entries:
            try:
                # Generate unique article ID
                article_id = generate_article_id(entry.link)

                # Check if article already exists
                doc_ref = market_intel_ref.document(article_id)
                doc = doc_ref.get()

                if doc.exists:
                    skipped_count += 1
                    continue

                # Parse published date
                published_at = parse_published_date(entry.published if hasattr(entry, 'published') else None)

                # Extract source from link (domain name)
                from urllib.parse import urlparse
                source = urlparse(entry.link).netloc.replace('www.', '').replace('news.google.com', 'Google News')

                # Get summary
                summary = entry.summary if hasattr(entry, 'summary') else entry.title[:200]

                # Prepare document data
                article_data = {
                    'title': entry.title,
                    'link': entry.link,
                    'source': source,
                    'published_at': published_at,
                    'summary': summary,
                    'topic': topic_name,
                    'collected_at': datetime.now(),
                    'type': 'news'
                }

                # Save to Firestore
                doc_ref.set(article_data)
                collected_count += 1

                print(f"   ✅ 뉴스 [{entry.title[:60]}...] 저장 완료")

            except Exception as e:
                print(f"   ❌ 에러 (항목 처리): {str(e)}")
                continue

        print(f"   📊 완료: {collected_count}개 수집, {skipped_count}개 스킵")
        return collected_count

    except Exception as e:
        print(f"   ❌ 에러 (토픽 '{topic_name}'): {str(e)}")
        return 0

def collect_all_news():
    """Collect news from all topics"""
    print("\n" + "=" * 70)
    print("🚀 뉴스 수집기 시작")
    print("=" * 70)

    # Initialize Firebase
    print("\n📡 Firebase 연결 중...")
    db = initialize_firebase()
    print("✓ Firebase 연결 완료\n")

    total_collected = 0

    for topic in NEWS_TOPICS:
        collected = collect_news_from_topic(db, topic['name'], topic['url'])
        total_collected += collected
        time.sleep(2)  # Rate limiting

    print("\n" + "=" * 70)
    print(f"✅ 전체 수집 완료! 총 {total_collected}개의 뉴스가 market_intel 컬렉션에 저장됨")
    print("=" * 70 + "\n")

    return total_collected

def main():
    """Main function"""
    try:
        collect_all_news()
    except KeyboardInterrupt:
        print("\n\n⚠️  사용자에 의해 중단됨")
    except Exception as e:
        print(f"\n❌ 에러 발생: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

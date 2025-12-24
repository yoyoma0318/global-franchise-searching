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

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK if not already initialized"""
    if not firebase_admin._apps:
        # Get credentials from environment or use default
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
        else:
            # Use default credentials (for deployed environments)
            cred = credentials.ApplicationDefault()

        firebase_admin.initialize_app(cred)

    return firestore.client()

# RSS Feed URLs for Google News
NEWS_KEYWORDS = [
    'F&B Franchise Expansion Asia',
    'Restaurant M&A',
    'K-Food Global',
    'Coffee Chain Expansion',
    'Quick Service Restaurant Asia',
    'Food Franchise Investment'
]

def get_google_news_rss_url(keyword):
    """Generate Google News RSS feed URL for a keyword"""
    encoded_keyword = quote(keyword)
    return f"https://news.google.com/rss/search?q={encoded_keyword}&hl=en-US&gl=US&ceid=US:en"

def generate_article_id(link):
    """Generate unique ID from article link"""
    return hashlib.md5(link.encode()).hexdigest()

def parse_published_date(date_string):
    """Parse published date from RSS feed"""
    try:
        # Try parsing common date formats
        from email.utils import parsedate_to_datetime
        return parsedate_to_datetime(date_string)
    except:
        return datetime.now()

def collect_news_from_keyword(db, keyword):
    """Collect news for a specific keyword"""
    print(f"🔍 수집 중... 키워드: '{keyword}'")

    try:
        # Get RSS feed
        rss_url = get_google_news_rss_url(keyword)
        feed = feedparser.parse(rss_url)

        if not feed.entries:
            print(f"   ⚠️  뉴스 없음: {keyword}")
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
                source = urlparse(entry.link).netloc.replace('www.', '')

                # Get summary (use description or first 200 chars of title)
                summary = entry.summary if hasattr(entry, 'summary') else entry.title[:200]

                # Prepare document data
                article_data = {
                    'title': entry.title,
                    'link': entry.link,
                    'published_at': published_at,
                    'source': source,
                    'summary': summary,
                    'keyword': keyword,
                    'collected_at': datetime.now(),
                    'type': 'news'
                }

                # Save to Firestore
                doc_ref.set(article_data)
                collected_count += 1

                print(f"   ✅ [{source}] {entry.title[:50]}...")

            except Exception as e:
                print(f"   ❌ 에러 (항목 처리): {str(e)}")
                continue

        print(f"   📊 완료: {collected_count}개 수집, {skipped_count}개 스킵\n")
        return collected_count

    except Exception as e:
        print(f"   ❌ 에러 (키워드 '{keyword}'): {str(e)}\n")
        return 0

def collect_all_news():
    """Collect news from all keywords"""
    print("=" * 60)
    print("🚀 뉴스 수집 시작")
    print("=" * 60)

    # Initialize Firebase
    db = initialize_firebase()

    total_collected = 0

    for keyword in NEWS_KEYWORDS:
        collected = collect_news_from_keyword(db, keyword)
        total_collected += collected
        time.sleep(2)  # Be nice to Google News servers

    print("=" * 60)
    print(f"✅ 수집 완료! 총 {total_collected}개의 뉴스 수집됨")
    print("=" * 60)

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

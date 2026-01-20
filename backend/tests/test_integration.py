import pytest
from app.services.fetcher import fetch_article
from app.services.processor import clean_text, tokenize_and_filter
from app.services.analyzer import analyze_keywords

@pytest.mark.asyncio
async def test_full_pipeline_with_real_article():
    url = "https://en.wikipedia.org/wiki/Machine_learning"
    
    article = await fetch_article(url)
    assert article["title"]
    assert len(article["text"]) > 100
    
    cleaned = clean_text(article["text"])
    tokens = tokenize_and_filter(cleaned)
    words = analyze_keywords(" ".join(tokens))
    
    assert len(words) > 0
    assert any("learning" in w["text"] or "machine" in w["text"] for w in words)

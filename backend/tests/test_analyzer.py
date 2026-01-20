import pytest
from app.services.analyzer import analyze_keywords

def test_analyzer_returns_words_with_weights():
    text = "technology innovation technology future innovation"
    words = analyze_keywords(text, max_words=10)
    
    assert len(words) > 0
    assert all("text" in w and "weight" in w for w in words)

def test_analyzer_normalizes_weights():
    text = "machine learning artificial intelligence data science"
    words = analyze_keywords(text)
    
    weights = [w["weight"] for w in words]
    assert all(0 <= w <= 1 for w in weights)
    assert max(weights) == 1.0

def test_analyzer_sorts_by_weight():
    text = "python python python java javascript"
    words = analyze_keywords(text)
    
    weights = [w["weight"] for w in words]
    assert weights == sorted(weights, reverse=True)

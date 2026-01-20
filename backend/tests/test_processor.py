import pytest
from app.services.processor import clean_text, tokenize_and_filter

def test_clean_text_removes_urls():
    text = "Check out https://example.com for more info"
    clean = clean_text(text)
    assert "https" not in clean
    assert "example" not in clean
    assert "check" in clean

def test_clean_text_removes_special_chars():
    text = "Hello! How are you? I'm fine... #testing"
    clean = clean_text(text)
    assert "hello" in clean
    assert "!" not in clean
    assert "#" not in clean

def test_tokenize_filters_stopwords():
    text = "the quick brown fox jumps over the lazy dog"
    tokens = tokenize_and_filter(text)
    assert "the" not in tokens
    assert "quick" in tokens or "brown" in tokens
    assert len(tokens) < 9

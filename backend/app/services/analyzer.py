from sklearn.feature_extraction.text import TfidfVectorizer
from app.config import MAX_WORDS

def analyze_keywords(text: str, max_words: int = MAX_WORDS) -> list[dict]:
    vectorizer = TfidfVectorizer(
        max_features=max_words,
        stop_words='english',
        ngram_range=(1, 2)
    )
    
    tfidf = vectorizer.fit_transform([text])
    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf.toarray()[0]
    
    words = [
        {"text": word, "weight": float(score)}
        for word, score in zip(feature_names, scores)
        if score > 0
    ]
    
    if words:
        max_weight = max(w["weight"] for w in words)
        for word in words:
            word["weight"] = word["weight"] / max_weight
    
    return sorted(words, key=lambda x: x["weight"], reverse=True)

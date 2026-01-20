import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from app.config import MAX_ARTICLE_LENGTH, MIN_WORD_LENGTH

def clean_text(text: str) -> str:
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.lower().strip()

def tokenize_and_filter(text: str) -> list[str]:
    text = text[:MAX_ARTICLE_LENGTH]
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    
    return [lemmatizer.lemmatize(word) for word in tokens 
            if word not in stop_words and len(word) >= MIN_WORD_LENGTH]

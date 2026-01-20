MAX_WORDS = 50
MIN_WORD_LENGTH = 3
MAX_ARTICLE_LENGTH = 5000

ARTICLE_TIMEOUT = 15
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# CORS origins for production and local development
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://threed-word-cloud-noah.onrender.com",
]

# Allow local network IPs (192.168.x.x, 10.x.x.x, etc.)
ALLOW_LOCAL_NETWORK = True

TFIDF_NGRAM_RANGE = (1, 2)

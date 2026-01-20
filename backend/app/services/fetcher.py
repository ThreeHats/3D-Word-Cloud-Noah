from newspaper import Article

async def fetch_article(url: str) -> dict:
    try:
        article = Article(url)
        article.download()
        article.parse()
        
        if not article.text:
            raise ValueError(f"Couldn't extract text from {url}")
        
        return {
            "title": article.title or "Untitled",
            "text": article.text,
            "url": url
        }
    except Exception as e:
        raise ValueError(f"Failed to fetch article: {str(e)}")

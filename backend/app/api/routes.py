from fastapi import APIRouter, HTTPException
from app.api.models import AnalyzeRequest, AnalyzeResponse, HealthResponse
from app.services.fetcher import fetch_article
from app.services.processor import clean_text, tokenize_and_filter
from app.services.analyzer import analyze_keywords

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health():
    return {"status": "healthy", "version": "1.0.0"}

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    try:
        article = await fetch_article(str(request.url))
        cleaned = clean_text(article["text"])
        tokens = tokenize_and_filter(cleaned)
        text = " ".join(tokens)
        words = analyze_keywords(text)
        
        return {
            "status": "success",
            "data": {
                "title": article["title"],
                "words": words
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

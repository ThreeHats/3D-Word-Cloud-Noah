from fastapi import APIRouter, HTTPException
from app.api.models import AnalyzeRequest, AnalyzeResponse, HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health():
    return {"status": "healthy", "version": "1.0.0"}

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    # TODO: Implement in next commit
    return {
        "status": "success",
        "data": {
            "title": "Sample Article",
            "url": request.url,
            "words": [
                {"text": "sample", "weight": 0.95},
                {"text": "word", "weight": 0.87}
            ]
        }
    }

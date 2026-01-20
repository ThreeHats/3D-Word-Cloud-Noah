from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    url: str

class Word(BaseModel):
    text: str
    weight: float

class ArticleData(BaseModel):
    title: str
    words: list[Word]

class AnalyzeResponse(BaseModel):
    status: str
    data: ArticleData

class HealthResponse(BaseModel):
    status: str
    version: str

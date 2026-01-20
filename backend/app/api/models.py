from pydantic import BaseModel, HttpUrl

class AnalyzeRequest(BaseModel):
    url: HttpUrl

class Word(BaseModel):
    text: str
    weight: float

class AnalyzeResponse(BaseModel):
    status: str
    data: dict

class HealthResponse(BaseModel):
    status: str
    version: str

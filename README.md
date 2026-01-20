# 3D Word Cloud

Visualize article topics in 3D space using NLP.

#### Live Demo

**[https://threed-word-cloud-noah.onrender.com](https://threed-word-cloud-noah.onrender.com)**

## Setup

Requires bash (Mac/Linux, or WSL/Git Bash on Windows).

```bash
./setup.sh
```

Frontend runs on http://localhost:5173, backend on :8000.

For subsequent runs:
```bash
./run.sh
```

Manual setup if needed:
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
pnpm install
pnpm run dev
```

## Usage

1. Open http://localhost:5173
2. Enter article URL or pick a featured article
3. Wait for analysis
4. Drag to rotate, scroll to zoom, hover for effects

## Features

- 3D word cloud using Fibonacci sphere layout
- TF-IDF keyword extraction
- Hover effects and smooth camera controls
- PNG export - download the visualization
- Embed - generates iframe with compressed URL data (stateless, no DB)
- URL bookmarking - share/bookmark word clouds via URL

## Tech Stack

- React + TypeScript + Vite
- React Three Fiber (3D rendering)
- FastAPI + CORS
- Scikit-learn (TF-IDF)
- Newspaper3k (article scraping)

## Tests

```bash
./test.sh
```

## API

**POST /analyze**
```json
{ "url": "https://bbc.com/news/article" }
```

Returns:
```json
{
  "status": "success",
  "data": {
    "title": "Article Title",
    "words": [
      { "text": "technology", "weight": 0.95 },
      { "text": "innovation", "weight": 0.87 }
    ]
  }
}
```

## License

MIT

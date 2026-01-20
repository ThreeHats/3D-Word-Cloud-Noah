#!/bin/bash

echo "Setting up 3D Word Cloud project..."
echo ""

# Backend setup
echo "Setting up backend..."
cd backend || exit 1

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo "Downloading NLTK data..."
python3 -c "import nltk; nltk.download('punkt', quiet=True); nltk.download('punkt_tab', quiet=True); nltk.download('stopwords', quiet=True); nltk.download('wordnet', quiet=True)"

cd ..

# Frontend setup
echo ""
echo "Setting up frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing pnpm dependencies..."
    pnpm install --silent
else
    echo "Dependencies already installed, skipping..."
fi

cd ..

echo ""
echo "Setup complete!"
echo ""
echo "Starting servers..."
echo "   Backend: http://localhost:8000"
echo "   Frontend: http://localhost:5173"
echo ""

# Start backend in background
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Start frontend
cd ../frontend
pnpm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT

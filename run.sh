#!/bin/bash

echo "Starting 3D Word Cloud servers..."
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

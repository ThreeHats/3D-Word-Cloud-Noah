#!/bin/bash

echo "Running backend tests..."
cd backend
source venv/bin/activate
pytest tests/ -v

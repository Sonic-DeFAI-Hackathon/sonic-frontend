#!/bin/bash
# Setup script for the Baultro demo

echo "Setting up Baultro Demo Frontend..."
echo "===================================="

# Make sure ZerePy is properly set up
cd /Users/pc/apps/MPC/hackathons/game/ZerePy

# Stop any running containers
echo "Stopping any running containers..."
docker-compose down
docker stop zerepy-together-api 2>/dev/null || true
docker rm zerepy-together-api 2>/dev/null || true

# Make sure we have a Together API key in env.txt
if [ ! -f env.txt ] || ! grep -q "TOGETHER_API_KEY" env.txt; then
    echo "Creating env.txt with mock Together API key..."
    echo "TOGETHER_API_KEY=mock-key" > env.txt
    echo "TOGETHER_MODEL=meta-llama/Llama-3-70b-chat-hf" >> env.txt
fi

# Start ZerePy API server
echo "Starting ZerePy API server..."
./run-api.sh &

# Wait for API to be ready
echo "Waiting for API to be ready..."
sleep 5

# Test if API is running
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ ZerePy API is running!"
else
    echo "❌ ZerePy API failed to start. Please check logs."
    exit 1
fi

# Return to frontend directory
cd /Users/pc/apps/MPC/hackathons/game/demo-frontend

# Set environment variables for Next.js
echo "NEXT_PUBLIC_ZEREPY_API_URL=http://localhost:8000" > .env.local

# Build the Next.js app
echo "Building Next.js app..."
npm run build

echo "✅ Setup complete!"
echo "You can now run the demo with: npm run start"
echo "The frontend will be available at: http://localhost:3000"

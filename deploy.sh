#!/bin/bash
# Quick Deployment Script for LowveldHub on Vercel

echo "🚀 LowveldHub Deployment Script"
echo "================================"

# Step 1: Verify node and npm
echo "✓ Checking Node.js and npm..."
node --version
npm --version

# Step 2: Install dependencies
echo "✓ Installing dependencies..."
npm install

# Step 3: Run build
echo "✓ Building for production..."
npm run build

# Check if build succeeded
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📊 Build Output:"
    du -sh dist/
    ls -lh dist/
    echo ""
    echo "📦 Next steps:"
    echo "1. Ensure GEMINI_API_KEY is set in Vercel environment variables"
    echo "2. Push to GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for Vercel deployment'"
    echo "   git push origin main"
    echo ""
    echo "3. Deploy to Vercel:"
    echo "   - Option A: Via Vercel CLI"
    echo "     vercel"
    echo ""
    echo "   - Option B: Via GitHub"
    echo "     https://vercel.com/new"
    echo ""
    echo "4. Set environment variable in Vercel Dashboard:"
    echo "   GEMINI_API_KEY = <your-key>"
    echo ""
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi

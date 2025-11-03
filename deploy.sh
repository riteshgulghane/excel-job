#!/bin/bash

# Deployment script for Netlify

echo "🚀 Starting deployment process..."
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
  echo "📦 Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit - Google Sheets CRUD app"
  echo "✅ Git initialized"
  echo ""
  echo "⚠️  Next steps:"
  echo "1. Create a repository on GitHub"
  echo "2. Run: git remote add origin <your-repo-url>"
  echo "3. Run: git push -u origin main"
  echo "4. Then run this script again"
  exit 0
fi

# Build the app
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "📦 Netlify CLI not found. Installing..."
  npm install -g netlify-cli
fi

echo "🌐 Deploying to Netlify..."
netlify deploy --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔐 IMPORTANT: Update Google OAuth settings"
echo "1. Get your Netlify URL from the output above"
echo "2. Go to: https://console.cloud.google.com/apis/credentials"
echo "3. Edit your OAuth 2.0 Client"
echo "4. Add your Netlify URL to:"
echo "   - Authorized JavaScript origins"
echo "   - Authorized redirect URIs"
echo "5. Click Save"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"

#!/bin/bash

# 🧪 Pre-commit Security Check Script
# Jalankan script ini sebelum commit untuk memastikan keamanan

echo "🔒 Running Security Check..."

# Check 1: Hardcoded API Keys
echo "📋 Checking for hardcoded API keys..."

# OpenRouter keys
OPENROUTER_KEYS=$(grep -r "sk-or-v1-" . --exclude-dir=node_modules --exclude=".env" --exclude="*.md" 2>/dev/null | wc -l)
if [ $OPENROUTER_KEYS -gt 0 ]; then
    echo "❌ Found hardcoded OpenRouter API keys!"
    grep -r "sk-or-v1-" . --exclude-dir=node_modules --exclude=".env" --exclude="*.md" 2>/dev/null
    exit 1
else
    echo "✅ No hardcoded OpenRouter keys found"
fi

# Hugging Face keys  
HF_KEYS=$(grep -r "hf_" . --exclude-dir=node_modules --exclude=".env" --exclude="*.md" 2>/dev/null | wc -l)
if [ $HF_KEYS -gt 0 ]; then
    echo "❌ Found hardcoded Hugging Face tokens!"
    grep -r "hf_" . --exclude-dir=node_modules --exclude=".env" --exclude="*.md" 2>/dev/null
    exit 1
else
    echo "✅ No hardcoded Hugging Face tokens found"
fi

# Check 2: .env files
echo "📁 Checking .env files..."
if git ls-files | grep -q "\.env$"; then
    echo "❌ .env file is tracked by git!"
    exit 1
else
    echo "✅ .env files are properly gitignored"
fi

# Check 3: Environment variable usage
echo "🔧 Checking environment variable usage..."
if grep -r "import.meta.env" frontend/src/ --include="*.js" --include="*.vue" > /dev/null; then
    echo "✅ Using environment variables in code"
else
    echo "⚠️  No environment variables found in code"
fi

echo "🎉 Security check passed! Safe to commit."
echo ""
echo "💡 Quick checklist before commit:"
echo "   ✅ API keys in .env file only"
echo "   ✅ Using import.meta.env in code"
echo "   ✅ .env.example updated"
echo "   ✅ No hardcoded credentials"
echo ""
echo "🚀 Ready to commit!"

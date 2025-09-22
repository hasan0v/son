#!/bin/bash

# Vercel Environment Variables Setup Script
echo "🚀 Setting up Vercel environment variables..."

# Read values from .env.local
if [ -f ".env.local" ]; then
    echo "📁 Reading from .env.local..."
    
    # Extract values (you'll need to run these commands manually in Vercel dashboard)
    DATABASE_URL=$(grep "DATABASE_URL=" .env.local | cut -d '=' -f2- | tr -d '"')
    JWT_SECRET=$(grep "JWT_SECRET=" .env.local | cut -d '=' -f2- | tr -d '"')
    EMAILJS_PUBLIC_KEY=$(grep "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=" .env.local | cut -d '=' -f2- | tr -d '"')
    EMAILJS_SERVICE_ID=$(grep "NEXT_PUBLIC_EMAILJS_SERVICE_ID=" .env.local | cut -d '=' -f2- | tr -d '"')
    EMAILJS_TEMPLATE_ID=$(grep "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=" .env.local | cut -d '=' -f2- | tr -d '"')
    EMAILJS_AUTO_REPLY_TEMPLATE_ID=$(grep "NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID=" .env.local | cut -d '=' -f2- | tr -d '"')
    ADMIN_SEED_EMAIL=$(grep "ADMIN_SEED_EMAIL=" .env.local | cut -d '=' -f2- | tr -d '"')
    ADMIN_SEED_PASSWORD=$(grep "ADMIN_SEED_PASSWORD=" .env.local | cut -d '=' -f2- | tr -d '"')

    echo ""
    echo "🔧 Add these environment variables in your Vercel dashboard:"
    echo "   👉 https://vercel.com/ali-hasanovs-projects/son/settings/environment-variables"
    echo ""
    echo "📋 Copy and paste these values:"
    echo ""
    echo "DATABASE_URL="
    echo "   For production, you need a PostgreSQL database"
    echo "   Recommended: Use Vercel Postgres or Neon.tech"
    echo ""
    echo "JWT_SECRET=$JWT_SECRET"
    echo ""
    echo "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=$EMAILJS_PUBLIC_KEY"
    echo ""
    echo "NEXT_PUBLIC_EMAILJS_SERVICE_ID=$EMAILJS_SERVICE_ID"
    echo ""
    echo "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=$EMAILJS_TEMPLATE_ID"
    echo ""
    echo "NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID=$EMAILJS_AUTO_REPLY_TEMPLATE_ID"
    echo ""
    echo "ADMIN_SEED_EMAIL=$ADMIN_SEED_EMAIL"
    echo ""
    echo "ADMIN_SEED_PASSWORD=$ADMIN_SEED_PASSWORD"
    echo ""
    echo "✅ After adding these variables, redeploy your project!"
    
else
    echo "❌ .env.local file not found!"
    echo "   Please make sure you're in the project directory"
fi
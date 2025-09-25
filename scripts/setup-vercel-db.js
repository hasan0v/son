#!/usr/bin/env node

// Production Database Setup Script for Vercel
require('dotenv').config({ path: '.env.local' })

const VERCEL_POSTGRES_URL = "postgres://9acd350145fa9a6ef663505ffb5f801a6e07f5d96cd0ff3ddee64b64bc5c2d47:sk_-m3b9NiC6J5AInQre9NDw@db.prisma.io:5432/postgres?sslmode=require"

console.log('🚀 Vercel PostgreSQL Database Setup')
console.log('=====================================')
console.log('')

console.log('📋 Environment Variables for Vercel Dashboard:')
console.log('Go to: https://vercel.com/ali-hasanovs-projects/son/settings/environment-variables')
console.log('')

console.log('Add these environment variables:')
console.log('=================================')
console.log('')

console.log('DATABASE_URL')
console.log(VERCEL_POSTGRES_URL)
console.log('')

console.log('JWT_SECRET')
console.log(process.env.JWT_SECRET || 'your-strong-32-character-secret-key-here-change-this')
console.log('')

console.log('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY')
console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'uwj6ebDDZHgx8UzNu')
console.log('')

console.log('NEXT_PUBLIC_EMAILJS_SERVICE_ID')
console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_7th7e9g')
console.log('')

console.log('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID')
console.log(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_3ivrutj')
console.log('')

console.log('NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID')
console.log(process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || 'template_5g5qp6o')
console.log('')

console.log('ADMIN_SEED_EMAIL')
console.log(process.env.ADMIN_SEED_EMAIL || 'vahid@son-temizlik.com')
console.log('')

console.log('ADMIN_SEED_PASSWORD')
console.log(process.env.ADMIN_SEED_PASSWORD || 'm&m2025')
console.log('')

console.log('📋 After adding these to Vercel, run:')
console.log('1. npx prisma generate')
console.log('2. npx prisma db push --accept-data-loss')
console.log('3. npx prisma db seed')
console.log('4. vercel --prod')
console.log('')

console.log('✅ Your production database will be ready!')
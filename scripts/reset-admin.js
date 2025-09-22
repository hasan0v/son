#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()

async function resetAdminAccount() {
  console.log('🔄 Resetting admin account...')

  try {
    // Delete all existing admin accounts
    const deletedCount = await prisma.admin.deleteMany({})
    console.log(`🗑️  Deleted ${deletedCount.count} existing admin accounts`)

    // Create new admin account with new credentials
    const newEmail = process.env.ADMIN_SEED_EMAIL
    const newPassword = process.env.ADMIN_SEED_PASSWORD
    
    if (!newEmail || !newPassword) {
      throw new Error('ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set in .env.local')
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    
    const newAdmin = await prisma.admin.create({
      data: {
        email: newEmail,
        passwordHash
      }
    })

    console.log(`✅ Created new admin user: ${newAdmin.email}`)
    console.log(`📧 Email: ${newEmail}`)
    console.log(`🔐 Password: ${newPassword}`)
    console.log('🚀 Admin account reset completed successfully!')

  } catch (error) {
    console.error('❌ Error resetting admin account:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

resetAdminAccount()
  .catch((error) => {
    console.error('Failed to reset admin account:', error)
    process.exit(1)
  })
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAdminLogin() {
  try {
    const email = 'vahid@son-temizlik.com'
    const password = 'm&m2025'
    
    const admin = await prisma.admin.findUnique({
      where: { email }
    })
    
    if (!admin) {
      console.log('❌ Admin user not found')
      return
    }
    
    const isValid = await bcrypt.compare(password, admin.passwordHash)
    
    if (isValid) {
      console.log('✅ Admin login test successful!')
      console.log(`👤 Admin: ${admin.email}`)
      console.log(`🔑 Role: ${admin.role}`)
      console.log(`📅 Created: ${admin.createdAt}`)
    } else {
      console.log('❌ Admin password test failed')
    }
    
  } catch (error) {
    console.error('❌ Admin test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminLogin()
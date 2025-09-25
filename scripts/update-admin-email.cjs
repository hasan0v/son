const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function updateAdminEmail() {
  try {
    console.log('🔄 Updating admin email in database...')
    
    // Check if old admin exists
    const oldAdmin = await prisma.admin.findUnique({
      where: { email: 'vahid@son-cleaning.com' }
    })
    
    if (oldAdmin) {
      console.log('👤 Found existing admin with old email')
      
      // Update the email
      const updatedAdmin = await prisma.admin.update({
        where: { email: 'vahid@son-cleaning.com' },
        data: { email: 'vahid@son-temizlik.com' }
      })
      
      console.log('✅ Admin email updated successfully!')
      console.log(`   Old: vahid@son-cleaning.com`)
      console.log(`   New: ${updatedAdmin.email}`)
    } else {
      // Check if new admin already exists
      const newAdmin = await prisma.admin.findUnique({
        where: { email: 'vahid@son-temizlik.com' }
      })
      
      if (newAdmin) {
        console.log('✅ Admin with new email already exists')
        console.log(`   Email: ${newAdmin.email}`)
      } else {
        console.log('⚠️  No admin found with either email')
        console.log('   Creating new admin with correct email...')
        
        const passwordHash = await bcrypt.hash('m&m2025', 10)
        const createdAdmin = await prisma.admin.create({
          data: {
            email: 'vahid@son-temizlik.com',
            passwordHash: passwordHash,
          }
        })
        
        console.log('✅ New admin created successfully!')
        console.log(`   Email: ${createdAdmin.email}`)
      }
    }
    
    // Verify final state
    const finalAdmin = await prisma.admin.findUnique({
      where: { email: 'vahid@son-temizlik.com' }
    })
    
    if (finalAdmin) {
      console.log('\n🎉 Database update complete!')
      console.log(`👤 Admin Email: ${finalAdmin.email}`)
      console.log(`🔑 Role: ${finalAdmin.role}`)
      console.log(`📅 Created: ${finalAdmin.createdAt}`)
    }
    
  } catch (error) {
    console.error('❌ Database update failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAdminEmail()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verifyDatabase() {
  try {
    const admin = await prisma.admin.count()
    const categories = await prisma.category.count()
    const products = await prisma.product.count()
    const messages = await prisma.contactMessage.count()
    
    console.log('📊 Database Verification:')
    console.log(`✅ Admin users: ${admin}`)
    console.log(`✅ Categories: ${categories}`)
    console.log(`✅ Products: ${products}`)
    console.log(`📧 Messages: ${messages}`)
    
    // Show some sample data
    const sampleCategories = await prisma.category.findMany()
    console.log('\n📂 Categories restored:')
    sampleCategories.forEach(cat => console.log(`  - ${cat.name}`))
    
    const sampleProducts = await prisma.product.findMany({ take: 5 })
    console.log('\n🛍️ Sample products:')
    sampleProducts.forEach(product => console.log(`  - ${product.title}`))
    
  } catch (error) {
    console.error('❌ Verification failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabase()
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function checkProducts() {
  try {
    console.log('📊 Checking imported products...')
    
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        title: 'asc'
      }
    })
    
    console.log(`\n✅ Found ${products.length} products in database:`)
    console.log('=' .repeat(60))
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`)
      console.log(`   Category: ${product.category.name}`)
      console.log(`   Slug: ${product.slug}`)
      if (product.volume) console.log(`   Volume: ${product.volume}`)
      if (product.packSize) console.log(`   Pack Size: ${product.packSize}`)
      console.log(`   Featured: ${product.featured ? 'Yes' : 'No'}`)
      console.log('')
    })
    
    // Group by category
    const byCategory = {}
    products.forEach(product => {
      const catName = product.category.name
      if (!byCategory[catName]) byCategory[catName] = []
      byCategory[catName].push(product)
    })
    
    console.log('📂 Products by category:')
    console.log('=' .repeat(40))
    Object.entries(byCategory).forEach(([category, products]) => {
      console.log(`${category}: ${products.length} products`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkProducts().catch(console.error)
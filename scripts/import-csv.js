import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import csv from 'csv-parser'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function importProducts() {
  try {
    console.log('🚀 Starting product import with csv-parser...')
    
    // Get existing categories
    const categories = await prisma.category.findMany()
    console.log('📂 Existing categories:')
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id})`)
    })
    
    // Create category mapping based on category names
    const categoryMap = {
      'cmfr15k2s0001eqtwpz7ln9qc': 'cmfvfpc8x0001eq402k23bbdz', // Qabyuyan Maye
      'cmfr15k310002eqtwu8y96pi4': 'cmfvfpd7l0002eq40sryqpnli', // Duru Ağardıcı
      'cmfr15k380003eqtw5nfkjc73': 'cmfvfpdt80003eq40jxwn34jw', // Toz Ağardıcı
      'cmfr15k3g0004eqtw45yjynuo': 'cmfvfpeex0004eq40oe43fnkg', // Maye Sabun
      'cmfr15k3n0005eqtwd3kximxa': 'cmfvfpf0k0005eq40ah4whksh', // Xlor
    }
    
    const defaultCategory = 'cmfvfpc8x0001eq402k23bbdz' // Qabyuyan Maye as default
    
    const products = []
    
    // Read CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream('Product.csv')
        .pipe(csv())
        .on('data', (row) => {
          products.push(row)
        })
        .on('end', () => {
          console.log(`📁 Found ${products.length} products in CSV`)
          resolve()
        })
        .on('error', reject)
    })
    
    let imported = 0
    let skipped = 0
    
    for (const product of products) {
      try {
        // Skip if no title
        if (!product.title?.trim()) {
          skipped++
          continue
        }
        
        // Always import - no duplicate checking
        
        // Map category ID
        const categoryId = categoryMap[product.categoryId] || defaultCategory
        
        // Create new product
        await prisma.product.create({
          data: {
            title: product.title.trim(),
            slug: product.slug?.trim() || '',
            description: product.description?.trim() || null,
            imageUrl: product.imageUrl?.trim() || null,
            categoryId: categoryId,
            volume: product.volume?.trim() || null,
            packSize: product.packSize?.trim() || null,
            featured: product.featured === '1' || product.featured === 'true',
          }
        })
        
        console.log(`✅ Imported: ${product.title}`)
        imported++
        
        // Progress indicator
        if (imported % 10 === 0) {
          console.log(`  📊 Progress: ${imported}/${products.length}`)
        }
        
      } catch (error) {
        console.error(`❌ Error importing "${product.title}":`, error.message)
        skipped++
      }
    }
    
    console.log('\n🎉 Import completed!')
    console.log(`✅ Imported: ${imported} products`)
    console.log(`⏭️  Skipped: ${skipped} products`)
    
    // Show final count
    const totalProducts = await prisma.product.count()
    console.log(`\n📊 Total products in database: ${totalProducts}`)
    
  } catch (error) {
    console.error('❌ Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the import
importProducts().catch(console.error)
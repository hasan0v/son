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
    
    // Create dynamic category mapping from current database
    const categoryMap = {}
    const categoryNameToId = {}
    
    categories.forEach(cat => {
      categoryNameToId[cat.name] = cat.id
    })
    
    // Map old CSV category IDs to new database category IDs
    categoryMap['cmfr15k2s0001eqtwpz7ln9qc'] = categoryNameToId['Qabyuyan Maye'] || categoryNameToId['Qabyuyan Maye']
    categoryMap['cmfr15k310002eqtwu8y96pi4'] = categoryNameToId['Duru Ağardıcı'] || categoryNameToId['Qabyuyan Maye']
    categoryMap['cmfr15k380003eqtw5nfkjc73'] = categoryNameToId['Toz Ağardıcı'] || categoryNameToId['Qabyuyan Maye']
    categoryMap['cmfr15k3g0004eqtw45yjynuo'] = categoryNameToId['Maye Sabun'] || categoryNameToId['Qabyuyan Maye']
    categoryMap['cmfr15k3n0005eqtwd3kximxa'] = categoryNameToId['Xlor'] || categoryNameToId['Qabyuyan Maye']
    
    const defaultCategory = categoryNameToId['Qabyuyan Maye'] // Use current Qabyuyan Maye ID as default
    
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
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

// Robust CSV parsing function that handles multiline descriptions
function parseProductCSV(csvText) {
  const products = []
  let currentProduct = null
  let inDescription = false
  let descriptionBuffer = ''
  
  const lines = csvText.split('\n')
  let headers = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Skip empty lines
    if (!line.trim()) {
      if (inDescription) {
        descriptionBuffer += '\n'
      }
      continue
    }
    
    // First line is headers
    if (!headers) {
      headers = line.split(',').map(h => h.trim())
      continue
    }
    
    // Check if this line starts a new product (has an ID that looks like our format)
    if (line.match(/^cmfr[a-z0-9]+,/)) {
      // Save previous product if exists
      if (currentProduct) {
        currentProduct.description = descriptionBuffer.trim()
        products.push(currentProduct)
      }
      
      // Start new product
      const fields = line.split(',')
      currentProduct = {
        id: fields[0]?.trim() || '',
        title: fields[1]?.trim() || '',
        slug: fields[2]?.trim() || '',
        description: '',
        imageUrl: fields[4]?.trim() || '',
        categoryId: fields[5]?.trim() || '',
        volume: fields[6]?.trim() || '',
        packSize: fields[7]?.trim() || '',
        featured: fields[8]?.trim() || '',
        createdAt: fields[9]?.trim() || '',
        updatedAt: fields[10]?.trim() || ''
      }
      
      // Check if description field starts with quote (multiline description)
      const descField = fields[3] || ''
      if (descField.startsWith('"') && !descField.endsWith('"')) {
        inDescription = true
        descriptionBuffer = descField.substring(1) // Remove opening quote
      } else {
        // Single line description
        descriptionBuffer = descField.replace(/^"|"$/g, '') // Remove quotes
        inDescription = false
      }
    } else if (inDescription) {
      // This line is part of a multiline description
      if (line.endsWith('"')) {
        // End of description
        descriptionBuffer += '\n' + line.substring(0, line.length - 1) // Remove closing quote
        inDescription = false
      } else {
        // Continue description
        descriptionBuffer += '\n' + line
      }
    }
  }
  
  // Don't forget the last product
  if (currentProduct) {
    currentProduct.description = descriptionBuffer.trim()
    products.push(currentProduct)
  }
  
  return products
}

async function importProducts() {
  try {
    console.log('🚀 Starting product import...')
    
    // First, let's see what categories exist in the database
    const categories = await prisma.category.findMany()
    console.log('📂 Existing categories:')
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id})`)
    })
    
    // Read and parse CSV file
    const csvPath = path.join(process.cwd(), 'Product.csv')
    if (!fs.existsSync(csvPath)) {
      throw new Error('Product.csv file not found!')
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const products = parseProductCSV(csvContent)
    
    console.log(`\n📁 Found ${products.length} products in CSV`)
    
    // Analyze unique categories in CSV
    const csvCategories = [...new Set(products.map(p => p.categoryId))].filter(Boolean)
    console.log(`\n🔍 Unique category IDs in CSV: ${csvCategories.length}`)
    csvCategories.forEach(catId => {
      const productsInCat = products.filter(p => p.categoryId === catId)
      const sampleProduct = productsInCat[0]
      console.log(`  - ${catId}: ${productsInCat.length} products (sample: "${sampleProduct?.title}")`)
    })
    
    // Simple mapping: use the first available category for now
    // You can adjust this based on the category analysis above
    const defaultCategoryId = categories[0]?.id
    
    if (!defaultCategoryId) {
      throw new Error('No categories found in database!')
    }
    
    console.log(`\n🔄 Will import all products to category: ${categories[0].name}`)
    console.log('(You can modify the script later for proper category mapping)')
    
    let imported = 0
    let skipped = 0
    
    for (const product of products) {
      try {
        // Check if product already exists
        const existing = await prisma.product.findFirst({
          where: { 
            OR: [
              { title: product.title },
              { slug: product.slug }
            ]
          }
        })
        
        if (existing) {
          console.log(`⏭️  Skipping "${product.title}" - already exists`)
          skipped++
          continue
        }
        
        // Create new product
        await prisma.product.create({
          data: {
            title: product.title,
            slug: product.slug,
            description: product.description || null,
            imageUrl: product.imageUrl || null,
            categoryId: defaultCategoryId, // Use default category for now
            volume: product.volume || null,
            packSize: product.packSize || null,
            featured: product.featured === '1' || product.featured === 'true',
          }
        })
        
        console.log(`✅ Imported: ${product.title}`)
        imported++
        
        // Add a small delay to avoid overwhelming the database
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
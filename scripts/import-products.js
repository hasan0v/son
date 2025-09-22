#!/usr/bin/env node

// CSV Product Import Script for Production Database
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

// CSV parsing function
function parseCSV(csvText) {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',')
  const products = []
  
  let currentLine = ''
  let inQuotes = false
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    currentLine += line
    
    // Count quotes to determine if we're inside a quoted field
    const quoteCount = (currentLine.match(/"/g) || []).length
    inQuotes = quoteCount % 2 !== 0
    
    if (!inQuotes) {
      // Parse the complete line
      const values = parseCSVLine(currentLine)
      if (values.length >= headers.length) {
        const product = {}
        headers.forEach((header, index) => {
          product[header.trim()] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : ''
        })
        products.push(product)
      }
      currentLine = ''
    } else {
      currentLine += '\n'
    }
  }
  
  return products
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"' && nextChar === '"') {
      current += '"'
      i++ // Skip next quote
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result
}

async function importProducts() {
  try {
    console.log('🚀 Starting product import...')
    
    // Read CSV file
    const csvPath = path.join(process.cwd(), 'Product.csv')
    if (!fs.existsSync(csvPath)) {
      throw new Error('Product.csv file not found!')
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const products = parseCSV(csvContent)
    
    console.log(`📁 Found ${products.length} products in CSV`)
    
    // Get existing categories to map old IDs to new ones
    const categories = await prisma.category.findMany()
    console.log(`📂 Found ${categories.length} categories in database`)
    
    // Create category mapping (you may need to adjust this based on your category names)
    const categoryMapping = {
      'cmfr15k2s0001eqtwpz7ln9qc': categories.find(c => c.name === 'Qabyuyan Maye')?.id,
      'cmfr15k310002eqtwu8y96pi4': categories.find(c => c.name === 'Duru Ağardıcı')?.id,
      'cmfr15k380003eqtw5nfkjc73': categories.find(c => c.name === 'Toz Ağardıcı')?.id,
      'cmfr15k3g0004eqtw45yjynuo': categories.find(c => c.name === 'Maye Sabun')?.id,
      'cmfr15k3n0005eqtwd3kximxa': categories.find(c => c.name === 'Xlor')?.id,
    }
    
    console.log('🔄 Category mapping:', categoryMapping)
    
    let imported = 0;
    let skipped = 0;
    for (const product of products) {
      try {
        const newCategoryId = categoryMapping[product.categoryId];
        if (!newCategoryId) {
          console.warn(`⚠️  Skipping product "${product.title}" - category not found`);
          skipped++;
          continue;
        }
        // Always create a new product, even if the name is the same
        await prisma.product.create({
          data: {
            title: product.title,
            slug: product.slug,
            description: product.description || null,
            imageUrl: product.imageUrl || null,
            categoryId: newCategoryId,
            volume: product.volume || null,
            packSize: product.packSize || null,
            featured: product.featured === '1' || product.featured === 'true',
          }
        });
        console.log(`✅ Imported: ${product.title}`);
        imported++;
      } catch (error) {
        console.error(`❌ Error importing "${product.title}":`, error.message);
        skipped++;
      }
    }
    console.log('\n🎉 Import completed!');
    console.log(`✅ Imported: ${imported} products`);
    console.log(`⏭️  Skipped: ${skipped} products`);
    
  } catch (error) {
    console.error('❌ Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the import
importProducts()
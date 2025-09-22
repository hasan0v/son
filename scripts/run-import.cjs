const { execSync } = require('child_process')
const path = require('path')

console.log('🚀 Running product import...')

try {
  // Change to the son directory
  process.chdir(path.join(__dirname, '..'))
  
  // Run the import script with tsx for TypeScript support
  execSync('npx tsx scripts/import-products-simple.js', { stdio: 'inherit' })
  
} catch (error) {
  console.error('❌ Import failed:', error.message)
  process.exit(1)
}
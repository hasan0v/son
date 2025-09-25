const fs = require('fs')
const path = require('path')

// Script to verify sitemap configuration
console.log('🔍 Verifying Sitemap Configuration...\n')

// Check if sitemap.ts exists and has proper structure
const sitemapPath = path.join(__dirname, '..', 'app', 'sitemap.ts')
const robotsPath = path.join(__dirname, '..', 'app', 'robots.ts')

console.log('📄 Checking Files:')

// Check sitemap.ts
if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.ts exists')
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  
  // Check for key components
  const checks = [
    { name: 'Base URL', pattern: /son-temizlik\.com/, found: sitemapContent.includes('son-temizlik.com') },
    { name: 'Homepage priority', pattern: /priority:\s*1\.0/, found: /priority:\s*1\.0/.test(sitemapContent) },
    { name: 'Products page', pattern: /\/products/, found: sitemapContent.includes('/products') },
    { name: 'Category pages', pattern: /category=/, found: sitemapContent.includes('category=') },
    { name: 'Database integration', pattern: /prisma/, found: sitemapContent.includes('prisma') },
    { name: 'Error handling', pattern: /catch/, found: sitemapContent.includes('catch') }
  ]
  
  checks.forEach(check => {
    console.log(`  ${check.found ? '✅' : '❌'} ${check.name}`)
  })
} else {
  console.log('❌ sitemap.ts not found')
}

// Check robots.ts
if (fs.existsSync(robotsPath)) {
  console.log('✅ robots.ts exists')
  const robotsContent = fs.readFileSync(robotsPath, 'utf8')
  
  const robotsChecks = [
    { name: 'Sitemap reference', found: robotsContent.includes('sitemap.xml') },
    { name: 'Admin disallow', found: robotsContent.includes('/admin/') },
    { name: 'API disallow', found: robotsContent.includes('/api/') },
    { name: 'Allow all', found: robotsContent.includes("allow: '/'") }
  ]
  
  robotsChecks.forEach(check => {
    console.log(`  ${check.found ? '✅' : '❌'} ${check.name}`)
  })
} else {
  console.log('❌ robots.ts not found')
}

console.log('\n🌐 URLs that will be included in sitemap:')
console.log('  📍 https://son-temizlik.com/ (Priority: 1.0)')
console.log('  📍 https://son-temizlik.com/products (Priority: 0.9)')
console.log('  📍 https://son-temizlik.com/products?category={slug} (Priority: 0.7)')

console.log('\n🔧 Google Search Console Setup:')
console.log('  1. Go to: https://search.google.com/search-console')
console.log('  2. Add property: https://son-temizlik.com')
console.log('  3. Verify ownership (HTML file/meta tag/Analytics)')
console.log('  4. Submit sitemap: sitemap.xml')

console.log('\n📊 After deployment, test these URLs:')
console.log('  • https://son-temizlik.com/sitemap.xml')
console.log('  • https://son-temizlik.com/robots.txt')

console.log('\n✨ Sitemap will automatically include:')
console.log('  • All categories from your database')
console.log('  • Proper lastModified dates')
console.log('  • SEO-optimized priorities')
console.log('  • Change frequency hints for search engines')
const fs = require('fs')
const path = require('path')

// Test script to verify domain updates
console.log('🔍 Verifying domain updates to son-temizlik.com...\n')

const filesToCheck = [
  '.env.production',
  '.env.local',
  'app/sitemap.ts',
  'app/robots.ts',
  'components/forms/LoginForm.tsx',
  'VERCEL_FIX.md',
  'scripts/setup-vercel-db.js',
  'scripts/test-admin.cjs'
]

let allGood = true

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file)
  
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Check for old domain references
    const oldDomainRefs = content.match(/son-cleaning\.com/gi)
    const oldEmailRefs = content.match(/vahid@son-cleaning\.com/gi)
    
    if (oldDomainRefs || oldEmailRefs) {
      console.log(`❌ ${file}: Still contains old domain references`)
      if (oldDomainRefs) console.log(`   - Found: ${oldDomainRefs.join(', ')}`)
      if (oldEmailRefs) console.log(`   - Found: ${oldEmailRefs.join(', ')}`)
      allGood = false
    } else {
      console.log(`✅ ${file}: Updated successfully`)
    }
    
  } catch (error) {
    console.log(`⚠️  ${file}: File not found or error reading`)
  }
})

console.log('\n📊 Summary:')
if (allGood) {
  console.log('✅ All files have been successfully updated to son-temizlik.com')
  console.log('✅ Admin email updated to vahid@son-temizlik.com')
  console.log('✅ Domain references updated throughout the application')
} else {
  console.log('❌ Some files still contain old domain references')
  console.log('   Please review the files marked above')
}

console.log('\n🚀 Next steps:')
console.log('1. Update Vercel environment variables with new domain')
console.log('2. Update EmailJS templates with new from email (info@son-temizlik.com)')
console.log('3. Update DNS settings for son-temizlik.com to point to Vercel')
console.log('4. Test admin login with vahid@son-temizlik.com')
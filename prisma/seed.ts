import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  'Qabyuyan Maye',
  'Duru Ağardıcı', 
  'Toz Ağardıcı',
  'Maye Sabun',
  'Xlor'
]

function toSlug(str: string): string {
  return str.toLowerCase()
    .replace(/ə/g, 'e')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const email = process.env.ADMIN_SEED_EMAIL!
  const password = process.env.ADMIN_SEED_PASSWORD!
  
  if (!email || !password) {
    throw new Error('ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  
  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash
    }
  })

  console.log(`✅ Created admin user: ${admin.email}`)

  // Create categories
  for (const categoryName of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
        slug: toSlug(categoryName),
        desc: `${categoryName} məhsulları`
      }
    })
    console.log(`✅ Created category: ${category.name}`)
  }

  console.log('🌱 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
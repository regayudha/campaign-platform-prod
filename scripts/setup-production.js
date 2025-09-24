const { PrismaClient } = require('@prisma/client')
const bcryptjs = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Setting up production database...')

  // Verify we're using PostgreSQL in production
  if (!process.env.POSTGRES_PRISMA_URL || !process.env.POSTGRES_PRISMA_URL.includes('postgresql://')) {
    console.error('❌ POSTGRES_PRISMA_URL must be a PostgreSQL connection string for production')
    process.exit(1)
  }

  // Create admin user with default credentials
  const adminEmail = 'admin@campaign.com'
  const adminPassword = 'admin123'
  const hashedPassword = await bcryptjs.hash(adminPassword, 12)
  
  try {
    const admin = await prisma.admin.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        name: 'Admin User',
      },
      create: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
      },
    })

    console.log('✅ Admin user created/updated:', admin.email)
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message)
    process.exit(1)
  }

  console.log('🎉 Production database setup complete!')
  console.log('\n📝 Admin Login Credentials:')
  console.log(`Email: ${adminEmail}`)
  console.log(`Password: ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error('❌ Error setting up production database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
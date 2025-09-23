const { PrismaClient } = require('@prisma/client')
const bcryptjs = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Initializing database...')

  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hashedPassword = await bcryptjs.hash(adminPassword, 12)
  
  try {
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@campaign.com' },
      update: {},
      create: {
        email: 'admin@campaign.com',
        password: hashedPassword,
        name: 'Admin User',
      },
    })

    console.log('✅ Admin user created:', admin.email)
  } catch (error) {
    console.log('ℹ️  Admin user already exists or error:', error.message)
  }

  // Add sample analytics data only in development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await prisma.analytics.createMany({
        data: [
          {
            event: 'page_view',
            data: JSON.stringify({ page: '/' }),
            ipAddress: '127.0.0.1',
            userAgent: 'Mozilla/5.0 Sample Browser',
          },
          {
            event: 'page_view',
            data: JSON.stringify({ page: '/' }),
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0 Sample Browser 2',
          },
          {
            event: 'page_view',
            data: JSON.stringify({ page: '/' }),
            ipAddress: '10.0.0.1',
            userAgent: 'Mozilla/5.0 Sample Browser 3',
          },
        ],
        skipDuplicates: true,
      })
      console.log('✅ Sample analytics data added')
    } catch (error) {
      console.log('ℹ️  Analytics data already exists or error:', error.message)
    }
  } else {
    console.log('ℹ️  Skipping sample data in production environment')
  }

  console.log('🎉 Database initialization complete!')
  console.log('\n📝 Admin Login Credentials:')
  console.log('Email: admin@campaign.com')
  console.log('Password: admin123')
  console.log('\n🌐 Access URLs:')
  console.log('Landing Page: http://localhost:3000')
  console.log('Admin Login: http://localhost:3000/admin/login')
  console.log('Admin Dashboard: http://localhost:3000/admin/dashboard')
}

main()
  .catch((e) => {
    console.error('❌ Error initializing database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

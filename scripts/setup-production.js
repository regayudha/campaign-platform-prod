const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function setupProduction() {
  try {
    console.log('🚀 Setting up production database...')
    
    // Check if we can connect to the database
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Run migrations
    console.log('📦 Applying database migrations...')
    // Note: In production, you might want to use `prisma migrate deploy` instead
    
    // Initialize database with admin user
    console.log('👤 Setting up admin user...')
    await require('./init-db.js')
    
    console.log('🎉 Production setup complete!')
    
  } catch (error) {
    console.error('❌ Production setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if called directly
if (require.main === module) {
  setupProduction()
}

module.exports = { setupProduction }

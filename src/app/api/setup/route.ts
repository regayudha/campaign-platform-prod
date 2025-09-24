import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Only allow setup in development or with a secret key
    const { searchParams } = new URL(request.url)
    const setupKey = searchParams.get('key')
    
    if (process.env.NODE_ENV === 'production' && setupKey !== process.env.SETUP_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🚀 Setting up database via API...')

    // Create admin user with default credentials
    const adminEmail = 'admin@campaign.com'
    const adminPassword = 'admin123'
    const hashedPassword = await bcryptjs.hash(adminPassword, 12)
    
    const admin = await prisma.admin.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
      },
    })

    console.log('✅ Admin user created:', admin.email)

    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully',
      admin: { email: admin.email, name: admin.name }
    })

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    return NextResponse.json({ 
      error: 'Database setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

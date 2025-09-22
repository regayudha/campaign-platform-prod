import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get all users
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        name: true,
        email: true,
        phone: true,
        createdAt: true
      }
    })

    // Create CSV content
    const csvHeader = 'Name,Email,Phone,Joined Date\n'
    const csvContent = users
      .map(user => {
        const joinedDate = new Date(user.createdAt).toLocaleDateString()
        return `"${user.name}","${user.email}","${user.phone}","${joinedDate}"`
      })
      .join('\n')

    const csv = csvHeader + csvContent

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="campaign-signups.csv"'
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // For now, we'll skip authentication check since this is admin-only
    // In production, you might want to add IP restrictions or API key auth

    // Get total signups
    const totalSignups = await prisma.user.count()

    // Get signups today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const signupsToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    })

    // Get signups this week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const signupsThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: weekStart
        }
      }
    })

    // Get total page views
    const totalPageViews = await prisma.analytics.count({
      where: {
        event: 'page_view'
      }
    })

    // Get recent signups
    const recentSignups = await prisma.user.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      totalSignups,
      signupsToday,
      signupsThisWeek,
      totalPageViews,
      recentSignups
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

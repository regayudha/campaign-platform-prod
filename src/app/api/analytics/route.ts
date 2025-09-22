import { NextRequest, NextResponse } from 'next/server'
import { trackEvent } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json()

    if (!event) {
      return NextResponse.json(
        { message: 'Event name is required' },
        { status: 400 }
      )
    }

    await trackEvent(event, data, request)

    return NextResponse.json({ message: 'Event tracked successfully' })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { message: 'Failed to track event' },
      { status: 500 }
    )
  }
}

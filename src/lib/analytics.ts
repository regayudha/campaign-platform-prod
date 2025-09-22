import { prisma } from './prisma'

export async function trackEvent(
  event: string,
  data?: Record<string, unknown>,
  request?: Request
) {
  try {
    const ipAddress = request?.headers.get('x-forwarded-for') || 
                     request?.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request?.headers.get('user-agent') || 'unknown'

    await prisma.analytics.create({
      data: {
        event,
        data: data ? JSON.stringify(data) : null,
        ipAddress,
        userAgent,
      },
    })
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

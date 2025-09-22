'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'page_view',
            data: { page: pathname }
          }),
        })
      } catch (error) {
        console.error('Failed to track page view:', error)
      }
    }

    trackPageView()
  }, [pathname])

  useEffect(() => {
    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        
        // Track at 25%, 50%, 75%, and 100% scroll depths
        if ([25, 50, 75, 100].includes(scrollDepth)) {
          fetch('/api/analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event: 'scroll_depth',
              data: { depth: scrollDepth, page: pathname }
            }),
          }).catch(console.error)
        }
      }
    }

    const throttledTrackScrollDepth = throttle(trackScrollDepth, 1000)
    window.addEventListener('scroll', throttledTrackScrollDepth)
    
    return () => {
      window.removeEventListener('scroll', throttledTrackScrollDepth)
    }
  }, [pathname])

  return null
}

// Throttle function to limit how often scroll tracking fires
function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
): (...args: T) => void {
  let inThrottle: boolean
  return function(this: unknown, ...args: T) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

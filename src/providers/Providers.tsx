'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ConsentProvider } from '@/hooks/useConsent'
import { PostHogProvider } from './PostHogProvider'
import { GoogleAnalytics } from '@/components/Analytics'
import { CookieConsent } from '@/components/CookieConsent'

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Skip analytics/consent wrappers for Payload admin — they cause React #418 hydration errors
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <ConsentProvider>
      <PostHogProvider>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </PostHogProvider>
    </ConsentProvider>
  )
}

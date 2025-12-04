'use client'

import { ReactNode } from 'react'
import { ConsentProvider } from '@/hooks/useConsent'
import { PostHogProvider } from './PostHogProvider'
import { GoogleAnalytics } from '@/components/Analytics'
import { CookieConsent } from '@/components/CookieConsent'

export function Providers({ children }: { children: ReactNode }) {
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
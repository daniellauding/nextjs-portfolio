'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useConsent } from '@/hooks/useConsent'

function PostHogPageViewInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { hasConsent } = useConsent()

  useEffect(() => {
    if (pathname && posthog && hasConsent === true) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, hasConsent])

  return null
}

function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  )
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { hasConsent } = useConsent()

  useEffect(() => {
    if (hasConsent === true) {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST
      
      if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false,
          capture_pageleave: true,
        })
      } else {
        console.warn('PostHog environment variables are not configured')
      }
    } else if (hasConsent === false) {
      posthog.opt_out_capturing()
    }
  }, [hasConsent])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
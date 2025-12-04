'use client'

import { useEffect } from 'react'
import { useConsent } from '@/hooks/useConsent'

export function GoogleAnalytics() {
  const { hasConsent } = useConsent()

  useEffect(() => {
    if (hasConsent === false) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
      return
    }

    if (hasConsent === true && typeof window !== 'undefined') {
      if (!window.gtag) {
        const script1 = document.createElement('script')
        script1.async = true
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
        document.head.appendChild(script1)

        const script2 = document.createElement('script')
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `
        document.head.appendChild(script2)
      } else {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
    }
  }, [hasConsent])

  return null
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
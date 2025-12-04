'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ConsentContextType = {
  hasConsent: boolean | null
  setConsent: (consent: boolean) => void
  showBanner: boolean
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent')
    if (storedConsent !== null) {
      setHasConsent(storedConsent === 'true')
    } else {
      setShowBanner(true)
    }
  }, [])

  const setConsent = (consent: boolean) => {
    setHasConsent(consent)
    localStorage.setItem('cookie-consent', consent.toString())
    setShowBanner(false)
  }

  return (
    <ConsentContext.Provider value={{ hasConsent, setConsent, showBanner }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return context
}
'use client'

import { useConsent } from '@/hooks/useConsent'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieConsent() {
  const { showBanner, setConsent } = useConsent()

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
      >
        <div className="bg-[var(--card)] rounded-full shadow-lg border border-[var(--border)] px-3 py-2 flex items-center gap-2 pl-6">
          <p className="text-xs text-[var(--foreground)] pr-1">
            Allow analytics?
          </p>
          <button
            onClick={() => setConsent(true)}
            className="w-6 h-6 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
            aria-label="Accept cookies"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => setConsent(false)}
            className="w-6 h-6 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Reject cookies"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
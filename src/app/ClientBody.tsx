'use client'

import { useEffect, useState, createContext } from 'react'
import { MotionConfig } from 'framer-motion'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import CookieConsent from '@/components/cookies/CookieConsent'
import { ModalProvider } from '@/contexts/ModalContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const AnimationContext = createContext({
  isReducedMotion: false,
  isFirstVisit: true,
  setFirstVisitComplete: () => {},
})

export default function ClientBody({
  children,
}: {
  children: React.ReactNode
}) {
  const googleAnalyticsId = 'G-TLYHHQBXLP'
  const isReducedMotion = usePrefersReducedMotion()
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return localStorage.getItem('visited-before') !== 'true'
  })

  useEffect(() => {
    // Clear stale scroll locks left by interrupted modal/menu transitions.
    if (!document.body.classList.contains('overflow-hidden')) {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('position')
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('max-height')
      document.body.style.removeProperty('width')
      document.documentElement.style.removeProperty('overflow')
    }
  }, [])

  useEffect(() => {
    if (!isFirstVisit) {
      localStorage.setItem('visited-before', 'true')
      return
    }

    const timer = window.setTimeout(() => {
      localStorage.setItem('visited-before', 'true')
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isFirstVisit])

  const setFirstVisitComplete = () => {
    localStorage.setItem('visited-before', 'true')
    setIsFirstVisit(false)
  }

  return (
    <AnimationContext.Provider
      value={{
        isReducedMotion,
        isFirstVisit,
        setFirstVisitComplete,
      }}
    >
      <MotionConfig reducedMotion={isReducedMotion ? 'always' : 'never'}>
        <ModalProvider>{children}</ModalProvider>
        <GoogleAnalytics measurementId={googleAnalyticsId} />

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </MotionConfig>
    </AnimationContext.Provider>
  )
}

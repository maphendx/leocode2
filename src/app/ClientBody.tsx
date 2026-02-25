'use client'

import { useEffect, useState, createContext } from 'react'
import { MotionConfig } from 'framer-motion'
import CookieConsent from '@/components/cookies/CookieConsent'
import { ModalProvider } from '@/contexts/ModalContext'
import SchemaMarkup from '@/components/utils/SchemaMarkup'

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
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

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

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    setIsReducedMotion(prefersReducedMotion)

    const hasVisitedBefore = localStorage.getItem('visited-before') === 'true'
    setIsFirstVisit(!hasVisitedBefore)

    const timer = setTimeout(() => {
      localStorage.setItem('visited-before', 'true')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const setFirstVisitComplete = () => {
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
        {/* Schema.org structured data */}
        <SchemaMarkup />

        <ModalProvider>{children}</ModalProvider>

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </MotionConfig>
    </AnimationContext.Provider>
  )
}

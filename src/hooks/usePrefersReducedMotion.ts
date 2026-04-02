import { useSyncExternalStore } from 'react'

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const mediaQueryList = window.matchMedia(MEDIA_QUERY)
  const handleChange = () => callback()

  mediaQueryList.addEventListener('change', handleChange)

  return () => {
    mediaQueryList.removeEventListener('change', handleChange)
  }
}

const getSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia(MEDIA_QUERY).matches

export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false)

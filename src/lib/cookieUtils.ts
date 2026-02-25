import { getCookie, hasCookie } from 'cookies-next'

export type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function getConsentedCookies(): CookiePreferences {
  const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
  }

  if (typeof window === 'undefined') {
    return defaultPreferences
  }

  if (!hasCookie('cookie-consent') || !hasCookie('cookie-preferences')) {
    return defaultPreferences
  }

  try {
    const cookiePreferences = getCookie('cookie-preferences')
    if (cookiePreferences) {
      return JSON.parse(String(cookiePreferences))
    }
    return defaultPreferences
  } catch (error) {
    console.error('Error parsing cookie preferences:', error)
    return defaultPreferences
  }
}

export function canUseAnalytics(): boolean {
  const preferences = getConsentedCookies()
  return preferences.analytics
}

export function canUseMarketing(): boolean {
  const preferences = getConsentedCookies()
  return preferences.marketing
}

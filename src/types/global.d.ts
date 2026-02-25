// Global type definitions for window objects used by analytics

interface Window {
  // Google Analytics
  gtag?: (
    command: string,
    targetId: string,
    params?: { [key: string]: unknown }
  ) => void
  dataLayer?: unknown[]

  // Facebook Pixel
  fbq?: (
    command: string,
    event?: string,
    params?: { [key: string]: unknown }
  ) => void
  _fbq?: unknown
}

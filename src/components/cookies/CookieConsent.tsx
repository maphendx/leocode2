'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent') === 'true'

    // Only show banner if no consent has been given
    if (!hasConsent) {
      // Small delay to prevent banner from flashing on page load
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'true')
    localStorage.setItem('analytics-consent', 'true')
    localStorage.setItem('marketing-consent', 'true')

    // Dispatch event to notify other components
    window.dispatchEvent(new Event('consent-changed'))

    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'true')
    localStorage.setItem('analytics-consent', 'false')
    localStorage.setItem('marketing-consent', 'false')

    // Dispatch event to notify other components
    window.dispatchEvent(new Event('consent-changed'))

    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-sm text-gray-700">
            <p>
              Ми використовуємо файли cookie для покращення вашого досвіду на
              нашому сайті. Натискаючи "Прийняти всі", ви погоджуєтеся з
              використанням всіх типів файлів cookie.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={acceptNecessary}
              className="px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50"
            >
              Лише необхідні
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-1.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-hover"
            >
              Прийняти всі
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

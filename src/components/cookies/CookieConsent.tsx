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
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:px-5">
      <div
        className="mx-auto max-w-5xl rounded-[24px] border border-[#D9E6D2] bg-[linear-gradient(180deg,rgba(252,254,250,0.98)_0%,rgba(244,248,239,0.98)_100%)] shadow-[0_-14px_45px_rgba(20,28,18,0.12)]"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="min-w-0">
            <p
              id="cookie-consent-title"
              className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#31402E]"
            >
              Налаштування Cookie
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#50604D] text-pretty">
              Ми використовуємо файли cookie, щоб сайт працював стабільно,
              запам’ятовував ваші налаштування та допомагав нам покращувати
              сервіс. Оберіть лише необхідні або дозвольте всі.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              onClick={acceptNecessary}
              className="touch-manipulation rounded-full border border-[#C8D5C2] bg-white px-4 py-2 text-sm font-semibold text-[#2C382A] transition-colors hover:bg-[#F6FAF3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78C86F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FBF5]"
            >
              Лише необхідні
            </button>
            <button
              onClick={acceptAll}
              className="touch-manipulation rounded-full bg-[#78C86F] px-4 py-2 text-sm font-bold text-[#1D291A] transition-colors hover:bg-[#8BD582] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78C86F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FBF5]"
            >
              Прийняти всі
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

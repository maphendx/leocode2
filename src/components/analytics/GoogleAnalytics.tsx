'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

type GoogleAnalyticsProps = {
  measurementId: string
}

export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const updateConsent = () => {
      setIsEnabled(localStorage.getItem('analytics-consent') === 'true')
    }

    updateConsent()
    window.addEventListener('consent-changed', updateConsent)
    window.addEventListener('storage', updateConsent)

    return () => {
      window.removeEventListener('consent-changed', updateConsent)
      window.removeEventListener('storage', updateConsent)
    }
  }, [])

  if (!isEnabled) {
    return null
  }

  return (
    <>
      <Script
        id="google-analytics-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}

import type { Metadata, Viewport } from 'next'
import { Mulish } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ClientBody from './ClientBody'

// Load Google font with optimized subset
const mulish = Mulish({
  variable: '--font-mulish',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false,
})

// Get environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leocode.com.ua'

// Essential metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | LEOCODE (LEO CODE) - Інноваційний простір для дітей',
    default:
      'LEOCODE - Інноваційний простір для дітей від 7 до 15 років у Львові',
  },
  description:
    'LEOCODE - Інноваційний простір для дітей від 7 до 15 років, де кожен може розвивати логічне мислення, креативність та навички вирішення складних завдань.',
  keywords: [
    'leocode',
    'leo code',
    'леокод',
    'лео код',
    'дитяче програмування',
    'програмування для дітей',
    'школа дронів Львів',
    'IT курси для дітей',
    'робототехніка',
    'LEO CODE',
    'програмування Львів',
    'курси програмування для дітей Львів',
  ],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: baseUrl,
    siteName: 'LEOCODE',
    title: 'LEOCODE - Інноваційний простір для дітей від 7 до 15 років',
    images: [{ url: '/new_logo.svg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
}

// Optimized viewport settings
export const viewport: Viewport = {
  themeColor: '#292A2C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="uk" className={mulish.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <ClientBody>{children}</ClientBody>
        {isProduction && (
          <Script
            src="https://cdn.pulse.is/livechat/loader.js"
            data-live-chat-id="699ecbde408e4cf75b0447cb"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  )
}

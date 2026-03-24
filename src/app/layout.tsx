import type { Metadata, Viewport } from 'next'
import { Mulish } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ClientBody from './ClientBody'
import SchemaMarkup from '@/components/utils/SchemaMarkup'
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo'

// Load Google font with optimized subset
const mulish = Mulish({
  variable: '--font-mulish',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  keywords: DEFAULT_KEYWORDS,
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
        <SchemaMarkup />
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

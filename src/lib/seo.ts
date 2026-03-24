import type { Metadata } from 'next'

export const siteConfig = {
  name: 'LEOCODE',
  url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://leocode.com.ua').replace(
    /\/$/,
    ''
  ),
  defaultTitle: 'LEOCODE - Освітній простір для дітей 7-15 років у Львові',
  description:
    'Освітній простір LEOCODE у Львові для дітей 7-15 років: програмування, дрони, англійська та онлайн й офлайн навчання.',
  ogImage: '/logo.png',
} as const

export const DEFAULT_KEYWORDS = [
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
]

export function getAbsoluteUrl(path = '/') {
  if (!path || path === '/') {
    return siteConfig.url
  }

  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

type PageMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getAbsoluteUrl(path)
  const imageUrl = getAbsoluteUrl(siteConfig.ogImage)

  return {
    title,
    description,
    keywords: Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'uk_UA',
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 2000,
          height: 812,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

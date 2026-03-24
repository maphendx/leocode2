import { MetadataRoute } from 'next'
import { getAbsoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/work'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/partnerstva-shkil'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/workshopy'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}

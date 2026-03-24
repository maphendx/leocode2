import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'IT воркшопи для дітей від LEOCODE у Львові',
  description:
    'Одноденні IT воркшопи LEOCODE для дітей у Львові: програмування, Python, дизайн, робототехніка та AI.',
  path: '/workshopy',
  keywords: ['воркшопи для дітей Львів', 'IT воркшопи Львів', 'Python для дітей Львів'],
})

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

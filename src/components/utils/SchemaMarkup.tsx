import { getAbsoluteUrl, siteConfig } from '@/lib/seo'

const SchemaMarkup = () => {
  const organizationId = `${siteConfig.url}/#organization`
  const websiteId = `${siteConfig.url}/#website`

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': organizationId,
        name: siteConfig.name,
        alternateName: ['LEO CODE', 'ЛеоКод', 'Лео Код'],
        url: siteConfig.url,
        logo: getAbsoluteUrl('/icon-512.png'),
        image: getAbsoluteUrl('/logo.png'),
        description: siteConfig.description,
        sameAs: [
          'https://www.facebook.com/p/LeoCodeKids-61565577578490/',
          'https://www.instagram.com/leocode.kids',
          'https://www.tiktok.com/@leocode.kids',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: '0800300648',
            areaServed: 'UA',
            availableLanguage: ['uk', 'en'],
          },
        ],
        location: [
          {
            '@type': 'Place',
            name: 'LEOCODE Наукова',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'вул. Наукова, 49',
              addressLocality: 'Львів',
              addressRegion: 'Львівська область',
              addressCountry: 'UA',
            },
          },
          {
            '@type': 'Place',
            name: 'LEOCODE Мазепи',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'вул. Мазепи, 25Д',
              addressLocality: 'Львів',
              addressRegion: 'Львівська область',
              addressCountry: 'UA',
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: 'uk-UA',
        description: siteConfig.description,
        publisher: {
          '@id': organizationId,
        },
      },
      {
        '@type': 'Course',
        '@id': `${siteConfig.url}/#courses`,
        name: 'Курси програмування для дітей LEOCODE',
        description:
          'LEOCODE навчає дітей програмуванню, STEM-напрямкам, польотам на дронах та іншим сучасним IT навичкам.',
        provider: {
          '@id': organizationId,
        },
        educationalCredentialAwarded: 'Сертифікат про завершення курсу',
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'Учень',
          audienceType: 'Діти віком від 7 до 15 років',
        },
      },
    ],
  }

  return (
    <script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  )
}

export default SchemaMarkup

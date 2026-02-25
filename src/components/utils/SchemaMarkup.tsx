'use client'

import React from 'react'
import Script from 'next/script'

/**
 * Component for adding Schema.org structured data to the website
 * This improves SEO by providing search engines with detailed information about your content
 */
const SchemaMarkup: React.FC = () => {
  // Organization schema for your business entity
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://leocode.com.ua/#organization',
    name: 'LEOCODE',
    alternateName: ['LEO CODE', 'ЛеоКод', 'Лео Код'],
    url: 'https://leocode.com.ua',
    logo: 'https://leocode.com.ua/icon-512.png',
    description:
      'LEOCODE - Інноваційний простір для дітей від 5 до 16 років, де кожен може розвивати логічне мислення, креативність та навички вирішення складних завдань.',
    sameAs: [
      // Add your social media profiles here if available
      'https://www.tiktok.com/@leocode.kids',
      'https://www.instagram.com/leocode.kids',
    ],
    telephone: '+380687388608', // Replace with your actual phone
    email: 'droneschoollviv@gmail.com', // Replace with your actual email
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
  }

  // WebSite schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://leocode.com.ua/#website',
    name: 'LEOCODE',
    alternateName: 'LEO CODE',
    url: 'https://leocode.com.ua',
    publisher: {
      '@id': 'https://leocode.com.ua/#organization',
    },
    inLanguage: 'uk-UA',
    description: 'LEOCODE - Інноваційний простір для дітей від 5 до 16 років',
    keywords:
      'leocode, leo code, програмування для дітей, IT курси, школа дронів, робототехніка',
  }

  // Local Business schema for physical locations
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://leocode.com.ua/#localbusiness',
    name: 'LEOCODE',
    alternateName: 'LEO CODE',
    url: 'https://leocode.com.ua',
    image: 'https://leocode.com.ua/icon-512.png',
    description:
      'LEOCODE - Школа програмування та IT навичок для дітей у Львові',
    telephone: '+380687388608', // Replace with your actual phone
    priceRange: '₴₴',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 9:00-20:00',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
    parentOrganization: {
      '@id': 'https://leocode.com.ua/#organization',
    },
  }

  // Course offer schema
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Курси програмування для дітей LEOCODE',
    description:
      'LEOCODE (LEO CODE) навчає дітей програмуванню, польоту на дронах та іншим IT навичкам.',
    provider: {
      '@id': 'https://leocode.com.ua/#organization',
    },
    educationalCredentialAwarded: 'Сертифікат про завершення курсу',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Учень',
      audienceType: 'Діти віком від 5 до 16 років',
    },
  }

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify([
        organizationSchema,
        websiteSchema,
        localBusinessSchema,
        courseSchema,
      ])}
    </Script>
  )
}

export default SchemaMarkup
